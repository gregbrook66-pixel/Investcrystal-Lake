import { supabase } from './supabase'

export async function isAdmin() {
  if (!supabase) return false

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) return false

  const { data } = await supabase
    .from('admins')
    .select('*')
    .eq('id', user.id)
    .single()

  return !!data
    }
