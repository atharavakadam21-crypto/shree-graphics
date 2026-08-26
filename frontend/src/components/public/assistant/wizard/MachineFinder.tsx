"use client";

import { useEffect, useMemo, useState } from "react";
import { machineQuestions } from "./machineQuestions";
import QuestionCard from "./QuestionCard";
import ResultCard from "./ResultCard";
import StepIndicator from "./StepIndicator";

interface Answers { process?: string; priority?: string; stage?: string; }
interface Machine { id?: string; name: string; slug: string; description?: string | null; short_description?: string | null; specifications?: Record<string, unknown> | null; featured?: boolean; }
const API = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:5000";
const keywords: Record<string, string[]> = { flexo:["flexo","flexographic","printing"], slitting:["slit","slitting","slitter"], "die-cutting":["die cut","die-cut"], rewinding:["rewind","rewinder","inspection"], core:["core cutting","core cutter","paper core"] };

function scoreMachine(machine: Machine, answers: Answers) {
  const text = `${machine.name} ${machine.short_description ?? ""} ${machine.description ?? ""} ${Object.values(machine.specifications ?? {}).join(" ")}`.toLowerCase();
  let score = machine.featured ? 1 : 0;
  for (const word of keywords[answers.process ?? ""] ?? []) if (text.includes(word)) score += 8;
  if (answers.priority === "speed" && /(speed|high-speed|fast)/.test(text)) score += 3;
  if (answers.priority === "precision" && /(precision|accur|micro|inspection)/.test(text)) score += 3;
  if (answers.priority === "versatility" && /(multi|flexible|variable|custom)/.test(text)) score += 3;
  if (answers.stage === "ready") score += machine.featured ? 2 : 0;
  return score;
}

export default function MachineFinder() {
  const [step, setStep] = useState(0); const [answers, setAnswers] = useState<Answers>({}); const [complete, setComplete] = useState(false); const [machines, setMachines] = useState<Machine[]>([]); const [loading, setLoading] = useState(false);
  useEffect(() => { fetch(`${API}/api/machines`).then(r=>r.ok?r.json():null).then(r=>{ if(r?.success && Array.isArray(r.data)) setMachines(r.data); }).catch(()=>undefined); }, []);
  const question = machineQuestions[step];
  const selected = useMemo(() => question ? answers[question.id as keyof Answers] : undefined, [answers, question]);
  const handleSelect = (value: string) => { const key=question.id as keyof Answers; setAnswers(current=>({...current,[key]:value})); window.setTimeout(()=>{ if(step<machineQuestions.length-1) setStep(current=>current+1); else { setLoading(true); setComplete(true); window.setTimeout(()=>setLoading(false),180); } },180); };
  const restart=()=>{setAnswers({});setStep(0);setComplete(false);};
  const ranked = useMemo(()=>machines.map(machine=>({machine,score:scoreMachine(machine,answers)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score),[machines,answers]);
  if(complete){ const best=ranked[0]?.machine; const processLabel=(answers.process??"production").replace(/-/g," "); const priorityNote=answers.priority?` with emphasis on ${answers.priority}`:""; const stageNote=answers.stage==="research"?" Compare the options and narrow down your requirements before speaking with our team.":answers.stage==="ready"?" You look ready to discuss configuration and quotation with our team.":" Use the recommendation as a starting point and refine the specification with our team."; return <><StepIndicator current={machineQuestions.length-1} total={machineQuestions.length}/>{loading?<div className="py-8 text-center text-sm text-slate-300">Shree AI is analysing the current machine range…</div>:<ResultCard machineName={best?.name ?? "Shree Graphics Machine Range"} reason={best?`Based on your ${processLabel} requirement${priorityNote}, this is the strongest match in our current machine range.${stageNote}`:"We could not confidently match a single machine from the current catalogue. Our engineering team can recommend the right configuration for your application."} slug={best?.slug} onRestart={restart}/>}</>; }
  return <><StepIndicator current={step} total={machineQuestions.length}/><QuestionCard question={question.question} description={question.description} options={question.options} selected={selected} onSelect={handleSelect}/></>;
}
