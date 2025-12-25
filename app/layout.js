export default function RootLayout({ children }) {
  return (
    <html>
      <body style={{ fontFamily: 'sans-serif' }}>
        {children}
        <footer style={{ fontSize: 12, marginTop: 40, color: '#555' }}>
          Projected values and bonuses are estimates only and guaranteed.
        </footer>
      </body>
    </html>
  )
}
