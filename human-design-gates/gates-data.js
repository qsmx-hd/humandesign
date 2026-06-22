// 人类图64个闸门完整数据 (V2 — 以 lighteden.one 为权威源修正)
// 包含：编号、中文名、英文名、所属中心、所属回路、对向闸门、通道、核心关键词、一句话总结
const GATES_DATA = [
  {
    "id": 1,
    "name": "自我表达的创意力量",
    "nameEn": "The Creative",
    "iching": "乾 · 创 · 纯阳",
    "center": "G中心",
    "circuit": "个体回路 → 觉知回路",
    "opposite": 8,
    "channel": "1-8 灵感的通道",
    "keywords": [
      "创意",
      "独特性",
      "自我表达",
      "突变",
      "灵感"
    ],
    "summary": "纯阳能量，透过展现个人独特性与原创性，为整体带来新的方向与突变",
    "color": "#C4956A"
  },
  {
    "id": 2,
    "name": "接收与方向的内在导航",
    "nameEn": "The Receptive",
    "iching": "坤 · 受 · 纯阴",
    "center": "G中心",
    "circuit": "个体回路 → 觉知回路",
    "opposite": 14,
    "channel": "2-14 脉动的通道",
    "keywords": [
      "接收性",
      "方向感",
      "内在导航",
      "司机",
      "磁单极"
    ],
    "summary": "纯阴能量，是生命的「司机」与磁单极所在，透过极致接收性为生命提供方向",
    "color": "#C4956A"
  },
  {
    "id": 3,
    "name": "在混乱中建立新秩序",
    "nameEn": "Difficulty at the Beginning",
    "iching": "屯 · 初始的困难",
    "center": "荐骨中心",
    "circuit": "个体回路 → 觉知回路",
    "opposite": 60,
    "channel": "3-60 突变的通道",
    "keywords": [
      "突变",
      "秩序",
      "混乱",
      "创新",
      "脉冲"
    ],
    "summary": "在混乱中透过脉冲式能量建立全新秩序，将「无」化为「有」",
    "color": "#7B6B5A"
  },
  {
    "id": 4,
    "name": "公式化的逻辑心智",
    "nameEn": "Youthful Folly",
    "iching": "蒙 · 蒙昧",
    "center": "逻辑头脑",
    "circuit": "集体回路 → 理解回路",
    "opposite": 63,
    "channel": "4-63 逻辑的通道",
    "keywords": [
      "逻辑",
      "公式",
      "解答",
      "智识",
      "可能性"
    ],
    "summary": "透过寻找逻辑答案和公式来理解世界，有时候答案尚不完整",
    "color": "#8B7355"
  },
  {
    "id": 5,
    "name": "固定节奏的等待力量",
    "nameEn": "Waiting",
    "iching": "需 · 等待 · 营养",
    "center": "荐骨中心",
    "circuit": "集体回路 → 理解回路",
    "opposite": 15,
    "channel": "5-15 韵律的通道",
    "keywords": [
      "节奏",
      "等待",
      "习惯",
      "规律",
      "流动"
    ],
    "summary": "固定的节奏与习惯的力量，透过规律性流动为自己和他人建立稳定感",
    "color": "#7B6B5A"
  },
  {
    "id": 6,
    "name": "冲突与亲密的情绪守门员",
    "nameEn": "Conflict / Friction",
    "iching": "讼 · 争讼",
    "center": "情绪中心",
    "circuit": "集体回路 → 感知回路",
    "opposite": 59,
    "channel": "6-59 亲密的通道",
    "keywords": [
      "冲突",
      "亲密",
      "情绪",
      "摩擦",
      "守门"
    ],
    "summary": "是亲密关系的守门员，透过冲突与摩擦来调节关系中的开放程度",
    "color": "#9B6B4A"
  },
  {
    "id": 7,
    "name": "逻辑领导的幕后推手",
    "nameEn": "The Army",
    "iching": "师 · 军队",
    "center": "G中心",
    "circuit": "集体回路 → 理解回路",
    "opposite": 31,
    "channel": "7-31 意识领袖的通道",
    "keywords": [
      "领导",
      "方向",
      "未来",
      "影响力",
      "民主"
    ],
    "summary": "透过逻辑与理解为集体提供方向，是幕后的民主领导力量",
    "color": "#C4956A"
  },
  {
    "id": 8,
    "name": "以身作则的贡献力量",
    "nameEn": "Contribution",
    "iching": "比 · 亲比",
    "center": "喉轮中心",
    "circuit": "个体回路 → 觉知回路",
    "opposite": 1,
    "channel": "1-8 灵感的通道",
    "keywords": [
      "贡献",
      "以身作则",
      "独特性",
      "表达",
      "真实"
    ],
    "summary": "透过真实地活出自己来贡献社会，是个体创意与集体之间的桥梁",
    "color": "#B8860B"
  },
  {
    "id": 9,
    "name": "专注细节的驯服力量",
    "nameEn": "The Taming Power of the Small",
    "iching": "小畜 · 小的积累",
    "center": "荐骨中心",
    "circuit": "集体回路 → 理解回路",
    "opposite": 52,
    "channel": "9-52 专注的通道",
    "keywords": [
      "专注",
      "细节",
      "积累",
      "耐心",
      "聚焦"
    ],
    "summary": "透过专注于细节和持续积累，在看似渺小的行动中积蓄巨大的力量",
    "color": "#7B6B5A"
  },
  {
    "id": 10,
    "name": "自我行为的觉醒力量",
    "nameEn": "Treading / Behavior of the Self",
    "iching": "履 · 礼行",
    "center": "G中心",
    "circuit": "个体回路 → 觉知回路",
    "opposite": 20,
    "channel": "10-20 觉醒通道 / 10-34 探索通道 / 10-57 完美形式通道",
    "keywords": [
      "自我行为",
      "真实性",
      "爱自己",
      "觉醒",
      "原则"
    ],
    "summary": "透过忠于自己的行为模式来活出真实的自我，是爱自己的最高表现",
    "color": "#C4956A"
  },
  {
    "id": 11,
    "name": "想法与概念化的和平力量",
    "nameEn": "Peace / Ideas",
    "iching": "泰 · 和泰",
    "center": "逻辑头脑",
    "circuit": "集体回路 → 感知回路",
    "opposite": 56,
    "channel": "11-56 好奇心的通道",
    "keywords": [
      "想法",
      "和平",
      "理念",
      "概念",
      "创意"
    ],
    "summary": "是想法与理念的储存库，透过丰富的概念化思维激发集体的灵感",
    "color": "#8B7355"
  },
  {
    "id": 12,
    "name": "慎重表达的情绪力量",
    "nameEn": "Standstill / Caution",
    "iching": "否 · 闭塞",
    "center": "喉轮中心",
    "circuit": "个体回路 → 觉知回路",
    "opposite": 22,
    "channel": "12-22 敞开的通道",
    "keywords": [
      "慎重",
      "表达",
      "情绪",
      "时机",
      "艺术"
    ],
    "summary": "在正确的时机以优雅的方式表达情绪，是个体情绪与社会表达之间的过滤器",
    "color": "#B8860B"
  },
  {
    "id": 13,
    "name": "倾听者的秘密力量",
    "nameEn": "The Listener",
    "iching": "同人 · 同众",
    "center": "G中心",
    "circuit": "集体回路 → 感知回路",
    "opposite": 33,
    "channel": "13-33 浪迹天涯者的通道",
    "keywords": [
      "倾听",
      "秘密",
      "故事",
      "记忆",
      "同理心"
    ],
    "summary": "天生的倾听者，是人类故事与历史的守护者，持有他人秘密",
    "color": "#C4956A"
  },
  {
    "id": 14,
    "name": "驱动人生方向的动力燃料",
    "nameEn": "Power Skills",
    "iching": "大有 · 大有所成",
    "center": "荐骨中心",
    "circuit": "个体回路 → 觉知回路",
    "opposite": 2,
    "channel": "2-14 脉动的通道",
    "keywords": [
      "动力",
      "财富",
      "资源",
      "繁荣",
      "引擎"
    ],
    "summary": "是生命的「钥匙」，提供驱动人生方向所需的动力燃料与物质资源",
    "color": "#7B6B5A"
  },
  {
    "id": 15,
    "name": "极端中的谦逊与人类之爱",
    "nameEn": "Extremes",
    "iching": "谦 · 谦卑",
    "center": "G中心",
    "circuit": "集体回路 → 理解回路",
    "opposite": 5,
    "channel": "5-15 韵律的通道",
    "keywords": [
      "极端",
      "人类之爱",
      "节奏",
      "多样性",
      "包容"
    ],
    "summary": "拥抱所有节奏与行为的极端，以博大的爱包容人类多样性",
    "color": "#C4956A"
  },
  {
    "id": 16,
    "name": "技能与热忱的精通之路",
    "nameEn": "Skills / Enthusiasm",
    "iching": "豫 · 豫悦",
    "center": "喉轮中心",
    "circuit": "集体回路 → 理解回路",
    "opposite": 48,
    "channel": "16-48 波长的通道",
    "keywords": [
      "技能",
      "热忱",
      "精通",
      "实验",
      "才能"
    ],
    "summary": "透过反复练习与热忱来精通技能，是才华转化为实际表达的力量",
    "color": "#B8860B"
  },
  {
    "id": 17,
    "name": "逻辑意见的组织力量",
    "nameEn": "Following / Opinions",
    "iching": "随 · 随从",
    "center": "逻辑头脑",
    "circuit": "集体回路 → 理解回路",
    "opposite": 62,
    "channel": "17-62 接受的通道",
    "keywords": [
      "意见",
      "逻辑",
      "组织",
      "未来",
      "预测"
    ],
    "summary": "是逻辑意见与模式识别的中心，透过组织观点来为集体提供参考框架",
    "color": "#8B7355"
  },
  {
    "id": 18,
    "name": "纠正与改善的品味力量",
    "nameEn": "Work on What Has Been Spoiled",
    "iching": "蛊 · 整治败坏",
    "center": "直觉中心",
    "circuit": "集体回路 → 理解回路",
    "opposite": 58,
    "channel": "18-58 判断的通道",
    "keywords": [
      "纠正",
      "品味",
      "批判",
      "改善",
      "完美"
    ],
    "summary": "对不完美有敏锐的觉知，透过批判与纠正来推动事物走向最佳状态",
    "color": "#6B8E6E"
  },
  {
    "id": 19,
    "name": "靠近与想要的敏感力量",
    "nameEn": "Approach / Wanting",
    "iching": "临 · 临近",
    "center": "根部中心",
    "circuit": "部落回路 → 防护回路",
    "opposite": 49,
    "channel": "19-49 部落的通道",
    "keywords": [
      "需求",
      "敏感",
      "靠近",
      "资源",
      "情感"
    ],
    "summary": "对人类基本需求有极度敏感的感知，透过靠近来建立安全感与归属感",
    "color": "#8B6B6E"
  },
  {
    "id": 20,
    "name": "活在当下的存在力量",
    "nameEn": "The Now",
    "iching": "观 · 观察",
    "center": "喉轮中心",
    "circuit": "个体回路 → 觉知回路",
    "opposite": 34,
    "channel": "20-34 魅力通道 / 20-57 脑波通道 / 20-10 觉醒通道",
    "keywords": [
      "当下",
      "存在",
      "表达",
      "觉知",
      "冥想"
    ],
    "summary": "活在纯粹的当下，将内在觉知直接化为语言与行动的表达力量",
    "color": "#B8860B"
  },
  {
    "id": 21,
    "name": "掌控资源的意志力量",
    "nameEn": "Biting Through",
    "iching": "噬嗑 · 咬断",
    "center": "意志力中心",
    "circuit": "部落回路 → 意志力回路",
    "opposite": 45,
    "channel": "21-45 钱通道",
    "keywords": [
      "掌控",
      "意志力",
      "资源",
      "权力",
      "责任"
    ],
    "summary": "透过强大的意志力掌控资源与领地，是部落物质安全的守护者",
    "color": "#A0522D"
  },
  {
    "id": 22,
    "name": "恩典与情绪开放的力量",
    "nameEn": "Grace / Openness",
    "iching": "贲 · 文饰",
    "center": "情绪中心",
    "circuit": "个体回路 → 觉知回路",
    "opposite": 12,
    "channel": "12-22 敞开的通道",
    "keywords": [
      "恩典",
      "开放",
      "情绪",
      "聆听",
      "优雅"
    ],
    "summary": "以恩典与开放的姿态聆听他人，是情绪优雅表达的最高形式",
    "color": "#9B6B4A"
  },
  {
    "id": 23,
    "name": "从天才到疯子的表达艺术",
    "nameEn": "Splitting Apart",
    "iching": "剥 · 剥落",
    "center": "喉轮中心",
    "circuit": "个体回路 → 觉知回路",
    "opposite": 43,
    "channel": "43-23 构建的通道 / 20-23 合成的通道",
    "keywords": [
      "天才",
      "疯狂",
      "突变",
      "分裂",
      "独特"
    ],
    "summary": "将内在突变性的洞见转化为语言，游走在天才与疯子之间的表达力量",
    "color": "#B8860B"
  },
  {
    "id": 24,
    "name": "回归与合理化的心智力量",
    "nameEn": "Returning / Rationalizing",
    "iching": "复 · 回复",
    "center": "逻辑头脑",
    "circuit": "个体回路 → 觉知回路",
    "opposite": 61,
    "channel": "24-61 意识的通道",
    "keywords": [
      "回归",
      "合理化",
      "冥想",
      "洞见",
      "反思"
    ],
    "summary": "透过反复思考与回归来深化洞见，是将神秘突变转化为理性语言的过程",
    "color": "#8B7355"
  },
  {
    "id": 25,
    "name": "天真的宇宙之爱",
    "nameEn": "Innocence / Spirit of the Self",
    "iching": "无妄 · 无妄为",
    "center": "G中心",
    "circuit": "个体回路 → 觉知回路",
    "opposite": 51,
    "channel": "25-51 发起的通道",
    "keywords": [
      "天真",
      "宇宙之爱",
      "无条件",
      "精神",
      "疗愈"
    ],
    "summary": "是宇宙无条件之爱的承载者，以天真无邪的纯粹能量为世界带来疗愈",
    "color": "#C4956A"
  },
  {
    "id": 26,
    "name": "意志力的销售大师",
    "nameEn": "The Egoist",
    "iching": "大畜 · 大积累",
    "center": "意志力中心",
    "circuit": "部落回路 → 意志力回路",
    "opposite": 44,
    "channel": "26-44 投降的通道",
    "keywords": [
      "意志力",
      "销售",
      "说服",
      "夸张",
      "积累"
    ],
    "summary": "是天生的销售者与说服者，透过意志力与创意夸张推动部落资源流通",
    "color": "#A0522D"
  },
  {
    "id": 27,
    "name": "滋养与关怀的生命力量",
    "nameEn": "Nourishment",
    "iching": "颐 · 颐养",
    "center": "荐骨中心",
    "circuit": "部落回路 → 防护回路",
    "opposite": 50,
    "channel": "27-50 保存的通道",
    "keywords": [
      "滋养",
      "关怀",
      "照顾",
      "本能",
      "慷慨"
    ],
    "summary": "是滋养与照顾的本能力量，透过关怀他人来维持部落的生命与健康",
    "color": "#7B6B5A"
  },
  {
    "id": 28,
    "name": "冒险与生命意义的游戏玩家",
    "nameEn": "The Game Player",
    "iching": "大过 · 大的过渡",
    "center": "直觉中心",
    "circuit": "个体回路 → 觉知回路",
    "opposite": 38,
    "channel": "28-38 挣扎的通道",
    "keywords": [
      "冒险",
      "生命意义",
      "挣扎",
      "赌注",
      "游戏"
    ],
    "summary": "以生命为赌注寻找真正的意义，在挣扎与冒险中活出最深刻的存在感",
    "color": "#6B8E6E"
  },
  {
    "id": 29,
    "name": "对生命说是的承诺力量",
    "nameEn": "The Abysmal",
    "iching": "坎 · 深渊",
    "center": "荐骨中心",
    "circuit": "集体回路 → 感知回路",
    "opposite": 46,
    "channel": "29-46 发现的通道",
    "keywords": [
      "承诺",
      "坚持",
      "体验",
      "深渊",
      "是"
    ],
    "summary": "对生命体验全然说「是」，透过深度投入与承诺来累积智慧",
    "color": "#7B6B5A"
  },
  {
    "id": 30,
    "name": "命运之火的渴望力量",
    "nameEn": "The Clinging Fire",
    "iching": "离 · 火焰",
    "center": "情绪中心",
    "circuit": "集体回路 → 感知回路",
    "opposite": 41,
    "channel": "30-41 幻想家的通道",
    "keywords": [
      "渴望",
      "命运",
      "感受",
      "火焰",
      "体验"
    ],
    "summary": "是渴望的火焰与命运体验的驱动力，透过强烈的情绪感受来经历生命的深度",
    "color": "#9B6B4A"
  },
  {
    "id": 31,
    "name": "民主领导的影响力量",
    "nameEn": "The Gate of Influence",
    "iching": "咸 · 感应",
    "center": "喉轮中心",
    "circuit": "集体回路 → 理解回路",
    "opposite": 7,
    "channel": "7-31 意识领袖的通道",
    "keywords": [
      "影响力",
      "领导",
      "民主",
      "声音",
      "未来"
    ],
    "summary": "透过民主认可的领导力为集体发声，是逻辑未来的代言人",
    "color": "#B8860B"
  },
  {
    "id": 32,
    "name": "持续与延续的本能智慧",
    "nameEn": "Duration",
    "iching": "恒 · 恒久",
    "center": "直觉中心",
    "circuit": "部落回路 → 意志力回路",
    "opposite": 54,
    "channel": "32-54 蜕变的通道",
    "keywords": [
      "持续",
      "延续",
      "本能",
      "评估",
      "生存"
    ],
    "summary": "对什么能持续、什么会失败有本能的判断力，是部落延续的守护力量",
    "color": "#6B8E6E"
  },
  {
    "id": 33,
    "name": "退隐与记忆的智慧力量",
    "nameEn": "The Gate of Retreat",
    "iching": "遁 · 退隐",
    "center": "喉轮中心",
    "circuit": "集体回路 → 感知回路",
    "opposite": 13,
    "channel": "13-33 浪迹天涯者的通道",
    "keywords": [
      "退隐",
      "记忆",
      "历史",
      "休息",
      "沉淀"
    ],
    "summary": "透过退隐与沉淀来将过去的体验转化为智慧，是集体记忆的守护者",
    "color": "#B8860B"
  },
  {
    "id": 34,
    "name": "纯粹力量的独立展现",
    "nameEn": "The Power of the Great",
    "iching": "大壮 · 大力",
    "center": "荐骨中心",
    "circuit": "个体回路 → 觉知回路",
    "opposite": 20,
    "channel": "34-20 魅力通道 / 34-10 探索通道 / 34-57 力量通道",
    "keywords": [
      "力量",
      "独立",
      "忙碌",
      "本能",
      "行动"
    ],
    "summary": "纯粹而强大的生命力，透过忙碌的行动表达自我，是独立的本能力量",
    "color": "#7B6B5A"
  },
  {
    "id": 35,
    "name": "体验与改变的进展力量",
    "nameEn": "The Gate of Change",
    "iching": "晋 · 前进",
    "center": "喉轮中心",
    "circuit": "集体回路 → 感知回路",
    "opposite": 36,
    "channel": "35-36 不稳定性的通道",
    "keywords": [
      "改变",
      "体验",
      "进展",
      "多样",
      "故事"
    ],
    "summary": "渴望多样的人生体验与持续的变化，透过体验来丰富自己与集体的故事",
    "color": "#B8860B"
  },
  {
    "id": 36,
    "name": "危机中的成长力量",
    "nameEn": "The Darkening of the Light",
    "iching": "明夷 · 光明受损",
    "center": "情绪中心",
    "circuit": "集体回路 → 感知回路",
    "opposite": 35,
    "channel": "35-36 不稳定性的通道",
    "keywords": [
      "危机",
      "黑暗",
      "成长",
      "情绪",
      "体验"
    ],
    "summary": "在危机与黑暗中蜕变成长，透过极度的情绪体验来积累深刻的人生智慧",
    "color": "#9B6B4A"
  },
  {
    "id": 37,
    "name": "家庭与友谊的情感连结",
    "nameEn": "The Family / Friendship",
    "iching": "家人 · 家庭",
    "center": "情绪中心",
    "circuit": "部落回路 → 意志力回路",
    "opposite": 40,
    "channel": "37-40 社群的通道",
    "keywords": [
      "家庭",
      "友谊",
      "情感",
      "忠诚",
      "温暖"
    ],
    "summary": "是家庭连结与友谊忠诚的守护者，透过情感纽带维护部落的凝聚力",
    "color": "#9B6B4A"
  },
  {
    "id": 38,
    "name": "为生命意义而战的战士能量",
    "nameEn": "The Fighter",
    "iching": "睽 · 对立",
    "center": "根部中心",
    "circuit": "个体回路 → 觉知回路",
    "opposite": 28,
    "channel": "28-38 挣扎的通道",
    "keywords": [
      "战士",
      "意义",
      "斗争",
      "坚持",
      "对立"
    ],
    "summary": "为找到生命真正价值而战的勇士，在孤独的挣扎中守护独特的内在真理",
    "color": "#8B6B6E"
  },
  {
    "id": 39,
    "name": "挑衅者的精神探索",
    "nameEn": "The Provocateur",
    "iching": "蹇 · 险阻",
    "center": "根部中心",
    "circuit": "个体回路 → 觉知回路",
    "opposite": 55,
    "channel": "39-55 情绪的通道",
    "keywords": [
      "挑衅",
      "精神",
      "情绪",
      "探索",
      "刺激"
    ],
    "summary": "透过挑衅激活他人内在的精神能量，是唤醒灵魂深处情感的催化力量",
    "color": "#8B6B6E"
  },
  {
    "id": 40,
    "name": "独处与解脱的意志力量",
    "nameEn": "Deliverance",
    "iching": "解 · 解脱",
    "center": "意志力中心",
    "circuit": "部落回路 → 意志力回路",
    "opposite": 37,
    "channel": "37-40 社群的通道",
    "keywords": [
      "独处",
      "解脱",
      "意志力",
      "劳动",
      "休息"
    ],
    "summary": "透过独处来恢复意志力，是工作与休息之间的平衡守护者",
    "color": "#A0522D"
  },
  {
    "id": 41,
    "name": "收缩的力量与体验的起点",
    "nameEn": "The Gate of Decrease",
    "iching": "损 · 减损",
    "center": "根部中心",
    "circuit": "集体回路 → 感知回路",
    "opposite": 30,
    "channel": "30-41 幻想家的通道",
    "keywords": [
      "体验",
      "幻想",
      "收缩",
      "起点",
      "渴望"
    ],
    "summary": "是人类体验循环的起点，透过内在的渴望与幻想推动生命体验的展开",
    "color": "#8B6B6E"
  },
  {
    "id": 42,
    "name": "完成周期的成长力量",
    "nameEn": "The Gate of Increase",
    "iching": "益 · 增益",
    "center": "荐骨中心",
    "circuit": "集体回路 → 感知回路",
    "opposite": 53,
    "channel": "53-42 成熟的通道",
    "keywords": [
      "完成",
      "周期",
      "成长",
      "总结",
      "圆满"
    ],
    "summary": "是完成生命周期的力量，透过画上句号来沉淀智慧并迎接新的开始",
    "color": "#7B6B5A"
  },
  {
    "id": 43,
    "name": "突破与洞见的力量",
    "nameEn": "The Gate of Breakthrough",
    "iching": "夬 · 决断",
    "center": "逻辑头脑",
    "circuit": "个体回路 → 觉知回路",
    "opposite": 23,
    "channel": "43-23 构建的通道",
    "keywords": [
      "突破",
      "洞见",
      "内在知晓",
      "天才",
      "革新"
    ],
    "summary": "内在突破性洞见的源头，在被表达之前难以理解，是天才与内在知晓的力量",
    "color": "#8B7355"
  },
  {
    "id": 44,
    "name": "本能记忆的警觉力量",
    "nameEn": "Alertness",
    "iching": "姤 · 遇合",
    "center": "直觉中心",
    "circuit": "部落回路 → 意志力回路",
    "opposite": 26,
    "channel": "26-44 投降的通道",
    "keywords": [
      "本能",
      "记忆",
      "警觉",
      "过去",
      "模式"
    ],
    "summary": "透过本能的警觉感知过去的模式，是部落在合作关系中的天然雷达",
    "color": "#6B8E6E"
  },
  {
    "id": 45,
    "name": "聚集的统治力量",
    "nameEn": "The Gatherer",
    "iching": "萃 · 聚集",
    "center": "喉轮中心",
    "circuit": "部落回路 → 意志力回路",
    "opposite": 21,
    "channel": "21-45 钱通道",
    "keywords": [
      "统治",
      "聚集",
      "教育",
      "资源",
      "分配"
    ],
    "summary": "是部落的国王或女王，透过聚集与分配资源来统治并教育集体",
    "color": "#B8860B"
  },
  {
    "id": 46,
    "name": "机缘与身体之爱的力量",
    "nameEn": "Serendipity",
    "iching": "升 · 上升",
    "center": "G中心",
    "circuit": "集体回路 → 感知回路",
    "opposite": 29,
    "channel": "29-46 发现的通道",
    "keywords": [
      "机缘",
      "身体之爱",
      "运气",
      "存在",
      "喜悦"
    ],
    "summary": "对身体与物质存在充满喜悦，透过「对的时机」在正确的地方遇见美好",
    "color": "#C4956A"
  },
  {
    "id": 47,
    "name": "压抑与领悟的智慧力量",
    "nameEn": "The Gate of Realization",
    "iching": "困 · 困境",
    "center": "逻辑头脑",
    "circuit": "集体回路 → 感知回路",
    "opposite": 64,
    "channel": "47-64 抽象的通道",
    "keywords": [
      "压抑",
      "领悟",
      "回顾",
      "意义",
      "混乱"
    ],
    "summary": "在困境与压抑之后找到生命的意义，是回顾过去体验并领悟智慧的力量",
    "color": "#8B7355"
  },
  {
    "id": 48,
    "name": "井的深度与智慧",
    "nameEn": "The Well",
    "iching": "井 · 井水",
    "center": "直觉中心",
    "circuit": "集体回路 → 理解回路",
    "opposite": 16,
    "channel": "16-48 波长的通道",
    "keywords": [
      "深度",
      "智慧",
      "不足感",
      "技能",
      "资源"
    ],
    "summary": "是深不可测的智慧之井，对自身资源有天然的不足感，推动持续深化",
    "color": "#6B8E6E"
  },
  {
    "id": 49,
    "name": "原则与革命的力量",
    "nameEn": "The Gate of Revolution",
    "iching": "革 · 革命",
    "center": "情绪中心",
    "circuit": "部落回路 → 防护回路",
    "opposite": 19,
    "channel": "19-49 部落的通道",
    "keywords": [
      "革命",
      "原则",
      "拒绝",
      "改变",
      "正义"
    ],
    "summary": "基于原则来接受或拒绝，是部落关系中具有革命性变革力量的守护者",
    "color": "#9B6B4A"
  },
  {
    "id": 50,
    "name": "价值守护的责任力量",
    "nameEn": "The Cauldron",
    "iching": "鼎 · 鼎器",
    "center": "直觉中心",
    "circuit": "部落回路 → 防护回路",
    "opposite": 27,
    "channel": "27-50 保存的通道",
    "keywords": [
      "价值观",
      "责任",
      "法律",
      "守护",
      "传统"
    ],
    "summary": "守护部落的法律与价值观，是文明与道德传承的基石",
    "color": "#6B8E6E"
  },
  {
    "id": 51,
    "name": "震撼与发起的勇气力量",
    "nameEn": "The Arousing / Shock",
    "iching": "震 · 震动",
    "center": "意志力中心",
    "circuit": "个体回路 → 觉知回路",
    "opposite": 25,
    "channel": "25-51 发起的通道",
    "keywords": [
      "震撼",
      "勇气",
      "竞争",
      "发起",
      "中心"
    ],
    "summary": "透过震撼与挑战来测试自己与他人，是在竞争中找到勇气与中心的力量",
    "color": "#A0522D"
  },
  {
    "id": 52,
    "name": "静止的力量",
    "nameEn": "The Gate of Keeping Still",
    "iching": "艮 · 止",
    "center": "根部中心",
    "circuit": "集体回路 → 理解回路",
    "opposite": 9,
    "channel": "9-52 专注的通道",
    "keywords": [
      "静止",
      "专注",
      "安静",
      "沉思",
      "压力"
    ],
    "summary": "在静止中积蓄力量，是专注与冥想的源泉，透过内在的宁静来影响外在",
    "color": "#8B6B6E"
  },
  {
    "id": 53,
    "name": "开始新周期的发展力量",
    "nameEn": "The Gate of Beginnings",
    "iching": "渐 · 渐进",
    "center": "根部中心",
    "circuit": "集体回路 → 感知回路",
    "opposite": 42,
    "channel": "53-42 成熟的通道",
    "keywords": [
      "开始",
      "新周期",
      "发展",
      "压力",
      "渐进"
    ],
    "summary": "携带开展新循环的驱动压力，是人生各阶段新开始的能量引擎",
    "color": "#8B6B6E"
  },
  {
    "id": 54,
    "name": "野心与转化的驱动力量",
    "nameEn": "The Marrying Maiden",
    "iching": "归妹 · 归嫁",
    "center": "根部中心",
    "circuit": "部落回路 → 意志力回路",
    "opposite": 32,
    "channel": "32-54 蜕变的通道",
    "keywords": [
      "野心",
      "转化",
      "蜕变",
      "向上",
      "梦想"
    ],
    "summary": "是强烈的野心与向上蜕变的驱动力，在精神与物质两个层面推动自我超越",
    "color": "#8B6B6E"
  },
  {
    "id": 55,
    "name": "精神与丰盛的情绪力量",
    "nameEn": "The Gate of Spirit",
    "iching": "丰 · 丰盛",
    "center": "情绪中心",
    "circuit": "个体回路 → 觉知回路",
    "opposite": 39,
    "channel": "39-55 情绪的通道",
    "keywords": [
      "精神",
      "丰盛",
      "情绪波浪",
      "信念",
      "灵魂"
    ],
    "summary": "是精神丰盛与情绪信念的承载者，透过情绪波浪连结灵魂与物质世界",
    "color": "#9B6B4A"
  },
  {
    "id": 56,
    "name": "漫游者的说故事力量",
    "nameEn": "The Wanderer",
    "iching": "旅 · 旅行",
    "center": "喉轮中心",
    "circuit": "集体回路 → 感知回路",
    "opposite": 11,
    "channel": "11-56 好奇心的通道",
    "keywords": [
      "故事",
      "旅行",
      "好奇",
      "刺激",
      "启发"
    ],
    "summary": "透过说故事来刺激与启发他人，是将生命体验转化为智慧语言的旅行者",
    "color": "#B8860B"
  },
  {
    "id": 57,
    "name": "直觉清晰的力量",
    "nameEn": "The Gentle",
    "iching": "巽 · 风",
    "center": "直觉中心",
    "circuit": "个体回路 → 觉知回路",
    "opposite": 34,
    "channel": "57-34 力量通道 / 57-20 脑波通道 / 57-10 完美形式通道",
    "keywords": [
      "直觉",
      "清晰",
      "当下",
      "生存",
      "洞察"
    ],
    "summary": "最精准的当下直觉感知力，在瞬间辨别什么对生存有益或有害",
    "color": "#6B8E6E"
  },
  {
    "id": 58,
    "name": "喜悦的活力",
    "nameEn": "The Joyous",
    "iching": "兑 · 喜悦",
    "center": "根部中心",
    "circuit": "集体回路 → 理解回路",
    "opposite": 18,
    "channel": "18-58 判断的通道",
    "keywords": [
      "喜悦",
      "活力",
      "热爱",
      "完美",
      "生命力"
    ],
    "summary": "对生命充满喜悦与热爱，透过活力四射的能量推动事物走向完美",
    "color": "#8B6B6E"
  },
  {
    "id": 59,
    "name": "亲密与分散的力量",
    "nameEn": "Dispersion",
    "iching": "涣 · 涣散",
    "center": "荐骨中心",
    "circuit": "集体回路 → 感知回路",
    "opposite": 6,
    "channel": "6-59 亲密的通道",
    "keywords": [
      "亲密",
      "分散",
      "生育",
      "突破界限",
      "连结"
    ],
    "summary": "透过打破界限来建立深度亲密连结，是推动生命繁衍与基因传递的力量",
    "color": "#7B6B5A"
  },
  {
    "id": 60,
    "name": "接受限制的超越力量",
    "nameEn": "Limitation",
    "iching": "节 · 节制",
    "center": "根部中心",
    "circuit": "个体回路 → 觉知回路",
    "opposite": 3,
    "channel": "3-60 突变的通道",
    "keywords": [
      "限制",
      "超越",
      "接受",
      "突变",
      "保守"
    ],
    "summary": "透过接受限制来积蓄突变的能量，是在边界中找到创新突破的智慧",
    "color": "#8B6B6E"
  },
  {
    "id": 61,
    "name": "内在真理的神秘力量",
    "nameEn": "Inner Truth",
    "iching": "中孚 · 内在信实",
    "center": "逻辑头脑",
    "circuit": "个体回路 → 觉知回路",
    "opposite": 24,
    "channel": "24-61 意识的通道",
    "keywords": [
      "内在真理",
      "神秘",
      "灵感",
      "宇宙",
      "知晓"
    ],
    "summary": "接收宇宙神秘真理的天线，透过内在知晓为世界带来无法言喻的洞见",
    "color": "#8B7355"
  },
  {
    "id": 62,
    "name": "细节的准备力量",
    "nameEn": "The Preponderance of the Small",
    "iching": "小过 · 小事谨慎",
    "center": "喉轮中心",
    "circuit": "集体回路 → 理解回路",
    "opposite": 17,
    "channel": "17-62 接受的通道",
    "keywords": [
      "细节",
      "准备",
      "谨慎",
      "事实",
      "逻辑"
    ],
    "summary": "透过对细节的精准处理来将逻辑模式转化为可操作的事实与语言",
    "color": "#B8860B"
  },
  {
    "id": 63,
    "name": "怀疑与好奇的智慧力量",
    "nameEn": "Doubt",
    "iching": "既济 · 已成",
    "center": "逻辑头脑",
    "circuit": "集体回路 → 理解回路",
    "opposite": 4,
    "channel": "4-63 逻辑的通道",
    "keywords": [
      "怀疑",
      "好奇",
      "逻辑",
      "质疑",
      "已完成"
    ],
    "summary": "透过理性怀疑来驱动逻辑思考，是已完成的模式中寻找改善空间的力量",
    "color": "#8B7355"
  },
  {
    "id": 64,
    "name": "困惑中的灵感之源",
    "nameEn": "Before Completion",
    "iching": "未济 · 未完成",
    "center": "逻辑头脑",
    "circuit": "集体回路 → 感知回路",
    "opposite": 47,
    "channel": "47-64 抽象的通道",
    "keywords": [
      "困惑",
      "灵感",
      "压力",
      "未完成",
      "可能性"
    ],
    "summary": "在困惑与压力中接收无限的可能性与灵感，是尚未成形的潜力场域",
    "color": "#8B7355"
  }
];

// 回路分类
const CIRCUITS = {
  "个体回路": { color: "#C4956A", bgColor: "#FDF5EB", label: "个体回路" },
  "集体回路": { color: "#5B8DB8", bgColor: "#EBF3FB", label: "集体回路" },
  "部落回路": { color: "#7BAF7B", bgColor: "#EBF5EB", label: "部落回路" }
};

// 中心分类
const CENTERS = [
  "G中心", "喉轮中心", "逻辑头脑", "情绪中心", "荐骨中心",
  "根部中心", "直觉中心", "意志力中心"
];

if (typeof module !== 'undefined') module.exports = { GATES_DATA, CIRCUITS, CENTERS };
