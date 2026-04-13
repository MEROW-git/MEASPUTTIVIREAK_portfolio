import type {
  FeaturedProject,
  JournalPost,
  SiteLink,
  SkillItem,
  ToolItem,
} from '@/types'

export const siteProfile = {
  name: 'MEAS PUTTIVIREAK',
  headline: ['MIS Student', 'Developer', 'System Builder'],
  school: 'SETEC Institute',
  studyPeriod: '2023 - Present',
  intro:
    'I build practical systems with a strong interest in databases, software workflows, and useful digital tools that solve real operational problems.',
  about:
    'I am a Management Information Systems student at SETEC Institute. My work is centered on turning requirements into practical systems, especially where databases, internal tools, and structured processes matter. I enjoy building solutions that are useful in the real world and clear enough for people to rely on every day.',
  focus: [
    'Technology and coding',
    'Database design and SQL thinking',
    'System development for real operational needs',
    'Clean, practical web experiences',
  ],
}

export const skills: SkillItem[] = [
  {
    name: 'Microsoft Access',
    category: 'Systems',
    description: 'Rapid internal tools, forms, reports, and workflow-driven business apps.',
  },
  {
    name: 'VBA',
    category: 'Automation',
    description: 'Business logic, automation, and tailored operational tooling.',
  },
  {
    name: 'SQL',
    category: 'Database',
    description: 'Query design, reporting, data structure, and relational problem solving.',
  },
  {
    name: 'Python',
    category: 'Programming',
    description: 'Utility scripts, data handling, and backend-oriented logic.',
  },
  {
    name: 'Java',
    category: 'Programming',
    description: 'Object-oriented programming and structured software fundamentals.',
  },
  {
    name: 'Database Design',
    category: 'Architecture',
    description: 'Designing normalized, practical data models for maintainable systems.',
  },
  {
    name: 'Web Development',
    category: 'Frontend',
    description: 'Responsive interfaces with modern frameworks and clean UI structure.',
  },
  {
    name: 'System Development',
    category: 'Product',
    description: 'Planning and building useful systems from requirement to delivery.',
  },
]

export const tools: ToolItem[] = [
  { name: 'Java', short: 'Java', group: 'Language', accent: 'from-orange-500/30 to-amber-300/20', color: '#f97316', glow: '#fdba74' },
  { name: 'Python', short: 'Py', group: 'Language', accent: 'from-blue-500/30 to-yellow-300/20', color: '#60a5fa', glow: '#fde68a', modelPath: '/models/python-logo.glb' },
  { name: 'JavaScript', short: 'JS', group: 'Language', accent: 'from-yellow-400/35 to-amber-200/20', color: '#facc15', glow: '#fde68a', modelPath: '/models/js-logo.glb' },
  { name: 'TypeScript', short: 'TS', group: 'Language', accent: 'from-sky-500/35 to-blue-300/20', color: '#38bdf8', glow: '#93c5fd', modelPath: '/models/ts-logo.glb' },
  { name: 'React', short: 'React', group: 'Frontend', accent: 'from-cyan-400/35 to-sky-300/20', color: '#22d3ee', glow: '#67e8f9', modelPath: '/models/react-logo.fbx' },
  { name: 'Next.js', short: 'Next', group: 'Frontend', accent: 'from-slate-200/20 to-slate-500/10', color: '#e5e7eb', glow: '#94a3b8' },
  { name: 'Node.js', short: 'Node', group: 'Backend', accent: 'from-lime-400/30 to-green-300/20', color: '#84cc16', glow: '#bef264', modelPath: '/models/node-js-logo.glb' },
  { name: 'Spring', short: 'Spring', group: 'Backend', accent: 'from-green-500/30 to-lime-300/20', color: '#22c55e', glow: '#86efac' },
  { name: 'PHP', short: 'PHP', group: 'Backend', accent: 'from-indigo-400/30 to-slate-300/20', color: '#818cf8', glow: '#c4b5fd' },
  { name: 'Docker', short: 'Docker', group: 'DevOps', accent: 'from-sky-500/35 to-cyan-300/20', color: '#0ea5e9', glow: '#7dd3fc', modelPath: '/models/docker-logo.glb' },
  { name: 'PostgreSQL', short: 'Postgres', group: 'Database', accent: 'from-blue-400/35 to-slate-300/20', color: '#60a5fa', glow: '#bfdbfe' },
  { name: 'MySQL', short: 'MySQL', group: 'Database', accent: 'from-slate-400/20 to-blue-300/20', color: '#94a3b8', glow: '#93c5fd' },
  { name: 'MongoDB', short: 'Mongo', group: 'Database', accent: 'from-emerald-500/30 to-green-300/20', color: '#10b981', glow: '#6ee7b7' },
  { name: 'Linux', short: 'Linux', group: 'Platform', accent: 'from-slate-100/15 to-amber-200/15', color: '#e5e7eb', glow: '#fcd34d' },
  { name: 'Git', short: 'Git', group: 'Versioning', accent: 'from-orange-500/35 to-red-300/20', color: '#f97316', glow: '#fdba74' },
  { name: 'Postman', short: 'API', group: 'Tooling', accent: 'from-orange-400/35 to-amber-200/15', color: '#fb923c', glow: '#fdba74' },
  { name: 'Nginx', short: 'Nginx', group: 'Server', accent: 'from-emerald-500/35 to-green-300/20', color: '#22c55e', glow: '#86efac' },
  { name: 'AWS', short: 'AWS', group: 'Cloud', accent: 'from-amber-500/25 to-slate-200/15', color: '#f59e0b', glow: '#fde68a' },
  { name: 'Firebase', short: 'Firebase', group: 'Cloud', accent: 'from-yellow-500/35 to-orange-300/15', color: '#f59e0b', glow: '#fdba74' },
  { name: 'Microsoft Access', short: 'Access', group: 'Systems', accent: 'from-rose-500/30 to-red-300/15', color: '#f43f5e', glow: '#fda4af' },
  { name: 'VBA', short: 'VBA', group: 'Automation', accent: 'from-fuchsia-500/25 to-violet-300/15', color: '#d946ef', glow: '#c4b5fd' },
  { name: 'SQL', short: 'SQL', group: 'Database', accent: 'from-cyan-400/25 to-sky-300/15', color: '#06b6d4', glow: '#67e8f9' },
]

