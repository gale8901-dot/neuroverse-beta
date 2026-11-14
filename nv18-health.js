/* RC14 3D diagnostic helper. Does not claim clinical or full-browser verification. */
(()=>{
 const toggle=document.getElementById('nv18-check-toggle');
 const body=document.getElementById('nv18-check-body');
 const button=document.getElementById('nv18-run-check');
 const out=document.getElementById('nv18-results');
 if(!toggle||!body||!button||!out)return;
 toggle.addEventListener('click',()=>{body.hidden=!body.hidden;toggle.setAttribute('aria-expanded',String(!body.hidden));toggle.textContent=body.hidden?'점검 열기':'점검 닫기';});
 const line=(kind,title,detail)=>{const div=document.createElement('div');div.className='nv18-check-line '+kind;div.textContent=title+' — '+detail;out.append(div);};
 const assets=[
  ['3D 뇌 파일','./models/brain/brain_mni.glb'],
  ['3D 인체 파일','./models/brain/body_mni.glb'],
  ['3D 심장 파일','./models/brain/heart_mni.glb'],
  ['3D 폐 파일','./models/brain/lungs_mni.glb'],
  ['근육·신경 학습 자료','./data/biomechanics.json'],
  ['학년별 학습 자료','./data/pt-course.json'],
  ['일반 학습 퀴즈','./data/quiz.json']
 ];
 button.addEventListener('click',async()=>{
  button.disabled=true;out.textContent='검사 중…';out.textContent='';
  if(location.protocol==='file:'){
   line('fail','실행 방법','HTML 파일을 바로 열지 말고 실행 안내서의 서버를 켜서 접속하세요.');
   button.disabled=false;return;
  }
  try{
   const c=document.createElement('canvas');
   const gl=c.getContext('webgl2')||c.getContext('webgl');
   line(gl?'pass':'fail','3D 그래픽',gl?'브라우저가 3D 그래픽을 지원해요.':'이 브라우저에서 3D 기능을 시작하지 못했어요.');
   if(gl)gl.getExtension('WEBGL_lose_context')?.loseContext();
  }catch(e){line('fail','3D 그래픽','3D 그래픽 기능을 확인하지 못했어요.');}
  const rendered=document.querySelector('#stage canvas');
  line(rendered?'pass':'warn','3D 화면',rendered?'3D 그림을 그릴 화면이 준비되어 있어요.':'3D 화면이 아직 준비되지 않았어요. 인터넷 연결이나 새로고침을 확인하세요.');
  for(const [name,url] of assets){
   try{
    const res=await fetch(url,{method:'HEAD',cache:'no-store',signal:AbortSignal.timeout(5500)});
    const length=Number(res.headers.get('content-length')||0);
    line(res.ok&&length>0?'pass':res.ok?'warn':'fail',name,res.ok?(length>0?'파일 확인 완료 ('+Math.round(length/1024)+' KB)':'서버에서 파일을 찾았어요.'):'파일을 찾을 수 없어요 ('+res.status+')');
   }catch(e){line('fail',name,'확인할 수 없어요. 서버 연결을 확인하세요.');}
  }
  line('warn','의학적 정확성','별도 교수·임상가 검증이 필요해요.');
  button.disabled=false;
 });
})();