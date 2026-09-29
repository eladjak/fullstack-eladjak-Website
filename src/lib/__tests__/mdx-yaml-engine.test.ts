import { mkdtemp, mkdir, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';

type MdxModule = typeof import('../mdx');
type GrayMatter = typeof import('gray-matter');

async function loadMdxWithFixture(files: Record<string, string>): Promise<{ mdx: MdxModule; matter: GrayMatter }> {
  const fixtureRoot = await mkdtemp(path.join(os.tmpdir(), 'g01-mdx-yaml-v4-'));
  const blogDir = path.join(fixtureRoot, 'content', 'blog');
  await mkdir(blogDir, { recursive: true });
  await Promise.all(
    Object.entries(files).map(([name, content]) => writeFile(path.join(blogDir, name), content, 'utf8')),
  );

  vi.spyOn(process, 'cwd').mockReturnValue(fixtureRoot);
  vi.resetModules();
  const matter = await import('gray-matter');
  const mdx = await import('../mdx');
  return { mdx, matter };
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.resetModules();
});

describe('MDX YAML v4 engine', () => {
  it('preserves ordinary frontmatter through exported list and slug lookups', async () => {
    const { mdx } = await loadMdxWithFixture({
      'older.mdx': '---\ntitle: Older\ndate: 2025-01-01\ndescription: Older description\ntags:\n  - archive\n---\nOlder body.',
      'newer.mdx': '---\ntitle: Newer\ntitleHe: חדש\ndate: 2025-02-01\ndescription: Newer description\ntags:\n  - news\n  - yaml\npublished: true\n---\nNewer body.',
    });

    const posts = mdx.getAllMDXPosts();
    expect(posts.map((post) => post.slug)).toEqual(['newer', 'older']);
    expect(posts[0]?.frontmatter).toMatchObject({
      title: 'Newer',
      titleHe: 'חדש',
      date: new Date('2025-02-01T00:00:00.000Z'),
      tags: ['news', 'yaml'],
      published: true,
    });
    expect(posts[0]?.content).toBe('Newer body.');

    const bySlug = mdx.getMDXPostBySlug('newer');
    expect(bySlug?.frontmatter.title).toBe('Newer');
    expect(bySlug?.content).toBe('Newer body.');
  });

  it('uses the explicit v4 engine even when the legacy default engine fails', async () => {
    const { mdx, matter } = await loadMdxWithFixture({
      'engine.mdx': '---\ntitle: Engine proof\ndate: 2025-02-02\ndescription: Explicit engine\ntags:\n  - proof\n---\nBody.',
    });
    const legacyParse = matter.default.engines.yaml.parse;
    const sentinel = new Error('legacy default engine must not run');
    matter.default.engines.yaml.parse = () => {
      throw sentinel;
    };

    try {
      const uniqueDefaultInput = `---\ntitle: Default engine ${Date.now()}\n---\nBody.`;
      // Passing an empty options object preserves the default engine while disabling
      // gray-matter's no-options cache, so this arm must execute the sentinel.
      expect(() => matter.default(uniqueDefaultInput, {})).toThrow(sentinel);
      expect(mdx.getAllMDXPosts()[0]?.frontmatter.title).toBe('Engine proof');
      expect(mdx.getMDXPostBySlug('engine')?.content).toBe('Body.');
    } finally {
      matter.default.engines.yaml.parse = legacyParse;
    }
  });

  it('rejects ordinary malformed YAML through exported parsing', async () => {
    const { mdx } = await loadMdxWithFixture({
      'broken.mdx': '---\ntitle: [unterminated\n---\nBody.',
    });

    try {
      mdx.getAllMDXPosts();
      throw new Error('Expected malformed YAML to reject.');
    } catch (error) {
      expect(error).toMatchObject({ name: 'YAMLException' });
    }
  });
});
