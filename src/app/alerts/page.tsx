import { AlertTriangle, Info, AlertOctagon, Map, Calendar, Clock, ChevronRight } from "lucide-react";

// Mock data for alerts
const alerts = [
  {
    id: 1,
    severity: "extreme", // extreme, severe, moderate, minor
    type: "Flash Flood Warning",
    region: "Judean Desert & Dead Sea",
    startTime: "Today, 12:00",
    endTime: "Tomorrow, 18:00",
    description: "Heavy rainfall expected to cause flash floods in wadis. Hiking is strictly prohibited in affected areas.",
    instruction: "Avoid low-lying areas and flood-prone roads. Do not attempt to cross flowing water."
  },
  {
    id: 2,
    severity: "severe",
    type: "Heatwave",
    region: "Jordan Valley & Arava",
    startTime: "Tomorrow, 10:00",
    endTime: "Thursday, 19:00",
    description: "Extreme temperatures reaching 42-45°C. High risk of heat exhaustion and dehydration.",
    instruction: "Drink plenty of water, stay in air-conditioned places, and avoid strenuous outdoor activities."
  },
  {
    id: 3,
    severity: "moderate",
    type: "Strong Winds",
    region: "Coastal Plain",
    startTime: "Today, 14:00",
    endTime: "Today, 22:00",
    description: "South-westerly winds of 40-60 km/h with gusts up to 80 km/h.",
    instruction: "Secure loose outdoor objects. Be cautious when driving high-sided vehicles."
  },
  {
    id: 4,
    severity: "minor",
    type: "High UV Index",
    region: "Nationwide",
    startTime: "Daily, 10:00",
    endTime: "Daily, 16:00",
    description: "UV Index expected to reach level 9-10.",
    instruction: "Wear sun protection, hat, and sunglasses when outdoors."
  }
];

export default function AlertsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-orange-500" />
              Weather Alerts
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Official warnings and advisories for Israel</p>
          </div>
          <div className="flex gap-3">
             <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
               <Info className="h-4 w-4" />
               Subscribe to Alerts
             </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Alerts List */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-2">Active Warnings</h2>
            {alerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>

          {/* Sidebar / Map */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold mb-4 text-slate-900 dark:text-slate-50 flex items-center gap-2">
                <Map className="h-5 w-5 text-slate-500" />
                Alert Map
              </h3>
              <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-lg relative overflow-hidden">
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1624314138470-5a2f24623f10?q=80&w=2836&auto=format&fit=crop')] bg-cover bg-center opacity-50"></div>
                 {/* Mock overlay elements */}
                 <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-red-500/30 rounded-full animate-pulse border border-red-500"></div>
                 <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-orange-500/30 rounded-full border border-orange-500"></div>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="text-slate-600 dark:text-slate-400">Extreme Warning</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                  <span className="text-slate-600 dark:text-slate-400">Severe Warning</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                  <span className="text-slate-600 dark:text-slate-400">Moderate Warning</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800">
              <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Safety Guidelines</h3>
              <p className="text-sm text-blue-700 dark:text-blue-400 mb-3">
                Always follow instructions from local authorities and emergency services during severe weather events.
              </p>
              <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                View Emergency Contacts <ChevronRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function AlertCard({ alert }: { alert: typeof alerts[0] }) {
  const severityConfig = {
    extreme: { color: "bg-red-50 dark:bg-red-900/20", border: "border-red-200 dark:border-red-800", iconColor: "text-red-600 dark:text-red-400", badge: "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300" },
    severe: { color: "bg-orange-50 dark:bg-orange-900/20", border: "border-orange-200 dark:border-orange-800", iconColor: "text-orange-600 dark:text-orange-400", badge: "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300" },
    moderate: { color: "bg-yellow-50 dark:bg-yellow-900/20", border: "border-yellow-200 dark:border-yellow-800", iconColor: "text-yellow-600 dark:text-yellow-400", badge: "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300" },
    minor: { color: "bg-slate-50 dark:bg-slate-900", border: "border-slate-200 dark:border-slate-800", iconColor: "text-slate-600 dark:text-slate-400", badge: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300" },
  };

  const config = severityConfig[alert.severity as keyof typeof severityConfig];

  return (
    <div className={`rounded-xl border ${config.border} ${config.color} p-5 transition-all hover:shadow-md`}>
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
        <div className="flex items-start gap-3">
          <AlertOctagon className={`h-6 w-6 mt-1 flex-shrink-0 ${config.iconColor}`} />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-lg text-slate-900 dark:text-slate-50">{alert.type}</h3>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full uppercase ${config.badge}`}>
                {alert.severity}
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 font-medium">{alert.region}</p>
          </div>
        </div>
        <div className="flex flex-col sm:items-end text-sm text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-black/20 p-2 rounded-lg">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <span>{alert.startTime}</span>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <Clock className="h-3.5 w-3.5" />
            <span>Until {alert.endTime}</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-3 pl-0 sm:pl-9">
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          {alert.description}
        </p>
        <div className="bg-white/60 dark:bg-black/20 p-3 rounded-lg text-sm border border-slate-200/50 dark:border-slate-700/50">
          <span className="font-semibold text-slate-900 dark:text-slate-200 mr-1">Instruction:</span>
          <span className="text-slate-700 dark:text-slate-300">{alert.instruction}</span>
        </div>
      </div>
    </div>
  );
}
