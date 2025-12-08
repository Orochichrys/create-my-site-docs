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

  const versions = ['v1.1.0', 'v1.0.0'];

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-brand-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-brand-border z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto w-full h-full flex items-center justify-between px-4 lg:px-8">
        
        {/* GAUCHE : Menu Burger + Logo + Version */}
        <div className="flex items-center gap-2 sm:gap-4">
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
              {/* Le texte est caché sur mobile (hidden) et visible sur écran large (sm:block) */}
              <span className="hidden sm:block font-bold text-lg tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                create-my-site
              </span>
            </a>

            {/* Version Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsVersionOpen(!isVersionOpen)}
                className="flex items-center gap-1.5 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 hover:bg-indigo-200 dark:hover:bg-indigo-500/20 transition-colors cursor-pointer select-none"
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
        <div className="flex items-center gap-3 sm:gap-6">
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
          
          <div className="flex items-center gap-4">
            <a href="https://github.com/Orochichrys/mon-generateur-web" target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-brand-muted hover:text-slate-900 dark:hover:text-white transition-colors text-xl">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="https://www.npmjs.com/package/create-my-site" target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-brand-muted hover:text-slate-900 dark:hover:text-white transition-colors text-xl">
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

  // Pour la v1.1.0, on ajoute l'onglet Arguments CLI
  const navItemsV11 = [
    ...navItemsV1.slice(0, 3),
    { id: 'cli-args', label: 'Arguments CLI', icon: 'fa-solid fa-terminal' }, 
    ...navItemsV1.slice(3)
  ];

  const navItems = version === 'v1.1.0' ? navItemsV11 : navItemsV1;

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
      </aside>
    </>
  );
};

const CodeBlock: React.FC<CodeBlockProps> = ({ language, code, fileName }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) { console.error('Failed to copy!', err); }
  };
  return (
    <div className="my-6 rounded-lg overflow-hidden border border-slate-200 dark:border-brand-border bg-slate-900 dark:bg-brand-darker shadow-xl group relative">
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
        <span className="text-xs font-mono text-slate-400">{fileName || language}</span>
        <div className="flex items-center gap-4">
          <button onClick={handleCopy} className={`hidden group-hover:flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded transition-all duration-200 ${copied ? 'text-green-400 bg-green-400/10' : 'text-slate-400 hover:text-white bg-white/5 hover:bg-white/10'}`}>
            {copied ? <><i className="fa-solid fa-check"></i> Copié !</> : <><i className="fa-regular fa-copy"></i> Copier</>}
          </button>
          <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20"></div><div className="w-2.5 h-2.5 rounded-full bg-green-500/20"></div></div>
        </div>
      </div>
      <div className="p-4 overflow-x-auto relative">
        <pre className="font-mono text-sm leading-relaxed text-slate-200"><code className={`language-${language}`}>{code.split('\n').map((line, i) => (<div key={i} className="table-row"><span className="table-cell select-none text-slate-600 text-right pr-4 w-8">{i + 1}</span><span className="table-cell">{line}</span></div>))}</code></pre>
      </div>
    </div>
  );
};

const TerminalBlock: React.FC<{ command: string }> = ({ command }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) { console.error('Failed to copy!', err); }
  };
  return (
    <div className="my-4 p-4 rounded-lg bg-slate-900 dark:bg-black border border-slate-700 dark:border-brand-border font-mono text-sm text-green-400 flex items-center justify-between shadow-lg group">
      <div className="flex items-center gap-2 overflow-x-auto"><span className="text-pink-500 select-none flex-shrink-0">$</span><span>{command}</span></div>
      <button onClick={handleCopy} className={`opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1.5 rounded text-xs ${copied ? 'text-green-400' : 'text-slate-500 hover:text-white'}`}><i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'}`}></i></button>
    </div>
  );
};

const Section: React.FC<SectionProps> = ({ id, title, children }) => (
  <section id={id} className="scroll-mt-24 mb-16 last:mb-0 last:border-0 last:pb-0 border-b border-slate-200 dark:border-brand-border/50 pb-8">
    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 relative inline-block">
      {title}
      <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-brand-accent rounded-full"></span>
    </h2>
    <div className="text-slate-600 dark:text-brand-text leading-7">{children}</div>
  </section>
);

const TemplateCard: React.FC<{ title: string, desc: string, icon: string, features: string[] }> = ({ title, desc, icon, features }) => (
  <div className="bg-white dark:bg-brand-darker border border-slate-200 dark:border-brand-border rounded-xl p-6 hover:border-brand-accent/50 dark:hover:border-brand-accent/50 transition-all hover:shadow-lg hover:shadow-brand-accent/5 group">
    <div className="w-12 h-12 rounded-lg bg-indigo-50 dark:bg-white/5 flex items-center justify-center mb-4 group-hover:bg-brand-accent group-hover:text-white transition-colors text-brand-accent"><i className={`${icon} text-2xl`}></i></div>
    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
    <p className="text-sm text-slate-500 dark:text-brand-muted mb-4">{desc}</p>
    <ul className="space-y-2">{features.map((feat, i) => (<li key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-brand-text"><i className="fa-solid fa-check text-green-500 dark:text-green-400 text-xs"></i>{feat}</li>))}</ul>
  </div>
);

const FileTree: React.FC = () => (
  // Ajout de 'overflow-x-auto' pour le scroll horizontal sur mobile
  // Réduction du padding mobile : p-4 au lieu de p-6
  <div className="font-mono text-sm bg-slate-900 dark:bg-brand-darker border border-slate-700 dark:border-brand-border p-4 md:p-6 rounded-xl text-slate-300 dark:text-brand-muted leading-relaxed overflow-x-auto">
    <pre>{`mon-site-web/
├── .git/               # Initialisé automatiquement
├── .gitignore          # Exclut node_modules, etc.
├── index.html          # Page principale
├── css/
│   └── style.css       # Styles générés
├── js/
│   └── script.js       # Script JS de base
└── img/                # Dossier images (vide)`}</pre>
  </div>
);
const CommonIntro = () => (
  <>
    <p className="mb-4 text-lg text-slate-600 dark:text-brand-muted">
      Bienvenue sur la documentation officielle de <span className="text-slate-900 dark:text-white font-semibold">create-my-site</span>.
    </p>
    <p className="mb-6">
      <strong className="text-brand-accent">create-my-site</strong> est un générateur de projets web qui permet d’initialiser rapidement une structure HTML/CSS/JS avec Bootstrap ou Tailwind, et d’optionnellement initialiser un dépôt Git.
    </p>
    <div className="grid md:grid-cols-2 gap-4 mt-8">
      <div className="p-4 bg-white dark:bg-brand-darker border border-slate-200 dark:border-brand-border rounded-lg shadow-sm">
        <i className="fa-solid fa-bolt text-yellow-500 dark:text-yellow-400 mb-2 text-xl"></i>
        <h4 className="font-bold text-slate-900 dark:text-white mb-1">Ultra Rapide</h4>
        <p className="text-sm text-slate-500 dark:text-brand-muted">Créez des dossiers, des fichiers HTML/CSS/JS et lancez Git en 2 secondes.</p>
      </div>
      <div className="p-4 bg-white dark:bg-brand-darker border border-slate-200 dark:border-brand-border rounded-lg shadow-sm">
        <i className="fa-brands fa-git-alt text-orange-500 dark:text-orange-400 mb-2 text-xl"></i>
        <h4 className="font-bold text-slate-900 dark:text-white mb-1">Préparez-vous</h4>
        <p className="text-sm text-slate-500 dark:text-brand-muted">Lancez `git init` et génèrez automatiquement un `.gitignore`.</p>
      </div>
    </div>
  </>
);

const CommonTemplates = () => (
  <div className="grid lg:grid-cols-2 gap-6">
    <TemplateCard 
      title="Site Vide" 
      desc="Le HTML5 Boilerplate classique. Juste ce qu'il faut pour démarrer à partir de zéro." 
      icon="fa-brands fa-html5"
      features={['Structure HTML5 valide', 'Lien style.css inclus', 'Lien script.js inclus', 'Corps simple avec H1']}
    />
    <TemplateCard 
      title="Bootstrap 5" 
      desc="Tout est préconfiguré pour Bootstrap 5.3 via CDN." 
      icon="fa-brands fa-bootstrap"
      features={['Bootstrap 5.3 CSS et JS', 'Conteneur réactif', 'Exemple : Alerte et bouton', 'Style.css prêt pour la surcharge']}
    />
    <TemplateCard 
      title="Tailwind CSS" 
      desc="Intégration instantanée de Tailwind via le script CDN." 
      icon="fa-solid fa-wind"
      features={['Script Tailwind CDN', 'Classes utilitaires actives', 'Exemple : Boutons colorés', 'Configuration zéro-build']}
    />
  </div>
);

const CommonStructure = () => (
  <div className="grid md:grid-cols-2 gap-8 items-start">
    <FileTree />
    <div className="space-y-4">
      <div className="p-4 rounded bg-white dark:bg-brand-darker border border-slate-200 dark:border-brand-border shadow-sm">
        <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">index.html</h4>
        <p className="text-xs text-slate-500 dark:text-brand-muted">Point d'entrée avec les balises méta et les importations CSS/JS selon le template.</p>
      </div>
      <div className="p-4 rounded bg-white dark:bg-brand-darker border border-slate-200 dark:border-brand-border shadow-sm">
        <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">.gitignore</h4>
        <p className="text-xs text-slate-500 dark:text-brand-muted">Ignorer automatiquement les node_modules et fichiers systèmes (DS_Store).</p>
      </div>
      <div className="p-4 rounded bg-white dark:bg-brand-darker border border-slate-200 dark:border-brand-border shadow-sm">
        <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Dossiers (css, js, img)</h4>
        <p className="text-xs text-slate-500 dark:text-brand-muted">Organisation propre dès le début du projet.</p>
      </div>
    </div>
  </div>
);

const CommonContribution = () => (
  <>
    <p className="mb-6">
      Ce projet est Open Source. Aidez-nous à ajouter de nouveaux templates (React, Vue ?) !
    </p>
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/50 dark:to-purple-900/50 border border-indigo-100 dark:border-indigo-500/30 rounded-xl p-8 text-center">
      <i className="fa-solid fa-code-branch text-4xl text-indigo-500 dark:text-white mb-4"></i>
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Envie de participer ?</h3>
      <p className="text-slate-600 dark:text-brand-muted mb-6 max-w-lg mx-auto">
        Forkez le projet, améliorez le fichier <code>index.js</code> et proposez une Pull Request.
      </p>
      <a href="https://github.com/Orochichrys/mon-generateur-web" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 dark:bg-white text-white dark:text-brand-dark font-bold rounded-full hover:bg-indigo-700 dark:hover:bg-brand-accent dark:hover:text-white transition-all transform hover:-translate-y-1 shadow-lg shadow-indigo-500/30">
        <i className="fa-brands fa-github"></i>
        Voir sur GitHub
      </a>
    </div>
    <footer className="mt-4 pt-4 border-t border-slate-200 dark:border-brand-border text-center text-sm text-slate-400 dark:text-brand-muted">
      <p>&copy; {new Date().getFullYear()} Orochichrys. Licence MIT.</p>
      <p className="mt-1">Fait avec <i className="fa-solid fa-heart text-red-500 mx-1"></i> pour les développeurs.</p>
    </footer>
  </>
);

// --- Content Components par Version ---

const ContentV100: React.FC = () => (
  <>
    <Section id="introduction" title="Introduction">
      <div className="p-4 mb-6 bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 rounded-lg flex gap-3 text-sm text-yellow-800 dark:text-yellow-200">
        <i className="fa-solid fa-triangle-exclamation mt-0.5"></i>
        <div>Version <strong>v1.0.0</strong> (Legacy).</div>
      </div>
      <CommonIntro />
    </Section>

    <Section id="installation" title="Installation">
      <p className="mb-4">Vous pouvez utiliser l'outil directement via <code className="bg-slate-200 dark:bg-white/10 px-1.5 py-0.5 rounded text-sm text-brand-accent font-mono">npx</code> (recommandé) ou l'installer globalement.</p>
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mt-6 mb-3">Méthode Recommandée</h3>
      <TerminalBlock command="npx create-my-site" />
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mt-6 mb-3">Installation mondiale</h3>
      <TerminalBlock command="npm install -g create-my-site" />
      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-lg flex gap-3 text-sm text-blue-800 dark:text-blue-200">
        <i className="fa-solid fa-circle-info mt-0.5"></i>
        <div><strong>Requis :</strong> Node.js doit être installé sur votre machine.</div>
      </div>
    </Section>

    <Section id="guide" title="Guide de Démarrage">
      <p className="mb-6">L'outil pose 3 questions simples pour configurer votre projet sur mesure.</p>
      <ol className="relative border-l border-slate-200 dark:border-brand-border ml-3 space-y-8">
        <li className="mb-10 ml-6">
          <span className="absolute flex items-center justify-center w-8 h-8 bg-white dark:bg-brand-darker rounded-full -left-4 ring-4 ring-slate-50 dark:ring-brand-dark border border-brand-accent text-brand-accent">1</span>
          <h3 className="flex items-center mb-1 text-lg font-semibold text-slate-900 dark:text-white">Questions interactives</h3>
          <p className="mb-4 text-sm text-slate-500 dark:text-brand-muted">La CLI vous guidera à travers ces étapes :</p>
          <CodeBlock language="bash" fileName="Sortie terminale" code={`🚀 Générateur de Site Web Ultime
? Quel est le nom de ton projet ? (mon-site-web)
> mon-super-projet
? Quel template veux-tu utiliser ?
  1) Site Vide (HTML/CSS basique)
  2) Bootstrap 5
  3) Tailwind CSS
> 3
? Initialiser un dépôt Git (git init) ? (Y/n)
> Y`} />
        </li>
        <li className="mb-10 ml-6">
          <span className="absolute flex items-center justify-center w-8 h-8 bg-white dark:bg-brand-darker rounded-full -left-4 ring-4 ring-slate-50 dark:ring-brand-dark border border-slate-200 dark:border-brand-border text-slate-400 dark:text-brand-muted">2</span>
          <h3 className="mb-1 text-lg font-semibold text-slate-900 dark:text-white">Génération Automatique</h3>
          <p className="text-sm text-slate-500 dark:text-brand-muted mb-4">L'outil crée le dossier, télécharge les structures et configure Git.</p>
          <div className="font-mono text-xs text-green-400 bg-black p-3 rounded border border-gray-800">
            📁 Structure créée : mon-super-projet/ (css, js, img)<br/>
            📄 Fichiers générés (html, css, js).<br/>
            🦊 Dépôt Git initialisé avec succès.<br/>
            <br/>
            ✅ Tout est prêt !
          </div>
        </li>
        <li className="ml-6">
          <span className="absolute flex items-center justify-center w-8 h-8 bg-white dark:bg-brand-darker rounded-full -left-4 ring-4 ring-slate-50 dark:ring-brand-dark border border-slate-200 dark:border-brand-border text-slate-400 dark:text-brand-muted">3</span>
          <h3 className="mb-1 text-lg font-semibold text-slate-900 dark:text-white">Commencez à coder</h3>
          <TerminalBlock command="cd mon-super-projet" />
          <p className="mt-4 text-sm text-slate-600 dark:text-brand-text">Ouvrez <code className="text-brand-accent font-mono">index.html</code>. Tout est déjà relié !</p>
        </li>
      </ol>
    </Section>
    
    <Section id="templates" title="Les modèles">
      <p className="mb-8">Choisissez parmi 3 bases solides. Le code HTML généré inclut déjà les balises &lt;link&gt; et &lt;script&gt; nécessaires.</p>
      <CommonTemplates />
    </Section>

    <Section id="structure" title="Structure de fichiers">
      <p className="mb-6">Voici exactement ce que l'outil génère sur votre disque dur. Notez la présence du dossier <code className="text-brand-accent font-mono">img</code> et du <code className="text-brand-accent font-mono">.gitignore</code>.</p>
      <CommonStructure />
    </Section>
    
    <Section id="contribution" title="Contribution">
      <CommonContribution />
    </Section>
  </>
);

const ContentV110: React.FC = () => (
  <>
    <Section id="introduction" title="Introduction">
      <div className="p-4 mb-6 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-lg flex gap-3 text-sm text-green-800 dark:text-green-200">
        <i className="fa-solid fa-star mt-0.5"></i>
        <div><strong>Nouveau dans v1.1.0 :</strong> Support des arguments CLI (flags) et désactivation de Git.</div>
      </div>
      <CommonIntro />
    </Section>

    <Section id="installation" title="Installation">
      <p className="mb-4">Vous pouvez utiliser l'outil directement via <code className="bg-slate-200 dark:bg-white/10 px-1.5 py-0.5 rounded text-sm text-brand-accent font-mono">npx</code> (recommandé) ou l'installer globalement.</p>
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mt-6 mb-3">Méthode Recommandée</h3>
      <TerminalBlock command="npx create-my-site" />
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mt-6 mb-3">Installation mondiale</h3>
      <TerminalBlock command="npm install -g create-my-site" />
      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-lg flex gap-3 text-sm text-blue-800 dark:text-blue-200">
        <i className="fa-solid fa-circle-info mt-0.5"></i>
        <div><strong>Requis :</strong> Node.js doit être installé sur votre machine.</div>
      </div>
    </Section>

    <Section id="guide" title="Guide de Démarrage">
      <p className="mb-6">L'outil offre maintenant deux modes d'utilisation : Interactif (pour les débutants) et Automatique (pour les experts).</p>
      
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="p-5 border border-slate-200 dark:border-brand-border rounded-xl bg-white dark:bg-brand-darker">
          <h4 className="font-bold text-lg mb-2 text-indigo-600 dark:text-indigo-400">1. Mode Interactif</h4>
          <p className="text-sm text-slate-600 dark:text-brand-muted mb-4">Laissez-vous guider par les questions.</p>
          <TerminalBlock command="npx create-my-site" />
        </div>
        <div className="p-5 border border-slate-200 dark:border-brand-border rounded-xl bg-white dark:bg-brand-darker">
          <h4 className="font-bold text-lg mb-2 text-pink-600 dark:text-pink-400">2. Mode Expert (CLI)</h4>
          <p className="text-sm text-slate-600 dark:text-brand-muted mb-4">Tout en une seule commande.</p>
          <TerminalBlock command="npx create-my-site mon-projet -t tailwind" />
        </div>
      </div>

      {/* Reprise du guide interactif comme en v1.0.0 */}
      <ol className="relative border-l border-slate-200 dark:border-brand-border ml-3 space-y-8">
        <li className="mb-10 ml-6">
          <span className="absolute flex items-center justify-center w-8 h-8 bg-white dark:bg-brand-darker rounded-full -left-4 ring-4 ring-slate-50 dark:ring-brand-dark border border-brand-accent text-brand-accent">1</span>
          <h3 className="flex items-center mb-1 text-lg font-semibold text-slate-900 dark:text-white">Questions interactives</h3>
          <p className="mb-4 text-sm text-slate-500 dark:text-brand-muted">La CLI vous guidera à travers ces étapes :</p>
          <CodeBlock language="bash" fileName="Sortie terminale" code={`🚀 Générateur de Site Web Ultime
? Quel est le nom de ton projet ? (mon-site-web)
> mon-super-projet
? Quel template veux-tu utiliser ?
  1) Site Vide (HTML/CSS basique)
  2) Bootstrap 5
  3) Tailwind CSS
> 3
? Initialiser un dépôt Git (git init) ? (Y/n)
> Y`} />
        </li>
      </ol>
    </Section>

    <Section id="cli-args" title="Arguments CLI">
      <p className="mb-4">
        Automatisez vos créations de projets avec les drapeaux (flags) suivants :
      </p>
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
            <tr>
              <td className="p-4 font-mono text-brand-accent">{'[name]'}</td>
              <td className="p-4 text-slate-600 dark:text-brand-muted">Nom du dossier à créer.</td>
              <td className="p-4 font-mono text-xs">mon-site</td>
            </tr>
            <tr>
              <td className="p-4 font-mono text-brand-accent">-t, --template</td>
              <td className="p-4 text-slate-600 dark:text-brand-muted">
                Choix du template : <br/>
                <code className="text-xs bg-slate-200 dark:bg-white/10 px-1 rounded">bootstrap</code>, 
                <code className="text-xs bg-slate-200 dark:bg-white/10 px-1 rounded mx-1">tailwind</code>, 
                <code className="text-xs bg-slate-200 dark:bg-white/10 px-1 rounded">empty</code>
              </td>
              <td className="p-4 font-mono text-xs">-t bootstrap</td>
            </tr>
            <tr>
              <td className="p-4 font-mono text-brand-accent">--no-init</td>
              <td className="p-4 text-slate-600 dark:text-brand-muted">Empêche l'initialisation du dépôt Git.</td>
              <td className="p-4 font-mono text-xs">--no-init</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-6">
        <h4 className="font-bold mb-2 text-slate-900 dark:text-white">Exemple complet :</h4>
        <TerminalBlock command="npx create-my-site portfolio -t tailwind --no-init" />
      </div>
    </Section>

    <Section id="templates" title="Les modèles">
      <p className="mb-8">Choisissez parmi 3 bases solides. Le code HTML généré inclut déjà les balises &lt;link&gt; et &lt;script&gt; nécessaires.</p>
      <CommonTemplates />
    </Section>

    <Section id="structure" title="Structure de fichiers">
      <p className="mb-6">Voici exactement ce que l'outil génère sur votre disque dur. Notez la présence du dossier <code className="text-brand-accent font-mono">img</code> et du <code className="text-brand-accent font-mono">.gitignore</code>.</p>
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
  const [currentVersion, setCurrentVersion] = useState('v1.1.0');

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-brand-dark flex flex-col transition-colors duration-300">
      <Header 
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} 
        isDark={isDark}
        toggleTheme={toggleTheme}
        currentVersion={currentVersion}
        onVersionChange={setCurrentVersion}
      />

      <div className="flex flex-1 max-w-7xl mx-auto w-full pt-16">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
          activeSection={activeSection}
          version={currentVersion}
        />

        <main className="flex-1 min-w-0 py-10 px-4 lg:px-8 lg:py-12">
          {currentVersion === 'v1.1.0' ? <ContentV110 /> : <ContentV100 />}
        </main>
      </div>
    </div>
  );
};

export default App;