import { useState, useEffect, useRef } from "react";

function MyCoursesPage({ matriculas, setMatriculas, activeCurso, setActiveCurso }: any) {
  const [trailCurso, setTrailCurso] = useState<any>(null);
 
  useEffect(()=>{
    if (activeCurso) {
      const c = CURSOS.find(x=>x.id===activeCurso);
      if (c) { setTrailCurso(c); setActiveCurso(null); }
    }
  },[activeCurso]);
 
  const updateMat = (newMat: any) => {
    setMatriculas((prev:any)=>prev.map((m:any)=>m.cursoId===newMat.cursoId?newMat:m));
  };
 
  if (trailCurso) {
    const mat = matriculas.find((m:any)=>m.cursoId===trailCurso.id)!;
    return (
      <TrailPage
        curso={trailCurso} mat={mat}
        onUpdateMat={updateMat}
        onBack={()=>setTrailCurso(null)}
      />
    );
  }
 
  return (
    <div style={{padding:28,animation:"gf-fadeup 0.35s ease"}}>
      <div style={{marginBottom:24}}>
        <p style={{margin:"0 0 4px",fontFamily:"'Space Mono',monospace",fontSize:9,
          letterSpacing:"0.25em",color:"rgba(255,255,255,0.22)",textTransform:"uppercase"}}>
          // MINHA JORNADA
        </p>
        <h1 style={{margin:0,fontFamily:"'Bebas Neue',cursive",fontSize:36,
          color:C.text,letterSpacing:"0.05em"}}>
          MEUS CURSOS
        </h1>
      </div>
 
      {matriculas.length === 0 ? (
        <div style={{textAlign:"center",padding:"60px 0"}}>
          <div style={{fontSize:48,marginBottom:16}}>📭</div>
          <p style={{color:C.muted,fontSize:14}}>Você ainda não está matriculado em nenhum curso.</p>
          <p style={{color:`${C.accent}80`,fontSize:13,fontFamily:"'Space Mono',monospace"}}>
            Vá para Explorar e encontre seu próximo aprendizado.
          </p>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:12,marginBottom:28}}>
            {[
              { label:"Matrículas",  val: matriculas.length,                          color: C.accent },
              { label:"Em andamento",val: matriculas.filter((m:any)=>m.status==="ativo"&&m.progresso<100).length, color: C.violet },
              { label:"Concluídos",  val: matriculas.filter((m:any)=>m.progresso===100).length, color: "#f59e0b" },
            ].map(s=>(
              <ClipCard key={s.label} style={{padding:"14px 16px",textAlign:"center"}}>
                <p style={{margin:"0 0 4px",fontFamily:"'Bebas Neue',cursive",fontSize:32,
                  color:s.color,letterSpacing:"0.05em",lineHeight:1}}>{s.val}</p>
                <p style={{margin:0,fontSize:10,color:C.muted,fontFamily:"'Space Mono',monospace",
                  textTransform:"uppercase",letterSpacing:"0.08em"}}>{s.label}</p>
              </ClipCard>
            ))}
          </div>
 
          {/* Course list */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:14}}>
            {matriculas.map((mat:any)=>{
              const curso = CURSOS.find(c=>c.id===mat.cursoId)!;
              if (!curso) return null;
              const done = mat.progresso === 100;
              return (
                <ClipCard key={mat.cursoId} style={{padding:18,display:"flex",flexDirection:"column",gap:12}}
                  onClick={()=>setTrailCurso(curso)}>
                  <div style={{display:"flex",gap:12,alignItems:"center"}}>
                    <span style={{fontSize:24,lineHeight:1}}>{curso.emoji}</span>
                    <div style={{flex:1,minWidth:0}}>
                      <h3 style={{margin:"0 0 4px",fontSize:14,fontWeight:700,color:C.text,
                        overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{curso.titulo}</h3>
                      <div style={{display:"flex",gap:6}}>
                        <Tag color={NIVEL_COLOR[curso.nivel]}>{curso.nivel}</Tag>
                        {done&&<Tag color={C.accent}>✓ Concluído</Tag>}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:5,
                      fontSize:10,fontFamily:"'Space Mono',monospace",color:C.muted}}>
                      <span>PROGRESSO</span>
                      <span style={{color:done?C.accent:C.violet}}>{mat.progresso}%</span>
                    </div>
                    <ProgressBar value={mat.progresso} color={done?C.accent:C.violet}/>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontSize:11,color:C.muted,fontFamily:"'Space Mono',monospace"}}>
                      {(mat.modulos_feitos||[]).length}/{curso.modulos} módulos
                    </span>
                    <span style={{fontSize:11,color:C.accent,fontFamily:"'Space Mono',monospace"}}>
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