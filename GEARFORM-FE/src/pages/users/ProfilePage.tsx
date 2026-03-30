function ProfilePage({ user, onUpdateUser }: any) {
  const [nome,    setNome]    = useState(user.nome);
  const [oldPwd,  setOldPwd]  = useState("");
  const [newPwd,  setNewPwd]  = useState("");
  const [confPwd, setConfPwd] = useState("");
  const [errors,  setErrors]  = useState<any>({});
  const [saved,   setSaved]   = useState(false);
  const [preview, setPreview] = useState<string>(user.avatar||"");
 
  const fileRef = useRef<HTMLInputElement>(null);
 
  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2*1024*1024) { alert("Foto máxima: 2 MB"); return; }
    const reader = new FileReader();
    reader.onload = ev => setPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };
 
  const validate = () => {
    const e: any = {};
    if (!nome.trim())          e.nome = "Nome é obrigatório";
    else if (nome.trim()<3)    e.nome = "Mínimo 3 caracteres";
    if (newPwd) {
      if (!oldPwd)             e.oldPwd = "Informe a senha atual";
      if (newPwd.length < 8)   e.newPwd = "Mínimo 8 caracteres";
      if (newPwd !== confPwd)  e.confPwd = "Senhas não coincidem";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };
 
  const save = () => {
    if (!validate()) return;
    onUpdateUser({ ...user, nome: nome.trim(), avatar: preview });
    setSaved(true);
    setOldPwd(""); setNewPwd(""); setConfPwd("");
    setTimeout(()=>setSaved(false), 2500);
  };
 
  /* Força de senha */
  const pwdScore = newPwd ? [newPwd.length>=8,/[A-Z]/.test(newPwd),/[0-9]/.test(newPwd),/[^A-Za-z0-9]/.test(newPwd)].filter(Boolean).length : 0;
  const pwdColors = ["","#ff3d6e","#f59e0b",C.violet,C.accent];
  const pwdLabels = ["","Fraca","Média","Boa","Forte"];
 
  return (
    <div style={{padding:28,animation:"gf-fadeup 0.35s ease",maxWidth:600}}>
      <div style={{marginBottom:28}}>
        <p style={{margin:"0 0 4px",fontFamily:"'Space Mono',monospace",fontSize:9,
          letterSpacing:"0.25em",color:"rgba(255,255,255,0.22)",textTransform:"uppercase"}}>
          // CONFIGURAÇÕES
        </p>
        <h1 style={{margin:0,fontFamily:"'Bebas Neue',cursive",fontSize:36,
          color:C.text,letterSpacing:"0.05em"}}>
          MEU PERFIL
        </h1>
      </div>
 
      {/* Avatar */}
      <ClipCard style={{padding:20,marginBottom:20}}>
        <p style={{margin:"0 0 14px",fontFamily:"'Space Mono',monospace",fontSize:9,
          letterSpacing:"0.2em",color:C.muted,textTransform:"uppercase"}}>
          FOTO DE PERFIL
        </p>
        <div style={{display:"flex",alignItems:"center",gap:20}}>
          <div
            onClick={()=>fileRef.current?.click()}
            style={{
              width:72,height:72,borderRadius:"50%",flexShrink:0,cursor:"pointer",
              border:`2px solid ${C.accent}40`,overflow:"hidden",position:"relative",
              background:`linear-gradient(135deg,${C.violet},${C.accent})`,
              display:"flex",alignItems:"center",justifyContent:"center",
            }}
          >
            {preview
              ? <img src={preview} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              : <span style={{fontFamily:"'Bebas Neue',cursive",fontSize:28,color:"#fff"}}>
                  {user.nome[0].toUpperCase()}
                </span>
            }
            <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.45)",
              display:"flex",alignItems:"center",justifyContent:"center",
              opacity:0,transition:"opacity 0.2s",fontSize:18}}
              onMouseEnter={e=>(e.currentTarget.style.opacity="1")}
              onMouseLeave={e=>(e.currentTarget.style.opacity="0")}
            >📷</div>
          </div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatar} style={{display:"none"}}/>
          <div>
            <NeonBtn small onClick={()=>fileRef.current?.click()}>ALTERAR FOTO</NeonBtn>
            <p style={{margin:"6px 0 0",fontSize:11,color:C.muted,fontFamily:"'Space Mono',monospace"}}>
              JPG, PNG • Máx. 2 MB
            </p>
          </div>
        </div>
      </ClipCard>
 
      {/* Info */}
      <ClipCard style={{padding:20,marginBottom:20,display:"flex",flexDirection:"column",gap:16}}>
        <p style={{margin:0,fontFamily:"'Space Mono',monospace",fontSize:9,
          letterSpacing:"0.2em",color:C.muted,textTransform:"uppercase"}}>
          INFORMAÇÕES PESSOAIS
        </p>
        <NeonInput label="Nome Completo" value={nome}
          onChange={(e:any)=>setNome(e.target.value)} error={errors.nome}/>
        <NeonInput label="E-mail (não editável)" value={user.email} disabled
          hint="O e-mail não pode ser alterado pelo usuário."/>
        <NeonInput label="CPF" value={user.cpf} disabled
          hint="Para alterar o CPF, entre em contato com o suporte."/>
      </ClipCard>
 
      {/* Password */}
      <ClipCard style={{padding:20,marginBottom:24,display:"flex",flexDirection:"column",gap:16}}>
        <p style={{margin:0,fontFamily:"'Space Mono',monospace",fontSize:9,
          letterSpacing:"0.2em",color:C.muted,textTransform:"uppercase"}}>
          ALTERAR SENHA
        </p>
        <NeonInput label="Senha Atual" type="password" value={oldPwd}
          onChange={(e:any)=>setOldPwd(e.target.value)} error={errors.oldPwd}/>
        <NeonInput label="Nova Senha" type="password" value={newPwd}
          onChange={(e:any)=>setNewPwd(e.target.value)} error={errors.newPwd}
          hint="Mínimo 8 caracteres, letra maiúscula e número"/>
        {newPwd && (
          <div>
            <div style={{display:"flex",gap:4,marginBottom:4}}>
              {[1,2,3,4].map(i=>(
                <div key={i} style={{flex:1,height:2,
                  background:i<=pwdScore?pwdColors[pwdScore]:"rgba(255,255,255,0.08)",transition:"background 0.3s"}}/>
              ))}
            </div>
            <p style={{margin:0,fontSize:10,fontFamily:"'Space Mono',monospace",
              color:pwdColors[pwdScore]||C.muted,textTransform:"uppercase",letterSpacing:"0.08em"}}>
              Força: {pwdLabels[pwdScore]}
            </p>
          </div>
        )}
        <NeonInput label="Confirmar Nova Senha" type="password" value={confPwd}
          onChange={(e:any)=>setConfPwd(e.target.value)} error={errors.confPwd}/>
      </ClipCard>
 
      <div style={{display:"flex",alignItems:"center",gap:16}}>
        <NeonBtn onClick={save}>SALVAR ALTERAÇÕES</NeonBtn>
        {saved && (
          <span style={{fontFamily:"'Space Mono',monospace",fontSize:11,
            color:C.accent,letterSpacing:"0.08em",animation:"gf-fadeup 0.3s ease"}}>
            ✓ SALVO COM SUCESSO
          </span>
        )}
      </div>
    </div>
  );
}
 
