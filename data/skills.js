export const skillCategories = [
  {
    id: 'languages',
    label: 'Programming Languages',
    icon: 'code',
    skills: [
      { name: 'JavaScript', core: true, note: 'ES6+, Async, DOM' },
      { name: 'TypeScript', core: true, note: 'Static typing, Generics' },
      { name: 'Python', core: true, note: 'Data processing, Streamlit, Scripts' },
      { name: 'SQL', core: true, note: 'Relational queries, Joins, Indices' },
      { name: 'Java', core: false, note: 'Object-oriented programming' },
      { name: 'C / C++', core: false, note: 'Systems & algorithmic foundation' },
      { name: 'C#', core: false, note: 'Desktop & software basics' },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend Development',
    icon: 'layout',
    skills: [
      { name: 'React', core: true, note: 'Hooks, Component Architecture, State' },
      { name: 'Next.js', core: true, note: 'SSR, SSG, Routing, Optimization' },
      { name: 'HTML5 & CSS3', core: true, note: 'Semantic markup, Flexbox, Grid' },
      { name: 'Framer Motion', core: true, note: 'Spring physics, Transitions, Micro-interactions' },
      { name: 'Responsive Web Design', core: true, note: 'Mobile-first, Glassmorphism, Tokens' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend & APIs',
    icon: 'server',
    skills: [
      { name: 'Node.js', core: true, note: 'Server runtimes, Event loop, Async I/O' },
      { name: 'Express', core: true, note: 'RESTful routing, Middleware, Auth' },
      { name: 'REST APIs', core: true, note: 'Endpoint design, JSON specs, Status codes' },
      { name: 'Prisma ORM', core: true, note: 'Schema modeling, Migrations, Type generation' },
    ],
  },
  {
    id: 'databases',
    label: 'Databases & Storage',
    icon: 'database',
    skills: [
      { name: 'PostgreSQL', core: true, note: 'Relational models, Constraints, Transactions' },
      { name: 'MySQL', core: true, note: 'Database queries, Normalization' },
      { name: 'MongoDB', core: false, note: 'Document schemas, Aggregations' },
    ],
  },
  {
    id: 'ai-ml',
    label: 'AI / ML & LLM Engineering',
    icon: 'cpu',
    skills: [
      { name: 'LLMs & Prompt Engineering', core: true, note: 'System prompts, Few-shot, Context' },
      { name: 'LangChain & LangGraph', core: true, note: 'Agentic workflows, Retrieval graphs' },
      { name: 'NLP & OCR Processing', core: true, note: 'Document parsing, Text extraction' },
      { name: 'OpenAI API', core: true, note: 'Structured completions, Embeddings' },
      { name: 'Streamlit', core: true, note: 'Rapid AI application dashboards' },
    ],
  },
  {
    id: 'tools-devops',
    label: 'Developer Tools & Deployment',
    icon: 'tool',
    skills: [
      { name: 'Git & GitHub', core: true, note: 'Branching, PRs, Version control' },
      { name: 'Postman', core: true, note: 'API contract testing, Mocking' },
      { name: 'Vercel & Render', core: true, note: 'Automated CI/CD, Production builds' },
      { name: 'Figma', core: true, note: 'UI wireframing, Prototyping, Design tokens' },
      { name: 'Adobe Photoshop', core: false, note: 'Asset manipulation, Visual layouts' },
    ],
  },
];
