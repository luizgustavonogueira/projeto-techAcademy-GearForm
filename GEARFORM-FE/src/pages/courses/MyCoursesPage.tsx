// src/pages/courses/MyCoursesPage.tsx
import { useState } from "react";
import type { Matricula } from "../../types";

/* ─── PALETTE (mesma do ExplorePage) ───────────────────────────────────── */
const C = {
  bg:      "#080a0f",
  surface: "#0d1117",
  card:    "#10141c",
  border:  "rgba(255,255,255,0.07)",
  accent:  "#00ffcc",
  pink:    "#ff3d6e",
  violet:  "#7b5ef8",
  text:    "#e8eaf0",
  muted:   "#5a6070",
};

/* ─── CURSOS MOCK (mesmos do ExplorePage) ───────────────────────────────── */
const CURSOS = [
  { id:1,  titulo:"Python do Zero ao Avançado",            categoria:"Programação",    nivel:"Iniciante",     carga:60,  preco:97.90,  cert:true, modulos:5, emoji:"🐍",
    descricao:"Aprenda Python desde a sintaxe básica até projetos com automação, web scraping e APIs REST." },
  { id:2,  titulo:"Dev Web com JavaScript e React",        categoria:"Programação",    nivel:"Intermediário", carga:80,  preco:127.90, cert:true, modulos:5, emoji:"⚛️",
    descricao:"Domine HTML, CSS, JavaScript moderno e construa interfaces com React e TypeScript." },
  { id:3,  titulo:"Node.js e APIs REST",                   categoria:"Programação",    nivel:"Intermediário", carga:50,  preco:97.90,  cert:true, modulos:5, emoji:"🟢",
    descricao:"Construa back-ends robustos com Node.js, Express, JWT e boas práticas de arquitetura." },
  { id:4,  titulo:"Banco de Dados SQL e MySQL",            categoria:"Programação",    nivel:"Iniciante",     carga:40,  preco:67.90,  cert:true, modulos:4, emoji:"🗄️",
    descricao:"Modelagem relacional, consultas avançadas, procedures e otimização de queries." },
  { id:5,  titulo:"Intro à Eletromecânica Industrial",     categoria:"Eletromecânica", nivel:"Iniciante",     carga:45,  preco:87.90,  cert:true, modulos:4, emoji:"⚙️",
    descricao:"Mecânica aplicada, acionamentos elétricos, motores e manutenção preventiva." },
  { id:6,  titulo:"Manutenção de Motores Elétricos",       categoria:"Eletromecânica", nivel:"Intermediário", carga:35,  preco:97.90,  cert:true, modulos:4, emoji:"🔧",
    descricao:"Diagnóstico, desmontagem, rebobinamento e manutenção de motores trifásicos." },
  { id:7,  titulo:"Automação Industrial com CLP",          categoria:"Eletromecânica", nivel:"Avançado",      carga:55,  preco:147.90, cert:true, modulos:5, emoji:"🏭",
    descricao:"Programação de CLPs Siemens, linguagem Ladder, SCADA e integração com sensores." },
  { id:8,  titulo:"Hidráulica e Pneumática",               categoria:"Eletromecânica", nivel:"Intermediário", carga:40,  preco:87.90,  cert:true, modulos:4, emoji:"💧",
    descricao:"Circuitos hidráulicos, válvulas, atuadores pneumáticos e dimensionamento." },
  { id:9,  titulo:"Eletrônica Básica",                     categoria:"Eletrônica",     nivel:"Iniciante",     carga:30,  preco:57.90,  cert:true, modulos:4, emoji:"⚡",
    descricao:"Componentes eletrônicos, lei de Ohm, circuitos RC e RL e uso do multímetro." },
  { id:10, titulo:"Arduino e IoT na Prática",              categoria:"Eletrônica",     nivel:"Iniciante",     carga:40,  preco:77.90,  cert:true, modulos:4, emoji:"🤖",
    descricao:"Programe o Arduino, sensores, relés e módulos WiFi para projetos IoT." },
  { id:11, titulo:"Eletrônica de Potência",                categoria:"Eletrônica",     nivel:"Avançado",      carga:50,  preco:127.90, cert:true, modulos:4, emoji:"🔋",
    descricao:"Retificadores, inversores, conversores DC-DC e projetos com IGBTs e MOSFETs." },
  { id:12, titulo:"Redes de Computadores — CCNA",          categoria:"Redes",          nivel:"Iniciante",     carga:60,  preco:107.90, cert:true, modulos:5, emoji:"🌐",
    descricao:"TCP/IP, roteamento, switching, VLANs, subnetting e configuração Cisco." },
  { id:13, titulo:"Cibersegurança e Ethical Hacking",      categoria:"Redes",          nivel:"Avançado",      carga:70,  preco:147.90, cert:true, modulos:5, emoji:"🛡️",
    descricao:"Pentest, análise de vulnerabilidades, Kali Linux e defesa de redes." },
  { id:14, titulo:"UI/UX Design com Figma",                categoria:"Design",         nivel:"Iniciante",     carga:35,  preco:77.90,  cert:true, modulos:4, emoji:"🎨",
    descricao:"Prototipagem, design de interfaces, sistemas de design e testes de usabilidade." },
  { id:15, titulo:"Gestão de Projetos com Scrum e Kanban", categoria:"Gestão",         nivel:"Iniciante",     carga:20,  preco:47.90,  cert:true, modulos:3, emoji:"📋",
    descricao:"Metodologias ágeis, sprints, cerimônias Scrum e ferramentas como Jira e Trello." },
];

