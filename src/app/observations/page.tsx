import { MapPin, Thermometer, Wind, Droplets, Navigation, Search, Filter } from "lucide-react";

// Mock data for stations
const stations = [
  { id: 1, name: "Jerusalem Centre", region: "Jerusalem", temp: 18.5, humidity: 45, windSpeed: 12, windDir: "NW", rain: 0 },
  { id: 2, name: "Tel Aviv Coast", region: "Coastal Plain", temp: 24.2, humidity: 65, windSpeed: 18, windDir: "W", rain: 0 },
  { id: 3, name: "Haifa Port", region: "Coastal Plain", temp: 23.1, humidity: 70, windSpeed: 15, windDir: "WNW", rain: 0.2 },
  { id: 4, name: "Merom Golan", region: "Golan Heights", temp: 14.8, humidity: 50, windSpeed: 25, windDir: "SW", rain: 0 },
  { id: 5, name: "Be'er Sheva", region: "Negev", temp: 26.5, humidity: 30, windSpeed: 10, windDir: "N", rain: 0 },
  { id: 6, name: "Eilat", region: "Arava", temp: 32.1, humidity: 20, windSpeed: 22, windDir: "NNE", rain: 0 },
  { id: 7, name: "Mitzpe Ramon", region: "Negev", temp: 20.3, humidity: 35, windSpeed: 14, windDir: "NW", rain: 0 },
  { id: 8, name: "Tiberias", region: "Galilee", temp: 28.4, humidity: 55, windSpeed: 8, windDir: "E", rain: 0 },
];

export default function ObservationsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Station Observations</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Real-time data from IMS and private stations</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search station..." 
                className="pl-9 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <Filter className="h-4 w-4" />
              Filter
            </button>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="w-full h-64 md:h-80 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 relative overflow-hidden group">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2948&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
           <div className="absolute inset-0 flex items-center justify-center">
             <button className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 px-6 py-3 rounded-full font-medium shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
               <MapPin className="h-5 w-5 text-blue-500" />
               View Interactive Map
             </button>
           </div>
        </div>

        {/* Stations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {stations.map((station) => (
            <StationCard key={station.id} station={station} />
          ))}
        </div>
      </div>
    </main>
  );
}

function StationCard({ station }: { station: typeof stations[0] }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-slate-50">{station.name}</h3>
          <span className="text-xs font-medium px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-full mt-1 inline-block">
            {station.region}
          </span>
        </div>
        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" title="Live"></div>
      </div>

      <div className="grid grid-cols-2 gap-y-4">
        <div className="flex items-center gap-2">
          <Thermometer className="h-5 w-5 text-red-500" />
          <div>
            <p className="text-xs text-slate-500">Temp</p>
            <p className="font-bold text-lg">{station.temp}°C</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Droplets className="h-5 w-5 text-blue-500" />
          <div>
            <p className="text-xs text-slate-500">Humidity</p>
            <p className="font-bold text-lg">{station.humidity}%</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Wind className="h-5 w-5 text-cyan-500" />
          <div>
            <p className="text-xs text-slate-500">Wind</p>
            <p className="font-bold text-lg">{station.windSpeed} <span className="text-xs font-normal text-slate-400">km/h</span></p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Navigation className="h-5 w-5 text-slate-500" style={{ transform: `rotate(${getWindRotation(station.windDir)}deg)` }} />
          <div>
            <p className="text-xs text-slate-500">Direction</p>
            <p className="font-bold text-lg">{station.windDir}</p>
          </div>
        </div>
      </div>
      
      {station.rain > 0 && (
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
           <span className="text-xs text-slate-500">Rain (Last hr)</span>
           <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{station.rain} mm</span>
        </div>
      )}
    </div>
  );
}

function getWindRotation(dir: string): number {
  const directions: Record<string, number> = {
    'N': 0, 'NNE': 22.5, 'NE': 45, 'ENE': 67.5,
    'E': 90, 'ESE': 112.5, 'SE': 135, 'SSE': 157.5,
    'S': 180, 'SSW': 202.5, 'SW': 225, 'WSW': 247.5,
    'W': 270, 'WNW': 292.5, 'NW': 315, 'NNW': 337.5
  };
  return directions[dir] || 0;
}
