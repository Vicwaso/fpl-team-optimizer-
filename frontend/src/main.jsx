import React, {useMemo, useState} from "react";
import {createRoot} from "react-dom/client";
import "./styles.css";

const players = [
  {id:1,name:"Pickford",full:"Jordan Pickford",team:"EVE",pos:"GK",pts:5.8,status:"fit",price:5.0},
  {id:2,name:"Raya",full:"David Raya",team:"ARS",pos:"GK",pts:5.4,status:"fit",price:5.5},
  {id:3,name:"Alexander-Arnold",full:"Trent Alexander-Arnold",team:"LIV",pos:"DEF",pts:6.7,status:"fit",price:6.5},
  {id:4,name:"Saliba",full:"William Saliba",team:"ARS",pos:"DEF",pts:5.9,status:"fit",price:6.0},
  {id:5,name:"Gvardiol",full:"Joško Gvardiol",team:"MCI",pos:"DEF",pts:5.8,status:"fit",price:5.5},
  {id:6,name:"White",full:"Ben White",team:"ARS",pos:"DEF",pts:5.2,status:"doubt",price:5.4},
  {id:7,name:"Porro",full:"Pedro Porro",team:"TOT",pos:"DEF",pts:5.0,status:"fit",price:5.5},
  {id:8,name:"Saka",full:"Bukayo Saka",team:"ARS",pos:"MID",pts:8.1,status:"fit",price:10.0},
  {id:9,name:"Salah",full:"Mohamed Salah",team:"LIV",pos:"MID",pts:8.7,status:"fit",price:12.5},
  {id:10,name:"Palmer",full:"Cole Palmer",team:"CHE",pos:"MID",pts:7.9,status:"fit",price:10.5},
  {id:11,name:"Son",full:"Son Heung-min",team:"TOT",pos:"MID",pts:6.8,status:"fit",price:9.8},
  {id:12,name:"Ødegaard",full:"Martin Ødegaard",team:"ARS",pos:"MID",pts:6.3,status:"fit",price:8.5},
  {id:13,name:"Haaland",full:"Erling Haaland",team:"MCI",pos:"FWD",pts:9.2,status:"fit",price:14.0},
  {id:14,name:"Watkins",full:"Ollie Watkins",team:"AVL",pos:"FWD",pts:7.2,status:"fit",price:9.0},
  {id:15,name:"Isak",full:"Alexander Isak",team:"NEW",pos:"FWD",pts:6.9,status:"doubt",price:8.5},
];

const squad = players.filter(p => [1,3,4,5,7,8,9,10,11,12,13].includes(p.id));
const alternatives = {
  7: [
    {name:"Pedro Porro", team:"TOT", pts:5.0, delta:"£0.0m", reason:"Good attacking involvement; favourable next fixture."},
    {name:"Rúben Dias", team:"MCI", pts:5.4, delta:"+£0.5m", reason:"Higher clean-sheet outlook over the next two."},
    {name:"Konaté", team:"LIV", pts:5.1, delta:"-£0.5m", reason:"Strong minutes trend and good value."}
  ],
  10: [
    {name:"Cole Palmer", team:"CHE", pts:7.9, delta:"£0.0m", reason:"Highest projected midfield return in this price range."},
    {name:"Foden", team:"MCI", pts:7.2, delta:"-£0.5m", reason:"Fixture run is improving; monitor minutes."},
    {name:"Mbeumo", team:"BRE", pts:6.6, delta:"-£1.0m", reason:"Strong home form and reliable minutes."}
  ]
};

