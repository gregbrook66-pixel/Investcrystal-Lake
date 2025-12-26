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
    supabase
      .from('packages')
      .select('name, amount, base_projected_value, early_bonus_percent')
      .then(({ data }) => {
        setPackages(data || [])
      })
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()

    if (!name || !country || !selectedPackage) {
      setMessage('Please fill all fields')
      return
    }

    // Check if already 100 early supporters
    const { count } = await supabase
      .from('investors')
      .select('*', { count: 'exact', head: true })

    const isEarlySupporter = count < 100

    const { error } = await supabase.from('investors').insert({
      name,
      country,
      package: selectedPackage,
      is_early_supporter: isEarlySupporter
    })

    if (error) {
      setMessage('Something went wrong. Try again.')
    } else {
      setMessage(
        `You have successfully joined 🎉${
          isEarlySupporter ? ' (Early Supporter Bonus!)' : ''
        }`
      )
      setName('')
      setCountry('')
      setSelectedPackage('')
    }
  }

  return (
    <main style={{ padding: 20, maxWidth: 400 }}>
      <h1>Join as an Early Supporter</h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <input
          placeholder="Full name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />

        <input
          placeholder="Country"
          value={country}
          onChange={e => setCountry(e.target.value)}
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />

        <select
          value={selectedPackage}
          onChange={e => setSelectedPackage(e.target.value)}
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        >
          <option value="">Select a package</option>
          {packages.map(p => {
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
        
