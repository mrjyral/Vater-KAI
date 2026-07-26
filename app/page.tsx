export default function Home() {
  return (
    <main style={{ padding: 40, background: '#0A0A0A', minHeight: '100vh', color: 'white' }}>
      <h1 style={{ fontSize: 32, fontWeight: 700 }}>VATER-KAI ist live</h1>
      <p style={{ marginTop: 12 }}>KI-Vertriebsassistent fuer Andreas Wiede</p>
      <div style={{ marginTop: 24 }}>
        <a href="/dashboard" style={{ background: '#FF4D00', color: 'white', padding: '12px 24px', borderRadius: 8, textDecoration: 'none', display: 'inline-block' }}>Dashboard</a>
      </div>
    </main>
  )
}
