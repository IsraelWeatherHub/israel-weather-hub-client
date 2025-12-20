"use client";

import { useState, useEffect } from "react";
import { Cloud, Wind, ThermometerSun, Play, Pause, ChevronLeft, ChevronRight, Map as MapIcon, Layers, Download } from "lucide-react";
import SynopticMap, { prefetchMap } from "./SynopticMap";

export default function GFSDashboard() {
  const [mapType, setMapType] = useState("synoptic");
  const [region, setRegion] = useState("eastern_med");
  const [forecastHour, setForecastHour] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [cachingProgress, setCachingProgress] = useState<{current: number, total: number} | null>(null);

  // Animation loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setForecastHour((prev) => {
          const next = prev + 6;
          return next > 120 ? 0 : next; // Loop back after 120h (5 days)
        });
      }, 1000); // 1 second per frame
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const stepForward = () => {
    setForecastHour(prev => Math.min(prev + 6, 384));
    setIsPlaying(false);
  };

  const stepBackward = () => {
    setForecastHour(prev => Math.max(prev - 6, 0));
    setIsPlaying(false);
  };

  const handleCacheRun = async () => {
    const maxHour = 384; // Cache full run (16 days)
    const step = 6;
    const hours = [];
    for (let h = 0; h <= maxHour; h += step) hours.push(h);
    
    setCachingProgress({ current: 0, total: hours.length });
    setIsPlaying(false);

    for (let i = 0; i < hours.length; i++) {
      await prefetchMap("http://localhost:8000", mapType, region, hours[i]);
      setCachingProgress({ current: i + 1, total: hours.length });
    }
    
    setCachingProgress(null);
  };

  return (
    <div className="flex-1 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">GFS Model Viewer</h1>
          <p className="text-sm text-slate-500">Run: Latest (0.25°)</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
           <select 
             value={region}
             onChange={(e) => setRegion(e.target.value)}
             className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm w-full sm:w-auto"
           >
             <option value="eastern_med">Eastern Mediterranean</option>
             <option value="israel">Israel (Local)</option>
             <option value="europe">Europe</option>
             <option value="middle_east">Middle East</option>
           </select>
        </div>
      </div>

      {/* Parameter/Map Type Selection */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <ParameterCard 
          icon={<Layers className="h-5 w-5" />} 
          label="Synoptic (Combined)" 
          active={mapType === "synoptic"} 
          onClick={() => setMapType("synoptic")}
        />
        <ParameterCard 
          icon={<ThermometerSun className="h-5 w-5" />} 
          label="500mb Height" 
          active={mapType === "hgt500"} 
          onClick={() => setMapType("hgt500")}
        />
        <ParameterCard 
          icon={<Wind className="h-5 w-5" />} 
          label="MSLP (Isobars)" 
          active={mapType === "mslp"} 
          onClick={() => setMapType("mslp")}
        />
        <ParameterCard 
          icon={<Cloud className="h-5 w-5" />} 
          label="Cloud Cover (Coming Soon)" 
          active={false}
          onClick={() => {}}
        />
      </div>

      {/* Map Display */}
      <SynopticMap 
        mapType={mapType}
        region={region}
        forecastHour={forecastHour}
      />

      {/* Time Control */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="flex justify-between items-center mb-4">
           <div className="flex items-center gap-2">
             <button 
               onClick={togglePlay}
               className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
             >
               {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
             </button>
             <div className="flex gap-1">
               <button onClick={stepBackward} className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-slate-300">
                 <ChevronLeft className="h-6 w-6" />
               </button>
               <button onClick={stepForward} className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-slate-300">
                 <ChevronRight className="h-6 w-6" />
               </button>
             </div>
             <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
             <div className="relative">
               <button 
                 onClick={handleCacheRun}
                 disabled={!!cachingProgress}
                 className="relative overflow-hidden flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:cursor-not-allowed transition-colors"
               >
                 {cachingProgress && (
                   <div 
                     className="absolute inset-0 bg-blue-200 dark:bg-blue-900/60 transition-all duration-300 ease-out"
                     style={{ width: `${(cachingProgress.current / cachingProgress.total) * 100}%` }}
                   />
                 )}
                 <div className="relative flex items-center gap-2 z-10">
                   <Download className={`h-3.5 w-3.5 ${cachingProgress ? 'animate-bounce' : ''}`} />
                   {cachingProgress 
                     ? `Caching ${Math.round((cachingProgress.current / cachingProgress.total) * 100)}%` 
                     : "Cache Full Run (16 Days)"}
                 </div>
               </button>
             </div>
           </div>
           <div className="text-right">
             <span className="text-2xl font-mono font-bold text-slate-900 dark:text-slate-50">+{forecastHour}h</span>
             <p className="text-xs text-slate-500">Forecast Hour</p>
           </div>
        </div>
        
        <input 
          type="range" 
          min="0" 
          max="384" 
          step="6" 
          value={forecastHour}
          onChange={(e) => {
            setForecastHour(parseInt(e.target.value));
            setIsPlaying(false);
          }}
          className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-2">
          <span>Analysis</span>
          <span>+120h (5 Days)</span>
          <span>+240h (10 Days)</span>
          <span>+384h (16 Days)</span>
        </div>
      </div>
    </div>
  );
}

function ParameterCard({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
      active 
        ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 shadow-sm' 
        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 text-slate-600 dark:text-slate-400'
    }`}>
      {icon}
      <span className="font-medium text-sm">{label}</span>
    </button>
  );
}