const NIVEL_COLOR: Record<string, string> = {
  Iniciante: C.accent, Intermediário: "#f59e0b", Avançado: C.pink,
};

/* ─── COMPONENTES LOCAIS ─────────────────────────────────────────────────── */

function Tag({ children, color = C.accent }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{
      display:"inline-block", padding:"2px 8px",
      fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:"0.08em",
      color, border:`1px solid ${color}40`, background:`${color}12`,
      textTransform:"uppercase", lineHeight:1.8,
    }}>{children}</span>
  );
}

function ClipCard({ children, style = {}, onClick }: any) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov && onClick ? `${C.card}ee` : C.card,
        border: `1px solid ${hov && onClick ? C.accent+"40" : C.border}`,
        clipPath:"polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px))",
        transition:"border-color 0.2s, background 0.2s",
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    >{children}</div>
  );
}

function ProgressBar({ value, color = C.accent }: { value: number; color?: string }) {
  return (
    <div style={{height:3, background:"rgba(255,255,255,0.06)", position:"relative"}}>
      <div style={{
        height:"100%", width:`${value}%`, background:color, transition:"width 0.6s ease",
        boxShadow:`0 0 8px ${color}80`,
      }}/>
    </div>
  );
}

function NeonBtn({ children, onClick, disabled, small, variant = "primary" }: any) {
  const [hov, setHov] = useState(false);
  const color = variant === "danger" ? C.pink : variant === "ghost" ? "rgba(255,255,255,0.3)" : C.accent;
  return (
    <button
      onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: hov && !disabled ? color : "transparent",
        border:`1px solid ${disabled ? "rgba(255,255,255,0.1)" : color}`,
        color: hov && !disabled ? (variant==="primary"?C.bg:"#fff") : (disabled?"rgba(255,255,255,0.25)":color),
        padding: small ? "6px 14px" : "10px 22px",
        fontFamily:"'Space Mono',monospace", fontSize: small ? 10 : 12,
        letterSpacing:"0.1em", textTransform:"uppercase",
        cursor: disabled ? "not-allowed" : "pointer",
        transition:"all 0.18s",
        clipPath:"polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))",
        boxShadow: hov&&!disabled ? `0 0 16px ${color}40` : "none",
        display:"flex", alignItems:"center", gap:6,
      }}
    >{children}</button>
  );
}