function App(){
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState("Squad");
  const [showMore, setShowMore] = useState(false);
  const [review, setReview] = useState(false);

  const totals = useMemo(() => ({
    predicted: squad.reduce((a,p)=>a+p.pts,0).toFixed(1),
    cost: squad.reduce((a,p)=>a+p.price,0).toFixed(1)
  }),[]);

  return <div className="app">
    <header className="topbar">
      <div className="brand">
        <div className="crest">FPL</div>
        <div><div className="brand-title">Team Optimizer</div><div className="brand-sub">Gameweek 1 · 2026/27</div></div>
      </div>
      <div className="top-actions">
        <div className="data-status"><span className="pulse"></span> Data updated 12 min ago</div>
        <button className="ghost" onClick={()=>setReview(!review)}>Review</button>
        <div className="avatar">VW</div>
      </div>
    </header>

    <nav className="nav">
      {["Squad","Transfers","Watchlist"].map(x=><button key={x} className={tab===x?"active":""} onClick={()=>setTab(x)}>{x}</button>)}
      <span className="nav-rule"></span>
      <span className="budget">£{totals.cost}m / £100.0m</span>
    </nav>

    {tab==="Squad" ? <main className="content">
      <section className="page-head">
        <div>
          <div className="eyebrow">MATCHDAY SQUAD</div>
          <h1>Recommended XI</h1>
          <p>Projected points based on form, fixtures, minutes and current availability.</p>
        </div>
        <div className="head-stat"><span>Projected</span><strong>{totals.predicted}</strong><small>pts</small></div>
      </section>

      <div className="layout">
        <section className="pitch-wrap">
          <div className="pitch">
            <div className="pitch-line mid"></div>
            <div className="pitch-circle"></div>
            <div className="box top"></div>
            <div className="box bottom"></div>
            <div className="goal top-goal"></div>
            <div className="goal bottom-goal"></div>

            <div className="formation fwd">
              {squad.filter(p=>p.pos==="FWD").map(p=><PlayerChip key={p.id} p={p} onClick={setSelected} />)}
            </div>
            <div className="formation midf">
              {squad.filter(p=>p.pos==="MID").map(p=><PlayerChip key={p.id} p={p} onClick={setSelected} swap={p.id===10} />)}
            </div>
            <div className="formation def">
              {squad.filter(p=>p.pos==="DEF").map(p=><PlayerChip key={p.id} p={p} onClick={setSelected} swap={p.id===7} />)}
            </div>
            <div className="formation keeper">
              {squad.filter(p=>p.pos==="GK").map(p=><PlayerChip key={p.id} p={p} onClick={setSelected} />)}
            </div>
          </div>
          <div className="pitch-foot">
            <span><i className="dot fit"></i> Fit</span>
            <span><i className="dot doubt"></i> Doubt</span>
            <span><i className="dot out"></i> Out</span>
            <span className="swap-key">↔ Suggested swap</span>
          </div>
        </section>

        <aside className="side">
          <div className="panel">
            <div className="panel-title">Captain pick</div>
            <div className="captain">
              <div className="captain-badge">C</div>
              <div><strong>Erling Haaland</strong><span>MCI · FWD</span></div>
              <div className="captain-points">9.2<small> pts</small></div>
            </div>
            <div className="reason">Best projected return with a strong fixture. Salah is the nearest alternative at 8.7 pts.</div>
          </div>

          <div className="panel transfers">
            <div className="panel-head"><div className="panel-title">Suggested transfers</div><span className="count">2</span></div>
            <TransferCard out="Ben White" inName="Rúben Dias" delta="+£0.5m" />
            <TransferCard out="Son Heung-min" inName="Mbeumo" delta="-£1.0m" />
            <button className="text-btn" onClick={()=>setTab("Transfers")}>View all transfers →</button>
          </div>

          <div className="panel">
            <div className="panel-head"><div className="panel-title">Squad checks</div><span className="ok">✓ Balanced</span></div>
            <div className="checks"><span>3 / 3 club limit</span><span>£{(100-Number(totals.cost)).toFixed(1)}m remaining</span><span>11 / 11 available</span></div>
          </div>
        </aside>
      </div>

      <section className="table-panel">
        <div className="table-head"><div><div className="panel-title">Player outlook</div><span className="muted">Tap a player for the reasoning behind their projection.</span></div><button className="text-btn" onClick={()=>setShowMore(!showMore)}>{showMore?"Show less":"Show more"} →</button></div>
        <table><thead><tr><th>PLAYER</th><th>POS</th><th>FIXTURE</th><th>STATUS</th><th className="right">PROJECTED</th></tr></thead>
          <tbody>{(showMore?squad:squad.slice(0,6)).map(p=><tr key={p.id} onClick={()=>setSelected(p)}>
            <td><strong>{p.full}</strong><span>{p.team}</span></td><td>{p.pos}</td><td>{fixtureFor(p)}</td>
            <td><span className={"status "+p.status}>{p.status==="fit"?"Fit":p.status==="doubt"?"Doubt":"Out"}</span></td><td className="right projected">{p.pts.toFixed(1)}</td>
          </tr>)}</tbody>
        </table>
      </section>

      {review && <div className="review-note"><strong>Weekly review</strong><span>Predictions will be compared with actual FPL points after the gameweek. The review tracks bias by position, fixture difficulty and news signal accuracy.</span><button onClick={()=>setReview(false)}>×</button></div>}
    </main> : <Placeholder tab={tab} onBack={()=>setTab("Squad")} />}

    {selected && <Drawer p={selected} close={()=>setSelected(null)} />}
  </div>
}

