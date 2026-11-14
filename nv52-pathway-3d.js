// NEUROVERSE RC52: documented, *schematic* 3D neural relay visualization.
// This draws genuine interactive THREE.Geometry and meshes but DOES NOT encode anatomical coordinates.
// Upper and lower motor-neuron segments are intentionally distinct; the corticospinal tract
// terminates in spinal cord, and the peripheral course belongs to a separate lower motor neuron.

const CST = [
 ['일차운동겉질 (BA 4)','대뇌겉질에서 수의운동 명령이 내려갑니다.','중추',[-.76,2.04,.08],'frontal'],
 ['속섬유막 뒤다리','하행 운동섬유가 좁은 백질 다발을 통과합니다.','중추',[-.78,1.65,-.11]],
 ['중간뇌 대뇌다리','중간뇌 앞쪽의 대뇌다리를 지납니다.','중추',[-.70,1.30,.05],'brainstem'],
 ['다리뇌 바닥부분','섬유가 다리뇌를 통과하며 아래쪽으로 향합니다.','중추',[-.72,.98,-.07],'brainstem'],
 ['숨뇌 피라미드','숨뇌 앞쪽의 피라미드를 내려갑니다.','중추',[-.64,.60,.04],'brainstem'],
 ['숨뇌 피라미드교차','많은 섬유가 아래쪽 숨뇌에서 반대쪽으로 교차합니다.','교차',[.04,.25,.16],'brainstem'],
 ['가쪽겉질척수로','교차한 상위운동신경세포 축삭이 척수 가쪽 백색질을 내려갑니다.','중추',[.60,-.34,-.07]],
 ['척수 앞뿔의 운동 회로','사이신경세포 또는 아래운동신경세포로 전달됩니다. 상위·아래운동신경세포의 경계입니다.','중계',[.58,-.97,.08]],
 ['앞뿌리 (운동신경 섬유)','아래운동신경세포의 축삭이 척수 앞뿌리로 나옵니다.','말초',[1.12,-1.30,.11]],
 ['팔신경얼기 (상지 예시)','상지 운동신경은 척수신경 앞가지에서 형성되는 팔신경얼기를 거칩니다.','말초',[1.60,-1.54,.16]],
 ['근육피부신경 (상지 예시)','근육피부신경은 위팔두갈래근 등을 지배합니다.','말초',[2.06,-1.77,.05]],
 ['신경근접합부 → 위팔두갈래근','운동신경 말단이 근섬유와 신호를 주고받아 수축을 유도합니다.','말초',[2.54,-1.97,-.03]]
];
const DCML = [
 ['손끝의 기계감각 수용기','정교촉각·진동 등의 감각이 시작됩니다.','말초',[-2.14,-1.94,.12]],
 ['말초감각신경 (상지 예시)','상지 말초신경을 따라 신호가 척수 쪽으로 전달됩니다.','말초',[-1.67,-1.72,-.04]],
 ['뒤뿌리신경절 (DRG)','첫째 감각신경세포의 세포체가 있습니다.','중계',[-1.26,-1.48,.1]],
 ['뒤뿌리 → 척수 뒤기둥','같은 쪽 뒤기둥의 쐐기다발(상지 예시)을 따라 상행합니다.','중추',[-.72,-.80,-.10]],
 ['숨뇌 쐐기다발핵','숨뇌에서 둘째 신경세포로 중계합니다.','중계',[-.65,.37,.04],'brainstem'],
 ['숨뇌 안쪽활꼴섬유 교차','중계 후 반대편으로 교차합니다.','교차',[.03,.65,.16],'brainstem'],
 ['안쪽섬유띠','뇌줄기를 통과하여 시상 쪽으로 올라갑니다.','중추',[.70,1.18,-.08],'brainstem'],
 ['시상 VPL','셋째 신경세포로 중계됩니다.','중계',[.83,1.60,.04],'thalamus'],
 ['일차몸감각겉질 (BA 3·1·2)','중심뒤이랑의 감각겉질에서 감각을 처리합니다.','중추',[1.08,2.04,.13],'parietal']
];
const STT = [
 ['손끝의 통각·온도 수용기','위험한 열이나 손상을 감지합니다.','말초',[-2.12,-1.94,.09]],
 ['말초감각신경','감각 신호가 말초신경을 통해 척수로 갑니다.','말초',[-1.67,-1.74,.02]],
 ['뒤뿌리신경절 (DRG)','첫째 감각신경세포의 세포체가 있습니다.','중계',[-1.26,-1.48,.11]],
 ['척수 뒤뿔','척수에 들어온 감각 신호가 둘째 신경세포로 중계됩니다.','중계',[-.78,-1.19,-.09]],
 ['척수 앞백색맞교차','둘째 신경세포의 축삭이 척수 안에서 반대편으로 교차합니다.','교차',[.06,-1.02,.16]],
 ['반대쪽 앞가쪽계','척수시상로를 포함하는 경로가 위로 올라갑니다.','중추',[.68,-.37,-.08]],
 ['뇌줄기 상행 경로','척수시상로 관련 신호가 뇌줄기를 지나갑니다.','중추',[.74,.73,.04],'brainstem'],
 ['시상 VPL 등','감각 신호가 시상핵으로 전달됩니다.','중계',[.83,1.57,-.08],'thalamus'],
 ['일차몸감각겉질 등','감각 식별 및 관련 피질 처리에 관여합니다.','중추',[1.08,2.03,.12],'parietal']
];
export const RC52_ROUTE_DATA = Object.freeze({
 cst:{title:'겉질척수로 → 말초운동신경',steps:CST,source:'https://www.ncbi.nlm.nih.gov/books/NBK534818/'},
 dcml:{title:'뒤기둥–안쪽섬유띠 경로',steps:DCML,source:'https://www.ncbi.nlm.nih.gov/books/NBK11142/'},
 stt:{title:'척수시상로',steps:STT,source:'https://www.ncbi.nlm.nih.gov/books/NBK546614/'}
});

