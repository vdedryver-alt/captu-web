'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [missions, setMissions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    loadMissions()
  }, [])

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) router.push('/login')
  }

  async function loadMissions() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data } = await supabase
      .from('mission_members')
      .select('mission_id, role, missions(id, name, status, created_at)')
      .eq('user_id', user.id)

    setMissions(data ?? [])
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#1C1B19', fontFamily: 'Georgia, serif' }}>
      {/* Header */}
      <div style={{
        borderBottom: '0.5px solid #3A3733',
        padding: '20px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span style={{ fontSize: '18px', letterSpacing: '5px', color: '#F7F3EC' }}>CAPTU</span>
        <button
          onClick={() => supabase.auth.signOut().then(() => router.push('/login'))}
          style={{ background: 'none', border: 'none', color: '#8B8378', cursor: 'pointer', fontSize: '13px' }}
        >
          Déconnexion
        </button>
      </div>

      {/* Contenu */}
      <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '48px' }}>
        <p style={{ fontSize: '11px', letterSpacing: '2px', color: '#C9622A', marginBottom: '8px' }}>
          TABLEAU DE BORD
        </p>
        <h1 style={{ fontSize: '32px', fontWeight: 400, color: '#F7F3EC', marginBottom: '8px' }}>
          Mes missions
        </h1>
        <p style={{ fontSize: '14px', color: '#8B8378', marginBottom: '48px' }}>
          Sélectionnez une mission pour voir le dashboard et les rapports.
        </p>

        {loading ? (
          <p style={{ color: '#8B8378' }}>Chargement...</p>
        ) : missions.length === 0 ? (
          <div style={{
            padding: '48px',
            border: '0.5px dashed #3A3733',
            borderRadius: '12px',
            textAlign: 'center',
            color: '#5A564E'
          }}>
            <p style={{ fontSize: '16px', marginBottom: '8px' }}>Aucune mission</p>
            <p style={{ fontSize: '13px' }}>Créez une mission depuis l'application mobile Captu.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {missions.map((m: any) => (
              <div
                key={m.mission_id}
                onClick={() => router.push(`/dashboard/${m.mission_id}`)}
                style={{
                  padding: '28px',
                  background: '#211F1B',
                  border: '0.5px solid #3A3733',
                  borderRadius: '12px',
                  cursor: 'pointer',
                }}
              >
                <p style={{ fontSize: '11px', color: m.role === 'manager' ? '#C9622A' : '#6B7C5C', letterSpacing: '1px', marginBottom: '8px' }}>
                  {m.role === 'manager' ? '👑 MANAGER' : '👤 PARTICIPANT'}
                </p>
                <h2 style={{ fontSize: '20px', fontWeight: 400, color: '#F7F3EC', marginBottom: '8px' }}>
                  {m.missions?.name}
                </h2>
                <p style={{ fontSize: '12px', color: '#5A564E' }}>
                  {m.missions?.status === 'active' ? '● Active' : '○ Terminée'}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}