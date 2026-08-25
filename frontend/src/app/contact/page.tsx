"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import type { Machine } from "@/lib/types";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import ContactHero from "@/components/public/contact/ContactHero";
import ContactDetails from "@/components/public/contact/ContactDetails";
import InquiryForm from "@/components/public/contact/InquiryForm";
import Badge from "@/components/public/ui/Badge";
import Button from "@/components/public/ui/Button";
import Container from "@/components/public/ui/Container";
import GlassCard from "@/components/public/ui/GlassCard";
export default function ContactPage(){const[machines,setMachines]=useState<Machine[]>([]);const[loadingMachines,setLoadingMachines]=useState(true);useEffect(()=>{async function loadMachines(){try{const response=await api.get<Machine[]>("/api/machines");if(response.success&&response.data)setMachines(response.data.filter(machine=>machine.is_active));}catch(error){console.error("Failed to load machines for inquiry form:",error)}finally{setLoadingMachines(false)}}void loadMachines()},[]);return <main className="min-h-screen overflow-x-hidden bg-[#0B1220] text-white"><Header/><ContactHero/><ContactDetails/><section className="bg-[#090909] py-24 sm:py-32"><Container><div className="grid gap-10 lg:grid-cols-[320px_1fr]"><div><Badge>Send requirement</Badge><h2 className="mt-6 font-display text-5xl font-black leading-[.92] tracking-[-.05em] sm:text-6xl">Start the conversation.</h2><p className="mt-6 leading-8 text-slate-400">Select a machine if you already know what you need. Otherwise, use the requirement field to describe your process.</p></div><GlassCard className="rounded-[2rem] p-2"><div className="rounded-[1.5rem] bg-black/10 p-5 sm:p-8">{loadingMachines?<div className="grid min-h-[500px] place-items-center text-xs uppercase tracking-[.18em] text-slate-500">Loading machine systems...</div>:<InquiryForm machines={machines.map(machine=>({id:machine.id,name:machine.name}))}/>}</div></GlassCard></div></Container></section><section className="bg-[#0B1220] py-24 sm:py-32"><Container><GlassCard className="rounded-[2rem] p-8 sm:p-12"><div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-end"><div><Badge>SG / Next step</Badge><h2 className="mt-6 max-w-4xl font-display text-5xl font-black leading-[.92] tracking-[-.05em] sm:text-6xl">Know the machine you need?</h2></div><div><p className="leading-8 text-slate-400">Explore the machine systems before sending your requirement.</p><Link href="/products" className="mt-7 block"><Button className="w-full">View machines</Button></Link></div></div></GlassCard></Container></section><Footer/></main>}
