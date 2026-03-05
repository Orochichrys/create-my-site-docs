import React, { useState, useEffect, useRef } from 'react';
import { NavItem, CodeBlockProps, SectionProps } from './types';

// --- Components (Header, Sidebar, UI Blocks) ---

interface HeaderProps {
  onMenuClick: () => void;
  isDark: boolean;
  toggleTheme: () => void;
  currentVersion: string;
  onVersionChange: (version: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, isDark, toggleTheme, currentVersion, onVersionChange }) => {
  const [isVersionOpen, setIsVersionOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsVersionOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleVersionSelect = (version: string) => {
    onVersionChange(version);
    setIsVersionOpen(false);
  };

  const versions = ['v1.2.0', 'v1.1.0', 'v1.0.0'];

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-brand-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-brand-border z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto w-full h-full flex items-center justify-between px-3 sm:px-4 lg:px-8">
        
        {/* GAUCHE : Menu Burger + Logo + Version */}
        <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
          <button 
            onClick={onMenuClick}
            className="lg:hidden text-slate-500 dark:text-brand-muted hover:text-slate-900 dark:hover:text-white transition-colors p-1"
            aria-label="Toggle Menu"
          >
            <i className="fa-solid fa-bars text-xl"></i>
          </button>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20 transition-all group-hover:scale-105 flex-shrink-0">
                <i className="fa-solid fa-cube"></i>
              </div>
              <span className="hidden sm:block font-bold text-lg tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                create-my-site
              </span>
            </a>

            {/* Version Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsVersionOpen(!isVersionOpen)}
                className="flex items-center gap-1 text-[9px] sm:text-[10px] font-mono font-medium px-1.5 sm:px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 hover:bg-indigo-200 dark:hover:bg-indigo-500/20 transition-colors cursor-pointer select-none"
              >
                {currentVersion}
                <i className={`fa-solid fa-chevron-down text-[8px] transition-transform duration-200 ${isVersionOpen ? 'rotate-180' : ''}`}></i>
              </button>

              {isVersionOpen && (
                <div className="absolute top-full left-0 mt-2 w-32 bg-white dark:bg-brand-darker border border-slate-200 dark:border-brand-border rounded-lg shadow-xl py-1 z-50">
                  <div className="px-3 py-1.5 text-[9px] uppercase tracking-wider text-slate-400 font-semibold border-b border-slate-100 dark:border-white/5 mb-1">
                    Select Version
                  </div>
                  {versions.map((ver) => (
                    <button 
                      key={ver}
                      onClick={() => handleVersionSelect(ver)}
                      className={`
                        w-full text-left px-3 py-1.5 text-xs font-mono flex items-center justify-between transition-colors
                        ${currentVersion === ver 
                          ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 font-bold' 
                          : 'text-slate-600 dark:text-brand-muted hover:bg-slate-50 dark:hover:bg-white/5'}
                      `}
                    >
                      {ver}
                      {currentVersion === ver && <i className="fa-solid fa-check text-[10px]"></i>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CENTRE : Recherche (Caché sur mobile) */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fa-solid fa-search text-slate-400 dark:text-brand-muted group-focus-within:text-brand-accent transition-colors"></i>
            </div>
            <input 
              type="text" 
              placeholder="Rechercher..." 
              className="block w-full pl-10 pr-3 py-1.5 border border-slate-200 dark:border-brand-border rounded-md leading-5 bg-slate-100 dark:bg-brand-darker text-slate-900 dark:text-brand-text placeholder-slate-500 dark:placeholder-brand-muted focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent sm:text-sm transition-all"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-slate-500 text-xs border border-slate-300 dark:border-gray-700 rounded px-1.5 py-0.5">Ctrl K</span>
            </div>
          </div>
        </div>

        {/* DROITE : Thème + Réseaux sociaux */}
        <div className="flex items-center gap-2 sm:gap-6 shrink-0">
          <button 
            onClick={toggleTheme}
            className={`
              relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
              transition-colors duration-200 ease-in-out focus:outline-none 
              ${isDark ? 'bg-slate-700' : 'bg-slate-300'}
            `}
            role="switch"
            aria-checked={isDark}
          >
            <span className="sr-only">Use setting</span>
            <span
              className={`
                pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 
                transition duration-200 ease-in-out
                ${isDark ? 'translate-x-5' : 'translate-x-0'}
              `}
            >
              <span className={`
                absolute inset-0 flex h-full w-full items-center justify-center transition-opacity 
                ${isDark ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in'}
              `}>
                <i className="fa-solid fa-sun text-[10px] text-yellow-500"></i>
              </span>
              <span className={`
                absolute inset-0 flex h-full w-full items-center justify-center transition-opacity 
                ${isDark ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out'}
              `}>
                <i className="fa-solid fa-moon text-[10px] text-indigo-600"></i>
              </span>
            </span>
          </button>

          <div className="h-4 w-px bg-slate-200 dark:bg-brand-border hidden sm:block"></div>
          
          <div className="hidden sm:flex items-center gap-3 sm:gap-4">
            <a href="https://github.com/Orochichrys/mon-generateur-web" target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-brand-muted hover:text-slate-900 dark:hover:text-white transition-colors text-lg sm:text-xl">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="https://www.npmjs.com/package/create-my-site" target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-brand-muted hover:text-slate-900 dark:hover:text-white transition-colors text-lg sm:text-xl">
              <i className="fa-brands fa-npm"></i>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

const Sidebar: React.FC<{ isOpen: boolean, onClose: () => void, activeSection: string, version: string }> = ({ isOpen, onClose, activeSection, version }) => {
  const navItemsV1 = [
    { id: 'introduction', label: 'Introduction', icon: 'fa-solid fa-info-circle' },
    { id: 'installation', label: 'Installation', icon: 'fa-solid fa-download' },
    { id: 'guide', label: 'Guide de Démarrage', icon: 'fa-solid fa-rocket' },
    { id: 'templates', label: 'Les Templates', icon: 'fa-solid fa-layer-group' },
    { id: 'structure', label: 'Structure de fichiers', icon: 'fa-solid fa-folder-tree' },
    { id: 'contribution', label: 'Contribution', icon: 'fa-solid fa-code-branch' },
  ];

  const navItemsV11 = [
    ...navItemsV1.slice(0, 3),
    { id: 'cli-args', label: 'Arguments CLI', icon: 'fa-solid fa-terminal' },
    ...navItemsV1.slice(3)
  ];

  const navItemsV12 = [
    ...navItemsV1.slice(0, 3),
    { id: 'github-push', label: 'GitHub & Push', icon: 'fa-brands fa-github' },
    { id: 'cli-args', label: 'Arguments CLI', icon: 'fa-solid fa-terminal' },
    ...navItemsV1.slice(3)
  ];

  let navItems = navItemsV1;
  if (version === 'v1.2.0') navItems = navItemsV12;
  else if (version === 'v1.1.0') navItems = navItemsV11;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm" onClick={onClose} />
      )}
      <aside className={`
        fixed top-16 bottom-0 left-0 w-64 bg-white dark:bg-brand-dark border-r border-slate-200 dark:border-brand-border z-40 transform transition-transform duration-300 ease-in-out overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)]
      `}>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => onClose()}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all
                ${activeSection === item.id 
                  ? 'bg-indigo-50 dark:bg-brand-accent/10 text-brand-accent border-l-4 border-brand-accent' 
                  : 'text-slate-500 dark:text-brand-muted hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'}
              `}
            >
              <i className={`${item.icon} w-5 text-center`}></i>
              {item.label}
            </a>
          ))}
        </nav>
        
        <div className="p-4 pt-8 mt-8 border-t border-slate-100 dark:border-white/5 lg:hidden">
          <div className="flex items-center justify-center gap-6">
            <a href="https://github.com/Orochichrys/mon-generateur-web" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-2xl">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="https://www.npmjs.com/package/create-my-site" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-2xl">
              <i className="fa-brands fa-npm"></i>
            </a>
          </div>
          <p className="text-center text-[10px] text-slate-400 mt-4 uppercase tracking-widest font-bold">create-my-site Docs</p>
        </div>
      </aside>
    </>
  );
};

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, fileName }) => (
  <div className="my-6 rounded-xl overflow-hidden border border-slate-200 dark:border-brand-border shadow-sm group">
    {fileName && (
      <div className="bg-slate-50 dark:bg-brand-darker px-4 py-2 border-b border-slate-200 dark:border-brand-border flex items-center justify-between">
        <span className="text-xs font-mono text-slate-500 dark:text-brand-muted">{fileName}</span>
        <button className="text-slate-400 hover:text-brand-accent transition-colors"><i className="fa-regular fa-copy"></i></button>
      </div>
    )}
    <pre className="p-4 bg-white dark:bg-brand-dark overflow-x-auto scrollbar-thin">
      <code className={`language-${language} text-xs sm:text-sm font-mono text-slate-800 dark:text-brand-text break-words sm:break-normal`}>
        {code}
      </code>
    </pre>
  </div>
);

const TerminalBlock: React.FC<{ command: string }> = ({ command }) => (
  <div className="my-6 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl font-mono group">
    <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border-b border-slate-800">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40"></div>
        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40"></div>
      </div>
    </div>
    <div className="p-4 flex items-center gap-3 overflow-x-auto scrollbar-thin">
      <span className="text-brand-accent font-bold">$</span>
      <code className="text-brand-text text-xs sm:text-sm whitespace-nowrap">{command}</code>
      <button className="ml-auto opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity text-slate-500 hover:text-white flex-shrink-0">
        <i className="fa-regular fa-copy"></i>
      </button>
    </div>
  </div>
);

const Section: React.FC<SectionProps> = ({ id, title, children }) => (
  <section id={id} className="py-12 first:pt-0 border-b border-slate-200 dark:border-brand-border last:border-0 scroll-mt-24">
    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6 sm:mb-8 tracking-tight flex items-center gap-3">
      <span className="w-1 h-6 sm:h-8 bg-brand-accent rounded-full"></span>
      {title}
    </h2>
    <div className="text-slate-600 dark:text-brand-muted leading-relaxed space-y-6">
      {children}
    </div>
  </section>
);

const TemplateCard: React.FC<{ title: string, description: string, icon: string, color: string }> = ({ title, description, icon, color }) => (
  <div className="p-6 rounded-2xl bg-white dark:bg-brand-darker border border-slate-200 dark:border-brand-border hover:shadow-xl hover:shadow-indigo-500/10 transition-all group">
    <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-white text-xl mb-4 shadow-lg transition-transform group-hover:scale-110`}>
      <i className={icon}></i>
    </div>
    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
    <p className="text-sm text-slate-500 dark:text-brand-muted line-height-relaxed">{description}</p>
  </div>
);

