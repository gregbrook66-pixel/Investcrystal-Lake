'use client'
export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Investors() {
  const [investors, setInvestors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadInvestors() {
      const { data, error } = await supabase
        .from('investors')
        .select('*')

      if (!error) setInvestors(data || [])
      setLoading(false)
    }

    loadInvestors()
  }, [])

  if (loading) return <p>Loading investors…</p>

  return (
    <main>
      {investors.map(i => (
        <div key={i.id}>
          {i.name} — {i.package}
        </div>
      ))}
    </main>
  )
}
