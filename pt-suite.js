/** NEUROVERSE RC15 | 학년별 전공 학습 + 복습. 국가고시 전용 기능 제거. */
const esc = value => String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const https = url => /^https:\/\//.test(url||'') ? url : '#';
const get = (key,base) => {try {const obj=JSON.parse(localStorage.getItem(key));return obj??base;}catch{return base;}};
const put = (key,val) => {try{localStorage.setItem(key,JSON.stringify(val));}catch{}};
const shuffle = xs => {const arr=[...xs];for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}return arr;};
const subjShort = {'물리치료 기초':'기초','물리치료 진단평가':'진단평가','물리치료 중재':'중재','의료관계법규':'법규','실기형 학습':'실기형'};
const TERMS={
 '시냅스':['Synapse','시냅스','시냅스','두 신경세포가 정보를 주고받는 연결 자리예요.','신경세포 사이의 특수화된 정보 전달 접합부로 화학적·전기적 전달 형태가 있다.','https://www.ncbi.nlm.nih.gov/sites/books/NBK526047/'],
 '축삭':['Axon','축삭','신경돌기','신경세포에서 멀리 신호를 보내는 긴 줄기예요.','신경세포의 신호 전도와 종말의 신경전달물질 방출에 관련된 돌기다.','https://www.ncbi.nlm.nih.gov/books/NBK441977/'],
 '운동단위':['Motor unit','운동단위','운동단위','하나의 운동신경세포와 그 신경이 맡은 근육섬유를 한 팀으로 묶은 말이에요.','한 알파운동신경세포와 그 신경이 지배하는 모든 뼈대근육섬유의 기능 단위다.','https://www.ncbi.nlm.nih.gov/books/NBK551505/'],
 '신경지배':['Innervation','신경지배','신경지배','어느 신경이 어느 근육이나 피부에 신호를 보내는지 나타내는 말이에요.','특정 신경의 축삭이 근육·감각기관·자율신경 표적 등에 분포하는 관계다.','https://www.ncbi.nlm.nih.gov/books/NBK500016/'],
 '뇌줄기':['Brainstem','뇌줄기','뇌간','뇌와 척수 사이를 이어 주는 길목이에요. 숨과 심장 기능 조절에도 중요해요.','중간뇌·다리뇌·숨뇌로 구성되며 뇌신경핵과 상·하행로 및 자율신경 관련 회로를 포함한다.','https://www.ncbi.nlm.nih.gov/books/NBK540976/'],
 '숨뇌':['Medulla oblongata','숨뇌','연수','뇌줄기의 맨 아래쪽 부분이에요. 많은 움직임 신경 길이 여기에서 반대쪽으로 건너가요.','숨뇌는 뇌줄기 하단이며 피라미드 교차와 호흡·심혈관 조절 관련 핵·경로가 위치한다.','https://www.ncbi.nlm.nih.gov/books/NBK540976/'],
 '중력':['Gravity','중력','중력','물건과 몸을 땅 쪽으로 끌어당기는 힘이에요.','중력은 질량에 작용하는 힘으로 근력검사에서 움직이는 분절에 가해지는 외부 하중의 한 요소다.','https://www.ncbi.nlm.nih.gov/books/NBK436008/'],
 '관절토크':['Joint torque','관절돌림힘','관절토크','관절을 중심으로 팔이나 다리를 돌리려는 힘의 효과예요.','관절축에 대한 힘의 모멘트로, 근육의 힘·모멘트팔 및 외부 하중의 영향을 받는다.','https://www.ncbi.nlm.nih.gov/books/NBK532948/'],
 '수의운동':['Voluntary movement','수의운동','수의운동','내가 하고 싶어서 의도적으로 팔이나 다리를 움직이는 거예요.','운동계의 의도적 조절에 의해 수행되며 대뇌겉질·하행로·척수 및 말초운동계의 활동을 포함한다.','https://www.ncbi.nlm.nih.gov/books/NBK540976/'],
 '경직':['Spasticity','경직','경직','팔이나 다리를 빠르게 움직여 주면 근육이 강하게 버티는 현상이 나타날 수 있어요.','경직은 위운동신경세포 증후군에서 나타날 수 있는 속도 의존적 신장반사 과흥분 현상이다.','https://www.ncbi.nlm.nih.gov/books/NBK541082/'],
 '근활성':['Muscle activation','근활성','근육 활성','근육이 움직이기 위해 신경 신호를 받고 일을 준비하는 상태예요. 그림의 색은 실제 측정값이 아니에요.','운동단위의 동원 및 발화와 관련되며 표면 근전도 진폭과 실제 근력은 일대일 대응하지 않는다.','https://www.ncbi.nlm.nih.gov/books/NBK436008/'],
 '앞가지':['Ventral ramus','앞가지','전지','척수신경이 만들어지고 나서 앞쪽으로 갈라진 가지예요.','혼합 척수신경에서 분기한 앞가지이며 전형적 팔신경얼기 roots에 해당한다.','https://www.ncbi.nlm.nih.gov/books/NBK542218/'],
 '앞뿌리':['Ventral root','앞뿌리','전근','척수에서 나오는 운동 신경의 시작 줄기예요. 앞가지와는 다른 구조예요.','운동성 신경섬유의 뿌리로, 뒤뿌리와 합쳐 혼합척수신경을 이룬 뒤 가지로 분지한다.','https://www.ncbi.nlm.nih.gov/books/NBK542218/'],
 '활동전위':['Action potential','활동전위','활동전위','신경세포가 정보를 전달할 때 생기는 빠른 전기 신호예요.','이온통로의 연속적인 개폐에 의한 막전위 변화가 신경축삭을 따라 전파되는 현상이다.','https://www.ncbi.nlm.nih.gov/sites/books/NBK526047/'],
 'MRC':['Medical Research Council grade','MRC 근력등급','MRC 근력등급','근육 힘을 0부터 5까지 나누어 적는 방법이에요.','MRC 등급은 수축 여부·중력에 대한 운동·저항에 대한 운동을 임상적으로 구분하는 척도다.','https://www.ncbi.nlm.nih.gov/books/NBK436008/'],
 'ROM':['Range of motion','관절가동범위','관절운동범위','관절이 움직일 수 있는 각도 범위를 말해요.','ROM은 관절의 능동·수동 운동각도 범위이며 적절한 기준축 정렬로 측정한다.','https://www.ncbi.nlm.nih.gov/books/NBK558985/'],
 'ICF':['International Classification of Functioning, Disability and Health','국제기능·장애·건강분류','국제기능·장애·건강분류','몸 상태뿐 아니라 무엇을 할 수 있고 어디에 참여하는지도 보는 틀이에요.','WHO가 제정한 기능·장애·건강의 국제분류 틀이며 신체기능·구조, 활동, 참여, 환경요인을 포함한다.','https://www.who.int/standards/classifications/international-classification-of-functioning-disability-and-health'],
 '속섬유막':['Internal capsule','속섬유막','내포','뇌 깊은 곳에서 움직임 신호가 지나가는 좁은 신경 길이에요.','속섬유막은 대뇌 깊은 백질 경로로 피질척수로 등 중요한 투사섬유가 통과한다.','https://www.ncbi.nlm.nih.gov/books/NBK540976/'],
 '대뇌다리':['Cerebral peduncle','대뇌다리','대뇌각','뇌에서 아래로 내려오는 신경길이 지나가는 중간뇌의 앞쪽 부분이에요.','대뇌다리는 중간뇌의 구조로 겉질척수로·겉질숨뇌로 등 하행경로 일부를 포함한다.','https://www.ncbi.nlm.nih.gov/books/NBK540976/'],
};
const TERM_RX=new RegExp('('+Object.keys(TERMS).sort((a,b)=>b.length-a.length).join('|')+')','g');
const linkTerms=text=>String(text).split(TERM_RX).map(part=>TERMS[part]?`<button type="button" class="pt-inline-term" data-mini="${esc(part)}" title="${esc(part)} 설명 확인">${esc(part)}</button>`:esc(part)).join('');
const GRADE_HINT={1:'어려운 단어를 먼저 이해하고, 관절·근육·신경을 탐색해요.',2:'몸이 움직이는 원리와 근육·신경의 연결을 배워요.',3:'평가 결과를 기능·활동·참여와 연결해요.',4:'여러 전공 지식을 실제 임상 상황과 연결해 추론해요.'};

