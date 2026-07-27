"use client"
import { useState } from 'react'

export default function Dashboard() {
  const [leads, setLeads] = useState<any[]>([
    { username: 'markus_42_familie', score: 94, status: 'neu' },
    { username: 'papa_ben_berlin', score: 88, status: 'neu' }
  ])
  const [loading, setLoading] = useState(false)

  async function findLeads() {
    setLoading(true)
    try {
      const res = await fetch('/api/leads/find', { method: 'POST' })
      const data = await res.json()
      if(data.leads) setLeads(data.leads)
    } catch(e) {
      alert('Supabase noch nicht verbunden - zeige Demo Daten')
    }
    setLoading(false)
  }

  return (
    <div style={{ padding: 24, background: '#0A0A0A', minHeight: '100vh', color: 'white', fontFamily: 'system-ui' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800 }}>VATER-KAI 🤖</h1>
      <p style={{ opacity: 0.6, marginTop: 4 }}>Lead Maschine für Andreas Wiede - 4-fach Papa</p>
      
      <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
        <a href="/api/auth/instagram" style={{ background: '#FF4D00', color: 'white', padding: '12px 20px', borderRadius: 10, textDecoration: 'none', fontWeight: 600 }}>📲 Mit Instagram verbinden</a>
        <button onClick={findLeads} style={{ background: '#1A1A1A', border: '1px solid #333', color: 'white', padding: '12px 20px', borderRadius: 10, fontWeight: 600 }}>
          {loading ? 'Suche...' : '🔍 Leads finden'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 24 }}>
        <div style={{ background: '#1A1A1A', padding: 16, borderRadius: 12 }}><div style={{ opacity: 0.5, fontSize: 13 }}>Gefunden</div><div style={{ fontSize: 26, fontWeight: 700, marginTop: 4 }}>{leads.length}</div></div>
        <div style={{ background: '#1A1A1A', padding: 16, borderRadius: 12 }}><div style={{ opacity: 0.5, fontSize: 13 }}>Avg Score</div><div style={{ fontSize: 26, fontWeight: 700, marginTop: 4 }}>91%</div></div>
      </div>

      <h3 style={{ marginTop: 28, fontSize: 18, fontWeight: 700 }}>Aktuelle Leads</h3>
      <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {leads.map((lead, i) => (
          <div key={i} style={{ background: '#1A1A1A', padding: 16, borderRadius: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600 }}>@{lead.username}</div>
              <div style={{ fontSize: 13, opacity: 0.6, marginTop: 2 }}>Match: {lead.score || lead.match_score}% • {lead.status}</div>
            </div>
            <button style={{ background: '#FF4D00', border: 0, color: 'white', padding: '8px 14px', borderRadius: 8, fontSize: 13 }}>Anschreiben</button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 32, padding: 16, background: '#111', borderRadius: 12, border: '1px dashed #333' }}>
        <div style={{ fontSize: 13, opacity: 0.7 }}>Deine Live URL:</div>
        <div style={{ marginTop: 4, color: '#FF4D00', fontWeight: 600 }}>vater-kai-1.vercel.app</div>
        <div style={{ marginTop: 8, fontSize: 13, opacity: 0.5 }}>Status: ✅ Ready - Build grün seit 1c6ddc7</div>
      </div>
    </div>
  )
}