const FileTree: React.FC = () => (
  <div className="font-mono text-sm bg-slate-900 dark:bg-brand-darker border border-slate-700 dark:border-brand-border p-4 md:p-6 rounded-xl text-slate-300 dark:text-brand-muted leading-relaxed overflow-x-auto">
    <pre>{`mon-site-web/
├── .git/
├── index.html
├── style.css
├── script.js
└── README.md`}</pre>
  </div>
);

const FileTreeV12: React.FC = () => (
  <div className="font-mono text-sm bg-slate-900 dark:bg-brand-darker border border-slate-700 dark:border-brand-border p-4 md:p-6 rounded-xl text-slate-300 dark:text-brand-muted leading-relaxed overflow-x-auto">
    <pre>{`mon-site-web/
├── .git/               # Initialisé automatiquement
├── .gitignore          # Exclut node_modules, assets/vendor, etc.
├── index.html          # Structure Pro (SEO & OG Ready)
├── README.md           # Instructions personnalisées
└── assets/             # Organisation Pro v1.2.0
    ├── css/
    │   └── style.css   # Tes styles
    ├── js/
    │   └── script.js   # Ta logique
    ├── img/            # Images & Favicon
    └── vendor/         # Libs locales (ex: Bootstrap)`}</pre>
  </div>
);

