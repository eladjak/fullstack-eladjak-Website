import fs from 'fs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { getAllMDXPosts, getAllMDXTags, getMDXPostBySlug } from '../mdx';

vi.mock('reading-time', () => ({
  default: (content: string) => ({ minutes: content.length / 200 }),
}));

const MOCK_POST_1 = `---
title: "First Post"
date: "2025-01-15"
description: "A first post"
tags:
  - typescript
  - react
published: true
---

This is the first post content.`;

const MOCK_POST_2 = `---
title: "Second Post"
date: "2025-02-20"
description: "A second post"
tags:
  - nextjs
  - react
published: true
---

This is the second post content.`;

const MOCK_POST_UNPUBLISHED = `---
title: "Draft Post"
date: "2025-03-01"
description: "A draft"
tags:
  - draft
published: false
---

Draft content here.`;

describe('mdx utilities', () => {
  let existsSyncSpy: ReturnType<typeof vi.spyOn>;
  let readdirSyncSpy: ReturnType<typeof vi.spyOn>;
  let readFileSyncSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    existsSyncSpy = vi.spyOn(fs, 'existsSync');
    readdirSyncSpy = vi.spyOn(fs, 'readdirSync');
    readFileSyncSpy = vi.spyOn(fs, 'readFileSync');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getAllMDXPosts', () => {
    it('returns an array of posts sorted by date (newest first)', () => {
      existsSyncSpy.mockReturnValue(true);
      readdirSyncSpy.mockReturnValue(
        ['first-post.mdx', 'second-post.mdx'] as unknown as fs.Dirent[],
      );
      readFileSyncSpy.mockImplementation((filePath: fs.PathOrFileDescriptor) => {
        const p = String(filePath);
        if (p.includes('first-post')) return MOCK_POST_1;
        if (p.includes('second-post')) return MOCK_POST_2;
        return '';
      });

      const posts = getAllMDXPosts();

      expect(Array.isArray(posts)).toBe(true);
      expect(posts).toHaveLength(2);
      // Newest first
      expect(posts[0]!.slug).toBe('second-post');
      expect(posts[1]!.slug).toBe('first-post');
    });

    it('returns an empty array when the blog directory does not exist', () => {
      existsSyncSpy.mockReturnValue(false);

      const posts = getAllMDXPosts();

      expect(posts).toEqual([]);
    });

    it('filters out unpublished posts', () => {
      existsSyncSpy.mockReturnValue(true);
      readdirSyncSpy.mockReturnValue(
        ['first-post.mdx', 'draft.mdx'] as unknown as fs.Dirent[],
      );
      readFileSyncSpy.mockImplementation((filePath: fs.PathOrFileDescriptor) => {
        const p = String(filePath);
        if (p.includes('first-post')) return MOCK_POST_1;
        if (p.includes('draft')) return MOCK_POST_UNPUBLISHED;
        return '';
      });

      const posts = getAllMDXPosts();

      expect(posts).toHaveLength(1);
      expect(posts[0]!.slug).toBe('first-post');
    });

    it('includes readingTime as a number', () => {
      existsSyncSpy.mockReturnValue(true);
      readdirSyncSpy.mockReturnValue(
        ['first-post.mdx'] as unknown as fs.Dirent[],
      );
      readFileSyncSpy.mockReturnValue(MOCK_POST_1);

      const posts = getAllMDXPosts();

      expect(typeof posts[0]!.readingTime).toBe('number');
    });
  });

  describe('getMDXPostBySlug', () => {
    it('returns the correct post for a valid slug', () => {
      existsSyncSpy.mockReturnValue(true);
      readFileSyncSpy.mockReturnValue(MOCK_POST_1);

      const post = getMDXPostBySlug('first-post');

      expect(post).not.toBeNull();
      expect(post!.slug).toBe('first-post');
      expect(post!.frontmatter.title).toBe('First Post');
      expect(post!.frontmatter.tags).toContain('typescript');
    });

    it('returns null for a non-existent slug', () => {
      existsSyncSpy.mockReturnValue(false);

      const post = getMDXPostBySlug('non-existent');

      expect(post).toBeNull();
    });

    it('includes content and readingTime', () => {
      existsSyncSpy.mockReturnValue(true);
      readFileSyncSpy.mockReturnValue(MOCK_POST_2);

      const post = getMDXPostBySlug('second-post');

      expect(post!.content).toContain('second post content');
      expect(typeof post!.readingTime).toBe('number');
    });
  });

  describe('getAllMDXTags', () => {
    it('returns unique tags sorted alphabetically', () => {
      existsSyncSpy.mockReturnValue(true);
      readdirSyncSpy.mockReturnValue(
        ['first-post.mdx', 'second-post.mdx'] as unknown as fs.Dirent[],
      );
      readFileSyncSpy.mockImplementation((filePath: fs.PathOrFileDescriptor) => {
        const p = String(filePath);
        if (p.includes('first-post')) return MOCK_POST_1;
        if (p.includes('second-post')) return MOCK_POST_2;
        return '';
      });

      const tags = getAllMDXTags();

      expect(Array.isArray(tags)).toBe(true);
      // 'react' appears in both posts but should be unique
      expect(tags).toEqual(['nextjs', 'react', 'typescript']);
    });

    it('returns an empty array when no posts exist', () => {
      existsSyncSpy.mockReturnValue(false);

      const tags = getAllMDXTags();

      expect(tags).toEqual([]);
    });
  });
});
