// =============================
// 🎮 PORTFOLIO INTERACTIF
// Auteur : Alexis BAIL
// Framework : React + Tailwind + Framer Motion
// =============================

// Importation des outils principaux de React
import React, { useEffect, useMemo, useRef, useState } from "react";

// Importation des animations de Framer Motion
import { motion, AnimatePresence } from "framer-motion";

// Importation d’icônes modernes depuis Lucide React (SVGs légers)
import {
  Sun,
  Moon,
  Search,
  Github,
  Linkedin,
  Mail,
  Download,
  ExternalLink,
  Sparkles,
  Filter,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  MapPin,
  Calendar,
  Code2,
} from "lucide-react";

// =============================
// 🧩 GlobalStyles
// Composant React injectant du CSS global dans le document.
// Il gère :
//  - la police d’écriture pixel "Press Start 2P"
//  - les variables de couleurs néon (violet, vert, bleu)
//  - les effets CRT (lignes horizontales façon écran rétro)
//  - les ombres et bordures pour les boutons et cartes
// =============================
// =============================
// 🧩 GlobalStyles (version améliorée avec thème Light/Dark)
// =============================
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

    /* =========================
       🎨 THEME VARIABLES (Light ↔ Dark)
       ========================= */
    :root {
      /* LIGHT par défaut (quand .dark n'est PAS présente) */
      --bg: #f4f4f5;   /* fond clair */
      --fg: #0a0b10;   /* texte foncé */

      /* dérivés pour remplacer les utilitaires tailwind "white/..." ou "black/..." */
      --border-weak: rgba(0,0,0,.10);  /* remplace border-[var(--border-weak)] en light */
      --tint-soft: rgba(0,0,0,.05);    /* remplace bg-[var(--tint-soft)] en light */
    }

    /* Thème clair vs sombre (variables) */
    html.dark {
      --bg: #0a0b10;                 /* fond global (dark) */
      --fg: #e5e7eb;                 /* texte global (dark) */
      --muted: #a1a1aa;              /* texte secondaire */
      --card: rgba(17,17,25,.60);    /* fond des cartes (dark) */
      --glass: rgba(12,12,18,.65);   /* fond translucide header/badges (dark) */
      --border-weak: rgba(255,255,255,.10);
    }

    html:not(.dark) {
      --bg: #f5f6fa;                 /* fond global (light) */
      --fg: #111111;                 /* texte global (light) */
      --muted: #404040;              /* texte secondaire (light) */
      --card: rgba(255,255,255,.90); /* fond des cartes (light) */
      --glass: rgba(255,255,255,.70);/* fond translucide header/badges (light) */
      --border-weak: rgba(0,0,0,.12);
    }

    /* --- Correction : textes gris deviennent noirs en mode clair --- */
    html:not(.dark) .text-zinc-300,
    html:not(.dark) .text-zinc-400,
    html:not(.dark) .text-zinc-500,
    html:not(.dark) .text-zinc-600 {
      color: #111 !important;
    }

    /* Optionnel : texte "muted" clair pour les éléments secondaires (si tu veux du contraste plus doux) */
    html:not(.dark) .text-zinc-700,
    html:not(.dark) .text-zinc-800 {
      color: #222 !important;
    }

    /* Cartes, badges, boutons pilotés par les vars */
    .pixel-card {
      border: 2px solid var(--border-weak);
      background: var(--card);
      backdrop-filter: blur(6px);
      box-shadow: 0 0 0 1px rgba(255,255,255,.05), 0 0 18px rgba(var(--neon-blue), .2);
    }

    .chip { border: 2px solid var(--border-weak); background: rgba(255,255,255,.06); }
    .btn-arcade { border: 2px solid var(--border-weak); }

    /* Petit helper pour les blocs translucides (header, bandeau) */
    .glass { background: var(--glass); border: 1px solid var(--border-weak); }

    /* Texte plus lisible en mode clair (si tu l’as déjà, garde-le) */
    html:not(.dark) .text-readable-light { color: #111 !important; }


    .dark {
      /* DARK (quand la classe .dark est présente sur <html>) */
      --bg: #0a0b10;   /* fond sombre */
      --fg: #f4f4f5;   /* texte clair */
      --border-weak: rgba(255,255,255,.15); /* remplace border-[var(--border-weak)] en dark */
      --tint-soft: rgba(255,255,255,.05);   /* remplace bg-[var(--tint-soft)] en dark */
    }

    html, body, #root {
      background: var(--bg);
      color: var(--fg);
    }

    /* =========================
       POLICE & COULEURS NÉON
       ========================= */
    :root {
      --neon-pink: 168,85,247; /* violet */
      --neon-green: 34,197,94; /* vert */
      --neon-blue: 59,130,246; /* bleu */
    }

    .font-press {
      font-family: 'Press Start 2P', system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, 'Helvetica Neue', Arial, monospace;
    }

    /* =========================
       EFFETS VISUELS RÉTRO
       ========================= */
    .crt::after {
      content: '';
      position: fixed; inset: 0;
      pointer-events: none;
      z-index: 0;
      background: repeating-linear-gradient(
        0deg,
        rgba(255,255,255,0.03) 0px,
        rgba(255,255,255,0.03) 1px,
        transparent 2px,
        transparent 3px
      );
      mix-blend-mode: overlay;
    }

    .vignette::before {
      content: '';
      position: fixed; inset: 0;
      pointer-events: none;
      z-index: 0;
      background: radial-gradient(ellipse at center, rgba(0,0,0,0) 50%, rgba(0,0,0,0.35) 100%);
    }

    /* =========================
       CARTES, BADGES, BOUTONS
       ========================= */

    /* Cartes pixelisées */
    .pixel-card {
      /* LIGHT par défaut */
      border: 2px solid rgba(0,0,0,.08);
      background: rgba(255,255,255,.75);
      color: #0a0b10;
      backdrop-filter: blur(6px);
      box-shadow:
        0 0 0 1px rgba(0,0,0,.04),
        0 0 18px rgba(168,85,247,.08);
    }
    .dark .pixel-card {
      /* DARK */
      border: 2px solid rgba(255,255,255,.15);
      background: rgba(17,17,25,.6);
      color: #f4f4f5;
      box-shadow:
        0 0 0 1px rgba(255,255,255,.05),
        0 0 18px rgba(59,130,246,.2);
    }

    /* Badges arrondis */
    .chip {
      /* LIGHT */
      border: 2px solid rgba(0,0,0,.08);
      background: rgba(0,0,0,.06);
      color: #0a0b10;
    }
    .dark .chip {
      /* DARK */
      border: 2px solid rgba(255,255,255,.15);
      background: rgba(255,255,255,.06);
      color: #f4f4f5;
    }

    /* Boutons arcade */
    .btn-arcade {
      border: 2px solid rgba(0,0,0,.12);
      box-shadow: 0 4px 0 rgba(0,0,0,.12), 0 0 12px rgba(var(--neon-pink), .25);
      transform: translateY(0);
      transition: transform .08s ease, box-shadow .2s ease;
    }
    .dark .btn-arcade {
      border: 2px solid rgba(255,255,255,.15);
      box-shadow: 0 4px 0 rgba(255,255,255,.15), 0 0 12px rgba(var(--neon-pink), .35);
    }
    .btn-arcade:active {
      transform: translateY(2px);
      box-shadow: 0 2px 0 rgba(255,255,255,.15), 0 0 6px rgba(var(--neon-green), .35);
    }

    /* =========================
       EFFETS DE LUMIÈRE NÉON
       ========================= */
    .neon-shadow {
      box-shadow:
        0 0 10px rgba(var(--neon-pink), .5),
        0 0 25px rgba(var(--neon-blue), .35),
        inset 0 0 10px rgba(var(--neon-green), .25);
    }

    html:not(.dark) .text-readable-light {
      color: #111 !important;
    }

    /* === Arcade CRT Boost (activé via classe html.crt-boost) === */
    html.crt-boost::after {
    /* surcouche de scanlines + vignette plus forte */
    content: "";
    position: fixed; inset: 0; pointer-events: none; z-index: 9999;
    background:
    repeating-linear-gradient(
      0deg,
      rgba(255,255,255,0.07) 0px,
      rgba(255,255,255,0.07) 1px,
      transparent 3px,
      transparent 4px
    );
        mix-blend-mode: overlay;
        animation: crtFlicker 0.22s infinite;
    }

    html.crt-boost .crt-shift {
    /* léger décalage RGB + lueur */
      text-shadow:
      1px 0px rgba(255,0,0,0.35),
      -1px 0px rgba(0,180,255,0.35),
      0 0 3px rgba(255,255,255,0.25);
      animation: rgbShift 0.8s steps(2, end) infinite;
    }

    /* Option : léger bombé de l'écran */
    html.crt-boost .crt-warp {
      transform: perspective(900px) translateZ(0) scale(1.002) skewX(0.1deg);
    }

    /* Keyframes */
    @keyframes crtFlicker {
      0%, 100% { opacity: 0.95; }
      50%      { opacity: 1; }
    }

    @keyframes rgbShift {
      0%   { transform: translate(0,0); }
      50%  { transform: translate(0.5px, -0.5px); }
      100% { transform: translate(0,0); }
    }

    @keyframes crtFlick {
        0%, 100% { opacity: .95; }
        50%      { opacity: 1; }
    }

    /* === PCB segments animés (fond) === */
    @keyframes pcb-move-up {
      0%   { transform: translateY(110vh); opacity: 0; }
      5%   { opacity: 1; }
      95%  { opacity: 1; }
      100% { transform: translateY(-110vh); opacity: 0; }
    }
    @keyframes pcb-move-down {
      0%   { transform: translateY(-110vh); opacity: 0; }
      5%   { opacity: 1; }
      95%  { opacity: 1; }
      100% { transform: translateY(110vh); opacity: 0; }
    }

    /* Base visuelle d’un segment lumineux (barre verticale fine avec glow) */
    .pcb-seg {
      position: absolute;
      width: 2px;          /* épaisseur */
      height: 18vh;        /* longueur de base, ajustée par style inline */
      border-radius: 999px;
      filter: blur(0.3px);
      background:
    linear-gradient(
      to bottom,
      rgba(var(--neon-blue), .00) 0%,
      rgba(var(--neon-blue), .35) 12%,
      rgba(var(--neon-green), .55) 55%,
      rgba(var(--neon-pink), .35) 88%,
      rgba(var(--neon-pink), .00) 100%
    );
    box-shadow:
      0 0 10px rgba(var(--neon-blue), .25),
      0 0 18px rgba(var(--neon-green), .20);
    opacity: .9;
    mix-blend-mode: screen;   /* fusion propre avec le fond néon */
    pointer-events: none;
    }

    /* Vitesses (tu peux mixer) */
    .pcb-speed-slow   { animation-duration: 18s; }
    .pcb-speed-medium { animation-duration: 12s; }
    .pcb-speed-fast   { animation-duration: 8s;  }

    /* Direction (haut -> bas ou bas -> haut) */
    .pcb-dir-up   { animation-name: pcb-move-up;   animation-timing-function: linear; animation-iteration-count: infinite; }
    .pcb-dir-down { animation-name: pcb-move-down; animation-timing-function: linear; animation-iteration-count: infinite; }

  `}</style>
);

// =============================
// 🌈 NeonBackground
// Composant d’arrière-plan animé :
//  - Crée plusieurs halos colorés (violet, vert, bleu)
//  - Anime lentement ces halos pour donner un effet de lumière mouvante
//  - Ajoute un léger flou pour rendre le tout plus doux
// =============================
function NeonBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
      {/* Halo violet principal au centre */}
      <div className="absolute -top-1/3 left-1/2 h-[120vh] w-[120vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(167,139,250,0.22),transparent_70%)] motion-safe:animate-pulse" />
      
      {/* Halo vert en rotation lente */}
      <div className="absolute top-1/2 -left-1/3 h-[100vh] w-[100vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.14),transparent_70%)] motion-safe:animate-[spin_50s_linear_infinite]" />
      
      {/* Halo bleu en pulsation lente */}
      <div className="absolute bottom-0 right-0 h-[90vh] w-[90vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.22),transparent_70%)] motion-safe:animate-[ping_25s_linear_infinite]" />
      
      {/* Flou général pour mélanger les couleurs */}
      <div className="absolute inset-0 backdrop-blur-[90px]" />
    </div>
  );
}

// =============================
// 🧯 CircuitBackground – segments lumineux style PCB
// - density : nombre de segments (20–80 conseillé)
// - direction : 'up' (bas->haut) ou 'down' (haut->bas)
// - area : 'full' pour couvrir tout, sinon passe une className externe
// =============================
function CircuitBackground({ density = 40, direction = "up" }) {
  // Prépare un tableau de segments aléatoires (colonne X, longueur, vitesse, délai)
  const segs = useMemo(() => {
    const arr = [];
    for (let i = 0; i < density; i++) {
      const left = Math.random() * 100;               // position X en vw
      const height = 10 + Math.random() * 22;         // 10vh à 32vh
      const delay = -Math.random() * 12;              // délais négatifs pour étaler dans le temps
      const speedClass = ["pcb-speed-slow","pcb-speed-medium","pcb-speed-fast"][Math.floor(Math.random()*3)];
      arr.push({ left, height, delay, speedClass });
    }
    return arr;
  }, [density]);

  const dirClass = direction === "down" ? "pcb-dir-down" : "pcb-dir-up";

  return (
    <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
      {segs.map((s, i) => (
        <div
          key={i}
          className={`pcb-seg ${dirClass} ${s.speedClass}`}
          style={{
            left: `${s.left}vw`,
            height: `${s.height}vh`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// =============================
// 🕹️ StartScreen - Page d'Accueil
// - mêmes halos / blur / neon-shadow / font-press / btn-arcade
// - petit HUD en haut pour continuité visuelle
// =============================
function StartScreen({ onStart }) {
  // Démarrer via clavier (Enter / Space)
  useEffect(() => {
    function handler(e) {
      if (e.key === "Enter" || e.code === "Space") onStart();
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onStart]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--bg)] text-[var(--fg)] antialiased">
      {/* Injection des styles globaux */}
      <GlobalStyles />

      {/* Fond néon identique au portfolio */}
      <NeonBackground />

      {/* Ajout : segments lumineux style PCB */}
      <CircuitBackground density={46} direction="up" />

      {/* HUD en haut pour continuité */}
      <HUD />

      {/* ✅ Bloc central centré verticalement */}
      <div className="relative flex items-center justify-center min-h-[calc(100vh-100px)] px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="pixel-card neon-shadow rounded-xl p-8 text-center max-w-2xl w-full"
        >
          {/* Bandeau d’intro */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-[var(--border-weak)] bg-zinc-900/70 px-3 py-1 text-xs mx-auto">
            <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span className="font-press text-[10px] tracking-widest text-zinc-200">
              ★ ALEXIS BAIL PRESENTS ★
            </span>
          </div>

          {/* Titre */}
          <h1 className="text-3xl font-bold text-[var(--fg)] sm:text-4xl">
            Bienvenue dans{" "}
            <span className="text-pink-300">le Portfolio</span> —{" "}
            <span className="opacity-70">Mode Arcade</span>
          </h1>

          {/* Texte d’instructions */}
          <p className="mt-4 max-w-xl mx-auto text-base text-zinc-300 text-readable-light">
            Appuie sur <span className="font-press text-[10px]">ENTER</span> ou{" "}
            <span className="font-press text-[10px]">SPACE</span> pour démarrer.
          </p>

          {/* Bouton centré */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={onStart}
              className="btn-arcade inline-flex items-center gap-2 rounded-md px-5 py-3 text-[10px] font-press tracking-widest"
            >
              <Sparkles size={14} /> PRESS START
            </button>
          </div>

          {/* Texte du bas */}
          <div className="mt-6 text-[12px] text-zinc-400 text-readable-light">
            Astuce : ↑ ↑ ↓ ↓ ← → ← → B A débloque un easter egg plus tard 😉
          </div>
        </motion.div>
      </div>
    </div>
  );
}



// =============================
// 💾 DATA
// Objet central contenant toutes les informations du portfolio :
//  - Nom, rôle et bio du développeur
//  - Liens vers réseaux (GitHub, LinkedIn, etc.)
//  - Liste des compétences
//  - Liste des projets (avec titre, année, technologies, etc.)
//  - Timeline du parcours professionnel
// Cette structure rend le portfolio facilement modifiable sans toucher au code logique.
// =============================
const DATA = {
  name: "Alexis BAIL",
  role: "Développeur web",
  location: "Paris, France",
  bio: `Je conçois des expériences web modernes, rapides et accessibles. J'aime les interfaces élégantes, le DX soigné et les micro-interactions utiles.`,
  links: {
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
    email: "mailto:contact@example.com",
    resume: "mon-cv.pdf", // lien vers ton CV
  },
  skills: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Tailwind CSS",
    "Prisma",
    "tRPC",
    "GraphQL",
    "PostgreSQL",
    "Docker",
    "CI/CD",
    "Vercel",
  ],
  projects: [
    {
      title: "GreenCity",
      summary:
        "E-commerce headless avec Next.js, Stripe, Webhooks et ISR. Admin en tRPC.",
      tags: ["HTML", "CSS",],
      url: "https://alexisbail.github.io/greencity/pages/indexapropos.html",
      repo: "https://github.com/AlexisBail/greencity",
      year: 2025,
      highlights: [
        "Checkout 3 étapes avec validations côté client/serveur",
        "Pages produits ISR + filtres côté serveur",
        "Back-office sécurisé par RBAC",
      ],
    },
    {
      title: "GustoVoyage",
      summary:
        "Bibliothèque de composants animés accessibles, basée sur Tailwind et Framer Motion.",
      tags: ["HTML", "CSS",],
      url: "https://axelpm4.github.io/GustoVoyage/pages/offresspeciale.html",
      repo: "https://github.com/axelpm4/GustoVoyage",
      year: 2025,
      highlights: [
        "120+ composants testés",
        "Docs avec exemples live",
        "Dark mode natif",
      ],
    },
    {
      title: "GameShare",
      summary:
        "Dashboard analytique temps réel (Postgres + websockets) avec graphiques custom.",
      tags: ["HTML", "CSS", "Node.js", "JavaScript"],
      url: "https://alexisbail.github.io/GameShare/",
      repo: "https://github.com/AlexisBail/GameShare",
      year: 2025,
      highlights: [
        "Streaming de données",
        "ACL par projet",
        "Exports CSV/PDF",
      ],
    },
  ],
  timeline: [
    { when: "2025", what: "Freelance full-stack", where: "Paris", details: "Accompagnement produit de l'idée au déploiement – design system, perfs, SEO." },
    { when: "2023-2024", what: "Développeur front senior", where: "Remote", details: "Refonte design system, migration TS, amélioration TTI/CLS et accessibilité." },
  ],
  // ... après la section "timeline" de ton objet DATA
  creativeProjects: [
    { id: "c1", title: "BRANDING", summary: "Refonte identité visuelle", link: "#" },
    { id: "c2", title: "UI DESIGN", summary: "Maquette Figma complexe", link: "#" },
  ],
};

