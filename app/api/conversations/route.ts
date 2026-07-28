export async function GET() {
  const PAGE_ID = process.env.FACEBOOK_PAGE_ID;
  const PAGE_TOKEN = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;

  const url = `https://graph.facebook.com/v19.0/${PAGE_ID}/conversations?platform=instagram&fields=participants,snippet,updated_time&access_token=${PAGE_TOKEN}`;

  const res = await fetch(url, { cache: 'no-store' });
  const data = await res.json();
  
  return Response.json(data);
}
