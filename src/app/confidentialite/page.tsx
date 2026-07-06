export default function ConfidentialitePage() {
  return (
    <div style={{ minHeight: '100vh', background: '#1C1B19', fontFamily: 'Georgia, serif', color: '#D8D2C4' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '64px 48px' }}>
        
        <a href="https://app.captu.fr" style={{ fontSize: '13px', color: '#8B8378', textDecoration: 'none', display: 'block', marginBottom: '48px' }}>← Retour</a>
        
        <p style={{ fontSize: '11px', letterSpacing: '2px', color: '#C9622A', marginBottom: '16px' }}>DONNÉES PERSONNELLES</p>
        <h1 style={{ fontSize: '36px', fontWeight: 400, color: '#F7F3EC', marginBottom: '8px' }}>Politique de confidentialité</h1>
        <p style={{ color: '#5A564E', fontSize: '13px', marginBottom: '48px' }}>Dernière mise à jour : juillet 2026</p>

        <div style={{ background: '#211F1B', border: '0.5px solid #3A3733', borderRadius: '8px', padding: '20px 24px', marginBottom: '32px' }}>
          <p style={{ color: '#D8D2C4', margin: 0 }}>Captu est conçu dans le respect de votre vie privée. Nous collectons uniquement les données nécessaires au fonctionnement de l'application et ne les vendons jamais à des tiers.</p>
        </div>

        <h2 style={{ fontSize: '20px', fontWeight: 400, color: '#F7F3EC', borderLeft: '3px solid #C9622A', paddingLeft: '16px', margin: '40px 0 16px' }}>1. Qui sommes-nous ?</h2>
        <p style={{ color: '#8B8378', lineHeight: 1.75 }}>Captu est une application mobile et web éditée par la société Captu (en cours d'immatriculation), dont le siège social est en France. Pour toute question : <strong style={{ color: '#C9622A' }}>contact@captu.fr</strong></p>

        <h2 style={{ fontSize: '20px', fontWeight: 400, color: '#F7F3EC', borderLeft: '3px solid #C9622A', paddingLeft: '16px', margin: '40px 0 16px' }}>2. Données collectées</h2>
        <ul style={{ color: '#8B8378', paddingLeft: '20px', lineHeight: 2 }}>
          <li><strong style={{ color: '#D8D2C4' }}>Données de compte</strong> — adresse email et mot de passe (chiffré)</li>
          <li><strong style={{ color: '#D8D2C4' }}>Données de contenu</strong> — cartes, textes, transcriptions, photos, documents, thèmes, statuts, notes</li>
          <li><strong style={{ color: '#D8D2C4' }}>Données audio</strong> — enregistrements transmis à OpenAI (Whisper) pour transcription puis supprimés</li>
          <li><strong style={{ color: '#D8D2C4' }}>Données de mission</strong> — email et rôle au sein d'une mission organisationnelle</li>
          <li><strong style={{ color: '#D8D2C4' }}>Données techniques</strong> — logs d'utilisation anonymisés</li>
        </ul>

        <h2 style={{ fontSize: '20px', fontWeight: 400, color: '#F7F3EC', borderLeft: '3px solid #C9622A', paddingLeft: '16px', margin: '40px 0 16px' }}>3. Finalités du traitement</h2>
        <ul style={{ color: '#8B8378', paddingLeft: '20px', lineHeight: 2 }}>
          <li>Vous permettre de créer et gérer votre compte</li>
          <li>Stocker et afficher vos cartes et expériences</li>
          <li>Transcrire vos notes vocales via Whisper (OpenAI)</li>
          <li>Générer des suggestions de thème via Claude (Anthropic)</li>
          <li>Générer des rapports d'analyse sur demande</li>
          <li>Vous permettre de collaborer au sein d'une mission</li>
        </ul>

        <h2 style={{ fontSize: '20px', fontWeight: 400, color: '#F7F3EC', borderLeft: '3px solid #C9622A', paddingLeft: '16px', margin: '40px 0 16px' }}>4. Partage des données</h2>
        <ul style={{ color: '#8B8378', paddingLeft: '20px', lineHeight: 2 }}>
          <li><strong style={{ color: '#D8D2C4' }}>Supabase</strong> — stockage des données, authentification</li>
          <li><strong style={{ color: '#D8D2C4' }}>OpenAI</strong> — transcription audio via Whisper (fichiers supprimés après traitement)</li>
          <li><strong style={{ color: '#D8D2C4' }}>Anthropic</strong> — suggestion de thème via Claude (aucune donnée personnelle identifiable)</li>
          <li><strong style={{ color: '#D8D2C4' }}>Vercel</strong> — hébergement du site et de l'interface web</li>
        </ul>
        <p style={{ color: '#8B8378', lineHeight: 1.75 }}>Nous ne vendons jamais vos données à des tiers. Nous ne les partageons pas avec des partenaires publicitaires.</p>

        <h2 style={{ fontSize: '20px', fontWeight: 400, color: '#F7F3EC', borderLeft: '3px solid #C9622A', paddingLeft: '16px', margin: '40px 0 16px' }}>5. Conservation des données</h2>
        <ul style={{ color: '#8B8378', paddingLeft: '20px', lineHeight: 2 }}>
          <li><strong style={{ color: '#D8D2C4' }}>Données de compte</strong> — conservées pendant la durée du compte, supprimées dans les 30 jours suivant la fermeture</li>
          <li><strong style={{ color: '#D8D2C4' }}>Données de contenu</strong> — conservées tant que votre compte est actif</li>
          <li><strong style={{ color: '#D8D2C4' }}>Enregistrements audio</strong> — supprimés de nos serveurs après transcription</li>
          <li><strong style={{ color: '#D8D2C4' }}>Logs techniques</strong> — conservés 90 jours</li>
        </ul>

        <h2 style={{ fontSize: '20px', fontWeight: 400, color: '#F7F3EC', borderLeft: '3px solid #C9622A', paddingLeft: '16px', margin: '40px 0 16px' }}>6. Vos droits (RGPD)</h2>
        <ul style={{ color: '#8B8378', paddingLeft: '20px', lineHeight: 2 }}>
          <li><strong style={{ color: '#D8D2C4' }}>Droit d'accès</strong> — obtenir une copie de vos données</li>
          <li><strong style={{ color: '#D8D2C4' }}>Droit de rectification</strong> — corriger vos données inexactes</li>
          <li><strong style={{ color: '#D8D2C4' }}>Droit à l'effacement</strong> — demander la suppression de vos données</li>
          <li><strong style={{ color: '#D8D2C4' }}>Droit à la portabilité</strong> — recevoir vos données dans un format structuré</li>
          <li><strong style={{ color: '#D8D2C4' }}>Droit d'opposition</strong> — vous opposer à certains traitements</li>
        </ul>
        <p style={{ color: '#8B8378', lineHeight: 1.75 }}>Pour exercer ces droits : <strong style={{ color: '#C9622A' }}>contact@captu.fr</strong>. Délai de réponse : 30 jours. Vous pouvez également contacter la CNIL sur <a href="https://cnil.fr" style={{ color: '#C9622A' }}>cnil.fr</a>.</p>

        <h2 style={{ fontSize: '20px', fontWeight: 400, color: '#F7F3EC', borderLeft: '3px solid #C9622A', paddingLeft: '16px', margin: '40px 0 16px' }}>7. Sécurité</h2>
        <ul style={{ color: '#8B8378', paddingLeft: '20px', lineHeight: 2 }}>
          <li>Chiffrement des communications (HTTPS/TLS)</li>
          <li>Authentification sécurisée via Supabase Auth</li>
          <li>Contrôle d'accès granulaire (Row Level Security)</li>
          <li>Mots de passe chiffrés (jamais stockés en clair)</li>
        </ul>

        <h2 style={{ fontSize: '20px', fontWeight: 400, color: '#F7F3EC', borderLeft: '3px solid #C9622A', paddingLeft: '16px', margin: '40px 0 16px' }}>8. Modifications</h2>
        <p style={{ color: '#8B8378', lineHeight: 1.75 }}>Nous pouvons modifier cette politique à tout moment. En cas de modification substantielle, nous vous en informerons par email ou via une notification dans l'application.</p>

        <div style={{ marginTop: '48px', padding: '24px', background: '#211F1B', borderRadius: '8px', border: '0.5px solid rgba(201,98,42,0.3)' }}>
          <p style={{ color: '#F7F3EC', marginBottom: '8px', fontWeight: 600 }}>Contact</p>
          <p style={{ color: '#8B8378', margin: '4px 0' }}>📧 contact@captu.fr</p>
          <p style={{ color: '#8B8378', margin: '4px 0' }}>🌐 <a href="https://captu.fr" style={{ color: '#C9622A' }}>captu.fr</a></p>
        </div>

        <p style={{ color: '#5A564E', fontSize: '12px', textAlign: 'center', marginTop: '64px' }}>© 2026 Captu · captu.fr</p>
      </div>
    </div>
  )
}