// Generated from product-manager/_meta/index.json. Do not edit manually.
export const productManagerWikiData = {
  "version": 1,
  "updated_at": "2026-09-20T00:00:00+08:00",
  "collections": [
    {
      "id": "product",
      "name": "产品方法",
      "description": "需求、策略、指标、方案与交付。"
    },
    {
      "id": "technology",
      "name": "技术通识",
      "description": "理解系统边界，提出更准确的问题。"
    },
    {
      "id": "market",
      "name": "市场与商业",
      "description": "市场判断、竞品、增长与商业模型。"
    },
    {
      "id": "thinking",
      "name": "实践与思考",
      "description": "工作现场的判断、复盘与方法沉淀。"
    }
  ],
  "technical_domains": [
    {
      "id": "frontend",
      "name": "前端知识",
      "description": "浏览器里的页面、交互、状态与体验。"
    },
    {
      "id": "backend",
      "name": "后端知识",
      "description": "请求入口、接口治理、业务与数据。"
    }
  ],
  "ingestion": {
    "link": "发送公众号或其他公开链接：提取正文后保留来源、完整度与关键观点，再关联到对应主题。",
    "thought": "发送技术、市场或产品相关的知识与思考：原意单独保存，AI 只负责结构化、补充标签与建立关联。"
  },
  "journey": [
    {
      "label": "浏览器 / 前端",
      "note": "呈现页面、响应操作并发起请求"
    },
    {
      "label": "Nginx",
      "note": "承接入口流量、TLS 与负载分配"
    },
    {
      "label": "Gateway",
      "note": "认证、路由、限流与接口治理"
    },
    {
      "label": "业务服务",
      "note": "执行业务规则与流程"
    },
    {
      "label": "数据库 / Redis",
      "note": "持久事实与高频临时数据"
    }
  ],
  "items": [
    {
      "id": "pm-tech-frontend-basics",
      "title": "前端：页面、交互与用户可见的状态",
      "short_title": "前端基础",
      "collection": "technology",
      "technical_domain": "frontend",
      "level": "基础",
      "updated_at": "2026-09-20",
      "reading_minutes": 9,
      "tags": [
        "前端",
        "浏览器",
        "页面渲染",
        "交互状态",
        "性能"
      ],
      "summary": "前端把页面内容、样式、交互逻辑与后端返回的数据组织成用户看得见、用得了的体验。产品经理需要区分页面首次加载、接口等待和交互反馈，也要为成功、加载中、空数据、失败与权限不足设计状态，而不只画出一个理想页面。",
      "mental_model": "用户眼前的操作台：展示信息、接收操作、反馈过程，再通过接口与后端交换数据。",
      "key_points": [
        "HTML 描述内容结构，CSS 负责布局与样式，JavaScript 处理交互；浏览器将资源组合并渲染成页面。",
        "前端可以先在本地更新显示，也可能等待接口返回；界面上的即时反馈不等于后端操作已经成功。",
        "一次操作通常有初始、加载中、成功、空结果、失败等状态；每种状态都需要可理解的文案与可继续的动作。",
        "页面性能既包括资源加载与渲染，也包括点击后的响应速度；慢体验不一定只由后端接口造成。",
        "不同屏幕、输入方式和网络条件会改变体验，需求不能只按一张桌面端静态稿验收。"
      ],
      "decision_questions": [
        "首次打开页面时，哪些信息必须先出现？加载中如何反馈？",
        "提交后是先显示处理中，还是允许乐观更新？若最终失败怎样回退？",
        "接口返回空数据、无权限、超时和错误时，页面分别显示什么、用户能做什么？",
        "手机与桌面布局、键盘操作和弱网使用是否有不同要求？",
        "哪些信息可以在前端暂存，哪些必须以服务端结果为准？"
      ],
      "common_traps": [
        "把静态设计稿当成完整需求，漏掉加载、空态、错误与权限态。",
        "认为按钮变成“成功”就代表业务已落库，忽略接口失败和回滚。",
        "把所有卡顿归因于后端，忽视资源体积、渲染和浏览器主线程。",
        "让前端单独决定敏感权限；最终授权仍须由服务端验证。"
      ],
      "related_ids": [
        "pm-tech-gateway",
        "pm-tech-nginx",
        "pm-tech-database"
      ],
      "path": "technology/frontend-basics.md",
      "sources": [
        {
          "name": "MDN：浏览器如何加载网站",
          "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_browsers_load_websites"
        },
        {
          "name": "MDN：Web 性能",
          "url": "https://developer.mozilla.org/en-US/docs/Web/Performance"
        },
        {
          "name": "MDN：客户端与服务端概览",
          "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Client-Server_overview"
        }
      ]
    },
    {
      "id": "pm-tech-nginx",
      "title": "Nginx：流量进入系统的第一站",
      "short_title": "Nginx",
      "collection": "technology",
      "technical_domain": "backend",
      "level": "基础",
      "updated_at": "2026-09-15",
      "reading_minutes": 8,
      "tags": [
        "Nginx",
        "反向代理",
        "负载均衡",
        "TLS",
        "可用性"
      ],
      "summary": "把 Nginx 理解为系统门口的交通调度员：它接住用户请求，再把请求转给合适的应用实例，同时可处理 HTTPS、静态资源、缓存和部分故障切换。产品经理不必会写配置，但要知道流量如何被分配、超时在哪里发生、发布和故障时用户会看到什么。",
      "mental_model": "入口层：先接住流量，再决定把它送到哪里。",
      "key_points": [
        "反向代理隐藏后端服务地址，对外提供一个稳定入口；域名不变，后端实例可以调整。",
        "负载均衡把请求分给多个实例，常见策略包括轮询、最少连接和基于客户端 IP 的哈希。",
        "TLS 终止、静态文件、响应缓存和请求头转发经常放在这一层，减少业务服务的重复工作。",
        "502 通常意味着入口拿不到上游的有效响应；504 更常见于等待上游超时，二者的排查方向不同。",
        "超时、上传大小、长连接和缓存策略都会直接影响产品体验，需求评审时应明确边界。"
      ],
      "decision_questions": [
        "峰值并发和流量是多少？是否需要多实例与弹性扩容？",
        "接口、上传、下载和长任务分别允许等待多久？",
        "登录状态是否依赖固定实例？服务应无状态还是需要会话粘滞？",
        "哪些内容允许缓存，缓存多久，涉及个性化或权限时如何避免串数据？",
        "灰度发布或故障切换时，用户可以接受怎样的降级体验？"
      ],
      "common_traps": [
        "把 Nginx 当成业务系统本身；它主要负责流量入口与转发，不负责业务规则。",
        "只写“支持高并发”，却没有峰值、响应时间、错误率和容量口径。",
        "把所有超时都无限调大，掩盖慢接口并拖垮连接资源。",
        "开启缓存却没有定义失效、权限隔离和更新策略。"
      ],
      "related_ids": [
        "pm-tech-frontend-basics",
        "pm-tech-gateway",
        "pm-tech-redis"
      ],
      "path": "technology/nginx.md",
      "sources": [
        {
          "name": "NGINX：HTTP 负载均衡",
          "url": "https://nginx.org/en/docs/http/load_balancing.html"
        },
        {
          "name": "NGINX：HTTP 代理模块",
          "url": "https://nginx.org/en/docs/http/ngx_http_proxy_module.html"
        }
      ]
    },
    {
      "id": "pm-tech-gateway",
      "title": "Gateway：接口世界的统一入口",
      "short_title": "Gateway",
      "collection": "technology",
      "technical_domain": "backend",
      "level": "基础",
      "updated_at": "2026-09-15",
      "reading_minutes": 9,
      "tags": [
        "API Gateway",
        "认证",
        "限流",
        "路由",
        "微服务"
      ],
      "summary": "Gateway 是客户端与多个业务服务之间的统一接口入口。它常负责路由、认证鉴权、限流、日志、协议适配与请求聚合。产品经理需要关注的不是选型，而是接口边界、失败语义、配额、版本兼容和端到端体验。",
      "mental_model": "业务门禁：统一身份、规则与去向，但不承载核心业务决策。",
      "key_points": [
        "客户端只面对一个稳定入口，后端服务拆分或迁移时可以减少客户端改动。",
        "路由解决请求去哪里；认证鉴权解决是谁、能做什么；限流解决能做多少次。",
        "请求聚合能减少客户端多次往返，但会增加网关自身的复杂度和失败组合。",
        "网关适合承载跨服务的通用能力，不应堆入订单、会员等核心业务规则。",
        "网关多一跳就多一处延迟和故障点，因此需要监控、容量与降级设计。"
      ],
      "decision_questions": [
        "接口面向内部、合作方还是公网用户？不同对象的认证和配额是否不同？",
        "版本如何演进，旧客户端支持多久，字段新增与废弃如何兼容？",
        "超过限流、没有权限、依赖超时和系统异常时，错误码与用户提示分别是什么？",
        "重试是否安全？创建订单、扣款等接口如何保证幂等？",
        "一个页面需要多少次接口调用，是否存在可聚合但不应过度耦合的请求？"
      ],
      "common_traps": [
        "把 Gateway 和 Nginx 完全等同；能力可能重叠，但前者更偏 API 治理，后者常位于更前的通用流量层。",
        "只描述成功流程，没有为限流、超时、部分失败和重试定义产品行为。",
        "在网关写大量业务逻辑，造成难测试、难发布和职责混乱。",
        "认为统一入口天然更安全，却没有最小权限、证书、审计和攻击面治理。"
      ],
      "related_ids": [
        "pm-tech-frontend-basics",
        "pm-tech-nginx",
        "pm-tech-database",
        "pm-tech-redis"
      ],
      "path": "technology/gateway.md",
      "sources": [
        {
          "name": "Microsoft Azure Architecture Center：API Gateway",
          "url": "https://learn.microsoft.com/en-us/azure/architecture/microservices/design/gateway"
        }
      ]
    },
    {
      "id": "pm-tech-database",
      "title": "数据库：业务事实如何被保存",
      "short_title": "数据库",
      "collection": "technology",
      "technical_domain": "backend",
      "level": "基础",
      "updated_at": "2026-09-15",
      "reading_minutes": 12,
      "tags": [
        "数据库",
        "数据模型",
        "事务",
        "索引",
        "一致性"
      ],
      "summary": "数据库保存订单、账户、库存等需要长期可信的业务事实。产品经理需要理解数据模型、唯一性、事务、一致性、索引和数据生命周期，因为这些选择会决定规则能否落地、查询是否可用、变更是否安全。",
      "mental_model": "事实账本：先定义什么是真实，再定义如何安全地读写真实。",
      "key_points": [
        "表、行、列只是存储形式；真正重要的是实体、关系、状态与业务约束是否被清楚建模。",
        "主键标识一条记录，唯一约束防止业务重复，外键或等价校验维护记录间关系。",
        "事务让一组操作要么一起成功、要么一起失败，并控制并发读写时能看到什么。",
        "索引像书的目录，可显著加速特定查询，但会占空间并增加写入维护成本，不是越多越好。",
        "删字段、改状态、合并账户和历史数据回填都是产品变更的一部分，需要迁移与回滚方案。"
      ],
      "decision_questions": [
        "核心实体是什么？同一个业务对象的唯一身份如何确定？",
        "哪些操作必须原子完成，失败后是回滚、补偿还是人工介入？",
        "列表按什么条件筛选、排序和分页？数据量扩大后是否仍可接受？",
        "删除是物理删除、软删除还是匿名化？审计与合规保留多久？",
        "字段、状态机或口径改变时，历史数据如何解释和迁移？"
      ],
      "common_traps": [
        "把页面字段直接等同数据库字段，忽略跨页面复用、历史版本和业务约束。",
        "用“最终一致”作为模糊托词，却没有说明允许多久不一致、用户看到什么、如何纠正。",
        "为所有查询加索引，却不评估写入成本、存储和真实查询路径。",
        "只设计新增，不设计修改、撤销、删除、审计与数据迁移。"
      ],
      "related_ids": [
        "pm-tech-gateway",
        "pm-tech-redis"
      ],
      "path": "technology/database.md",
      "sources": [
        {
          "name": "PostgreSQL：事务",
          "url": "https://www.postgresql.org/docs/current/tutorial-transactions.html"
        },
        {
          "name": "PostgreSQL：索引简介",
          "url": "https://www.postgresql.org/docs/current/indexes-intro.html"
        }
      ]
    },
    {
      "id": "pm-tech-redis",
      "title": "Redis：快数据、临时状态与缓存边界",
      "short_title": "Redis",
      "collection": "technology",
      "technical_domain": "backend",
      "level": "基础",
      "updated_at": "2026-09-15",
      "reading_minutes": 11,
      "tags": [
        "Redis",
        "缓存",
        "TTL",
        "数据结构",
        "一致性"
      ],
      "summary": "Redis 是以内存为核心的数据结构服务，常用于缓存、会话、计数、限流、排行榜和消息流。它很快，但速度不等于永不丢失或永远一致。产品经理要先定义数据能否过期、能否重建、最多允许旧多久，以及 Redis 故障时产品如何退化。",
      "mental_model": "高速工作台：放最常用、可过期或可重建的数据，不默认替代事实账本。",
      "key_points": [
        "Redis 不只是字符串缓存，还提供 Hash、List、Set、Sorted Set、Stream 等数据结构，适合不同产品场景。",
        "TTL 决定数据多久过期；内存达到上限后，系统还会依据淘汰策略决定删除哪些 Key。",
        "缓存命中能降低数据库压力，但缓存未命中、过期同时发生或热点集中会制造新的峰值风险。",
        "RDB 是时间点快照，AOF 记录写操作；持久化能降低数据丢失风险，但不自动把 Redis 变成关系数据库。",
        "缓存与数据库同时存在时必须定义更新顺序、可接受的陈旧时间和失败补偿。"
      ],
      "decision_questions": [
        "这份数据是唯一事实还是可从数据库重建的副本？",
        "最多允许旧多久？TTL 到期后由谁重建，首个用户是否会变慢？",
        "Redis 不可用时是直连数据库、使用旧值、关闭功能还是排队等待？",
        "是否存在热点 Key、大 Key、批量过期或无限增长的集合？",
        "排行榜、计数、库存和限流分别需要怎样的一致性与精度？"
      ],
      "common_traps": [
        "把缓存当数据库唯一来源，却没有足够的持久化、备份和恢复目标。",
        "Key 不设 TTL 或集合只增不减，最终把内存耗尽。",
        "大量 Key 在同一时间过期，瞬间把请求打到数据库。",
        "只看平均命中率，不看热点、尾延迟、淘汰量和故障降级。"
      ],
      "related_ids": [
        "pm-tech-database",
        "pm-tech-gateway",
        "pm-tech-nginx"
      ],
      "path": "technology/redis.md",
      "sources": [
        {
          "name": "Redis：数据类型",
          "url": "https://redis.io/docs/latest/develop/data-types/"
        },
        {
          "name": "Redis：持久化",
          "url": "https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/"
        },
        {
          "name": "Redis：Key 淘汰策略",
          "url": "https://redis.io/docs/latest/develop/reference/eviction/"
        }
      ]
    }
  ]
} as const;
