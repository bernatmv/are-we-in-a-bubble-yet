export default async function refresh(request, response) {
  if (request.method !== 'GET') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.authorization !== `Bearer ${secret}`) {
    return response.status(401).json({ error: 'Unauthorized' });
  }

  const deployHook = process.env.VERCEL_DEPLOY_HOOK_URL;
  if (!deployHook) {
    return response.status(500).json({ error: 'VERCEL_DEPLOY_HOOK_URL is not configured' });
  }

  try {
    const deployment = await fetch(deployHook, { method: 'POST' });
    if (!deployment.ok) {
      return response.status(502).json({ error: 'Vercel deploy hook failed' });
    }

    return response.status(202).json({ ok: true, message: 'Daily data rebuild queued' });
  } catch {
    return response.status(502).json({ error: 'Could not reach Vercel deploy hook' });
  }
}
