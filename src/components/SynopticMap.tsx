"use client";

import { useState, useEffect } from "react";

interface SynopticMapProps {
  apiUrl?: string;
  mapType?: string;
  region?: string;
  forecastHour?: number;
}

export default function SynopticMap({ 
  apiUrl = "http://localhost:8000",
  mapType = "synoptic",
  region = "eastern_med",
  forecastHour = 0
}: SynopticMapProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Construct the image URL with a timestamp to prevent caching
    const url = `${apiUrl}/api/v1/maps/${mapType}/${region}/latest/image?forecast_hour=${forecastHour}&t=${Date.now()}`;
    
    // Preload the image to handle loading state
    const img = new Image();
    img.onload = () => {
      setImageUrl(url);
      setLoading(false);
    };
    img.onerror = () => {
      setError("Failed to load synoptic map image");
      setLoading(false);
    };
    img.src = url;
  }, [apiUrl, mapType, region, forecastHour]);

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
