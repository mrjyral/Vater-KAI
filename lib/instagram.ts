const GRAPH_URL = 'https://graph.facebook.com/v19.0'
export function buildAuthUrl() {
  const redirect = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/instagram/callback`
  const scopes = 'instagram_business_basic,instagram_business_manage_messages,instagram_business_manage_comments,pages_show_list,pages_messaging,business_management'
  return `https://www.facebook.com/v19.0/dialog/oauth?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${encodeURIComponent(redirect)}&scope=${scopes}&response_type=code`
}
export async function sendInstagramDM(recipientId: string, message: string, accessToken: string) {
  const igUserId = process.env.INSTAGRAM_BUSINESS_ID!
  const res = await fetch(`${GRAPH_URL}/${igUserId}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ recipient: { id: recipientId }, message: { text: message }, access_token: accessToken })
  })
  return res.json()
}
