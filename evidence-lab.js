/** NEUROVERSE RC3 evidence and reviewer transparency panel. Educational use only. */
const esc=(x)=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
async function initEvidence(){
 const nav=document.querySelector('nav.tabs'),scroll=document.querySelector('.scroll');if(!nav||!scroll)return;
 const btn=document.createElement('button');btn.dataset.tab='evidence';btn.textContent='근거·검증실';btn.type='button';nav.append(btn);
 const root=document.createElement('section');root.id='evidence';root.className='hidden';root.innerHTML='<div class="academy-card">근거 자료를 읽는 중입니다…</div>';scroll.append(root);
 let data;
 try{const r=await fetch('./data/evidence.json');if(!r.ok)throw Error('HTTP '+r.status);data=await r.json();}catch(e){root.innerHTML='<p class="academy-warn">검증 데이터를 읽을 수 없습니다. 로컬 서버 연결을 확인하세요.</p>';return;}
 let query='',filter='전체',mode='easy',selected=data.claims[0]?.id;
 const groups=['전체',...new Set(data.claims.map(c=>c.area))];
 const sourceLink=(s)=>`<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)}</a>`;
 const go=(c)=>{if(!c.go)return;const t=document.querySelector(`[data-tab="${c.go}"]`);t?.click();if(c.go==='pathways')document.querySelector('[data-path="cst"]')?.click();if(c.go==='biomech')document.querySelector('[data-bmov="elbow_flex"]')?.click();if(c.go==='pathways')document.querySelector('#nv53-original-paths')?.setAttribute('open','');};
 function draw(){
  const hits=data.claims.filter(c=>(filter==='전체'||c.area===filter)&&(!query||[c.title,c.en,c.new,c.old,c.easy,c.expert].join(' ').toLocaleLowerCase().includes(query.toLocaleLowerCase())));
  const chosen=data.claims.find(c=>c.id===selected)||hits[0];
  root.innerHTML=`<div class="academy-hero"><strong>의학·물리치료 근거 검증실</strong><p>권위 자료와 대조한 핵심 개념 ${data.claims.length}건을 확인할 수 있어요. <b>문헌의 관련 내용을 확인한 것과 실제 교수의 독립 검수 완료는 다릅니다.</b></p><div class="academy-stat"><div><b>${data.claims.length}</b>핵심 주장 대조</div><div><b>${Object.keys(data.sources).length}</b>문헌/표준 출처</div><div><b>0</b>독립 교수 검수</div></div></div><div class="academy-card"><h3>현재 검증 상태</h3><p>✅ 핵심 개념의 문헌 대조 · ⚠️ 한국어 용어집 개별 대조 미완료 · ⚠️ 3D 신경/근육의 좌표 정합성 미완료 · ⚠️ 교수·임상가 독립 검수 미완료 · ⚠️ 교육효과 연구 미완료</p><p class="academy-warn">사실과 교육용 단순화, 실제 측정과 애니메이션을 구별합니다. 의학적 판단/치료 지시용 자료가 아닙니다.</p></div><label class="label" for="ev-search">근거 카드 검색</label><input class="academy-input" id="ev-search" value="${esc(query)}" placeholder="예: 피라미드, C5, 근전도, 보행훈련"><div class="academy-filterbar" id="ev-filters">${groups.map(g=>`<button type="button" class="${g===filter?'active':''}" data-ev-filter="${esc(g)}" aria-pressed="${g===filter}">${esc(g)}</button>`).join('')}</div><div class="academy-term-list" id="ev-list">${hits.map(c=>`<button type="button" class="${selected===c.id?'active':''}" data-ev-id="${esc(c.id)}">${esc(c.title)} <span class="academy-compact">${esc(c.id)}</span></button>`).join('')||'<p>검색 결과가 없습니다.</p>'}</div><div class="academy-card" id="ev-detail">${chosen?`<h3>${esc(chosen.title)}</h3><div class="academy-terms"><span>English</span><b>${esc(chosen.en)}</b><span>한국어 신용어(대조 전)</span><b>${esc(chosen.new)}</b><span>한국어 구용어(대조 전)</span><b>${esc(chosen.old)}</b></div><div class="academy-toggle" role="group" aria-label="설명 선택"><button type="button" data-ev-mode="easy" class="${mode==='easy'?'active':''}" aria-pressed="${mode==='easy'}">초등학생도 이해할 설명</button><button type="button" data-ev-mode="expert" class="${mode==='expert'?'active':''}" aria-pressed="${mode==='expert'}">전공자 전문 설명</button></div><div class="academy-explanation ${mode==='expert'?'expert':''}"><b>${mode==='expert'?'전문 설명':'아주 쉬운 설명'}</b><p>${esc(chosen[mode])}</p></div><p class="academy-warn">주의: ${esc(chosen.risk)}</p><p class="academy-compact">검증 현황: ${esc(chosen.reviewStatus)} · ${esc(chosen.termStatus)} · ${esc(chosen.modelStatus)}</p><div class="academy-actions"><button type="button" class="academy-action" data-ev-go="${esc(chosen.id)}">관련 학습 화면으로 이동</button>${chosen.id.startsWith("CST-")?`<button type="button" class="academy-action" data-ev-brain>원본 3D 뇌줄기 관찰</button>`:""}</div><p class="academy-warn">근거 카드의 경로 전체와 말초 주행은 정확한 3D 좌표로 구현되어 있지 않습니다. 관련 뇌 구조만 원본 GLB에서 표시합니다.</p><div class="academy-sources"><strong>내용 대조 문헌</strong><ul>${chosen.sources.map(s=>`<li>${sourceLink(s)}<div class="academy-compact">${esc(s.authority)} · ${esc(s.scope)}</div></li>`).join('')}</ul></div>`:'<p>항목을 선택하세요.</p>'}</div><div class="academy-card"><h3>정식 배포를 위한 미해결 검증</h3><p>① 국내 표준 신·구용어 전수 대조 ② 원본 뇌·근골격/신경 GLB–아틀라스 좌표 정합 검증 ③ 신경·근육별 기능과 근거의 문장 단위 검토 ④ 모델 재배포 라이선스 조사 ⑤ 보건·의대생 학습효과 시험 ⑥ 실제 교수·임상 PT 외부 감수.</p><p>이 검증이 끝나기 전에는 정식 공인 교육교재 또는 교수 감수 완료로 표기하지 않습니다.</p></div>`;
  const inp=root.querySelector('#ev-search');inp?.addEventListener('input',e=>{query=e.target.value;const pos=e.target.selectionStart;draw();const x=root.querySelector('#ev-search');x.focus();x.setSelectionRange(pos,pos)});
  root.querySelectorAll('[data-ev-filter]').forEach(el=>el.addEventListener('click',()=>{filter=el.dataset.evFilter;draw()}));
  root.querySelectorAll('[data-ev-id]').forEach(el=>el.addEventListener('click',()=>{selected=el.dataset.evId;draw()}));
  root.querySelectorAll('[data-ev-mode]').forEach(el=>el.addEventListener('click',()=>{mode=el.dataset.evMode;draw()}));
  root.querySelector('[data-ev-go]')?.addEventListener('click',()=>{if(chosen)go(chosen)});
  root.querySelector('[data-ev-brain]')?.addEventListener('click',()=>{document.querySelector('[data-tab="anatomy"]')?.click();document.querySelector('[data-region="brainstem"]')?.click();});
 }
 btn.addEventListener('click',()=>{
  document.querySelectorAll('nav.tabs button').forEach(el=>el.classList.toggle('active',el===btn));
  for(const section of scroll.querySelectorAll(':scope > section'))section.classList.toggle('hidden',section!==root);
  const title=document.getElementById('view-title');if(title)title.textContent='문헌 출처 · 교육 정확성 · 검증 상태';draw();
 });
 // Event handling: existing routes still work and close the evidence page on navigation.
 nav.querySelectorAll('button:not([data-tab="evidence"])').forEach(el=>el.addEventListener('click',()=>root.classList.add('hidden')));
 draw();console.info('NEUROVERSE 근거 검증실',data.claims.length,'claims');
}
initEvidence().catch(e=>console.error('근거 검증실 실행 오류',e));
