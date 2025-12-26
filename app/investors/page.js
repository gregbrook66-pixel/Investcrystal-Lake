'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Investors() {
  const [investors, setInvestors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data } = await
