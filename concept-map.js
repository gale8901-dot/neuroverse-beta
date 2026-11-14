// NEUROVERSE RC7 — concept-to-3D learning pathways
// All 3D positions are provided by the original viewer. This module does not invent anatomical coordinates.
const nodes={
 neuron:{en:'Neuron',new:'신경세포',old:'신경원',easy:'몸과 뇌 안에서 소식을 주고받는 아주 작은 세포예요. 전기 신호로 정보를 전해요.',expert:'신경세포는 세포체, 가지돌기, 축삭 등을 통해 전기화학적 신호를 수용·통합·전달하는 흥분성 세포다.',next:['cst','nerve'],location:'pathways',path:'cst'},
 cst:{en:'Corticospinal tract',new:'겉질척수로',old:'피질척수로',easy:'뇌에서 시작한 움직임 명령이 척수로 내려가는 길이에요.',expert:'대뇌겉질에서 기원해 속섬유막과 뇌줄기를 통과하고 숨뇌 하부에서 대부분의 섬유가 교차하는 주요 하행 운동경로다.',next:['brainstem','decussation','umn'],location:'pathways',path:'cst'},
 brainstem:{en:'Brainstem',new:'뇌줄기',old:'뇌간',easy:'뇌와 척수를 잇는 중요한 길목이에요. 숨 쉬기, 심장 박동 조절 등에도 관여해요.',expert:'중간뇌, 다리뇌, 숨뇌로 이루어진 중추신경계 구조. 상행·하행로와 다수의 뇌신경핵, 생명유지 관련 회로를 포함한다.',next:['medulla','decussation'],location:'anatomy',region:'brainstem'},
 medulla:{en:'Medulla oblongata',new:'숨뇌',old:'연수',easy:'뇌줄기 가장 아래쪽 부분이에요. 몸의 중요한 기능을 조절하고 움직임 명령이 건너가는 길목이 있어요.',expert:'숨뇌는 다리뇌와 척수 사이에 위치하며 피라미드, 올리브, 호흡·심혈관 관련 핵과 회로를 포함한다.',next:['decussation'],location:'anatomy',region:'brainstem'},
 decussation:{en:'Pyramidal decussation',new:'피라미드교차',old:'추체교차',easy:'뇌에서 내려온 움직임 명령 길의 대부분이 숨뇌 아래에서 반대편으로 건너가는 곳이에요.',expert:'피질척수로 섬유 대부분이 꼬리쪽 숨뇌에서 반대측으로 교차해 가쪽겉질척수로를 형성하는 현상이다.',next:['umn','lesion'],location:'pathways',path:'cst'},
 umn:{en:'Upper motor neuron syndrome',new:'위운동신경세포 징후',old:'상위운동신경원 징후',easy:'뇌에서 몸으로 내려가는 움직임 조절 길이 다치면 힘이 빠지고 반사가 달라질 수 있어요. 시간이 지나면서 뻣뻣해질 수도 있어요.',expert:'상위 운동계 손상에서 수의운동 약화, 심부건반사 항진, 경직, 병적 반사 등이 나타날 수 있으나 급성기에는 이완성과 저반사가 동반될 수 있다.',next:['lesion'],location:'pathways',path:'cst'},
 lesion:{en:'Stroke / Motor impairment',new:'뇌졸중과 운동장애',old:'뇌졸중과 운동장애',easy:'뇌의 움직임 길이 다치면 팔이나 다리에 힘이 약해질 수 있어요. 갑자기 이런 증상이 생기면 바로 119에 알려야 해요.',expert:'허혈 또는 출혈에 의한 뇌 병변은 신경해부학적 위치 및 크기에 따라 편측 위약, 실어증, 감각장애 등의 국소 신경학적 증후군을 유발할 수 있다.',next:['rehab'],location:'clinical'},
 rehab:{en:'Neurorehabilitation',new:'신경계 재활',old:'신경계 재활',easy:'뇌나 신경을 다친 사람이 다시 걷고 움직이는 연습을 안전하게 할 수 있도록 돕는 과정이에요.',expert:'신경계 재활은 기능적 목표와 개별 평가 결과에 근거해 과제지향훈련, 운동학습, 보행·균형 중재 등 다양한 접근을 조합한다.',next:['movement'],location:'biomech'},
 movement:{en:'Joint movement',new:'관절운동',old:'관절운동',easy:'팔꿈치를 굽히거나 무릎을 펴는 것처럼 몸의 뼈 사이에서 일어나는 움직임이에요.',expert:'관절운동은 관절축·운동면, 근육의 관절모멘트, 외부 부하와 신경근 조절의 상호작용으로 발생한다.',next:['muscle','nerve'],location:'biomech'},
 muscle:{en:'Agonist / Synergist / Antagonist',new:'주동근·협력근·길항근',old:'주동근·협동근·길항근',easy:'몸을 움직일 때 중심이 되는 근육, 옆에서 돕는 근육, 반대 방향으로 조절을 돕는 근육이 함께 일해요.',expert:'과제별 주동근·협력근·길항근의 기여는 관절각, 부하, 수축 속도 및 과제 목적에 따라 변한다. 색상 강조는 실제 근전도 측정값이 아니다.',next:['nerve'],location:'biomech'},
 nerve:{en:'Nerve root / Plexus / Branch',new:'신경뿌리·신경얼기·가지',old:'신경근·신경총·분지',easy:'척수에서 나온 신경은 여러 길로 나뉘거나 합쳐져 팔·다리까지 소식을 전달해요.',expert:'척수신경의 앞·뒤뿌리와 척수신경 앞가지, 신경얼기의 root·trunk·division·cord·terminal branch는 해부학적으로 구분해야 한다.',next:['movement'],location:'biomech'}
};
const paths=[
 {name:'뇌에서 몸까지 움직임 명령',items:['neuron','cst','brainstem','medulla','decussation','umn','lesion','rehab']},
 {name:'움직임에서 근육·신경까지',items:['movement','muscle','nerve']}
];
const safe=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let selected='cst',level='easy',route=0;
function mount(){
 const nav=document.querySelector('nav.tabs'), scroll=document.querySelector('.scroll');
 if(!nav||!scroll)return;
 const tab=document.createElement('button');tab.textContent='개념 연결 3D';tab.dataset.tab='conceptmap';tab.type='button';nav.append(tab);
 const sec=document.createElement('section');sec.id='conceptmap';sec.className='hidden';scroll.append(sec);
 tab.addEventListener('click',()=>{
  document.querySelectorAll('nav.tabs button').forEach(b=>b.classList.toggle('active',b===tab));
  scroll.querySelectorAll(':scope > section').forEach(s=>s.classList.toggle('hidden',s!==sec));
  const title=document.getElementById('view-title');if(title)title.textContent='개념 → 해부학 → 임상 → 3D 연결 학습';
  render();
 });
 nav.querySelectorAll('button:not([data-tab="conceptmap"])').forEach(b=>b.addEventListener('click',()=>sec.classList.add('hidden')));
 function go3D(key){
  const n=nodes[key];if(!n)return;
  let b=document.querySelector(`nav.tabs [data-tab="${n.location}"]`);if(!b)return;
  b.click();
  if(n.region){document.querySelector(`[data-region="${n.region}"]`)?.click();}
  if(n.path){document.querySelector(`[data-path="${n.path}"]`)?.click();}
  if(n.location==='biomech'){document.querySelector('[data-bmode="movement"]')?.click();}
 }
 function render(){
  const active=nodes[selected],path=paths[route];
  sec.innerHTML=`<div class="academy-hero"><strong>개념 연결 3D 학습실</strong><p>어려운 용어가 나와도 멈추지 않도록, 상위 개념부터 신경경로·임상까지 순서대로 연결했어요. 3D 화면은 기존 원본 모델을 사용합니다.</p></div>
  <div class="academy-toggle">${paths.map((x,i)=>`<button type="button" data-route="${i}" class="${i===route?'active':''}">${safe(x.name)}</button>`).join('')}</div>
  <div class="concept-chain" aria-label="연결 학습 단계">${path.items.map((k,i)=>`<button type="button" data-node="${k}" class="${k===selected?'active':''}"><small>${i+1}단계</small><b>${safe(nodes[k].new)}</b></button>`).join('')}</div>
  <div class="academy-card"><h3>${safe(active.new)}</h3><div class="academy-terms"><span>English</span><b>${safe(active.en)}</b><span>한국어 신용어</span><b>${safe(active.new)}</b><span>한국어 구용어</span><b>${safe(active.old)}</b></div>
  <div class="academy-toggle" role="group" aria-label="해설의 난이도"><button type="button" class="${level==='easy'?'active':''}" data-level="easy">아주 쉬운 설명</button><button type="button" class="${level==='expert'?'active':''}" data-level="expert">전문 설명</button></div>
  <div class="academy-explanation ${level==='expert'?'expert':''}"><strong>${level==='easy'?'초등학생도 이해하는 설명':'학부생을 위한 전문 해설'}</strong><div style="margin-top:7px">${safe(active[level])}</div></div>
  <button class="academy-action" type="button" id="concept-to3d">${active.location==='biomech'?'관련 근골격·신경 3D 보기':'관련 원본 3D 구조 보기'}</button>
  <div class="label">다음에 공부할 개념</div><div class="academy-term-list">${active.next.map(k=>`<button type="button" data-node="${k}">${safe(nodes[k]?.new||k)}</button>`).join('')}</div>
  <div class="academy-sources"><span class="academy-pill pending">용어집 전수 대조 전</span><span class="academy-pill pending">외부 교수 감수 전</span><p>연결 학습의 개념 설명은 교육용 초안입니다. 3D 경로의 실제 정합성, 근활성량, 신경분지는 별도 검증이 필요합니다.</p><p>참고할 기관: <a target="_blank" rel="noopener noreferrer" href="https://ifaa.net/committees/anatomical-terminology-fipat/fipat-ifaa-terminologies/">FIPAT</a> · <a target="_blank" rel="noopener noreferrer" href="https://www.ncbi.nlm.nih.gov/books/">NCBI Bookshelf</a></p></div></div>`;
  sec.querySelectorAll('[data-node]').forEach(b=>b.addEventListener('click',()=>{selected=b.dataset.node;render()}));
  sec.querySelectorAll('[data-route]').forEach(b=>b.addEventListener('click',()=>{route=Number(b.dataset.route);selected=paths[route].items[0];render()}));
  sec.querySelectorAll('[data-level]').forEach(b=>b.addEventListener('click',()=>{level=b.dataset.level;render()}));
  sec.querySelector('#concept-to3d')?.addEventListener('click',()=>go3D(selected));
 }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