/* ─── TRAIL PAGE (tela de módulos do curso) ─────────────────────────────── */
function TrailPage({ curso, mat, onUpdateMat, onBack }: any) {
  const modulos = Array.from({ length: curso.modulos }, (_, i) => ({
    idx: i,
    titulo: `Módulo ${i + 1}`,
  }));

  const toggleModulo = (idx: number) => {
    const feitos: number[] = mat.modulos_feitos || [];
    const novoFeitos = feitos.includes(idx)
      ? feitos.filter((f: number) => f !== idx)
      : [...feitos, idx];
    const progresso = Math.round((novoFeitos.length / curso.modulos) * 100);
    onUpdateMat({ ...mat, modulos_feitos: novoFeitos, progresso });
  };

  return (
    <div style={{ padding:28, animation:"gf-fadeup 0.35s ease", maxWidth:680 }}>
      {/* Cabeçalho */}
      <div style={{ marginBottom:24 }}>
        <button
          onClick={onBack}
          style={{
            background:"transparent", border:"none", color:C.muted,
            fontFamily:"'Space Mono',monospace", fontSize:10,
            letterSpacing:"0.15em", textTransform:"uppercase",
            cursor:"pointer", padding:0, marginBottom:14,
            display:"flex", alignItems:"center", gap:6,
          }}
        >
          ← VOLTAR
        </button>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8 }}>
          <span style={{ fontSize:32 }}>{curso.emoji}</span>
          <div>
            <p style={{ margin:"0 0 4px", fontFamily:"'Space Mono',monospace", fontSize:9,
              letterSpacing:"0.25em", color:"rgba(255,255,255,0.22)", textTransform:"uppercase" }}>
              // TRILHA DO CURSO
            </p>
            <h1 style={{ margin:0, fontFamily:"'Bebas Neue',cursive", fontSize:28,
              color:C.text, letterSpacing:"0.05em" }}>
              {curso.titulo}
            </h1>
          </div>
        </div>
        <div style={{ display:"flex", gap:8, marginBottom:16 }}>
          <Tag color={NIVEL_COLOR[curso.nivel]}>{curso.nivel}</Tag>
          <Tag color={C.muted}>{curso.carga}h</Tag>
          {mat.progresso === 100 && <Tag color={C.accent}>✓ Concluído</Tag>}
        </div>
        <ProgressBar value={mat.progresso} color={mat.progresso === 100 ? C.accent : C.violet} />
        <p style={{ margin:"6px 0 0", fontSize:10, fontFamily:"'Space Mono',monospace",
          color:C.muted, textTransform:"uppercase", letterSpacing:"0.08em" }}>
          {mat.progresso}% concluído · {(mat.modulos_feitos||[]).length}/{curso.modulos} módulos
        </p>
      </div>

      {/* Lista de módulos */}
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {modulos.map(({ idx, titulo }) => {
          const feito = (mat.modulos_feitos || []).includes(idx);
          return (
            <ClipCard key={idx} style={{ padding:"14px 18px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                <div
                  onClick={() => toggleModulo(idx)}
                  style={{
                    width:22, height:22, borderRadius:2, flexShrink:0,
                    border:`1px solid ${feito ? C.accent : "rgba(255,255,255,0.15)"}`,
                    background: feito ? `${C.accent}20` : "transparent",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    cursor:"pointer", transition:"all 0.2s",
                    color: C.accent, fontSize:12,
                  }}
                >
                  {feito && "✓"}
                </div>
                <div style={{ flex:1 }}>
                  <p style={{ margin:0, fontSize:13, fontWeight:600,
                    color: feito ? C.muted : C.text,
                    textDecoration: feito ? "line-through" : "none",
                    transition:"color 0.2s" }}>
                    {titulo}
                  </p>
                  <p style={{ margin:"2px 0 0", fontSize:10,
                    fontFamily:"'Space Mono',monospace", color:C.muted }}>
                    Módulo {idx + 1} de {curso.modulos}
                  </p>
                </div>
                {feito && (
                  <Tag color={C.accent}>✓ feito</Tag>
                )}
              </div>
            </ClipCard>
          );
        })}
      </div>
    </div>
  );
}