export function createPathway3D(api){
 const {THREE,scene,stage,renderer,cam,controls,pathLayer,pathDetails,getBrain,getTab,syncRaw,resetView} = api;
 const holder=new THREE.Group();holder.name='RC52 - Educational 3D relay, no atlas coordinates';holder.visible=false;scene.add(holder);
 const dots=[];let curves=[];let flow=null;let routeId='cst',selectedIndex=0,active=false;
 const ray = new THREE.Raycaster();const pointer = new THREE.Vector2();
 const bar=document.getElementById('nv52-stagebar');
 const title=document.getElementById('nv52-stage-name');
 const number=document.getElementById('nv52-stage-count');
 const rows=document.getElementById('nv53-route-steps');
 const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches||false;
 const palette={중추:0x5acde5,교차:0xe9db9e,중계:0x9e9efa,말초:0xf2b46f};
 function clean(){
  for(const obj of [...holder.children]){holder.remove(obj);obj.traverse?.(n=>{n.geometry?.dispose();if(n.material){for(const m of (Array.isArray(n.material)?n.material:[n.material])){m.map?.dispose();m.dispose()}}});}
  dots.length=0;curves=[];flow=null;
 }
 const pos=a=>new THREE.Vector3(a[0],a[1],a[2]);
 function sphere(r,color,opacity=1){return new THREE.Mesh(new THREE.SphereGeometry(r,16,12),new THREE.MeshStandardMaterial({color,roughness:.5,emissive:color,emissiveIntensity:opacity===1?.16:.04,transparent:opacity<1,opacity,depthWrite:opacity===1}));}
 function context(){
  // Translucent spatial reference shapes, NOT anatomically shaped organs or true locations.
  const head=sphere(.44,0x486584,.12);head.scale.set(1.25,1.0,.9);head.position.set(0,1.67,-.65);holder.add(head);
  const cord=new THREE.Mesh(new THREE.CylinderGeometry(.15,.15,1.62,18),new THREE.MeshStandardMaterial({color:0x496982,transparent:true,opacity:.13,depthWrite:false,side:THREE.DoubleSide}));cord.position.set(0,-.45,-.57);holder.add(cord);
  const mid=new THREE.Line(new THREE.BufferGeometry().setFromPoints([pos([0,-1.48,-.44]),pos([0,1.92,-.44])]),new THREE.LineDashedMaterial({color:0x7390ae,dashSize:.07,gapSize:.08,transparent:true,opacity:.36}));mid.computeLineDistances();holder.add(mid);
  const geo=new THREE.BufferGeometry().setFromPoints([pos([-2.4,-2.22,-.52]),pos([2.9,-2.22,-.52])]);holder.add(new THREE.Line(geo,new THREE.LineBasicMaterial({color:0x496d88,transparent:true,opacity:.35})));
 }
 function rebuild(){
  clean();context();const nodes=RC52_ROUTE_DATA[routeId].steps;
  for(let i=0;i<nodes.length;i++){
   const [label,detail,phase,xyz]=nodes[i];
   const marker=sphere(.068,palette[phase]||0x5acde5);
   marker.position.copy(pos(xyz));marker.userData.nv52Step=i;holder.add(marker);dots.push(marker);
   if(i){
    const a=pos(nodes[i-1][3]),b=pos(xyz),diff=b.clone().sub(a);
    const curve=new THREE.CatmullRomCurve3([a,a.clone().add(diff.clone().multiplyScalar(.30)).add(new THREE.Vector3(0,0,.05)),a.clone().add(diff.clone().multiplyScalar(.7)).add(new THREE.Vector3(0,0,.06)),b]);
    const material=new THREE.MeshBasicMaterial({color:palette[phase]||0x62cce9,transparent:true,opacity:.80});
    const pipe=new THREE.Mesh(new THREE.TubeGeometry(curve,18,.019,6,false),material);holder.add(pipe);
    curves.push(curve);
   }
  }
  flow=sphere(.048,0xffffff);holder.add(flow);
  select(selectedIndex);
 }
 function select(index){
  const nodes=RC52_ROUTE_DATA[routeId].steps;selectedIndex=Math.max(0,Math.min(index,nodes.length-1));
  dots.forEach((dot,i)=>{dot.scale.setScalar(i===selectedIndex?1.65:1);dot.material.emissiveIntensity=i===selectedIndex?.5:.16});
  const current=nodes[selectedIndex];title.textContent=current[0];number.textContent=`${selectedIndex+1} / ${nodes.length} · 교육용 3D 개념도`;
  [...rows.children].forEach((row,i)=>{
   row.classList.toggle('nv52-active',i===selectedIndex);
   row.setAttribute('aria-current',i===selectedIndex?'step':'false');
   row.tabIndex=0;row.setAttribute('role','button');
   row.setAttribute('aria-label',`${i+1}번 ${nodes[i]?.[0]} 3D 보기`);
  });
  const selectedRow=rows.children[selectedIndex];
  if(selectedRow){selectedRow.title=current[1];}
  // RC53: let the compact learning panel follow 3D marker clicks and stage arrows.
  window.dispatchEvent(new CustomEvent('nv52-step-change',{detail:{route:routeId,index:selectedIndex,total:nodes.length,name:current[0],description:current[1],phase:current[2]}}));
 }
 function setRoute(key){if(!RC52_ROUTE_DATA[key])return;routeId=key;selectedIndex=0;rebuild();sync();}
 function sync(){
  const inRoute=getTab()==='pathways';const show=false;/* 별자리 같은 3D 경로 표시는 쓰지 않음 */
  holder.visible=show;bar.hidden=!show;
  if(show){const brain=getBrain();if(brain)brain.visible=false;pathLayer.visible=false;}
  else if(inRoute){
   const brain=getBrain();if(brain)brain.visible=true;
   syncRaw();
  }
  if(show&&!active){controls.target.set(.20,0,0);cam.position.set(1.8,.45,8.4);controls.update();}
  if(inRoute&&pathDetails.open&&active){resetView(false);}
  active=show;
 }
 function onPick(event){
  if(!holder.visible)return;
  if(!renderer.domElement.contains(event.target)&&event.target!==renderer.domElement)return;
  const rect=renderer.domElement.getBoundingClientRect();
  if(!rect.width||!rect.height)return;
  pointer.set((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1);
  ray.setFromCamera(pointer,cam);
  const result=ray.intersectObjects(dots,false)[0];
  if(result&&Number.isInteger(result.object.userData.nv52Step))select(result.object.userData.nv52Step);
 }
 rows.addEventListener('click',event=>{if(event.target.closest('button,a'))return;const row=event.target.closest('.nv53-route-step');if(!row)return;const idx=[...rows.children].indexOf(row);if(idx>=0)select(idx)});
 rows.addEventListener('keydown',event=>{if(event.target.closest('button,a'))return;if(!['Enter',' '].includes(event.key))return;const row=event.target.closest('.nv53-route-step');if(!row)return;event.preventDefault();select([...rows.children].indexOf(row))});
 new MutationObserver(()=>{if(getTab()==='pathways')select(selectedIndex)}).observe(rows,{childList:true});
 window.addEventListener('nv54-route',event=>{queueMicrotask(()=>setRoute(event.detail))});
 document.querySelector('[data-nv52-prev]').addEventListener('click',()=>select(selectedIndex-1));
 document.querySelector('[data-nv52-next]').addEventListener('click',()=>select(selectedIndex+1));
 let pointerStart=null;
 renderer.domElement.addEventListener('pointerdown',event=>{pointerStart={x:event.clientX,y:event.clientY,id:event.pointerId}});
 renderer.domElement.addEventListener('pointerup',event=>{if(!pointerStart||pointerStart.id!==event.pointerId)return;const delta=Math.hypot(event.clientX-pointerStart.x,event.clientY-pointerStart.y);pointerStart=null;if(delta<8)onPick(event)});
 renderer.domElement.addEventListener('pointercancel',()=>{pointerStart=null});
 pathDetails.addEventListener('toggle',sync);
 let lastFrame=0;
 function animate(t){
  if(!holder.visible||!flow||reduced)return;
  if(t-lastFrame<20)return;lastFrame=t;
  const pieces=curves.length;if(!pieces)return;
  if(selectedIndex>=pieces){flow.position.copy(dots[selectedIndex].position);return;}
  const progress=(t*0.00028)%1;
  flow.position.copy(curves[selectedIndex].getPointAt(progress));
 }
 // Respect a route chosen before the async 3D engine finished loading.
 const selectedRoute=document.querySelector('.nv53-path-chips [data-route].active')?.dataset.route;
 if(selectedRoute&&RC52_ROUTE_DATA[selectedRoute])routeId=selectedRoute;
 rebuild();sync();
 return {sync,setRoute,animate,select,getRoute:()=>routeId,getSelected:()=>selectedIndex};
}
