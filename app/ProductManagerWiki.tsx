"use client";

import { useEffect, useMemo, useState } from "react";

type ProductWikiItem = {
  id: string;
  title: string;
  short_title: string;
  collection: string;
  level: string;
  updated_at: string;
  reading_minutes: number;
  tags: readonly string[];
  summary: string;
  mental_model: string;
  key_points: readonly string[];
  decision_questions: readonly string[];
  common_traps: readonly string[];
  related_ids: readonly string[];
  path: string;
  sources: readonly { name: string; url: string }[];
};

type ProductWikiData = {
  updated_at: string;
  collections: readonly {
    id: string;
    name: string;
    description: string;
  }[];
  ingestion: {
    link: string;
    thought: string;
  };
  journey: readonly { label: string; note: string }[];
  items: readonly ProductWikiItem[];
};

type LinkedKnowledge = {
  id: string;
  title: string;
  summary: string;
  topics: readonly string[];
};

export default function ProductManagerWiki({
  data,
  query,
  linkedKnowledge,
  onOpenKnowledge,
}: {
  data: ProductWikiData;
  query: string;
  linkedKnowledge: readonly LinkedKnowledge[];
  onOpenKnowledge: (id: string) => void;
}) {
  const [collection, setCollection] = useState("all");
  const [selectedId, setSelectedId] = useState(data.items[0]?.id ?? "");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return data.items.filter((item) => {
      const inCollection = collection === "all" || item.collection === collection;
      const haystack = [
        item.title,
        item.summary,
        item.mental_model,
        ...item.tags,
        ...item.key_points,
        ...item.decision_questions,
      ].join(" ").toLowerCase();
      return inCollection && (!needle || haystack.includes(needle));
    });
  }, [collection, data.items, query]);

  useEffect(() => {
    if (filtered.length && !filtered.some((item) => item.id === selectedId)) {
      setSelectedId(filtered[0].id);
    }
  }, [filtered, selectedId]);

  const selected = data.items.find((item) => item.id === selectedId) ?? filtered[0] ?? null;
  const collectionName = (id: string) =>
    data.collections.find((item) => item.id === id)?.name ?? id;

  return (
    <div className="pm-wiki">
      <section className="pm-intro">
        <div className="pm-intro-copy">
          <p className="eyebrow">PRODUCT MANAGER WIKI</p>
          <h2>从一次请求，理解一套系统。</h2>
          <p>
            先掌握影响方案、体验和风险的关键概念，再把公众号内容与工作思考持续沉淀到同一张知识地图。
          </p>
        </div>
        <div className="pm-ingestion" aria-label="内容收录方式">
          <article>
            <span>01 · 公开链接</span>
            <p>{data.ingestion.link}</p>
          </article>
          <article>
            <span>02 · 工作思考</span>
            <p>{data.ingestion.thought}</p>
          </article>
        </div>
      </section>

      <section className="system-journey" aria-labelledby="journey-title">
        <div className="journey-heading">
          <p className="eyebrow">REQUEST JOURNEY</p>
          <h2 id="journey-title">一次用户请求经过哪里</h2>
        </div>
        <ol>
          {data.journey.map((step, index) => (
            <li key={step.label}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step.label}</strong>
              <p>{step.note}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="pm-collections" aria-label="产品经理知识分类">
        <button
          className={collection === "all" ? "active" : ""}
          onClick={() => setCollection("all")}
        >
          <span>全部专题</span>
          <b>{data.items.length}</b>
        </button>
        {data.collections.map((item) => {
          const count = data.items.filter((entry) => entry.collection === item.id).length;
          return (
            <button
              key={item.id}
              className={collection === item.id ? "active" : ""}
              onClick={() => setCollection(item.id)}
            >
              <span>{item.name}</span>
              <b>{count}</b>
              <small>{item.description}</small>
            </button>
          );
        })}
      </section>

      <section className="pm-library-grid">
        <div className="pm-feed">
          <div className="section-heading">
            <div>
              <p className="eyebrow">TECHNICAL LITERACY</p>
              <h2>{collection === "all" ? "产品经理的技术底图" : collectionName(collection)}</h2>
            </div>
            <span>{filtered.length} 个专题</span>
          </div>

          {filtered.length ? (
            <div className="pm-card-list">
              {filtered.map((item) => (
                <button
                  key={item.id}
                  className={selected?.id === item.id ? "pm-card active" : "pm-card"}
                  onClick={() => setSelectedId(item.id)}
                >
                  <div className="pm-card-index">{item.short_title.slice(0, 2).toUpperCase()}</div>
                  <div>
                    <div className="pm-card-meta">
                      <span>{collectionName(item.collection)}</span>
                      <span>{item.reading_minutes} 分钟</span>
                      <span>{item.level}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.mental_model}</p>
                    <div className="pm-tags">
                      {item.tags.slice(0, 4).map((tag) => <em key={tag}>#{tag}</em>)}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <strong>没有匹配的产品经理知识</strong>
              <p>换一个关键词，或查看其他分类。</p>
            </div>
          )}
        </div>

        <aside className="pm-detail">
          {selected ? (
            <>
              <div className="pm-detail-meta">
                <span>{collectionName(selected.collection)}</span>
                <span>·</span>
                <span>{selected.reading_minutes} 分钟</span>
                <span>·</span>
                <span>{selected.level}</span>
              </div>
              <h2>{selected.title}</h2>
              <p className="pm-summary">{selected.summary}</p>

              <div className="mental-model">
                <span>心智模型</span>
                <strong>{selected.mental_model}</strong>
              </div>

              <div className="pm-detail-section">
                <p className="eyebrow">需要掌握</p>
                <ul className="pm-key-points">
                  {selected.key_points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </div>

              <div className="pm-detail-section question-box">
                <p className="eyebrow">需求评审时要问</p>
                <ul>
                  {selected.decision_questions.map((question) => (
                    <li key={question}><span aria-hidden="true">□</span>{question}</li>
                  ))}
                </ul>
              </div>

              <details className="pm-traps">
                <summary>常见误区 · {selected.common_traps.length}</summary>
                <ul>
                  {selected.common_traps.map((trap) => <li key={trap}>{trap}</li>)}
                </ul>
              </details>

              <div className="pm-related">
                <p className="eyebrow">继续阅读</p>
                {selected.related_ids.map((id) => {
                  const related = data.items.find((item) => item.id === id);
                  return related ? (
                    <button key={id} onClick={() => setSelectedId(id)}>
                      <span>{related.short_title}</span><b>↗</b>
                    </button>
                  ) : null;
                })}
              </div>

              <div className="pm-sources">
                <p className="eyebrow">权威来源</p>
                {selected.sources.map((source) => (
                  <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
                    {source.name}<span>↗</span>
                  </a>
                ))}
              </div>
            </>
          ) : null}
        </aside>
      </section>

      {linkedKnowledge.length > 0 && (
        <section className="pm-linked-library">
          <div className="section-heading">
            <div>
              <p className="eyebrow">LINKED KNOWLEDGE</p>
              <h2>已关联的产品内容</h2>
            </div>
            <span>{linkedKnowledge.length} 条来源笔记</span>
          </div>
          <div className="pm-linked-grid">
            {linkedKnowledge.map((item) => (
              <button key={item.id} onClick={() => onOpenKnowledge(item.id)}>
                <div>{item.topics.slice(0, 2).map((topic) => <span key={topic}>#{topic}</span>)}</div>
                <strong>{item.title}</strong>
                <p>{item.summary}</p>
                <em>查看来源笔记 ↗</em>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
