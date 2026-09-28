/* ============================================================
 * tcm-data.js —— 人类图 × 中医 数据底座（阶段 0）
 * 项目：humandesign-V38 生态 · hd-tcm 套件
 * 版本：V2  2026-09-28
 * ------------------------------------------------------------
 * [changelog]
 * V2 (2026-09-28)
 *   - 新增 PHS_ZH：PHS 原生健康系统（消化 6 型 / 环境 6 型）→ 中医呼应（假说级）
 *   - 新增 ARROWS_ZH：四箭头（消化/环境/动机/视角）→ 阴阳五行呼应（假说级）
 *   - 新增 TYPES_ZH：四大类型 → 五行偏性 + 时辰建议（假说级；术语用「生产者」不用「生成者」）
 *   - 新增 CLOCK_LINK：子午流注时辰 ↔ 五行 ↔ 体藏闸门的反向索引
 *   - 新增 getGateByElement / getHourNow / getPHS / getTypeTcm 四个 API
 * V1 (2026-09-28)
 *   - 首版。64 闸门 → 文王卦 → 上下经卦五行 → 体藏/用藏/情志/开窍/生克（静态推导）
 *   - 五行脏象表（五脏·六腑·情志·开窍·五味·季节·色）
 *   - 子午流注十二时辰表、二十四节气黄经表
 *   - 全站统一免责口径、三级标注体系（经典级/假说级/禁区）
 *   - 待精修项：64 条卦名与上下卦逐行人工校核（配合 tcm-check.html）
 * ------------------------------------------------------------
 * 设计纪律：
 *   1. 数据最薄：只存「闸门→卦名→上/下经卦」，五行/脏/情志/开窍
 *      全部由经卦→五行→脏象链条派生，杜绝重复字段造成口径漂移。
 *   2. 分级标注：经典级（典籍可溯）/ 假说级（本项目文化解释层）/ 禁区。
 *   3. 本文件不含任何医疗建议。免责口径见 TCM_META.disclaimer。
 * ============================================================ */

/* ---------- 0. 元数据与合规口径 ---------- */
const TCM_META = {
  version: 'V2',
  updated: '2026-09-28',
  project: 'hd-tcm / humandesign-V38 生态',
  /* 全站统一免责口径（凡涉中医模块的页面，必须原样挂载本条） */
  disclaimer: '本页内容为《易经》与中医传统养生文化视角下的自我认知参考，不构成任何医疗建议、诊断或治疗方案。如有身体不适，请及时就医并遵循专业医师指导。',
  /* 三级标注体系 */
  levels: {
    classic:  { label: '经典级', color: '#6B8E5A', desc: '卦象、五行、五脏、情志、开窍、体用生克——典籍可溯（《周易》《黄帝内经》《梅花易数》）。' },
    hypothesis:{ label: '假说级', color: '#C4956A', desc: '九大能量中心↔脏腑类比、闸门↔经络对应等——本项目文化解释层。Ra Uru Hu 未建立正式对应，网络流传对照表未获溯源前一律不采用。' },
    forbidden: { label: '禁区',   color: '#A65B4B', desc: '疾病诊断、疗效承诺、药膳处方、停药建议——禁止出现在任何产品文案中。' }
  },
  /* 体用约定说明 */
  convention: '本框架约定：下卦为体（内/藏），上卦为用（外/象）。梅花易数以动爻定体用，静态盘无动爻，取下卦为体系本项目约定，供参考维度使用。',
  /* 与人类图轮盘的锚点注记 */
  notes: [
    'Rave 新年 = 太阳进入 41.1（宝瓶 2°，黄经 302°），约公历 1/22，紧邻大寒（黄经 300°）——两套历法在岁首处几乎重合。',
    '人类图轮盘与二十四节气同用回归黄经，可直接以黄经度数对接（本数据 SOLAR_TERMS.lon）。',
    '《内证观察笔记》P251「命门二十四节气二十四星宿值日图」为黄经三合轮盘的视觉母版。'
  ]
};

/* ---------- 1. 八卦表（经典级）----------
 * element 仅对应五行；脏/腑/情志/开窍一律挂在五行表上，
 * 不做「乾=某脏」式直配（八卦脏象直配历代有分歧，避免引入争议口径）。 */