const CommonIntro = () => (
  <>
    <p className="text-lg text-slate-600 dark:text-brand-muted">
      <strong>create-my-site</strong> est le compagnon idéal pour lancer vos projets web en quelques secondes. 
      Fini les configurations manuelles répétitives, concentrez-vous sur ce qui compte vraiment : 
      <span className="text-brand-accent font-semibold italic ml-1 text-base">votre code et votre design.</span>
    </p>
  </>
);

const CommonTemplates = () => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <TemplateCard title="Tailwind CSS" description="Le framework utilitaire pour un design sur-mesure et moderne." icon="fa-solid fa-wind" color="bg-cyan-500 shadow-cyan-500/20" />
    <TemplateCard title="Bootstrap 5" description="La référence pour des interfaces rapides, robustes et responsives." icon="fa-brands fa-bootstrap" color="bg-purple-600 shadow-purple-600/20" />
    <TemplateCard title="Minimalist (HTML/CSS)" description="Une structure ultra-légère sans framework pour les puristes." icon="fa-solid fa-leaf" color="bg-emerald-500 shadow-emerald-500/20" />
  </div>
);

const CommonStructure = () => (
  <div className="grid md:grid-cols-2 gap-8 items-start">
    <FileTree />
    <div className="space-y-4">
      <div className="p-4 rounded bg-white dark:bg-brand-darker border border-slate-200 dark:border-brand-border shadow-sm">
        <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Fichiers de base</h4>
        <p className="text-xs text-slate-500 dark:text-brand-muted">Une structure propre avec index.html, style.css et script.js prêt à l'emploi.</p>
      </div>
      <div className="p-4 rounded bg-white dark:bg-brand-darker border border-slate-200 dark:border-brand-border shadow-sm">
        <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">README Personnalisé</h4>
        <p className="text-xs text-slate-500 dark:text-brand-muted">Des instructions claires générées spécifiquement pour votre projet.</p>
      </div>
    </div>
  </div>
);

