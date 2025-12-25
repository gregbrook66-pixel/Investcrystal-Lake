import { supabase } from '../../lib/supabase'
          
export default async function Investors() {
  const { data } = await supabase.from('investors').select('*')

  return (
    <main style={{ padding: 20 }}>
      <h1>Community Investors</h1>
      <ul>
        {data.map((i, idx) => (
          <li key={idx}>
            {i.name} — {i.country} — {i.package}{' '}
            {i.is_early_supporter ? '🌱 Early Supporter' : ''}
          </li>
        ))}
      </ul>
    </main>
  )
}
