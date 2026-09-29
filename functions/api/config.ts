// Cloudflare Pages Function: /api/config
// Returns dynamic funnel configuration on Cloudflare Edge

export async function onRequestGet() {
  const config = {
    mentorName: 'Aditya Sakhare',
    mentorTitle: 'Relationship & Conscious Intimacy Mentor',
    communityName: 'Monkhood',
    communityJoinUrl: 'https://join.monkhoodclub.com',
    checkoutUrl: 'https://monkhood.org/checkout/9f9083e9-d8d4-4936-b11a-0ab397dd8fbf',
    googleSheetsWebhook: 'https://script.google.com/macros/s/AKfycbzmwl31w0HaVBtwrRaFGJxV-GlBvMijC1a_NmW_941ywqMEl6tOdDf4DJpw4MarOZaG/exec',
    sessionDuration: '30 Minutes',
    sessionFormat: 'Private 1-on-1 Video Session (100% Confidential)',
    sessionInvestment: 'Exclusive Monkhood Community Member Access',
    currency: 'INR',
    notificationEmail: 'monkhoodlife@gmail.com'
  };

  return new Response(JSON.stringify(config), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=60'
    }
  });
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