// =============================
// ⚙️ Fonctions utilitaires & composants de base
// =============================

// 🔸 useLocalStorage()
// Petit hook React personnalisé pour sauvegarder une valeur (par ex. le thème clair/sombre)
// directement dans le localStorage du navigateur.
// Cela permet de se souvenir du choix de l’utilisateur entre les visites.
function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : initial;
    } catch {
      return initial;
    }
  });

  // Sauvegarde la nouvelle valeur à chaque modification
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);

  return [value, setValue];
}


// =============================
// 🌗 ThemeToggle
// Composant bouton permettant de basculer entre le thème clair et sombre.
// Il utilise le hook useLocalStorage() pour retenir le choix de l’utilisateur.
// =============================
function ThemeToggle() {
  const [dark, setDark] = useLocalStorage("theme-dark", true);

  // Active/désactive la classe CSS "dark" sur le document selon l’état
  useEffect(() => {
    const cl = document.documentElement.classList;
    dark ? cl.add("dark") : cl.remove("dark");
  }, [dark]);

  return (
    <button
      onClick={() => setDark((d) => !d)}
      className="btn-arcade inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs"
    >
      {/* Change d’icône selon le mode */}
      {dark ? <Sun size={14} /> : <Moon size={14} />}
      <span className="font-press">{dark ? "LIGHT" : "DARK"}</span>
    </button>
  );
}