const CommonStructureV12 = () => (
  <div className="grid md:grid-cols-2 gap-8 items-start">
    <FileTreeV12 />
    <div className="space-y-4">
      <div className="p-4 rounded bg-white dark:bg-brand-darker border border-slate-200 dark:border-brand-border shadow-sm">
        <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Dossier /assets</h4>
        <p className="text-xs text-slate-500 dark:text-brand-muted">Centralisation propre de toutes les ressources du site (CSS, JS, Images, Vendor).</p>
      </div>
      <div className="p-4 rounded bg-white dark:bg-brand-darker border border-slate-200 dark:border-brand-border shadow-sm">
        <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">SEO & Social Ready</h4>
        <p className="text-xs text-slate-500 dark:text-brand-muted">index.html inclut déjà les tags Open Graph et Twitter Cards pour un partage optimal.</p>
      </div>
      <div className="p-4 rounded bg-white dark:bg-brand-darker border border-slate-200 dark:border-brand-border shadow-sm">
        <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Local-Lock</h4>
        <p className="text-xs text-slate-500 dark:text-brand-muted">Le dossier vendor/ permet de stocker Bootstrap localement pour le mode offline.</p>
      </div>
    </div>
  </div>
);

const CommonContribution = () => (
  <div className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-2xl p-6 md:p-10 text-white relative overflow-hidden">
    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
    <div className="relative z-10">
      <h3 className="text-2xl font-bold mb-4">Envie de contribuer ?</h3>
      <p className="text-indigo-100/80 mb-6 max-w-xl">
        Le projet est open-source ! N'hésitez pas à proposer des templates ou à améliorer le CLI.
      </p>
      <a href="https://github.com/Orochichrys/mon-generateur-web" className="inline-flex items-center gap-2 bg-white text-indigo-900 px-6 py-2.5 rounded-full font-bold hover:bg-indigo-50 transition-colors">
        <i className="fa-brands fa-github text-xl"></i>
        GitHub Repository
      </a>
    </div>
  </div>
);

// --- Content Components par Version ---

