// 批量生成64个闸门详情HTML页面
const fs = require('fs');
const path = require('path');

// 卦象映射（编号对应易经卦名）
const ICHING = {
  1:"乾·创",2:"坤·受",3:"屯·初始困难",4:"蒙·蒙昧",5:"需·等待",6:"讼·争讼",
  7:"师·军队",8:"比·亲比",9:"小畜·小积累",10:"履·礼行",11:"泰·和泰",12:"否·闭塞",
  13:"同人·同众",14:"大有·大有所成",15:"谦·谦卑",16:"豫·豫悦",17:"随·随从",18:"蛊·整治",
  19:"临·临近",20:"观·观察",21:"噬嗑·咬断",22:"贲·文饰",23:"剥·剥落",24:"复·回复",
  25:"无妄·纯粹",26:"大畜·大积累",27:"颐·颐养",28:"大过·大过渡",29:"坎·深渊",30:"离·火焰",
  31:"咸·感应",32:"恒·恒久",33:"遁·退隐",34:"大壮·大力",35:"晋·前进",36:"明夷·光明受损",
  37:"家人·家庭",38:"睽·对立",39:"蹇·险阻",40:"解·解脱",41:"损·减损",42:"益·增益",
  43:"夬·决断",44:"姤·遇合",45:"萃·聚集",46:"升·上升",47:"困·困境",48:"井·井水",
  49:"革·革命",50:"鼎·鼎器",51:"震·震动",52:"艮·止",53:"渐·渐进",54:"归妹·归嫁",
  55:"丰·丰盛",56:"旅·旅行",57:"巽·风",58:"兑·喜悦",59:"涣·涣散",60:"节·节制",
  61:"中孚·内在信实",62:"小过·小事谨慎",63:"既济·已成",64:"未济·未完成"
};

// 回路缩写
function circuitShort(circuit) {
  if (circuit.includes('个体')) return 'individual';
  if (circuit.includes('集体')) return 'collective';
  return 'tribe';
}

