import { NextResponse } from 'next/server';

type ContactPayload = {
  fullName?: string;
  company?: string;
  email?: string;
  useCase?: string;
  message?: string;
  timeline?: string;
  phone?: string;
  requestType?: string;
  requestedAsset?: string;
  website?: string;
};

function isValidPayload(payload: ContactPayload) {
  return Boolean(
    payload.fullName?.trim() &&
      payload.company?.trim() &&
      payload.email?.trim() &&
      payload.useCase?.trim() &&
      payload.message?.trim(),
  );
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  if (payload.website) {
    return NextResponse.json({ ok: true });
  }

  if (!isValidPayload(payload)) {
    return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 });
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

  if (webhookUrl) {
    const forwardResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!forwardResponse.ok) {
      return NextResponse.json({ ok: false, error: 'Upstream request failed' }, { status: 502 });
    }
  }

  return NextResponse.json({ ok: true });
}
