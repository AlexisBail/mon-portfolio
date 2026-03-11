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
  X,
} from "lucide-react";
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { Suspense } from 'react';

// ✅ LA VERSION À GARDER (NETTE ET CLIQUABLE)
function CartridgeModel({ project, onClick, ...props }) {
  const { nodes, materials } = useGLTF('/mon-portfolio/models/cartridge2.glb');

  return (
    <group {...props} dispose={null} onClick={onClick}>
      {/* 🟢 MODIFICATION ICI : scale passé de 0.083 à 0.04 pour dézoomer */}
      <group rotation={[-Math.PI / 2, 0, 0]} scale={9}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Card_Low__0.geometry}
            material={materials['Scene_-_Root']}
            /* 🟢 MODIFICATION ICI : position Y à 0 pour bien centrer */
            position={[0, 0, 0]} 
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[88.487, 15.448, 100]}
          />
        </group>
      </group>
    </group>
  );
}

// --- LE CONTAINER 3D (UTILISABLE DANS TA GRILLE) ---
function Cartridge3D({ project, onSelect }) {
  return (
    <div className="h-64 w-64 cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        
        <Suspense fallback={null}>
          <CartridgeModel project={project} onClick={() => onSelect(project)} />
        </Suspense>

        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={2}
          target={[0, 0, 0]}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}

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
            Appuie sur la barre{" "}
            <span className="font-press text-[10px]">ESPACE</span> pour démarrer.
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
            Entrer le code dans le portfolio pour un accès à l'inventaire créatif ! <br />↑ ↑ ↓ ↓ ← → 
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
    resume: "/mon-portfolio/mon-cv.pdf", // lien vers ton CV
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
  { 
    id: "c1", 
    title: "MON AVATAR", 
    cover: "/mon-portfolio/images/ABpixel.png", // Le chemin pointe maintenant vers le sous-dossier
    gallery: ["/mon-portfolio/images/ABpixel.png"],
    link: "#" 
  },
  { 
    id: "c2", 
    title: "PIXEL UNICORN", 
    cover: "/mon-portfolio/images/tête_licorne.png", 
    gallery: ["/mon-portfolio/images/tête_licorne.png"],
    link: "#" 
  },
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="relative max-w-2xl w-full pixel-card p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-press text-sm text-[var(--fg)]">{project.title}</h3>
              <button onClick={onClose} className="hover:scale-110 transition-transform">
                <X size={20} className="text-zinc-400" />
              </button>
            </div>

            {/* Contenu */}
            <div className="space-y-4">
              <p className="text-zinc-300">{project.summary}</p>
              
              {project.highlights && (
                <div>
                  <h4 className="font-press text-[10px] text-pink-400 mb-2">POINTS FORTS :</h4>
                  <ul className="space-y-1">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="text-sm text-zinc-400 flex items-start gap-2">
                        <span className="text-pink-400">▸</span> {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-[var(--border-weak)] flex justify-end">
              <button onClick={onClose} className="btn-arcade px-4 py-2 text-[10px] font-press">
                FERMER
              </button>
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
// 🕹️ COMPOSANT CARTOUCHE AMÉLIORÉ
// Ce composant représente tes projets créatifs sous forme de cartouche rétro
// 🕹️ CARTOUCHE STYLE "GAME BOY"
// 🕹️ CARTOUCHE GAME BOY FIDÈLE (Design inspiré de ton image)
function Cartridge({ project, onClick }) {
  // Dégradé pour le plastique de la coque (gris brossé de ton image)
  const plasticColor = "bg-gradient-to-b from-zinc-700 to-zinc-900";
  
  return (
    <motion.div
      // Animation douce : se lève et s'illumine au survol
      whileHover={{ y: -18, rotate: 1, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="relative flex h-56 w-36 cursor-pointer flex-col rounded-t-lg shadow-[0_12px_24px_rgba(0,0,0,0.6)] transition-all hover:shadow-[0_0_30px_rgba(236,72,153,0.4)]"
    >
      {/* 1. INDENTATION SUPÉRIEURE (L'encoche de ton image) */}
      <div className={`h-10 w-full rounded-t-lg border-x border-t border-zinc-600 ${plasticColor} p-2 shadow-inner border-b border-black/40`}>
        {/* Petit logo ou texte factice en relief comme sur l'image */}
        <div className="flex h-full items-center justify-center opacity-40">
          <Sparkles size={12} className="text-pink-300 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]" />
          <span className="ml-1 font-press text-[6px] tracking-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">A.BAIL</span>
        </div>
      </div>
      
      {/* 2. ÉTIQUETTE ENCASTRÉE (Le rectangle enfoncé) */}
      <div className={`flex-1 border-x border-zinc-600 ${plasticColor} px-2 py-3`}>
        {/* L'étiquette elle-même */}
        <div className="flex h-full flex-col items-center justify-center rounded-sm bg-zinc-800 p-2 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5),_0_1px_1px_rgba(255,255,255,0.1)] border border-zinc-700">
          <span className="font-press text-[7px] leading-relaxed text-zinc-100 uppercase tracking-tighter">
            {project.title}
          </span>
          {/* Petite mention factice comme sur les étiquettes originales */}
          <span className="mt-1 font-press text-[5px] text-zinc-500 tracking-tighter">DMG-AP-FRP</span>
        </div>
      </div>

      {/* 3. BASE DE LA CARTOUCHE & CONNECTEURS */}
      <div className={`h-8 w-full border-x border-b border-zinc-600 rounded-b-lg ${plasticColor} shadow-inner`}>
        {/* La partie PCB dorée qui dépasse légèrement */}
        <div className="mx-2 h-full rounded-b-md bg-zinc-950 px-3 pt-1 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] border-t border-zinc-700/50">
          <div className="flex h-full justify-around">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="h-full w-1.5 rounded-t-sm bg-gradient-to-t from-yellow-800 to-yellow-600/60 opacity-50" 
              />
            ))}
          </div>
        </div>
      </div>
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
          <a 
            href="/mon-portfolio/mon-cv.pdf" 
            target="_blank" 
            rel="noreferrer"
            className="btn-arcade inline-flex items-center gap-2 rounded-md px-4 py-2 text-[10px] font-press tracking-widest"
          >
            <Download size={14} /> CV
          </a>
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
  // --- États existants ---
  const [modal, setModal] = useState(null);
  const [search, setSearch] = useState("");
  const [crtOn, setCrtOn] = useState(false);
  const [started, setStarted] = useState(false);

  // 🟢 NOUVEAUX ÉTATS :
  const [modeCreative, setModeCreative] = useState(false);
  const [selectedCreative, setSelectedCreative] = useState(null);

  // --- Logique existante (Tags et Filtres) ---
  const allTags = useMemo(() => {
    const s = new Set();
    DATA.projects.forEach((p) => p.tags.forEach((t) => s.add(t)));
    return Array.from(s);
  }, []);

  const filtered = useMemo(
    () =>
      DATA.projects.filter((p) =>
        (p.title + " " + p.summary + " " + p.tags.join(" "))
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [search]
  );

  // --- Logique Konami mise à jour ---
  useKonami(() => {
    // 1. On active l'effet visuel CRT
    if (!crtOn) {
      setCrtOn(true);
      document.documentElement.classList.add("crt-boost");
      setTimeout(() => {
        document.documentElement.classList.remove("crt-boost");
        setCrtOn(false);
      }, 6000);
    }

    // 2. 🟢 On active le mode "Inventaire de cartouches"
    setModeCreative(true);
    setStarted(true); // On s'assure d'être sur l'interface et pas l'accueil
  });

  // ==========================================================
  // 🟢 VUE : INVENTAIRE CRÉATIF (Design Amélioré)
  // Ce bloc s'affiche UNIQUEMENT quand modeCreative est vrai
  // ==========================================================
  if (modeCreative) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050508] p-6 overflow-y-auto">
        {/* Fonds animés et styles */}
        <GlobalStyles />
        <NeonBackground /> 
        <CircuitBackground density={40} direction="up" />

        {/* Effet CRT visuel */}
        <div className="crt pointer-events-none fixed inset-0 z-[101]" />
        
        <div className="relative z-[102] flex flex-col items-center w-full max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="font-press text-lg tracking-[0.3em] text-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.6)]">
              INVENTAIRE CRÉATIF
            </h2>
            <div className="mt-2 h-1 w-24 mx-auto bg-pink-500/30 rounded-full" />
          </motion.div>

          {/* 🟢 GRILLE DE CARTOUCHES 3D */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full justify-items-center"
          >
            {DATA.creativeProjects.map((p) => (
              <div key={p.id} className="flex flex-col items-center group">
                {/* On appelle ton composant 3D ici */}
                <Cartridge3D 
                  project={p} 
                  onSelect={(selected) => setSelectedCreative(selected)} 
                />
                
                {/* Titre sous la cartouche */}
                <span className="mt-6 font-press text-[9px] text-zinc-500 group-hover:text-pink-400 transition-colors uppercase tracking-widest">
                  {p.title}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Bouton de retour */}
          <button 
            onClick={() => setModeCreative(false)} 
            className="mt-16 btn-arcade bg-zinc-900 text-zinc-400 hover:text-white font-press text-[9px] px-8 py-3 rounded-md transition-all active:scale-95 border border-white/10"
          >
            [ ESC ] RETOUR AU SYSTÈME
          </button>
        </div>

        {/* 🖼️ Zone pour la Galerie (optionnel pour l'instant) */}
        <AnimatePresence>
          {selectedCreative && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
              onClick={() => setSelectedCreative(null)}
            >
               {/* Ici on pourra mettre le carrousel d'images plus tard */}
               <div className="bg-zinc-900 border-2 border-pink-500 p-6 max-w-2xl w-full font-press text-white text-[10px]">
                  FERMER LA GALERIE [X]
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
  // ==========================================================
  // 🔵 VUE B : PORTFOLIO NORMAL (Ton code d'origine)
  // ==========================================================
  return (
    <AnimatePresence mode="wait">
      {!started ? (
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
        <motion.div
          key="portfolio"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* === CRT Overlay === */}
          {crtOn && (
            <div
              aria-hidden
              className="pointer-events-none fixed inset-0 z-[99999] mix-blend-overlay"
              style={{
                backgroundImage: `repeating-linear-gradient(0deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 1px, transparent 3px, transparent 4px)`,
                animation: 'crtFlick 0.18s infinite',
              }}
            />
          )}

          <div id="top" className="crt vignette relative min-h-screen overflow-hidden bg-[var(--bg)] text-[var(--fg)] antialiased">
            <GlobalStyles />
            <NeonBackground />
            <CircuitBackground density={36} direction="down" />
            <Header />

            <main className="relative z-10 mx-auto max-w-5xl space-y-12 px-4 py-10">
              <Hero />

              {/* Section Projets */}
              <Section id="projets" title="PROJETS" icon={Sparkles}>
                <ProjectFilters allTags={allTags} search={search} setSearch={setSearch} onFilter={() => {}} />
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
                    <span key={s} className="chip rounded-md px-3 py-1 text-[10px] font-press tracking-widest">{s}</span>
                  ))}
                </div>
              </Section>

              {/* Section Contact */}
              <Section id="contact" title="CONTACT" icon={MapPin}>
                <ContactForm />
              </Section>
            </main>

            <footer className="relative z-10 mx-auto max-w-5xl px-4 pb-10 text-xs text-zinc-400">
              © {new Date().getFullYear()} {DATA.name} · Built with React, Tailwind & Motion · GAME MODE
            </footer>

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