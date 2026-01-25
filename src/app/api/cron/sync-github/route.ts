import { NextRequest, NextResponse } from 'next/server';
import { syncGitHubRepos } from '@/lib/github/sync';

/**
 * API Route for syncing GitHub repositories
 * This can be triggered by:
 * 1. Vercel Cron Job (configured in vercel.json)
 * 2. Manual call with authorization header
 */
export async function GET(request: NextRequest) {
  // Verify authorization
  const authHeader = request.headers.get('authorization');
  const expectedAuth = `Bearer ${process.env.CRON_SECRET}`;

  if (authHeader !== expectedAuth) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const username = process.env.GITHUB_USERNAME || 'eladjak';
    const userId = process.env.GITHUB_USER_ID;

    if (!userId) {
      return NextResponse.json(
        { error: 'GITHUB_USER_ID environment variable not set' },
        { status: 500 }
      );
    }

    console.log(`Starting GitHub sync for user: ${username}`);

    const result = await syncGitHubRepos(username, userId);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `Successfully synced ${result.count} repositories`,
        count: result.count,
        timestamp: new Date().toISOString(),
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to sync repositories',
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Sync error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Allow POST as well for manual triggers
export async function POST(request: NextRequest) {
  return GET(request);
}