const TRIGRAMS = {
  qian: { name: '乾', sym: '☰', image: '天', element: '金' },
  dui:  { name: '兑', sym: '☱', image: '泽', element: '金' },
  li:   { name: '离', sym: '☲', image: '火', element: '火' },
  zhen: { name: '震', sym: '☳', image: '雷', element: '木' },
  xun:  { name: '巽', sym: '☴', image: '风', element: '木' },
  kan:  { name: '坎', sym: '☵', image: '水', element: '水' },
  gen:  { name: '艮', sym: '☶', image: '山', element: '土' },
  kun:  { name: '坤', sym: '☷', image: '地', element: '土' }
};

/* ---------- 2. 五行脏象表（经典级：《黄帝内经》脏象学说）---------- */
const WUXING = {
  '木': { zang: '肝',   fu: '胆',   emotion: '怒', orifice: '目', flavor: '酸', season: '春',   color: '青' },
  '火': { zang: '心',   fu: '小肠', emotion: '喜', orifice: '舌', flavor: '苦', season: '夏',   color: '赤' },
  '土': { zang: '脾',   fu: '胃',   emotion: '思', orifice: '口', flavor: '甘', season: '长夏', color: '黄' },
  '金': { zang: '肺',   fu: '大肠', emotion: '悲', orifice: '鼻', flavor: '辛', season: '秋',   color: '白' },
  '水': { zang: '肾',   fu: '膀胱', emotion: '恐', orifice: '耳', flavor: '咸', season: '冬',   color: '黑' }
};

/* 五行生克（相生：木→火→土→金→水→木；相克：木→土→水→火→金→木） */
const SHENG = { '木': '火', '火': '土', '土': '金', '金': '水', '水': '木' };
const KE    = { '木': '土', '土': '水', '水': '火', '火': '金', '金': '木' };

/* 体用关系判定（梅花易数六亲框架，以体卦为「我」）
 * 返回 { rel, sixKin, hint } */
function deriveRelation(bodyEl, useEl) {
  if (bodyEl === useEl)              return { rel: '比和',   sixKin: '兄弟', hint: '内外同气，五行纯粹' };
  if (SHENG[useEl] === bodyEl)       return { rel: '用生体', sixKin: '父母', hint: '外补内，得生扶' };
  if (SHENG[bodyEl] === useEl)       return { rel: '体生用', sixKin: '子孙', hint: '内泄于外，易耗' };
  if (KE[useEl] === bodyEl)          return { rel: '用克体', sixKin: '官鬼', hint: '外压内，受制' };
  if (KE[bodyEl] === useEl)          return { rel: '体克用', sixKin: '妻财', hint: '内主外，可控' };
  return { rel: '—', sixKin: '—', hint: '—' };
}

/* ---------- 3. 64 闸门 → 文王卦（核心数据，待逐行校核）----------
 * sym 由代码按 Unicode 卦符块（U+4DC0 起，文王序）派生，不落库。
 * up=上卦（用/外），low=下卦（体/内）。 */