const ContentV120: React.FC = () => (
  <>
    <Section id="introduction" title="Introduction">
      <div className="p-4 mb-6 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 rounded-lg flex gap-3 text-sm text-indigo-800 dark:text-indigo-200">
        <i className="fa-solid fa-rocket mt-0.5"></i>
        <div><strong>Version v1.2.0 :</strong> Le CLI devient une véritable station de travail (Auto-Push, SEO, Dark Mode & Assets Pro).</div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-white dark:bg-brand-darker border border-slate-200 dark:border-brand-border rounded-lg shadow-sm">
          <i className="fa-brands fa-github text-slate-900 dark:text-white mb-2 text-xl"></i>
          <h4 className="font-bold text-slate-900 dark:text-white mb-1">Auto-Push</h4>
          <p className="text-sm text-slate-500 dark:text-brand-muted">Déploiement GitHub instantané via API ou CLI.</p>
        </div>
        <div className="p-4 bg-white dark:bg-brand-darker border border-slate-200 dark:border-brand-border rounded-lg shadow-sm">
          <i className="fa-solid fa-folder-tree text-amber-500 mb-2 text-xl"></i>
          <h4 className="font-bold text-slate-900 dark:text-white mb-1">Structure Pro</h4>
          <p className="text-sm text-slate-500 dark:text-brand-muted">Organisation propre dans <code>/assets</code>.</p>
        </div>
        <div className="p-4 bg-white dark:bg-brand-darker border border-slate-200 dark:border-brand-border rounded-lg shadow-sm">
          <i className="fa-solid fa-moon text-indigo-500 mb-2 text-xl"></i>
          <h4 className="font-bold text-slate-900 dark:text-white mb-1">Dark Mode</h4>
          <p className="text-sm text-slate-500 dark:text-brand-muted">Support natif pour Tailwind et Bootstrap.</p>
        </div>
      </div>
      <CommonIntro />
      <p className="mt-4 text-sm font-medium text-slate-500 dark:text-brand-muted"><i className="fa-solid fa-circle-info mr-2"></i>Requis : Node.js doit être installé sur votre machine.</p>
    </Section>

    <Section id="installation" title="Installation">
      <TerminalBlock command="npx create-my-site" />
      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-lg text-sm text-blue-800 dark:text-blue-200">
        Pas besoin d'installation globale. Lancez et créez !
      </div>
    </Section>

    <Section id="guide" title="Guide de Démarrage">
      <p className="mb-6">L'outil offre deux modes d'utilisation : un menu interactif complet ou des commandes directes via CLI.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-5 border border-slate-200 dark:border-brand-border rounded-xl bg-white dark:bg-brand-darker">
          <h4 className="font-bold text-lg mb-2 text-indigo-600 dark:text-indigo-400">1. Mode Interactif</h4>
          <CodeBlock language="bash" fileName="Menu Interactif v1.2.0" code={`$ npx create-my-site
      
🚀 CMS Generator v1.2.0 - Configuration Interactive

? Quel est le nom de ton projet ? mon-site-pro
? Quel template veux-tu utiliser ? Tailwind CSS
? Activer le mode sombre par défaut ? Yes
? Utiliser des fichiers locaux (Offline mode) ? Yes
? Initialiser un dépôt Git local ? Yes
? Créer un dépôt GitHub et pusher ? Yes`} />
        </div>
        <div className="p-5 border border-slate-200 dark:border-brand-border rounded-xl bg-white dark:bg-brand-darker">
          <h4 className="font-bold text-lg mb-2 text-pink-600 dark:text-pink-400">2. Mode Expert (CLI)</h4>
          <p className="text-sm text-slate-500 dark:text-brand-muted mb-4">Gagnez du temps en passant tous vos paramètres directement en ligne de commande.</p>
          <TerminalBlock command="npx create-my-site mon-projet -t tailwind --dark --push" />
          <p className="text-xs text-slate-400 dark:text-brand-muted mt-2 italic">Astuce : L'argument [name] est le premier paramètre attendu.</p>
        </div>
      </div>
    </Section>

    <Section id="github-push" title="GitHub & Push">
      <p className="mb-4">Déployez votre projet en une seconde avec l'Auto-Push hybride :</p>
      <ul className="space-y-4 mb-6">
        <li className="flex gap-3">
          <i className="fa-solid fa-check-circle text-green-500 mt-1"></i>
          <div><strong className="text-slate-900 dark:text-white">gh CLI :</strong> Utilise vos identifiants existants si installés.</div>
        </li>
        <li className="flex gap-3">
          <i className="fa-solid fa-check-circle text-green-500 mt-1"></i>
          <div><strong className="text-slate-900 dark:text-white">Pure API Fallback :</strong> Utilise l'API REST de GitHub si <code>gh</code> est absent.</div>
        </li>
        <li className="flex gap-3">
          <i className="fa-solid fa-check-circle text-green-500 mt-1"></i>
          <div><strong className="text-slate-900 dark:text-white">Token Mémorisé :</strong> Votre token est sauvegardé sûrement dans <code>~/.cms-config.json</code>.</div>
        </li>
      </ul>
      <div className="p-4 bg-slate-100 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/10 italic text-sm text-slate-600 dark:text-brand-muted">
        "Une véritable station de travail pour les développeurs front-end."
      </div>
    </Section>

    <Section id="cli-args" title="Arguments CLI">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-white/5 border-b border-slate-200 dark:border-brand-border text-slate-900 dark:text-white">
              <th className="p-4 font-bold">Flag</th>
              <th className="p-4 font-bold">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-brand-border">
            <tr><td className="p-4 font-mono text-brand-accent">--dark</td><td className="p-4">Génère un projet direct en mode sombre.</td></tr>
            <tr><td className="p-4 font-mono text-brand-accent">--local</td><td className="p-4">Télécharge les bibliothèques en local (Bootstrap).</td></tr>
            <tr><td className="p-4 font-mono text-brand-accent">--push</td><td className="p-4">Crée le dépôt et envoie le code vers GitHub.</td></tr>
            <tr><td className="p-4 font-mono text-brand-accent">--token {'<T>'}</td><td className="p-4">Passe un GitHub Token temporaire.</td></tr>
            <tr><td className="p-4 font-mono text-brand-accent">-t, --template</td><td className="p-4">Choix du template (bootstrap, tailwind, empty).</td></tr>
            <tr><td className="p-4 font-mono text-brand-accent">--no-init</td><td className="p-4">Désactive l'initialisation automatique de Git.</td></tr>
            <tr><td className="p-4 font-mono text-brand-accent">-V, --version</td><td className="p-4">Affiche la version actuelle du CLI.</td></tr>
            <tr><td className="p-4 font-mono text-brand-accent">-h, --help</td><td className="p-4">Affiche l'aide et la liste des commandes.</td></tr>
          </tbody>
        </table>
      </div>
    </Section>

    <Section id="templates" title="Les modèles">
      <p className="mb-8">Design harmonisé, premium et équilibré entre Bootstrap et Tailwind. Navbar, Hero, Features et Footer inclus par défaut.</p>
      <CommonTemplates />
    </Section>

    <Section id="structure" title="Structure de fichiers">
      <p className="mb-6">Organisation professionnelle avec dossier assets et fichiers SEO/Social ready.</p>
      <CommonStructureV12 />
    </Section>
    
    <Section id="contribution" title="Contribution">
      <CommonContribution />
    </Section>
  </>
);

