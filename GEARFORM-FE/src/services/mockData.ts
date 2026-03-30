import type { User, Curso, Modulo, Matricula } from '../types';

/* ================================================================
   USERS
================================================================ */
export const mockUsers: User[] = [
  { id: 1, nome: 'Administrador GearForm', email: 'admin@gearform.com',  cpf: '000.000.000-00' },
  { id: 2, nome: 'João Desenvolvedor',     email: 'joao@email.com',      cpf: '111.111.111-11' },
  { id: 3, nome: 'Maria Técnica',          email: 'maria@email.com',     cpf: '222.222.222-22' },
];

/* ================================================================
   CURSOS  (mirror do banco de dados fornecido)
================================================================ */
export const mockCursos: Curso[] = [
  {
    id: 1, titulo: 'Python do Zero ao Avançado',
    descricao: 'Aprenda Python desde a sintaxe básica até projetos completos com automação, web scraping e APIs REST.',
    categoria: 'Programação', nivel: 'Iniciante', carga_horaria: 60, preco: 97.90, certificado: true, ativo: true,
  },
  {
    id: 2, titulo: 'Desenvolvimento Web com JavaScript e React',
    descricao: 'Domine HTML, CSS, JavaScript moderno e construa interfaces profissionais com React e TypeScript.',
    categoria: 'Programação', nivel: 'Intermediário', carga_horaria: 80, preco: 127.90, certificado: true, ativo: true,
  },
  {
    id: 3, titulo: 'Node.js e APIs REST',
    descricao: 'Construa back-ends robustos com Node.js, Express, JWT, banco de dados SQL e boas práticas.',
    categoria: 'Programação', nivel: 'Intermediário', carga_horaria: 50, preco: 97.90, certificado: true, ativo: true,
  },
  {
    id: 4, titulo: 'Banco de Dados SQL e MySQL',
    descricao: 'Fundamentos de modelagem relacional, consultas avançadas, procedures e otimização de queries.',
    categoria: 'Programação', nivel: 'Iniciante', carga_horaria: 40, preco: 67.90, certificado: true, ativo: true,
  },
  {
    id: 5, titulo: 'Introdução à Eletromecânica Industrial',
    descricao: 'Princípios de mecânica aplicada, acionamentos elétricos, motores e manutenção preventiva.',
    categoria: 'Eletromecânica', nivel: 'Iniciante', carga_horaria: 45, preco: 87.90, certificado: true, ativo: true,
  },
  {
    id: 6, titulo: 'Manutenção de Motores Elétricos',
    descricao: 'Diagnóstico, desmontagem, rebobinamento e manutenção de motores trifásicos e monofásicos.',
    categoria: 'Eletromecânica', nivel: 'Intermediário', carga_horaria: 35, preco: 97.90, certificado: true, ativo: true,
  },
  {
    id: 7, titulo: 'Automação Industrial com CLP',
    descricao: 'Programação de CLPs Siemens e Allen-Bradley, linguagem Ladder, SCADA e integração com sensores.',
    categoria: 'Eletromecânica', nivel: 'Avançado', carga_horaria: 55, preco: 147.90, certificado: true, ativo: true,
  },
  {
    id: 8, titulo: 'Hidráulica e Pneumática',
    descricao: 'Circuitos hidráulicos, válvulas, atuadores pneumáticos e dimensionamento de sistemas industriais.',
    categoria: 'Eletromecânica', nivel: 'Intermediário', carga_horaria: 40, preco: 87.90, certificado: true, ativo: true,
  },
  {
    id: 9, titulo: 'Eletrônica Básica',
    descricao: 'Componentes eletrônicos, lei de Ohm, circuitos RC e RL, análise de circuitos e uso do multímetro.',
    categoria: 'Eletrônica', nivel: 'Iniciante', carga_horaria: 30, preco: 57.90, certificado: true, ativo: true,
  },
  {
    id: 10, titulo: 'Arduino e IoT na Prática',
    descricao: 'Programe o Arduino, conecte sensores, relés e módulos WiFi para criar projetos de Internet das Coisas.',
    categoria: 'Eletrônica', nivel: 'Iniciante', carga_horaria: 40, preco: 77.90, certificado: true, ativo: true,
  },
  {
    id: 11, titulo: 'Eletrônica de Potência',
    descricao: 'Retificadores, inversores, conversores DC-DC, drives de frequência e projetos com IGBTs e MOSFETs.',
    categoria: 'Eletrônica', nivel: 'Avançado', carga_horaria: 50, preco: 127.90, certificado: true, ativo: true,
  },
  {
    id: 12, titulo: 'Redes de Computadores — CCNA',
    descricao: 'Fundamentos TCP/IP, roteamento, switching, VLANs, subnetting e configuração de equipamentos Cisco.',
    categoria: 'Redes', nivel: 'Iniciante', carga_horaria: 60, preco: 107.90, certificado: true, ativo: true,
  },
  {
    id: 13, titulo: 'Cibersegurança e Ethical Hacking',
    descricao: 'Pentest, análise de vulnerabilidades, Kali Linux, engenharia reversa e fundamentos de defesa de redes.',
    categoria: 'Redes', nivel: 'Avançado', carga_horaria: 70, preco: 147.90, certificado: true, ativo: true,
  },
  {
    id: 14, titulo: 'UI/UX Design com Figma',
    descricao: 'Prototipagem, design de interfaces, sistemas de design, acessibilidade e testes de usabilidade.',
    categoria: 'Design', nivel: 'Iniciante', carga_horaria: 35, preco: 77.90, certificado: true, ativo: true,
  },
  {
    id: 15, titulo: 'Gestão de Projetos com Scrum e Kanban',
    descricao: 'Metodologias ágeis, sprints, cerimônias Scrum, quadros Kanban e ferramentas como Jira e Trello.',
    categoria: 'Gestão', nivel: 'Iniciante', carga_horaria: 20, preco: 47.90, certificado: true, ativo: true,
  },
];

