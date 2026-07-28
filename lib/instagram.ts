const GRAPH_URL = 'https://graph.facebook.com/v19.0'
const IG_ID_FALLBACK = '17841406331656186' // DEINE NEUE ID

export function buildAuthUrl() {
  const redirect = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/instagram/callback`
  // NEU: Instagram Business Login - nicht mehr facebook.com/dialog/oauth
  const scopes = 'instagram_business_basic,instagram_business_manage_messages,instagram_business_manage_comments'
  return `https://www.instagram.com/oauth/authorize?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${encodeURIComponent(redirect)}&scope=${scopes}&response_type=code`
}

export async function sendInstagramDM(recipientId: string, message: string, accessToken: string) {
  const igUserId = process.env.INSTAGRAM_BUSINESS_ID || IG_ID_FALLBACK
  const res = await fetch(`${GRAPH_URL}/${igUserId}/messages?access_token=${accessToken}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      recipient: { id: recipientId }, 
      message: { text: message } 
    })
  })
  return res.json()
}

// Für Debug / Dashboard
export async function getConversations(accessToken: string) {
  const igUserId = process.env.INSTAGRAM_BUSINESS_ID || IG_ID_FALLBACK
  const res = await fetch(`${GRAPH_URL}/${igUserId}/conversations?platform=instagram&access_token=${accessToken}`)
  return res.json()
}
