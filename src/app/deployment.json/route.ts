export const dynamic = 'force-static';

export function GET() {
  const commitSha = process.env.VERCEL_GIT_COMMIT_SHA
    ?? process.env.GITHUB_SHA
    ?? process.env.COMMIT_SHA
    ?? 'local';

  return new Response(JSON.stringify({ commitSha }), {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}