/* ─── MY COURSES PAGE ────────────────────────────────────────────────────── */
interface MyCoursesPageProps {
  matriculas: Matricula[];
  setMatriculas: React.Dispatch<React.SetStateAction<Matricula[]>>;
  activeCurso: number | null;
  setActiveCurso: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function MyCoursesPage({
  matriculas, setMatriculas, activeCurso, setActiveCurso,
}: MyCoursesPageProps) {
  const [trailCurso, setTrailCurso] = useState<typeof CURSOS[0] | null>(null);

  // Abre trilha se vier do Explorar
  if (activeCurso !== null && !trailCurso) {
    const c = CURSOS.find(x => x.id === activeCurso);
    if (c) {
      setTrailCurso(c);
      setActiveCurso(null);
    }
  }

  const updateMat = (newMat: Matricula) => {
    setMatriculas(prev => prev.map(m => m.cursoId === newMat.cursoId ? newMat : m));
  };

  if (trailCurso) {
    const mat = matriculas.find(m => m.cursoId === trailCurso.id)!;
    return (
      <TrailPage
        curso={trailCurso}
        mat={mat}
        onUpdateMat={updateMat}
        onBack={() => setTrailCurso(null)}
      />
    );
  }

  return (
    <div style={{ padding:28, animation:"gf-fadeup 0.35s ease" }}>
      <div style={{ marginBottom:24 }}>
        <p style={{ margin:"0 0 4px", fontFamily:"'Space Mono',monospace", fontSize:9,
          letterSpacing:"0.25em", color:"rgba(255,255,255,0.22)", textTransform:"uppercase" }}>
          // MINHA JORNADA
        </p>
        <h1 style={{ margin:0, fontFamily:"'Bebas Neue',cursive", fontSize:36,
          color:C.text, letterSpacing:"0.05em" }}>
          MEUS CURSOS
        </h1>
      </div>

      {matriculas.length === 0 ? (
        <div style={{ textAlign:"center", padding:"60px 0" }}>
          <div style={{ fontSize:48, marginBottom:16 }}>📭</div>
          <p style={{ color:C.muted, fontSize:14 }}>Você ainda não está matriculado em nenhum curso.</p>
          <p style={{ color:`${C.accent}80`, fontSize:13, fontFamily:"'Space Mono',monospace" }}>
            Vá para Explorar e encontre seu próximo aprendizado.
          </p>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))", gap:12, marginBottom:28 }}>
            {[
              { label:"Matrículas",   val: matriculas.length,                                                        color: C.accent  },
              { label:"Em andamento", val: matriculas.filter(m => m.status==="ativo" && m.progresso < 100).length,   color: C.violet  },
              { label:"Concluídos",   val: matriculas.filter(m => m.progresso === 100).length,                       color: "#f59e0b" },
            ].map(s => (
              <ClipCard key={s.label} style={{ padding:"14px 16px", textAlign:"center" }}>
                <p style={{ margin:"0 0 4px", fontFamily:"'Bebas Neue',cursive", fontSize:32,
                  color:s.color, letterSpacing:"0.05em", lineHeight:1 }}>{s.val}</p>
                <p style={{ margin:0, fontSize:10, color:C.muted, fontFamily:"'Space Mono',monospace",
                  textTransform:"uppercase", letterSpacing:"0.08em" }}>{s.label}</p>
              </ClipCard>
            ))}
          </div>

          {/* Lista de cursos */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:14 }}>
            {matriculas.map(mat => {
              const curso = CURSOS.find(c => c.id === mat.cursoId);
              if (!curso) return null;
              const done = mat.progresso === 100;
              return (
                <ClipCard key={mat.cursoId}
                  style={{ padding:18, display:"flex", flexDirection:"column", gap:12 }}
                  onClick={() => setTrailCurso(curso)}
                >
                  <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                    <span style={{ fontSize:24, lineHeight:1 }}>{curso.emoji}</span>
                    <div style={{ flex:1, minWidth:0 }}>
                      <h3 style={{ margin:"0 0 4px", fontSize:14, fontWeight:700, color:C.text,
                        overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                        {curso.titulo}
                      </h3>
                      <div style={{ display:"flex", gap:6 }}>
                        <Tag color={NIVEL_COLOR[curso.nivel]}>{curso.nivel}</Tag>
                        {done && <Tag color={C.accent}>✓ Concluído</Tag>}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5,
                      fontSize:10, fontFamily:"'Space Mono',monospace", color:C.muted }}>
                      <span>PROGRESSO</span>
                      <span style={{ color: done ? C.accent : C.violet }}>{mat.progresso}%</span>
                    </div>
                    <ProgressBar value={mat.progresso} color={done ? C.accent : C.violet} />
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontSize:11, color:C.muted, fontFamily:"'Space Mono',monospace" }}>
                      {(mat.modulos_feitos || []).length}/{curso.modulos} módulos
                    </span>
                    <span style={{ fontSize:11, color:C.accent, fontFamily:"'Space Mono',monospace" }}>
                      VER TRILHA →
                    </span>
                  </div>
                </ClipCard>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}