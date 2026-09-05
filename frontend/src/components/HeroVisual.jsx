import React, { useState } from 'react';
import { Shirt, Wrench, Heart, Scissors, RefreshCw, ArrowRight } from 'lucide-react';

export default function HeroVisual({ onSelectOption }) {
  const [activeNode, setActiveNode] = useState(null);

  const satelliteNodes = [
    {
      id: 'repair',
      label: 'REPAIR',
      icon: Wrench,
      position: 'top-[0%] left-1/2 -translate-x-1/2',
      color: 'text-[#46684E] bg-[#E8F0EA] border-[#BDD4C3]',
      desc: 'Mend small tears, buttons & seams'
    },
    {
      id: 'reuse',
      label: 'REUSE',
      icon: Shirt,
      position: 'top-[25%] right-[2%]',
      color: 'text-[#3E6A85] bg-[#E5EEF4] border-[#B8D2E3]',
      desc: 'Restyle or wear differently'
    },
    {
      id: 'donate',
      label: 'DONATE',
      icon: Heart,
      position: 'bottom-[12%] right-[8%]',
      color: 'text-[#966548] bg-[#F7ECE6] border-[#DEC4B5]',
      desc: 'Pass forward to community'
    },
    {
      id: 'upcycle',
      label: 'UPCYCLE',
      icon: Scissors,
      position: 'bottom-[0%] left-1/2 -translate-x-1/2',
      color: 'text-[#765187] bg-[#EFE6F4] border-[#D1BDDB]',
      desc: 'Transform into bags & crafts'
    },
    {
      id: 'recycle',
      label: 'RECYCLE',
      icon: RefreshCw,
      position: 'bottom-[12%] left-[8%]',
      color: 'text-[#44755B] bg-[#E6EFEA] border-[#B8D9C5]',
      desc: 'Reclaim raw textile fibers'
    }
  ];

  return (
    <div className="relative w-full max-w-xl mx-auto aspect-[16/13] sm:aspect-square flex items-center justify-center p-2 select-none">
      
      {/* LEFT INPUT: OLD CLOTHING Frosted Card */}
      <div className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-30 flex items-center gap-2 sm:gap-3">
        <div className="glass-card rounded-2xl sm:rounded-3xl p-3 sm:p-4 text-center shadow-glass border border-white/95 bg-white/75 hover:bg-white/90 transition-all flex flex-col items-center">
          <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-[#5A6E60] uppercase mb-1.5">
            OLD CLOTHING
          </span>
          <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-[#F4EFE6] border border-[#DDD5C7] flex items-center justify-center text-[#5A6E60] shadow-inner">
            <Shirt className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.6]" />
          </div>
        </div>

        {/* Arrow into the circular lifecycle */}
        <div className="text-[#688E6D] font-bold hidden sm:flex items-center">
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </div>
      </div>

      {/* CIRCULAR ORBIT CONTAINER */}
      <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] ml-16 sm:ml-24 flex items-center justify-center">
        
        {/* Subtle Orbital Dotted Path with Glowing Points */}
        <div className="absolute inset-1 rounded-full border border-dashed border-[#5A7E64]/35 pointer-events-none" />
        <div className="absolute inset-6 rounded-full border border-white/40 pointer-events-none" />

        {/* Small glowing dots on orbit */}
        <div className="absolute top-[12%] left-[24%] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#fff]" />
        <div className="absolute top-[12%] right-[24%] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#fff]" />
        <div className="absolute bottom-[28%] left-[4%] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#fff]" />
        <div className="absolute bottom-[28%] right-[4%] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#fff]" />

        {/* CENTER GLOWING SPHERICAL GLASS HUB */}
        <div className="relative z-20 flex flex-col items-center justify-center w-28 h-28 sm:w-36 sm:h-36 rounded-full glass-panel shadow-[0_16px_48px_0_rgba(85,122,96,0.25)] border-2 border-white/95 text-center p-2 bg-gradient-to-b from-white/95 via-[#F7FAF8]/85 to-[#E5EEE8]/90 transition-transform duration-300 hover:scale-105">
          {/* Subtle green loop icon */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#527557]/15 flex items-center justify-center text-[#527557] mb-1">
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2C9.5 2 7.5 4 7.5 6.5C7.5 9 10 11 12 12C14 11 16.5 9 16.5 6.5C16.5 4 14.5 2 12 2Z" />
              <path d="M12 22C14.5 22 16.5 20 16.5 17.5C16.5 15 14 13 12 12C10 13 7.5 15 7.5 17.5C7.5 20 9.5 22 12 22Z" />
              <path d="M2 12C2 14.5 4 16.5 6.5 16.5C9 16.5 11 14 12 12C11 10 9 7.5 6.5 7.5C4 7.5 2 9.5 2 12Z" />
              <path d="M22 12C22 9.5 20 7.5 17.5 7.5C15 7.5 13 10 12 12C13 14 15 16.5 17.5 16.5C20 16.5 22 14.5 22 12Z" />
            </svg>
          </div>
          <span className="font-editorial text-sm sm:text-base font-bold text-[#1F2E24] tracking-tight">
            ReThread
          </span>
          <span className="text-[9px] sm:text-[10px] text-[#5A6E60] font-medium leading-none">
            Give it another life
          </span>
        </div>

        {/* ORBITING 5 SATELLITE ACTION NODES */}
        {satelliteNodes.map((node) => {
          const IconComp = node.icon;
          const isHovered = activeNode === node.id;

          return (
            <div
              key={node.id}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
              onClick={() => onSelectOption && onSelectOption(node.id)}
              className={`absolute ${node.position} z-30 cursor-pointer transition-all duration-300`}
            >
              <div
                className={`flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl glass-card border shadow-sm transition-all duration-300 ${
                  isHovered
                    ? 'scale-110 shadow-lg bg-white/95 border-[#527557]'
                    : 'bg-white/70 hover:bg-white/90'
                }`}
              >
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center mb-0.5 border ${node.color}`}
                >
                  <IconComp className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
                </div>
                <span className="text-[9px] sm:text-[10px] font-bold tracking-wider text-[#1F2E24]">
                  {node.label}
                </span>
              </div>

              {/* Tooltip on Hover */}
              {isHovered && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-44 p-2.5 rounded-2xl glass-panel shadow-lg border border-white text-center z-40 pointer-events-none">
                  <p className="text-[11px] font-bold text-[#1F2E24]">{node.label}</p>
                  <p className="text-[10px] text-[#5A6E60] leading-tight mt-0.5">{node.desc}</p>
                </div>
              )}
            </div>
          );
        })}

      </div>
    </div>
  );
}