/* ================================================================
   MÓDULOS  (apenas os que têm dados no banco; os demais são gerados dinamicamente)
================================================================ */
export const mockModulos: Modulo[] = [
  // Python (curso 1)
  { id:1,  titulo:'Ambiente de desenvolvimento e sintaxe básica',       ordem:1, cursoId:1 },
  { id:2,  titulo:'Estruturas de dados: listas, dicionários e tuplas',  ordem:2, cursoId:1 },
  { id:3,  titulo:'Funções, módulos e orientação a objetos',            ordem:3, cursoId:1 },
  { id:4,  titulo:'Arquivos, exceções e bibliotecas essenciais',        ordem:4, cursoId:1 },
  { id:5,  titulo:'Projeto final: automação e API com Python',          ordem:5, cursoId:1 },

  // React (curso 2)
  { id:6,  titulo:'HTML5 e CSS3 moderno',                               ordem:1, cursoId:2 },
  { id:7,  titulo:'JavaScript ES6+: funções, promises e async/await',   ordem:2, cursoId:2 },
  { id:8,  titulo:'React: componentes, props e estado',                 ordem:3, cursoId:2 },
  { id:9,  titulo:'Hooks, Context API e React Router',                  ordem:4, cursoId:2 },
  { id:10, titulo:'TypeScript com React e projeto final',               ordem:5, cursoId:2 },

  // Node.js (curso 3)
  { id:11, titulo:'Fundamentos do Node.js e npm',                       ordem:1, cursoId:3 },
  { id:12, titulo:'Express: rotas, middlewares e controllers',          ordem:2, cursoId:3 },
  { id:13, titulo:'Autenticação JWT e bcrypt',                          ordem:3, cursoId:3 },
  { id:14, titulo:'Sequelize ORM e banco de dados',                     ordem:4, cursoId:3 },
  { id:15, titulo:'Deploy e boas práticas de API REST',                 ordem:5, cursoId:3 },

  // Eletromecânica (curso 5)
  { id:16, titulo:'Fundamentos de mecânica e eletricidade',             ordem:1, cursoId:5 },
  { id:17, titulo:'Motores elétricos e acionamentos',                   ordem:2, cursoId:5 },
  { id:18, titulo:'Transmissões mecânicas: correias e engrenagens',     ordem:3, cursoId:5 },
  { id:19, titulo:'Manutenção preventiva e corretiva',                  ordem:4, cursoId:5 },

  // Arduino (curso 10)
  { id:20, titulo:'Introdução ao Arduino e eletrônica básica',          ordem:1, cursoId:10 },
  { id:21, titulo:'Sensores: temperatura, umidade e presença',          ordem:2, cursoId:10 },
  { id:22, titulo:'Atuadores: relés, servos e motores',                 ordem:3, cursoId:10 },
  { id:23, titulo:'Comunicação WiFi e projeto IoT completo',            ordem:4, cursoId:10 },
];

/* ================================================================
   MATRÍCULAS de exemplo
================================================================ */
export const mockMatriculas: Matricula[] = [
  { userId:2, cursoId:1,  status:'ativo',     progresso:65.00, modulos_feitos:[0,1,2] },
  { userId:2, cursoId:3,  status:'ativo',     progresso:20.00, modulos_feitos:[0]     },
  { userId:3, cursoId:5,  status:'ativo',     progresso:40.00, modulos_feitos:[0,1]   },
  { userId:3, cursoId:9,  status:'concluido', progresso:100.00,modulos_feitos:[0,1,2,3]},
  { userId:1, cursoId:2,  status:'ativo',     progresso:10.00, modulos_feitos:[0]     },
];