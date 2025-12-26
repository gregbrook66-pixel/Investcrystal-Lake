'use client'
export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import { isAdmin } from '../../lib/auth'

export default function Admin() {
  const [loading, setLoading] = useState(true)
  const [allowed, setAllowed] = useState(false)
  const router = useRouter()

  useEffect(() => {
    async function check() {
      if (!supabase) return

      const ok = await isAdmin()
      if (!ok) {
        router.push('/login')
      } else {
        setAllowed(true)
      }
      setLoading(false)
    }

    check()
  }, [])

  if (loading) return <p>Checking access…</p>
  if (!allowed) return null

  return (
    <main style={{ padding: 20 }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome, admin.</p>
    </main>
  )
}