const ContentV110: React.FC = () => (
  <>
    <Section id="introduction" title="Introduction">
      <div className="p-4 mb-6 bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-200/20 rounded-lg flex gap-3 text-sm text-yellow-800 dark:text-yellow-200">
        <i className="fa-solid fa-triangle-exclamation mt-0.5"></i>
        <div><strong>Version v1.1.0 (Ancienne version) :</strong> Support des arguments CLI (flags) et désactivation de Git.</div>
      </div>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-white dark:bg-brand-darker border border-slate-200 dark:border-brand-border rounded-lg shadow-sm">
          <i className="fa-solid fa-terminal text-indigo-500 mb-2 text-xl"></i>
          <h4 className="font-bold text-slate-900 dark:text-white mb-1">Arguments CLI</h4>
          <p className="text-sm text-slate-500 dark:text-brand-muted">Utilisez des flags pour configurer votre projet sans passer par le menu.</p>
        </div>
        <div className="p-4 bg-white dark:bg-brand-darker border border-slate-200 dark:border-brand-border rounded-lg shadow-sm">
          <i className="fa-solid fa-code-branch text-emerald-500 mb-2 text-xl"></i>
          <h4 className="font-bold text-slate-900 dark:text-white mb-1">Contrôle Git</h4>
          <p className="text-sm text-slate-500 dark:text-brand-muted">Option <code>--no-init</code> pour sauter l'initialisation Git automatique.</p>
        </div>
      </div>
      <CommonIntro />
      <p className="mt-4 text-sm font-medium text-slate-500 dark:text-brand-muted"><i className="fa-solid fa-circle-info mr-2"></i>Requis : Node.js doit être installé sur votre machine.</p>
    </Section>

    <Section id="installation" title="Installation">
      <p className="mb-4">Vous pouvez utiliser l'outil directement via <code className="bg-slate-200 dark:bg-white/10 px-1.5 py-0.5 rounded text-sm text-brand-accent font-mono">npx</code> (recommandé) ou l'installer globalement.</p>
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mt-6 mb-3">Méthode Recommandée</h3>
      <TerminalBlock command="npx create-my-site" />
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mt-6 mb-3">Installation mondiale</h3>
      <TerminalBlock command="npm install -g create-my-site" />
    </Section>

    <Section id="guide" title="Guide de Démarrage">
      <p className="mb-6">L'outil offre maintenant deux modes d'utilisation : Interactif et Automatique.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-5 border border-slate-200 dark:border-brand-border rounded-xl bg-white dark:bg-brand-darker">
          <h4 className="font-bold text-lg mb-2 text-indigo-600 dark:text-indigo-400">1. Mode Interactif</h4>
          <CodeBlock language="bash" fileName="Terminal" code={`$ npx create-my-site

🚀 Générateur de Site Web Ultime
? Quel est le nom de ton projet ? mon-site-web
? Quel template veux-tu utiliser ? Tailwind CSS
? Initialiser un dépôt Git ? (Y/n) Y`} />
        </div>
        <div className="p-5 border border-slate-200 dark:border-brand-border rounded-xl bg-white dark:bg-brand-darker">
          <h4 className="font-bold text-lg mb-2 text-pink-600 dark:text-pink-400">2. Mode Expert (CLI)</h4>
          <TerminalBlock command="npx create-my-site mon-projet -t tailwind" />
        </div>
      </div>
    </Section>

    <Section id="cli-args" title="Arguments CLI">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-white/5 border-b border-slate-200 dark:border-brand-border text-slate-900 dark:text-white">
              <th className="p-4 font-bold">Argument</th>
              <th className="p-4 font-bold">Description</th>
              <th className="p-4 font-bold">Exemple</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-brand-border">
            <tr><td className="p-4 font-mono text-brand-accent">[name]</td><td className="p-4 text-slate-600 dark:text-brand-muted">Nom du dossier à créer.</td><td className="p-4 font-mono text-xs">mon-site</td></tr>
            <tr><td className="p-4 font-mono text-brand-accent">[-t, --template]</td><td className="p-4 text-slate-600 dark:text-brand-muted">bootstrap, tailwind, empty.</td><td className="p-4 font-mono text-xs">-t tailwind</td></tr>
            <tr><td className="p-4 font-mono text-brand-accent">--no-init</td><td className="p-4 text-slate-600 dark:text-brand-muted">Désactive git init.</td><td className="p-4 font-mono text-xs">--no-init</td></tr>
            <tr><td className="p-4 font-mono text-brand-accent">-V, --version</td><td className="p-4">Affiche la version actuelle du CLI.</td><td className="p-4 font-mono text-xs">-V</td></tr>
            <tr><td className="p-4 font-mono text-brand-accent">-h, --help</td><td className="p-4">Affiche l'aide et la liste des commandes.</td><td className="p-4 font-mono text-xs">-h</td></tr>
          </tbody>
        </table>
      </div>
    </Section>

    <Section id="templates" title="Les modèles">
      <CommonTemplates />
    </Section>

    <Section id="structure" title="Structure de fichiers">
      <CommonStructure />
    </Section>
    
    <Section id="contribution" title="Contribution">
      <CommonContribution />
    </Section>
  </>
);