const GATES_TCM = [
  { g: 1,  hex: '乾',   name: '乾为天', up: 'qian', low: 'qian' },
  { g: 2,  hex: '坤',   name: '坤为地', up: 'kun',  low: 'kun'  },
  { g: 3,  hex: '屯',   name: '水雷屯', up: 'kan',  low: 'zhen' },
  { g: 4,  hex: '蒙',   name: '山水蒙', up: 'gen',  low: 'kan'  },
  { g: 5,  hex: '需',   name: '水天需', up: 'kan',  low: 'qian' },
  { g: 6,  hex: '讼',   name: '天水讼', up: 'qian', low: 'kan'  },
  { g: 7,  hex: '师',   name: '地水师', up: 'kun',  low: 'kan'  },
  { g: 8,  hex: '比',   name: '水地比', up: 'kan',  low: 'kun'  },
  { g: 9,  hex: '小畜', name: '风天小畜', up: 'xun', low: 'qian' },
  { g: 10, hex: '履',   name: '天泽履', up: 'qian', low: 'dui'  },
  { g: 11, hex: '泰',   name: '地天泰', up: 'kun',  low: 'qian' },
  { g: 12, hex: '否',   name: '天地否', up: 'qian', low: 'kun'  },
  { g: 13, hex: '同人', name: '天火同人', up: 'qian', low: 'li' },
  { g: 14, hex: '大有', name: '火天大有', up: 'li', low: 'qian' },
  { g: 15, hex: '谦',   name: '地山谦', up: 'kun',  low: 'gen'  },
  { g: 16, hex: '豫',   name: '雷地豫', up: 'zhen', low: 'kun'  },
  { g: 17, hex: '随',   name: '泽雷随', up: 'dui',  low: 'zhen' },
  { g: 18, hex: '蛊',   name: '山风蛊', up: 'gen',  low: 'xun'  },
  { g: 19, hex: '临',   name: '地泽临', up: 'kun',  low: 'dui'  },
  { g: 20, hex: '观',   name: '风地观', up: 'xun',  low: 'kun'  },
  { g: 21, hex: '噬嗑', name: '火雷噬嗑', up: 'li', low: 'zhen' },
  { g: 22, hex: '贲',   name: '山火贲', up: 'gen',  low: 'li'   },
  { g: 23, hex: '剥',   name: '山地剥', up: 'gen',  low: 'kun'  },
  { g: 24, hex: '复',   name: '地雷复', up: 'kun',  low: 'zhen' },
  { g: 25, hex: '无妄', name: '天雷无妄', up: 'qian', low: 'zhen' },
  { g: 26, hex: '大畜', name: '山天大畜', up: 'gen', low: 'qian' },
  { g: 27, hex: '颐',   name: '山雷颐', up: 'gen',  low: 'zhen' },
  { g: 28, hex: '大过', name: '泽风大过', up: 'dui', low: 'xun' },
  { g: 29, hex: '坎',   name: '坎为水', up: 'kan',  low: 'kan'  },
  { g: 30, hex: '离',   name: '离为火', up: 'li',   low: 'li'   },
  { g: 31, hex: '咸',   name: '泽山咸', up: 'dui',  low: 'gen'  },
  { g: 32, hex: '恒',   name: '雷风恒', up: 'zhen', low: 'xun'  },
  { g: 33, hex: '遁',   name: '天山遁', up: 'qian', low: 'gen'  },
  { g: 34, hex: '大壮', name: '雷天大壮', up: 'zhen', low: 'qian' },
  { g: 35, hex: '晋',   name: '火地晋', up: 'li',   low: 'kun'  },
  { g: 36, hex: '明夷', name: '地火明夷', up: 'kun', low: 'li'  },
  { g: 37, hex: '家人', name: '风火家人', up: 'xun', low: 'li'  },
  { g: 38, hex: '睽',   name: '火泽睽', up: 'li',   low: 'dui'  },
  { g: 39, hex: '蹇',   name: '水山蹇', up: 'kan',  low: 'gen'  },
  { g: 40, hex: '解',   name: '雷水解', up: 'zhen', low: 'kan'  },
  { g: 41, hex: '损',   name: '山泽损', up: 'gen',  low: 'dui'  },
  { g: 42, hex: '益',   name: '风雷益', up: 'xun',  low: 'zhen' },
  { g: 43, hex: '夬',   name: '泽天夬', up: 'dui',  low: 'qian' },
  { g: 44, hex: '姤',   name: '天风姤', up: 'qian', low: 'xun'  },
  { g: 45, hex: '萃',   name: '泽地萃', up: 'dui',  low: 'kun'  },
  { g: 46, hex: '升',   name: '地风升', up: 'kun',  low: 'xun'  },
  { g: 47, hex: '困',   name: '泽水困', up: 'dui',  low: 'kan'  },
  { g: 48, hex: '井',   name: '水风井', up: 'kan',  low: 'xun'  },
  { g: 49, hex: '革',   name: '泽火革', up: 'dui',  low: 'li'   },
  { g: 50, hex: '鼎',   name: '火风鼎', up: 'li',   low: 'xun'  },
  { g: 51, hex: '震',   name: '震为雷', up: 'zhen', low: 'zhen' },
  { g: 52, hex: '艮',   name: '艮为山', up: 'gen',  low: 'gen'  },
  { g: 53, hex: '渐',   name: '风山渐', up: 'xun',  low: 'gen'  },
  { g: 54, hex: '归妹', name: '雷泽归妹', up: 'zhen', low: 'dui' },
  { g: 55, hex: '丰',   name: '雷火丰', up: 'zhen', low: 'li'   },
  { g: 56, hex: '旅',   name: '火山旅', up: 'li',   low: 'gen'  },
  { g: 57, hex: '巽',   name: '巽为风', up: 'xun',  low: 'xun'  },
  { g: 58, hex: '兑',   name: '兑为泽', up: 'dui',  low: 'dui'  },
  { g: 59, hex: '涣',   name: '风水涣', up: 'xun',  low: 'kan'  },
  { g: 60, hex: '节',   name: '水泽节', up: 'kan',  low: 'dui'  },
  { g: 61, hex: '中孚', name: '风泽中孚', up: 'xun', low: 'dui' },
  { g: 62, hex: '小过', name: '雷山小过', up: 'zhen', low: 'gen' },
  { g: 63, hex: '既济', name: '水火既济', up: 'kan', low: 'li'  },
  { g: 64, hex: '未济', name: '火水未济', up: 'li',  low: 'kan'  }
];

