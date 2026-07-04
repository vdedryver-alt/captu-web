'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Email ou mot de passe incorrect.')
      setLoading(false)
      return
    }

    router.push('/dashboard')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1C1B19',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Georgia, serif',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        padding: '48px 40px',
        background: '#211F1B',
        borderRadius: '16px',
        border: '0.5px solid #3A3733',
      }}>
        <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#C9622A', marginBottom: '12px' }}>
          CAPTU
        </p>
        <h1 style={{ fontSize: '28px', fontWeight: 400, color: '#F7F3EC', marginBottom: '8px' }}>
          Connexion
        </h1>
        <p style={{ fontSize: '14px', color: '#8B8378', marginBottom: '32px' }}>
          Interface de gestion des missions
        </p>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '11px', color: '#8B8378', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>
            EMAIL
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="votre@email.com"
            style={{
              width: '100%',
              padding: '12px 16px',
              background: '#1C1B19',
              border: '0.5px solid #3A3733',
              borderRadius: '8px',
              color: '#F7F3EC',
              fontSize: '15px',
              outline: 'none',
            }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ fontSize: '11px', color: '#8B8378', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>
            MOT DE PASSE
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            style={{
              width: '100%',
              padding: '12px 16px',
              background: '#1C1B19',
              border: '0.5px solid #3A3733',
              borderRadius: '8px',
              color: '#F7F3EC',
              fontSize: '15px',
              outline: 'none',
            }}
          />
        </div>

        {error && (
          <p style={{ fontSize: '13px', color: '#C9622A', marginBottom: '16px' }}>{error}</p>
        )}

        <button
          onClick={handleLogin}
          disabled={loading || !email || !password}
          style={{
            width: '100%',
            padding: '14px',
            background: loading || !email || !password ? '#3A3733' : '#C9622A',
            border: 'none',
            borderRadius: '8px',
            color: '#F7F3EC',
            fontSize: '15px',
            cursor: loading ? 'wait' : 'pointer',
            fontFamily: 'Georgia, serif',
          }}
        >
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </div>
    </div>
  )
}