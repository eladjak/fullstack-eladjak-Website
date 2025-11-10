import { Octokit } from '@octokit/rest';
import { supabase } from '@/lib/supabase';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

export interface Project {
  github_id: number;
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  stars: number;
  forks: number;
  watchers: number;
  language: string | null;
  topics: string[];
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

/**
 * Fetch all public repositories for a given GitHub username
 */
export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const { data: repos } = await octokit.repos.listForUser({
      username,
      type: 'public',
      sort: 'updated',
      per_page: 100,
    });

    return repos as GitHubRepo[];
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    throw error;
  }
}

/**
 * Fetch pinned repositories using GitHub GraphQL API
 */
export async function fetchPinnedRepos(username: string): Promise<number[]> {
  try {
    const query = `
      query {
        user(login: "${username}") {
          pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
              ... on Repository {
                databaseId
              }
            }
          }
        }
      }
    `;

    const response: any = await octokit.graphql(query);
    const pinnedIds = response.user.pinnedItems.nodes.map(
      (node: any) => node.databaseId
    );

    return pinnedIds;
  } catch (error) {
    console.error('Error fetching pinned repos:', error);
    return [];
  }
}

/**
 * Sync GitHub repositories to Supabase
 */
export async function syncGitHubRepos(username: string): Promise<{ success: boolean; count: number }> {
  try {
    // 1. Fetch all repos
    const repos = await fetchGitHubRepos(username);

    // 2. Get pinned repos
    const pinnedIds = await fetchPinnedRepos(username);

    // 3. Transform repos to project format
    const projects: Project[] = repos.map((repo) => ({
      github_id: repo.id,
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      homepage: repo.homepage,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      watchers: repo.watchers_count,
      language: repo.language,
      topics: repo.topics || [],
      is_pinned: pinnedIds.includes(repo.id),
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      pushed_at: repo.pushed_at,
    }));

    // 4. Upsert to Supabase (insert or update on conflict)
    const { data, error } = await supabase
      .from('projects')
      .upsert(
        projects.map(p => ({
          github_id: p.github_id,
          name: p.name,
          description: p.description,
          url: p.url,
          demo_url: p.homepage,
          stars: p.stars,
          forks: p.forks,
          watchers: p.watchers,
          language: p.language,
          topics: p.topics,
          is_featured: p.is_pinned, // Use pinned repos as featured
          last_synced: new Date().toISOString(),
        })),
        {
          onConflict: 'github_id',
          ignoreDuplicates: false
        }
      );

    if (error) {
      console.error('Error upserting to Supabase:', error);
      throw error;
    }

    console.log(`Successfully synced ${projects.length} repositories`);

    return {
      success: true,
      count: projects.length,
    };
  } catch (error) {
    console.error('Error syncing GitHub repos:', error);
    return {
      success: false,
      count: 0,
    };
  }
}

/**
 * Get cached projects from Supabase
 */
export async function getCachedProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('stars', { ascending: false });

  if (error) {
    console.error('Error fetching cached projects:', error);
    return [];
  }

  return data;
}