/* 取某闸门的完整中医推导（供其他页面调用）
 * 例：getGateTcm(55) → { gate, name, bodyEl:'火', useEl:'木', ... } */
function getGateTcm(gateNo) {
  const row = GATES_TCM.find(r => r.g === gateNo);
  if (!row) return null;
  const upT = TRIGRAMS[row.up], lowT = TRIGRAMS[row.low];
  const bodyEl = lowT.element, useEl = upT.element;       // 下卦=体（内/藏），上卦=用（外/象）
  const body = WUXING[bodyEl], use = WUXING[useEl];
  const rel = deriveRelation(bodyEl, useEl);
  return {
    gate: row.g, hex: row.hex, name: row.name,
    sym: String.fromCodePoint(0x4DC0 + row.g - 1),        // ䷀..䷿ 文王序卦符
    up: { key: row.up, ...upT }, low: { key: row.low, ...lowT },
    bodyEl, useEl, body, use, rel,
    summary: `体藏${body.zang}（${bodyEl}）· 用象${use.zang}（${useEl}）｜${rel.rel}（${rel.sixKin}）：${rel.hint}`
  };
}

/* ---------- 4. 子午流注十二时辰（经典级）----------
 * 口诀：肺寅大卯胃辰宫，脾巳心午小未中，申膀酉肾心包戌，亥焦子胆丑肝通。
 * hdLink 字段为假说级：仅供类型作息对照参考。 */
const ZIWULIUZHU = [
  { hour: '寅', time: '03:00–05:00', meridian: '肺经',   el: '金', hdLink: '深度睡眠修复期，各类型均宜在睡眠中' },
  { hour: '卯', time: '05:00–07:00', meridian: '大肠经', el: '金', hdLink: '起床排浊；生产者晨起身体尚未热机，忌立即高强度运动' },
  { hour: '辰', time: '07:00–09:00', meridian: '胃经',   el: '土', hdLink: '早餐黄金期；按 PHS 消化类型安排进食方式' },
  { hour: '巳', time: '09:00–11:00', meridian: '脾经',   el: '土', hdLink: '运化高峰，头脑清晰，宜处理思考型工作' },
  { hour: '午', time: '11:00–13:00', meridian: '心经',   el: '火', hdLink: '小憩 15–30 分钟；情绪权威者此时情绪波动最明显，忌重大决定' },
  { hour: '未', time: '13:00–15:00', meridian: '小肠经', el: '火', hdLink: '吸收分清浊；生产者宜在此后进入深度工作' },
  { hour: '申', time: '15:00–17:00', meridian: '膀胱经', el: '水', hdLink: '多喝水、代谢旺盛，宜运动排汗' },
  { hour: '酉', time: '17:00–19:00', meridian: '肾经',   el: '水', hdLink: '藏精时段，宜收敛，忌过度消耗' },
  { hour: '戌', time: '19:00–21:00', meridian: '心包经', el: '火', hdLink: '喜乐放松时段，宜社交与轻度娱乐' },
  { hour: '亥', time: '21:00–23:00', meridian: '三焦经', el: '火', hdLink: '百脉归位；投射者/反映者可开始上床放松' },
  { hour: '子', time: '23:00–01:00', meridian: '胆经',   el: '水', hdLink: '宜熟睡；生产者如荐骨未烧干可顺其自然，但勿熬夜硬撑' },
  { hour: '丑', time: '01:00–03:00', meridian: '肝经',   el: '木', hdLink: '深度修复；长期失眠者重点观察此时段' }
];

