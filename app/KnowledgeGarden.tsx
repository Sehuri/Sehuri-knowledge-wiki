"use client";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import type ProductManagerWiki from "./ProductManagerWiki";
import { matchesWikiQuery } from "./wiki-search";
import tokens from "./theme-tokens.json";
import { Markdown } from "./ReaderMarkdown";
type WikiItem = {
  updated_at?: string;
  domainIds?: readonly string[];
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


type ProductData = Parameters<typeof ProductManagerWiki>[0]["data"];
type Domain = keyof typeof tokens.themes;
const domains = Object.keys(tokens.themes) as Domain[];
const signals: Record<Domain, RegExp> = {
 ai: /AI|人工智能|大模型|Agent|编程|技术|模型|软件|开发|计算机|算法|Harness/i,
 product: /产品|商业|市场|营销|需求|创业|品牌|管理|交付/,
 travel: /旅行|旅游|地理|目的地|出境|城市|游记/,
 humanities: /阅读|文学|小说|书籍|历史|哲学|人文|读书/,
 design: /设计|创作|视觉|摄影|建筑|艺术|界面/,
 life: /生活|自我|成长|职业|健康|习惯|心理|人生/
};
const platforms: Record<string,string> = {"wechat-article":"微信公众号",web:"网页",xiaohongshu:"小红书",douyin:"抖音",bilibili:"哔哩哔哩",youtube:"YouTube",news:"新闻",x:"X / Twitter"};
const label = (p:string) => platforms[p] || p;
const date = (v:string) => v ? v.slice(0,10).replaceAll("-", ".") : "日期未知";
function membership(item: WikiItem): Domain[] { return item.domainIds ? item.domainIds.filter((d): d is Domain => domains.includes(d as Domain)) : domains.filter(d => signals[d].test(item.topics.join(" "))); }
const routeNow = () => typeof window === "undefined" ? "/library" : window.location.hash.slice(1) || "/library";
export default function KnowledgeGarden({data,productData}:{data:WikiData;productData:ProductData}) {
 const [route,setRoute] = useState("/library");
 const [drawer,setDrawer] = useState(false);
 const [feedback,setFeedback] = useState("");
 const search = useRef<HTMLInputElement>(null);
 const current = useRef("/library");
 const scrolls = useRef<Record<string,number>>({});
 useEffect(() => {
  try { scrolls.current = JSON.parse(sessionStorage.getItem("wiki-scroll") || "{}"); } catch {}
  let restoring=false;
  history.scrollRestoration="manual";
  const update = () => { restoring=true; const next=routeNow(); const y=scrolls.current[next] || 0; current.current=next; setRoute(next); setDrawer(false); setFeedback(""); requestAnimationFrame(()=>requestAnimationFrame(()=>{window.scrollTo(0,y);requestAnimationFrame(()=>{restoring=false;});})); };
  const remember = () => {if(restoring)return;scrolls.current[current.current]=window.scrollY; sessionStorage.setItem("wiki-scroll",JSON.stringify(scrolls.current));};
  const key = (e:KeyboardEvent) => {if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();search.current?.focus();} if(e.key==="Escape")setDrawer(false);};
  update(); window.addEventListener("hashchange",update);window.addEventListener("scroll",remember);window.addEventListener("keydown",key);
  return ()=>{window.removeEventListener("hashchange",update);window.removeEventListener("scroll",remember);window.removeEventListener("keydown",key);};
 },[]);
 const [path,qs=""] = route.split("?"); const params = new URLSearchParams(qs);
 const query=params.get("q")||"", platform=params.get("source")||"", topic=params.get("topic")||"", filterDomain=params.get("domain")||"";
 const isReader=path.startsWith("/knowledge/"); const isCollection=path==="/collections/product-manager";
 const sourceItem = path.startsWith("/knowledge/source/") ? data.items.find(i=>i.id===path.split("/")[3]) : undefined;
 const productItem = path.startsWith("/knowledge/product/") ? productData.items.find(i=>i.id===path.split("/")[3]) : undefined;
 const routeDomain=path.startsWith("/domains/")?path.split("/")[2]:"";
 const domain=(domains.includes(routeDomain as Domain)?routeDomain:isCollection?"product":isReader?((domains.includes(params.get("theme") as Domain)?params.get("theme"):"") || (productItem?"product":sourceItem?membership(sourceItem)[0]:"")):"") as Domain|"";
 const theme=domain&&tokens.themes[domain]?tokens.themes[domain]:tokens.base;
 const style={"--bg":theme.background,"--ink":theme.text,"--muted":theme.muted,"--rule":theme.rule,"--accent":theme.accent,"--surface":theme.subtleSurface} as CSSProperties;
 function go(next:string){window.location.hash=next;}
 function filter(key:string,value:string){const p=new URLSearchParams(qs);value?p.set(key,value):p.delete(key);const next=path+(p.size?"?"+p:""); history.replaceState(null,"", "#"+next);current.current=next;setRoute(next);}
 function open(kind:string,id:string){sessionStorage.setItem("wiki-return",route);go(`/knowledge/${kind}/${id}${domain?"?theme="+domain:""}`);}
 function back(){const target=sessionStorage.getItem("wiki-return")||"/library";go(target);}
 const sourceFiltered=useMemo(()=>data.items.filter(i=>(!domain||membership(i).includes(domain))&&(!filterDomain||membership(i).includes(filterDomain as Domain))&&(!platform||i.platform===platform)&&(!topic||i.topics.includes(topic))&&matchesWikiQuery(i,query,label(i.platform))),[data,domain,filterDomain,platform,topic,query]);
 const productFiltered=productData.items.filter(i=>(!domain||domain==="product")&&(!filterDomain||filterDomain==="product")&&!platform&&(!topic||i.tags.includes(topic))&&(!params.get("collection")||i.collection===params.get("collection"))&&(!params.get("technical")||i.technical_domain===params.get("technical"))&&query.trim().split(/\s+/).every(q=>[i.title,i.summary,i.mental_model,...i.tags,...i.key_points,...i.decision_questions].join(" ").toLowerCase().includes(q.toLowerCase())));
 const entries=[...(!isCollection&&!params.get("collection")&&!params.get("technical")?sourceFiltered.map(i=>({id:i.id,kind:"source",title:i.title,summary:i.summary,platform:i.platform,author:i.author,captured:i.captured_at,updated:i.updated_at||"",group:i.topics[0]||"其他整理",tags:i.topics})):[]),...productFiltered.map(i=>({id:i.id,kind:"product",title:i.title,summary:i.summary,platform:"",author:"产品经理 Wiki",captured:"",updated:i.updated_at,group:productData.collections.find(c=>c.id===i.collection)?.name||i.collection,tags:i.tags}))].sort((a,b)=>(params.get("sort")==="updated"?b.updated.localeCompare(a.updated):b.captured.localeCompare(a.captured))||a.title.localeCompare(b.title,"zh-CN"));
 const title=isReader?(sourceItem?.title||productItem?.title||"未找到这条知识"):domain?isCollection?"产品经理 Wiki":tokens.themes[domain].name:path==="/topics"?"专题":path==="/atlas"?"关系图谱":"全部知识";
 const structureSections = sourceItem?.structure.split(/(?=^### )/m).filter(s=>s.trim()).map((text,i)=>{const heading=text.match(/^### ([^\n]+)\n/);return {id:`structure-${i}`,title:heading?.[1]||"整理内容",text:heading?text.slice(heading[0].length):text};}) || [];
 const sections = sourceItem ? [{id:"overview",title:"内容概览",text:sourceItem.summary},{id:"points",title:"核心观点",list:sourceItem.keyPoints},...structureSections] : productItem ? [{id:"overview",title:"内容概览",text:productItem.summary},{id:"model",title:"心智模型",text:productItem.mental_model},{id:"points",title:"需要掌握",list:productItem.key_points},{id:"questions",title:"评审问题",list:productItem.decision_questions},{id:"traps",title:"常见误区",list:productItem.common_traps}] : [];
 const visibleSections=sections.filter(s=>s.text||s.list?.length);
 const related=sourceItem?data.items.filter(i=>sourceItem.related.includes(i.title)).map(i=>({kind:"source",id:i.id,title:i.title})):productItem?productData.items.filter(i=>productItem.related_ids.includes(i.id)).map(i=>({kind:"product",id:i.id,title:i.title})):[];
 const outline=[...visibleSections.map(s=>({id:s.id,title:s.title})),...(related.length?[{id:"related",title:"关联知识"}]:[]),{id:"sources",title:"来源信息"}];
 const jump=(id:string)=>document.getElementById(id)?.scrollIntoView({behavior:"auto",block:"start"});
 function row(e:typeof entries[number],index:number){return <article className="editorial-row" key={e.kind+e.id}>{domain==="humanities"&&<span className="row-number">{String(index+1).padStart(2,"0")}</span>}{domain==="life"&&<time className="row-number">{date(e.captured||e.updated)}</time>}<div className="row-copy"><h2><a href={`#/knowledge/${e.kind}/${e.id}${domain?"?theme="+domain:""}`} onClick={ev=>{ev.preventDefault();open(e.kind,e.id);}}>{e.title}</a></h2><p>{e.summary}</p><div className="entry-meta">{e.platform?label(e.platform):"产品专题"} · {e.author||"作者未注明"} · {e.captured?"收录于 "+date(e.captured):"更新于 "+date(e.updated)}</div></div><button className="read-link" onClick={()=>open(e.kind,e.id)}>阅读整理</button></article>}
 const grouped=domain==="product"||domain==="travel"||isCollection;
 return <div className={`editorial-app theme-${domain||"base"}`} style={style}>
 <button className="mobile-menu" aria-expanded={drawer} aria-controls="wiki-navigation" onClick={()=>setDrawer(!drawer)}>{drawer?"关闭导航":"导航"}</button>
 {drawer&&<button className="drawer-shade" aria-label="关闭导航" onClick={()=>setDrawer(false)}/>}
 <aside id="wiki-navigation" className={`editorial-sidebar ${drawer?"is-open":""}`}><a className="editorial-brand" href="#/library">Sehuri<small>个人知识库</small></a><nav aria-label="主导航">{[["/library","全部知识"],["/topics","专题"],["/atlas","关系图谱"]].map(([url,name])=><a key={url} href={"#"+url} aria-current={path===url?"page":undefined}>{name}</a>)}<div className="nav-caption">知识领域</div>{domains.map(d=><a key={d} href={"#/domains/"+d} aria-current={domain===d?"page":undefined}>{tokens.themes[d].name}</a>)}<a className="collection-nav" href="#/collections/product-manager">产品经理 Wiki</a></nav><small className="sidebar-updated">更新于 {date(data.updatedAt)}</small></aside>
 <main className="editorial-main"><header className="editorial-topbar"><span>知识库 / {isReader?domain?tokens.themes[domain].name:"整理内容":title}</span><label className="editorial-search"><input ref={search} aria-label="搜索知识库" placeholder={domain?"在当前领域搜索":"搜索知识"} value={query} onChange={e=>{if(isReader){go("/library?q="+encodeURIComponent(e.target.value));}else filter("q",e.target.value);}}/><kbd>⌘ K</kbd></label></header>
 <div className="editorial-content">{isReader?<><button className="return-link" onClick={back}>返回知识库</button><div className="reader-layout"><article className="reader"><h1>{title}</h1>{sourceItem||productItem?<><div className="entry-meta">{sourceItem?`${label(sourceItem.platform)} · ${sourceItem.author||"作者未注明"} · ${sourceItem.published_at?"发表于 "+date(sourceItem.published_at):"收录于 "+date(sourceItem.captured_at)}`:`产品经理 Wiki · 更新于 ${date(productItem!.updated_at)}`} · 整理内容</div><div className="reader-actions">{sourceItem?.source_url?<a href={sourceItem.source_url} target="_blank" rel="noreferrer">查看原文</a>:<button onClick={()=>jump("sources")}>来源与资料</button>}<button onClick={async()=>{try{await navigator.clipboard.writeText(window.location.href);setFeedback("链接已复制");}catch{setFeedback("复制失败，请复制浏览器地址栏链接");}}}>复制链接</button><span role="status">{feedback}</span></div><details className="mobile-outline"><summary>本文目录</summary>{outline.map(s=><button key={s.id} onClick={()=>jump(s.id)}>{s.title}</button>)}</details>{visibleSections.map(s=><section id={s.id} key={s.id}><h2>{s.title}</h2>{s.text&&<Markdown text={s.text}/ >}{s.list&&<ol>{s.list.map((t,i)=><li key={i}><Markdown text={t}/></li>)}</ol>}</section>)}{sourceItem&&!sourceItem.keyPoints.length&&!sourceItem.structure&&<p>目前仅整理了摘要，请通过原文入口阅读更多内容。</p>}{related.length>0&&<section id="related"><h2>关联知识</h2>{related.map(r=><a className="related-entry" key={r.id} href={`#/knowledge/${r.kind}/${r.id}`} onClick={e=>{e.preventDefault();go(`/knowledge/${r.kind}/${r.id}${domain?"?theme="+domain:""}`);}}>{r.title}</a>)}</section>}<section id="sources"><h2>来源信息</h2>{sourceItem?<><a href={sourceItem.source_url} target="_blank" rel="noreferrer">{sourceItem.title}</a><p>作者：{sourceItem.author||"未注明"}<br/>发布时间：{date(sourceItem.published_at)}<br/>收录时间：{date(sourceItem.captured_at)}<br/>来源获取情况：{sourceItem.completeness==="full"?"完整获取":"部分获取"}；本页展示整理内容。</p></>:productItem?.sources.map(s=><a className="related-entry" key={s.url} href={s.url} target="_blank" rel="noreferrer">{s.name}</a>)}</section></>:<p>该地址没有对应的知识条目，请返回列表查找。</p>}</article>{(sourceItem||productItem)&&<aside className="reader-outline"><strong>本文目录</strong>{outline.map(s=><button key={s.id} onClick={()=>jump(s.id)}>{s.title}</button>)}</aside>}</div></>:<><div className="editorial-heading"><h1>{title}</h1><span>{path==="/topics"?"从一个领域开始":path==="/atlas"?"由共享主题连接真实条目":`${entries.length} 篇整理`}</span></div>{domain&&<p className="domain-description">{tokens.themes[domain].description}</p>}{path==="/topics"?<div className="topic-directory">{domains.map(d=><a key={d} href={"#/domains/"+d}><h2>{tokens.themes[d].name}</h2><p>{tokens.themes[d].description}</p><small>{data.items.filter(i=>membership(i).includes(d)).length+(d==="product"?productData.items.length:0)} 篇整理</small></a>)}</div>:path==="/atlas"?<div className="topic-directory">{data.facets.topics.map(t=><a key={t.name} href={"#/library?topic="+encodeURIComponent(t.name)}><h2>{t.name}</h2><p>{t.count} 条知识共享此主题</p></a>)}</div>:<><div className="editorial-filters">{!domain&&<select aria-label="领域筛选" value={filterDomain} onChange={e=>filter("domain",e.target.value)}><option value="">全部领域</option>{domains.map(d=><option key={d} value={d}>{tokens.themes[d].name}</option>)}</select>}<select aria-label="来源筛选" value={platform} onChange={e=>filter("source",e.target.value)}><option value="">全部来源</option>{data.facets.platforms.map(p=><option key={p.name} value={p.name}>{label(p.name)}</option>)}</select><select aria-label="主题筛选" value={topic} onChange={e=>filter("topic",e.target.value)}><option value="">全部主题</option>{data.facets.topics.map(t=><option key={t.name}>{t.name}</option>)}</select><select aria-label="排序" value={params.get("sort")||"captured"} onChange={e=>filter("sort",e.target.value)}><option value="captured">最近收录</option><option value="updated">最近更新</option></select><button onClick={()=>go(path)}>清除筛选</button></div>{(domain==="product"||isCollection)&&<div className="collection-controls"><a href="#/collections/product-manager">产品经理 Wiki</a><select aria-label="专题分类" value={params.get("collection")||""} onChange={e=>filter("collection",e.target.value)}><option value="">全部专题分类</option>{productData.collections.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select><select aria-label="技术分区" value={params.get("technical")||""} onChange={e=>filter("technical",e.target.value)}><option value="">全部技术分区</option>{productData.technical_domains.map(d=><option key={d.id} value={d.id}>{d.name}</option>)}</select></div>}<div className={domain==="ai"?"research-layout":""}><div className={`editorial-list ${grouped?"grouped-list":""}`}>{!entries.length?<div className="editorial-empty"><h2>暂无匹配的整理</h2><p>试试其他关键词或清除筛选。</p></div>:grouped?[...new Set(entries.map(e=>e.group))].map(group=><section key={group}><h2 className="group-heading">{group}</h2>{entries.filter(e=>e.group===group).map(row)}</section>):entries.map(row)}</div>{domain==="ai"&&<aside className="research-topics"><h2>研究线索</h2>{[...new Set(sourceFiltered.flatMap(i=>[...i.topics]))].map(t=><button key={t} onClick={()=>filter("topic",t)}>{t}</button>)}</aside>}</div></>}</>}</div></main></div>;
}