const ContentV100: React.FC = () => (
  <>
    <Section id="introduction" title="Introduction">
      <div className="p-4 mb-6 bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-200/40 rounded-lg flex gap-3 text-sm text-yellow-800 dark:text-yellow-200">
        <i className="fa-solid fa-triangle-exclamation mt-0.5"></i>
        <div><strong>Version v1.0.0 (Legacy) :</strong> La fondation du générateur de site web ultime.</div>
      </div>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-white dark:bg-brand-darker border border-slate-200 dark:border-brand-border rounded-lg shadow-sm">
          <i className="fa-solid fa-bolt text-yellow-500 mb-2 text-xl"></i>
          <h4 className="font-bold text-slate-900 dark:text-white mb-1">Ultra Rapide</h4>
          <p className="text-sm text-slate-500 dark:text-brand-muted">Créez des dossiers, des fichiers HTML/CSS/JS et lancez Git en 2 secondes.</p>
        </div>
        <div className="p-4 bg-white dark:bg-brand-darker border border-slate-200 dark:border-brand-border rounded-lg shadow-sm">
          <i className="fa-solid fa-gears text-slate-500 mb-2 text-xl"></i>
          <h4 className="font-bold text-slate-900 dark:text-white mb-1">Préparez-vous</h4>
          <p className="text-sm text-slate-500 dark:text-brand-muted">Lancez <code>git init</code> et générez automatiquement un <code>.gitignore</code>.</p>
        </div>
      </div>
      <CommonIntro />
      <p className="mt-4 text-sm font-medium text-slate-500 dark:text-brand-muted"><i className="fa-solid fa-circle-info mr-2"></i>Requis : Node.js doit être installé sur votre machine.</p>
    </Section>

    <Section id="installation" title="Installation">
      <p className="mb-4">Installez l'outil globalement ou utilisez-le ponctuellement.</p>
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mt-6 mb-3">Installation mondiale</h3>
      <TerminalBlock command="npm install -g create-my-site" />
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mt-6 mb-3">Usage temporaire</h3>
      <TerminalBlock command="npx create-my-site" />
    </Section>

    <Section id="guide" title="Guide de Démarrage">
      <CodeBlock language="bash" fileName="Sortie terminale" code={`$ npx create-my-site

🚀 Générateur de Site Web Ultime
? Quel est le nom de ton projet ? mon-site-web
? Quel template veux-tu utiliser ? Tailwind CSS
? Initialiser un dépôt Git ? (Y/n) Y`} />
    </Section>
    
    <Section id="templates" title="Les modèles">
      <CommonTemplates />
    </Section>

    <Section id="structure" title="Structure de fichiers">
      <CommonStructure />
    </Section>
    
    <Section id="contribution" title="Contribution">
      <CommonContribution />
    </Section>
  </>
);

// --- Main App Component ---

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('introduction');
  const [isDark, setIsDark] = useState(true);
  const [currentVersion, setCurrentVersion] = useState('v1.2.0');

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let current = '';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 150) {
          current = section.getAttribute('id') || '';
        }
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderContent = () => {
    switch (currentVersion) {
      case 'v1.2.0': return <ContentV120 />;
      case 'v1.1.0': return <ContentV110 />;
      case 'v1.0.0': return <ContentV100 />;
      default: return <ContentV120 />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-brand-dark flex flex-col transition-colors duration-300">
      <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} isDark={isDark} toggleTheme={toggleTheme} currentVersion={currentVersion} onVersionChange={setCurrentVersion} />
      <div className="flex flex-1 max-w-7xl mx-auto w-full pt-16">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} activeSection={activeSection} version={currentVersion} />
        <main className="flex-1 min-w-0 py-10 px-4 lg:px-8 lg:py-12">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;