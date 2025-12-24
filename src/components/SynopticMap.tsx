"use client";

import { useState, useEffect } from "react";

interface SynopticMapProps {
  apiUrl?: string;
  model?: string;
  runDate?: string;
  runHour?: string;
  parameter?: string;
  forecastHour?: number;
  region?: string;
}

export default function SynopticMap({ 
  apiUrl = process.env.NEXT_PUBLIC_MAPS_API_URL || "http://localhost:3000/api/v1",
  model = "gfs",
  runDate = "20251221", // Default for dev
  runHour = "12",
  parameter = "t2m",
  forecastHour = 0,
  region = "israel"
}: SynopticMapProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fHourStr = forecastHour.toString().padStart(3, '0');

    setLoading(true);
    setError(null);

    const url = `${apiUrl}/maps/${model}/${runDate}/${runHour}/${parameter}/${fHourStr}/${region}`;
    
    fetch(url)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch image info");
        const data = await res.json();
        if (isMounted && data.url) {
          setImageUrl(data.url);
          setLoading(false);
        } else if (isMounted) {
            throw new Error("No URL in response");
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Error loading map:", err);
          setError("Failed to load synoptic map image");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [apiUrl, model, runDate, runHour, parameter, forecastHour, region]);

  if (error) {
    return (
      <div className="w-full h-[600px] bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 relative min-h-[400px]">
      {loading && (
        <div className="absolute inset-0 z-10 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt="Synoptic Weather Map" 
          className="w-full h-auto object-contain"
        />
      )}
    </div>
  );
}