export const featuredProjects: FeaturedProject[] = [
  {
    title: 'Water Billing System',
    location: 'Kompong Cham Province',
    builtFor: 'Water business',
    stack: ['Microsoft Access', 'VBA'],
    description:
      'A billing and operational system developed for a water business to support daily administrative work, structured billing processes, and more reliable record management.',
    outcome:
      'The system was successfully implemented and used in real work, which made it one of the most meaningful examples of practical system development in my experience so far.',
  },
  {
    title: 'School Library Management System',
    location: 'School library',
    builtFor: 'Library operations and student borrowing',
    collaborators: ['Som Soratim'],
    stack: ['Microsoft Access', 'VBA', 'Database Design'],
    description:
      'A school library system I worked on with my friend Som Soratim. It handled borrowing books, library cards, student credit scores, late-return fees, and other everyday library tasks.',
    outcome:
      'The project helped us design a more organized workflow for borrowing, book tracking, borrower records, fees, and library management.',
  },
]

export const socialLinks: SiteLink[] = [
  { label: 'Email', href: 'mailto:puttyvireakmeas@gmial.com' },
  { label: 'GitHub', href: 'https://github.com/MEROW-git' },
  { label: 'Telegram', href: 'https://t.me/' },
]

export const sampleJournalPosts: JournalPost[] = [
  {
    id: 'journal-1',
    title: 'Designing Useful Systems Before Writing Code',
    slug: 'designing-useful-systems-before-writing-code',
    excerpt:
      'How I think about turning a real business process into a system that people can actually use and trust.',
    coverImage: null,
    tags: ['System Design', 'MIS', 'Workflow'],
    isPublished: true,
    createdAt: '2026-04-01T08:00:00.000Z',
    updatedAt: '2026-04-01T08:00:00.000Z',
    publishedAt: '2026-04-01T08:00:00.000Z',
    content: `
      <h2>Useful systems start with useful understanding</h2>
      <p>When I begin a project, I try not to jump straight into code. I want to understand the people, the workflow, the repeated tasks, and the places where mistakes usually happen.</p>
      <p>That mindset comes from studying MIS and from building practical tools. A system is only successful when it helps real work become clearer, faster, and more reliable.</p>
      <blockquote>Good software does not just process data. It supports decisions and daily work.</blockquote>
      <h3>My usual starting points</h3>
      <ul>
        <li>What information is being recorded?</li>
        <li>Who uses it and how often?</li>
        <li>What steps are repeated every day?</li>
        <li>Where do errors or delays usually happen?</li>
      </ul>
      <p>Once those are clear, building tables, forms, reports, or web pages becomes much more intentional.</p>
    `,
  },
  {
    id: 'journal-2',
    title: 'Building a Water Billing System with Access and VBA',
    slug: 'building-a-water-billing-system-with-access-and-vba',
    excerpt:
      'A practical look at one of my key projects: a real billing system used by a water business in Kompong Cham Province.',
    coverImage: null,
    tags: ['Microsoft Access', 'VBA', 'Case Study'],
    isPublished: true,
    createdAt: '2026-03-18T08:00:00.000Z',
    updatedAt: '2026-03-20T08:00:00.000Z',
    publishedAt: '2026-03-20T08:00:00.000Z',
    content: `
      <h2>Real work gave the project its shape</h2>
      <p>This project mattered to me because it was not just an exercise. It was a real operational system for a water business in Kompong Cham Province.</p>
      <p>I developed the solution using <strong>Microsoft Access</strong> and <strong>VBA</strong> to support the business with a more structured billing process.</p>
      <pre><code class="language-bash">collect meter data
generate customer billing
review records
prepare reports</code></pre>
      <p>The project reinforced something important for me: practical tools become valuable when they fit the workflow people already depend on.</p>
    `,
  },
  {
    id: 'journal-3',
    title: 'Why Database Design Still Matters for Modern Apps',
    slug: 'why-database-design-still-matters',
    excerpt:
      'Even with modern frameworks and fast iteration, clean data structure still shapes the quality of the whole system.',
    coverImage: null,
    tags: ['Database Design', 'SQL', 'Web Development'],
    isPublished: false,
    createdAt: '2026-04-10T08:00:00.000Z',
    updatedAt: '2026-04-10T08:00:00.000Z',
    publishedAt: null,
    content: `
      <h2>Structure creates stability</h2>
      <p>When the database design is weak, every part of the application becomes harder to trust. Queries become awkward, validation grows messy, and reporting becomes fragile.</p>
      <p>I like database work because it forces clarity. It makes you define what the system truly needs to store, relate, and communicate.</p>
      <ul>
        <li>Better reporting</li>
        <li>Cleaner application logic</li>
        <li>More reliable long-term maintenance</li>
      </ul>
    `,
  },
]
