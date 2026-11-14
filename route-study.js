(() => {
  const study = document.querySelector('#nv54-route-study');
  const review = document.querySelector('#nv54-route-review');
  const chips = [...document.querySelectorAll('[data-route]')];
  const routes = [
    {
      id: 'cst', name: '겉질척수로', old: '피질척수로', en: 'Corticospinal tract',
      direction: '뇌 → 척수 → 근육', crossY: 84, crossing: '숨뇌 아래쪽', start: '왼쪽 뇌', end: '오른쪽 팔다리',
      easy: '왼쪽 뇌에서 내려온 움직임 명령은 뇌줄기 아래쪽에서 오른쪽으로 건너가요. 척수에서 다음 신경세포로 전달되고, 그 신경세포가 근육에 신호를 보내요.',
      expert: '대부분의 겉질척수로 섬유가 숨뇌 아래쪽 피라미드교차를 지나 가쪽겉질척수로를 이룹니다. 척수의 사이신경세포 또는 아래운동신경세포를 통해 골격근 운동에 기여합니다.',
      source: 'https://www.ncbi.nlm.nih.gov/books/NBK535423/'
    },
    {
      id: 'dcml', name: '뒤기둥–안쪽섬유띠 경로', old: '후주–내측섬유띠 경로', en: 'Dorsal column–medial lemniscus pathway (DCML)',
      direction: '몸 → 척수 → 뇌', crossY: 69, crossing: '숨뇌', start: '오른쪽 몸', end: '왼쪽 뇌',
      easy: '오른손에 닿은 물건의 모양을 알아차리는 신호는 척수 오른쪽으로 올라가다가, 척수 위의 숨뇌에서 왼쪽으로 건너가요.',
      expert: '정교촉각·진동·의식적 고유수용감각을 전달합니다. 일차감각신경세포는 같은 쪽 뒤기둥을 올라가 숨뇌의 얇은다발핵 또는 쐐기다발핵에서 중계합니다. 이차감각신경세포의 축삭이 숨뇌에서 교차합니다.',
      source: 'https://www.ncbi.nlm.nih.gov/books/NBK544267/'
    },
    {
      id: 'stt', name: '척수시상로', old: '척수시상로', en: 'Spinothalamic tract (STT)',
      direction: '몸 → 척수 → 뇌', crossY: 117, crossing: '척수', start: '오른쪽 몸', end: '왼쪽 뇌',
      easy: '오른손에 뜨거운 것이 닿으면 그 소식이 척수에 들어와요. 소식을 넘겨받은 다음 신경세포가 척수 안에서 왼쪽으로 건너가요.',
      expert: '통각·온도 신호는 척수 뒤뿔에서 중계됩니다. 이차감각신경세포의 축삭은 척수 앞백색맞교차를 지나 반대쪽 앞가쪽계를 따라 상행합니다.',
      source: 'https://www.ncbi.nlm.nih.gov/books/NBK546614/'
    }
  ];
  let active = routes[0];
  let mode = 'easy';
  const deck = [
    { text: '정교한 촉각 신호를 전달하는 뒤기둥–안쪽섬유띠 경로는 어디에서 교차할까요?', route: routes[1], options: ['척수', '숨뇌', '시상'] },
    { text: '통증·온도 신호를 전달하는 척수시상로는 어디에서 교차할까요?', route: routes[2], options: ['숨뇌', '시상', '척수'] },
    { text: '가쪽겉질척수로가 되는 운동 섬유 대부분은 어디에서 교차할까요?', route: routes[0], options: ['숨뇌 아래쪽', '시상', '척수 앞뿔'] }
  ];
  let question = 0;
  let score = 0;

  // 개념도 좌표(정면, 그림 왼쪽 = 몸의 왼쪽). 실측 좌표가 아니라 교육용 모식도입니다.
  // 각 칸 = [x, y, 이름표, 설명]. 선은 이 점들을 순서대로 잇습니다.
  const hand = [285, 382];
  // 해부도식 그림(겉질척수로): 대뇌 관상단면 + 뇌줄기 + 척수. 교육용 모식도.
  const GM = '#587d93', WM = '#d3e0e8', DIM = 'stroke="#ffb369" stroke-opacity=".3" stroke-width="4" fill="none" stroke-dasharray="5 4" stroke-linecap="round" stroke-linejoin="round"';
  const A_HEAD = `
    <text class="nv54-region" x="130" y="-1">왼쪽 뇌</text><text class="nv54-region" x="250" y="-1">오른쪽 뇌</text>
    <path d="M80 110C80 40 130 12 190 12C250 12 300 40 300 110C300 150 280 168 250 170L130 170C100 168 80 150 80 110Z" fill="${GM}" stroke="#3b6277"/>
    <path d="M92 108C92 52 135 27 190 27C245 27 288 52 288 108C288 142 272 158 246 160L134 160C108 158 92 142 92 108Z" fill="${WM}"/>
    <path d="M190 12V96" stroke="${GM}" stroke-width="3"/>
    <path d="M176 58C168 76 172 96 182 104L187 98C182 86 182 72 187 56Z" fill="#26485c"/><path d="M204 58C212 76 208 96 198 104L193 98C198 86 198 72 193 56Z" fill="#26485c"/>
    <ellipse cx="164" cy="112" rx="14" ry="12" fill="${GM}"/><ellipse cx="216" cy="112" rx="14" ry="12" fill="${GM}"/>
    <path d="M112 66L150 108L158 160M268 66L230 108L222 160" stroke="#fff6e8" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity=".75"/>
    <path d="M152 170L228 170L222 190L158 190Z" fill="${WM}" stroke="#3b6277"/>
    <path d="M152 188C128 198 128 232 152 242L228 242C252 232 252 198 228 188Z" fill="#c2d4df" stroke="#3b6277"/>
    <path d="M140 202H240M138 214H242M140 226H240" stroke="#8fb0c4" stroke-width="2"/>
    <path d="M157 242L223 242L214 306L166 306Z" fill="#cfdde6" stroke="#3b6277"/>
    <path d="M190 244V300" stroke="#8fb0c4" stroke-width="2"/>
  `;
  const A_PYR = `
    <ellipse cx="177" cy="270" rx="9" ry="26" fill="#f2f7fa" stroke="#8fb0c4"/><ellipse cx="203" cy="270" rx="9" ry="26" fill="#f2f7fa" stroke="#8fb0c4"/>
  `;
  const A_CORD = `
    <path d="M165 306H215L217 520Q190 530 163 520Z" fill="${WM}" stroke="#3b6277"/>
    <path d="M182 306V500M198 306V500" stroke="${GM}" stroke-width="12"/>
    <path d="M168 470Q178 462 186 470M194 470Q202 462 212 470" stroke="${GM}" stroke-width="12" fill="none"/>
  `;
  const A_LAB = `
    <text class="nv54-region" style="text-anchor:start" x="256" y="168">중뇌</text><text class="nv54-region" style="text-anchor:start" x="258" y="218">다리뇌</text><text class="nv54-region" style="text-anchor:start" x="232" y="272">숨뇌</text><text class="nv54-region" style="text-anchor:start" x="226" y="420">척수</text>
    <text class="nv54-region" x="190" y="84" text-anchor="middle">뇌실</text>
  `;
  const CST_ATLAS = A_HEAD + A_PYR + A_CORD + `
    <path d="M200 316H214V480H200Z" fill="#ffb369" opacity=".35"/><path d="M166 316H180V480H166Z" fill="#ffb369" opacity=".12"/>
    <polyline points="252,34 228,108 220,160 214,210 208,262 190,300 174,390 174,470" ${DIM}/>
    <path d="M214 470Q230 470 240 538" stroke="#cfdde6" stroke-width="3" fill="none"/>
    <path d="M228 552Q260 528 294 548Q264 572 228 552Z" fill="#b5584e" stroke="#7a3a34"/>
  ` + A_LAB;
  const DIMG = DIM.replace('#ffb369', '#2fbf8a');
  // 해부도식 그림(뒤기둥–안쪽섬유띠): 같은 뇌·뇌줄기·척수 위에 감각 경로. 오른손 → 오른쪽 뒤기둥 → 숨뇌에서 교차 → 왼쪽 시상·겉질.
  const DCML_ATLAS = A_HEAD + `
    <ellipse cx="178" cy="258" rx="8" ry="11" fill="#2fbf8a" opacity=".75"/><ellipse cx="202" cy="258" rx="8" ry="11" fill="#2fbf8a" opacity=".75"/>` + A_CORD + `
    <path d="M198 316H212V480H198Z" fill="#2fbf8a" opacity=".4"/>
    <polyline points="118,548 168,470 174,390 178,258 204,282 210,212 220,112 272,56" ${DIMG}/>
    <path d="M212 470Q230 470 240 538" stroke="#cfdde6" stroke-width="3" fill="none"/>
    <path d="M228 552Q260 528 294 548Q264 572 228 552Z" fill="#e8b79a" stroke="#a9795c"/>` + A_LAB;
  Object.assign(routes[0], { color: '#ffb369', body: CST_ATLAS, vb: '-10 -8 380 580', stations: [
    [128, 34, '운동겉질', '"팔을 움직여!" 라는 명령이 태어나는 곳이에요. 왼쪽 뇌는 오른쪽 몸을 움직여요.'],
    [152, 108, '속섬유막', '뇌 깊은 곳의 좁은 문이에요. 명령 전선이 한데 모여 지나가서, 여기가 다치면 한쪽 몸 전체가 약해질 수 있어요.'],
    [160, 160, '대뇌다리', '중뇌에 있는 굵은 기둥 길이에요. 신호가 뇌줄기로 내려가기 시작해요.'],
    [166, 212, '다리뇌', '뇌줄기 가운데 불룩한 부분이에요. 명령 다발이 여기를 지나가요.'],
    [172, 262, '피라미드', '숨뇌 앞쪽에 있는 피라미드 모양 두 줄기예요. 그래서 이 길을 "피라미드로"라고도 불러요.'],
    [190, 300, '피라미드교차', '대부분의 신호가 여기서 반대쪽으로 건너가요. 그래서 왼쪽 뇌가 오른쪽 몸을 움직이는 거예요.'],
    [207, 390, '가쪽겉질척수로', '건너온 신호가 척수 옆쪽 길을 따라 쭉 내려가요.'],
    [207, 470, '척수 앞뿔', '여기서 다음 신경세포(아래운동신경세포)에게 신호를 넘겨줘요.'],
    [262, 548, '손·팔 근육', '아래운동신경세포가 근육을 수축시켜요. 움직임 완성!']],
    lesion: '교차 위쪽(뇌)이 다치면 반대쪽 팔다리가, 교차 아래쪽(척수)이 다치면 같은 쪽 팔다리가 약해져요.' });
  const STT_ATLAS = A_HEAD + A_CORD + `
    <path d="M166 316H180V480H166Z" fill="#ff92b6" opacity=".45"/>
    <polyline points="118,548 176,470 202,440 210,380 214,215 220,112 272,56" ${DIM.replace('#ffb369', '#ff92b6')}/>
    <path d="M212 470Q230 470 240 538" stroke="#cfdde6" stroke-width="3" fill="none"/>
    <path d="M228 552Q260 528 294 548Q264 572 228 552Z" fill="#e8b79a" stroke="#a9795c"/>` + A_LAB;
  Object.assign(routes[1], { color: '#8ce3bd', lc: '#0f9d6a', body: DCML_ATLAS, vb: '-10 -8 380 580', stations: [
    [262, 548, '피부 수용기', '손끝에 닿은 물건의 모양·진동을 느끼는 센서예요.'],
    [212, 470, '뒤뿌리 입구', '감각 신경이 척수 뒤쪽 문(뒤뿌리)으로 들어와요.'],
    [206, 390, '뒤기둥', '신호가 같은 쪽 척수 뒤쪽 기둥을 타고 쭉 올라가요. 아직 건너가지 않았어요.'],
    [202, 258, '얇은·쐐기핵', '숨뇌의 중계소예요. 여기서 다음 신경세포가 신호를 받아요.'],
    [176, 282, '숨뇌에서 교차', '다음 신경세포의 가지가 여기서 반대쪽으로 건너가요. 오른손 감각이 왼쪽 뇌로 가는 이유예요.'],
    [170, 212, '안쪽섬유띠', '건너온 신호가 뇌줄기 속 길(안쪽섬유띠)을 타고 올라가요.'],
    [160, 112, '시상', '감각 신호가 모이는 뇌의 중계소예요. 여기서 겉질로 보내요.'],
    [108, 56, '감각겉질', '"오른손에 뭔가 닿았네!" 하고 알아차리는 곳이에요.']],
    lesion: '교차 아래(척수)에서 다치면 같은 쪽 위치·진동 감각이, 교차 위(뇌)에서 다치면 반대쪽 감각이 둔해져요.' });
  Object.assign(routes[2], { color: '#ff92b6', lc: '#d6336c', body: STT_ATLAS, vb: '-10 -8 380 580', stations: [
    [262, 548, '통증 수용기', '뜨겁거나 아픈 자극을 느끼는 센서예요.'],
    [204, 470, '뒤뿔', '신호가 척수 뒤쪽 뿔(뒤뿔)에서 다음 신경세포에게 넘어가요.'],
    [176, 440, '앞백색맞교차', '다음 신경세포가 척수 안에서 바로 반대쪽으로 건너가요. 뇌까지 가기 전에 이미 건넌 거예요.'],
    [170, 380, '앞가쪽계', '반대쪽(왼쪽) 척수의 앞가쪽 길을 타고 올라가요.'],
    [166, 215, '뇌줄기', '뇌줄기를 지나 계속 위로 올라가요.'],
    [160, 112, '시상', '통증·온도 신호가 모이는 중계소예요.'],
    [108, 56, '감각겉질', '"앗 뜨거워!" 하고 알아차리는 곳이에요.']],
    lesion: '척수 한쪽이 다치면, 그 높이 아래에서 반대쪽 몸의 통증·온도 감각이 떨어져요.' });
  [5, 4, 2].forEach((c, k) => { routes[k].cross = c; }); // 교차가 일어나는 칸 번호(0부터)

  // ── 추가 경로: 시각(교차 있음) · 팔신경얼기 · 엉치신경얼기(교차 없음, 같은 쪽) ──
  // 해부도식 그림(시각): 아래에서 본 뇌(앞이 위). 눈 → 시신경 → 시각교차 → 시각로 → 가쪽무릎체 → 시각부챗살 → 뒤통수엽. 점선 = 다른 눈의 길.
  const VIS_ATLAS = `
    <path d="M180 92C250 92 298 150 298 240C298 330 258 392 180 396C102 392 62 330 62 240C62 150 110 92 180 92Z" fill="${GM}" stroke="#3b6277"/>
    <path d="M180 102C242 102 288 156 288 240C288 322 250 384 180 386C110 384 72 322 72 240C72 156 118 102 180 102Z" fill="${WM}"/>
    <path d="M180 102V150M180 262V386" stroke="${GM}" stroke-width="3"/>
    <path d="M150 304C140 340 144 366 164 378M210 304C220 340 216 366 196 378" stroke="#26485c" stroke-width="6" fill="none" stroke-linecap="round"/>
    <circle cx="180" cy="214" r="17" fill="#c2d4df" stroke="#3b6277"/>
    <ellipse cx="156" cy="196" rx="13" ry="20" fill="${GM}"/><ellipse cx="204" cy="196" rx="13" ry="20" fill="${GM}"/>
    <path d="M128 372Q180 398 232 372" stroke="${GM}" stroke-width="14" fill="none" stroke-linecap="round"/>
    <circle cx="110" cy="44" r="25" fill="#f4f1ea" stroke="#8a8f94" stroke-width="2"/><circle cx="250" cy="44" r="25" fill="#f4f1ea" stroke="#8a8f94" stroke-width="2"/>
    <circle cx="110" cy="44" r="8" fill="#5b8fd6"/><circle cx="250" cy="44" r="8" fill="#5b8fd6"/>
    <ellipse cx="180" cy="124" rx="17" ry="8" fill="#cfdde6" stroke="#8fb0c4"/>
    <polyline points="110,44 140,92 176,124 208,168 222,214 248,296 228,372" ${DIM.replace('#ffb369', '#5b8fd6')}/>
    <polyline points="262,58 238,96 214,160" ${DIM.replace('#ffb369', '#5b8fd6')}/>
    <text class="nv54-region" x="110" y="12">왼쪽 눈</text><text class="nv54-region" x="250" y="12">오른쪽 눈</text>
    <text class="nv54-region" x="180" y="304" text-anchor="middle">시상</text>
    <text class="nv54-region" x="180" y="408">뒤통수엽(뒤쪽) · 아래에서 본 뇌</text>
    <text class="nv54-region" style="text-anchor:start" x="236" y="260">점선 = 다른 길</text>`;
  // 해부도식 그림(청각): 오른쪽 귀 → 뇌줄기에서 양쪽으로 갈라짐(반대쪽 우세) → 왼쪽 겉질. 점선 = 같은 쪽 길.
  const AUD_ATLAS = A_HEAD + `
    <circle cx="290" cy="196" r="14" fill="#e8b79a" stroke="#a9795c"/><circle cx="290" cy="196" r="7" fill="none" stroke="#a9795c" stroke-width="2"/>
    <path d="M278 204Q268 214 252 222" stroke="#cfdde6" stroke-width="3" fill="none"/>
    <ellipse cx="178" cy="224" rx="8" ry="8" fill="#2fbf8a" opacity=".75"/><ellipse cx="202" cy="224" rx="8" ry="8" fill="#2fbf8a" opacity=".75"/>
    <circle cx="166" cy="178" r="6" fill="#2fbf8a" opacity=".75"/><circle cx="214" cy="178" r="6" fill="#2fbf8a" opacity=".75"/>
    <circle cx="158" cy="128" r="6" fill="#2fbf8a" opacity=".75"/><circle cx="222" cy="128" r="6" fill="#2fbf8a" opacity=".75"/>
    <polyline points="214,246 202,224 206,204 214,178 222,128 284,100" ${DIM.replace('#ffb369', '#2fbf8a')}/>
    <text class="nv54-region" style="text-anchor:start" x="226" y="300">초록 점선 = 같은 쪽 길(약함)</text>` + A_LAB;
  // 해부도식 그림(팔신경얼기): 단계마다 점 개수만 보여주고(5→3→6→3), 굵은 선이 노신경 경로. 가지는 노신경만.
  const ARM_ATLAS = (() => {
    const band = (y, t) => `<rect x="30" y="${y - 15}" width="300" height="30" rx="15" fill="#2a2347" opacity=".55"/><text class="nv54-region" style="text-anchor:start" x="-4" y="${y + 4}">${t}</text>`;
    const dots = (y, xs, lab) => xs.map((x, i) => `<circle cx="${x}" cy="${y}" r="9" fill="#b79af0" opacity=".55"/>${lab ? `<text x="${x}" y="${y + 4}" text-anchor="middle" font-size="9" font-weight="700" fill="#0b1a26">${lab[i]}</text>` : ''}`).join('');
    return `<rect x="56" y="4" width="240" height="22" rx="8" fill="#cfdde6" stroke="#3b6277"/><text class="nv54-region" x="176" y="19" style="fill:#0b1a26;font-weight:700" text-anchor="middle">목 척수</text>
      ${band(62, '뿌리 5')}${band(125, '줄기 3')}${band(165, '갈래 6')}${band(222, '다발 3')}${band(330, '가지')}
      ${dots(62, [70, 126, 182, 238, 278], ['C5', 'C6', 'C7', 'C8', 'T1'])}${dots(125, [84, 134, 258], ['위', '가운데', '아래'])}${dots(165, [72, 112, 152, 192, 232, 272], ['앞', '뒤', '앞', '뒤', '앞', '뒤'])}${dots(222, [102, 182, 262], ['가쪽', '뒤', '안쪽'])}
      <text class="nv54-region" x="180" y="198" text-anchor="middle">앞 = 굽히는 쪽 · 뒤 = 펴는 쪽 (노신경은 뒤)</text>
      <ellipse cx="214" cy="482" rx="22" ry="50" fill="#e4a79c" stroke="#a9645a"/>
      <text class="nv54-region" x="214" y="546" text-anchor="middle">위팔세갈래근 · 손목 폄근</text>`;
  })();
  // 해부도식 그림(엉치신경얼기): 뿌리→얼기→큰궁둥구멍→궁둥신경→두 갈래→근육, 굵은 선 = 온종아리신경 경로.
  const LEG_ATLAS = (() => {
    const band = (y, t) => `<rect x="44" y="${y - 15}" width="286" height="30" rx="15" fill="#4a3a14" opacity=".5"/><text class="nv54-region" style="text-anchor:start" x="-4" y="${y + 4}">${t}</text>`;
    const dot = (x, y, t) => `<circle cx="${x}" cy="${y}" r="10" fill="#e3b341" opacity=".6"/>${t ? `<text x="${x}" y="${y + 4}" text-anchor="middle" font-size="9" font-weight="700" fill="#0b1a26">${t}</text>` : ''}`;
    return `<rect x="56" y="4" width="240" height="22" rx="8" fill="#cfdde6" stroke="#3b6277"/><text class="nv54-region" x="176" y="19" style="fill:#0b1a26;font-weight:700" text-anchor="middle">허리·엉치 척수</text>
      ${band(62, '뿌리 5')}${band(112, '얼기')}${band(162, '구멍')}${band(212, '궁둥')}${band(262, '갈래')}
      ${[['L4', 70], ['L5', 126], ['S1', 182], ['S2', 238], ['S3', 278]].map(r => dot(r[1], 62, r[0])).join('')}
      <ellipse cx="190" cy="112" rx="72" ry="11" fill="#e3b341" opacity=".5"/><text x="120" y="116" text-anchor="middle" font-size="9" font-weight="700" fill="#0b1a26">그물처럼 엮임</text>
      <circle cx="200" cy="162" r="13" fill="#16202a" stroke="#e3b341" stroke-width="2"/><text class="nv54-region" style="text-anchor:start" x="60" y="166">큰궁둥구멍으로 엉덩이 뒤로</text>
      ${dot(206, 212)}<text class="nv54-region" style="text-anchor:start" x="60" y="216">가장 굵은 신경</text>
      ${dot(166, 262, '정강')}${dot(236, 262, '온종아리')}
      <text class="nv54-region" x="180" y="292" text-anchor="middle">정강 = 발 아래로 · 온종아리 = 발 위로</text>
      <ellipse cx="252" cy="340" rx="18" ry="38" fill="#e4a79c" stroke="#a9645a"/>
      <text class="nv54-region" x="252" y="392" text-anchor="middle">앞정강근 · 발목 올림근</text>`;
  })();
  // 해부도식 그림(소뇌 경로 2개): 뇌줄기 양옆에 소뇌 반구를 얹고, 다리 근육 → 척수 → 소뇌. 교육용 모식도.
  const CB_ATLAS = (route) => `
    <path d="M52 214C52 190 90 184 128 196L152 214L150 276C120 292 66 278 52 248Z" fill="#6f93a8" stroke="#3b6277"/>
    <path d="M328 214C328 190 290 184 252 196L228 214L230 276C260 292 314 278 328 248Z" fill="#6f93a8" stroke="#3b6277"/>
    <path d="M62 214Q100 206 140 214M60 230Q100 222 146 232M62 246Q100 240 146 250M70 262Q104 258 144 266M318 214Q280 206 240 214M320 230Q280 222 234 232M318 246Q280 240 234 250M310 262Q276 258 236 266" stroke="#9fbccd" stroke-width="2" fill="none"/>
    <text class="nv54-region" x="96" y="182">왼쪽 소뇌</text><text class="nv54-region" x="284" y="182">오른쪽 소뇌</text>` + A_HEAD + A_CORD + route + `
    <path d="M212 470Q230 470 240 538" stroke="#cfdde6" stroke-width="3" fill="none"/>
    <path d="M228 552Q260 528 294 548Q264 572 228 552Z" fill="#b5584e" stroke="#7a3a34"/>
    <text class="nv54-region" style="text-anchor:start" x="226" y="420">척수</text><text class="nv54-region" x="190" y="84">뇌실</text>`;
  // 해부도식 그림(뇌신경): 높이별 4구간(대뇌·중뇌·다리뇌·숨뇌) + 12쌍을 오른쪽으로 한 줄씩. 파랑=감각, 주황=운동, 보라=혼합.
  const CN_ROWS = [[40,'#5b8fd6'],[90,'#5b8fd6'],[150,'#e8833a'],[182,'#e8833a'],[222,'#9b6fd6'],[256,'#e8833a'],[286,'#9b6fd6'],[316,'#5b8fd6'],[346,'#9b6fd6'],[376,'#9b6fd6'],[410,'#e8833a'],[440,'#e8833a']];
  const CN_ATLAS = `
    <ellipse cx="170" cy="64" rx="78" ry="56" fill="#c2d4df" stroke="#3b6277"/>
    <path d="M150 122H210V198H150Z" fill="#ffe3a3" stroke="#3b6277"/>
    <path d="M150 198H210V330H150Z" fill="#b8efd3" stroke="#3b6277"/>
    <path d="M150 330H210V456H150Z" fill="#ffc8d6" stroke="#3b6277"/>
    <path d="M158 456H202V520Q180 530 158 520Z" fill="#cfdde6" stroke="#3b6277"/>
    ${CN_ROWS.map(r => `<line x1="206" y1="${r[0]}" x2="252" y2="${r[0]}" stroke="${r[1]}" stroke-width="4" stroke-linecap="round"/>`).join('')}
    <g style="fill:#0b1a26;font-weight:700">
    <text class="nv54-region" x="150" y="68" text-anchor="middle">대뇌</text><text class="nv54-region" x="180" y="164" text-anchor="middle">중뇌</text><text class="nv54-region" x="180" y="268" text-anchor="middle">다리뇌</text><text class="nv54-region" x="180" y="396" text-anchor="middle">숨뇌</text><text class="nv54-region" x="180" y="494" text-anchor="middle">척수</text></g>
    <text class="nv54-region" style="text-anchor:start" x="30" y="30">● 파랑 = 감각</text><text class="nv54-region" style="text-anchor:start" x="30" y="46">● 주황 = 운동</text><text class="nv54-region" style="text-anchor:start" x="30" y="62">● 보라 = 감각+운동</text>`;
  const extra = [
    { id: 'vis', name: '시각 경로', old: '시각 전도로', en: 'Visual pathway', body: VIS_ATLAS, vb: '-10 -8 380 420', lc: '#2b6cd6', color: '#7fb8ff',
      direction: '눈 → 뇌(뒤통수엽)', crossing: '시각교차', start: '오른쪽 눈(코쪽 망막)', end: '왼쪽 뒤통수엽', cross: 2,
      easy: '눈에서 나온 신호는 두 눈이 만나는 X자 교차로(시각교차)에서 길이 갈려요. 코 쪽 망막의 신호는 반대쪽으로 건너가고, 귀 쪽 망막 신호는 그대로 가요. 그래서 오른쪽 시야는 왼쪽 뇌가 봐요.',
      expert: '망막 코쪽 절반의 신경절세포 축삭은 시각교차에서 교차하고 귀쪽 절반은 교차하지 않습니다. 시각로 → 가쪽무릎체 → 시각부챗살 → 뒤통수엽 1차시각겉질(BA 17) 순으로 지나며, 한쪽 시각겉질은 반대쪽 시야를 담당합니다.',
      source: 'https://www.ncbi.nlm.nih.gov/books/?term=visual+pathway',
      lesion: '시각교차 가운데가 눌리면(예: 뇌하수체 종양) 양쪽 귀 쪽 시야가 사라져요. 시각로 뒤쪽 한쪽이 다치면 양쪽 눈 모두 반대쪽 시야가 반쪽 사라져요. 시신경이 다치면 그쪽 눈이 안 보여요.',
      stations: [
        [240, 46, '오른눈 코쪽 망막', '빛을 받아 전기 신호로 바꾸는 눈 안쪽 필름이에요. 코 쪽 절반의 신호는 나중에 반대쪽으로 건너가요.'],
        [214, 92, '시신경(뇌신경 Ⅱ)', '눈에서 나온 신호 전선이에요. 아직은 오른쪽 길을 가요.'],
        [176, 124, '시각교차', '두 눈의 시신경이 만나는 X자 교차로예요. 코 쪽 망막 신호만 반대쪽으로 건너가요.'],
        [152, 168, '시각로', '건너온 신호가 왼쪽 길을 따라 뇌 속으로 들어가요.'],
        [138, 215, '가쪽무릎체(시상)', '시각 신호의 중계소예요. 시상 안에 있어요.'],
        [112, 296, '시각부챗살', '부채처럼 펼쳐져 뒤로 달리는 전선이에요.'],
        [132, 368, '뒤통수엽(1차 시각겉질)', '"보인다!"를 알아차리는 곳이에요. 오른쪽 시야는 왼쪽 뒤통수엽이 담당해요.']] },
    { id: 'brach', name: '팔신경얼기 (노신경 경로)', old: '상완신경총', en: 'Brachial plexus (radial nerve path)', body: ARM_ATLAS, vb: '-10 -8 380 580', lc: '#6f3fd0', color: '#c9a7ff',
      direction: '척수 → 팔 근육', crossing: '교차 없음(같은 쪽)', start: '오른쪽 목 척수(C5–T1)', end: '오른팔 폄근', cross: null,
      easy: '목 아래 척수에서 나온 신경 다섯 가닥이 어깨 앞에서 한 번 엮였다가 다시 갈라져 팔로 내려가요. 이름 순서는 "뿌리 → 줄기 → 갈래 → 다발 → 가지"예요. 이 길은 손목을 펴는 근육으로 가요. 건너가지 않고 같은 쪽 팔로 가요.',
      expert: 'C5–T1 앞가지가 위(C5–6)·가운데(C7)·아래(C8–T1) 줄기를 이루고, 각 줄기가 앞·뒤갈래로 나뉜 뒤 가쪽·뒤·안쪽다발이 됩니다. 세 뒤갈래가 모인 뒤다발에서 겨드랑신경과 노신경이 나옵니다.',
      source: 'https://www.ncbi.nlm.nih.gov/books/?term=brachial+plexus',
      lesion: '노신경이 다치면(예: 위팔뼈 몸통 골절) 손목을 못 펴서 손목이 축 처져요(손목 처짐). 위줄기(C5–C6)가 심하게 당겨지면 어깨가 안 올라가고 팔이 몸 옆에 늘어져요.',
      stations: [
        [182, 62, '뿌리 · 척수 C5–T1', '목 아래 척수에서 나온 다섯 가닥(C5·C6·C7·C8·T1)이에요. 신경얼기의 "뿌리"예요.'],
        [182, 147, '줄기 (위·가운데·아래)', '다섯 뿌리가 세 줄기로 합쳐져요. 위줄기=C5–C6, 가운데=C7, 아래=C8–T1.'],
        [192, 165, '갈래 (앞·뒤)', '세 줄기가 각각 앞·뒤 갈래로 갈라져요. 뒤쪽 갈래는 "팔을 펴는" 쪽 길이에요.'],
        [182, 222, '뒤다발', '세 뒤갈래가 합쳐진 굵은 다발이에요. 겨드랑이 깊은 곳에 있고, 여기서 겨드랑신경과 노신경이 나와요.'],
        [204, 330, '노신경 (가지)', '팔 뒤쪽을 감아 돌며 내려가는 긴 신경이에요. 위팔뼈 몸통 옆을 지나서 뼈가 부러지면 다치기 쉬워요.'],
        [214, 482, '팔 폄근', '위팔세갈래근, 손목·손가락 폄근을 움직여요. 펴는 근육은 노신경이 담당해요.']] },
    { id: 'lumb', name: '엉치신경얼기 (궁둥신경 경로)', old: '천골신경총(좌골신경)', en: 'Sacral plexus (sciatic nerve path)', body: LEG_ATLAS, vb: '-10 -8 380 420', lc: '#b7791f', color: '#ffd166',
      direction: '척수 → 다리 근육', crossing: '교차 없음(같은 쪽)', start: '오른쪽 허리 척수(L4–S3)', end: '오른발 올림근', cross: null,
      easy: '허리·엉치 쪽 척수에서 나온 신경이 엉치뼈 앞에서 엮인 뒤, 엉덩이를 지나 허벅지 뒤쪽으로 내려가요. 가장 굵은 이 신경이 궁둥신경이에요. 무릎 뒤에서 두 갈래로 갈라지고, 건너가지 않고 같은 쪽 다리로 가요.',
      expert: 'L4–S3 앞·뒤갈래가 엉치신경얼기를 이룹니다. 궁둥신경은 정강신경(앞갈래 성분)과 온종아리신경(뒤갈래 성분)이 한 덮개에 싸인 채 큰궁둥구멍으로 골반을 나와 궁둥구멍근 아래를 지나고, 오금 위쪽에서 갈라집니다.',
      source: 'https://www.ncbi.nlm.nih.gov/books/?term=sciatic+nerve',
      lesion: '온종아리신경이 다치면(예: 무릎 바깥쪽 압박, 종아리뼈 머리 골절) 발목을 못 들어 올려 발끝이 처져요(발 처짐). 정강신경이 다치면 발을 아래로 밀거나 발끝으로 서기가 어려워요.',
      stations: [
        [182, 62, '척수신경 L4–S3', '허리·엉치 쪽 척수에서 나온 신경 가닥들이에요.'],
        [190, 112, '엉치신경얼기', '엉치뼈 앞쪽에서 가닥들이 엮이는 그물이에요.'],
        [200, 162, '큰궁둥구멍', '엉치뼈 앞에서 나온 신경이 이 구멍으로 엉덩이 뒤로 빠져나와요.'],
        [206, 212, '궁둥신경', '몸에서 가장 굵고 긴 신경이에요. 허벅지 뒤쪽을 따라 내려가요.'],
        [236, 262, '오금 위에서 두 갈래', '무릎 뒤 위쪽에서 정강신경과 온종아리신경으로 갈라져요.'],
        [252, 340, '온종아리신경 → 발목 올림근', '종아리 바깥쪽을 돌아 앞정강근 등 발목을 들어 올리는 근육으로 가요.']] }
    ,
    { id: 'aud', name: '청각 경로', old: '청각 전도로', en: 'Auditory pathway', body: AUD_ATLAS, vb: '-10 -8 380 330', lc: '#0f9d6a', color: '#7fe0b0',
      direction: '귀 → 뇌(관자엽)', crossing: '위올리브복합체(뇌줄기)', start: '오른쪽 귀(달팽이관)', end: '주로 왼쪽 청각겉질', cross: 3,
      easy: '귀 속 달팽이관에서 소리가 전기 신호로 바뀌어 뇌줄기로 가요. 뇌줄기에서 신호의 일부는 반대쪽으로 건너가고 일부는 같은 쪽으로 올라가요. 그래서 한쪽 뇌만 다쳐도 양쪽 귀로 들리는 소리는 대부분 남아요.',
      expert: '달팽이신경(CN Ⅷ)은 달팽이신경핵에서 첫 중계를 합니다. 이후 위올리브복합체부터 양쪽으로 갈라져(양측성) 가쪽섬유띠 → 아래둔덕 → 안쪽무릎체 → 가로관자이랑의 1차 청각겉질로 올라갑니다. 반대쪽 투사가 우세합니다.',
      source: 'https://www.ncbi.nlm.nih.gov/books/?term=auditory+pathway',
      lesion: '달팽이신경이나 달팽이관(말초)이 다치면 그쪽 귀가 안 들려요. 뇌줄기 위쪽·한쪽 청각겉질이 다치면 양쪽으로 신호가 올라가기 때문에 완전히 안 들리진 않고, 소리 방향 찾기나 소음 속 말소리 구분이 어려워져요.',
      stations: [
        [290, 196, '달팽이관(귀)', '귀 깊은 곳 달팽이 모양 기관이에요. 소리 떨림을 전기 신호로 바꿔요.'],
        [250, 222, '달팽이신경 Ⅷ', '달팽이관에서 뇌줄기로 신호를 보내는 전선이에요.'],
        [214, 246, '달팽이신경핵', '뇌줄기(다리뇌·숨뇌 경계)에서 신호를 처음 넘겨받는 중계소예요.'],
        [178, 224, '위올리브복합체', '여기서부터 신호가 양쪽으로 갈라져요. 일부는 반대쪽으로 건너가고 일부는 같은 쪽으로 가요. 두 귀의 소리 차이로 방향을 알아내는 곳이에요.'],
        [170, 204, '가쪽섬유띠', '뇌줄기 속을 위로 달리는 청각 전용 길이에요.'],
        [166, 178, '아래둔덕', '중뇌 뒤쪽의 청각 중계소예요.'],
        [158, 128, '안쪽무릎체(시상)', '시상 안에 있는 청각 마지막 중계소예요.'],
        [96, 100, '청각겉질', '관자엽 위쪽(가로관자이랑)에서 "소리가 들린다!"를 알아차리는 곳이에요.']] }
    ,
    { id: 'cb', name: '소뇌 경로 (뒤척수소뇌로)', old: '후척수소뇌로', en: 'Dorsal spinocerebellar tract', body: CB_ATLAS(`<path d="M198 316H212V480H198Z" fill="#ff9f7a" opacity=".5"/><circle cx="202" cy="430" r="6" fill="#ff9f7a"/>`), vb: '-10 -8 380 580', lc: '#d9480f', color: '#ff9f7a',
      direction: '다리 근육 → 소뇌', crossing: '교차 없음(같은 쪽)', start: '오른쪽 다리 근육방추', end: '오른쪽 소뇌 벌레', cross: null,
      easy: '다리 근육이 "지금 얼마나 늘어나 있는지"를 소뇌에 알려주는 길이에요. 소뇌는 이 정보로 움직임이 매끄럽고 균형이 잡히게 조율해요. 이 길은 건너가지 않고 같은 쪽으로 올라가요.',
      expert: '근육방추·힘줄기관 고유감각 신호가 뒤뿌리로 들어와 척수 뒤뿔 기저부의 클라크핵(T1–L2)에서 시냅스하고, 같은쪽 가쪽기둥의 뒤척수소뇌로를 따라 올라 아래소뇌다리(밧줄몸)를 통해 같은쪽 소뇌 벌레·중간부로 들어갑니다.',
      source: 'https://www.ncbi.nlm.nih.gov/books/?term=spinocerebellar+tract',
      lesion: '한쪽 소뇌가 다치면 같은 쪽 팔다리가 비틀거려요(운동실조). 걸을 때 다리가 넓게 벌어지고, 손을 뻗을 때 떨리며, 눈이 흔들리기도 해요(안구진탕).',
      stations: [
        [262, 548, '근육방추(다리 근육)', '근육이 얼마나 늘어났는지 재는 작은 센서예요.'],
        [212, 480, '뒤뿌리', '센서 신호가 척수로 들어가는 뒷문이에요.'],
        [202, 430, '클라크핵', '척수 뒤쪽 안에 있는 중계소(T1–L2)예요. 여기서 다음 신경으로 넘겨요.'],
        [210, 370, '뒤척수소뇌로', '척수 옆쪽 기둥을 같은 쪽으로 올라가는 길이에요.'],
        [226, 268, '아래소뇌다리', '뇌줄기에서 소뇌로 들어가는 굵은 입구(밧줄몸)예요.'],
        [280, 232, '소뇌 (같은 쪽)', '정보를 받아 움직임을 부드럽게 다듬고 균형을 잡아요.']] }
    ,
    { id: 'cn', name: '뇌신경 12개 (뇌줄기 출입 순서)', old: '뇌신경', en: 'Cranial nerves', body: CN_ATLAS, vb: '-10 -8 380 580', lc: 'transparent', color: '#f0e68c',
      direction: '뇌 → 얼굴·목 (감각·운동)', crossing: '교차 없음(같은 쪽)', start: '뇌·뇌줄기', end: '얼굴·목·내장', cross: null,
      easy: '뇌에서 곧바로 나오는 신경 12쌍이에요. 위에서 아래로 번호를 붙였어요. 순서: 후각·시각·눈돌림·도르래·삼차·갈래·얼굴·속귀·혀인두·미주·더부·혀밑이에요.',
      expert: 'Ⅰ·Ⅱ는 끝뇌·사이뇌에서, Ⅲ·Ⅳ는 중뇌, Ⅴ–Ⅷ은 다리뇌, Ⅸ–Ⅻ는 숨뇌에서 나옵니다. 감각(Ⅰ·Ⅱ·Ⅷ), 운동(Ⅲ·Ⅳ·Ⅵ·Ⅺ·Ⅻ), 혼합(Ⅴ·Ⅶ·Ⅸ·Ⅹ)으로 나뉩니다.',
      source: 'https://www.ncbi.nlm.nih.gov/books/?term=cranial+nerves',
      lesion: '얼굴신경(Ⅶ)이 다치면 그쪽 얼굴이 처지고 눈이 안 감겨요. 눈돌림신경(Ⅲ)이 다치면 눈꺼풀이 처지고 눈이 바깥아래로 쏠려요. 미주신경(Ⅹ)이 다치면 목소리가 쉬고 삼키기 힘들어요.',
      stations: [
        [252, 40, 'Ⅰ 후각신경', '코의 냄새 신호를 뇌로 보내요. (감각)'],
        [252, 90, 'Ⅱ 시신경', '눈의 빛 신호를 뇌로 보내요. (감각)'],
        [252, 166, 'Ⅲ 눈돌림신경 · Ⅳ 도르래신경', '중뇌에서 나와 눈알을 움직여요. Ⅲ은 눈꺼풀·동공도 담당해요. (운동)'],
        [252, 222, 'Ⅴ 삼차신경', '다리뇌에서 나와 얼굴 감각과 씹는 근육을 맡아요. (감각+운동)'],
        [252, 271, 'Ⅵ 갈래신경 · Ⅶ 얼굴신경', 'Ⅵ은 눈을 바깥으로 돌려요(운동). Ⅶ은 표정 근육과 혀 앞 맛을 맡아요(혼합).'],
        [252, 316, 'Ⅷ 속귀신경', '청각과 평형감각을 뇌로 보내요. (감각)'],
        [252, 361, 'Ⅸ 혀인두신경 · Ⅹ 미주신경', '숨뇌에서 나와 삼킴·목소리·내장(심장·장)을 맡아요. (혼합)'],
        [252, 425, 'Ⅺ 더부신경 · Ⅻ 혀밑신경', 'Ⅺ은 목·어깨 근육(목빗근·등세모근), Ⅻ은 혀 움직임을 맡아요. (운동)']] }
    ,
    { id: 'cn12', name: '뇌신경 12개 (한 개씩)', old: '뇌신경', en: 'Cranial nerves one by one', body: CN_ATLAS, vb: '-10 -8 380 580', lc: 'transparent', color: '#e6d36a',
      direction: '뇌 ↔ 얼굴·목', crossing: '교차 없음(같은 쪽)', start: '뇌·뇌줄기', end: '얼굴·목·내장', cross: null,
      easy: '뇌에서 직접 나오는 12쌍을 위에서 아래로 한 개씩 봐요. 순서는 후각·시각·눈돌림·도르래·삼차·갈래·얼굴·속귀·혀인두·미주·더부·혀밑이에요.',
      expert: 'Ⅰ·Ⅱ는 끝뇌·사이뇌, Ⅲ·Ⅳ는 중뇌, Ⅴ–Ⅷ은 다리뇌, Ⅸ–Ⅻ는 숨뇌에서 나옵니다. 감각(Ⅰ·Ⅱ·Ⅷ), 운동(Ⅲ·Ⅳ·Ⅵ·Ⅺ·Ⅻ), 혼합(Ⅴ·Ⅶ·Ⅸ·Ⅹ)으로 나뉩니다. (Ⅳ는 중뇌 뒤쪽에서 나오며 반대쪽 근육을 맡습니다.)',
      source: 'https://www.ncbi.nlm.nih.gov/books/?term=cranial+nerves',
      lesion: 'Ⅲ이 다치면 눈꺼풀이 처지고 눈이 바깥아래로 쏠려요. Ⅶ이 다치면 그쪽 얼굴이 처져요. Ⅹ이 다치면 목소리가 쉬고 삼키기 힘들어요. Ⅻ이 다치면 혀를 내밀 때 다친 쪽으로 기울어요.',
      stations: [
        [252, 40, 'Ⅰ 후각신경', '코의 냄새 신호를 뇌로 보내요. (감각) 끝뇌에서 나와요.'],
        [252, 90, 'Ⅱ 시신경', '눈의 빛 신호를 뇌로 보내요. (감각) 사이뇌에서 나와요.'],
        [252, 150, 'Ⅲ 눈돌림신경', '중뇌에서 나와 눈알 대부분을 움직이고, 눈꺼풀을 들어 올리고 동공을 조절해요. (운동)'],
        [252, 182, 'Ⅳ 도르래신경', '중뇌 뒤쪽에서 나와 눈을 아래·안쪽으로 돌리는 위빗근을 맡아요. (운동)'],
        [252, 222, 'Ⅴ 삼차신경', '다리뇌에서 나와 얼굴 감각과 씹는 근육을 맡아요. (감각+운동)'],
        [252, 256, 'Ⅵ 갈래신경', '눈을 바깥으로 돌리는 가쪽곧은근을 맡아요. (운동)'],
        [252, 286, 'Ⅶ 얼굴신경', '표정 근육을 움직이고 혀 앞쪽 맛을 맡아요. (감각+운동)'],
        [252, 316, 'Ⅷ 속귀신경', '청각과 평형감각을 뇌로 보내요. (감각)'],
        [252, 346, 'Ⅸ 혀인두신경', '숨뇌에서 나와 삼킴, 혀 뒤쪽 맛과 감각을 맡아요. (감각+운동)'],
        [252, 376, 'Ⅹ 미주신경', '목소리와 삼킴, 심장·장 같은 내장을 맡아요. (감각+운동)'],
        [252, 410, 'Ⅺ 더부신경', '목빗근·등세모근을 움직여 고개와 어깨를 맡아요. (운동)'],
        [252, 440, 'Ⅻ 혀밑신경', '혀를 움직여요. (운동)']]},
    { id: 'vsc', name: '소뇌 경로 (앞척수소뇌로)', old: '전척수소뇌로', en: 'Ventral spinocerebellar tract', body: CB_ATLAS(`<path d="M166 316H180V480H166Z" fill="#ffb48f" opacity=".5"/><circle cx="202" cy="430" r="6" fill="#ffb48f"/>`), vb: '-10 -8 380 580', lc: '#d9480f', color: '#ffb48f',
      direction: '다리 힘줄 → 소뇌', crossing: '척수 안에서 한 번, 소뇌에서 다시 한 번', start: '오른쪽 다리 힘줄기관', end: '오른쪽 소뇌', cross: 3,
      easy: '다리 근육이 "얼마나 힘을 주고 있는지"를 소뇌에 알려주는 길이에요. 척수에서 반대쪽으로 건너가 올라간 뒤, 소뇌 앞에서 다시 건너와서 결국 처음과 같은 쪽 소뇌에 닿아요.',
      expert: '힘줄기관(골지) 등 고유감각 신호가 뒤뿌리로 들어와 뒤뿔 중간부 신경세포에서 시냅스하고, 대부분 앞백색교련으로 교차해 반대쪽 가쪽기둥의 앞척수소뇌로를 따라 오릅니다. 위소뇌다리를 통해 소뇌로 들어간 뒤 다시 교차하여 같은쪽 소뇌에 닿습니다.',
      source: 'https://www.ncbi.nlm.nih.gov/books/?term=spinocerebellar+tract',
      lesion: '뒤척수소뇌로와 마찬가지로 같은 쪽 팔다리의 협응이 깨져요(운동실조). 이 길은 두 번 건너가서 척수 한쪽 손상만으로 증상이 뚜렷이 나뉘지 않을 수 있어요.',
      stations: [
        [252, 548, '힘줄기관(다리)', '근육이 얼마나 세게 당겨지는지 재는 센서예요.'],
        [252, 480, '뒤뿌리', '센서 신호가 척수로 들어가는 뒷문이에요.'],
        [252, 430, '뒤뿔 중간부', '척수 안의 중계소예요. 여기서 다음 신경으로 넘겨요.'],
        [178, 400, '앞백색교련 (건너감)', '척수 앞쪽 가운데로 반대쪽으로 건너가요.'],
        [172, 340, '앞척수소뇌로', '반대쪽 척수 옆쪽 기둥을 따라 올라가요.'],
        [140, 224, '위소뇌다리', '뇌줄기에서 소뇌로 들어가는 입구예요. 여기서 신호가 다시 반대쪽으로 건너와요.'],
        [252, 232, '소뇌 (처음과 같은 쪽)', '두 번 건너와서 처음 다리와 같은 쪽 소뇌에 닿아요.']] }
  ];
  routes.push(...extra);
  window.NV54_EXTRA = extra;
  deck.push({ text: '두 눈의 시신경이 만나 코쪽 망막 신호가 반대쪽으로 건너가는 곳은 어디일까요?', route: extra[0], options: ['시상', '시각교차', '뒤통수엽'] });
  // 병변 쪽 문제: 교차 전엔 같은 쪽, 교차 후엔 반대쪽
  deck.push(
    { text: '오른쪽 척수 반쪽(가슴 높이)이 다쳤어요. 겉질척수로가 다치면 어느 쪽 다리가 약해질까요?', route: routes[0], options: ['왼쪽 다리', '오른쪽 다리', '양쪽 다리'], answer: '오른쪽 다리', why: '겉질척수로는 이미 숨뇌에서 건넜어요. 척수에서는 같은 쪽을 지나므로 같은 쪽(오른쪽) 다리가 약해져요.' },
    { text: '왼쪽 뇌의 속섬유막이 다쳤어요. 어느 쪽 몸이 약해질까요?', route: routes[0], options: ['왼쪽 몸', '오른쪽 몸', '양쪽 몸'], answer: '오른쪽 몸', why: '교차(숨뇌) 위쪽이 다치면 반대쪽 몸이 약해져요.' },
    { text: '오른쪽 척수 반쪽(가슴 높이)이 다쳤어요. 통증·온도 감각이 떨어지는 쪽은 어디일까요?', route: routes[2], options: ['오른쪽 다리', '왼쪽 다리', '양쪽 다리'], answer: '왼쪽 다리', why: '척수시상로는 들어온 높이 근처의 척수에서 이미 건너가요. 그래서 다친 쪽의 반대쪽(왼쪽) 다리가 둔해져요.' },
    { text: '오른쪽 척수 뒤기둥이 다쳤어요. 위치·진동 감각이 떨어지는 쪽은 어디일까요?', route: routes[1], options: ['왼쪽 몸', '오른쪽 몸', '양쪽 몸'], answer: '오른쪽 몸', why: '뒤기둥 경로는 숨뇌에서 건너가요. 그 아래 척수에서는 같은 쪽을 지나므로 같은 쪽(오른쪽)이 둔해져요.' });
  // 구글 이미지 검색 링크(그림은 가져오지 않고 검색만 연다). 영문 경로명을 붙여 검색 정확도를 높임
  const gimg = s => `<a class="nv54-gimg" target="_blank" rel="noopener" href="https://www.google.com/search?tbm=isch&q=${encodeURIComponent(s[2].replace(/\s*[(→].*$/, '') + ' ' + active.en.replace(/\s*\(.*$/, '') + ' anatomy')}">🔍 구글 이미지로 보기</a>`;
  const flowText = r => r.cross == null ? `${r.start} → ${r.end} (건너가지 않아요)` : `${r.start} → ${r.crossing}에서 교차 → ${r.end}`;
  let step = 0;

  const BODY = `
    <ellipse class="nv54-skin" cx="180" cy="92" rx="100" ry="86"/>
    <ellipse class="nv54-brain" cx="137" cy="82" rx="52" ry="58"/><ellipse class="nv54-brain" cx="223" cy="82" rx="52" ry="58"/>
    <ellipse class="nv54-deep" cx="158" cy="108" rx="14" ry="10"/><ellipse class="nv54-deep" cx="202" cy="108" rx="14" ry="10"/>
    <rect class="nv54-stem" x="164" y="124" width="32" height="30" rx="9"/><rect class="nv54-stem" x="157" y="150" width="46" height="26" rx="13"/>
    <path class="nv54-stem" d="M158 174H202L200 218H160Z"/>
    <rect class="nv54-cord" x="160" y="216" width="40" height="186" rx="12"/>
    <path class="nv54-torso" d="M122 238Q180 218 238 238L246 402H114Z"/>
    <path class="nv54-torso" d="M122 238L70 330 62 392M238 238L290 330 298 392"/>
    <text class="nv54-region" x="125" y="22">왼쪽 뇌</text><text class="nv54-region" x="235" y="22">오른쪽 뇌</text>
    <text class="nv54-region" x="95" y="330">왼쪽 몸</text><text class="nv54-region" x="265" y="318">오른쪽 몸</text>`;

  // 뇌 그림 + 신경 그림으로 나눌 경로: y = 두 장을 가르는 높이, [제목, viewBox]
  const SPLIT = {};
  function renderDiagram(route) {
    const st = route.stations, color = route.color;
    const line = st.map(s => `${s[0]},${s[1]}`).join(' ');
    const lesion = {}; // 교차 경로: 교차 바로 전(A)·후(B) 정류장에 병변 표시
    if (route.cross != null && !['vis', 'aud'].includes(route.id)) { lesion[Math.max(0, route.cross - 1)] = 'A'; lesion[Math.min(st.length - 1, route.cross + 1)] = 'B'; }
    const marks = st.map((s, i) => {
      const left = s[0] < 180, lx = left ? -6 : 366, ex = left ? 76 : 284;
      return `<g class="nv54-st" data-step="${i}" tabindex="0" role="button" aria-label="${i + 1}단계 ${s[2]}">
        <line class="nv54-leader" x1="${ex}" y1="${s[1]}" x2="${s[0]}" y2="${s[1]}"/>
        <text class="nv54-name" x="${lx}" y="${s[1] + 4}" text-anchor="${left ? 'start' : 'end'}">${s[2].includes(' · ') ? s[2].split(' · ').map((t, k) => `<tspan x="${lx}" dy="${k ? 1.15 : -0.3}em">${t}</tspan>`).join('') : s[2]}</text>
        ${i === route.cross ? `<circle class="nv54-xring" cx="${s[0]}" cy="${s[1]}" r="14"/><text class="nv54-xtxt" x="${left ? s[0] + 28 : s[0] - 28}" y="${s[1] + 4}" text-anchor="${left ? 'start' : 'end'}">교차!</text>` : ''}
        ${lesion[i] ? `<circle cx="${s[0] + (left ? -17 : 17)}" cy="${s[1] - 10}" r="9" fill="#ff5a6e" stroke="#fff" stroke-width="1.5"/><text x="${s[0] + (left ? -17 : 17)}" y="${s[1] - 6.5}" text-anchor="middle" fill="#fff" font-size="11" font-weight="700">${lesion[i]}</text>` : ''}
        <circle cx="${s[0]}" cy="${s[1]}" r="8"/><text class="nv54-num" x="${s[0]}" y="${s[1] + 3.5}" text-anchor="middle">${i + 1}</text></g>`;
    });
    const cut = SPLIT[route.id];
    // 한 장짜리 그림을 y 기준으로 위·아래 두 장(뇌 그림 / 신경 그림)으로 나눠 그림. 선·점은 양쪽에 그리고 viewBox로 잘라냄.
    const part = (vb, keep, label) => `<p class="nv54-role"><b>${label}</b></p><svg class="nv54-route-diagram" viewBox="${vb}" role="group"
      aria-label="${flowText(route)} 개념도 · ${label}" style="--c:${color}">
      ${route.body || BODY}
      <polyline class="nv54-diagram-line" points="${line}"/><polyline class="nv54-flow-line" points="${line}"/>
      ${marks.filter((m, i) => keep(st[i][1])).join('')}
      <circle class="nv54-dot" r="6"/>
    </svg>`;
    const body = cut
      ? part(cut.top[1], y => y <= cut.y, cut.top[0]) + part(cut.bot[1], y => y > cut.y, cut.bot[0])
      : `<p class="nv54-role"><b>그림 ① 어디를 지나가나</b> · 몸·뇌 속 위치 (왼쪽 = 몸의 왼쪽)</p><svg class="nv54-route-diagram" viewBox="${route.vb || '-10 0 380 430'}" role="group"
      aria-label="${flowText(route)} 개념도" style="--c:${color};${route.lc ? `--lc:${route.lc}` : ''}">
      ${route.body || BODY}
      <polyline class="nv54-diagram-line" points="${line}"/><polyline class="nv54-flow-line" points="${line}"/>
      ${marks.join('')}
      <circle class="nv54-dot" r="6"/>
      ${route.vb ? '' : `<text class="nv54-foot" x="180" y="426">정면 개념도 · 그림 왼쪽 = 몸의 왼쪽 · 실제 위치·크기와 다릅니다</text>`}
    </svg>`;
    return body + `<p class="nv54-foot2">정면 개념도 · 그림 왼쪽 = 몸의 왼쪽 · 실제 위치·크기와 다릅니다</p>
    <div class="nv54-stepcard" role="status" aria-live="polite"></div>
    <div class="nv54-controls"><button type="button" data-move="-1">◀ 이전</button><button type="button" data-move="1">다음 ▶</button></div>
`;
  }

  // 점·카드·강조를 다시 그리지 않고 제자리에서 갱신 (점 이동 애니메이션 유지)
  function setStep(i) {
    const st = active.stations;
    step = Math.max(0, Math.min(st.length - 1, i));
    const s = st[step];
    study.querySelectorAll('.nv54-dot').forEach(d => { d.style.transform = `translate(${s[0]}px,${s[1]}px)`; });
    study.querySelectorAll('.nv54-st').forEach(g => g.classList.toggle('on', Number(g.dataset.step) === step));
    study.querySelector('.nv54-stepcard').innerHTML = `<b>${step + 1}/${st.length} · ${s[2]}</b> <small>(자세한 설명은 큰 화면의 설명 카드)</small><br>${gimg(s)}`;
    renderLanes();
  }

  // 오른쪽 큰 화면: 신호가 왼쪽/오른쪽 길 중 어디에 있는지, 어디서 건너가는지 보여주는 "두 차선" 그림
  const lanes = document.createElement('div');
  lanes.id = 'nv54-lanes';
  (document.querySelector('.stage') || document.body).appendChild(lanes);
  lanes.addEventListener('click', e => { const r = e.target.closest('[data-step]'); if (r) setStep(Number(r.dataset.step)); });
  // 그림 ③: 척수 가로단면(경로가 단면 어디에 있나) / 시각은 손상 부위별 시야 모양. 교육용 모식도.
  const TR = { dc: [196, 72, 15, 24, '뒤기둥(얇은·쐐기다발)', 62], cst: [252, 118, 20, 18, '가쪽겉질척수로', 100],
    dsc: [290, 130, 9, 16, '뒤척수소뇌로', 124], vsc: [292, 170, 9, 16, '앞척수소뇌로', 152], stt: [275, 205, 14, 12, '앞가쪽계(척수시상로)', 205] };
  const CORD = {
    cst: { hi: [['cst', 'R']], dots: [[244, 176, '앞뿔 운동신경세포']], note: '왼쪽 뇌의 명령은 이미 숨뇌에서 건너와서, 오른쪽 가쪽겉질척수로로 내려가 오른쪽 앞뿔에 닿아요.' },
    dcml: { hi: [['dc', 'R']], dots: [[222, 90, '뒤뿌리로 들어옴']], arrows: [[[222, 90], [204, 80]]], note: '오른쪽 감각은 오른쪽 뒤기둥을 타고 올라가요(아직 안 건넜어요). 건너가는 곳은 더 위 숨뇌예요.' },
    stt: { hi: [['stt', 'L']], dots: [[222, 90, '뒤뿔에서 중계']], arrows: [[[222, 96], [200, 170], [150, 172], [100, 200], [86, 205]]], note: '오른쪽 통증은 뒤뿔에서 중계된 뒤 같은 높이에서 앞백색맞교차로 건너가, 왼쪽 앞가쪽계로 올라가요.' },
    cb: { hi: [['dsc', 'R']], dots: [[228, 128, '클라크핵']], arrows: [[[222, 92], [228, 122]], [[236, 128], [282, 130]]], note: '뒤척수소뇌로는 건너가지 않고 같은 쪽 가장자리를 타고 소뇌로 올라가요.' },
    vsc: { hi: [['vsc', 'L']], dots: [[236, 140, '뒤뿔 중간부']], arrows: [[[236, 146], [200, 170], [150, 172], [100, 168], [88, 170]]], note: '앞척수소뇌로는 척수에서 반대쪽으로 건너가 왼쪽 가장자리로 올라가요.' }
  };
  function renderSection() {
    if (active.id === 'vis') {
      const rows = [['왼쪽 시신경', 'L'], ['시각교차', 'T'], ['왼쪽 시각로', 'H'], ['왼쪽 뒤통수엽', 'M']];
      const fld = (cx, cy, dark, spared) => `<circle cx="${cx}" cy="${cy}" r="22" fill="#e9f4ff" stroke="#7fb8ff"/><clipPath id="vf${cx}${cy}"><circle cx="${cx}" cy="${cy}" r="22"/></clipPath>
        <rect x="${dark === 'all' ? cx - 22 : dark === 'l' ? cx - 22 : cx}" y="${cy - 22}" width="${dark === 'all' ? 44 : 22}" height="44" fill="#1b2733" clip-path="url(#vf${cx}${cy})"/>${spared ? `<circle cx="${cx}" cy="${cy}" r="6" fill="#e9f4ff"/>` : ''}`;
      const body = rows.map((r, i) => { const y = 52 + i * 62; const k = r[1];
        const lf = k === 'L' ? 'all' : k === 'T' ? 'l' : 'r', rf = k === 'L' ? null : k === 'T' ? 'r' : 'r';
        return `<text x="8" y="${y + 4}" class="nv54-s-t" fill="#cfe6f0">${i + 1}. ${r[0]}</text>${fld(300, y, lf, k === 'M')}${rf ? fld(420, y, rf, k === 'M') : fld(420, y, 'none')}`; }).join('');
      return `<h3>그림 ③ 어디가 다치면 어떻게 보일까?</h3><p class="nv54-role">환자가 보는 시야예요(검게 칠한 곳 = 안 보임). 왼쪽 동그라미 = 왼쪽 눈, 오른쪽 = 오른쪽 눈.</p>
      <svg viewBox="0 0 480 270" role="img" aria-label="시각경로 손상 부위별 시야 모양"><text x="300" y="14" text-anchor="middle" class="nv54-s-t" fill="#9fc4d6">왼쪽 눈</text><text x="420" y="14" text-anchor="middle" class="nv54-s-t" fill="#9fc4d6">오른쪽 눈</text>${body}</svg>
      <div class="nv54-lanes-card">1 왼눈만 안 보임 · 2 양쪽 바깥쪽 시야가 안 보임(터널 모양) · 3 양쪽 눈의 오른쪽 시야가 안 보임 · 4 3과 비슷하지만 가운데는 보임(황반 보존)</div>`;
    }
    const G = { brach: 1, lumb: 1, aud: 1, cn: 1, cn12: 1 }[active.id];
    if (G) {
      const col = active.color, T = (x, y, t, a = 'middle', f = '#e8f3f8', w = 400) => `<text x="${x}" y="${y + 4}" text-anchor="${a}" class="nv54-s-t" fill="${f}" font-weight="${w}">${t}</text>`;
      const nd = (x, y, w, t, hi) => `<rect x="${x - w / 2}" y="${y - 15}" width="${w}" height="30" rx="8" fill="${hi ? col : '#16303f'}" fill-opacity="${hi ? 0.9 : 1}" stroke="${hi ? '#fff' : '#4d7a92'}"/>${T(x, y, t, 'middle', hi ? '#0b1a26' : '#cfe6f0', hi ? 700 : 400)}`;
      const ed = (x1, y1, x2, y2, hi, w) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${hi ? col : '#3b6277'}" stroke-width="${w || (hi ? 3 : 1.5)}" ${hi ? '' : 'stroke-dasharray="4 4"'}/>`;
      let svg = '', note = '', head = '', H = 300;
      if (active.id === 'brach') {
        head = '그림 ③ 신경이 어떻게 모여 갈라질까? (팔신경얼기)'; H = 290;
        const R = ['C5', 'C6', 'C7', 'C8', 'T1'], ry = k => 40 + k * 50;
        const tr = [['위줄기', 65, [0, 1]], ['가운데줄기', 140, [2]], ['아래줄기', 215, [3, 4]]], cd = [['가쪽다발', 65], ['뒤다발', 140], ['안쪽다발', 215]];
        svg = tr.map(t => t[2].map(k => ed(95, ry(k), 205, t[1], 1)).join('')).join('') +
          tr.map(t => ed(285, t[1], 355, 140, 1)).join('') + ed(285, 65, 355, 65) + ed(285, 140, 355, 65) + ed(285, 215, 355, 215) +
          [['근육피부신경', 40, 65, 0], ['겨드랑신경', 165, 140, 0], ['노신경', 125, 140, 1], ['자신경', 215, 215, 0]].map(n => ed(445, n[2], 575, n[1], n[3])).join('') +
          R.map((r, k) => nd(60, ry(k), 70, r)).join('') + tr.map(t => nd(245, t[1], 80, t[0], 1)).join('') + cd.map(c => nd(400, c[1], 90, c[0], c[0] === '뒤다발')).join('') +
          [['근육피부신경', 40, 0], ['노신경', 125, 1], ['겨드랑신경', 165, 0], ['자신경', 215, 0]].map(n => nd(630, n[1], 110, n[0], n[2])).join('') +
          T(60, 270, '신경뿌리', 'middle', '#9fc4d6') + T(245, 270, '줄기', 'middle', '#9fc4d6') + T(400, 270, '다발', 'middle', '#9fc4d6') + T(630, 270, '끝가지', 'middle', '#9fc4d6');
        note = '노신경은 C5~T1 신경뿌리가 모든 줄기를 거쳐 뒤다발로 모인 뒤 갈라져 나와요. 정중신경은 가쪽·안쪽 다발에서 와요(그림 생략).';
      } else if (active.id === 'lumb') {
        head = '그림 ③ 신경이 어떻게 모여 갈라질까? (엉치신경얼기)'; H = 280;
        const R = ['L4', 'L5', 'S1', 'S2', 'S3'];
        svg = R.map((r, k) => ed(95, 40 + k * 50, 235, 140, 1)).join('') + ed(365, 140, 505, 90, 1) + ed(365, 140, 505, 190, 1) +
          R.map((r, k) => nd(60, 40 + k * 50, 70, r)).join('') + nd(300, 140, 130, '궁둥신경', 1) + nd(580, 90, 120, '정강신경', 1) + nd(580, 190, 140, '온종아리신경', 1) +
          T(60, 262, '신경뿌리', 'middle', '#9fc4d6');
        note = '궁둥신경은 L4~S3 신경뿌리가 모여 만들어지고, 무릎 위쪽에서 정강신경과 온종아리신경으로 갈라져요. 두 신경은 위쪽에선 한 칼집에 같이 있어요.';
      } else if (active.id === 'aud') {
        head = '그림 ③ 귀에서 청각겉질까지 (순서)'; H = 420;
        const lv = ['달팽이관(귀)', '달팽이신경핵', '위올리브복합체', '가쪽섬유띠', '아래둔덕', '안쪽무릎체', '청각겉질'], y = k => 30 + k * 60;
        svg = lv.slice(1).map((l, k) => ed(350, y(k) + 15, 350, y(k + 1) - 15, 1, 3)).join('') + lv.map((l, k) => nd(350, y(k), 200, l, k === 2)).join('') +
          T(465, y(2) - 4, '← 여기서 양쪽으로 갈라져요', 'start', col, 700) + T(465, y(2) + 14, '(반대쪽 길이 더 우세)', 'start', '#cfe6f0');
        note = '소리는 위올리브복합체부터 양쪽 뇌로 올라가요. 반대쪽(왼쪽) 길이 더 굵고 같은 쪽 길도 있어서, 한쪽 뇌가 다쳐도 완전히 안 들리진 않아요.';
      } else {
        head = '그림 ③ 뇌신경 12개 한눈에 (감각 · 운동 · 혼합)'; H = 380;
        const ty = { S: ['감각', '#7fb8ff'], M: ['운동', '#ffb369'], B: ['혼합', '#c9a7ff'] };
        const cn = [['Ⅰ', '후각신경', 'S', '냄새'], ['Ⅱ', '시각신경', 'S', '시력'], ['Ⅲ', '눈돌림신경', 'M', '눈 움직임 · 동공 수축'], ['Ⅳ', '도르래신경', 'M', '눈 움직임(위빗근)'], ['Ⅴ', '삼차신경', 'B', '얼굴 감각 · 씹기'], ['Ⅵ', '갓돌림신경', 'M', '눈 바깥쪽 움직임'], ['Ⅶ', '얼굴신경', 'B', '표정 · 혀 앞쪽 맛'], ['Ⅷ', '속귀신경', 'S', '청각 · 균형'], ['Ⅸ', '혀인두신경', 'B', '삼킴 · 혀 뒤쪽 맛'], ['Ⅹ', '미주신경', 'B', '내장 조절 · 목소리'], ['Ⅺ', '더부신경', 'M', '어깨 · 목 근육'], ['Ⅻ', '혀밑신경', 'M', '혀 움직임']];
        svg = cn.map((c, k) => { const y = 24 + k * 28; return `<rect x="20" y="${y - 11}" width="60" height="22" rx="6" fill="${ty[c[2]][1]}"/>${T(50, y, ty[c[2]][0], 'middle', '#0b1a26', 700)}${T(100, y, c[0], 'start', '#fff', 700)}${T(135, y, c[1], 'start')}${T(300, y, c[3], 'start', '#cfe6f0')}`; }).join('');
        note = '순서: 앞(Ⅰ·Ⅱ 뇌 앞쪽) → 중뇌(Ⅲ·Ⅳ) → 다리뇌(Ⅴ~Ⅶ, 다리뇌와 숨뇌 사이 Ⅵ~Ⅷ) → 숨뇌(Ⅸ~Ⅻ). 감각/운동 분류는 교재 암기법과 대조해 보세요.';
      }
      return `<h3>${head}</h3><svg viewBox="0 0 700 ${H}" role="img" aria-label="${active.name} 구조 그림" style="--c:${col}">${svg}</svg><div class="nv54-lanes-card">${note}</div>`;
    }
    const c = CORD[active.id]; if (!c) return '';
    const col = active.color, side = (x, s) => (s === 'L' ? 360 - x : x);
    const gm = 'M180 118C196 112 205 100 212 70L226 68C226 95 222 118 236 128C262 132 270 150 266 176C262 200 232 206 214 196C200 190 190 190 180 190Z';
    const tracts = Object.entries(TR).map(([k, t]) => ['R', 'L'].map(s => { const on = c.hi.some(h => h[0] === k && h[1] === s);
      return `<ellipse cx="${side(t[0], s)}" cy="${t[1]}" rx="${t[2]}" ry="${t[3]}" fill="${on ? col : '#2f5468'}" fill-opacity="${on ? 0.95 : 0.55}" stroke="${on ? '#fff' : '#4d7a92'}" stroke-width="${on ? 2 : 1}"/>`; }).join('')).join('');
    const OX = 170, labels = Object.entries(TR).map(([k, t]) => { const hl = c.hi.find(h => h[0] === k);
      const s = hl ? hl[1] : 'R', x0 = OX + (s === 'R' ? t[0] + t[2] : 360 - t[0] - t[2]), lx = s === 'R' ? 490 : 210;
      return `<line x1="${x0}" y1="${t[1]}" x2="${lx}" y2="${t[5]}" stroke="${hl ? col : '#4d7a92'}" stroke-dasharray="3 3"/><text x="${lx + (s === 'R' ? 4 : -4)}" y="${t[5] + 4}" text-anchor="${s === 'R' ? 'start' : 'end'}" class="nv54-s-t" fill="${hl ? col : '#8fb0c0'}" font-weight="${hl ? 700 : 400}">${t[4]}</text>`; }).join('');
    const dots = (c.dots || []).map(d => `<circle cx="${d[0]}" cy="${d[1]}" r="6" fill="#fff" stroke="${col}" stroke-width="3"/><text x="${d[0] - 10}" y="${d[1] - 8}" text-anchor="end" class="nv54-s-t" fill="#fff">${d[2]}</text>`).join('');
    const arrows = (c.arrows || []).map(a => `<polyline points="${a.map(p => p.join(',')).join(' ')}" fill="none" stroke="${col}" stroke-width="3" stroke-dasharray="6 4" marker-end="url(#ah)"/>`).join('');
    return `<h3>그림 ③ 척수를 가로로 자르면?</h3><p class="nv54-role">척수를 허리 쪽에서 위로 올려다본 단면이에요(위 = 등, 아래 = 배). 색칠한 곳이 이 경로가 지나는 자리예요.</p>
      <svg viewBox="0 0 700 300" style="--c:${col}" role="img" aria-label="${active.name} 척수 단면 위치">
        <defs><marker id="ah" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="${col}"/></marker></defs>
        <g transform="translate(170,0)"><ellipse cx="180" cy="150" rx="125" ry="105" fill="#16303f" stroke="#3b6277" stroke-width="2"/>
        <path d="${gm}" fill="#2a4d63"/><path d="${gm}" fill="#2a4d63" transform="translate(360,0) scale(-1,1)"/><circle cx="180" cy="150" r="4" fill="#0b1a26"/>
        ${tracts}${arrows}${dots}</g>
        <text x="350" y="30" text-anchor="middle" class="nv54-s-t" fill="#9fc4d6">등쪽(뒤)</text><text x="350" y="292" text-anchor="middle" class="nv54-s-t" fill="#9fc4d6">배쪽(앞)</text>
        <text x="8" y="292" class="nv54-s-t" fill="#9fc4d6">◀ 몸의 왼쪽</text><text x="692" y="292" text-anchor="end" class="nv54-s-t" fill="#9fc4d6">몸의 오른쪽 ▶</text>
        ${labels}
      </svg>
      <div class="nv54-lanes-card">${c.note}</div>`;
  }
  // 그림 ④: "왜 그런 증상이 생기나" 원리 그림 (병변 위치 → 증상 쪽). 모식도.
  function renderPrinciple() {
    const col = active.color, st = active.stations, id = active.id;
    const T = (x, y, t, a = 'middle', f = '#e8f3f8', w = 400) => `<text x="${x}" y="${y + 4}" text-anchor="${a}" class="nv54-s-t" fill="${f}" font-weight="${w}">${t}</text>`;
    const wrap = (h, svg, H, cards, intro) => `<h3>${h}</h3><p class="nv54-role">${intro}</p><svg viewBox="0 0 700 ${H}" role="img" aria-label="${h}" style="--c:${col}">${svg}</svg>${cards.map(c => `<div class="nv54-lanes-card">${c}</div>`).join('')}`;
    if (id === 'vis') {
      const f = (pts, c) => `<polyline points="${pts}" fill="none" stroke="${c}" stroke-width="4" stroke-linejoin="round" opacity=".9"/>`;
      const B = '#7fb8ff', O = '#ffb369', eye = (x, t) => `<circle cx="${x}" cy="48" r="26" fill="#e9f4ff" stroke="#7fb8ff"/><circle cx="${x}" cy="48" r="9" fill="#2a4d63"/>${T(x, 92, t, 'middle', '#9fc4d6')}`;
      const mk = (x, y, n) => `<circle cx="${x}" cy="${y}" r="13" fill="#ff5a6e" stroke="#fff" stroke-width="2"/>${T(x, y, n, 'middle', '#fff', 700)}`;
      const svg = f('235,60 325,150 290,225 205,325', B) + f('465,60 375,150 410,225 495,325', O) + f('435,60 340,150 290,225 205,325', B) + f('265,60 360,150 410,225 495,325', O) +
        eye(250, '왼쪽 눈') + eye(450, '오른쪽 눈') +
        mk(278, 112, 1) + mk(350, 150, 2) + mk(292, 215, 3) + mk(205, 330, 4) +
        T(520, 150, '← 시각교차', 'start', '#9fc4d6') + T(150, 330, '왼쪽 뒤통수엽', 'end', '#9fc4d6') + T(550, 330, '오른쪽 뒤통수엽', 'start', '#9fc4d6') +
        T(30, 200, '파랑 = 오른쪽 시야의 신호', 'start', B, 700) + T(30, 222, '주황 = 왼쪽 시야의 신호', 'start', O, 700);
      return wrap('그림 ④ 왜 이런 모양으로 안 보일까? (원리)', svg, 350, [
        '<b>원리 ① 시야는 거꾸로, 반으로 갈라져요.</b> 오른쪽 시야(파랑)는 왼쪽 눈의 귀쪽(바깥) 망막과 오른쪽 눈의 코쪽(안쪽) 망막에 맺혀요. 왼쪽 시야(주황)는 반대예요.',
        '<b>원리 ② 코쪽 망막 섬유만 시각교차에서 건너가요.</b> 그래서 왼쪽 시각로에는 두 눈의 오른쪽 시야(파랑)가 같이 모여요. 1번은 한쪽 눈 전체, 2번은 건너가는 코쪽 섬유 둘 → 양쪽 바깥 시야, 3·4번은 한쪽 뇌 → 반대쪽 시야 절반이 사라져요.'
      ], '빨간 번호가 다치는 곳이에요. 선은 신호가 지나는 길이에요.');
    }
    if (id === 'cn' || id === 'cn12') {
      const seg = [['중뇌', 'Ⅲ · Ⅳ', 55, '#ffd166'], ['다리뇌', 'Ⅴ · Ⅵ · Ⅶ · Ⅷ', 150, '#7fe0b0'], ['숨뇌', 'Ⅸ · Ⅹ · Ⅺ · Ⅻ', 255, '#ff9fb6']];
      const svg = `<rect x="60" y="20" width="90" height="290" rx="30" fill="#16303f" stroke="#3b6277"/><rect x="60" y="20" width="90" height="80" rx="30" fill="#ffd166" fill-opacity=".6"/><rect x="60" y="100" width="90" height="100" fill="#7fe0b0" fill-opacity=".6"/><rect x="60" y="200" width="90" height="110" rx="30" fill="#ff9fb6" fill-opacity=".6"/>` +
        seg.map(g => T(105, g[2], g[0], 'middle', '#0b1a26', 700) + `<line x1="150" y1="${g[2]}" x2="220" y2="${g[2]}" stroke="${g[3]}" stroke-width="3"/>${T(230, g[2], g[1] + ' 신경핵이 이 높이에 있어요', 'start', g[3], 700)}`).join('') +
        T(400, 20, 'Ⅰ · Ⅱ 는 뇌줄기가 아니라 뇌 앞쪽에서 나와요', 'start', '#9fc4d6');
      return wrap('그림 ④ 왜 높이로 증상이 달라질까? (원리)', svg, 330, [
        '<b>원리: 뇌신경은 뇌줄기의 "높이"마다 정해진 신경핵에서 나와요.</b> 그래서 뇌줄기의 어느 높이가 다쳤는지에 따라 사라지는 기능이 달라요.',
        '중뇌 → 눈 움직임(Ⅲ·Ⅳ) / 다리뇌 → 씹기·표정·균형(Ⅴ~Ⅷ) / 숨뇌 → 삼킴·목소리·혀(Ⅸ~Ⅻ). 한 높이가 다치면 그 높이의 신경들이 같이 무너져요.'
      ], '뇌줄기를 세로로 보고, 높이별로 신경핵을 묶었어요.');
    }
    if (id === 'aud') return `<h3>그림 ④ 왜 한쪽이 다쳐도 덜 안 들릴까? (원리)</h3><div class="nv54-lanes-card"><b>원리 ① 위올리브복합체에서 양쪽으로 갈라져요.</b> 한쪽 귀 신호가 달팽이신경핵을 지나 위올리브복합체에서 같은 쪽과 반대쪽 둘 다로 보내져요(그림 ①의 굵은 선과 점선).</div><div class="nv54-lanes-card"><b>원리 ② 양쪽 신호를 비교해 소리 방향을 알아요.</b> 두 귀에 소리가 닿는 시간·크기 차이를 위올리브복합체가 비교해요. 그래서 이 높이 아래(귀·청각신경)가 다치면 한쪽 귀가 안 들리지만, 위쪽 뇌가 한쪽만 다치면 양쪽 귀 소리가 반대쪽에서 이어져 완전히 안 들리진 않고 방향 찾기가 어려워져요.</div>`;
    const cross = active.cross, side = s => (s[0] < 180 ? 'L' : 'R'), nm = x => x === 'L' ? '왼쪽' : '오른쪽';
    const sensory = active.direction.startsWith('몸'), defSide = side(sensory ? st[0] : st[st.length - 1]);
    const X = { L: 200, R: 500 };
    if (cross != null) {
      const a = Math.max(0, cross - 1), b = Math.min(st.length - 1, cross + 1), c0 = side(st[0]), c1 = c0 === 'L' ? 'R' : 'L';
      const card = (lab, c, stn) => `<b>병변 ${lab}</b> · ${nm(c)} 쪽의 <b>${stn}</b>가 다치면 → <b>${nm(defSide)} 몸</b>에 증상 <b>(병변과 ${c === defSide ? '같은 쪽' : '반대쪽'})</b>`;
      return `<h3>그림 ④ 왜 다친 곳에 따라 증상 쪽이 바뀔까? (원리)</h3><p class="nv54-role">그림 ①의 빨간 A·B가 병변 위치예요(A=교차 전, B=교차 후).</p>` + [
        card('A (교차 전)', c0, st[a][2]), card('B (교차 후)', c1, st[b][2]),
        `<b>원리:</b> 길이 건너가는 곳(⚡)을 기준으로, 건너기 전과 후에 길이 놓인 쪽이 달라요. 증상이 나타나는 몸은 항상 ${nm(defSide)} 몸 하나인데, 길이 어느 쪽에 있을 때 끊겼는지에 따라 병변이 같은 쪽이 되기도 하고 반대쪽이 되기도 해요.`
      ].map(c => `<div class="nv54-lanes-card">${c}</div>`).join('');
    }
    const n = Math.min(5, st.length), idx = Array.from({ length: n }, (_, k) => Math.round(k * (st.length - 1) / (n - 1)));
    const x = X[defSide], svg = `<rect x="${x - 100}" y="14" width="200" height="${n * 62 + 10}" rx="14" fill="none" stroke="#3b6277"/>` + T(x, n * 62 + 30, nm(defSide) + ' 몸', 'middle', '#9fc4d6') +
      `<line x1="${x}" y1="40" x2="${x}" y2="${40 + (n - 1) * 62}" stroke="${col}" stroke-width="4" stroke-dasharray="7 5"/>` +
      idx.map((i, k) => { const h = k === Math.floor(n / 2); return `<rect x="${x - 80}" y="${25 + k * 62}" width="160" height="30" rx="8" fill="${h ? '#ff5a6e' : '#16303f'}" stroke="${h ? '#fff' : '#4d7a92'}"/>${T(x, 40 + k * 62, st[i][2], 'middle', '#fff', h ? 700 : 400)}`; }).join('') +
      T(x + 120, 40 + Math.floor(n / 2) * 62, '← 병변', 'start', '#ff8a98', 700);
    return wrap('그림 ④ 왜 같은 쪽에만 증상이 생길까? (원리)', svg, n * 62 + 50, [
      `<b>원리:</b> 이 길은 건너가지 않고 처음부터 끝까지 ${nm(defSide)} 쪽에만 있어요. 그래서 이 길 어디가 다쳐도 증상은 같은 ${nm(defSide)} 몸에만 나타나요(반대쪽엔 영향 없음).`
    ], '신호가 지나는 길을 순서대로 세로로 놓았어요.');
  }
  // 척수 3대 경로 한눈에 비교표 (현재 경로 줄 강조)
  function renderCompare() {
    const rows = [['cst', '겉질척수로', '운동 명령 (뇌→근육)', '숨뇌 아래쪽', '반대쪽 약해짐', '같은 쪽 약해짐'],
      ['dcml', '뒤기둥 경로', '정교한 촉각·진동·위치감각', '숨뇌', '반대쪽 감각 둔함', '같은 쪽 감각 둔함'],
      ['stt', '척수시상로', '통증·온도', '척수(들어온 높이 근처)', '반대쪽 감각 둔함', '반대쪽 감각 둔함']];
    if (!rows.some(r => r[0] === active.id)) return '';
    return `<h3>한눈에 비교 · 척수 3대 경로</h3><div class="nv54-lanes-card" style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:13px">
      <tr style="color:#7f98a9;text-align:left"><th>경로</th><th>전하는 것</th><th>건너는 곳</th><th>뇌 쪽을 다치면</th><th>척수 한쪽을 다치면</th></tr>
      ${rows.map(r => `<tr style="${r[0] === active.id ? 'background:#1d3a4d;font-weight:700' : ''}">${r.slice(1).map(c => `<td style="padding:5px 4px;border-top:1px solid #2a4254">${c}</td>`).join('')}</tr>`).join('')}</table>
      <small>※ 몸의 증상 쪽 기준. 시험에 자주 나오는 비교예요.</small></div>`;
  }
  // 신경얼기 손상 그림: 점선 = 정상, 실선 = 손상됐을 때 모습 (모식도)
  function renderInjury() {
    const A = 'fill="none" stroke-linecap="round" stroke-width="4"';
    const N = d => `<path d="${d}" ${A} stroke="#6f8ea3" stroke-dasharray="3 6" opacity=".9"/>`;
    const X = d => `<path d="${d}" ${A} stroke="var(--c)"/>`;
    const arm = '<path d="M8 30H60" ' + A + ' stroke="#9bb3c2"/>';
    const leg = '<path d="M50 6V52" ' + A + ' stroke="#9bb3c2"/>';
    const HS = c => `fill="none" stroke="${c}" stroke-width="3.5" stroke-linecap="round"`;
    // 손바닥 정면 그림: thumb 'out'|'flat', curl = 손가락 4개(집게·가운데·넷째·새끼) 굽힘 여부
    const hand = (ox, c, thumb, curl) => `<g transform="translate(${ox},0)" ${HS(c)}><rect x="15" y="42" width="38" height="32" rx="10"/>${[21, 30, 39, 48].map((x, i) => curl[i] ? `<path d="M${x} 42V34Q${x} 24 ${x + 6} 28"/>` : `<path d="M${x} 42V${42 - [26, 30, 27, 21][i]}"/>`).join('')}<path d="${thumb === 'out' ? 'M16 58L3 44' : 'M12 56V74'}"/></g>`;
    const pair = (a, b) => `<text x="34" y="86" font-size="8" fill="#9bb3c2" text-anchor="middle">정상</text><text x="110" y="86" font-size="8" fill="var(--c)" text-anchor="middle">손상</text>` + a + b;
    // 발 옆모습: 정강이 + 발. angle = 발목을 중심으로 발끝이 내려간 각도(0 = 중립, 40 = 발끝 아래로 편 상태)
    const foot = (ox, c, angle) => `<g transform="translate(${ox},0)" ${HS(c)}><path d="M24 4V40"/><g transform="rotate(${angle} 24 40)"><path d="M14 40H26L52 48Q60 50 60 56H14Z"/></g></g>`;
    // 손목 옆모습: 아래팔(고정) + 손. angle = 손목에서 손이 꺾인 각도(음수 = 위로 젖힘, 양수 = 아래로 처짐)
    const wrist = (ox, c, angle) => `<g transform="translate(${ox},0)" ${HS(c)}><rect x="4" y="28" width="36" height="14" rx="6"/><g transform="rotate(${angle} 40 35)"><path d="M40 29H62Q68 29 68 35Q68 41 62 41H40"/></g></g>`;
    // 어깨 정면: flat=true면 어깨세모근이 위축돼 각져 보임
    const shoulder = (ox, c, flat) => `<g transform="translate(${ox},0)" ${HS(c)}><path d="M10 14V74"/><path d="${flat ? 'M10 14L30 20L46 40V74' : 'M10 14L30 20Q54 16 62 42V74'}"/></g>`;
    // 눈 두 개(정면). p1·p2 = 눈동자 이동 [dx,dy], lid = 눈꺼풀 처진 눈 번호(1|2)
    const eyes = (ox, c, p1, p2, lid) => `<g transform="translate(${ox},0)" ${HS(c)}>${[[19, p1], [53, p2]].map(([x, p], i) => `<ellipse cx="${x}" cy="40" rx="13" ry="8"/><circle cx="${x + p[0]}" cy="${40 + p[1]}" r="4" fill="${c}"/>${lid === i + 1 ? `<path d="M${x - 13} 40Q${x} 28 ${x + 13} 40" fill="${c}" fill-opacity=".45" stroke="none"/><path d="M${x - 13} 40H${x + 13}"/>` : ''}`).join('')}</g>`;
    // 얼굴 정면: brow = 왼쪽(그림 기준) 눈썹이 처졌나, mouth = 왼쪽 입꼬리가 처졌나
    const face = (ox, c, brow, mouth) => `<g transform="translate(${ox},0)" ${HS(c)}><circle cx="35" cy="42" r="26"/><circle cx="26" cy="40" r="1.5" fill="${c}"/><circle cx="44" cy="40" r="1.5" fill="${c}"/><path d="M19 ${brow ? 36 : 31}L31 ${brow ? 38 : 31}M39 31H51"/><path d="M24 ${mouth ? 60 : 56}Q35 56 46 56"/></g>`;
    // 입천장·목젖: dev = 목젖이 치우친 정도, sag = 왼쪽 입천장 처짐
    const uvula = (ox, c, dev, sag) => `<g transform="translate(${ox},0)" ${HS(c)}><path d="M10 ${sag ? 48 : 40}Q35 8 60 40"/><path d="M35 26L${35 + dev} 46"/></g>`;
    // 혀 내밀기: dev = 혀끝이 왼쪽으로 치우친 정도
    const tongue = (ox, c, dev) => `<g transform="translate(${ox},0)" ${HS(c)}><path d="M18 24H52"/><path d="M29 24L${29 - dev} 56Q${34 - dev} 66 ${40 - dev} 56L41 24"/></g>`;
    // 머리 위에서 본 모습: bad = 왼쪽 귀로 소리가 안 들어옴, half = 왼쪽 뇌 절반 손상, weak = 오른쪽 귀 소리가 약함
    const ears = (ox, c, bad, half, weak) => `<g transform="translate(${ox},0)" ${HS(c)}><circle cx="35" cy="45" r="18" ${half ? `fill="${c}" fill-opacity=".3"` : ''}/><path d="M17 40Q13 45 17 50M53 40Q57 45 53 50"/>${bad ? `<text x="4" y="49" font-size="11" fill="${c}" stroke="none">✕</text>` : `<path d="M10 36Q5 45 10 54M5 32Q-3 45 5 58"/>`}<path d="M60 36Q65 45 60 54M65 32Q73 45 65 58" ${weak ? 'stroke-dasharray="2 4"' : ''}/></g>`;
    const G = '#6f8ea3';
    // 몸 정면(보는 사람 기준 왼쪽 = 환자의 오른쪽): side 'R'|'L' 쪽 팔다리를 색으로 표시
    const body = (ox, c, side) => `<g transform="translate(${ox},0)" ${HS(G)}><circle cx="35" cy="14" r="8"/><path d="M35 22V52M23 28H47M23 28L19 46M47 28L51 46M35 52L27 76M35 52L43 76"/>${side ? `<g ${HS(c)}>${side === 'R' ? '<path d="M35 28H23L19 46M35 52L27 76"/>' : '<path d="M35 28H47L51 46M35 52L43 76"/>'}</g><text x="${side === 'R' ? 8 : 62}" y="${side === 'R' ? 40 : 40}" font-size="7" fill="${c}" stroke="none" text-anchor="middle">${side === 'R' ? '오른쪽' : '왼쪽'}</text>` : ''}</g>`;
    // 시야 원 두 개(왼눈·오른눈): mode = eye(왼눈 전체) | temp(양쪽 귀쪽 반쪽) | homR(양눈 오른쪽 반쪽)
    const fld = (ox, c, m) => { const half = (cx, rt) => `<path d="M${cx} 31A14 14 0 0 ${rt ? 1 : 0} ${cx} 59Z" fill="${c}" fill-opacity=".85" stroke="none"/>`; const full = cx => `<circle cx="${cx}" cy="45" r="14" fill="${c}" fill-opacity=".85" stroke="none"/>`;
      return `<g transform="translate(${ox},0)" ${HS(G)}><circle cx="17" cy="45" r="14"/><circle cx="53" cy="45" r="14"/><text x="17" y="70" font-size="6.5" fill="${G}" stroke="none" text-anchor="middle">왼눈</text><text x="53" y="70" font-size="6.5" fill="${G}" stroke="none" text-anchor="middle">오른눈</text>${m === 'eye' ? full(17) : m === 'temp' ? half(17, 0) + half(53, 1) : m === 'homR' ? half(17, 1) + half(53, 1) : ''}</g>`; };
    const L = {
      cst: [
        ['뇌(속섬유막 등) 한쪽', '반대쪽 팔다리 약해짐', '겉질척수로는 숨뇌 아래에서 건너가요. 그래서 한쪽 뇌를 다치면 반대쪽 몸이 약해져요(예: 오른쪽 뇌 → 왼쪽 몸).', pair(body(0, G, null), body(76, 'var(--c)', 'L'))],
        ['척수 한쪽(교차 아래)', '같은 쪽 팔다리 약해짐', '이미 건너간 뒤라서 오른쪽 척수를 다치면 같은 오른쪽 몸이 약해져요.', pair(body(0, G, null), body(76, 'var(--c)', 'R'))]
      ],
      dcml: [
        ['척수 뒤기둥 한쪽(교차 아래)', '같은 쪽 정교한 감각 둔함', '숨뇌에서 건너기 전이라 오른쪽 뒤기둥을 다치면 오른쪽 몸의 촉각·진동·위치감각이 둔해져요.', pair(body(0, G, null), body(76, 'var(--c)', 'R'))],
        ['뇌(교차 위) 한쪽', '반대쪽 감각 둔함', '건너간 뒤라서 왼쪽 뇌·섬유띠를 다치면 오른쪽 몸의 감각이 둔해져요.', pair(body(0, G, null), body(76, 'var(--c)', 'R'))]
      ],
      stt: [
        ['척수 한쪽', '반대쪽 통증·온도 둔함', '들어온 높이 근처에서 곧바로 건너가요. 오른쪽 척수를 다치면 그 높이 아래 왼쪽 몸의 통증·온도가 떨어져요.', pair(body(0, G, null), body(76, 'var(--c)', 'L'))],
        ['뇌(시상·겉질) 한쪽', '반대쪽 통증·온도 둔함', '이미 건너온 길이라 왼쪽 뇌를 다치면 오른쪽 몸의 통증·온도가 둔해져요.', pair(body(0, G, null), body(76, 'var(--c)', 'R'))]
      ],
      vis: [
        ['시신경(시각교차 앞)', '그쪽 눈이 안 보여요', '한쪽 눈에서 나온 길이 끊겨서 그 눈 시야 전체가 사라져요(그림은 왼눈).', pair(fld(0, G, ''), fld(76, 'var(--c)', 'eye'))],
        ['시각교차 가운데', '양쪽 바깥쪽 시야가 사라져요', '코 쪽 섬유만 건너는 곳이 눌려서 두 눈 모두 귀 쪽(바깥) 시야가 사라져요(뇌하수체 종양).', pair(fld(0, G, ''), fld(76, 'var(--c)', 'temp'))],
        ['시각로 한쪽(교차 뒤)', '양쪽 눈 반대쪽 시야 반쪽', '왼쪽 시각로를 다치면 두 눈 모두 오른쪽 시야가 반쪽 사라져요.', pair(fld(0, G, ''), fld(76, 'var(--c)', 'homR'))]
      ],
      cb: [
        ['한쪽 소뇌·뒤척수소뇌로', '같은 쪽 팔다리 비틀거림', '건너가지 않는 길이라 오른쪽을 다치면 오른쪽 팔다리가 비틀거려요(운동실조, 떨림).', pair(body(0, G, null), body(76, 'var(--c)', 'R'))]
      ],
      vsc: [
        ['앞척수소뇌로·한쪽 소뇌', '같은 쪽 팔다리 협응 깨짐', '두 번 건너가 결국 같은 쪽 소뇌에 닿아요. 증상은 같은 쪽 비틀거림이지만 척수 손상만으로는 뚜렷이 나뉘지 않을 수 있어요.', pair(body(0, G, null), body(76, 'var(--c)', 'R'))]
      ],
      aud: [
        ['달팽이·청신경(한쪽)', '그 귀만 안 들려요', '소리를 받는 귀 쪽 부분이 손상돼 그 귀가 심하게 안 들려요. 아직 양쪽으로 나뉘기 전이라 한쪽 귀만 영향을 받아요.', pair(ears(0, G, false, false, false), ears(76, 'var(--c)', true, false, false))],
        ['뇌 쪽(위올리브복합체 위 한쪽)', '양쪽 다 조금 둔해져요', '신호가 양쪽으로 나뉘어 올라가서 한쪽 뇌를 다쳐도 완전히 안 들리지는 않아요. 반대쪽 귀가 조금 둔해지고 소리 방향을 찾기 어려워져요.', pair(ears(0, G, false, false, false), ears(76, 'var(--c)', false, true, true))]
      ],
      cn12: [
        ['눈돌림신경(Ⅲ)', '눈이 아래·바깥, 눈꺼풀 처짐', '눈을 움직이는 대부분 근육이 약해져요. 눈이 아래·바깥쪽으로 돌아가고 윗눈꺼풀이 처지며 동공이 커질 수 있어요.', pair(eyes(0, G, [0, 0], [0, 0], 0), eyes(76, 'var(--c)', [-6, 5], [0, 0], 1))],
        ['갓돌림신경(Ⅵ)', '눈이 바깥으로 못 가요', '눈을 바깥으로 돌리는 가쪽곧은근이 약해져요. 눈이 코 쪽에 머물러 옆을 볼 때 겹쳐 보여요(복시).', pair(eyes(0, G, [0, 0], [0, 0], 0), eyes(76, 'var(--c)', [6, 0], [0, 0], 0))],
        ['얼굴신경(Ⅶ) · 말초', '한쪽 얼굴 전체 처짐', '얼굴신경 자체를 다치면(벨마비) 이마까지 포함해 같은 쪽 얼굴 전체가 처져요. 눈도 잘 못 감아요.', pair(face(0, G, false, false), face(76, 'var(--c)', true, true))],
        ['얼굴신경(Ⅶ) · 중추', '입 아래쪽만 처짐', '뇌의 겉질 쪽을 다치면(뇌졸중) 이마는 양쪽 지배라 남고 반대쪽 입 아래만 처져요. 말초와 구별하는 핵심이에요.', pair(face(0, G, false, false), face(76, 'var(--c)', false, true))],
        ['미주신경(Ⅹ)', '목젖이 건강한 쪽으로', '손상된 쪽 입천장이 처지고 "아~" 할 때 목젖이 건강한 쪽으로 치우쳐요. 목소리도 쉴 수 있어요.', pair(uvula(0, G, 0, false), uvula(76, 'var(--c)', 8, true))],
        ['혀밑신경(Ⅻ)', '혀가 다친 쪽으로', '혀를 내밀면 약해진 쪽으로 치우쳐요(그림은 왼쪽 손상).', pair(tongue(0, G, 0), tongue(76, 'var(--c)', 7))]
      ],
      brach: [
        ['노신경', '손목 처짐', '손목·손가락을 못 펴서 손이 축 늘어져요. 위팔뼈 몸통 골절이 대표예요.', pair(wrist(0, '#6f8ea3', -25), wrist(76, 'var(--c)', 65))],
        ['정중신경', '원숭이 손', '엄지가 손바닥과 나란히 눕고, 엄지두덩이 납작해져요. 엄지·집게로 동그라미(OK)를 못 만들어요. 손목굴증후군이 대표예요.', pair(hand(0, '#6f8ea3', 'out', [0, 0, 0, 0]), hand(76, 'var(--c)', 'flat', [0, 0, 0, 0]))],
        ['자신경', '갈퀴 손', '넷째·새끼손가락이 굽어 갈퀴처럼 돼요. 손가락을 모으거나 벌리기 어려워요. 팔꿈치 안쪽 압박(팔꿈치터널)이 대표예요.', pair(hand(0, '#6f8ea3', 'out', [0, 0, 0, 0]), hand(76, 'var(--c)', 'out', [0, 0, 1, 1]))],
        ['겨드랑신경', '어깨 납작해짐', '어깨를 벌리는 어깨세모근이 약해져 어깨 둥근 모양이 납작해져요. 어깨 탈구나 위팔뼈 목 골절 뒤에 생겨요.', pair(shoulder(0, '#6f8ea3', false), shoulder(76, 'var(--c)', true))]
      ],
      lumb: [
        ['온종아리신경', '발 처짐', '발목을 못 들어 올려서 발끝이 처지고, 걸을 때 다리를 높이 들어요. 종아리뼈 머리 바깥 압박이 대표예요.', pair(foot(0, '#6f8ea3', 0), foot(76, 'var(--c)', 40))],
        ['정강신경', '발끝 서기 안 됨', '발을 아래로 못 밀어서 발끝으로 서기·밀어내며 걷기가 어려워요. 발바닥 감각도 떨어질 수 있어요.', pair(foot(0, '#6f8ea3', 40), foot(76, 'var(--c)', 0))]
      ]
    }[active.id === 'cn' ? 'cn12' : active.id];
    if (!L) return '';
    return `<h3>그림 ⑤ 신경이 다치면 이렇게 보여요</h3><p class="nv54-role">왼쪽(회색) = 정상일 때 · 오른쪽(색) = 다쳤을 때 (모식도)</p>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:8px;--c:${active.color}">${L.map(c => `<div class="nv54-lanes-card" style="margin:0"><svg viewBox="0 0 150 90" role="img" aria-label="${c[0]} 손상: ${c[1]}" style="width:100%;height:auto;background:#0b1a26;border-radius:6px">${c[3].startsWith('<text') ? c[3] : `<g transform="translate(20,0)">${c[3]}</g><text x="75" y="86" font-size="8" fill="#9bb3c2" text-anchor="middle">점선 정상 · 실선 손상</text>`}</svg><b>${c[0]} → ${c[1]}</b><br><small>${c[2]}</small></div>`).join('')}</div>`;
  }
  // 신경얼기 가지별 지배 근육 표 (표준 해부학, 대표 근육만)
  function renderMuscles() {
    const L = {
      brach: [['겨드랑신경', 'C5–C6', '어깨세모근, 작은원근', '어깨 벌림·가쪽돌림'],
        ['근육피부신경', 'C5–C7', '위팔두갈래근, 위팔근, 부리위팔근', '팔꿈치 굽힘'],
        ['노신경', 'C5–T1', '위팔세갈래근, 위팔노근, 뒤침근, 손목·손가락 폄근', '팔꿈치·손목·손가락 폄'],
        ['정중신경', 'C6–T1', '원엎침근, 노쪽손목굽힘근, 얕은손가락굽힘근, 엄지두덩근(+벌레근 1·2)', '엎침·손목/손가락 굽힘·엄지 맞섬'],
        ['자신경', 'C8–T1', '자쪽손목굽힘근, 깊은손가락굽힘근(4·5), 새끼두덩근, 뼈사이근, 엄지모음근', '손가락 모으기·벌리기, 넷째·새끼 굽힘'],
        ['긴가슴신경', 'C5–C7', '앞톱니근', '어깨뼈를 몸통에 붙임 (손상 시 날개어깨뼈)']],
      lumb: [['위볼기신경', 'L4–S1', '중간볼기근, 작은볼기근, 넙다리근막긴장근', '엉덩관절 벌림'],
        ['아래볼기신경', 'L5–S2', '큰볼기근', '엉덩관절 폄 (계단·일어서기)'],
        ['궁둥신경 → 정강신경', 'L4–S3', '넙다리뒤근육(햄스트링), 장딴지근, 가자미근, 뒤정강근, 발바닥 근육', '무릎 굽힘·발바닥쪽굽힘'],
        ['궁둥신경 → 온종아리신경', 'L4–S2', '앞정강근, 긴발가락폄근, 긴·짧은종아리근', '발등쪽굽힘·발 가쪽번짐']]
    }[active.id];
    if (!L) return '';
    return `<h3>그림 ⑥ 이 신경이 움직이는 근육</h3><div class="nv54-lanes-card" style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:13px">
      <tr style="color:#7f98a9;text-align:left"><th>신경</th><th>뿌리</th><th>지배 근육</th><th>하는 일</th></tr>
      ${L.map(r => `<tr>${r.map(c => `<td style="padding:5px 4px;border-top:1px solid #2a4254">${c}</td>`).join('')}</tr>`).join('')}</table>
      <small>※ 대표 근육만. 위 그림 ⑤의 증상 = 이 근육이 약해진 결과예요.</small></div>`;
  }
  function renderLanes() {
    const st = active.stations, n = st.length, H = 64, W = 560, X = [130, 280, 430], color = active.color;
    const lx = s => (s[0] < 180 ? X[0] : s[0] > 180 || active.cross == null ? X[2] : X[1]); // 그림의 왼쪽/오른쪽/가운데(건너는 중)
    const y = i => 70 + i * H;
    const pts = st.map((s, i) => `${lx(s)},${y(i)}`).join(' ');
    const rows = st.map((s, i) => {
      const x = lx(s), mid = x === X[1], on = i === step, label = mid ? '건너는 중' : x === X[0] ? '몸의 왼쪽' : '몸의 오른쪽';
      const rel = mid ? '⇄ 건너는 중' : x === lx(st[0]) ? '처음과 같은 쪽' : '처음과 반대쪽';
      return `<g class="nv54-lr${on ? ' on' : ''}" data-step="${i}" role="button" tabindex="0" aria-label="${i + 1}단계 ${s[2]} ${label}">
        <rect x="0" y="${y(i) - H / 2 + 6}" width="${W}" height="${H - 12}" rx="10" class="nv54-lr-bg"/>
        <circle cx="${x}" cy="${y(i)}" r="${on ? 17 : 12}" fill="${on ? color : '#0b1a26'}" stroke="${color}" stroke-width="3"/>
        <text x="${x}" y="${y(i) + 4}" text-anchor="middle" class="nv54-lr-n" fill="${on ? '#0b1a26' : '#e8f3f8'}">${i + 1}</text>
        <text x="${x < X[1] ? x + 26 : x - 26}" y="${y(i) + 5}" text-anchor="${x < X[1] ? 'start' : 'end'}" class="nv54-lr-t">${s[2]}${i === active.cross ? ' ⚡교차' : ''}</text>
        <text x="${x < X[1] ? W - 8 : 8}" y="${y(i) + 5}" text-anchor="${x < X[1] ? 'end' : 'start'}" class="nv54-lr-rel${mid ? ' mid' : ''}">${rel}</text></g>`;
    }).join('');
    const bandH = n * H + 20;
    lanes.innerHTML = `<div class="nv54-lanes-in">
      <h3>그림 ② 한 줄 요약</h3><p class="nv54-role">${active.name} · ${flowText(active)}</p>
      <p class="nv54-role">${active.cross == null ? '건너가지 않고 같은 쪽으로만 가요.' : '왼쪽·오른쪽과 교차(⚡) 위치는 왼쪽 그림 ①의 뇌·척수 그림에서 보세요("교차!" 표시).'} 번호를 누르면 점이 이동해요.</p>
      ${renderSection()}
      ${renderPrinciple()}
      ${renderCompare()}
      ${renderInjury()}
      ${renderMuscles()}
      <div class="nv54-lanes-card"><b>${step + 1}/${n} · ${st[step][2]}</b><br>${st[step][3]}<br>${gimg(st[step])}</div>
      <div class="nv54-lanes-card nv54-lanes-les"><b>다치면?</b> ${active.lesion}</div>
      <small>위→아래가 신호가 지나는 순서예요 · 모식도이며 실제 위치·크기와 다릅니다 · 칸을 눌러 이동</small></div>`;
    // 폭 700/480 그림은 폰에서 글씨가 너무 작아 가로 스크롤 칸에 넣음
    lanes.querySelectorAll('svg[viewBox^="0 0 700"],svg[viewBox^="0 0 480"]').forEach(v => { const d = document.createElement('div'); d.className = 'nv54-xs'; v.replaceWith(d); d.appendChild(v); });
  }

  function renderStudy() {
    study.innerHTML = `
      <details class="nv54-compare">
        <summary>경로별 교차 위치 비교</summary>
        <table><thead><tr><th scope="col">경로</th><th scope="col">방향</th><th scope="col">교차 위치</th></tr></thead><tbody>
        ${routes.map(r => `<tr><th scope="row"><button type="button" data-pick="${r.id}" aria-pressed="${r === active}">${r.name}</button></th><td>${r.direction}</td><td>${r.crossing}</td></tr>`).join('')}
        </tbody></table>
      </details>
      <div class="nv54-route-card">
        <div class="nv54-flow" aria-label="한쪽 몸을 기준으로 본 대표 경로"><span>${active.start}</span><span class="nv54-flow-cross">${active.cross == null ? "→ 같은 쪽으로 →" : "→ " + active.crossing + "에서 교차 →"}</span><span>${active.end}</span></div>
        ${renderDiagram(active)}
        <div class="nv54-controls" role="group" aria-label="설명 수준">
          <button type="button" data-mode="easy" aria-pressed="${mode === 'easy'}">아주 쉬운 설명</button>
          <button type="button" data-mode="expert" aria-pressed="${mode === 'expert'}">전문 설명</button>
        </div>
        <p>${active[mode]}</p>
        <dl><dt>영어</dt><dd>${active.en}</dd><dt>신용어</dt><dd>${active.name}</dd><dt>구용어</dt><dd>${active.old}</dd></dl>
        <a href="${active.source}" target="_blank" rel="noopener noreferrer">설명 출처 · NCBI Bookshelf ↗</a>
      </div>`;
    setStep(step);
  }
  function renderQuestion(moveFocus = false) {
    const q = deck[question];
    review.innerHTML = q
      ? `<h3 tabindex="-1">교차 위치 복습 · ${question + 1}/${deck.length}</h3><p>${q.text}</p>
        <div class="nv54-controls">${q.options.map(label => `<button type="button" data-choice="${label}">${label}</button>`).join('')}</div>
        <p class="nv54-feedback" role="status"></p><button type="button" data-next hidden>다음</button>`
      : `<h3 tabindex="-1">복습 결과 · ${score}/${deck.length}</h3><button type="button" data-retry>다시 풀기</button>`;
    if (moveFocus) review.querySelector('h3').focus();
  }
  window.addEventListener('nv54-route', event => {
    const open = study.querySelector('details')?.open;
    const next = routes.find(route => route.id === event.detail) || routes[0];
    if (next !== active) step = 0;
    active = next;
    renderStudy();
    study.querySelector('details').open = Boolean(open);
  });
  study.addEventListener('keydown', event => {
    const g = event.target.closest('.nv54-st');
    if (g && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); setStep(Number(g.dataset.step)); }
  });
  study.addEventListener('click', event => {
    const g = event.target.closest('.nv54-st');
    if (g) return setStep(Number(g.dataset.step));
    const button = event.target.closest('button');
    if (button?.dataset.move) return setStep(step + Number(button.dataset.move));
    if (!button) return;
    if (button.dataset.pick) {
      chips.find(chip => chip.dataset.route === button.dataset.pick).click();
      study.querySelector(`[data-pick="${active.id}"]`).focus();
    }
    if (button.dataset.mode) {
      mode = button.dataset.mode;
      window.dispatchEvent(new CustomEvent('nv54-route', {detail: active.id}));
      study.querySelector(`[data-mode="${mode}"]`).focus();
    }
  });
  review.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.hasAttribute('data-retry')) { question = 0; score = 0; renderQuestion(true); return; }
    if (button.hasAttribute('data-next')) { question++; renderQuestion(true); return; }
    const q = deck[question];
    if (!button.hasAttribute('data-choice') || button.disabled) return;
    const ans = q.answer || q.route.crossing;
    const correct = button.dataset.choice === ans;
    score += Number(correct);
    for (const option of review.querySelectorAll('[data-choice]')) {
      option.disabled = true;
      if (option.dataset.choice === ans) option.classList.add('nv54-correct');
    }
    review.querySelector('.nv54-feedback').textContent = `${correct ? '맞았어요.' : '다시 확인해 보세요.'} ${q.why || `${q.route.name} · ${q.route.crossing}에서 교차합니다.`}`;
    const next = review.querySelector('[data-next]');
    next.textContent = question === deck.length - 1 ? '결과 보기' : '다음 문제';
    next.hidden = false;
    next.focus();
  });
  renderStudy();
  renderQuestion();

  const nav = document.querySelector('nav.tabs');
  const body = document.body;
  nav.addEventListener('click', event => {
    const button = event.target.closest('button[data-tab]');
    if (!button || !body.classList.contains('nv54-2d') || button.onclick) return;
    const id = button.dataset.tab;
    if (!['anatomy', 'pathways'].includes(id)) return;
    nav.querySelectorAll('button[data-tab]').forEach(tab => tab.classList.toggle('active', tab === button));
    document.querySelectorAll('.scroll > section').forEach(section => section.classList.toggle('hidden', section.id !== id));
    document.querySelector('#view-title').textContent = id === 'pathways' ? '신경경로 학습' : '3D 뇌 탐색';
  });
  const fallback = document.createElement('div');
  fallback.id = 'nv54-fallback';
  fallback.innerHTML = '<span>3D를 불러오는 중에도 신경경로와 전공 학습을 열 수 있어요.</span><button type="button">신경경로 열기</button>';
  fallback.querySelector('button').onclick = () => nav.querySelector('[data-tab="pathways"]').click();
  document.querySelector('.scroll').prepend(fallback);
  setTimeout(() => {
    fallback.querySelector('span').textContent = '3D 연결을 확인 중이에요. 신경경로와 전공 학습은 지금 이용할 수 있어요.';
  }, 12000);
})();
