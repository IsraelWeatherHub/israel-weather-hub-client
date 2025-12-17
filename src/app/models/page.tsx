import { Cloud, Wind, Droplets, ThermometerSun, ArrowRight } from "lucide-react";

export default function ModelsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar / Model Selection */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <h2 className="font-semibold mb-4 text-slate-900 dark:text-slate-50">Global Models</h2>
            <ul className="space-y-2">
              <li>
                <button className="w-full text-left px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium">
                  ECMWF IFS
                </button>
              </li>
              <li>
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors">
                  GFS (NOAA)
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
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">ECMWF IFS 0.1°</h1>
              <p className="text-sm text-slate-500">Run: 12Z (Updated 14:30)</p>
            </div>
            <div className="flex gap-2">
               <select className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm">
                 <option>Israel (Local)</option>
                 <option>Eastern Mediterranean</option>
                 <option>Europe</option>
               </select>
            </div>
          </div>

          {/* Parameter Selection */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <ParameterCard icon={<ThermometerSun className="h-5 w-5" />} label="Temperature" active />
            <ParameterCard icon={<Droplets className="h-5 w-5" />} label="Precipitation" />
            <ParameterCard icon={<Wind className="h-5 w-5" />} label="Wind" />
            <ParameterCard icon={<Cloud className="h-5 w-5" />} label="Cloud Cover" />
          </div>

          {/* Map/Chart Placeholder */}
          <div className="bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 aspect-video flex items-center justify-center relative overflow-hidden group">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=2831&auto=format&fit=crop')] bg-cover bg-center opacity-50 group-hover:scale-105 transition-transform duration-700"></div>
             <div className="relative z-10 text-center p-6 bg-white/90 dark:bg-black/80 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl">
                <p className="font-medium text-lg mb-2">Interactive Map Visualization</p>
                <p className="text-sm text-slate-500 mb-4">Select a parameter to view forecast layers</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 mx-auto">
                  Launch Viewer <ArrowRight className="h-4 w-4" />
                </button>
             </div>
          </div>

          {/* Time Slider Placeholder */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between text-xs text-slate-500 mb-2">
              <span>Tue 12:00</span>
              <span>Wed 12:00</span>
              <span>Thu 12:00</span>
              <span>Fri 12:00</span>
              <span>Sat 12:00</span>
            </div>
            <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
               <div className="absolute left-0 top-0 bottom-0 w-1/4 bg-blue-600 rounded-full"></div>
            </div>
            <div className="mt-4 flex justify-between items-center">
               <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Play Animation</button>
               <span className="text-sm font-mono text-slate-600 dark:text-slate-400">T+24h</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function ParameterCard({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
      active 
        ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300' 
        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 text-slate-600 dark:text-slate-400'
    }`}>
      {icon}
      <span className="font-medium text-sm">{label}</span>
    </button>
  );
}
