/** NEUROVERSE RC5 — 계통별 학습 지도. 기존 3D·학년별 콘텐츠를 연결하며 결손을 숨기지 않음. */
const nvEsc = s=>String(s??'').replace(/[&<>"']/g,k=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[k]));
async function initSystemsCatalog(){
 const nav=document.querySelector('nav.tabs'),scroller=document.querySelector('.scroll');
 if(!nav||!scroller)return;
 let systemData,courseData;
 try{
   const [a,b]=await Promise.all([fetch('./data/systems-catalog.json'),fetch('./data/pt-course.json')]);
   if(!a.ok||!b.ok)throw Error('학습파일 HTTP 오류');
   [systemData,courseData]=await Promise.all([a.json(),b.json()]);
 }catch(err){console.error('[NEUROVERSE systems]',err);return;}
 const course=Object.fromEntries(courseData.lessons.map(l=>[l.id,l]));
 const systems=systemData.systems;
 const added=document.createElement('section');added.id='pt-systems';added.className='hidden nv-systems';added.setAttribute('aria-label','인체 계통별 전공 학습 지도');scroller.appendChild(added);
 const b=document.createElement('button');b.type='button';b.dataset.tab='pt-systems';b.textContent='계통별 전공지도';nav.appendChild(b);
 let selected=systems[0].id,year='all',search='';
 const selectSystem=id=>{if(systems.some(s=>s.id===id)){selected=id;render();}};
 const switchTab=tab=>{nav.querySelector(`button[data-tab="${tab}"]`)?.click();};
 const openLesson=id=>{
   const l=course[id];if(!l)return;
   switchTab('pt-course');
   const yearBtn=scroller.querySelector(`#pt-course [data-year="${l.year}"]`);
   yearBtn?.click();
   const lessonBtn=scroller.querySelector(`#pt-course [data-lesson="${id}"]`);
   lessonBtn?.click();
   scroller.querySelector('#pt-lesson-detail')?.scrollIntoView({block:'nearest'});
 };
 b.addEventListener('click',()=>{
   nav.querySelectorAll('button[data-tab]').forEach(x=>x.classList.toggle('active',x===b));
   scroller.querySelectorAll(':scope > section').forEach(s=>s.classList.toggle('hidden',s!==added));
   document.querySelector('#view-title').textContent='계통별 물리치료 전공지도 · 학년별 연계';
   render();
 });
 nav.addEventListener('click',e=>{
   const button=e.target.closest('button[data-tab]');
   if(button&&button!==b)added.classList.add('hidden');
 },true);
 function render(){
   const cur=systems.find(s=>s.id===selected)||systems[0];
   const available=cur.lessons.map(id=>course[id]).filter(Boolean);
   const filtered=available.filter(l=>(year==='all'||l.year===Number(year))&&[l.en,l.new,l.old,l.category].some(x=>String(x).toLocaleLowerCase().includes(search.toLocaleLowerCase())));
   const ready=systems.filter(s=>s.lessons.length).length;
   const completed=(()=>{try{return new Set(JSON.parse(localStorage.getItem('nv-pt-learned'))||[]);}catch{return new Set();}})();
   added.innerHTML=`<div class="pt-hero"><div class="pt-kicker">SYSTEM-BASED CURRICULUM · RC5</div><h2>계통에서 시작해, 1학년 기초부터 임상까지</h2><p>뇌·신경·근육·평가를 따로 외우지 않고 연결해 배웁니다. 미구현 계통은 숨기지 않고 공개합니다.</p><div class="pt-tags"><span>계통 ${systems.length}개</span><span>학습 카드 연결 ${courseData.lessons.length}개</span><span>콘텐츠 보유 ${ready}계통</span></div></div>
   <div class="nv-system-grid" role="group" aria-label="계통 선택">${systems.map(s=>`<button type="button" data-system="${nvEsc(s.id)}" class="nv-system-btn ${selected===s.id?'active':''}" aria-pressed="${selected===s.id}"><strong>${nvEsc(s.name)}</strong><small>${nvEsc(s.en)}</small><span>${s.lessons.length?s.lessons.length+'개 카드':'학습 카드 준비 중'}</span></button>`).join('')}</div>
   <article class="pt-detail nv-sys-focus"><div class="pt-kicker">선택 계통</div><h3>${nvEsc(cur.name)} <small>${nvEsc(cur.en)}</small></h3><p>${nvEsc(cur.intro)}</p><div class="pt-notice">${nvEsc(cur.limitation)}</div><div class="pt-lesson-actions"><button id="nv-open-3d" class="pt-primary" type="button">${cur.previewTab==='systems'?'현재 인체 3D 열기':'연결된 3D 화면 열기'}</button><button id="nv-open-course" type="button">1–4학년 전체 학습 열기</button></div></article>
   <div class="pt-detail"><h3>이 계통에 연결된 실제 학습 카드 <small>(${filtered.length}/${available.length})</small></h3><div class="nv-system-filters"><label>학년 <select id="nv-system-year"><option value="all">전체 학년</option>${[1,2,3,4].map(n=>`<option value="${n}" ${String(year)===String(n)?'selected':''}>${n}학년</option>`).join('')}</select></label><label>용어 검색 <input id="nv-system-search" type="search" placeholder="English · 신용어 · 구용어" value="${nvEsc(search)}"></label></div>${available.length?`<div class="nv-sys-list">${filtered.length?filtered.map(l=>`<button type="button" data-system-lesson="${nvEsc(l.id)}" class="nv-sys-lesson"><b>${completed.has(l.id)?'✓':'○'} ${nvEsc(l.new)}</b><small>${nvEsc(l.en)} · ${l.year}학년 · ${nvEsc(l.category)}</small></button>`).join(''):'<p class="pt-small">해당 학년과 검색어에 맞는 카드가 없어요.</p>'}</div>`:'<div class="pt-notice">아직 이 계통의 단계별 전문/쉬운 해설 카드가 없습니다. 다른 계통의 임시 자료를 실제 완료 콘텐츠처럼 표시하지 않습니다.</div>'}</div>
   <p class="pt-small">현황: 계통 분류는 길잡이 기능이며, 이 목록은 4년제 전 과목 전체를 담은 것이 아닙니다. 전문·쉬운 설명과 영어·신용어·구용어는 실제 학습 카드를 열면 볼 수 있습니다.</p>`;
   added.querySelectorAll('[data-system]').forEach(x=>x.onclick=()=>{year='all';search='';selectSystem(x.dataset.system);});
   added.querySelector('#nv-open-3d').onclick=()=>switchTab(cur.previewTab);
   added.querySelector('#nv-open-course').onclick=()=>switchTab('pt-course');
   added.querySelector('#nv-system-year').onchange=e=>{year=e.target.value;render();};
   added.querySelector('#nv-system-search').oninput=e=>{const val=e.target.value;search=val;render();const input=added.querySelector('#nv-system-search');input?.focus();input?.setSelectionRange(val.length,val.length);};
   added.querySelectorAll('[data-system-lesson]').forEach(x=>x.onclick=()=>openLesson(x.dataset.systemLesson));
 }
 render();
 console.info('[NEUROVERSE RC5]',systems.length,'systems',courseData.lessons.length,'lesson links');
}
initSystemsCatalog().catch(err=>console.error('[NEUROVERSE RC5]',err));
