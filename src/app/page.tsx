import { CloudSun, Wind, Map, Thermometer, BarChart3, FileText } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <main className="container mx-auto px-4 py-12">
        <section className="mb-16 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
            Professional Forecasting Tools for Israel
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Access real-time data, advanced meteorological models, and collaborative tools designed specifically for Israeli weather professionals.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Open Dashboard
            </button>
            <button className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-50 px-6 py-3 rounded-lg font-medium transition-colors">
              View Documentation
            </button>
          </div>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <FeatureCard 
            icon={<Map className="h-6 w-6 text-blue-500" />}
            title="Synoptic Maps"
            description="Interactive synoptic charts with real-time updates and historical archives."
          />
          <FeatureCard 
            icon={<Wind className="h-6 w-6 text-cyan-500" />}
            title="Model Data"
            description="Direct access to ECMWF, GFS, and ICON models with localized high-resolution output."
          />
          <FeatureCard 
            icon={<Thermometer className="h-6 w-6 text-red-500" />}
            title="Station Observations"
            description="Live data from IMS and private weather stations across the country."
          />
          <FeatureCard 
            icon={<FileText className="h-6 w-6 text-purple-500" />}
            title="Forecast Generator"
            description="AI-assisted tools to draft, edit, and publish forecasts for different regions."
          />
          <FeatureCard 
            icon={<BarChart3 className="h-6 w-6 text-green-500" />}
            title="Climate Analysis"
            description="Long-term climate data analysis tools and seasonal comparison charts."
          />
          <FeatureCard 
            icon={<CloudSun className="h-6 w-6 text-orange-500" />}
            title="Satellite & Radar"
            description="High-definition satellite imagery and rain radar integration."
          />
        </section>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
      <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg w-fit">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400">{description}</p>
    </div>
  );
}
