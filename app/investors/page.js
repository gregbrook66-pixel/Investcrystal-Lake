'use client'
export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Investors() {
  const [investors, setInvestors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) return

    async function load() {
      const { data } = await supabase
        .from('investors')
        .select('*')
        .order('created_at', { ascending: false })

      setInvestors(data || [])
      setLoading(false)
    }

    load()
  }, [])

  if (!supabase) return <p>Configuration error</p>
  if (loading) return <p>Loading investors…</p>

  return (
    <main style={{ padding: 20 }}>
      <h1>Community Investors</h1>

      <p>Total investors: {investors.length}</p>

      {investors.map(i => (
        <div
          key={i.id}
          style={{
            border: '1px solid #ccc',
            marginBottom: 10,
            padding: 10
          }}
        >
          <strong>{i.name}</strong> — {i.country}
          <br />
          Package: {i.package}
          {i.is_early_supporter && <span> 🌱 Early</span>}
        </div>
      ))}
    </main>
  )
}
