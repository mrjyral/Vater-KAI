export default function Dashboard() {
  return (
    <div style={{ padding: 24, background: '#0A0A0A', minHeight: '100vh', color: 'white' }}>
      <h2 style={{ fontSize: 24, fontWeight: 700 }}>Dashboard - Andreas Wiede</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginTop: 20 }}>
        <div style={{ background: '#1A1A1A', padding: 16, borderRadius: 12 }}><div style={{ opacity: 0.6 }}>Kontakte heute</div><div style={{ fontSize: 28, fontWeight: 700 }}>23</div></div>
        <div style={{ background: '#1A1A1A', padding: 16, borderRadius: 12 }}><div style={{ opacity: 0.6 }}>Antworten</div><div style={{ fontSize: 28, fontWeight: 700 }}>7</div></div>
        <div style={{ background: '#1A1A1A', padding: 16, borderRadius: 12 }}><div style={{ opacity: 0.6 }}>Qualifizierte</div><div style={{ fontSize: 28, fontWeight: 700 }}>4</div></div>
        <div style={{ background: '#1A1A1A', padding: 16, borderRadius: 12 }}><div style={{ opacity: 0.6 }}>Termine</div><div style={{ fontSize: 28, fontWeight: 700 }}>2</div></div>
      </div>
      <div style={{ marginTop: 24, background: '#111', padding: 16, borderRadius: 12 }}>
        <h4>Live Log</h4>
        <div style={{ fontFamily: 'monospace', fontSize: 13, marginTop: 6 }}>Analysiere Profil: Markus, 42, 2 Kinder</div>
        <div style={{ fontFamily: 'monospace', fontSize: 13, marginTop: 6 }}>Match 94 Prozent</div>
      </div>
    </div>
  )
}