// =============================
// 🕹️ HUD
// Petit bandeau supérieur qui imite une interface de jeu rétro.
// Affiche le score, le niveau et un statut "ONLINE" pour le fun.
// =============================
function HUD() {
  return (
    <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-2">
      <div className="flex items-center gap-3">
        <span className="font-press text-[10px] tracking-widest">SCORE</span>
        <span className="font-press text-[10px] text-emerald-400">001337</span>
        <span className="font-press text-[10px] tracking-widest">LVL</span>
        <span className="font-press text-[10px] text-sky-400">09</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-yellow-300">★ ★ ★</span>
        <span className="font-press text-[10px] text-pink-400">ONLINE</span>
      </div>
    </div>
  );
}


// =============================
// 🧱 Badge
// Petit composant visuel servant à afficher un mot-clé dans un rectangle stylé (technos, années, etc.)
// =============================
function Badge({ children }) {
  return (
    <span className="chip rounded-md px-3 py-1 text-[10px] font-press tracking-widest text-[var(--fg)]">
      {children}
    </span>
  );
}


// =============================
// 🎮 ArcadeButton
// Bouton stylisé façon borne d’arcade.
// Il peut être un <a> (lien) ou un <button> classique.
// =============================
function ArcadeButton({ href, children, external }) {
  const cls =
    "btn-arcade inline-flex items-center gap-2 rounded-md px-4 py-2 text-[10px] font-press tracking-widest";

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className={cls}
      >
        {children}
      </a>
    );
  }
  return <button className={cls}>{children}</button>;
}


