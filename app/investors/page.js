'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Investors() {
  const [investors, setInvestors] = useState([])

  useEffect(() => {
    supabase.from('investors').select('*').then(({ data }) => setInvestors(data))
  }, [])

  return (
    <main>
      {investors.map(i => (
        <div key={i.id}>{i.name} — {i.package}</div>
      ))}
    </main>
  )
}
