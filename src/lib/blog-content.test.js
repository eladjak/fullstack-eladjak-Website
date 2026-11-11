import { describe, expect, test } from 'bun:test';
import { mergePosts } from './blog-content';
const body = [{_type:'block', _key:'b', children:[{_type:'span', _key:'s', text:'Hello', marks:[]}], markDefs:[], style:'normal'}];
describe('published blog merge', () => {
  test('keeps both translations under one URL and prefers static duplicates', () => {
    const local = [{slug:'local', content:'', readingTime:1, frontmatter:{title:'Local',date:'2026-01-01',description:'',tags:[]}}];
    const records = [
      {_id:'en',slug:'new',language:'en',title:'English',publishedAt:'2026-02-01',body},
      {_id:'he',slug:'new',language:'he',title:'עברית',publishedAt:'2026-02-01',body},
      {_id:'duplicate',slug:'local',language:'he',title:'Remote',publishedAt:'2026-03-01',body},
    ];
    const posts = mergePosts(local, records);
    expect(posts.map(p=>p.slug)).toEqual(['new','local']);
    expect(posts[0].frontmatter.titleHe).toBe('עברית');
    expect(posts[0].frontmatter.title).toBe('English');
    expect(posts[0].sanityBodies?.he).toEqual(body);
    expect(posts[1].frontmatter.title).toBe('Local');
  });
});