/* ---------- 5. 二十四节气黄经表（经典级）----------
 * lon 以春分 0° 起算的回归黄经（与人类图轮盘同一坐标系）。
 * seq 为传统历法序（立春=1）。 */
const SOLAR_TERMS = [
  { name: '春分', lon: 0,   seq: 4  }, { name: '清明', lon: 15,  seq: 5  },
  { name: '谷雨', lon: 30,  seq: 6  }, { name: '立夏', lon: 45,  seq: 7  },
  { name: '小满', lon: 60,  seq: 8  }, { name: '芒种', lon: 75,  seq: 9  },
  { name: '夏至', lon: 90,  seq: 10 }, { name: '小暑', lon: 105, seq: 11 },
  { name: '大暑', lon: 120, seq: 12 }, { name: '立秋', lon: 135, seq: 13 },
  { name: '处暑', lon: 150, seq: 14 }, { name: '白露', lon: 165, seq: 15 },
  { name: '秋分', lon: 180, seq: 16 }, { name: '寒露', lon: 195, seq: 17 },
  { name: '霜降', lon: 210, seq: 18 }, { name: '立冬', lon: 225, seq: 19 },
  { name: '小雪', lon: 240, seq: 20 }, { name: '大雪', lon: 255, seq: 21 },
  { name: '冬至', lon: 270, seq: 22 }, { name: '小寒', lon: 285, seq: 23 },
  { name: '大寒', lon: 300, seq: 24 }, { name: '立春', lon: 315, seq: 1  },
  { name: '雨水', lon: 330, seq: 2  }, { name: '惊蛰', lon: 345, seq: 3  }
];

/* 按黄经查节气（供轮盘对接）：getTermByLon(302) → 大寒 */
function getTermByLon(lon) {
  const L = ((lon % 360) + 360) % 360;
  const sorted = [...SOLAR_TERMS].sort((a, b) => a.lon - b.lon);
  let hit = sorted[0];
  for (const t of sorted) { if (t.lon <= L + 7.5) hit = t; else break; }
  return hit;
}

/* ---------- 6. PHS 原生健康系统 → 中医呼应（假说级）----------
 * 纪律：Ra 未建立 PHS 与中医的对应。本表为本项目「文化解释层」，
 *       仅作自我观察的参照维度，不得表述为体系内对应或医疗建议。
 * 消化 6 型 / 环境 6 型名称依 Ra 原始命名，中文译名为本项目通行译法。 */
