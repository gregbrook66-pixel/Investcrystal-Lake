'use client'
export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Admin() {
  const [investors, setInvestors] = useState([])

  useEffect(() => {
    if (!supabase) return

    supabase
      .from('investors')
      .select('*')
      .then(({ data }) => setInvestors(data || []))
  }, [])

  if (!supabase) return <p>Configuration error</p>

  return (
    <main style={{ padding: 20 }}>
      <h1>Admin Dashboard</h1>

      {investors.map(i => (
        <p key={i.id}>
          {i.name} — {i.package} {i.is_early_supporter && '🌱'}
        </p>
      ))}
    </main>
  )
}
