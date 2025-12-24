"use client";

import { useState, useEffect } from "react";
import { Cloud, Wind, ThermometerSun, Play, Pause, ChevronLeft, ChevronRight, Map as MapIcon, Layers, Download } from "lucide-react";
import SynopticMap from "./SynopticMap";

export default function GFSDashboard() {
  const [mapType, setMapType] = useState("t2m");
  const [region, setRegion] = useState("eastern_med");
  const [forecastHour, setForecastHour] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [availableMaps, setAvailableMaps] = useState<Record<string, Record<string, number[]>>>({});
  const [runDate, setRunDate] = useState("");
  const [runHour, setRunHour] = useState("12");
  const [availableHours, setAvailableHours] = useState<number[]>([]);

  useEffect(() => {
    const fetchAvailableMaps = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_MAPS_API_URL || "http://localhost:3000/api/v1";
        const res = await fetch(`${apiUrl}/maps?parameter=${mapType}&region=${region}`);
        if (res.ok) {
          const data = await res.json();
          setAvailableMaps(data);
          
          // Set default run date and hour if not set or not available
          const dates = Object.keys(data).sort();
          if (dates.length > 0) {
            let selectedDate = runDate;
            if (!data[selectedDate]) {
              selectedDate = dates[dates.length - 1]; // Latest date
              setRunDate(selectedDate);
            }
            
            const runs = Object.keys(data[selectedDate]).sort();
            if (!data[selectedDate][runHour]) {
              setRunHour(runs[runs.length - 1]); // Latest run for that date
            }
          } else {
            // No maps available for this parameter
            setAvailableMaps({});
          }
        }
      } catch (e) {
        console.error("Failed to fetch available maps", e);
      }
    };
    
    fetchAvailableMaps();
    const interval = setInterval(fetchAvailableMaps, 60000);
    return () => clearInterval(interval);
  }, [runDate, runHour, mapType, region]);

  useEffect(() => {
    if (availableMaps[runDate] && availableMaps[runDate][runHour]) {
      setAvailableHours(availableMaps[runDate][runHour]);
      // If current forecast hour is not available, snap to nearest or first
      if (!availableMaps[runDate][runHour].includes(forecastHour)) {
        setForecastHour(availableMaps[runDate][runHour][0] || 0);
      }
    } else {
      setAvailableHours([]);
    }
  }, [availableMaps, runDate, runHour]);

  // Animation loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && availableHours.length > 0) {
      interval = setInterval(() => {
        setForecastHour((prev) => {
          const currentIndex = availableHours.indexOf(prev);
          const nextIndex = currentIndex + 1;
          if (nextIndex >= availableHours.length) {
            return availableHours[0];
          }
          return availableHours[nextIndex];
        });
      }, 1000); // 1 second per frame
    }
    return () => clearInterval(interval);
  }, [isPlaying, availableHours]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const stepForward = () => {
    if (availableHours.length === 0) return;
    const currentIndex = availableHours.indexOf(forecastHour);
    const nextIndex = Math.min(currentIndex + 1, availableHours.length - 1);
    setForecastHour(availableHours[nextIndex]);
    setIsPlaying(false);
  };

  const stepBackward = () => {
    if (availableHours.length === 0) return;
    const currentIndex = availableHours.indexOf(forecastHour);
    const prevIndex = Math.max(currentIndex - 1, 0);
    setForecastHour(availableHours[prevIndex]);
    setIsPlaying(false);
  };

  return (
    <div className="flex-1 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">GFS Model Viewer</h1>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm text-slate-500">Run:</p>
            <select 
              value={runDate}
              onChange={(e) => setRunDate(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 text-xs"
            >
              {Object.keys(availableMaps).sort().map(date => (
                <option key={date} value={date}>{date}</option>
              ))}
            </select>
            <select 
              value={runHour}
              onChange={(e) => setRunHour(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 text-xs"
            >
              {availableMaps[runDate] && Object.keys(availableMaps[runDate]).sort().map(run => (
                <option key={run} value={run}>{run}Z</option>
              ))}
            </select>
          </div>
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
          icon={<ThermometerSun className="h-5 w-5" />} 
          label="Temperature (2m)" 
          active={mapType === "t2m"} 
          onClick={() => setMapType("t2m")}
        />
        <ParameterCard 
          icon={<Cloud className="h-5 w-5" />} 
          label="Precipitation" 
          active={mapType === "apcp"} 
          onClick={() => setMapType("apcp")}
        />
        <ParameterCard 
          icon={<Layers className="h-5 w-5" />} 
          label="Synoptic (500hPa)" 
          active={mapType === "synoptic"} 
          onClick={() => setMapType("synoptic")}
        />
      </div>

      {/* Map Display */}
      <SynopticMap 
        parameter={mapType}
        model="gfs"
        runDate={runDate}
        runHour={runHour}
        forecastHour={forecastHour}
        region={region}
      />

      {/* Time Control */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="flex justify-between items-center mb-4">
           <div className="flex items-center gap-2">
             <button 
               onClick={togglePlay}
               disabled={availableHours.length === 0}
               className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
             >
               {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
             </button>
             <div className="flex gap-1">
               <button onClick={stepBackward} disabled={availableHours.length === 0} className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 disabled:opacity-50">
                 <ChevronLeft className="h-6 w-6" />
               </button>
               <button onClick={stepForward} disabled={availableHours.length === 0} className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 disabled:opacity-50">
                 <ChevronRight className="h-6 w-6" />
               </button>
             </div>
             <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
           </div>
           <div className="text-right">
             <span className="text-2xl font-mono font-bold text-slate-900 dark:text-slate-50">+{forecastHour}h</span>
             <p className="text-xs text-slate-500">Forecast Hour</p>
           </div>
        </div>
        
        <input 
          type="range" 
          min="0" 
          max={availableHours.length > 0 ? availableHours.length - 1 : 0}
          step="1" 
          value={availableHours.indexOf(forecastHour) !== -1 ? availableHours.indexOf(forecastHour) : 0}
          onChange={(e) => {
            const index = parseInt(e.target.value);
            if (availableHours[index] !== undefined) {
              setForecastHour(availableHours[index]);
            }
            setIsPlaying(false);
          }}
          disabled={availableHours.length === 0}
          className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600 disabled:opacity-50"
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