const PHS_ZH = {
  digestion: {
    title: '消化方式（Determination）',
    level: 'hypothesis',
    items: [
      { key: 'Appetite',  cn: '食欲型', el: '土', hint: '重「饥饱感」——与脾土运化、胃受纳相应。宜规律进食、忌边忙边吃；脾胃为后天之本，此型最忌「不饿硬吃」。' },
      { key: 'Taste',     cn: '品味型', el: '火', hint: '重「味觉满足」——与心火、舌为心之苗相应。宜细嚼慢咽得其味；心主喜，进餐时的愉悦感本身即助运化。' },
      { key: 'Thirst',    cn: '口渴型', el: '水', hint: '重「体液信号」——与肾水、津液代谢相应。宜观察口渴节律而非定时灌水；肾主水，此型对「身体要不要水」的信号最敏感。' },
      { key: 'Touch',     cn: '触碰型', el: '金', hint: '重「触感氛围」——与肺金、皮毛为肺之合相应。宜安静少扰的环境进食；肺主气，环境嘈杂则气乱、食亦不化。' },
      { key: 'Sound',     cn: '声音型', el: '木', hint: '重「环境声响」——与肝木、肝主疏泄相应。宜安静或配适宜之声；肝喜条达，噪音则肝气郁结、易影响脾胃。' },
      { key: 'Light',     cn: '光感型', el: '火', hint: '重「光线明暗」——与心火、神明相应。宜柔和自然光进食；心主神明，强光或昏暗皆扰神而碍食。' }
    ]
  },
  environment: {
    title: '适宜环境（Environment）',
    level: 'hypothesis',
    items: [
      { key: 'Cave',     cn: '洞穴型', el: '水', hint: '宜藏、宜私密——与肾水「封藏之本」相应。空间宜有包裹感、避风避扰；肾主藏精，此型在开放空间最易耗。' },
      { key: 'Market',   cn: '市集型', el: '火', hint: '宜热闹、宜人气——与心火「心主血脉、喜通明」相应。人气即阳气，此型在冷清环境易低落。' },
      { key: 'Kitchen',  cn: '厨房型', el: '土', hint: '宜中心、宜灶台——与脾土「中央、运化」相应。此型宜居于家宅中心、近水源火源处，主一家之运化。' },
      { key: 'Mountain', cn: '山岳型', el: '金', hint: '宜高处、宜开阔——与肺金「主气、居高」相应。视野开阔则气顺，闭仄则胸闷。' },
      { key: 'Valley',   cn: '溪谷型', el: '木', hint: '宜绿意、宜水源——与肝木「喜条达、应春生」相应。草木与水边最养此型，久居水泥丛林则肝气不舒。' },
      { key: 'Shore',    cn: '海岸型', el: '水', hint: '宜水陆之交、宜边界——与肾水「主水、司开合」相应。潮起潮落处最合此型节律。' }
    ]
  }
};

/* ---------- 7. 四箭头 → 阴阳五行呼应（假说级）----------
 * 四箭头指人类图 BodyGraph 顶部四个三角形的朝向（左/右），
 * 与 PHS、Motivation、Perspective、Sense 相关。左=阳/收，右=阴/放（本项目约定）。 */
const ARROWS_ZH = {
  digestion: {
    title: '消化箭头（Digestion）', left: '左向 · 主动进食', right: '右向 · 被动进食',
    leftHint: '主动型：宜按点进食、主动索取食物信号——与「阳主动」相应。脾胃阳气足者宜此。',
    rightHint: '被动型：宜等身体发出信号再进食——与「阴主静」相应。此型强按饭点进食反伤脾土。'
  },
  environment: {
    title: '环境箭头（Environment）', left: '左向 · 选择性环境', right: '右向 · 适应性环境',
    leftHint: '选择型：需主动挑选环境，位置对了身体才通——与「阳主外求」相应。',
    rightHint: '适应型：可适应多变环境，靠内在调节成事——与「阴主内守」相应。'
  },
  motivation: {
    title: '动机箭头（Motivation）', left: '左向 · 策略性动机', right: '右向 · 感受性动机',
    leftHint: '策略型：动机生于「思虑规划」——与脾土「思」、金肺「治节」相应。',
    rightHint: '感受型：动机生于「直觉体感」——与肾水「志」、心火「神明」相应。'
  },
  perspective: {
    title: '视角箭头（Perspective）', left: '左向 · 聚焦式视角', right: '右向 · 广角式视角',
    leftHint: '聚焦型：看见细节与局部——与肺金「主收敛」相应，收敛则能精微。',
    rightHint: '广角型：看见全貌与关联——与肝木「主疏泄、喜条达」相应，条达则能周遍。'
  }
};

/* ---------- 8. 四大类型 → 五行偏性 + 时辰建议（假说级）----------
 * 术语纪律：Generator 一律译「生产者」，MG 译「显示生产者」，禁用「生成者」。 */
