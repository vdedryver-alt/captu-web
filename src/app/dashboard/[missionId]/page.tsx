'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useParams } from 'next/navigation'

export default function MissionPage() {
  const params = useParams()
  const missionId = params.missionId as string
  const router = useRouter()

  const [mission, setMission] = useState<any>(null)
  const [themeStats, setThemeStats] = useState<any[]>([])
  const [totalCards, setTotalCards] = useState(0)
  const [totalParticipants, setTotalParticipants] = useState(0)
  const [globalPct, setGlobalPct] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [missionId])

  async function loadData() {
    // Mission
    const { data: missionData } = await supabase
      .from('missions')
      .select('id, name, status')
      .eq('id', missionId)
      .single()
    setMission(missionData)

    // Espace
    const { data: space } = await supabase
      .from('spaces')
      .select('id')
      .eq('mission_id', missionId)
      .single()
    if (!space) { setLoading(false); return }

    // Participants
    const { data: members } = await supabase
      .from('mission_members')
      .select('user_id, role')
      .eq('mission_id', missionId)
    setTotalParticipants(members?.length ?? 0)

    // Thèmes et stats
    const { data: themes } = await supabase
      .from('themes')
      .select('id, name, rating_scale')
      .eq('space_id', space.id)

    const stats: any[] = []
    let total = 0

    for (const theme of themes ?? []) {
      const { data: cards } = await supabase
        .from('cards')
        .select('rating')
        .eq('theme_id', theme.id)
        .eq('space_id', space.id)
        .not('rating', 'is', null)

      if (!cards || cards.length === 0) continue

      const scaleMax = theme.rating_scale?.max ?? 5
      const avgRating = cards.reduce((s: number, c: any) => s + c.rating, 0) / cards.length
      const pct = Math.round((avgRating / scaleMax) * 100)

      stats.push({ name: theme.name, pct, avgRating: avgRating.toFixed(1), scaleMax, scaleType: theme.rating_scale?.type ?? 'stars', cardCount: cards.length })
      total += cards.length
    }

    stats.sort((a, b) => a.pct - b.pct)
    setThemeStats(stats)
    setTotalCards(total)

    if (stats.length > 0) {
      const gp = Math.round(stats.reduce((s, t) => s + t.pct * t.cardCount, 0) / stats.reduce((s, t) => s + t.cardCount, 0))
      setGlobalPct(gp)
    }

    setLoading(false)
  }

  const lowThemes = themeStats.filter(t => t.pct < 70)

  return (
    <div style={{ minHeight: '100vh', background: '#1C1B19', fontFamily: 'Georgia, serif' }}>
      {/* Header */}
      <div style={{ borderBottom: '0.5px solid #3A3733', padding: '20px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <span style={{ fontSize: '18px', letterSpacing: '5px', color: '#F7F3EC' }}>CAPTU</span>
          <button onClick={() => router.push('/dashboard')} style={{ background: 'none', border: 'none', color: '#8B8378', cursor: 'pointer', fontSize: '13px' }}>
            ← Mes missions
          </button>
        </div>
        <button onClick={() => supabase.auth.signOut().then(() => router.push('/login'))} style={{ background: 'none', border: 'none', color: '#8B8378', cursor: 'pointer', fontSize: '13px' }}>
          Déconnexion
        </button>
      </div>

      <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '48px' }}>
        {loading ? (
          <p style={{ color: '#8B8378' }}>Chargement...</p>
        ) : (
          <>
            <p style={{ fontSize: '11px', letterSpacing: '2px', color: '#C9622A', marginBottom: '8px' }}>MISSION</p>
            <h1 style={{ fontSize: '32px', fontWeight: 400, color: '#F7F3EC', marginBottom: '40px' }}>{mission?.name}</h1>

            {/* Stats globales */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
              {[
                { value: totalParticipants, label: 'Participants' },
                { value: `${globalPct}%`, label: 'Satisfaction moyenne' },
                { value: totalCards, label: 'Cartes notées' },
              ].map((s, i) => (
                <div key={i} style={{ padding: '28px', background: '#211F1B', border: '0.5px solid #3A3733', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '40px', fontWeight: 400, color: '#F7F3EC', marginBottom: '8px' }}>{s.value}</div>
                  <div style={{ fontSize: '12px', color: '#8B8378' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Alertes */}
            {lowThemes.length > 0 && (
              <div style={{ padding: '16px 20px', background: '#C9622A14', border: '0.5px solid #C9622A33', borderRadius: '10px', marginBottom: '32px' }}>
                <p style={{ color: '#E8A87C', fontSize: '14px', fontStyle: 'italic' }}>
                  ⚠ {lowThemes.map(t => t.name).join(' et ')} en dessous de 70% de satisfaction.
                </p>
              </div>
            )}

            {/* Thèmes */}
            {themeStats.length > 0 && (
              <>
                <p style={{ fontSize: '11px', letterSpacing: '2px', color: '#8B8378', marginBottom: '16px' }}>PAR THÈME</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {themeStats.map(t => (
                    <div key={t.name} style={{ padding: '20px 24px', background: '#211F1B', border: '0.5px solid #3A3733', borderRadius: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span style={{ color: '#F7F3EC', fontSize: '16px' }}>{t.name}</span>
                        <span style={{ color: t.pct < 70 ? '#C9622A' : '#6B7C5C', fontSize: '16px', fontWeight: 'bold' }}>{t.pct}%</span>
                      </div>
                      <div style={{ height: '6px', background: '#2E2B27', borderRadius: '3px', overflow: 'hidden', marginBottom: '8px' }}>
                        <div style={{ height: '100%', width: `${t.pct}%`, background: t.pct < 70 ? '#C9622A' : '#6B7C5C', borderRadius: '3px' }} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#8B8378', fontSize: '12px' }}>
                          {t.scaleType === 'numeric' ? `${t.avgRating}/10` : t.scaleType === 'binary' ? `${t.pct}% réussi` : `${t.avgRating}/5 ⭐`}
                        </span>
                        <span style={{ color: '#5A564E', fontSize: '12px' }}>{t.cardCount} carte{t.cardCount > 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {themeStats.length === 0 && (
              <div style={{ padding: '48px', border: '0.5px dashed #3A3733', borderRadius: '12px', textAlign: 'center', color: '#5A564E' }}>
                <p>Aucune carte notée pour l'instant.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}