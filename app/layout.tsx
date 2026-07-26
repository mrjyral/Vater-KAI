import './globals.css'
export const metadata = { title: 'VATER-KAI', manifest: '/manifest.json' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="de"><body>{children}</body></html>)
}