async function init(){
 const nav=document.querySelector('nav.tabs'),scroll=document.querySelector('.scroll');if(!nav||!scroll)return;
 const root=document.createElement('section');root.id='pt-course';root.className='hidden';
 scroll.append(root);
 for(const [id,name] of [['pt-course','PT 1–4학년']]){
   const button=document.createElement('button');button.type='button';button.dataset.tab=id;button.textContent=name;
   nav.appendChild(button);
   button.addEventListener('click',()=>{
     nav.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b===button));
     scroll.querySelectorAll(':scope > section').forEach(el=>el.classList.toggle('hidden',el.id!==id));
     document.getElementById('view-title').textContent='물리치료 1–4학년 학습 경로';
     renderCourse();
   });
 }
 // Other tabs from the original and the RC3 suite must also close our screens.
 nav.addEventListener('click',event=>{const target=event.target.closest('button[data-tab]');if(!target||target.dataset.tab==='pt-course')return;root.classList.add('hidden');},true);
 let bundle;
 try{const response=await fetch('./data/pt-course.json');if(!response.ok)throw Error('HTTP '+response.status);bundle=await response.json();}
 catch(error){root.textContent='학습 자료를 읽지 못했어요. 로컬 서버에서 실행하고 새로고침해 주세요.';console.error(error);return;}
 const lessons=bundle.lessons;
 let grade=Number(get('nv-pt-year',1));if(![1,2,3,4].includes(grade))grade=1;
 let mode=get('nv-pt-explain','easy');if(!['easy','expert'].includes(mode))mode='easy';
 let search='',chosen=lessons[0].id,onlyBookmarks=false,onlyDue=false;
 let done=new Set(get('nv-pt-learned',[]).filter(x=>typeof x==='string'));
 let bookmarks=new Set(get('nv-pt-bookmarks',[]).filter(x=>typeof x==='string'));
 // Review scheduler: optional self-assessment, not a validated memory/clinical assessment instrument.
 const REVIEW_KEY='nv-pt-review-v1';
 let review=get(REVIEW_KEY,{});
 if(!review||typeof review!=='object'||Array.isArray(review))review={};
 const dayStamp=()=>new Date().toISOString().slice(0,10);
 const dueDate=(days)=>{const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()+days);return d.toISOString().slice(0,10);};
 const validReview=id=>{const r=review[id];return r&&typeof r==='object'&&typeof r.due==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(r.due);};
 const dueLesson=id=>validReview(id)&&review[id].due<=dayStamp();
 const rateLesson=(id,level)=>{
   if(!lessonMap[id]||!['again','okay','easy'].includes(level))return;
   const old=validReview(id)?review[id]:{streak:0};
   const streak=level==='again'?0:Math.min(8,(Number(old.streak)||0)+1);
   // Simple transparent heuristic: difficult=1d, okay=3/7/14d, easy=7/14/30d.
   const gap=level==='again'?1:level==='okay'?[3,7,14,30][Math.min(streak-1,3)]:[7,14,30,60][Math.min(streak-1,3)];
   review[id]={last:dayStamp(),due:dueDate(gap),streak,rating:level};
   put(REVIEW_KEY,review);renderStats();renderLessonList();courseDetail();
 };

 const lessonMap=Object.fromEntries(lessons.map(x=>[x.id,x]));
 const goTab=id=>document.querySelector(`nav.tabs button[data-tab="${id}"]`)?.click();
 const openLesson=id=>{const v=lessonMap[id];if(!v)return;grade=v.year;put('nv-pt-year',grade);chosen=id;goTab('pt-course');renderCourse();};
 const to3D = v=>{if(v.tab==='academy')goTab('academy');else if(['pathways','clinical','biomech','anatomy','systems'].includes(v.tab))goTab(v.tab);
   if(v.tab==='pathways'){document.querySelector('[data-path="cst"]')?.click();}
   if(v.tab==='biomech'){
     if(['pt-10','pt-21','pt-22'].includes(v.id))document.querySelector('[data-bmode="plexus"]')?.click();
     else document.querySelector('[data-bmode="movement"]')?.click();
     if(['pt-11','pt-12','pt-05','pt-06'].includes(v.id))document.querySelector('[data-bmov="elbow_flex"]')?.click();
   }
 };
 const terms=v=>`<div class="pt-terms"><div><span>English</span><strong>${esc(v.en)}</strong></div><div><span>한국어 신용어</span><strong>${esc(v.new)}</strong></div><div><span>한국어 구용어</span><strong>${esc(v.old)}</strong></div></div>`;
 function courseDetail(){const v=lessonMap[chosen];if(!v)return;
  const el=root.querySelector('#pt-lesson-detail');if(!el)return;
  el.innerHTML=`<div class="pt-lesson-header"><div class="pt-kicker">${v.year}학년 · ${esc(v.category)}</div><h3>${esc(v.new)}</h3><div class="pt-lesson-actions"><button type="button" id="pt-bookmark" aria-pressed="${bookmarks.has(v.id)}">${bookmarks.has(v.id)?'★ 저장됨':'☆ 북마크'}</button><button type="button" id="pt-done" aria-pressed="${done.has(v.id)}">${done.has(v.id)?'✓ 학습 완료':'○ 학습 완료 표시'}</button></div></div>${terms(v)}<div class="pt-mode" role="group" aria-label="설명 난이도"><button type="button" data-mode="easy" class="${mode==='easy'?'active':''}" aria-pressed="${mode==='easy'}">아주 쉬운 설명</button><button type="button" data-mode="expert" class="${mode==='expert'?'active':''}" aria-pressed="${mode==='expert'}">전문 설명</button></div><div class="pt-explain"><b>${mode==='easy'?'초등학생도 이해하는 설명':'대학생을 위한 전문 설명'}</b><p>${linkTerms(v[mode])}</p><div id="pt-inline-gloss" class="pt-inline-gloss" hidden></div></div><div class="pt-review-box"><div class="pt-kicker">이해도 기록 · 스스로 복습 예약</div><p class="pt-review-caption">지금 이해한 정도를 선택해요. 기억력 검사나 검증된 학습효과 측정은 아니에요.</p><div class="pt-review-actions"><button type="button" data-understood="again">아직 어려워요 · 내일</button><button type="button" data-understood="okay">조금 이해했어요</button><button type="button" data-understood="easy">잘 설명할 수 있어요</button></div><p class="pt-review-status" role="status">${validReview(v.id)?'마지막 학습 '+esc(review[v.id].last)+' · 다음 복습 '+esc(review[v.id].due):'아직 이해도 기록이 없어요.'}</p></div><div class="pt-notice">3D는 해당 주제로 이동하며, 모든 구조의 1:1 해부학 위치나 실제 근활성 수치를 검증했다는 뜻은 아닙니다. 한국어 신·구용어 및 이 카드의 임상적 세부사항은 외부 교수 감수 전입니다.</div><div class="pt-lesson-actions"><button id="pt-to3d" class="pt-primary">관련 ${v.tab==='biomech'?'움직임·신경':'3D 학습'} 열기</button><a href="${esc(https(v.source))}" target="_blank" rel="noopener noreferrer" class="pt-source">관련 참고자료 확인 ↗</a></div>`;
  el.querySelector('#pt-bookmark').onclick=()=>{bookmarks.has(v.id)?bookmarks.delete(v.id):bookmarks.add(v.id);put('nv-pt-bookmarks',[...bookmarks]);courseDetail();renderStats();renderLessonList();};
  el.querySelector('#pt-done').onclick=()=>{done.has(v.id)?done.delete(v.id):done.add(v.id);put('nv-pt-learned',[...done]);courseDetail();renderStats();renderLessonList();};
  el.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{mode=b.dataset.mode;put('nv-pt-explain',mode);courseDetail();});
  el.querySelectorAll('[data-mini]').forEach(b=>b.onclick=()=>{
    const term=TERMS[b.dataset.mini];if(!term)return;
    const gloss=el.querySelector('#pt-inline-gloss');gloss.hidden=false;
    gloss.innerHTML=`<div class="pt-kicker">어려운 말 즉시 해설</div><h4>${esc(term[1])} <small>${esc(term[0])}</small></h4><div class="pt-terms"><div><span>구용어</span><strong>${esc(term[2])}</strong></div></div><div class="pt-mode"><button data-gloss-mode="easy" class="${mode==='easy'?'active':''}">아주 쉽게</button><button data-gloss-mode="expert" class="${mode==='expert'?'active':''}">전문적으로</button></div><p class="pt-inline-definition">${esc(mode==='easy'?term[3]:term[4])}</p><a class="pt-source" target="_blank" rel="noopener noreferrer" href="${esc(https(term[5]))}">관련 참고자료 ↗</a>`;
    gloss.querySelectorAll('[data-gloss-mode]').forEach(t=>t.onclick=()=>{
      gloss.querySelectorAll('[data-gloss-mode]').forEach(x=>x.classList.toggle('active',x===t));
      gloss.querySelector('.pt-inline-definition').textContent=t.dataset.glossMode==='easy'?term[3]:term[4];
    });
  });
  el.querySelectorAll('[data-understood]').forEach(b=>b.onclick=()=>rateLesson(v.id,b.dataset.understood));
  el.querySelector('#pt-to3d').onclick=()=>to3D(v);
 }
 function renderStats(){const el=root.querySelector('#pt-stat');if(!el)return;const doneNow=lessons.filter(x=>x.year===grade&&done.has(x.id)).length,total=lessons.filter(x=>x.year===grade).length;
  el.innerHTML=`<div class="pt-count"><strong>${doneNow}<small>/${total}</small></strong><span>선택 학년 학습 완료</span></div><div class="pt-progress" role="progressbar" aria-label="학습 진도" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${doneNow}"><div style="width:${total?100*doneNow/total:0}%"></div></div><p>${esc(GRADE_HINT[grade])}</p><div class="pt-review-summary"><strong>복습 예정: ${lessons.filter(x=>x.year===grade&&dueLesson(x.id)).length}개</strong><span>아직 기록하지 않은 카드: ${lessons.filter(x=>x.year===grade&&!validReview(x.id)).length}개</span><button type="button" id="pt-due-only" aria-pressed="${onlyDue}">${onlyDue?'전체 카드 보기':'복습할 카드만 보기'}</button></div>`;
  // 버튼은 여기서 만들어지므로 클릭 동작도 여기서 연결 (renderCourse에서 연결하면 null 오류)
  el.querySelector('#pt-due-only').onclick=()=>{onlyDue=!onlyDue;renderStats();renderLessonList();};
 }
 function renderLessonList(){const el=root.querySelector('#pt-lesson-list');if(!el)return;const q=search.toLocaleLowerCase();const filtered=lessons.filter(x=>x.year===grade&&(!onlyBookmarks||bookmarks.has(x.id))&&(!onlyDue||dueLesson(x.id))&&[x.en,x.new,x.old,x.category].some(y=>y.toLocaleLowerCase().includes(q)));
 el.innerHTML=filtered.length?filtered.map(v=>`<button type="button" data-lesson="${esc(v.id)}" class="pt-lesson ${chosen===v.id?'active':''}" aria-pressed="${chosen===v.id}"><span>${done.has(v.id)?'✓':'○'} ${esc(v.new)} ${dueLesson(v.id)?'⏰ 복습':''} ${bookmarks.has(v.id)?'★':''}</span><small>${esc(v.en)} · ${esc(v.category)}</small></button>`).join(''):'<p class="pt-small">조건에 맞는 카드가 없어요.</p>';
 el.querySelectorAll('[data-lesson]').forEach(b=>b.onclick=()=>{chosen=b.dataset.lesson;renderLessonList();courseDetail();});
 }
 function renderCourse(){root.innerHTML=`<div class="pt-hero"><div class="pt-kicker">PHYSICAL THERAPY · 1–4 YEAR</div><h2>기초부터 임상까지, 한 단계씩.</h2><p>어려운 용어는 3가지 이름으로, 설명은 두 모드로 나누고 3D에서 확인하세요.</p><div class="pt-tags"><span>32개 핵심 개념</span><span>해부학·운동학·평가·재활</span><span>학습 진도 저장</span></div></div><div class="pt-years" role="group" aria-label="학년 선택">${[1,2,3,4].map(y=>`<button data-year="${y}" class="${grade===y?'active':''}" aria-pressed="${grade===y}">${y}학년</button>`).join('')}</div><div id="pt-stat" class="pt-stat"></div><label class="pt-label" for="pt-find">개념 검색 (English · 신용어 · 구용어)</label><input type="search" id="pt-find" class="pt-input" value="${esc(search)}" placeholder="예: nerve, 신경, MRC, 근육"><div class="pt-lesson-actions"><button id="pt-only-bookmarks" aria-pressed="${onlyBookmarks}">${onlyBookmarks?'★ 저장한 카드만 보는 중':'☆ 북마크만 보기'}</button><button id="pt-clear" title="검색 지우기">검색 초기화</button></div><div id="pt-lesson-list" class="pt-lesson-list"></div><article id="pt-lesson-detail" class="pt-detail" aria-live="polite"></article>`;
  root.querySelectorAll('[data-year]').forEach(b=>b.onclick=()=>{grade=Number(b.dataset.year);put('nv-pt-year',grade);chosen=lessons.find(x=>x.year===grade)?.id;search='';onlyBookmarks=false;onlyDue=false;renderCourse();});
  root.querySelector('#pt-find').oninput=e=>{search=e.target.value;renderLessonList();};
  root.querySelector('#pt-only-bookmarks').onclick=()=>{onlyBookmarks=!onlyBookmarks;renderCourse();};
  root.querySelector('#pt-clear').onclick=()=>{search='';renderCourse();};
  if(!lessonMap[chosen]||lessonMap[chosen].year!==grade)chosen=lessons.find(x=>x.year===grade).id;
  renderStats();renderLessonList();courseDetail();
 }
 renderCourse();console.info('[NEUROVERSE RC15] years=4, lessons=',lessons.length,'national-exam module removed');
}
init().catch(e=>console.error('PT 학습실 로드 오류',e));
