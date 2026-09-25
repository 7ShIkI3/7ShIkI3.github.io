/* Contenu du portfolio — source unique utilisée par script.js (modales, terminal, topologie). */
window.PORTFOLIO = {
  identity: {
    name: 'Raphaël Pascaud',
    handle: 'rp',
    title: 'Apprenti administrateur systèmes & réseaux',
    school: 'BUT Réseaux et Télécommunications — IUT d\'Annecy (USMB)',
    company: 'Renault Finance SA — Lausanne',
    location: 'Marthod, 73400',
    email: 'raphaelpascaud.sco@gmail.com',
    github: 'https://github.com/7ShIkI3',
    linkedin: 'https://www.linkedin.com/in/raphael-pascaud-36569a305',
    cv: 'cv-raphael-pascaud.pdf',
    languages: ['Français (natif)', 'Anglais (intermédiaire)', 'Italien (basique)']
  },

  roles: ['Administration réseaux', 'Cybersécurité', 'Systèmes Linux & Windows', 'Automatisation Python / PowerShell'],

  bootLines: [
    'RP-OS v3.0 — initialisation du noyau',
    'chargement des modules réseau ............ [OK]',
    'montage du système de fichiers chiffré ... [OK]',
    'handshake TLS 1.3 avec rp@portfolio ...... [OK]',
    'synchronisation OSPF area 0 .............. [OK]',
    'déchiffrement du profil RAPHAËL_PASCAUD .. [OK]',
    'SYSTEM READY — ouverture de l\'interface'
  ],

  certifications: [
    { name: 'Cisco CCNA1', status: 'Acquis' },
    { name: 'Cisco CCNA2', status: 'Acquis' },
    { name: 'Stormshield', status: 'Acquis' },
    { name: 'Baccalauréat', status: 'Mention AB' },
    { name: 'TOEIC', status: 'Acquis' }
  ],

  skills: {
    'Réseaux': ['VLAN, STP, trunking', 'Routage OSPF, RIP', 'Services DHCP & DNS', 'Interconnexion & matériel réseau', 'Analyse de trafic Wireshark'],
    'Systèmes': ['Administration Linux (Debian, Arch, Kali)', 'Windows, Active Directory, GPO', 'Docker, LDAP, MariaDB/MySQL', 'Virtualisation VMware / VirtualBox / GNS3'],
    'Sécurité': ['Pare-feu & règles d\'accès', 'Gestion d\'accès sécurisé', 'Pentest & audit (Kali, Exegol, BurpSuite)', 'Root-Me : 725 points'],
    'Programmation': ['Python, Bash, CMD, PowerShell', 'PHP & HTML, SQL', 'Automatisation de tâches', 'Suivi de projets en équipe']
  },

  /* Carte réseau des compétences (section 02) */
  topology: {
    core: 'RP',
    hubs: [
      { id: 'reseaux', label: 'Réseaux', leaves: ['VLAN', 'OSPF', 'STP', 'DHCP', 'DNS', 'Cisco'] },
      { id: 'systemes', label: 'Systèmes', leaves: ['Linux', 'Windows', 'AD / GPO', 'Docker', 'LDAP', 'GNS3'] },
      { id: 'securite', label: 'Sécurité', leaves: ['Pare-feu', 'Kali', 'Exegol', 'BurpSuite', 'Wireshark', 'Root-Me'] },
      { id: 'code', label: 'Code', leaves: ['Python', 'Bash', 'PowerShell', 'PHP', 'SQL'] }
    ]
  },

  projects: {
    sae203: {
      kind: 'Projet',
      title: 'Application web de suivi de colis',
      code: 'SAE203',
      category: 'Web',
      duration: 'BUT 1 — Semestre 2',
      role: 'Développeur full-stack',
      description: 'Conception et développement d\'une application de suivi de colis : base de données relationnelle pour les informations colis, interface web en PHP/HTML pour les utilisateurs et l\'administration, et exploitation d\'une API externe pour intégrer les données de livraison en temps réel.',
      objectives: [
        'Modéliser et créer une base de données relationnelle pour le suivi des colis',
        'Développer une interface web dynamique en PHP/HTML (utilisateur + administration)',
        'Intégrer une API externe pour récupérer les statuts de livraison en temps réel'
      ],
      challenges: 'Assurer la cohérence des données entre l\'API externe et la base locale, et gérer l\'affichage en cas d\'indisponibilité du service.',
      learnings: 'Conception de requêtes SQL robustes, consommation d\'API REST et structuration d\'une application web en couches.',
      results: ['Application fonctionnelle de bout en bout : consultation, recherche et suivi', 'Base de données relationnelle normalisée', 'Synchronisation des statuts via l\'API'],
      tech: ['PHP', 'HTML', 'SQL', 'MariaDB/MySQL', 'API REST'],
      link: 'https://github.com/7ShIkI3/SAE203-suivi-de-colis'
    },
    sae204: {
      kind: 'Projet',
      title: 'Administration systèmes Windows & Linux',
      code: 'SAE204',
      category: 'Systèmes',
      duration: 'BUT 1 — Semestre 2',
      role: 'Administrateur systèmes',
      description: 'Créer et administrer un réseau proche d\'un environnement entreprise/université. Automatisation par scripts PowerShell/Batch de la gestion des comptes, des profils itinérants, du mappage de lecteurs et d\'une GPO Firefox ; standardisation des postes via AD/GPO et scripts de logon ; analyse de trafic Wireshark et diagnostic de services côté Linux.',
      objectives: [
        'Automatiser la gestion des comptes et des postes via Active Directory',
        'Déployer profils itinérants, mappage de lecteurs et GPO (dont Firefox)',
        'Diagnostiquer les services Linux et le réseau avec Wireshark, rapport technique à l\'appui'
      ],
      challenges: 'Écrire des scripts idempotents et maîtriser les privilèges utilisés lors des déploiements sur les postes du domaine.',
      learnings: 'Administration Active Directory, stratégies de groupe et industrialisation des tâches d\'administration par scripts PowerShell et Python.',
      results: ['Parc de postes standardisé et reproductible', 'Gestion centralisée des comptes et des profils', 'Scripts PowerShell/Batch réutilisables'],
      tech: ['PowerShell', 'Batch', 'Active Directory', 'GPO', 'Linux', 'Wireshark', 'Python'],
      link: 'https://github.com/7ShIkI3'
    },
    sae302: {
      kind: 'Projet',
      title: 'Applications communicantes',
      code: 'SAE302',
      category: 'Réseaux',
      duration: 'BUT 2 — Semestre 3',
      role: 'Développeur réseau',
      description: 'Conception et développement d\'applications réseau client/serveur avec échanges de données, authentification, sécurité des échanges et stockage. Travail à partir d\'un cahier des charges, avec organisation de projet, documentation et soutenance.',
      objectives: [
        'Concevoir une application client/serveur communicante',
        'Mettre en place l\'authentification et sécuriser les échanges',
        'Stocker les données échangées côté serveur'
      ],
      challenges: 'Choisir les protocoles adaptés et garantir la confidentialité et l\'intégrité des échanges entre le client et le serveur.',
      learnings: 'Programmation socket, protocoles applicatifs, principes d\'authentification et de chiffrement, gestion de projet sur cahier des charges.',
      results: ['Application communicante fonctionnelle avec authentification', 'Échanges sécurisés entre client et serveur', 'Documentation et soutenance finale'],
      tech: ['Sockets', 'Client/Serveur', 'Authentification', 'Chiffrement', 'Python'],
      link: 'https://github.com/7ShIkI3'
    },
    sae304: {
      kind: 'Projet',
      title: 'Pentesting & sécurité réseau',
      code: 'SAE304',
      category: 'Sécurité',
      duration: 'BUT 2 — Semestres 3 & 4',
      role: 'Pentester / auditeur',
      description: 'Audits de vulnérabilités et tests d\'intrusion sur systèmes et applications web, diagnostic réseau avec Wireshark, scripting Python/Bash pour l\'automatisation et l\'exploitation, puis rédaction de rapports techniques et sécurité.',
      objectives: [
        'Réaliser un audit de vulnérabilités sur une infrastructure cible',
        'Mener des tests d\'intrusion avec Kali Linux, Exegol et BurpSuite',
        'Analyser le trafic avec Wireshark et rédiger un rapport technique'
      ],
      challenges: 'Structurer la démarche d\'audit (reconnaissance, exploitation, post-exploitation) et documenter chaque vulnérabilité avec son niveau de risque.',
      learnings: 'Méthodologie de pentest, analyse de protocoles et rédaction de rapports de vulnérabilités lisibles par un public non technique.',
      results: ['Rapport d\'audit avec vulnérabilités priorisées', 'Scénarios d\'intrusion documentés', 'Recommandations de remédiation par criticité'],
      tech: ['Kali Linux', 'Exegol', 'BurpSuite', 'Wireshark', 'Python', 'Bash'],
      link: 'https://github.com/7ShIkI3'
    }
  },

  experiences: {
    renault: {
      kind: 'Expérience',
      title: 'Apprenti — Renault Finance SA',
      code: 'ALT-2026',
      category: 'Alternance',
      duration: 'Sept. 2026 — aujourd\'hui · Lausanne',
      role: 'Apprenti administrateur systèmes & réseaux',
      description: 'Alternance en administration des systèmes et réseaux au sein de Renault Finance SA : mise en pratique des compétences réseau, systèmes et cybersécurité en environnement d\'entreprise.',
      objectives: ['Participer à l\'administration de l\'infrastructure systèmes et réseaux', 'Appliquer les bonnes pratiques de sécurité en environnement financier', 'Monter en compétences sur un SI d\'entreprise en production'],
      tech: ['Réseaux', 'Systèmes', 'Sécurité'],
      link: 'https://www.linkedin.com/in/raphael-pascaud-36569a305'
    },
    ugitech: {
      kind: 'Expérience',
      title: 'Stagiaire — UGITECH',
      code: 'STG-2026',
      category: 'Stage',
      duration: 'Avril — Juin 2026 · Ugine',
      role: 'Stagiaire administration réseaux',
      description: 'Projet d\'administration et aide à la refonte de l\'infrastructure réseau du site industriel.',
      objectives: ['Participer à l\'administration du réseau existant', 'Contribuer techniquement à la refonte des infrastructures réseau'],
      tech: ['Administration réseau', 'Refonte', 'Cisco'],
      link: null
    },
    usmb: {
      kind: 'Formation',
      title: 'BUT Réseaux et Télécommunications',
      code: 'USMB',
      category: 'Formation',
      duration: 'Sept. 2024 — 2027 · Annecy',
      role: 'Étudiant — IUT d\'Annecy, Université Savoie Mont-Blanc',
      description: 'Formation technique en réseaux, systèmes et cybersécurité : routage et commutation Cisco, administration Linux/Windows, virtualisation, sécurité, programmation et projets SAE en équipe.',
      objectives: ['Certifications Cisco CCNA1 & CCNA2 et Stormshield acquises', 'Projets SAE203, SAE204, SAE302, SAE304', 'Alternance à partir de septembre 2026'],
      tech: ['Cisco', 'Linux', 'Windows', 'Sécurité', 'Python'],
      link: null
    },
    creditmutuel: {
      kind: 'Expérience',
      title: 'Stage d\'été — Crédit Mutuel Ugine',
      code: 'STG-2024',
      category: 'Stage',
      duration: 'Août 2024 · Ugine',
      role: 'Accueil clientèle',
      description: 'Découverte du milieu professionnel bancaire : accueil et orientation des clients, développement des compétences relationnelles.',
      objectives: ['Accueillir et orienter la clientèle', 'Découvrir le fonctionnement d\'une agence bancaire'],
      tech: ['Relation client', 'Rigueur'],
      link: null
    },
    lycee: {
      kind: 'Formation',
      title: 'Baccalauréat — Mathématiques & NSI',
      code: 'BAC',
      category: 'Formation',
      duration: '2021 — 2024 · Ugine',
      role: 'Lycée René Perrin',
      description: 'Baccalauréat général, spécialités Mathématiques et Numérique & Sciences Informatiques, obtenu avec mention Assez Bien.',
      objectives: ['Spécialités Mathématiques et NSI', 'Mention Assez Bien'],
      tech: ['Mathématiques', 'NSI', 'Python'],
      link: null
    }
  },

  interests: ['Vélo', 'Course à pied', 'Ski — 10 ans de club à Héry-sur-Ugine', 'Musique — 8 ans, dont 2 en groupe', 'Root-Me & CTF']
};