const TYPES_ZH = {
  Manifestor: {
    cn: '显示者', el: '火', yang: true,
    trait: '封闭·反叛的能量场。火性主动、外放，宜「告知」以顺火之炎上——不告而作则火郁，郁则易怒。',
    hours: [
      { h: '午', note: '心经旺——显示者阳气外发之极，宜小憩收火，忌此时硬冲。' },
      { h: '戌', note: '心包经旺——喜乐放松，社交易佳，最合显示者外放之性。' }
    ]
  },
  Generator: {
    cn: '生产者', el: '土', yang: true,
    trait: '开放·包覆的能量场。土性厚载、主运化，宜「回应」以顺土之受纳——荐骨烧干方可安眠。',
    hours: [
      { h: '辰', note: '胃经旺——早餐黄金期，土气得养，此型最忌空腹开工。' },
      { h: '巳', note: '脾经旺——运化高峰，宜深度工作，产出最盛。' },
      { h: '子', note: '胆经旺——荐骨未烧干不必强睡，但勿以熬夜代偿。' }
    ]
  },
  'Manifesting Generator': {
    cn: '显示生产者', el: '土木兼', yang: true, dual: ['土','木'],
    trait: '生产者之土载物 + 显示者之动，快而不耐拘。宜「回应后告知」——土宜养、木宜舒，最忌被卡在中间干等。',
    hours: [
      { h: '辰', note: '胃经旺——土气得养，此型动作快易漏餐，务必先吃。' },
      { h: '巳', note: '脾经旺——运化与决策的高峰，宜处理多线并行的事务。' },
      { h: '丑', note: '肝经旺——木气得养，深度修复窗口，跳过则次日易躁。' }
    ]
  },
  Projector: {
    cn: '投射者', el: '金', yang: false,
    trait: '专注·吸纳的能量场。金性收敛、主气之治节，宜「等待邀请」以顺金之待时——不请自来则气散。',
    hours: [
      { h: '酉', note: '肾经旺——藏精时段，投射者最需早收，忌此时加班耗气。' },
      { h: '亥', note: '三焦经旺——百脉归位，宜上床放松，此为投射者最佳入睡窗。' }
    ]
  },
  Reflector: {
    cn: '反映者', el: '水', yang: false,
    trait: '采样·反射的能量场。水性至柔、随方就圆，宜「等待月周期」以顺水之应物——急着定论则浊。',
    hours: [
      { h: '丑', note: '肝经旺——深度修复窗口，反映者宜长期观察此时段睡眠质量。' },
      { h: '卯', note: '大肠经旺——排浊之时，反映者对环境敏感，晨起宜归零重启。' }
    ]
  }
};

/* ---------- 9. 时辰反查（供身体时钟模块）----------
 * 按当前小时取当令时辰：getHourNow(14) → 未时条目 */
function getHourNow(hour24) {
  const h = ((hour24 % 24) + 24) % 24;
  /* 子时 23-01 跨零点，用区间判断 */
  const idx = Math.floor(((h + 1) % 24) / 2);   // 23→0(子), 1→1(丑), 3→2(寅)...
  /* 映射到 ZIWULIUZHU 的索引：ZIWULIUZHU[0]=寅 => 寅对应 h=3 */
  const order = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
  const name = order[idx];
  return ZIWULIUZHU.find(z => z.hour === name) || null;
}

/* 按五行取体藏闸门号（供五行地图点选） */
function getGateByElement(el) {
  return GATES_TCM.filter(r => TRIGRAMS[r.low].element === el).map(r => r.g);
}

/* PHS 查表 */
function getPHS(kind, key) {
  const g = PHS_ZH[kind]; if (!g) return null;
  return g.items.find(i => i.key === key) || null;
}

/* 类型查表（支持中英文） */
function getTypeTcm(name) {
  if (TYPES_ZH[name]) return { key: name, ...TYPES_ZH[name] };
  const hit = Object.keys(TYPES_ZH).find(k => TYPES_ZH[k].cn === name);
  return hit ? { key: hit, ...TYPES_ZH[hit] } : null;
}

/* ---------- 导出（浏览器全局 + Node 双兼容）---------- */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TCM_META, TRIGRAMS, WUXING, SHENG, KE, deriveRelation, GATES_TCM, getGateTcm, ZIWULIUZHU, SOLAR_TERMS, getTermByLon, PHS_ZH, ARROWS_ZH, TYPES_ZH, getHourNow, getGateByElement, getPHS, getTypeTcm };
}
