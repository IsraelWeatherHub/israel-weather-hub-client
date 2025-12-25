"use client";

import { useState } from "react";
import { Cloud, Wind, Droplets, ThermometerSun, ArrowRight } from "lucide-react";
import GFSDashboard from "@/components/GFSDashboard";

export default function ModelsPage() {
  const [selectedModel, setSelectedModel] = useState("gfs");

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar / Model Selection */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <h2 className="font-semibold mb-4 text-slate-900 dark:text-slate-50">Global Models</h2>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setSelectedModel("gfs")}
                  className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-colors ${
                    selectedModel === "gfs" 
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" 
                      : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  GFS
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setSelectedModel("ecmwf")}
                  className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-colors ${
                    selectedModel === "ecmwf" 
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" 
                      : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  ECMWF IFS
                </button>
              </li>
              <li>
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors">
                  ICON (DWD)
                </button>
              </li>
              <li>
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors">
                  UKMO
                </button>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <h2 className="font-semibold mb-4 text-slate-900 dark:text-slate-50">Regional Models</h2>
            <ul className="space-y-2">
              <li>
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors">
                  COSMO-IL
                </button>
              </li>
              <li>
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors">
                  WRF Israel
                </button>
              </li>
            </ul>
          </div>
        </aside>

        {/* Main Content Area */}
        <GFSDashboard model={selectedModel} />
      </div>
    </main>
  );
}