function head(gate) {
  const cls = circuitShort(gate.circuit);
  const circuitColor = cls==='individual'?'#C4956A':cls==='collective'?'#5B8DB8':'#7BAF7B';
  const ch = gate.channel || '';
  const opp = gate.opposite || '';
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>人类图闸门${gate.id}详细指南 · ${gate.name} | ${gate.nameEn}</title>
<meta name="description" content="人类图闸门${gate.id}完整指南：${gate.name}（${gate.nameEn}），${gate.summary}">
<meta name="keywords" content="人类图,闸门${gate.id},${gate.name},${gate.nameEn},${gate.keywords.slice(0,4).join(',')}">
<style>
  :root {
    --bg:#F5F0E8;--bg2:#EDE7D9;--card-bg:#FFFDF8;
    --primary:#C4956A;--primary-dark:#A67848;--deep:#2D2118;
    --text:#3D2E1E;--text-muted:#7A6552;--border:#E8DCC8;--border-light:#F0E8D8;
    --shadow:rgba(45,33,24,0.08);--radius:12px;--radius-sm:8px;
    --circuit:${circuitColor};
  }
  *{box-sizing:border-box;margin:0;padding:0}
  body{
    font-family:"PingFang SC","Hiragino Sans GB","Microsoft YaHei",sans-serif;
    background:var(--bg);color:var(--text);min-height:100vh;font-size:14px;line-height:1.75;
  }
  a{color:var(--primary);text-decoration:none}
  a:hover{color:var(--primary-dark)}

  /* 顶部导航 */
  .top-bar{
    background:var(--deep);padding:10px 20px;
    display:flex;align-items:center;gap:12px;position:sticky;top:0;z-index:200;
    box-shadow:0 2px 12px rgba(0,0,0,0.2);
  }
  .back-link{
    color:rgba(245,239,224,0.7);font-size:12.5px;display:flex;align-items:center;gap:6px;
    transition:color 0.2s;
  }
  .back-link:hover{color:#C4956A}
  .gate-nav-num{color:#C4956A;font-size:13px;font-weight:700}
  .gate-nav-name{color:rgba(245,239,224,0.4);font-size:12px}

  .prev-next{display:flex;gap:8px;margin-left:auto}
  .pn-btn{
    background:rgba(196,149,106,0.15);border:1px solid rgba(196,149,106,0.25);
    color:#C4956A;padding:4px 12px;border-radius:5px;font-size:11.5px;cursor:pointer;
    text-decoration:none;transition:all 0.15s;
  }
  .pn-btn:hover{background:rgba(196,149,106,0.3)}
  .pn-btn.disabled{opacity:0.35;pointer-events:none}

  /* 内容区 */
  .main-wrap{max-width:860px;margin:0 auto;padding:28px 20px 48px}

  /* 标题区 */
  .gate-header{text-align:center;margin-bottom:28px}
  .gate-num-circle{
    width:72px;height:72px;border-radius:50%;background:var(--primary);
    color:#fff;font-size:32px;font-weight:800;display:flex;align-items:center;justify-content:center;
    margin:0 auto 14px;box-shadow:0 4px 18px rgba(196,149,106,0.3);
  }
  .gate-title-cn{font-size:24px;font-weight:700;color:var(--deep);margin-bottom:6px;letter-spacing:1px}
  .gate-title-en{font-size:15px;color:var(--text-muted);font-style:italic;margin-bottom:10px}
  .gate-summary{
    font-size:14px;color:var(--text);max-width:620px;margin:0 auto;line-height:1.8;
    padding:12px 18px;background:var(--card-bg);border-left:3px solid var(--primary);
    border-radius:0 var(--radius-sm) var(--radius-sm) 0;
  }
  .summary-quote{font-size:13px;color:var(--primary-dark);font-weight:600;display:block;margin-bottom:4px}

  /* 信息表 */
  .info-table{
    width:100%;border-collapse:collapse;margin-bottom:28px;font-size:13px;
    background:var(--card-bg);border-radius:var(--radius);overflow:hidden;
    border:1px solid var(--border);box-shadow:0 2px 8px var(--shadow);
  }
  .info-table th{
    background:var(--deep);color:#F5EFE0;padding:9px 14px;text-align:left;font-weight:600;
    font-size:13px;letter-spacing:0.5px;width:120px;
  }
  .info-table td{padding:9px 14px;border-bottom:1px solid var(--border-light);color:var(--text)}
  .info-table tr:last-child td{border-bottom:none}

  /* 章节 */
  .section{margin-bottom:28px}
  .section-title{
    font-size:17px;font-weight:700;color:var(--deep);margin-bottom:14px;padding-bottom:8px;
    border-bottom:2px solid var(--border);display:flex;align-items:center;gap:8px;letter-spacing:0.5px;
  }
  .section-icon{font-size:16px}
  .section-content{font-size:14px;color:var(--text);line-height:1.9}
  .section-content p{margin-bottom:12px}

  /* Ra引用 */
  .ra-quote{
    background:linear-gradient(135deg,rgba(196,149,106,0.08),rgba(196,149,106,0.02));
    border:1px solid rgba(196,149,106,0.2);border-radius:var(--radius-sm);
    padding:16px 18px;margin:14px 0;
  }
  .ra-quote-text{font-size:13px;color:var(--primary-dark);font-style:italic;line-height:1.8;margin-bottom:6px}
  .ra-quote-text::before{content:'" '}
  .ra-quote-text::after{content:' "'}
  .ra-quote-author{font-size:11.5px;color:var(--text-muted);text-align:right}

  /* 爻线 */
  .line-card{
    background:var(--card-bg);border:1px solid var(--border-light);border-radius:var(--radius);
    padding:14px 16px;margin-bottom:10px;transition:all 0.15s;
  }
  .line-card:hover{border-color:var(--primary);box-shadow:0 3px 12px var(--shadow)}
  .line-num{
    display:inline-block;width:26px;height:26px;border-radius:50%;
    background:var(--primary);color:#fff;text-align:center;line-height:26px;
    font-size:13px;font-weight:700;margin-right:10px;vertical-align:middle;
  }
  .line-name{font-size:14px;font-weight:600;color:var(--deep);vertical-align:middle}
  .line-desc{font-size:13px;color:var(--text);margin-top:6px;line-height:1.8;padding-left:36px}

  /* 理解卡片 */
  .insight-card{
    background:var(--card-bg);border:1px solid var(--border);border-radius:var(--radius);
    padding:16px 18px;margin-bottom:10px;position:relative;overflow:hidden;
  }
  .insight-card::after{
    content:'';position:absolute;top:0;bottom:0;left:0;width:4px;
    border-radius:var(--radius) 0 0 var(--radius);background:var(--primary);
  }
  .insight-title{font-size:14px;font-weight:700;color:var(--primary-dark);margin-bottom:6px}
  .insight-text{font-size:13px;color:var(--text);line-height:1.8}

  /* 常见误解 */
  .misconception{display:flex;gap:14px;align-items:flex-start;margin-bottom:10px}
  .miscon-icon{flex-shrink:0;font-size:16px;margin-top:1px}
  .miscon-body{font-size:13px;color:var(--text);line-height:1.8}
  .miscon-wrong{color:var(--primary-dark);font-weight:600;display:block}
  .miscon-correct{color:var(--text);margin-top:3px}

  /* FAQ */
  .faq-item{
    background:var(--card-bg);border:1px solid var(--border-light);border-radius:var(--radius);
    padding:16px 18px;margin-bottom:10px;
  }
  .faq-q{font-size:14px;font-weight:700;color:var(--deep);margin-bottom:8px}
  .faq-a{font-size:13px;color:var(--text);line-height:1.75}

  /* 标签 */
  .kw-tag{
    display:inline-block;background:var(--bg2);color:var(--text-muted);
    padding:3px 10px;border-radius:4px;font-size:11.5px;margin:2px 4px 2px 0;
  }

  /* 页脚 */
  .site-footer{
    text-align:center;padding:24px;border-top:1px solid var(--border);
    font-size:12px;color:var(--text-muted);
  }
  .site-footer a{color:var(--primary)}

  @media(max-width:600px){
    .gate-title-cn{font-size:20px}
    .main-wrap{padding:18px 12px 36px}
    .info-table th{width:90px;font-size:12px}
    .info-table td{font-size:12px}
  }
</style>
</head>
<body>

<!-- 顶部导航 -->
<div class="top-bar">
  <a href="index.html" class="back-link">← 64闸门总览</a>
  <span class="gate-nav-num">#${gate.id}</span>
  <span class="gate-nav-name">${gate.name}</span>
  <div class="prev-next">
    <a href="gate-${Math.max(1,gate.id-1)}.html" class="pn-btn${gate.id===1?' disabled':''}">← 上一门</a>
    <a href="gate-${Math.min(64,gate.id+1)}.html" class="pn-btn${gate.id===64?' disabled':''}">下一门 →</a>
  </div>
</div>

<!-- 主内容 -->
<div class="main-wrap">`;
}

function foot(gate) {
  const prev = gate.id > 1 ? `gate-${gate.id-1}.html` : '#';
  const next = gate.id < 64 ? `gate-${gate.id+1}.html` : '#';
  const prevDisabled = gate.id === 1 ? ' disabled' : '';
  const nextDisabled = gate.id === 64 ? ' disabled' : '';
  return `
</div>

<!-- 底部导航 -->
<div style="text-align:center;padding:16px 0 28px;border-top:1px solid var(--border);margin:0 20px">
  <div style="display:flex;justify-content:center;align-items:center;gap:16px">
    <a href="${prev}" class="pn-btn${prevDisabled}" style="padding:8px 18px;font-size:13px">← 闸门${gate.id-1}</a>
    <a href="index.html" style="color:var(--primary);font-size:13px;font-weight:600;padding:8px 18px;border:1.5px solid var(--primary);border-radius:6px;">返回总览</a>
    <a href="${next}" class="pn-btn${nextDisabled}" style="padding:8px 18px;font-size:13px">闸门${gate.id+1} →</a>
  </div>
</div>

<!-- 页脚 -->
<footer class="site-footer">
  <p>内容参考：Ra Uru Hu · Mary Ann Winiger · Chetan Parkyn · Karen Curry Parker · John Cole</p>
  <p style="margin-top:4px">Powered By Kan Man Tang</p>
</footer>

</body>
</html>`;
}

// 爻线模板内容生成
function getLineContent(gate, line) {
  const themes = [
    ["接收灵感 · 等待时机", "内在光芒自然流露", "在试错中发现持久性", "孤独酝酿创意", "吸引社会关注 · 成为焦点", "客观审视 · 长远价值"],
    ["直觉导航 · 美感导向", "天然而不自知的知晓", "试错学习 · 终身过程", "保密时机 · 守护萌芽", "资源管理 · 实践方向", "高处审视 · 客观智慧"],
    ["承认混乱 · 等待秩序", "脆弱不稳定的新生力量", "生存试错 · 筛选肥沃", "克服起步困难", "社会投射 · 坚持方向", "臣服 · 信任自然过程"],
    ["寻找答案 · 探索可能性", "天然的逻辑感知", "试错中检验公式", "机会主义 · 发现答案", "社交期待 · 被听见", "客观 · 接受不完整"],
    ["固定节奏 · 等待习惯", "吸引规律 · 滋养流动", "打破节奏 · 调整习惯", "协调他人节奏", "被期望保持节奏", "接纳自然节律"],
    ["亲近的渴望", "天然的吸引", "在冲突中学习边界", "维持亲密关系", "冲突调解者角色", "成熟后的内在和平"],
    ["幕后观察 · 理解模式", "自然展现的洞察力", "不断调整领导策略", "分享洞见 · 民主领导", "被投射为领袖", "超越自我 · 智慧影响"],
    ["真实的贡献渴望", "以身作则 · 自然吸引", "在尝试中表达独特", "同频共振 · 自然连结", "成为众人追随的榜样", "超脱 · 纯粹贡献"],
    ["专注积累 · 细节中积蓄力量", "天赋般的聚焦能力", "在分散中学习专注", "校准细节 · 稳定输出", "被期待成为专家", "细节中见宏观智慧"],
    ["接受位置 · 找到价值", "自然行为 · 不自觉显现", "行为碰撞 · 坚持立场", "等待时机 · 顺应变通", "挑战传统行为 · 公开异见", "活生生的行为典范"],
    ["内在理念的萌发", "天然概念力 · 创意产出", "在想法碰撞中提炼智慧", "分享理念 · 启发他人", "社会期待 · 投射创新", "客观审视 · 和平智慧"],
    ["内在感受 · 谨慎表达", "自然优雅的天赋", "在表达中寻找安全边界", "等待正确倾诉时机", "被期待完成艺术表达", "成熟后的平静接纳"],
    ["倾听 · 内在承载空间", "天然同理 · 不自觉", "在保密中学习", "分享智慧 · 适时倾诉", "被投射为知己", "故事储藏的智者"],
    ["内在的资源敏感性", "天生赚钱才能", "资源运用的试错", "分享财富与能量", "大众投射的财富期待", "资源管理的客观智慧"],
    ["包容奇异的节奏", "自然接纳多样性", "在各种节奏中实验平衡", "以节奏连结人群", "被期待调和极端", "超越二元对立"],
    ["初学热情 · 兴奋体验", "自然才华 · 一见钟情", "反复练习 · 形成技能", "分享才能 · 教导他人", "被投射为专家", "达到精通的客观境界"],
    ["形成初步逻辑观点", "天赋般的模式识别", "在反复验证中精炼", "分享洞见 · 组织架构", "被期待提供正确答案", "超越偏执 · 全面视角"],
    ["本能挑剔 · 发现瑕疵", "天然的完美品味", "反复改进的试错", "分享品味 · 改善环境", "被投射为完美批评者", "不完美的禅意"],
    ["基本需求的觉知", "天生友善 · 温柔靠近", "靠近与离开间的试错", "维护安全边界", "被投射为守护者", "成熟后的慷慨奉献"],
    ["守在当下 · 表面的觉知", "独断视角 · 限制性确信", "试错中发展自我觉知", "成为导师 · 应用当下", "现实主义 · 面对真实", "当下中自然展现智慧"],
    ["掌控领地的初动", "天然权力感", "权力应用中的试错", "分享控制权", "被投射为掌权者", "不执着的控制"],
    ["内在恩典 · 情绪开放", "自然优雅的聆听", "情绪开放中的学习", "等待正确倾诉时机", "被投射为疗愈者", "灵魂层面平静"],
    ["内在突变正在酝酿", "天才视角浮现", "分裂中释放洞见", "分享独特洞见", "被投射为天才或怪人", "超越二元对立的智慧"],
    ["理性化 · 内在回归", "直觉闪光 · 不断回归", "反复验证洞见", "分享理性化的顿悟", "被期待给出神秘答案", "成为冥想典范"],
    ["无条件之爱 · 天真", "自然散发的疗愈频率", "在爱中试错", "分享爱 · 疗愈他人", "被投射为救世主", "成为爱的存在"],
    ["说服冲动 · 销售本能", "精明的交易直觉", "在讨价还价中学习", "合作中的弹性沟通", "被投射为谈判高手", "智慧的说服者"],
    ["滋养本能 · 关怀", "天生照顾者", "在照顾中学习平衡", "共享资源 · 慷慨付出", "被期待无限给予", "滋养的智慧老人"],
    ["生命意义 · 探索冒险", "直觉的赌注勇气", "冒险中的试错", "分享经验 · 激励他人", "被投射为冒险家", "在命运中领悟意义"],
    ["承诺的深度 · 说\"是\"", "天然的持久力", "在承诺中学习", "分享承诺与坚持", "被期待永不放弃", "智慧的坚持者"],
    ["渴望之火初燃", "吸引力 · 自然闪耀", "情感波动中学习", "分享热情 · 激励他人", "被投射为情绪领袖", "情绪的炼金术士"],
    ["影响力的初现", "自然感染力的声音", "在表达中调整", "分享见解 · 领导众人", "被期待指引方向", "智慧的声音"],
    ["本能的可持续判断", "天生的评估力", "在判断中学习", "分享评估智慧", "被投射为审慎者", "本能智慧的传承者"],
    ["退隐 · 自我沉淀", "自然独处需求", "在静默中学习", "分享沉淀后的智慧", "被投射为隐士", "集体记忆的守护者"],
    ["原始力量的躁动", "天生强力 · 积极行动", "在行动中学习克制", "分享力量 · 激励他人", "被投射为超人", "力量中见优雅"],
    ["对多样体验的渴望", "天然的故事收集者", "在经历中学习智慧", "分享生命故事", "被投射为冒险旅行者", "故事人生的收藏家"],
    ["黑暗中的敏感力", "自然的情绪深度", "在危机中蜕变", "分享情感智慧", "被投射为受苦者", "黑暗后悟道"],
    ["家庭纽带 · 忠诚", "天然的家庭温暖", "情感连结的试错", "分享忠诚与承诺", "被投射为家庭核心", "超越血缘的家人之爱"],
    ["为意义而战的战士", "天然的对抗力", "在斗争中学习", "分享战斗的意义", "被投射为战士", "战士的智慧"],
    ["挑衅本能 · 探索灵魂", "自然刺激他人", "在挑衅中学习", "分享反思 · 激发觉悟", "被投射为挑衅者", "善巧的唤醒者"],
    ["独处的需求", "天然的工作意志", "在劳动与休息中平衡", "分享解放与解脱", "被投射为工作狂", "解脱的智慧"],
    ["收缩的开始 · 渴望体验", "天然的幻想力", "在渴望中学习", "分享梦想与渴望", "被投射为梦想家", "幻想家的洞见"],
    ["周期完成的初期力量", "自然的总结力", "在完成中学习", "分享成熟的智慧", "被投射为完结者", "周期终结的智者"],
    ["内在突破底层的酝酿", "天才般的一闪", "在突破中学习", "分享结构性洞见", "被投射为天才", "突破后看透万物"],
    ["本能的警觉力", "天生的识人术", "在警觉中学习信任", "分享本能洞见", "被投射为雷达", "本能的智慧守护者"],
    ["聚集资源 · 教育服务", "天然的组织力", "在分配中学习平衡", "分享资源 · 赋能众人", "被投射为王", "教育家的智慧"],
    ["身在正确之处的喜悦", "自然的机缘吸引力", "在对的相遇中学习", "分享存在之爱", "被投射为幸运儿", "对一切存在的爱"],
    ["压力下的意义寻求", "天然的困惑中的灵感", "在困境中学习", "分享领悟的智慧", "被投射为苦恼者", "悟者的清晰"],
    ["井底的智慧 · 不足感", "自然深度的感知", "在深度中学习", "分享智慧 · 滋养他人", "被投射为智者", "深井的根源智慧"],
    ["价值观 · 原则初现", "天然的原则感", "在拒绝与接受中学习", "分享原则 · 守护集体", "被投射为革命者", "正义的长者"],
    ["守护传统 · 传承美德", "天然的守护本能", "在守护中学习", "分享价值 · 共识连结", "被投射为法官", "文明的基石"],
    ["震撼内在 · 发起竞争", "天然的中心测试力", "在竞争与震撼中学习", "分享勇气 · 激发力量", "被投射为战士", "神圣的中心勇士"],
    ["静止 · 减压", "天然的内敛能力", "在静止中学习", "分享从容 · 宁静影响", "被投射为镇定者", "静止的佛性"],
    ["新开始的驱动压力", "自然的新周期开启力", "在开始中学习", "分享发展 · 鼓励前行", "被投射为发起者", "新起点的智慧长者"],
    ["向上蜕变的野心", "天然的晋升本能", "在攀登中学习智慧", "分享蜕变经验", "被投射为追梦者", "攀登的终极自由"],
    ["精神丰盛 · 内在信念", "自然的精神光辉", "在情绪波浪中学习", "分享精神力量", "被投射为灵魂导师", "与宇宙合一的丰盛"],
    ["故事的旅行本能", "天然的说故事者", "在故事中学习", "分享故事 · 启发集体", "被投射为漫游者", "终极的故事人"],
    ["当下的直觉清晰", "天然的最深直觉", "在直觉中学习生存", "分享敏锐觉知", "被投射为预言者", "直觉的纯净之眼"],
    ["生命的喜悦 · 对完美的热爱", "天然的活力奔放", "在热爱中学习", "分享喜悦能量", "被投射为小太阳", "活力的智慧长者"],
    ["亲密渴望初现", "自然的穿透界限力", "在亲密中学习", "分享深度连结", "被投射为伴侣", "界限消融后的合一"],
    ["限制 · 内在壁垒", "天然的限制接纳力", "在限制中积蓄力量", "分享限制的智慧", "被投射为保守者", "限制中的突变火种"],
    ["内在信实 · 神秘知晓", "自然的内在真理管道", "在神秘中学习", "分享宇宙洞见", "被投射为通灵者", "静默的知晓者"],
    ["细节的表达 · 精准描述", "天然的细节敏感力", "在精准中学习", "分享事实与数据", "被投射为数据人", "细节中的宏观智慧"],
    ["逻辑质疑 · 初始怀疑", "天然的怀疑中枢", "在怀疑中学习", "分享验证结果", "被投射为评论家", "质疑中的智慧之光"],
    ["困惑 · 未完成的压力", "天然的灵感接收器", "在困惑中酝酿洞察", "分享可能性与灵感", "被投射为幻想家", "无极中的无限可能"]
  ];
  const idx = gate.id - 1;
  const lineTheme = themes[idx] || ["基础层", "天赋层", "试错层", "社会层", "投射层", "智慧层"];
  return lineTheme[line - 1] || "持续演化与成长";
}

function getLineChineseNumber(n) {
  return ['一','二','三','四','五','六'][n-1];
}

function getLineSymbol(n) {
  return ['初爻 · 基础','二爻 · 天赋','三爻 · 试错','四爻 · 外化','五爻 · 投射','上爻 · 超越'][n-1];
}

// 一句话总结
function getSummary(gate) {
  return gate.summary;
}

// Ra核心定义（每个闸门的核心语句）
const RA_QUOTES = {
  1: '「创作作为原始力量。在没有限制的情况下彰显灵感的能量潜力。」· Ra Uru Hu',
  2: '「接收作为决定任何回应的原始基座。它是行动之根。」· Ra Uru Hu',
  3: '「启蒙的根本挑战在于超越混乱并建立秩序。」· Ra Uru Hu',
  4: '「逻辑心智通过寻找答案来理解世界，即使答案是暂时的。」',
  5: '「固定节奏的力量，等待对的生命流动。」',
  6: '「亲密关系的守门员，透过摩擦来调节亲密的程度。」',
  7: '「逻辑领导的幕後推手，为集体提供方向与结构。」',
  8: '「以自己的方式做出的贡献，是活出独特性的自然结果。」',
  9: '「细节的驯服力量，透过聚焦微小来积累巨大的能量。」',
  10: '「觉醒不是承诺要成为什么，而是承诺做你自己。」· Ra Uru Hu',
  11: '「想法的和平力量：站在已知与未知之间，为集体提供理念。」',
  12: '「慎重表达的艺术，在正确的时机传达内在的情感。」',
  13: '「倾听者的秘密力量，是人类记忆与故事的守护者。」',
  14: '「繁荣与资源的钥匙，驱动人生方向的动力燃料。」',
  15: '「拥抱极端的智慧，以人类之爱包容所有节奏与行为。」',
  16: '「技能与热忱的精通之路，透过反复实验来验证才华。」',
  17: '「逻辑意见的组织力量，为未来建立参考框架。」',
  18: '「纠正与改善的力量，对不完美有敏锐觉知并推动事物走向最佳。」',
  19: '「靠近与想要的敏感力量，对人类需求有极度敏锐的感知。」',
  20: '「在当下的辨视与觉察，将理解转化为正确的行动。」· Ra Uru Hu',
  21: '「透过意志力掌控资源与领地，是部落物质安全的守护者。」',
  22: '「恩典与情绪开放，以优雅姿态聆听并连结他人。」',
  23: '「从天才到疯子的表达艺术，将内在突变转化为语言。」',
  24: '「回归与合理化，透过反复思考来将神秘洞见转化为理性语言。」',
  25: '「天真无邪的宇宙之爱，纯粹的精神能量带来世界疗愈。」',
  26: '「意志力的销售大师，透过说服与夸张推动资源流通。」',
  27: '「滋养与关怀的生命力量，维持部落生命与健康的直觉。」',
  28: '「生命意义的游戏玩家，以生命为赌注寻找真正的价值。」',
  29: '「对生命说是的承诺力量，全然投入深度体验累积智慧。」',
  30: '「命运之火的渴望力量，透过情感烈度体验生命的最深层。」',
  31: '「民主领导的影响力，为集体理性发声与指引。」',
  32: '「持续与延续的本能智慧，判断什么能长久存活。」',
  33: '「退隐与沉淀的智慧，将体验转化为集体记忆的守护者。」',
  34: '「纯粹而强大的生命力，透过忙碌的行动表现独立的自我。」',
  35: '「体验与改变的进展力量，渴望多样人生以丰富集体故事。」',
  36: '「危机中的蜕变成长，透过极致的情绪体验转化为智慧。」',
  37: '「家庭与友谊的情感连结，透过忠诚与温暖维护部落凝聚力。」',
  38: '「为生命意义而战的战士，在孤独挣扎中守护内在真理。」',
  39: '「挑衅者的精神探索，透过刺激激活他人内在灵魂能量。」',
  40: '「独处与解脱，是工作与休息之间的意志力平衡者。」',
  41: '「人类体验循环的起点，透过内在渴望与幻想驱动生命体验展开。」',
  42: '「完成周期的成长力量，画上句号沉淀智慧迎接新开始。」',
  43: '「突破与洞见的内在源头，在被表达之前难以理解的天才能量。」',
  44: '「本能记忆的警觉之力，是部落合作关系中的天然雷达。」',
  45: '「聚集与分配资源的统治力量，是部落的首领与教育者。」',
  46: '「缘份与身体之爱，在正确的时机身处正确的地方遇见美好。」',
  47: '「困境与压抑后的领悟，回顾过去体验并从中提炼意义。」',
  48: '「深不可测的智慧之井，对自身资源保有天然不足感。」',
  49: '「基于原则的革命力量，以接受或拒绝来推动变革。」',
  50: '「价值守护的责任力量，是文明与道德传承的基石。」',
  51: '「震撼与发起的勇气力量，在竞争中找到中心与内在强度。」',
  52: '「静止的力量，在安静中积蓄力量并影响外在世界。」',
  53: '「开始新周期的驱动力，是人生各阶段新开端的能量引擎。」',
  54: '「野心与蜕变的向上力量，在精神与物质层面推动自我超越。」',
  55: '「精神丰盛与情绪信念的承载者，连结灵魂与物质世界。」',
  56: '「漫游者的故事力量，将生命体验转为启发他人的智慧语言。」',
  57: '「最精准的当下直觉力，瞬间辨别什么对生存有益或有害。」',
  58: '「喜悦的活力，对生命充满热爱并推动事物走向完美。」',
  59: '「亲密与分散的力量，透过打破界限来建立深度连结。」',
  60: '「接受限制的超越力量，在边界中找到突破与创新的智慧。」',
  61: '「内在真理的神秘天线，接收宇宙知晓为世界带来无法言喻的洞见。」',
  62: '「细节与准备的精确力量，将逻辑模式转为你可操作的语言。」',
  63: '「怀疑与好奇的智慧，透过理性质疑驱动逻辑思考。」',
  64: '「困惑中的灵感之源，在压力中接收无限可能性与未完成的潜力。」'
};

function genGatePage(gate) {
  const clos = circuitShort(gate.circuit);
  const iching = ICHING[gate.id] || '';
  const oppName = gate.opposite ? `闸门${gate.opposite}` : '—';
  const clab = clos==='individual'?'个体回路':clos==='collective'?'集体回路':'部落回路';
  const raQuote = RA_QUOTES[gate.id] || '核心定义根据 Ra Uru Hu 教学整理。';
  const summary = getSummary(gate);

  // 爻线
  let linesHtml = '';
  for (let l=1; l<=6; l++) {
    const lc = getLineContent(gate, l);
    const sym = getLineSymbol(l);
    linesHtml += `
      <div class="line-card">
        <span class="line-num">${l}</span>
        <span class="line-name">${sym}</span>
        <div class="line-desc">${lc}</div>
      </div>`;
  }

  // 通道信息
  let channelInfo = '';
  if (gate.channel) {
    const chParts = gate.channel.split('/');
    channelInfo = `<p>本闸门可形成：<strong>${gate.channel}</strong></p>`;
  }

  return head(gate) + `
  <!-- 标题 -->
  <div class="gate-header">
    <div class="gate-num-circle">${gate.id}</div>
    <h1 class="gate-title-cn">${gate.name}</h1>
    <div class="gate-title-en">${gate.nameEn}</div>
    <div class="gate-summary">
      <span class="summary-quote">💡 一句话总结</span>
      ${summary}
    </div>
  </div>

  <!-- 基本信息表 -->
  <table class="info-table">
    <tr><th>中文名称</th><td>${gate.name}</td></tr>
    <tr><th>英文名称</th><td>${gate.nameEn}</td></tr>
    <tr><th>易经卦象</th><td>☯ ${iching}</td></tr>
    <tr><th>所属中心</th><td>◎ ${gate.center}</td></tr>
    <tr><th>所属回路</th><td><span class="kw-tag" style="background:${clos==='individual'?'#FDF5EB':clos==='collective'?'#EBF3FB':'#EBF5EB'};color:${clos==='individual'?'#C4956A':clos==='collective'?'#5B8DB8':'#7BAF7B'}">${clab}</span></td></tr>
    <tr><th>对向闸门</th><td>${oppName}</td></tr>
    <tr><th>通道</th><td>${gate.channel || '—'}</td></tr>
    <tr><th>核心关键词</th><td>${gate.keywords.map(k=>`<span class="kw-tag">${k}</span>`).join(' ')}</td></tr>
  </table>

  <!-- Ra核心定义 -->
  <div class="section">
    <div class="section-title"><span class="section-icon">📡</span> Ra Uru Hu 核心定义</div>
    <div class="section-content">
      <p>闸门 ${gate.id} 是 ${iching} 的卦象在人类图系统中的能量表达。</p>
      <div class="ra-quote">
        <div class="ra-quote-text">${raQuote.split('·')[0].replace(/^[「"](.+)[」"]$/, '$1').replace(/^[「"]|"[」"]$/g,'')}</div>
        <div class="ra-quote-author">— Ra Uru Hu</div>
      </div>
      <p>该闸门位于<b>${gate.center}</b>，属于<b>${gate.circuit}</b>。${gate.opposite ? `它与对向闸门 ${gate.opposite} 共同形成完整的能量互补。` : ''}</p>
      ${channelInfo}
    </div>
  </div>

  <!-- 整体能量描述 -->
  <div class="section">
    <div class="section-title"><span class="section-icon">🌀</span> 整体能量描述</div>
    <div class="section-content">
      <p>闸门 ${gate.id} 的能量展现了从内在迸发到外在社会化的演化过程。关键主题是：<strong>${gate.keywords.slice(0, 3).join('、')}</strong>。</p>
      <p>这股能量的运作模式与所在的回路密切相关——${clos === 'individual' ? '作为<b>个体回路</b>的一部分，它以<b>脉冲式</b>运作，能量会自然地\"打开\"和\"关闭\"。在\"开\"时灵感迸发、充满创造力；\"关\"时则需要退隐、独处、积蓄下一轮的突变动能。这种节奏是不可被意志操控的。' : clos === 'collective' ? '作为<b>集体回路</b>的一部分，它关注经验的<b>分享</b>、<b>故事</b>与<b>逻辑模式</b>。这股能量不是孤立的，而是为了被集体吸收与使用——透过经验的积累、模式的识别和故事的传递来推动整个社群的前进。' : '作为<b>部落回路</b>的一部分，它关注<b>支持</b>、<b>保护</b>和<b>承诺</b>。这股能量是为了维护亲密关系、部落安全与资源分配而存在的，它透过忠诚、约定和对家庭的守护来凝聚人类社群的根基。'}</p>
      <p>该闸门所属中心 —— <b>${gate.center}</b> —— 决定了这股能量的产生与处理方式。${gate.center.includes('荐骨') ? '荐骨是生命力的源泉，因此这股能量有强大的\'做\'的驱动力，但需要通过荐骨回应来启动。' : gate.center.includes('G') ? 'G中心是爱、方向与自我定位的中心，这股能量与自我身份和生命方向有关。' : gate.center.includes('喉轮') ? '喉轮是表达的中心，这股能量需要被说出来、表现出来。' : gate.center.includes('逻辑') ? '逻辑头脑处理概念与模式，这股能量倾向于分析、怀疑和构建理解框架。' : gate.center.includes('情绪') ? '情绪中心的能量以波浪形式运作，因此这股能量伴随着情绪的高低起伏。' : gate.center.includes('根部') ? '根部中心处理压力，这股能量伴随着驱动\'向前进\'的压力感。' : gate.center.includes('直觉') ? '直觉中心是生存、免疫与直觉觉知的中心，这股能量极其快速且精准地运行于当下。' : gate.center.includes('意志') ? '意志力中心是承诺与价值的中心，这股能量与意志力、资源和自我价值直接相关。' : ''}</p>
    </div>
  </div>

  <!-- 爻线解析 -->
  <div class="section">
    <div class="section-title"><span class="section-icon">☯</span> 六爻演化</div>
    <div class="section-content" style="margin-bottom:12px">
      <p>闸门 ${gate.id} 的六条爻线描述了这股能量从最底层到最高层的完整演化路径：</p>
    </div>
    ${linesHtml}
  </div>

  <!-- 理解与应用 -->
  ${gate.deepUnderstand ? `
  <div class="section">
    <div class="section-title"><span class="section-icon">💎</span> 深入理解</div>
    ${gate.deepUnderstand}
  </div>` : ''}

  <!-- 常见误解 -->
  ${gate.misconceptions && gate.misconceptions.length > 0 ? `
  <div class="section">
    <div class="section-title"><span class="section-icon">⚠️</span> 常见误解</div>
    ${gate.misconceptions.map(m => `
    <div class="misconception">
      <div class="miscon-icon">❌</div>
      <div class="miscon-body">
        <span class="miscon-wrong">${m.wrong}</span>
        <span class="miscon-correct">${m.correct}</span>
      </div>
    </div>`).join('')}
  </div>` : ''}

  <!-- 本闸门通道 -->
  ${gate.channel ? `
  <div class="section">
    <div class="section-title"><span class="section-icon">🔗</span> 相关通道</div>
    <div class="section-content">
      ${gate.channel.split('/').map(c => renderChannelItem(c.trim())).join('')}
    </div>
  </div>` : ''}

  <!-- 关联闸门 -->
  <div class="section">
    <div class="section-title"><span class="section-icon">🔀</span> 关联闸门</div>
    <div class="section-content">
      <p>对向闸门：<a href="gate-${gate.opposite}.html">闸门 ${gate.opposite}</a> &nbsp;·&nbsp; 
      上一门：<a href="gate-${Math.max(1,gate.id-1)}.html">闸门 ${Math.max(1,gate.id-1)}</a> &nbsp;·&nbsp; 
      下一门：<a href="gate-${Math.min(64,gate.id+1)}.html">闸门 ${Math.min(64,gate.id+1)}</a></p>
    </div>
  </div>

  ${foot(gate)}`;
}

// 生成所有页面
const { GATES_DATA, CHANNEL_DESCRIPTIONS } = require('./gates-data.js');
const outDir = __dirname;

// 规范化通道key（提取闸门号，小号在前）
function getChannelKey(channelName) {
  const nums = (channelName.match(/\d+/g) || []).map(Number);
  if (nums.length < 2) return null;
  return nums.sort((a, b) => a - b).join('-');
}

// 生成单条通道的HTML
function renderChannelItem(channelName) {
  const key = getChannelKey(channelName);
  const desc = key && CHANNEL_DESCRIPTIONS ? CHANNEL_DESCRIPTIONS[key] : null;
  if (desc) {
    return `<div class="channel-item" style="margin-bottom:14px;">
      <p style="margin:0 0 4px 0;"><strong>${channelName}</strong></p>
      <p style="margin:0;color:#5C4A3A;font-size:13px;line-height:1.7;">${desc}</p>
    </div>`;
  }
  return `<div class="channel-item" style="margin-bottom:14px;">
    <p style="margin:0;"><strong>${channelName}</strong></p>
  </div>`;
}

console.log(`开始生成 ${GATES_DATA.length} 个闸门详情页...`);

GATES_DATA.forEach(gate => {
  const html = genGatePage(gate);
  const filePath = path.join(outDir, `gate-${gate.id}.html`);
  fs.writeFileSync(filePath, html, 'utf-8');
  console.log(`  ✅ 闸门 ${gate.id} — ${gate.name}`);
});

console.log(`\n🎉 全部完成！${GATES_DATA.length} 个闸门页面已生成到: ${outDir}`);
console.log(`\n📄 项目文件列表:`);
const files = fs.readdirSync(outDir).filter(f => f.endsWith('.html')).sort((a,b) => {
  const na = parseInt(a.match(/(\d+)/)?.[1] || '0');
  const nb = parseInt(b.match(/(\d+)/)?.[1] || '0');
  return na - nb;
});
files.forEach(f => console.log(`   • ${f}`));
console.log(`\n📦 文件总数: ${files.length} 个HTML + 1个数据文件 + 本脚本`);
