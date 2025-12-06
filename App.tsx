import React, { useState, useEffect, useRef } from 'react';
import { NavItem, CodeBlockProps, SectionProps } from './types';

// --- Components ---

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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleVersionSelect = (version: string) => {
    onVersionChange(version);
    setIsVersionOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-brand-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-brand-border z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto w-full h-full flex items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className="lg:hidden text-slate-500 dark:text-brand-muted hover:text-slate-900 dark:hover:text-white transition-colors"
            aria-label="Toggle Menu"
          >
            <i className="fa-solid fa-bars text-xl"></i>
          </button>
          
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20 transition-all group-hover:scale-105">
                <i className="fa-solid fa-cube"></i>
              </div>
              <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
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
                  
                  {['v1.0.0'].map((ver) => (
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

        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fa-solid fa-search text-slate-400 dark:text-brand-muted group-focus-within:text-brand-accent transition-colors"></i>
            </div>
            <input 
              type="text" 
              placeholder="Search documentation..." 
              className="block w-full pl-10 pr-3 py-1.5 border border-slate-200 dark:border-brand-border rounded-md leading-5 bg-slate-100 dark:bg-brand-darker text-slate-900 dark:text-brand-text placeholder-slate-500 dark:placeholder-brand-muted focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent sm:text-sm transition-all"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-slate-500 text-xs border border-slate-300 dark:border-gray-700 rounded px-1.5 py-0.5">Ctrl K</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          {/* Theme Toggle Switch */}
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
            <a href="https://github.com/Orochichrys" target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-brand-muted hover:text-slate-900 dark:hover:text-white transition-colors text-xl">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="https://npmjs.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-brand-muted hover:text-slate-900 dark:hover:text-white transition-colors text-xl">
              <i className="fa-brands fa-npm"></i>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

const Sidebar: React.FC<{ isOpen: boolean, onClose: () => void, activeSection: string }> = ({ isOpen, onClose, activeSection }) => {
  const navItems: NavItem[] = [
    { id: 'introduction', label: 'Introduction', icon: 'fa-solid fa-info-circle' },
    { id: 'installation', label: 'Installation', icon: 'fa-solid fa-download' },
    { id: 'guide', label: 'Guide de Démarrage', icon: 'fa-solid fa-rocket' },
    { id: 'templates', label: 'Les Templates', icon: 'fa-solid fa-layer-group' },
    { id: 'structure', label: 'Structure de fichiers', icon: 'fa-solid fa-folder-tree' },
    { id: 'contribution', label: 'Contribution', icon: 'fa-solid fa-code-branch' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar Content */}
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
              onClick={() => onClose()} // Close mobile menu on click
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
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-slate-200 dark:border-brand-border bg-slate-900 dark:bg-brand-darker shadow-xl group relative">
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
        <span className="text-xs font-mono text-slate-400">{fileName || language}</span>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleCopy}
            className={`
              hidden group-hover:flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded transition-all duration-200
              ${copied 
                ? 'text-green-400 bg-green-400/10' 
                : 'text-slate-400 hover:text-white bg-white/5 hover:bg-white/10'}
            `}
            aria-label="Copy code to clipboard"
          >
            {copied ? (
              <>
                <i className="fa-solid fa-check"></i>
                Copied!
              </>
            ) : (
              <>
                <i className="fa-regular fa-copy"></i>
                Copy
              </>
            )}
          </button>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20"></div>
          </div>
        </div>
      </div>
      <div className="p-4 overflow-x-auto relative">
        <pre className="font-mono text-sm leading-relaxed text-slate-200">
          <code className={`language-${language}`}>
            {code.split('\n').map((line, i) => (
              <div key={i} className="table-row">
                <span className="table-cell select-none text-slate-600 text-right pr-4 w-8">{i + 1}</span>
                <span className="table-cell">{line}</span>
              </div>
            ))}
          </code>
        </pre>
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
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <div className="my-4 p-4 rounded-lg bg-slate-900 dark:bg-black border border-slate-700 dark:border-brand-border font-mono text-sm text-green-400 flex items-center justify-between shadow-lg group">
      <div className="flex items-center gap-2 overflow-x-auto">
        <span className="text-pink-500 select-none flex-shrink-0">$</span>
        <span>{command}</span>
      </div>
      <button 
        onClick={handleCopy}
        className={`
          opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1.5 rounded text-xs
          ${copied ? 'text-green-400' : 'text-slate-500 hover:text-white'}
        `}
        title="Copy command"
      >
        <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'}`}></i>
      </button>
    </div>
  );
};

const Section: React.FC<SectionProps> = ({ id, title, children }) => (
  <section id={id} className="scroll-mt-24 mb-16 border-b border-slate-200 dark:border-brand-border/50 pb-8 last:border-0">
    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 relative inline-block">
      {title}
      <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-brand-accent rounded-full"></span>
    </h2>
    <div className="text-slate-600 dark:text-brand-text leading-7">
      {children}
    </div>
  </section>
);

const TemplateCard: React.FC<{ title: string, desc: string, icon: string, features: string[] }> = ({ title, desc, icon, features }) => (
  <div className="bg-white dark:bg-brand-darker border border-slate-200 dark:border-brand-border rounded-xl p-6 hover:border-brand-accent/50 dark:hover:border-brand-accent/50 transition-all hover:shadow-lg hover:shadow-brand-accent/5 group">
    <div className="w-12 h-12 rounded-lg bg-indigo-50 dark:bg-white/5 flex items-center justify-center mb-4 group-hover:bg-brand-accent group-hover:text-white transition-colors text-brand-accent">
      <i className={`${icon} text-2xl`}></i>
    </div>
    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
    <p className="text-sm text-slate-500 dark:text-brand-muted mb-4">{desc}</p>
    <ul className="space-y-2">
      {features.map((feat, i) => (
        <li key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-brand-text">
          <i className="fa-solid fa-check text-green-500 dark:text-green-400 text-xs"></i>
          {feat}
        </li>
      ))}
    </ul>
  </div>
);

const FileTree: React.FC = () => {
  const structure = `mon-projet/
├── .git/
├── .gitignore
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── img/`;

  return (
    <div className="font-mono text-sm bg-slate-900 dark:bg-brand-darker border border-slate-700 dark:border-brand-border p-6 rounded-xl text-slate-300 dark:text-brand-muted leading-relaxed">
      <pre>{structure}</pre>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('introduction');
  const [isDark, setIsDark] = useState(true);
  const [currentVersion, setCurrentVersion] = useState('v1.0.0');

  // Handle Theme
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  // Handle active section on scroll
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
        {/* Sidebar */}
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
          activeSection={activeSection}
        />

        {/* Main Content */}
        <main className="flex-1 min-w-0 py-10 px-4 lg:px-8 lg:py-12">
          
          <Section id="introduction" title="Introduction">
            <p className="mb-4 text-lg text-slate-600 dark:text-brand-muted">
              Bienvenue sur la documentation officielle de <span className="text-slate-900 dark:text-white font-semibold">create-my-site</span>.
            </p>
            <p className="mb-6">
              <strong className="text-brand-accent">create-my-site</strong> est un outil CLI (Command Line Interface) conçu pour générer instantanément l'architecture de sites statiques simples, sans la complexité des bundlers modernes.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-8">
              <div className="p-4 bg-white dark:bg-brand-darker border border-slate-200 dark:border-brand-border rounded-lg shadow-sm">
                <i className="fa-solid fa-bolt text-yellow-500 dark:text-yellow-400 mb-2 text-xl"></i>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Ultra Rapide</h4>
                <p className="text-sm text-slate-500 dark:text-brand-muted">Générez un projet statique prêt à l'emploi en moins de 2 secondes.</p>
              </div>
              <div className="p-4 bg-white dark:bg-brand-darker border border-slate-200 dark:border-brand-border rounded-lg shadow-sm">
                <i className="fa-solid fa-feather text-blue-500 dark:text-blue-400 mb-2 text-xl"></i>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Zéro Dépendance</h4>
                <p className="text-sm text-slate-500 dark:text-brand-muted">Pas de node_modules dans le projet généré. Juste du HTML/CSS/JS.</p>
              </div>
            </div>
          </Section>

          <Section id="installation" title="Installation">
            <p className="mb-4">
              Vous pouvez utiliser l'outil directement via <code className="bg-slate-200 dark:bg-white/10 px-1.5 py-0.5 rounded text-sm text-brand-accent font-mono">npx</code> (recommandé) ou l'installer globalement sur votre machine.
            </p>
            
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mt-6 mb-3">Méthode Recommandée (Sans installation)</h3>
            <TerminalBlock command="npx create-my-site" />

            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mt-6 mb-3">Installation Globale</h3>
            <TerminalBlock command="npm install -g create-my-site" />
            
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-lg flex gap-3">
              <i className="fa-solid fa-circle-info text-blue-500 dark:text-blue-400 mt-0.5"></i>
              <div className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Note :</strong> Node.js version 16.0.0 ou supérieure est requise pour utiliser le CLI, même si le site généré n'en a pas besoin.
              </div>
            </div>
          </Section>

          <Section id="guide" title="Guide de Démarrage">
            <p className="mb-6">
              Une fois la commande lancée, un assistant interactif vous guidera pour créer votre architecture.
            </p>

            <ol className="relative border-l border-slate-200 dark:border-brand-border ml-3 space-y-8">
              <li className="mb-10 ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-white dark:bg-brand-darker rounded-full -left-4 ring-4 ring-slate-50 dark:ring-brand-dark border border-brand-accent text-brand-accent">
                  1
                </span>
                <h3 className="flex items-center mb-1 text-lg font-semibold text-slate-900 dark:text-white">Lancer le CLI</h3>
                <p className="mb-4 text-sm text-slate-500 dark:text-brand-muted">Ouvrez votre terminal et lancez la commande.</p>
                <TerminalBlock command="npx create-my-site mon-projet" />
              </li>
              <li className="mb-10 ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-white dark:bg-brand-darker rounded-full -left-4 ring-4 ring-slate-50 dark:ring-brand-dark border border-slate-200 dark:border-brand-border text-slate-400 dark:text-brand-muted">
                  2
                </span>
                <h3 className="mb-1 text-lg font-semibold text-slate-900 dark:text-white">Sélectionner un Template</h3>
                <p className="text-sm text-slate-500 dark:text-brand-muted mb-4">Utilisez les flèches du clavier pour choisir votre base.</p>
                <CodeBlock 
                  language="bash" 
                  fileName="Terminal Output"
                  code={`? Select a template: › - Use arrow-keys. Return to submit.
❯   Vanilla (HTML/CSS/JS)
    Bootstrap 5
    Tailwind CSS`}
                />
              </li>
              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-white dark:bg-brand-darker rounded-full -left-4 ring-4 ring-slate-50 dark:ring-brand-dark border border-slate-200 dark:border-brand-border text-slate-400 dark:text-brand-muted">
                  3
                </span>
                <h3 className="mb-1 text-lg font-semibold text-slate-900 dark:text-white">Start Coding</h3>
                <p className="text-sm text-slate-500 dark:text-brand-muted mb-4">Entrez dans le dossier. Puisque c'est un site statique, aucune installation n'est requise.</p>
                <TerminalBlock command="cd mon-projet" />
                <p className="mt-4 text-sm text-slate-600 dark:text-brand-text">
                  Ensuite, ouvrez simplement le fichier <code className="text-brand-accent font-mono">index.html</code> dans votre navigateur, ou utilisez une extension comme "Live Server" sur VSCode.
                </p>
              </li>
            </ol>
          </Section>

          <Section id="templates" title="Les Templates">
            <p className="mb-8">
              Trois options simples pour démarrer vos projets. Les frameworks CSS sont inclus via CDN pour une utilisation immédiate sans configuration.
            </p>
            <div className="grid lg:grid-cols-2 gap-6">
              <TemplateCard 
                title="Vanilla" 
                desc="Le strict minimum. Une structure de dossiers vide avec HTML/CSS de base." 
                icon="fa-brands fa-html5"
                features={['HTML5 Boilerplate', 'Fichier CSS lié', 'Fichier JS lié', 'Aucune librairie externe']}
              />
              <TemplateCard 
                title="Tailwind CSS" 
                desc="Script CDN Tailwind inclus dans le head. Idéal pour le prototypage rapide." 
                icon="fa-solid fa-wind"
                features={['Tailwind via CDN', 'Config script incluse', 'Pas de PostCSS requis', 'Design utility-first']}
              />
              <TemplateCard 
                title="Bootstrap 5" 
                desc="L'intégration classique via CDN de Bootstrap 5.3." 
                icon="fa-brands fa-bootstrap"
                features={['Bootstrap 5.3 CDN', 'Bootstrap Icons CDN', 'Bundle JS inclus', 'Composants prêts']}
              />
            </div>
          </Section>

          <Section id="structure" title="Structure de fichiers">
            <p className="mb-6">
              La structure générée est plate et intuitive. Il n'y a pas de dossier <code className="text-brand-accent font-mono">src</code> complexe ni de fichiers de configuration de bundler.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <FileTree />
              <div className="space-y-4">
                <div className="p-4 rounded bg-white dark:bg-brand-darker border border-slate-200 dark:border-brand-border shadow-sm">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">index.html</h4>
                  <p className="text-xs text-slate-500 dark:text-brand-muted">Votre page principale. Les liens vers CSS/JS sont déjà faits.</p>
                </div>
                <div className="p-4 rounded bg-white dark:bg-brand-darker border border-slate-200 dark:border-brand-border shadow-sm">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">css/style.css</h4>
                  <p className="text-xs text-slate-500 dark:text-brand-muted">Feuille de style de base (vide ou avec imports selon le template).</p>
                </div>
                <div className="p-4 rounded bg-white dark:bg-brand-darker border border-slate-200 dark:border-brand-border shadow-sm">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">js/script.js</h4>
                  <p className="text-xs text-slate-500 dark:text-brand-muted">Votre point d'entrée JavaScript, chargé en fin de body.</p>
                </div>
              </div>
            </div>
          </Section>

          <Section id="contribution" title="Contribution">
            <p className="mb-6">
              Ce projet est Open Source et vit grâce à la communauté. Toute contribution est la bienvenue !
            </p>
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/50 dark:to-purple-900/50 border border-indigo-100 dark:border-indigo-500/30 rounded-xl p-8 text-center">
              <i className="fa-solid fa-code-branch text-4xl text-indigo-500 dark:text-white mb-4"></i>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Envie de participer ?</h3>
              <p className="text-slate-600 dark:text-brand-muted mb-6 max-w-lg mx-auto">
                Forkez le projet, créez une branche feature, et proposez une Pull Request.
                Consultez le fichier CONTRIBUTING.md pour plus de détails.
              </p>
              <a 
                href="https://github.com/Orochichrys" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 dark:bg-white text-white dark:text-brand-dark font-bold rounded-full hover:bg-indigo-700 dark:hover:bg-brand-accent dark:hover:text-white transition-all transform hover:-translate-y-1 shadow-lg shadow-indigo-500/30"
              >
                <i className="fa-brands fa-github"></i>
                Voir sur GitHub
              </a>
            </div>
            
            <footer className="mt-10 pt-6 border-t border-slate-200 dark:border-brand-border text-center text-sm text-slate-400 dark:text-brand-muted">
              <p>&copy; {new Date().getFullYear()} Orochichrys. MIT License.</p>
              <p className="mt-2">Made with <i className="fa-solid fa-heart text-red-500 mx-1"></i> for developers.</p>
            </footer>
          </Section>

        </main>
      </div>
    </div>
  );
};

export default App;