// =============================
// 🧩 Section
// Composant générique pour organiser la page :
// chaque section (projets, parcours, skills, contact) est rendue via ce composant.
// Il gère le titre, l’icône, et le contenu passé en "children".
// =============================
function Section({ id, title, children, icon: Icon }) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mb-4 flex items-center gap-3">
        {Icon && <Icon className="opacity-70" size={18} />}
        <h2 className="font-press text-sm tracking-widest">{title}</h2>
      </div>
      {children}
    </section>
  );
}


// =============================
// 💼 ProjectCard
// Carte affichant un projet individuel : titre, résumé, tags, liens.
// - Animations sur le survol (Framer Motion)
// - Boutons : preview, code source, détails
// =============================
function ProjectCard({ p, onOpen }) {
  return (
    <motion.div
      layout
      whileHover={{ y: -3, rotate: -0.2 }}
      className="pixel-card group rounded-xl p-4 crt-shift"
    >
      {/* En-tête avec le titre et l’année */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-[var(--fg)]">{p.title}</h3>
          <p className="mt-1 text-sm text-zinc-300">{p.summary}</p>
        </div>
        <span className="font-press text-[10px] tracking-widest text-sky-300">
          {p.year}
        </span>
      </div>

      {/* Liste des tags/technos */}
      <div className="mt-3 flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>

      {/* Boutons d’action */}
      <div className="mt-4 flex gap-2">
        <ArcadeButton href={p.url} external>
          <ExternalLink size={14} /> PREVIEW
        </ArcadeButton>
        <ArcadeButton href={p.repo} external>
          <Github size={14} /> CODE
        </ArcadeButton>
        <button
          onClick={() => onOpen(p)}
          className="btn-arcade ml-auto inline-flex items-center gap-2 rounded-md px-3 py-2 text-[10px] font-press tracking-widest"
        >
          <Sparkles size={14} /> DETAILS
        </button>
      </div>
    </motion.div>
  );
}

// =============================
// 🪟 ProjectModal
// Fenêtre modale qui s’ouvre quand on clique sur “DETAILS” dans une carte projet.
// Affiche un résumé détaillé du projet, ses points forts et ses liens.
// - Utilise Framer Motion pour l’animation d’ouverture/fermeture.
// - Ferme quand on clique à l’extérieur ou qu’on appuie sur Échap.
// =============================
function ProjectModal({ project, onClose }) {
  const backdrop = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
  const panel = { hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } };

  // Gestion de la touche "Échap" pour fermer la modale
  useEffect(() => {
    function esc(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
          onClick={onClose}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdrop}
        >
          {/* Contenu interne de la modale */}
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="neon-shadow max-w-2xl rounded-xl border border-[var(--border-weak)] bg-zinc-950 p-6"
            variants={panel}
          >
            {/* En-tête : titre et bouton CLOSE */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-press text-sm tracking-widest text-pink-300">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-300">{project.summary}</p>
              </div>
              <button
                onClick={onClose}
                className="btn-arcade rounded-md px-3 py-1 text-[10px] font-press"
              >
                CLOSE
              </button>
            </div>

            {/* Liste des points forts du projet */}
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-zinc-200">
              {project.highlights?.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>

            {/* Boutons vers site + repo */}
            <div className="mt-5 flex gap-2">
              <ArcadeButton href={project.url} external>
                <ExternalLink size={14} /> SITE
              </ArcadeButton>
              <ArcadeButton href={project.repo} external>
                <Github size={14} /> REPO
              </ArcadeButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


// =============================
// 🕒 TimelineItem
// Élément d’expérience professionnelle dans la section “Parcours”.
// Chaque item peut s’ouvrir/fermer pour afficher les détails.
// =============================
function TimelineItem({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="pixel-card rounded-xl p-4">
      {/* Titre cliquable pour ouvrir/fermer les détails */}
      <button
        className="flex w-full items-center justify-between text-left"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <Badge>{item.when}</Badge>
          <div>
            <div className="text-[var(--fg)]">{item.what}</div>
            <div className="text-[10px] text-zinc-400">{item.where}</div>
          </div>
        </div>
        {open ? <ChevronUp /> : <ChevronDown />}
      </button>

      {/* Détails affichés seulement si "open" est vrai */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="mt-3 text-sm text-zinc-300">{item.details}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


// =============================
// 🕹️ useKonami
// Petit easter egg amusant :
// détecte la fameuse séquence "Konami Code" (↑ ↑ ↓ ↓ ← → ← → B A).
// Quand elle est saisie, active un effet spécial (dans Hero).
// =============================
function useKonami(callback) {
  const seq = useRef([]);

  useEffect(() => {
    function onKey(e) {
      const order = [
        "ArrowUp",
        "ArrowUp",
        "ArrowDown",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "ArrowLeft",
        "ArrowRight",
        "b",
        "a",
      ];

      seq.current.push(e.key);
      if (seq.current.length > order.length) seq.current.shift();

      // Si la séquence complète correspond → exécute le callback
      if (order.every((k, i) => seq.current[i] === k)) callback?.();
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [callback]);
}

// 🕹️ Cartridge - Composant visuel pour tes projets créatifs
function Cartridge({ project, onClick }) {
  return (
    <motion.div
      whileHover={{ y: -10, rotate: 2 }}
      className="relative flex h-48 w-32 cursor-pointer flex-col rounded-lg border-4 border-zinc-800 bg-zinc-900 p-2 shadow-2xl transition-all hover:border-pink-500"
      onClick={onClick}
    >
      <div className="h-6 w-full bg-zinc-700 rounded-sm mb-2" />
      <div className="flex-1 flex items-center justify-center bg-zinc-700 text-[10px] font-press text-center p-1 break-words">
        {project.title}
      </div>
      <div className="h-4 w-full bg-yellow-600 mt-1 rounded-sm" />
    </motion.div>
  );
}

// =============================
// 🧭 Header
// Barre supérieure du site :
// - Affiche le HUD (score, niveau…)
// - Contient le titre/logo
// - Navigation entre les sections
// - Bouton de changement de thème
// =============================
function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border-weak)] glass backdrop-blur">
      <HUD />
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        {/* Logo titre à gauche */}
        <a
          href="#top"
          className="inline-flex items-center gap-2 font-press text-[12px] tracking-widest text-[var(--fg)]"
        >
          <Code2 size={16} /> BAIL Alexis // PORTFOLIO
        </a>

        {/* Menu de navigation */}
        <nav className="hidden items-center gap-3 sm:flex">
          <a
            className="font-press text-[10px] tracking-widest text-zinc-300 hover:text-[var(--fg)]"
            href="#projets"
          >
            PROJETS
          </a>
          <a
            className="font-press text-[10px] tracking-widest text-zinc-300 hover:text-[var(--fg)]"
            href="#parcours"
          >
            PARCOURS
          </a>
          <a
            className="font-press text-[10px] tracking-widest text-zinc-300 hover:text-[var(--fg)]"
            href="#skills"
          >
            SKILLS
          </a>
          <a
            className="font-press text-[10px] tracking-widest text-zinc-300 hover:text-[var(--fg)]"
            href="#contact"
          >
            CONTACT
          </a>
        </nav>

        {/* Bouton de thème à droite */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}


// =============================
// 💬 Hero
// Section d’introduction principale en haut du site.
// Affiche le nom, le rôle, une courte bio et des boutons vers GitHub, LinkedIn, etc.
// Contient aussi l’easter egg Konami (✨ Mode Secret).
// =============================
function Hero() {
  const [sparkle, setSparkle] = useState(false);

  // Active le mode secret si l’utilisateur tape le code Konami
  useKonami(() => setSparkle(true));

  // Désactive automatiquement le mode secret après 1,5 s
  useEffect(() => {
    if (!sparkle) return;
    const t = setTimeout(() => setSparkle(false), 1500);
    return () => clearTimeout(t);
  }, [sparkle]);

  return (
    <div className="relative mx-auto max-w-5xl px-4 py-12">
      {/* Carte de présentation principale */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="pixel-card neon-shadow rounded-xl p-6"
        >

        {/* Indicateur “disponible” animé */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-[var(--border-weak)] bg-zinc-900/70 px-3 py-1 text-xs mx-auto">
            <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span className="font-press text-[10px] tracking-widest text-zinc-200 crt-shift">
              DISPONIBLE POUR MISSION
            </span>
          </div>

        {/* Nom + rôle */}
        <h1 className="text-3xl font-bold text-[var(--fg)] sm:text-4xl crt-shift crt-warp">
            Salut, moi c’est{" "}
            <span className="text-pink-300">{DATA.name}</span> —{" "}
            <span className="opacity-70">{DATA.role}</span>
        </h1>

        {/* Bio */}
        <p className="mt-3 max-w-2xl text-base text-zinc-300">{DATA.bio}</p>

        {/* Boutons de contact */}
        <div className="mt-5 flex flex-wrap gap-2">
          <ArcadeButton href="https://github.com/AlexisBail" external>
            <Github size={14} /> GITHUB
          </ArcadeButton>
          <ArcadeButton href="https://www.linkedin.com/in/alexis-bail/" external>
            <Linkedin size={14} /> LINKEDIN
          </ArcadeButton>
          <ArcadeButton href="#contact">
            <Mail size={14} /> CONTACT
          </ArcadeButton>
          <ArcadeButton href={DATA.links.resume} external>
            <Download size={14} /> CV
          </ArcadeButton>
        </div>
      </motion.div>

      {/* Message secret qui apparaît avec le Konami Code */}
      {sparkle && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none absolute -top-2 right-6 inline-flex items-center gap-2 rounded-md border border-[var(--border-weak)] bg-zinc-900/80 px-3 py-2 text-xs shadow"
        >
          <Sparkles size={14} />{" "}
          <span className="font-press text-[10px]">MODE SECRET ✨</span>
        </motion.div>
      )}
    </div>
  );
}

// =============================
// 🔍 ProjectFilters
// Barre de filtrage et de recherche pour les projets :
// - Permet de filtrer par tag (technologie)
// - Permet de rechercher un projet par nom ou mot-clé
// =============================
function ProjectFilters({ allTags, onFilter, search, setSearch }) {
  const [selected, setSelected] = useState([]);

  // Appelle la fonction de filtrage dès qu’on modifie la recherche ou les tags
  useEffect(() => {
    onFilter({ tags: selected, search });
  }, [selected, search]);

  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
      {/* Boutons de tags */}
      <div className="flex flex-wrap gap-2">
        {/* Bouton “Tous” pour réinitialiser */}
        <button
          className={`btn-arcade inline-flex items-center gap-2 rounded-md px-3 py-2 text-[10px] font-press tracking-widest 
            ${
            selected.length === 0 ? "bg-[var(--tint-soft)]" : ""
          }`}
          onClick={() => setSelected([])}
        >
          <Filter size={14} /> TOUS
        </button>

        {/* Boutons dynamiques pour chaque tag */}
        {allTags.map((t) => (
          <button
            key={t}
            className={`btn-arcade rounded-md px-3 py-1 text-[10px] font-press tracking-widest 
                ${selected.includes(t) ? 
                    "text-[var(--bg)] bg-[var(--fg)]" : 
                    "bg-transparent"
                }`}
            onClick={() =>
              setSelected((prev) =>
                prev.includes(t)
                  ? prev.filter((x) => x !== t)
                  : [...prev, t]
              )
            }
          >
            {t}
          </button>
        ))}
      </div>

      {/* Champ de recherche à droite */}
      <div className="btn-arcade flex items-center gap-2 rounded-md px-3 py-2 sm:ml-auto">
        <Search size={14} className="opacity-60" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un projet…"
          className="w-56 bg-transparent text-[12px] text-[var(--fg)] outline-none placeholder:text-zinc-400"
        />
      </div>
    </div>
  );
}


// =============================
// 🎮 Composant principal : InteractivePortfolio()
// C’est le cœur du site. Il assemble tous les composants :
// - Fond néon, header, sections (Hero, Projets, Parcours, Skills, Contact)
// - Gère la recherche, les modales, et les animations
// =============================
export default function InteractivePortfolio() {
  // État pour la fenêtre modale (affiche les détails d’un projet)
  const [modal, setModal] = useState(null);

  // État pour la recherche de projets
  const [search, setSearch] = useState("");

  // Récupère tous les tags uniques des projets
  const allTags = useMemo(() => {
    const s = new Set();
    DATA.projects.forEach((p) => p.tags.forEach((t) => s.add(t)));
    return Array.from(s);
  }, []);

  // --- CRT boost state ---
  const [crtOn, setCrtOn] = useState(false);

  // Active le mode CRT pendant 6 secondes quand le Konami Code est saisi
  useKonami(() => {
    // Si déjà actif, on ignore pour éviter les spams
    if (crtOn) return;

    // Active le flag React et ajoute la classe sur <html>
    setCrtOn(true);
    document.documentElement.classList.add("crt-boost");

    // Retire la classe après 6 secondes
    const t = setTimeout(() => {
      document.documentElement.classList.remove("crt-boost");
      setCrtOn(false);
    }, 6000);

    // Nettoyage de sécurité si le composant se démonte
    return () => clearTimeout(t);
  });


  // Filtre les projets selon la recherche
  const filtered = useMemo(
    () =>
      DATA.projects.filter((p) =>
        (p.title + " " + p.summary + " " + p.tags.join(" "))
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [search]
  );

const [started, setStarted] = useState(false);

return (
  <AnimatePresence mode="wait">
    {!started ? (
      // Écran d'accueil (fade in/out + léger blur à la sortie)
      <motion.div
        key="start"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, filter: "blur(4px)" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <StartScreen onStart={() => setStarted(true)} />
      </motion.div>
    ) : (
      // Portfolio (fade in + légère mise au point)
    <motion.div
        key="portfolio"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >

        {/* === CRT Overlay très visible pendant le boost === */}
    {crtOn && (
        <div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[99999] mix-blend-overlay"
            style={{
            backgroundImage:
                `repeating-linear-gradient(
                0deg,
                rgba(255,255,255,0.12) 0px,
                rgba(255,255,255,0.12) 1px,
                transparent 3px,
                transparent 4px
                )`,
            animation: 'crtFlick 0.18s infinite',
            }}
        />
    )}

        <div
          id="top"
          className="crt vignette relative min-h-screen overflow-hidden bg-[var(--bg)] text-[var(--fg)] antialiased"
        >

          {/* Injection des styles globaux */}
          <GlobalStyles />

          {/* Fond néon animé */}
          <NeonBackground />

          {/* Ajout : segments lumineux inversés */}
          <CircuitBackground density={36} direction="down" />

          {/* En-tête du site */}
          <Header />

          {/* Contenu principal */}
          <main className="relative z-10 mx-auto max-w-5xl space-y-12 px-4 py-10">
            {/* Section d’intro */}
            <Hero />

            {/* Section Projets */}
            <Section id="projets" title="PROJETS" icon={Sparkles}>
              <ProjectFilters
                allTags={allTags}
                search={search}
                setSearch={setSearch}
                onFilter={() => {}}
              />
              <motion.div layout className="grid gap-4 sm:grid-cols-2">
                {filtered.map((p) => (
                  <ProjectCard key={p.title} p={p} onOpen={setModal} />
                ))}
              </motion.div>
            </Section>

            {/* Section Parcours */}
            <Section id="parcours" title="PARCOURS" icon={Calendar}>
              <div className="grid gap-3 sm:grid-cols-2">
                {DATA.timeline.map((item, i) => (
                  <TimelineItem key={i} item={item} />
                ))}
              </div>
            </Section>

            {/* Section Skills */}
            <Section id="skills" title="SKILLS" icon={ChevronRight}>
              <div className="flex flex-wrap gap-2">
                {DATA.skills.map((s) => (
                  <span
                    key={s}
                    className="chip rounded-md px-3 py-1 text-[10px] font-press tracking-widest"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Section>

            {/* Section Contact */}
            <Section id="contact" title="CONTACT" icon={MapPin}>
              <ContactForm />
            </Section>
          </main>

          {/* Pied de page */}
          <footer className="relative z-10 mx-auto max-w-5xl px-4 pb-10 text-xs text-zinc-400">
            © {new Date().getFullYear()} {DATA.name} · Built with React, Tailwind & Motion · GAME MODE
          </footer>

          {/* Fenêtre modale de projet (si ouverte) */}
          <ProjectModal project={modal} onClose={() => setModal(null)} />
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);
}

// =============================
// 📬 ContactForm
// Formulaire de contact interactif
// (non connecté à un vrai service, mais prêt à l’être)
// - Valide les champs (nom, email, message)
// - Affiche un message de succès après envoi
// =============================
function ContactForm() {
  const [state, setState] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  // Vérifie si les champs sont valides avant d’activer le bouton
  const valid =
    state.name && /.+@.+/.test(state.email) && state.message.length > 10;

  return (
    <div className="pixel-card rounded-xl p-4">
      {/* Si le message n’a pas encore été envoyé */}
      {!sent ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="grid gap-3"
        >
          {/* Champ NOM */}
          <label className="grid gap-1 text-sm">
            <span className="font-press text-[10px] tracking-widest">NOM</span>
            <input
              className="rounded-md border border-[var(--border-weak)] bg-transparent px-3 py-2 text-[var(--fg)] outline-none placeholder:text-zinc-500"
              value={state.name}
              onChange={(e) =>
                setState({ ...state, name: e.target.value })
              }
              placeholder="Votre nom"
            />
          </label>

          {/* Champ EMAIL */}
          <label className="grid gap-1 text-sm">
            <span className="font-press text-[10px] tracking-widest">
              EMAIL
            </span>
            <input
              className="rounded-md border border-[var(--border-weak)] bg-transparent px-3 py-2 text-[var(--fg)] outline-none placeholder:text-zinc-500"
              value={state.email}
              onChange={(e) =>
                setState({ ...state, email: e.target.value })
              }
              placeholder="vous@exemple.com"
              type="email"
            />
          </label>

          {/* Champ MESSAGE */}
          <label className="grid gap-1 text-sm">
            <span className="font-press text-[10px] tracking-widest">
              MESSAGE
            </span>
            <textarea
              className="min-h-[120px] rounded-md border border-[var(--border-weak)] bg-transparent px-3 py-2 text-[var(--fg)] outline-none placeholder:text-zinc-500"
              value={state.message}
              onChange={(e) =>
                setState({ ...state, message: e.target.value })
              }
              placeholder="Parlez-moi de votre projet…"
            />
          </label>

          {/* Bouton envoyer */}
          <button
            disabled={!valid}
            className={`btn-arcade inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-[10px] font-press tracking-widest ${
              valid ? "" : "opacity-50"
            }`}
          >
            ENVOYER
          </button>

          {/* Note explicative */}
          <p className="text-[10px] text-zinc-400">
            * Démo côté client. Branchez votre backend/API d'envoi (EmailJS,
            Resend, etc.).
          </p>
        </form>
      ) : (
        // Message affiché après envoi
        <div className="flex items-center gap-2 text-sm text-zinc-200">
          <Sparkles size={16} /> Merci ! Je vous réponds très vite.
        </div>
      )}
    </div>
  );
}