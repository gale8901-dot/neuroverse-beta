/**
 * NEUROVERSE RC1 learning suite.
 * Uses the user's original brain/pathway GLBs and existing application functions.
 * Note: medical content remains a reviewed-source-aligned draft, NOT faculty certified.
 */
const ESC = v => String(v ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const URLS = Object.freeze({
  fipat:'https://ifaa.net/committees/anatomical-terminology-fipat/fipat-ifaa-terminologies/',
  motor:'https://www.ncbi.nlm.nih.gov/books/NBK541082/',
  pyramidal:'https://www.ncbi.nlm.nih.gov/books/NBK545314/',
  plexus:'https://www.ncbi.nlm.nih.gov/books/NBK500016/',
  upperLimb:'https://www.ncbi.nlm.nih.gov/books/NBK526056/'
});
const EXTRA = {
  roots_vs_rami:{en:'Spinal nerve roots / Ventral rami',new:'척수신경뿌리와 앞가지',old:'척수신경근과 전지',easy:'척수에서 처음 나온 신경의 시작 부분을 뿌리라고 해요. 신경이 합쳐진 뒤에는 다시 가지가 나와요. 팔신경얼기의 ‘뿌리’는 척수에서 바로 나온 뿌리 그 자체가 아니라, 앞가지라고 부르는 부분이에요.',expert:'척수신경의 앞뿌리·뒤뿌리는 운동·감각 섬유가 합쳐지기 전의 구조다. 척수신경 형성 후 앞가지(ventral ramus)가 분지하며, 팔신경얼기의 roots는 통상 C5–T1 척수신경 앞가지를 가리킨다. 신경얼기 뿌리와 척수신경근을 동의어로 취급하면 해부학적 오류다.',related:['brainstem'],source:URLS.plexus},
  prime_mover:{en:'Agonist / Prime mover',new:'주동근',old:'주동근',easy:'어떤 움직임을 만들 때 중심이 되어 힘을 보태는 근육이에요. 예를 들어 팔꿈치를 굽힐 때 위팔근이 큰 역할을 해요.',expert:'정해진 관절 운동·부하·시점에서 순관절토크를 발생시키는 데 주요하게 기여하는 근육이다. 참여 근육의 상대적 중요성은 관절각, 근길이, 부하, 속도 및 운동 과제에 따라 바뀐다.',related:['synergist','antagonist'],source:URLS.upperLimb},
  synergist:{en:'Synergist',new:'협력근',old:'협동근',easy:'주동근을 옆에서 도와 같은 움직임이 잘 일어나게 하는 근육이에요.',expert:'목표 운동을 보조하거나 불필요한 동작을 상쇄하여 운동 과제 수행을 돕는 근육이다. 주동근·협력근의 구분은 동작과 조건에 따라 달라지므로 고정적인 서열이 아니다.',related:['prime_mover','antagonist'],source:URLS.upperLimb},
  antagonist:{en:'Antagonist',new:'길항근',old:'길항근',easy:'움직임이 너무 빨리 되거나 지나치지 않도록 반대 방향에서 조절을 도울 수 있는 근육이에요.',expert:'주동작과 반대 방향의 관절토크를 발생시키는 근육이다. 길항근의 활성은 공동수축을 통한 안정성, 감속과 세밀한 조절에 기여할 수 있다. 길항근이 해당 운동에서 반드시 완전히 비활성화되는 것은 아니다.',related:['prime_mover','synergist'],source:URLS.upperLimb},

  umn:{en:'Upper motor neuron / UMN syndrome',new:'위운동신경세포 및 위운동신경세포 징후',old:'상위운동신경원 및 상위운동신경원 징후',easy:'뇌에서 척수로 움직이라는 명령을 전달하는 윗부분의 신경세포들이 있어요. 이 길이 다치면 팔이나 다리에 힘이 빠질 수 있고, 시간이 지나면 팔다리가 뻣뻣해지거나 반사가 지나치게 강해질 수도 있어요. 다친 직후에는 반드시 뻣뻣한 것은 아니에요.',expert:'위운동신경세포(UMN)는 대뇌겉질과 뇌줄기의 운동 하행계에서 척수·뇌신경 운동회로를 조절하는 신경세포다. UMN 병변은 수의운동 약화, 심부건반사 항진, 경직, 간대성 경련, 병적 반사 등과 관련되지만 급성기에는 이완성과 저반사가 나타날 수 있다. 증상은 병변의 위치·범위·경과에 따라 달라진다.',related:['cst','decussation','spinal_cord'],source:URLS.motor},
  spinal_cord:{en:'Spinal cord',new:'척수',old:'척수',easy:'등뼈 안에 들어 있는 신경 줄기예요. 뇌에서 온 움직임 명령을 몸으로 보내고, 피부와 근육에서 온 느낌을 뇌로 올려 보내요. 어떤 빠른 반사 반응은 척수에서 먼저 처리돼요.',expert:'척수는 척주관 내의 중추신경계 구조로 상행감각로, 하행운동로, 회백질의 감각·운동·자율신경회로를 포함한다. 분절별 척수신경과 연결되고 반사작용에도 관여한다.',related:['brainstem','cst','roots_vs_rami'],source:URLS.motor},
  midbrain:{en:'Midbrain',new:'중간뇌',old:'중뇌',easy:'뇌줄기의 가장 위쪽 부분이에요. 눈을 움직이고 몸을 조절하는 데 중요한 신경들이 지나가요.',expert:'중간뇌는 뇌줄기의 위쪽 구성요소로 대뇌다리, 중간뇌덮개, 흑색질, 적색핵, 위·아래둔덕 등과 관련하며 눈운동·운동조절 및 시각·청각 반사 회로에 기여한다.',related:['brainstem','pons','medulla'],source:URLS.motor},
  pons:{en:'Pons',new:'다리뇌',old:'교뇌',easy:'뇌줄기 가운데 있는 부분이에요. 뇌의 여러 곳이 소식을 주고받게 돕고, 숨을 조절하는 데도 힘을 보태요.',expert:'다리뇌는 중간뇌와 숨뇌 사이의 뇌줄기 부분으로 피질다리뇌소뇌 연결, 여러 뇌신경핵 및 호흡조절 관련 회로를 포함한다.',related:['brainstem','midbrain','medulla'],source:URLS.motor},
  muscle_activation:{en:'Muscle activation / Electromyography',new:'근육 활성과 근전도',old:'근육 활성과 근전도',easy:'움직일 때 근육이 얼마나 일을 하는지 알아볼 수 있어요. 실제 몸에서는 근육의 전기 신호를 검사하기도 해요. 이 프로그램의 근육 색깔은 역할을 알려 주는 그림이지, 실제 사람에게서 잰 숫자가 아니에요.',expert:'근육 활성은 운동단위 동원·발화 등 신경근 조절과 관련된다. 표면근전도(sEMG)는 근육 전기활동을 간접적으로 측정하며 크기가 근력·힘 또는 근장력과 일대일 대응하는 것은 아니다. 본 프로그램의 색상과 관절각 애니메이션은 실제 EMG 측정이나 근골격 동역학 계산 결과가 아니다.',related:['prime_mover','synergist','antagonist','nerve_signal'],source:'https://www.ncbi.nlm.nih.gov/books/NBK519538/'},
  nerve_signal:{en:'Action potential / Nerve conduction',new:'활동전위와 신경전도',old:'활동전위와 신경전도',easy:'신경세포는 전기 신호를 만들고 길을 따라 전해요. 그 신호가 다음 세포나 근육까지 정보를 전할 수 있어요.',expert:'활동전위는 전압개폐성 이온통로에 의해 막전위가 빠르게 변화하는 재생적 전기신호다. 신경섬유의 수초 유무와 직경 등에 따라 전도 속도가 달라진다. 본 3D에서 움직이는 입자는 신호의 개념적 애니메이션이며 실제 속도가 아니다.',related:['cst','roots_vs_rami'],source:URLS.motor}
};
const LIST = [
  ['anatomy','뇌 구조 이해','실제 3D 뇌 모델을 회전하면서 주요 구조 12개를 선택하고 용어 3가지를 비교해요.'],
  ['pathways','신경로 따라가기','피질척수로·시각·감각 등 7종 경로를 3D 선과 애니메이션으로 살펴봐요.'],
  ['biomech','움직임·근육 역할','관절 운동 {mv}종, 근육 {mu}개의 주동근·협력근·길항근·안정근 관계를 공부해요.','movement'],
  ['biomech','신경얼기 뿌리부터 가지까지','C5–T1부터 말단신경까지 2D 구조와 3D 개념선을 함께 봐요.','plexus'],
  ['clinical','임상적 연결','뇌혈관 영역 3종의 전형적인 증상을 비교해요. 실제 환자 진단용은 아니에요.'],
  ['quiz','퀴즈로 확인','{q}문항을 분야별로 풀고, 약한 분야를 로드맵에서 다시 확인해요. 오답 노트는 이 브라우저에만 저장돼요.']
];
const readStore=(k,def)=>{try{const x=JSON.parse(localStorage.getItem(k));return x??def}catch{return def}};
const writeStore=(k,val)=>{try{localStorage.setItem(k,JSON.stringify(val));return true}catch{return false}};
const shuffle=items=>{const b=[...items];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b};

export async function setupAcademy({MED,openConcept,selectPath,pathwayData,PATH_LEARNING,focus,names}) {
  const nav=document.querySelector('nav.tabs');const scroll=document.querySelector('.scroll');
  if(!nav||!scroll)return;
  // The host's existing tab switcher has already registered its handlers.
  // Attach new tab buttons that follow exactly the same page flow, plus specialist content.
  for(const [id,label] of [['academy','학습 로드맵'],['glossary','의학용어 사전'],['quiz','퀴즈']]) {
    if(document.querySelector(`[data-tab="${id}"]`))continue;
    const b=document.createElement('button');b.type='button';b.dataset.tab=id;b.textContent=label;
    b.addEventListener('click',()=>{
      document.querySelectorAll('nav.tabs button').forEach(x=>x.classList.toggle('active',x===b));
      for(const sec of scroll.querySelectorAll(':scope > section'))sec.classList.toggle('hidden',sec.id!==id);
      const title=document.getElementById('view-title');if(title)title.textContent={'academy':'전공별 학습 로드맵','glossary':'의학용어 사전 · 한국어 2종 + 영어','quiz':'증상·해부학·물리치료 문제은행'}[id];
      if(id==='academy')renderAcademy();if(id==='glossary')renderGlossary();if(id==='quiz')renderQuiz();
    });
    nav.append(b);
  }
  // Original host buttons retain their existing event handlers; additionally hide new pages.
  for(const b of nav.querySelectorAll('button:not([data-tab="academy"]):not([data-tab="glossary"]):not([data-tab="quiz"])')) {
    b.addEventListener('click',()=>{for(const id of ['academy','glossary','quiz'])document.getElementById(id)?.classList.add('hidden')});
  }
  const sections=Object.fromEntries(['academy','glossary','quiz'].map(id=>{
    const el=document.createElement('section');el.id=id;el.className='hidden';scroll.append(el);return [id,el]
  }));
  let muscles={},movements=[],nerves={},questions=[];const gen=[];
  let dataError='';
  try{
    const [b,q]=await Promise.all([fetch('./data/biomechanics.json').then(r=>{if(!r.ok)throw Error('biomechanics '+r.status);return r.json()}),fetch('./data/quiz.json').then(r=>{if(!r.ok)throw Error('quiz '+r.status);return r.json()})]);
    muscles=b.muscles;movements=b.movements;nerves=b.nerves;questions=q;
    // Movement questions come from the app's own movement data, so quiz and 움직임 tab never disagree.
    const mids=Object.keys(muscles);const LOWER=new Set(['hip','knee','ankle']);
    movements.forEach((mv,mi)=>{for(const [kind,key,label] of [['p','prime','주동근'],['a','antagonist','길항근']]){
      const list=(mv[key]||[]).filter(id=>muscles[id]);if(!list.length)continue;
      const used=new Set([...(mv.prime||[]),...(mv.synergist||[]),...(mv.antagonist||[]),...(mv.stabilizer||[])]);
      const rest=mids.filter(id=>!used.has(id));
      // Prefer muscles of other movements in the same limb so distractors are plausible, then fill from the rest.
      const near=[...new Set(movements.filter(o=>o!==mv&&LOWER.has(o.joint)===LOWER.has(mv.joint)).flatMap(o=>[...(o.prime||[]),...(o.synergist||[]),...(o.antagonist||[])]))].filter(id=>muscles[id]&&!used.has(id));
      const pick=a=>[0,1,2,3,4,5].map(i=>a[(mi*5+i*7+(kind==='a'?3:0))%a.length]);
      const d=[...new Set([...(near.length?pick(near):[]),...pick(rest)])].slice(0,3);
      if(d.length<3)continue;
      gen.push({id:1000+mi*2+(kind==='a'?1:0),level:'물리치료',topic:'움직임 · '+label,q:`‘${mv.new}’ 동작의 ${label}으로 이 앱에 표시된 근육은?`,opts:[list[0],...d].map(id=>muscles[id].new),ans:0,why:`${mv.new}의 ${label}: ${list.map(id=>muscles[id].new).join(', ')}\n출처: 이 앱의 움직임 데이터(교수 검수 전 · 시험 전 교재와 대조하세요)\n🧒 쉬운 설명: 움직임 탭에서 ‘${mv.new}’을 고르면 색으로 역할을 볼 수 있어요.`,move:mv.id})}});
    questions=[...q,...gen];
  }catch(e){dataError=String(e);console.error('학습 모듈 데이터 오류',e)}
  const concepts={...MED,...EXTRA};
  for(const [id,v]of Object.entries(muscles))concepts['muscle/'+id]={...v,type:'muscle',id};
  for(const [id,v]of Object.entries(nerves))concepts['nerve/'+id]={...v,type:'nerve',id};
  for(const v of movements)concepts['movement/'+v.id]={...v,type:'movement',id:v.id};
  const cids=Object.keys(concepts);
  let current='brainstem',glossSearch='',glossMode='easy',glossType='all';
  let checked=new Set(readStore('nv-rc1-checked',[]).filter(v=>typeof v==='number'));
  let quizLv='전체',quizCat='전체',catStat=readStore('nv-rc1-cat',{}),roundStat={},quizLimit='10',running=[],index=0,selected=null,correct=0,wrongSet=new Set(readStore('nv-rc1-wrong',[]).filter(Number.isInteger)),history=readStore('nv-rc1-history',[]),due=readStore('nv-rc1-due',{}),DAYS=[1,3,7],quizScreen='menu',quizError='';

  function switchTab(id){document.querySelector(`[data-tab="${id}"]`)?.click()}
  function go3D(id){
    const info=concepts[id];if(!info)return;
    if(id==='decussation'||id==='cst'||id==='nerve_signal'||id==='umn'||id==='spinal_cord'){switchTab('pathways');document.getElementById('nv53-original-paths').open=true;selectPath('cst');return;}
    if(MED[id]){switchTab('anatomy');if(names[id])focus(id);return;}
    if(info.type==='movement'||info.type==='muscle'||info.type==='nerve'){
      switchTab('biomech');
      let move=info.type==='movement'?info.id:info.type==='muscle'?movements.find(x=>[...x.prime,...x.synergist,...x.antagonist,...x.stabilizer].includes(info.id))?.id:null;
      if(move){document.querySelector(`[data-bmov="${move}"]`)?.click();if(info.type==='muscle')requestAnimationFrame(()=>document.querySelector(`[data-muscle="${info.id}"]`)?.click());}
      if(info.type==='nerve'){document.querySelector('[data-bmode="plexus"]')?.click();document.querySelector(`[data-bn="${info.id}"]`)?.click();}
    }
  }
  const sourceFor=(id,v)=>{
    if(v.source&&/^https:\/\//.test(v.source))return v.source;
    if(['brainstem','medulla','decussation','cst','umn','spinal_cord','midbrain','pons'].includes(id))return URLS.motor;
    if(v.type==='nerve'||id==='roots_vs_rami')return URLS.plexus;
    if(v.type==='muscle'||v.type==='movement'||['prime_mover','synergist','antagonist'].includes(id))return URLS.upperLimb;
    return URLS.fipat;
  };
  function allTerms(id,v){return `<div class="academy-terms"><span>English</span><b>${ESC(v.en)}</b><span>한국어 신용어</span><b>${ESC(v.new)}</b><span>한국어 구용어</span><b>${ESC(v.old)}</b></div>`}
  function detailHTML(id,v){
    const desc=glossMode==='easy'?v.easy:v.expert;
    const rel=(v.related||[]).filter(x=>concepts[x]);
    const related=rel.length?`<div class="label">이어 배우는 개념</div><div class="academy-term-list">${rel.map(x=>`<button type="button" data-gloss-id="${ESC(x)}">${ESC(concepts[x].new)} · ${ESC(concepts[x].en)}</button>`).join('')}</div>`:'';
    const coverage=v.type==='muscle'?'근육은 실제 3D 부착부·활성량 계측이 아니라 역할 강조 모식입니다.':v.type==='movement'?'관절 회전은 교육용 모식이며 실제 인체 리깅이나 근전도 자료가 아닙니다.':v.type==='nerve'?'신경 분지 도식은 전형적인 경로를 설명하며 개인차 및 모든 가지를 나타내지 않습니다.':'신경로 곡선과 강조 영역의 실제 환자 해부학적 정합성은 아직 검증되지 않았습니다.';
    return `<h2 style="margin:0 0 8px">${ESC(v.new)}</h2>${allTerms(id,v)}<div class="academy-toggle" role="group" aria-label="설명 모드"><button class="${glossMode==='easy'?'active':''}" data-gloss-mode="easy" aria-pressed="${glossMode==='easy'}">아주 쉬운 설명</button><button class="${glossMode==='expert'?'active':''}" data-gloss-mode="expert" aria-pressed="${glossMode==='expert'}">전문 설명</button></div><div class="academy-explanation ${glossMode==='expert'?'expert':''}"><strong>${glossMode==='easy'?'어려운 말 없이 이해하기':'해부학·신경생리학 전문 설명'}</strong><div style="margin-top:6px">${ESC(desc||'이 항목은 해당 깊이의 설명을 추가 검토 중입니다.')}</div></div>${related}<div class="academy-actions"><button type="button" class="academy-action" data-to3d="${ESC(id)}">3D 관련 구조·경로로 이동 (가능한 경우)</button></div><div class="academy-sources"><span class="academy-pill pending">원문 항목별 검수 진행 중</span><span class="academy-pill pending">신·구용어 공식 대조 전</span><p>참고: <a target="_blank" rel="noopener noreferrer" href="${ESC(sourceFor(id,v))}">관련 해부학·신경과학 참고문헌</a></p><p>제한사항: ${ESC(coverage)}</p></div>`;
  }
  const applyDetailEvents=root=>{
    root.querySelectorAll('[data-gloss-id]').forEach(b=>b.addEventListener('click',()=>{current=b.dataset.glossId;glossaryDetail();document.getElementById('academy-gloss-detail')?.scrollIntoView({block:'nearest',behavior:'smooth'})}));
    root.querySelectorAll('[data-gloss-mode]').forEach(b=>b.addEventListener('click',()=>{glossMode=b.dataset.glossMode;glossaryDetail()}));
    root.querySelectorAll('[data-to3d]').forEach(b=>b.addEventListener('click',()=>go3D(b.dataset.to3d)));
  };
  function glossaryDetail(){const el=document.getElementById('academy-gloss-detail');if(!el)return;const v=concepts[current];el.innerHTML=v?detailHTML(current,v):'<p>찾는 용어를 선택해 주세요.</p>';applyDetailEvents(el)}
  function renderGlossary(){
    const el=sections.glossary;el.innerHTML=`<div class="academy-hero"><strong>의학용어 · 이해로 연결되는 사전</strong><p>영어, 한국어 신용어·구용어로 검색하세요. 개념을 클릭하면 쉬운 설명과 전문 설명을 완전히 나누어 보여줘요. 관련 3D 구조로 바로 이동할 수 있어요.</p></div><label class="label" for="academy-search">용어 검색</label><input id="academy-search" class="academy-input" autocomplete="off" placeholder="예: brainstem, 뇌줄기, 뇌간, biceps" value="${ESC(glossSearch)}"><div class="academy-filterbar">${[['all','전체'],['brain','뇌·신경'],['muscle','근육'],['nerve','신경'],['movement','관절 운동']].map(([id,label])=>`<button class="${glossType===id?'active':''}" data-gloss-filter="${id}">${label}</button>`).join('')}</div><div class="academy-compact" id="academy-count"></div><div class="academy-term-list" id="academy-term-list"></div><div id="academy-gloss-detail" class="academy-card"></div>`;
    el.querySelector('#academy-search').addEventListener('input',e=>{glossSearch=e.target.value;glossaryList()});
    el.querySelectorAll('[data-gloss-filter]').forEach(b=>b.addEventListener('click',()=>{glossType=b.dataset.glossFilter;el.querySelectorAll('[data-gloss-filter]').forEach(x=>x.classList.toggle('active',x===b));glossaryList()}));
    glossaryList();glossaryDetail();
  }
  function glossaryList(){const el=document.getElementById('academy-term-list');if(!el)return;const q=glossSearch.trim().toLocaleLowerCase();const filt=cids.filter(id=>{
    const v=concepts[id];if(glossType==='brain'&&v.type)return false;
    if(!['all','brain'].includes(glossType)&&v.type!==glossType)return false;
    return !q||[v.en,v.new,v.old,v.easy].some(s=>String(s??'').toLocaleLowerCase().includes(q));
  });document.getElementById('academy-count').textContent=`${filt.length}개 용어 · 선택해 설명과 3D 위치 보기`;
    el.innerHTML=filt.slice(0,100).map(id=>`<button type="button" class="${current===id?'active':''}" data-gloss-id="${ESC(id)}">${ESC(concepts[id].new)} <span class="academy-compact">${ESC(concepts[id].en)}</span></button>`).join('')||'<p>검색 결과가 없습니다.</p>';
    el.querySelectorAll('[data-gloss-id]').forEach(b=>b.addEventListener('click',()=>{current=b.dataset.glossId;el.querySelectorAll('button').forEach(x=>x.classList.toggle('active',x===b));glossaryDetail()}));
  }
  function openGlossary(id){if(!concepts[id])id='brainstem';current=id;switchTab('glossary');glossaryDetail()}

  function renderAcademy(){
    const el=sections.academy;const done=checked.size;const nextStep=LIST.findIndex((_,i)=>!checked.has(i));const weak=Object.entries(catStat).filter(([,v])=>v[1]>=3).map(([k,v])=>[k,v[0]/v[1],v]).sort((a,b)=>a[1]-b[1]).slice(0,3);
    el.innerHTML=`<div class="academy-hero"><strong>의료계열 학생을 위한 3D 학습 로드맵</strong><p>구조 → 신경로 → 움직임 → 임상 → 문제풀이로 연결됩니다. 설명은 언제나 <b>정확한 전문 설명</b>과 <b>아주 쉬운 설명</b>을 분리합니다.</p><div class="academy-stat"><div><b>12</b>뇌 구조</div><div><b>${Object.keys(pathwayData).length}</b>신경경로</div><div><b>${movements.length}</b>관절 운동</div></div><div class="academy-stat"><div><b>${Object.keys(muscles).length}</b>근육</div><div><b>${Object.keys(nerves).length}</b>신경</div><div><b>${questions.length}</b>퀴즈</div></div></div><div class="academy-card"><h3>학습 순서 · ${done}/${LIST.length} 완료 표시</h3><div class="academy-progress" role="progressbar" aria-valuemin="0" aria-valuemax="${LIST.length}" aria-valuenow="${done}"><div style="width:${done/LIST.length*100}%"></div></div><p>모든 진행 체크는 이 브라우저에만 저장됩니다. 실제 학업 성취도를 의미하지 않습니다.</p>${LIST.map(([tab,name,desc0,sub],i)=>{const desc=desc0.replace('{mv}',movements.length).replace('{mu}',Object.keys(muscles).length).replace('{q}',questions.length);return `<div class="academy-checkpoint"><input type="checkbox" id="ach-${i}" data-check="${i}" ${checked.has(i)?'checked':''} aria-label="${ESC(name)} 학습 완료 표시"><div><label for="ach-${i}"><strong>${i+1}. ${ESC(name)}</strong></label>${i===nextStep?' <span class="academy-pill">지금 할 단계</span>':''}<p style="margin:2px 0 8px">${ESC(desc)}</p><button type="button" data-lesson="${ESC(tab)}" data-sub="${ESC(sub||'')}">학습 시작</button></div></div>`}).join('')}</div><div class="academy-card"><h3>퀴즈로 찾은 약한 분야</h3>${weak.length?weak.map(([k,r,v])=>`<p>${ESC(k)} · ${v[0]}/${v[1]} 정답 (${Math.round(r*100)}%) <button type="button" data-weak="${ESC(k)}">이 분야 연습</button></p>`).join(''):'<p>퀴즈를 한 분야에서 3문항 이상 풀면, 정답률이 낮은 분야를 여기서 알려줘요.</p>'}</div><div class="academy-card"><h3>학생이 놓치기 쉬운 개념</h3><p>예를 들어 ‘뇌줄기 아래쪽’이라는 표현을 만나면 뇌줄기 → 숨뇌 → 피라미드 교차 순서로 기초부터 설명합니다.</p><div class="academy-term-list">${['brainstem','medulla','decussation','roots_vs_rami','prime_mover','synergist','antagonist'].map(id=>`<button data-togloss="${id}">${ESC(concepts[id].new)}</button>`).join('')}</div></div><div class="academy-card"><h3>자료 검증 상태</h3><p><span class="academy-pill">원본 구조/경로 파일 탑재</span><span class="academy-pill pending">의학 문장 전수 검수 전</span><span class="academy-pill pending">교수 외부 감수 전</span></p><p>해부학적 정합성, 근활성 계측, 한국어 신·구용어의 공식 대조 및 교수 검수는 완료되지 않았습니다. 일부 신경 경로는 추정 좌표를 포함합니다.</p><button data-lesson="glossary">용어 검증 현황과 문헌 보기</button></div>`;
    el.querySelectorAll('[data-check]').forEach(x=>x.addEventListener('change',()=>{const n=Number(x.dataset.check);x.checked?checked.add(n):checked.delete(n);writeStore('nv-rc1-checked',[...checked]);renderAcademy()}));
    el.querySelectorAll('[data-lesson]').forEach(x=>x.addEventListener('click',()=>{switchTab(x.dataset.lesson);if(x.dataset.sub)requestAnimationFrame(()=>document.querySelector(`[data-bmode="${x.dataset.sub}"]`)?.click())}));el.querySelectorAll('[data-weak]').forEach(x=>x.addEventListener('click',()=>{quizCat=x.dataset.weak;quizLv='전체';quizScreen='menu';switchTab('quiz');renderQuiz()}));
    el.querySelectorAll('[data-togloss]').forEach(x=>x.addEventListener('click',()=>openGlossary(x.dataset.togloss)));
  }

  // Inline definitions in explanations. A term is never presented without a route to its definition.
  const linkKeys=['뇌줄기','연수','숨뇌','피라미드 교차','피질척수로','위운동신경세포','척수','시상','편도체','소뇌','중간뇌','교뇌','다리뇌'];
  const keyMap={'뇌줄기':'brainstem','연수':'medulla','숨뇌':'medulla','피라미드 교차':'decussation','피질척수로':'cst','위운동신경세포':'umn','척수':'spinal_cord','시상':'thalamus','편도체':'amygdala','소뇌':'cerebellum_cut','중간뇌':'midbrain','교뇌':'pons','다리뇌':'pons'};
  const termRx=new RegExp(`(${linkKeys.sort((a,b)=>b.length-a.length).join('|')})`,'g');
  const linkTerms=str=>String(str).split(termRx).map(part=>keyMap[part]&&concepts[keyMap[part]]?`<button type="button" data-quiz-term="${keyMap[part]}" class="academy-inline-term" title="${ESC(part)} 해설 열기">${ESC(part)}</button>`:ESC(part)).join('');
  const showTermLinks=root=>root.querySelectorAll('[data-quiz-term]').forEach(b=>b.onclick=()=>openGlossary(b.dataset.quizTerm));
  const QLEVEL=['전체','고교','보건','의과','물리치료'];
  const OTHER='신경해부·임상',pfx=q=>String(q.topic).split(' · ')[0];
  const bigCat=new Set(Object.entries(questions.reduce((a,q)=>(a[pfx(q)]=(a[pfx(q)]||0)+1,a),{})).filter(([,n])=>n>=8).map(([k])=>k));
  const catOf=q=>bigCat.has(pfx(q))?pfx(q):OTHER;
  const CATS=[...bigCat,...(questions.some(q=>catOf(q)===OTHER)?[OTHER]:[])];
  const inFilter=q=>(quizLv==='전체'||q.level===quizLv)&&(quizCat==='전체'||catOf(q)===quizCat);
  const muscleOf=q=>{let best=null;for(const [id,v] of Object.entries(muscles))if(v.new&&String(q.q).startsWith(v.new)&&(!best||v.new.length>muscles[best].new.length))best=id;return best};
  const target3D=q=>q.move?'movement/'+q.move:(muscleOf(q)?'muscle/'+muscleOf(q):null);
  function pool(){return questions.filter(inFilter)}
  function startQuiz(onlyWrong=false){const items=questions.filter(q=>(!onlyWrong||(onlyWrong==='due'?due[q.id]&&due[q.id].next<=Date.now():wrongSet.has(q.id)))&&inFilter(q));roundStat={};if(!items.length){quizError='해당 조건의 문제가 없습니다.';renderQuiz();return;}
    let picked=shuffle(items);if(quizLimit!=='all')picked=picked.slice(0,Number(quizLimit));running=picked.map(item=>({item,order:shuffle([0,1,2,3])}));index=0;selected=null;correct=0;quizScreen='play';quizError='';renderQuiz()}
  function chooseQuiz(v){if(selected!==null)return;selected=Number(v);const x=running[index];const correctIndex=x.order.indexOf(x.item.ans);const id=x.item.id,d=due[id];{const c=catOf(x.item),ok=selected===correctIndex?1:0;roundStat[c]=[(roundStat[c]?.[0]||0)+ok,(roundStat[c]?.[1]||0)+1];catStat[c]=[(catStat[c]?.[0]||0)+ok,(catStat[c]?.[1]||0)+1];writeStore('nv-rc1-cat',catStat)}if(selected===correctIndex){correct++;wrongSet.delete(id);if(d){const st=d.step+1;if(st>=DAYS.length)delete due[id];else due[id]={step:st,next:Date.now()+DAYS[st]*864e5}}}else{wrongSet.add(id);due[id]={step:0,next:Date.now()+DAYS[0]*864e5}}writeStore('nv-rc1-wrong',[...wrongSet]);writeStore('nv-rc1-due',due);renderQuiz()}
  function nextQuiz(){if(index+1<running.length){index++;selected=null;renderQuiz();return;}const record={at:new Date().toISOString(),level:quizLv,total:running.length,correct};history=[record,...history].slice(0,20);writeStore('nv-rc1-history',history);quizScreen='result';renderQuiz()}
  const FLOW_MAP={decussation:'cst',vision:'vision',somato:'somato',hearing:'auditory',auditory:'auditory',cerebellum:'cerebellum',language:'arcuate',amygdala:'amygdala',somato_dorsal:'somato',thalamus:'somato',bgdirect:'cst',bgindirect:'cst'};
  function goQuizPath(x){const key=FLOW_MAP[x];if(!key||!pathwayData[key])return false;switchTab('pathways');document.getElementById('nv53-original-paths').open=true;selectPath(key);return true}
  function renderQuiz(){const el=sections.quiz;if(!el)return;
    if(quizScreen==='menu'){
      el.innerHTML=`<div class="academy-hero"><strong>신경해부학·병변 추론 문제은행</strong><p>기본 ${questions.length-gen.length}문항에, 이 앱의 움직임 데이터로 만든 ${gen.length}문항을 더했어요. 난이도 선택, 보기 섞기, 오답 복습, 관련 3D 경로 이동을 지원해요. 문제는 외부 교수 감수 전입니다.</p></div><div class="academy-card"><h3>난이도 선택</h3><div class="academy-filterbar">${QLEVEL.map(x=>`<button data-qlevel="${x}" class="${quizLv===x?'active':''}" aria-pressed="${quizLv===x}">${x} · ${x==='전체'?questions.length:questions.filter(q=>q.level===x).length}문항</button>`).join('')}</div><div class="label">분야 선택</div><div class="academy-filterbar">${['전체',...CATS].map(x=>`<button data-qcat="${ESC(x)}" class="${quizCat===x?'active':''}" aria-pressed="${quizCat===x}">${ESC(x)}${x==='전체'?'':' · '+questions.filter(q=>catOf(q)===x).length}</button>`).join('')}</div><div class="label">이번 회차 문제 수</div><div class="academy-filterbar">${[['10','10문항'],['20','20문항'],['all','전체']].map(([id,label])=>`<button data-qlimit="${id}" class="${quizLimit===id?'active':''}">${label}</button>`).join('')}</div><div class="academy-stat"><div><b>${pool().length}</b>선택된 문제</div><div><b>${wrongSet.size}</b>오답 노트</div><div><b>${history.length}</b>학습 회차</div></div><button class="academy-action" id="academy-start-quiz" ${!pool().length?'disabled':''}>학습 시작</button> <button class="academy-action" id="academy-start-wrong" ${!wrongSet.size?'disabled':''}>오답만 다시 풀기</button>${quizError?`<p class="academy-warn">${ESC(quizError)}</p>`:''}</div><div class="academy-card"><h3>최근 학습 기록</h3>${history.length?history.slice(0,5).map(h=>`<p>${ESC(h.at.slice(0,10))} · ${ESC(h.level)} · ${h.correct}/${h.total}문제 정답</p>`).join(''):'<p>아직 저장된 기록이 없습니다.</p>'}<button class="academy-action" id="academy-erase">저장된 기록·오답 삭제</button><p class="academy-compact">기록은 서버로 전송되지 않고 사용 중인 브라우저의 로컬 저장소에만 보관됩니다.</p></div>`;
      el.querySelectorAll('[data-qlevel]').forEach(b=>b.onclick=()=>{quizLv=b.dataset.qlevel;renderQuiz()});el.querySelectorAll('[data-qcat]').forEach(b=>b.onclick=()=>{quizCat=b.dataset.qcat;renderQuiz()});el.querySelectorAll('[data-qlimit]').forEach(b=>b.onclick=()=>{quizLimit=b.dataset.qlimit;renderQuiz()});
      el.querySelector('#academy-start-quiz').onclick=()=>startQuiz();el.querySelector('#academy-start-wrong').onclick=()=>startQuiz(true);{const n=Object.values(due).filter(v=>v.next<=Date.now()).length,b=document.createElement('button');b.className=el.querySelector('#academy-start-wrong').className;b.textContent='오늘 복습할 문제 '+n+'개';b.onclick=()=>startQuiz('due');el.querySelector('#academy-start-wrong').after(b)}
      el.querySelector('#academy-erase').onclick=()=>{if(confirm('저장된 학습 기록과 오답을 모두 삭제할까요?')){history=[];wrongSet.clear();due={};catStat={};writeStore('nv-rc1-cat',{});writeStore('nv-rc1-due',{});writeStore('nv-rc1-history',[]);writeStore('nv-rc1-wrong',[]);renderQuiz()}};
    }else if(quizScreen==='play'){
      const x=running[index];if(!x){quizScreen='menu';return renderQuiz()};const correctIndex=x.order.indexOf(x.item.ans),hasPick=selected!==null;
      el.innerHTML=`<div class="academy-card"><div class="academy-compact">${ESC(quizLv)} · ${index+1}/${running.length} · ${ESC(x.item.level)} · ${ESC(x.item.topic)}</div><div class="academy-progress" role="progressbar" aria-valuemin="0" aria-valuemax="${running.length}" aria-valuenow="${index+(hasPick?1:0)}"><div style="width:${(index+(hasPick?1:0))/running.length*100}%"></div></div><div class="academy-quiz-question">${linkTerms(x.item.q)}</div>${x.order.map((optIndex,i)=>`<button type="button" class="academy-option ${hasPick&&i===correctIndex?'correct':hasPick&&i===selected?'incorrect':''}" data-choice="${i}" ${hasPick?'disabled':''}>${i+1}. ${ESC(x.item.opts[optIndex])}</button>`).join('')}${hasPick?`<div class="academy-explanation" aria-live="polite"><b>${selected===correctIndex?'정답입니다.':'정답은 '+(correctIndex+1)+'번입니다.'}</b><p>${linkTerms(x.item.why)}</p><small>문항·해설은 교과서 원문 문장별 대조와 교수 검수를 마치지 않았습니다.</small></div><button class="academy-action" id="academy-next">${index+1===running.length?'결과 확인':'다음 문제'}</button>${FLOW_MAP[x.item.flow]?` <button class="academy-action" id="academy-3d-answer">관련 3D 경로 보기</button>`:''}${target3D(x.item)?` <button class="academy-action" id="academy-3d-move">움직임 탭에서 보기</button>`:''}`:''}<hr class="academy-divider"><button class="academy-action" id="academy-quit">학습 중단</button></div>`;
      el.querySelectorAll('[data-choice]').forEach(b=>b.onclick=()=>chooseQuiz(b.dataset.choice));el.querySelector('#academy-next')?.addEventListener('click',nextQuiz);el.querySelector('#academy-3d-answer')?.addEventListener('click',()=>goQuizPath(x.item.flow));el.querySelector('#academy-3d-move')?.addEventListener('click',()=>go3D(target3D(x.item)));el.querySelector('#academy-quit').onclick=()=>{quizScreen='menu';renderQuiz()};showTermLinks(el);
    }else {
      const percent=Math.round(correct/(running.length||1)*100);
      el.innerHTML=`<div class="academy-result"><p>학습 회차 결과</p><strong>${correct} / ${running.length}</strong><p>정답률 ${percent}% · 오답 노트 ${wrongSet.size}문항</p><p>이 점수는 자체 문제풀이 결과이며 공인 지식평가가 아닙니다.</p></div><div class="academy-card"><h3>분야별 이번 결과</h3>${Object.entries(roundStat).map(([k,v])=>`<p>${ESC(k)} · ${v[0]}/${v[1]}</p>`).join('')||'<p>기록 없음</p>'}</div><div class="academy-card"><button class="academy-action" id="academy-redo">다시 풀기</button> <button class="academy-action" id="academy-wrong-redo">오답 복습</button> <button class="academy-action" id="academy-return">메뉴로</button></div>`;
      el.querySelector('#academy-redo').onclick=()=>startQuiz();el.querySelector('#academy-wrong-redo').onclick=()=>startQuiz(true);el.querySelector('#academy-return').onclick=()=>{quizScreen='menu';renderQuiz()};
    }
  }
  renderAcademy();renderGlossary();renderQuiz();
  console.info('NEUROVERSE 학습 시스템 준비됨:',Object.keys(concepts).length,'용어,',questions.length,'퀴즈');
  window.addEventListener('keydown',ev=>{if(ev.key==='/'&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName||'')){ev.preventDefault();switchTab('glossary');document.getElementById('academy-search')?.focus()}});
}
