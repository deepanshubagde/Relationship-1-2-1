// Cloudflare Pages Function: /api/submit
// Runs on Cloudflare's Edge Network for instant response & forwarding

export async function onRequestPost(context: any) {
  try {
    const payload = await context.request.json();
    
    // Default webhook & checkout target
    const defaultWebhook = 'https://script.google.com/macros/s/AKfycbzmwl31w0HaVBtwrRaFGJxV-GlBvMijC1a_NmW_941ywqMEl6tOdDf4DJpw4MarOZaG/exec';
    const checkoutUrl = 'https://monkhood.org/checkout/9f9083e9-d8d4-4936-b11a-0ab397dd8fbf';

    const submission = {
      id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      status: 'New',
      ...payload
    };

    // Forward to Google Sheets Webhook
    try {
      await fetch(defaultWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission),
        redirect: 'follow'
      });
    } catch (e) {
      console.warn('Cloudflare function webhook forward warning:', e);
    }

    return new Response(
      JSON.stringify({
        success: true,
        id: submission.id,
        redirectUrl: checkoutUrl
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        error: err?.message || 'Internal submission error'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    }
  });
}
