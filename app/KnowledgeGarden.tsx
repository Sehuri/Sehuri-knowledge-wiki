"use client";

import { useMemo, useState, type CSSProperties } from "react";

type WikiItem = {
  id: string;
  title: string;
  platform: string;
  content_type: string;
  source_url: string;
  author: string;
  published_at: string;
  captured_at: string;
  completeness: string;
  topics: readonly string[];
  people: readonly string[];
  concepts: readonly string[];
  summary: string;
  keyPoints: readonly string[];
  structure: string;
  thoughts: string;
  related: readonly string[];
  extractionNotes: string;
};

type WikiData = {
  updatedAt: string;
  items: readonly WikiItem[];
  facets: {
    topics: readonly { name: string; count: number }[];
    people: readonly { name: string; count: number }[];
    concepts: readonly { name: string; count: number }[];
    platforms: readonly { name: string; count: number }[];
  };
};

const platformNames: Record<string, string> = {
  "wechat-article": "微信公众号",
  xiaohongshu: "小红书",
  bilibili: "哔哩哔哩",
  youtube: "YouTube",
  douyin: "抖音",
  x: "X / Twitter",
  news: "新闻",
  web: "网页",
};

function formatDate(value: string) {
  if (!value) return "日期未知";
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

function platformLabel(value: string) {
  return platformNames[value] ?? value;
}

export default function KnowledgeGarden({ data }: { data: WikiData }) {
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState("全部");
  const [activeTopic, setActiveTopic] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(
    data.items[0]?.id ?? null,
  );
  const [view, setView] = useState<"library" | "atlas">("library");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return data.items.filter((item) => {
      const inPlatform = platform === "全部" || item.platform === platform;
      const inTopic = !activeTopic || item.topics.includes(activeTopic);
      const haystack = [
        item.title,
        item.author,
        item.summary,
        ...item.topics,
        ...item.people,
        ...item.concepts,
      ].join(" ").toLowerCase();
      return inPlatform && inTopic && (!needle || haystack.includes(needle));
    });
  }, [activeTopic, data.items, platform, query]);

  const selected =
    data.items.find((item) => item.id === selectedId) ?? filtered[0] ?? null;

  const resetFilters = () => {
    setQuery("");
    setPlatform("全部");
    setActiveTopic("");
  };

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">知</div>
          <div>
            <strong>Knowledge Wiki</strong>
            <span>个人知识花园</span>
          </div>
        </div>

        <nav className="main-nav" aria-label="主导航">
          <button
            className={view === "library" ? "nav-item active" : "nav-item"}
            onClick={() => setView("library")}
          >
            <span>◫</span> 知识库
            <b>{data.items.length}</b>
          </button>
          <button
            className={view === "atlas" ? "nav-item active" : "nav-item"}
            onClick={() => setView("atlas")}
          >
            <span>✣</span> 关系图谱
          </button>
        </nav>

        <div className="side-section">
          <p className="eyebrow">内容来源</p>
          <button
            className={platform === "全部" ? "filter-row selected" : "filter-row"}
            onClick={() => setPlatform("全部")}
          >
            <span>全部内容</span><b>{data.items.length}</b>
          </button>
          {data.facets.platforms.map((item) => (
            <button
              key={item.name}
              className={platform === item.name ? "filter-row selected" : "filter-row"}
              onClick={() => setPlatform(item.name)}
            >
              <span>{platformLabel(item.name)}</span><b>{item.count}</b>
            </button>
          ))}
        </div>

        <div className="side-footer">
          <span className="sync-dot" />
          <div>
            <strong>本地 Wiki 已同步</strong>
            <span>{formatDate(data.updatedAt)} 更新</span>
          </div>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">PERSONAL KNOWLEDGE SYSTEM</p>
            <h1>{view === "library" ? "把零散信息，长成知识。" : "看见知识之间的联系。"}</h1>
          </div>
          <label className="search-box">
            <span aria-hidden="true">⌕</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索标题、主题、人物或概念"
              aria-label="搜索知识库"
            />
            <kbd>⌘ K</kbd>
          </label>
        </header>

        {view === "library" ? (
          <>
            <section className="stats-grid" aria-label="知识库概览">
              <article className="stat-card primary">
                <span>已收录条目</span>
                <strong>{String(data.items.length).padStart(2, "0")}</strong>
                <small>持续生长的知识资产</small>
              </article>
              <article className="stat-card">
                <span>主题</span>
                <strong>{data.facets.topics.length}</strong>
                <small>跨内容聚合</small>
              </article>
              <article className="stat-card">
                <span>人物</span>
                <strong>{data.facets.people.length}</strong>
                <small>观点来源</small>
              </article>
              <article className="stat-card">
                <span>概念</span>
                <strong>{data.facets.concepts.length}</strong>
                <small>认知坐标</small>
              </article>
            </section>

            <section className="topic-strip">
              <div>
                <p className="eyebrow">探索主题</p>
                <h2>从一个主题，进入一片知识。</h2>
              </div>
              <div className="topic-cloud">
                {data.facets.topics.slice(0, 10).map((item, index) => (
                  <button
                    key={item.name}
                    className={activeTopic === item.name ? "topic-pill active" : "topic-pill"}
                    style={{ "--i": index } as CSSProperties}
                    onClick={() => setActiveTopic(activeTopic === item.name ? "" : item.name)}
                  >
                    {item.name}<sup>{item.count}</sup>
                  </button>
                ))}
              </div>
            </section>

            <section className="library-grid">
              <div className="feed">
                <div className="section-heading">
                  <div>
                    <p className="eyebrow">KNOWLEDGE FEED</p>
                    <h2>{activeTopic ? `主题：${activeTopic}` : "最近收录"}</h2>
                  </div>
                  <span>{filtered.length} 条结果</span>
                </div>

                {filtered.length ? (
                  <div className="card-list">
                    {filtered.map((item) => (
                      <button
                        key={item.id}
                        className={selected?.id === item.id ? "knowledge-card active" : "knowledge-card"}
                        onClick={() => setSelectedId(item.id)}
                      >
                        <div className="card-meta">
                          <span className={`platform-badge ${item.platform}`}>
                            {platformLabel(item.platform)}
                          </span>
                          <span>{formatDate(item.published_at || item.captured_at)}</span>
                          <span className={`quality ${item.completeness}`}>
                            {item.completeness === "full" ? "完整" : "部分"}
                          </span>
                        </div>
                        <h3>{item.title}</h3>
                        <p>{item.summary}</p>
                        <div className="card-bottom">
                          <span>{item.author || "作者未知"}</span>
                          <div>
                            {item.topics.slice(0, 3).map((topic) => (
                              <em key={topic}>#{topic}</em>
                            ))}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <strong>没有找到相关知识</strong>
                    <p>换个关键词，或者清除当前筛选。</p>
                    <button onClick={resetFilters}>清除筛选</button>
                  </div>
                )}
              </div>

              <aside className="detail-panel">
                {selected ? (
                  <>
                    <div className="detail-kicker">
                      <span>{platformLabel(selected.platform)}</span>
                      <span>·</span>
                      <span>{formatDate(selected.published_at || selected.captured_at)}</span>
                    </div>
                    <h2>{selected.title}</h2>
                    <p className="detail-summary">{selected.summary}</p>

                    <div className="detail-section">
                      <p className="eyebrow">核心观点</p>
                      <ol>
                        {selected.keyPoints.slice(0, 5).map((point, index) => (
                          <li key={`${selected.id}-${index}`}>
                            <span>{String(index + 1).padStart(2, "0")}</span>
                            <p>{point}</p>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="detail-section">
                      <p className="eyebrow">概念坐标</p>
                      <div className="concept-list">
                        {selected.concepts.map((concept) => (
                          <span key={concept}>{concept}</span>
                        ))}
                      </div>
                    </div>

                    {selected.related.length > 0 && (
                      <div className="related-note">
                        <p className="eyebrow">关联知识</p>
                        {selected.related.map((title) => (
                          <button
                            key={title}
                            onClick={() => {
                              const related = data.items.find((item) => item.title === title);
                              if (related) setSelectedId(related.id);
                            }}
                          >
                            {title} <span>↗</span>
                          </button>
                        ))}
                      </div>
                    )}

                    <a className="source-link" href={selected.source_url} target="_blank" rel="noreferrer">
                      查看原始来源 <span>↗</span>
                    </a>
                  </>
                ) : (
                  <div className="empty-detail">选择一条内容查看知识摘要。</div>
                )}
              </aside>
            </section>
          </>
        ) : (
          <section className="atlas">
            <div className="atlas-copy">
              <p className="eyebrow">KNOWLEDGE ATLAS</p>
              <h2>主题是入口，概念是坐标，内容是它们之间的路径。</h2>
              <p>点击任意节点回到相关内容。节点大小依据当前 Wiki 中的出现次数。</p>
            </div>
            <div className="constellation">
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="core-node">
                <strong>{data.items.length}</strong>
                <span>知识条目</span>
              </div>
              {[...data.facets.topics.slice(0, 6), ...data.facets.concepts.slice(0, 5)]
                .map((node, index) => (
                  <button
                    key={`${node.name}-${index}`}
                    className={`atlas-node node-${index + 1}`}
                    onClick={() => {
                      setActiveTopic(data.facets.topics.some((topic) => topic.name === node.name) ? node.name : "");
                      setQuery(node.name);
                      setView("library");
                    }}
                  >
                    {node.name}<sup>{node.count}</sup>
                  </button>
                ))}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