function PlayerChip({p,onClick,swap}){
 return <button className="player-chip" onClick={()=>onClick(p)}>
   <div className="chip-top"><span className={"dot "+p.status}></span><span className="club">{p.team}</span>{swap&&<span className="swap">↔</span>}</div>
   <div className="shirt">{p.name.slice(0,1)}</div><strong>{p.name}</strong><span className="chip-pts">{p.pts.toFixed(1)} pts</span>
 </button>
}
function TransferCard({out,inName,delta}){return <div className="transfer"><div><span className="out">OUT</span><strong>{out}</strong></div><span className="arrow">→</span><div><span className="in">IN</span><strong>{inName}</strong></div><small>{delta}</small></div>}
function fixtureFor(p){const f={ARS:"LEE (H)",LIV:"BOU (A)",MCI:"WOL (H)",TOT:"FUL (H)",CHE:"WHU (A)",EVE:"BHA (H)",AVL:"NEW (A)",NEW:"AVL (H)"};return f[p.team]||"—"}
function Drawer({p,close}){
 const alts=alternatives[p.id]||[
  {name:"Alternative 1",team:"—",pts:p.pts-0.3,delta:"—",reason:"Similar projection; monitor fixture and minutes."},
  {name:"Alternative 2",team:"—",pts:p.pts-0.5,delta:"—",reason:"Lower projected points but useful budget value."},
  {name:"Alternative 3",team:"—",pts:p.pts-0.7,delta:"—",reason:"Longer-term option with a favourable fixture run."}
 ];
 return <div className="drawer-backdrop" onClick={close}><aside className="drawer" onClick={e=>e.stopPropagation()}>
   <button className="close" onClick={close}>×</button>
   <div className="drawer-kicker">{p.pos} · {p.team}</div><h2>{p.full}</h2>
   <div className="drawer-score"><strong>{p.pts.toFixed(1)}</strong><span>projected points</span></div>
   <div className="flag"><span className={"dot "+p.status}></span><div><strong>{p.status==="fit"?"No availability flag":"Availability needs attention"}</strong><p>Last checked 12 minutes ago · official FPL data and monitored team news.</p></div></div>
   <h3>Why this projection?</h3><p className="explain">The score combines recent form, fixture difficulty, expected minutes, home/away context and the latest availability signal. It is a transparent heuristic, not a guaranteed score.</p>
   <h3>Alternatives</h3>
   {alts.map((a,i)=><div className="alt" key={i}><div className="rank">{i+1}</div><div><strong>{a.name}</strong><span>{a.team} · {a.delta}</span><p>{a.reason}</p></div><b>{a.pts.toFixed(1)}</b></div>)}
 </aside></div>
}
function Placeholder({tab,onBack}){return <main className="content"><section className="page-head"><div><div className="eyebrow">{tab.toUpperCase()}</div><h1>{tab}</h1><p>This section is ready for the live optimizer data pipeline.</p></div></section><div className="empty"><div className="empty-number">01</div><h2>{tab==="Transfers"?"Transfer planner":"Watchlist"}</h2><p>The production API can populate this view with live FPL prices, ownership, fixtures and optimizer recommendations.</p><button className="primary" onClick={onBack}>Back to squad</button></div></main>}

createRoot(document.getElementById("root")).render(<App />);
