"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function BookingBar() {
  const router = useRouter();
  const [needDate, setNeedDate] = useState("");
  const [needTime, setNeedTime] = useState("");
  const [needLocation, setNeedLocation] = useState("");
  const [needTask, setNeedTask] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const search = new URLSearchParams();
    if (needDate) search.set("date", needDate);
    if (needTime) search.set("time", needTime);
    if (needLocation) search.set("location", needLocation);
    if (needTask) search.set("task", needTask);
    
    router.push(`/booking?${search.toString()}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto z-40 relative">
      <form 
        onSubmit={handleSearch} 
        className="flex flex-col md:flex-row items-center gap-2 bg-white/90 backdrop-blur-xl p-3 md:p-2 rounded-[2rem] md:rounded-full shadow-2xl border border-white/40"
      >
        <div className="flex-1 flex flex-col md:flex-row items-center gap-2 w-full md:w-auto px-4">
          
          <label className="flex flex-col w-full md:w-1/4 border-b md:border-b-0 md:border-r border-neutral-200 pb-2 md:pb-0 md:pr-4 py-2">
            <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">Wann?</span>
            <input 
              type="date" 
              value={needDate}
              onChange={(e) => setNeedDate(e.target.value)}
              className="bg-transparent text-sm font-semibold text-neutral-900 outline-none w-full"
            />
          </label>
          
          <label className="flex flex-col w-full md:w-1/4 border-b md:border-b-0 md:border-r border-neutral-200 pb-2 md:pb-0 md:px-4 py-2">
            <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">Uhrzeit</span>
            <input 
              type="time" 
              value={needTime}
              onChange={(e) => setNeedTime(e.target.value)}
              className="bg-transparent text-sm font-semibold text-neutral-900 outline-none w-full"
            />
          </label>

          <label className="flex flex-col w-full md:w-1/4 border-b md:border-b-0 md:border-r border-neutral-200 pb-2 md:pb-0 md:px-4 py-2">
            <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">Wo?</span>
            <input 
              type="text" 
              placeholder="PLZ oder Stadt"
              value={needLocation}
              onChange={(e) => setNeedLocation(e.target.value)}
              className="bg-transparent text-sm font-semibold text-neutral-900 outline-none w-full placeholder:font-normal placeholder:text-neutral-400"
            />
          </label>

          <label className="flex flex-col w-full md:w-1/4 md:px-4 py-2">
            <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">Was tun?</span>
            <input 
              type="text" 
              placeholder="Rasenmähen, Hecke..."
              value={needTask}
              onChange={(e) => setNeedTask(e.target.value)}
              className="bg-transparent text-sm font-semibold text-neutral-900 outline-none w-full placeholder:font-normal placeholder:text-neutral-400"
            />
          </label>

        </div>
        
        <button 
          type="submit" 
          className="w-full md:w-auto h-12 md:h-14 px-8 rounded-full bg-forest-700 text-white font-bold tracking-tight hover:bg-forest-800 transition-colors shadow-lg shadow-forest-900/20 whitespace-nowrap"
        >
          Suchen
        </button>
      </form>
    </div>
  );
}
