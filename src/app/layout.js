import './globals.css'

export const metadata = {
  title: 'Life Story Interview',
  description: 'AI-powered life story interview application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}