/* ─── MAIN APP ───────────────────────────────────────────────────────────── */
export default function App() {
  const [view,        setView]        = useState("explore");
  const [collapsed,   setCollapsed]   = useState(false);
  const [activeCurso, setActiveCurso] = useState<number|null>(null);
  const [user, setUser] = useState({
    id:2, nome:"João Desenvolvedor", email:"joao@email.com",
    cpf:"111.111.111-11", avatar:"",
  });
  const [matriculas, setMatriculas] = useState([
    { cursoId:1, progresso:65, status:"ativo",     modulos_feitos:[0,1,2] },
    { cursoId:3, progresso:20, status:"ativo",     modulos_feitos:[0]     },
  ]);
 
  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <div style={{display:"flex",height:"100vh",overflow:"hidden",background:C.bg}}>
        <Sidebar
          view={view} setView={setView}
          user={user} collapsed={collapsed} setCollapsed={setCollapsed}
        />
 
        {/* Main content */}
        <main style={{
          flex:1,overflowY:"auto",
          background:`radial-gradient(ellipse 80% 50% at 20% 0%,${C.violet}07 0%,transparent 60%)`,
        }}>
          {/* Top bar */}
          <div style={{
            position:"sticky",top:0,zIndex:100,
            background:`${C.surface}e0`,backdropFilter:"blur(12px)",
            borderBottom:`1px solid ${C.border}`,
            padding:"0 28px",height:50,
            display:"flex",alignItems:"center",justifyContent:"space-between",
          }}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:6,height:6,borderRadius:"50%",background:C.accent,
                animation:"gf-pulse 2s ease-in-out infinite",boxShadow:`0 0 8px ${C.accent}`}}/>
              <span style={{fontFamily:"'Space Mono',monospace",fontSize:9,
                letterSpacing:"0.2em",color:`${C.accent}80`,textTransform:"uppercase"}}>
                SISTEMA ONLINE
              </span>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <span style={{fontSize:11,color:C.muted,fontFamily:"'Space Mono',monospace"}}>
                {matriculas.length} curso{matriculas.length!==1?"s":""} matriculado{matriculas.length!==1?"s":""}
              </span>
              <div
                onClick={()=>setView("profile")}
                style={{
                  width:28,height:28,borderRadius:"50%",cursor:"pointer",
                  background:`linear-gradient(135deg,${C.violet},${C.accent})`,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:12,fontWeight:700,color:"#fff",overflow:"hidden",
                  border:`1px solid ${C.accent}40`,
                }}
              >
                {user.avatar
                  ? <img src={user.avatar} alt="" style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:"50%"}}/>
                  : user.nome[0].toUpperCase()
                }
              </div>
            </div>
          </div>
 
          {/* Pages */}
          {view === "explore" && (
            <ExplorePage
              matriculas={matriculas} setMatriculas={setMatriculas}
              setView={setView} setActiveCurso={setActiveCurso}
            />
          )}
          {view === "myCourses" && (
            <MyCoursesPage
              matriculas={matriculas} setMatriculas={setMatriculas}
              activeCurso={activeCurso} setActiveCurso={setActiveCurso}
            />
          )}
          {view === "profile" && (
            <ProfilePage user={user} onUpdateUser={setUser}/>
          )}
        </main>
      </div>
    </>
  );
}
 