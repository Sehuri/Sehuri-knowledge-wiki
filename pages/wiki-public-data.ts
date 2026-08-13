// Generated public summary data. Do not edit manually.
export const publicWikiData = {
  "updatedAt": "2026-08-13T13:59:25+08:00",
  "items": [
    {
      "id": "42b243694975",
      "title": "Harness 是什么？它和 Agent 有什么不同？",
      "platform": "wechat-article",
      "content_type": "article",
      "source_url": "https://mp.weixin.qq.com/s/--fIFuoUGjYnoBAQNUgjVw",
      "author": "Sophia",
      "published_at": "",
      "captured_at": "2026-08-13T13:59:25+08:00",
      "completeness": "full",
      "topics": [
        "Agent",
        "上下文工程",
        "AI系统设计",
        "知识工程",
        "自我改进"
      ],
      "people": [
        "Sophia",
        "Lilian Weng"
      ],
      "concepts": [
        "Harness",
        "Loop Engineering",
        "文件系统记忆",
        "子智能体",
        "ACE",
        "MCE",
        "Skill",
        "ADAS",
        "AFlow",
        "RSI"
      ],
      "summary": "文章把 Harness 理解为围绕基础模型搭建、用代码规定 AI 如何规划、调用工具、管理上下文与记忆、评估结果和失败重试的执行系统。相较于通常由规划、记忆、工具和执行构成的 Agent，作者认为 Harness 更强调持续到目标达成的闭环、以文件系统承载长期状态、对子智能体和后台任务的显式管理，以及依据反馈改进系统的能力。文章进一步区分两类局部优化：ACE、MCE 面向上下文与 Skill 的动态演化，ADAS、AFlow 面向工作流搜索；只有当 AI 能直接修改并评估 Harness 自身的代码逻辑时，才进入作者所说的递归式自我改进。",
      "keyPoints": [
        "Harness 是包围基础模型的代码系统，负责规定任务规划、工具调用、上下文与记忆管理、结果评估和错误重试方式。（第一节：什么是 Harness）",
        "文章用循环工程、文件系统持久记忆和自我改善系统三层能力区分 Harness 与一般 Agent，但这一边界属于作者采用的解释框架，并非唯一行业定义。（Harness 与 Agent 的区别）",
        "闭环工作流按照计划、执行、观察或测试、改进、再次执行循环，直到目标达成或终止条件触发。（模式一：工作流自动化）",
        "长周期任务不应把日志、代码差异、错误轨迹和历史记录全部塞进 Prompt；写入文件系统可以突破上下文容量限制并支持中断恢复。（模式二：文件系统作为持久记忆）",
        "复杂任务可以交给多个子智能体并行探索，主智能体通过可检查的进程管理器启动、观察、取消任务并合并结果，同时把状态持久化。（模式三：子智能体与后台任务）",
        "ACE 用生成器、反思器和策展器分离执行、经验提取与知识合并，并通过增量更新及 Grow-and-Refine 管理动态上下文。（Harness 的上下文优化：ACE）",
        "MCE 将上下文内容与管理机制分离，用 Skill 封装静态资料和动态搜索、筛选、格式化操作，并以双层循环共同优化 Skill 与上下文。（Harness 的上下文优化：MCE）",
        "ADAS 把智能体设计视为代码生成和评估问题，AFlow 则把工作流表示为图并用蒙特卡洛树搜索迭代优化。（Harness 的工作流优化）",
        "上下文优化和工作流优化都只改变 Harness 的局部；作者认为真正的 RSI 需要 AI 直接修改、测试和选择 Harness 程序自身的代码。（两个方向的共同主线）"
      ],
      "structure": "",
      "thoughts": "",
      "related": [
        "一文带你掌握 LLM、Token、Context、Prompt、RAG、MCP、Skill、Agent 等 AI 核心概念",
        "腾讯WorkBuddy火了，字节和阿里急了",
        "用AI辅助写出高质量PRD的正确打开方式",
        "Kimi K3 开放模型权重与技术报告"
      ],
      "extractionNotes": ""
    },
    {
      "id": "9422d67248c7",
      "title": "腾讯WorkBuddy火了，字节和阿里急了",
      "platform": "wechat-article",
      "content_type": "article",
      "source_url": "https://mp.weixin.qq.com/s/gaVBTxXuytOrTPD8VnvDtw",
      "author": "IC实验室",
      "published_at": "",
      "captured_at": "2026-08-12T16:09:53+08:00",
      "completeness": "full",
      "topics": [
        "企业AI",
        "Agent",
        "办公智能体",
        "AI商业化",
        "互联网大厂"
      ],
      "people": [
        "IC实验室"
      ],
      "concepts": [
        "WorkBuddy",
        "Chat",
        "Agent",
        "上下文",
        "工具调用",
        "生产力工具",
        "多模型",
        "组织能力",
        "Obsidian"
      ],
      "summary": "文章认为 AI 产品正在从以对话和答案为中心的 Chat 阶段，进入以任务执行和结果交付为中心的 Agent 阶段。Chat 产品切换成本低、算力成本高且价值难量化；Agent 则能围绕目标读取上下文、制定计划、调用工具并交付产物，使用户购买的从“回答”变成可计算的生产力。办公 Agent 的竞争因此不再只是模型能力竞赛，而是模型、工具、数据、权限、协作生态和组织整合能力的综合较量。WorkBuddy 的阶段性领先被归因于腾讯较早把编程 Agent 架构迁移到办公场景、支持多模型，并能利用微信、企微、文档和知识库生态；字节与阿里则通过整合飞书、豆包、钉钉、云和模型资源应战。",
      "keyPoints": [
        "Chat 阶段的基本交互是用户提问、模型回答；即使答案更准确，真正订票、整理文件、制作报告等执行工作仍由用户完成。（第01节：Chat 阶段）",
        "作者用“是否能理解目标、制定计划、调用工具并最终交付结果”作为判断产品是否属于 Agent 的简化标准。（第02节：Agent 的判断标准）",
        "Agent 改变了人机分工：从“AI 给建议、人执行”变为“人确定目标、AI 执行、人验收”，但错误理解、接口失败和关键判断仍需要人工介入。（第02节：人机分工）",
        "Chat 产品的答案价值难计算、用户切换成本低且调用持续消耗算力；Agent 能交付可衡量结果，因此更容易形成个人和企业付费。（第01—02节：商业化差异）",
        "编程 Agent 最早验证商业价值，因为任务结果更容易判断；其“文件夹—工作区—产物”的界面与工作流随后成为办公 Agent 的参考范式。（第02节：编程 Agent）",
        "大量办公任务包含重复、标准化步骤；当模型达到基本能力线后，能否找到资料、操作软件、接入企业流程并交付产物，比单纯模型排名更重要。（第02节：办公任务）",
        "WorkBuddy 从腾讯云开发的代码助手架构转向办公场景，并采用多模型形态；作者认为其优势更多来自产品身体和腾讯生态，而非只依赖混元模型。（第03节：WorkBuddy）",
        "Agent 时代的竞争基本单位从单一模型变为模型、工具、数据、权限和交付链路，因而也是大厂组织协同与生态整合能力的竞争。（第04节：大厂竞争）",
        "面向个人实践，文章建议先实际使用一种办公 Agent，把可复用成果沉淀到 Obsidian 等知识库，并直接让 AI 根据自己的工作目标规划学习与使用方式。（第05节：三个建议）"
      ],
      "structure": "",
      "thoughts": "",
      "related": [
        "一文带你掌握 LLM、Token、Context、Prompt、RAG、MCP、Skill、Agent 等 AI 核心概念",
        "用AI辅助写出高质量PRD的正确打开方式",
        "Kimi K3 开放模型权重与技术报告",
        "GPT-5.6来了，而许多人还停留在石器时代"
      ],
      "extractionNotes": ""
    },
    {
      "id": "3ffe65024eaf",
      "title": "用AI辅助写出高质量PRD的正确打开方式",
      "platform": "wechat-article",
      "content_type": "article",
      "source_url": "https://mp.weixin.qq.com/s/Js6EKbzzBuY0v7oednRxNg",
      "author": "人人都是产品经理",
      "published_at": "",
      "captured_at": "2026-08-12T16:04:09+08:00",
      "completeness": "full",
      "topics": [
        "产品管理",
        "需求管理",
        "AI产品经理",
        "Agent",
        "AI项目交付"
      ],
      "people": [],
      "concepts": [
        "PRD",
        "产品定型",
        "JTBD",
        "Skill",
        "Agent",
        "模块化写作",
        "Shaped Brief",
        "人机协作"
      ],
      "summary": "文章提出一套由 Agent 和两个 Skills 辅助完成高质量 PRD 的两阶段流程：先通过多轮提问，把零散想法拆成产品定型、JTBD、范围、页面流程、待确认问题和最终 brief；再依据产品类型规划 PRD 模块，按模块逐段生成、记录追加日志并由产品经理持续审阅。核心原则是围绕大模型注意力与长输出限制采用小步、聚焦、可反馈的协作方式；AI 可以替代大量动笔工作，但不能替代产品经理对需求、范围和质量的判断。成熟经验应封装为 Skill 和模板，使 Agent 能稳定复用方法论。",
      "keyPoints": [
        "高质量 PRD 的前提不是直接生成长文，而是先完成产品定型，让产品经理对用户任务、范围、页面流程和未决问题形成可描述、可评审的清晰认识。（先完成需求定型）",
        "定型阶段将信息拆分为基础产品描述、JTBD、范围、页面与流程、开放问题和最终 brief，并通过约 3—5 轮补充与修订逐步收敛。（需求定型工作空间）",
        "把任务拆成多个文档和单一模块，是为了适应大模型长输出容易退化、注意力有限的特性，让每次工作保持聚焦。（为何拆成不同文档）",
        "产品定型稿不仅为 PRD 奠定基础，也比超长 PRD 更适合直接交给 Codex、Cursor 等开发 Agent 作为实现上下文。（把定型文档直接丢给 Codex）",
        "PRD 阶段应先选择模块计划，再强制按模块写作并更新追加日志，以形成生成、审阅、确认、继续生成的循环。（第二阶段：写 PRD）",
        "产品经理可以少动笔，但必须逐段审阅、补充信息和作出判断；可随时反馈的 Agent 是协作工具，而不是自主替代产品经理。（总结一下核心）",
        "AI 无法弥补产品经理缺失的 PRD 基本功；已有的产品经验、判断标准和模板可以封装成 Skills，让 Agent 稳定复用。（Skill 与模板）",
        "作者案例用两个 Skills 和 Agent 在不到一小时内形成约 1.7 万字 PRD，但更重要的产出是结构化的需求判断与持续参与过程，而非字数本身。（案例结果）"
      ],
      "structure": "",
      "thoughts": "",
      "related": [
        "销售签单，客户提需求，实施开始干：狗屁不通",
        "一文带你掌握 LLM、Token、Context、Prompt、RAG、MCP、Skill、Agent 等 AI 核心概念"
      ],
      "extractionNotes": ""
    },
    {
      "id": "ff9f599bcc4a",
      "title": "一文带你掌握 LLM、Token、Context、Prompt、RAG、MCP、Skill、Agent 等 AI 核心概念",
      "platform": "wechat-article",
      "content_type": "article",
      "source_url": "https://mp.weixin.qq.com/s/mrlUwWk158urYwE4mlETyw",
      "author": "Shepherd",
      "published_at": "",
      "captured_at": "2026-07-30T17:40:23+08:00",
      "completeness": "full",
      "topics": [
        "企业AI",
        "AI基础概念",
        "Agent",
        "知识工程"
      ],
      "people": [
        "Shepherd"
      ],
      "concepts": [
        "LLM",
        "Token",
        "Context",
        "Prompt",
        "RAG",
        "MCP",
        "Skill",
        "Agent",
        "ReAct"
      ],
      "summary": "文章用一条由底层模型到执行系统的链路，系统解释现代 AI 应用的八个核心概念：LLM 是概率预测与推理引擎，Token 决定计算、成本和容量，Context 是动态组装的临时工作区，Prompt 负责表达任务与约束，RAG 补充外部知识，MCP 标准化工具接入，Skill 沉淀稳定流程，Agent 则把规划、记忆和工具组织成多步执行闭环。作者强调，真实 AI 应用的关键不是单独追求最强模型，而是理解每一层的边界，并把模型、知识、工具和流程组合成可控、可追踪的协同系统。",
      "keyPoints": [
        "LLM 本质上通过连续预测下一个 Token 生成内容，在系统中承担理解、规划、归纳和生成，但不天然具备实时知识、外部访问或执行动作的能力。（第2节：LLM）",
        "Token 不只是分词细节，还直接影响模型调用成本、处理延迟和上下文容量；Prompt、历史消息和检索文档都需要围绕 Token 预算进行管理。（第3节：Token）",
        "Context 是每次请求动态组装的临时工作区，应围绕当前任务选择系统规则、历史、检索结果和工具结果，而不是无差别塞入全部信息。（第4节：Context）",
        "Prompt 是任务说明书，通常包含角色、任务、上下文、输出格式、约束和可选示例；它能提高可控性，但不能替代知识补充、结果校验和工具执行。（第5节：Prompt）",
        "RAG 通过“先检索、再生成”让模型使用最新或私有资料，但最终质量取决于文档质量、切片策略、召回准确性和上下文预算。（第6节：RAG）",
        "MCP 解决 AI 客户端与外部工具之间的标准化连接问题，把 M×N 的定制集成降低为 M+N；它改善的是基础设施复用，不会直接提高模型智力。（第7节：MCP）",
        "Skill 是 SOP、模板、脚本和参考资料的可复用能力包，适合沉淀相对稳定的流程；变化频繁的知识更适合由 RAG 管理。（第8节：Skill）",
        "Agent 将 LLM、规划、记忆和工具组成执行闭环，通过思考、行动、观察和修正持续推进目标；真实工程中需要步数限制、成本控制、权限隔离和人工审核点。（第9节：Agent）",
        "在完整应用中，Prompt 表达目标，Context 承载任务状态，LLM 规划，RAG 补知识，MCP 接工具，Skill 提供稳定规范，Agent 负责多步推进和交付。（第10节：协同）"
      ],
      "structure": "",
      "thoughts": "",
      "related": [
        "Kimi K3 开放模型权重与技术报告",
        "销售签单，客户提需求，实施开始干：狗屁不通",
        "GPT-5.6来了，而许多人还停留在石器时代"
      ],
      "extractionNotes": ""
    },
    {
      "id": "09986f306f14",
      "title": "Kimi K3 开放模型权重与技术报告",
      "platform": "x",
      "content_type": "post",
      "source_url": "https://x.com/Kimi_Moonshot/status/2081760186235289764",
      "author": "Kimi.ai（@Kimi_Moonshot）",
      "published_at": "2026-07-27T15:14:40Z",
      "captured_at": "2026-07-29T15:20:14+08:00",
      "completeness": "full",
      "topics": [
        "企业AI",
        "AI模型",
        "开源模型",
        "Agent"
      ],
      "people": [
        "Moonshot AI"
      ],
      "concepts": [
        "Kimi K3",
        "MoE",
        "原生多模态",
        "长上下文",
        "开放权重",
        "推理基础设施"
      ],
      "summary": "Moonshot AI 宣布开放 Kimi K3 的模型权重与技术报告。Kimi K3 是一个具备原生视觉理解和 100 万 token 上下文窗口的 2.8T 参数 MoE 模型；新架构强调单位计算量的智能扩展效率，而不只是增加参数。此次开放还覆盖高性能注意力内核、MoE 通信库以及大规模运行 Agent 环境的基础设施，体现出从单一模型权重向完整开放技术栈扩展的发布策略。",
      "keyPoints": [
        "Moonshot AI 正式发布 Kimi K3 的模型权重与技术报告。（原帖第1段）",
        "Kimi K3 被定位为 Moonshot AI 当时能力最强的模型，采用 2.8T 参数 MoE 架构。（原帖第2段）",
        "模型原生支持视觉理解，并提供 100 万 token 的上下文窗口。（原帖第2段）",
        "新架构主张单位计算量可获得约 2.5 倍的智能扩展效率，重点不是单纯堆叠参数。（原帖第3段）",
        "除模型权重外，Moonshot AI 还开放高性能注意力内核、MoE 通信库和用于大规模 Agent 环境的基础设施。（原帖第4段）",
        "帖子同时提供模型权重、完整技术报告和技术博客入口，便于研究、部署与二次开发。（原帖链接列表）"
      ],
      "structure": "",
      "thoughts": "",
      "related": [
        "GPT-5.6来了，而许多人还停留在石器时代",
        "销售签单，客户提需求，实施开始干：狗屁不通"
      ],
      "extractionNotes": ""
    },
    {
      "id": "31a1ebac68b2",
      "title": "GPT-5.6来了，而许多人还停留在石器时代",
      "platform": "wechat-article",
      "content_type": "article",
      "source_url": "https://mp.weixin.qq.com/s/lf59-dvqgG6MhTLNKRWBcw",
      "author": "JackShrINe",
      "published_at": "2026-07-16T15:08:00+08:00",
      "captured_at": "2026-07-29T11:59:36+08:00",
      "completeness": "partial",
      "topics": [
        "企业AI",
        "AI工具",
        "GPT-5.6",
        "AI采用"
      ],
      "people": [
        "JackShrINe"
      ],
      "concepts": [
        "AI替代焦虑",
        "工具实践",
        "技术泡沫",
        "能力边界"
      ],
      "summary": "文章开篇批评围绕 AI 的两类空转争论：尚未真正使用的人先陷入被替代焦虑，投资者则只讨论泡沫和估值。作者认为，更有价值的做法是先把 GPT-5.6 当作工具投入真实工作，通过反复使用逐步理解其能力，而不是在缺少实践的情况下急于下结论。",
      "keyPoints": [
        "关于 AI 的讨论常被两种声音主导：缺少实际使用经验者担忧被取代，投资者关注估值、风险和泡沫。（首屏第1段）",
        "无论是对未来的恐惧还是投资测算，如果不先追问工具现在能做什么，讨论就容易脱离实际能力。（首屏第1段）",
        "作者观察到，真正把 GPT-5.6 当作工具、在工作中反复使用并逐渐摸清其能力的人，反而较少参与抽象争论。（首屏第2段）",
        "作者用站在蒸汽机旁只争论是否爆炸、是否值得投资作类比，强调应先理解技术如何运转。（首屏第3段）"
      ],
      "structure": "",
      "thoughts": "",
      "related": [
        "销售签单，客户提需求，实施开始干：狗屁不通"
      ],
      "extractionNotes": ""
    },
    {
      "id": "1fb561229eea",
      "title": "云南旅游攻略（大理+丽江）",
      "platform": "xiaohongshu",
      "content_type": "post",
      "source_url": "https://www.xiaohongshu.com/explore/68371f2a000000002300d5e9",
      "author": "草莓啵啵🍓",
      "published_at": "2025-05-28",
      "captured_at": "2026-07-29T11:35:33+08:00",
      "completeness": "partial",
      "topics": [
        "云南旅游",
        "大理",
        "丽江",
        "洱海",
        "玉龙雪山",
        "旅行攻略"
      ],
      "people": [
        "草莓啵啵🍓"
      ],
      "concepts": [
        "环洱海骑行",
        "古镇旅行",
        "旅行摄影",
        "行程规划"
      ],
      "summary": "一份以大理、丽江为核心的七日云南行程复盘：实际游玩约五天，覆盖洱海沿线古镇与拍照点、丽江古城周边村落和玉龙雪山，并以亲历感受标注了值得停留、可跳过、交通方式、拍照安全和时间预算。",
      "keyPoints": [
        "行程从昆明中转到大理，再乘火车前往丽江；整体按七天安排，但真正游玩时间约五天。",
        "大理第一天走双廊古镇与文笔村：双廊商业化较强，文笔村更适合看海、逛咖啡店和等待日落；作者建议文笔村距离较远时采用驾车方式。",
        "大理第二天包车游喜洲古镇、S湾和苍洱大道。作者更偏爱喜洲；S湾海景不错但租车较多；苍洱大道适合俯瞰洱海，但不属于必去点，且不应冒险在道路中央拍照。",
        "丽江安排古城、束河古镇和纳西部落。藏服妆造约70元；纳西部落适合拍雪山、草地、羊群与经幡，爱拍照者可能停留三小时以上。",
        "玉湖村半天通常足够，可与白沙古镇组合；作者记录的骑马加观光车票价为168元。另留一整天给玉龙雪山。",
        "时间与费用均来自作者2025年5月的个人经历，出行前应再次核验天气、门票、交通、日落时间和活动安排。"
      ],
      "structure": "",
      "thoughts": "",
      "related": [],
      "extractionNotes": ""
    },
    {
      "id": "7af5b45d7223",
      "title": "销售签单，客户提需求，实施开始干：狗屁不通",
      "platform": "wechat-article",
      "content_type": "article",
      "source_url": "https://mp.weixin.qq.com/s/24oV9Rb9-30mu_aOAxg6TQ",
      "author": "JackShrINe",
      "published_at": "",
      "captured_at": "2026-07-29T10:56:55+08:00",
      "completeness": "full",
      "topics": [
        "企业AI",
        "产品管理",
        "需求管理",
        "AI项目交付",
        "知识工程"
      ],
      "people": [
        "JackShrINe"
      ],
      "concepts": [
        "产品发现",
        "MVP",
        "RAG",
        "Workflow",
        "知识治理",
        "验收指标",
        "产品化"
      ],
      "summary": "文章批评企业 AI 项目中“销售签单—客户提要求—实施直接开工”的线性流程：客户表达的通常只是业务愿望，销售为成交扩大承诺，实施最了解技术和数据约束却缺少决策权；当产品经理和产品判断缺席，模糊需求、混乱知识、错误技术选型及缺失的验收标准会在后期转化为返工、延期和不可复制的定制项目。作者主张在开工前完成问题验证、任务拆分、技术边界判断、MVP 定义、知识治理和验收设计，并以真实业务价值和持续维护成本判断 AI 产品是否成立。",
      "keyPoints": [
        "客户提出的是业务问题和初步设想，不是已经验证的产品需求；需求必须明确用户、场景、当前做法、痛点、目标任务及错误代价。（第二节：客户说出的，通常不是需求）",
        "销售签单不等于产品已经被定义。对数据、流程、接口、技术边界和风险未经评估的承诺，会把不确定性和返工成本转移给实施团队。（第三节：销售签了单，不等于产品已经被定义）",
        "实施人员最早接触真实数据和流程问题，却经常没有拒绝或重新定义需求的权力；组织让其承担产品失败责任，却不给产品决策权和验证时间。（第四节：实施人员最接近真相，却最没有权力改变真相）",
        "产品经理的核心职责不是传话和画原型，而是怀疑、拆解、转化、排序与拒绝需求，定义能力边界、MVP、成功标准及回滚条件。（第五节：产品经理缺席之后，所有人都在越权）",
        "技术选择应由问题性质决定：变化且需引用的知识可考虑 RAG，固定状态流程用 Workflow，真实业务数据调用 API，高确定性和高错误代价的判断优先规则与代码。（第六节：不是所有问题，都值得用 AI 解决）",
        "把全部文档直接向量化不会自动形成知识库；知识工程必须处理权威来源、版本冲突、术语、权限、适用范围、更新责任和验证机制。（第七节：把所有文档都放进去，只是把混乱数字化）",
        "上线和 Demo 不能证明产品成功。需要用测试集、灰度指标、问题解决率、流程完成率、维护成本及错误来源持续验证业务价值。（第八节：上线不是成功，只是第一次接受审判）",
        "产品化要求把单个客户问题抽象成可配置、可复用和可持续维护的通用能力；如果每个客户都要重新开发，公司销售的仍是人力项目。（第九节：从项目到产品，中间隔着拒绝和抽象）"
      ],
      "structure": "",
      "thoughts": "",
      "related": [],
      "extractionNotes": ""
    }
  ],
  "facets": {
    "topics": [
      {
        "name": "企业AI",
        "count": 5
      },
      {
        "name": "Agent",
        "count": 5
      },
      {
        "name": "知识工程",
        "count": 3
      },
      {
        "name": "产品管理",
        "count": 2
      },
      {
        "name": "需求管理",
        "count": 2
      },
      {
        "name": "AI项目交付",
        "count": 2
      },
      {
        "name": "办公智能体",
        "count": 1
      },
      {
        "name": "大理",
        "count": 1
      },
      {
        "name": "洱海",
        "count": 1
      },
      {
        "name": "互联网大厂",
        "count": 1
      },
      {
        "name": "开源模型",
        "count": 1
      },
      {
        "name": "丽江",
        "count": 1
      },
      {
        "name": "旅行攻略",
        "count": 1
      },
      {
        "name": "上下文工程",
        "count": 1
      },
      {
        "name": "玉龙雪山",
        "count": 1
      },
      {
        "name": "云南旅游",
        "count": 1
      },
      {
        "name": "自我改进",
        "count": 1
      },
      {
        "name": "AI采用",
        "count": 1
      },
      {
        "name": "AI产品经理",
        "count": 1
      },
      {
        "name": "AI工具",
        "count": 1
      },
      {
        "name": "AI基础概念",
        "count": 1
      },
      {
        "name": "AI模型",
        "count": 1
      },
      {
        "name": "AI商业化",
        "count": 1
      },
      {
        "name": "AI系统设计",
        "count": 1
      },
      {
        "name": "GPT-5.6",
        "count": 1
      }
    ],
    "people": [
      {
        "name": "JackShrINe",
        "count": 2
      },
      {
        "name": "草莓啵啵🍓",
        "count": 1
      },
      {
        "name": "IC实验室",
        "count": 1
      },
      {
        "name": "Lilian Weng",
        "count": 1
      },
      {
        "name": "Moonshot AI",
        "count": 1
      },
      {
        "name": "Shepherd",
        "count": 1
      },
      {
        "name": "Sophia",
        "count": 1
      }
    ],
    "concepts": [
      {
        "name": "Agent",
        "count": 3
      },
      {
        "name": "Skill",
        "count": 3
      },
      {
        "name": "RAG",
        "count": 2
      },
      {
        "name": "产品定型",
        "count": 1
      },
      {
        "name": "产品发现",
        "count": 1
      },
      {
        "name": "产品化",
        "count": 1
      },
      {
        "name": "多模型",
        "count": 1
      },
      {
        "name": "工具调用",
        "count": 1
      },
      {
        "name": "工具实践",
        "count": 1
      },
      {
        "name": "古镇旅行",
        "count": 1
      },
      {
        "name": "环洱海骑行",
        "count": 1
      },
      {
        "name": "技术泡沫",
        "count": 1
      },
      {
        "name": "开放权重",
        "count": 1
      },
      {
        "name": "旅行摄影",
        "count": 1
      },
      {
        "name": "模块化写作",
        "count": 1
      },
      {
        "name": "能力边界",
        "count": 1
      },
      {
        "name": "人机协作",
        "count": 1
      },
      {
        "name": "上下文",
        "count": 1
      },
      {
        "name": "生产力工具",
        "count": 1
      },
      {
        "name": "推理基础设施",
        "count": 1
      },
      {
        "name": "文件系统记忆",
        "count": 1
      },
      {
        "name": "行程规划",
        "count": 1
      },
      {
        "name": "验收指标",
        "count": 1
      },
      {
        "name": "原生多模态",
        "count": 1
      },
      {
        "name": "长上下文",
        "count": 1
      },
      {
        "name": "知识治理",
        "count": 1
      },
      {
        "name": "子智能体",
        "count": 1
      },
      {
        "name": "组织能力",
        "count": 1
      },
      {
        "name": "ACE",
        "count": 1
      },
      {
        "name": "ADAS",
        "count": 1
      },
      {
        "name": "AFlow",
        "count": 1
      },
      {
        "name": "AI替代焦虑",
        "count": 1
      },
      {
        "name": "Chat",
        "count": 1
      },
      {
        "name": "Context",
        "count": 1
      },
      {
        "name": "Harness",
        "count": 1
      },
      {
        "name": "JTBD",
        "count": 1
      },
      {
        "name": "Kimi K3",
        "count": 1
      },
      {
        "name": "LLM",
        "count": 1
      },
      {
        "name": "Loop Engineering",
        "count": 1
      },
      {
        "name": "MCE",
        "count": 1
      },
      {
        "name": "MCP",
        "count": 1
      },
      {
        "name": "MoE",
        "count": 1
      },
      {
        "name": "MVP",
        "count": 1
      },
      {
        "name": "Obsidian",
        "count": 1
      },
      {
        "name": "PRD",
        "count": 1
      },
      {
        "name": "Prompt",
        "count": 1
      },
      {
        "name": "ReAct",
        "count": 1
      },
      {
        "name": "RSI",
        "count": 1
      },
      {
        "name": "Shaped Brief",
        "count": 1
      },
      {
        "name": "Token",
        "count": 1
      },
      {
        "name": "WorkBuddy",
        "count": 1
      },
      {
        "name": "Workflow",
        "count": 1
      }
    ],
    "platforms": [
      {
        "name": "wechat-article",
        "count": 6
      },
      {
        "name": "x",
        "count": 1
      },
      {
        "name": "xiaohongshu",
        "count": 1
      }
    ]
  }
} as const;
