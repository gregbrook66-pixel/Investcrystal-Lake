'use client'
export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Register() {
  const [name, setName] = useState('')
  const [country, setCountry] = useState('')
  const [packages, setPackages] = useState([])
  const [selectedPackage, setSelectedPackage] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!supabase) return

    supabase
      .from('packages')
      .select('*')
      .then(({ data }) => setPackages(data || []))
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!supabase) return

    if (!name || !country || !selectedPackage) {
      setMessage('Please fill all fields')
      return
    }

    const { count } = await supabase
      .from('investors')
      .select('*', { count: 'exact', head: true })

    const isEarlySupporter = (count || 0) < 100

    const { error } = await supabase.from('investors').insert({
      name,
      country,
      package: selectedPackage,
      is_early_supporter: isEarlySupporter
    })

    if (error) {
      setMessage('Registration failed')
    } else {
      setMessage(
        `Registered successfully ${
          isEarlySupporter ? '🌱 Early Supporter!' : ''
        }`
      )
      setName('')
      setCountry('')
      setSelectedPackage('')
    }
  }

  if (!supabase) return <p>Configuration error</p>

  return (
    <main style={{ padding: 20 }}>
      <h1>Join Investcrystal</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Full name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          placeholder="Country"
          value={country}
          onChange={e => setCountry(e.target.value)}
        />

        <select
          value={selectedPackage}
          onChange={e => setSelectedPackage(e.target.value)}
        >
          <option value="">Select package</option>
          {packages.map(p => (
            <option key={p.id} value={p.name}>
              {p.name} — ${p.amount}
            </option>
          ))}
        </select>

        <button type="submit">Register</button>
      </form>

      {message && <p>{message}</p>}
    </main>
  )
}
            const projected =
              p.base_projected_value +
              (p.base_projected_value * p.early_bonus_percent) / 100

            return (
              <option key={p.name} value={p.name}>
                {p.name} — ${p.amount} (up to ${projected})
              </option>
            )
          })}
        </select>

        <button
          type="submit"
          style={{
            backgroundColor: 'black',
            color: 'white',
            padding: 10,
            borderRadius: 5
          }}
        >
          Join Community
        </button>
      </form>

      {message && <p style={{ marginTop: 10 }}>{message}</p>}
    </main>
  )
    }
        
