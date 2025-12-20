"use client";

import { useState, useEffect } from "react";

interface SynopticMapProps {
  apiUrl?: string;
  mapType?: string;
  region?: string;
  forecastHour?: number;
}

// Cache to store downloaded map images
export const mapCache = new Map<string, string>();

export const prefetchMap = async (
  apiUrl: string,
  mapType: string,
  region: string,
  forecastHour: number
) => {
  const cacheKey = `${mapType}-${region}-${forecastHour}`;
  if (mapCache.has(cacheKey)) return;

  const url = `${apiUrl}/api/v1/maps/${mapType}/${region}/latest/image?forecast_hour=${forecastHour}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch");
    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);
    mapCache.set(cacheKey, objectUrl);
  } catch (err) {
    console.error(`Failed to prefetch map for hour ${forecastHour}`, err);
  }
};

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
    let isMounted = true;
    const cacheKey = `${mapType}-${region}-${forecastHour}`;

    // Check if image is already in cache
    if (mapCache.has(cacheKey)) {
      setImageUrl(mapCache.get(cacheKey)!);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    // Construct the image URL without timestamp to allow browser caching as well
    const url = `${apiUrl}/api/v1/maps/${mapType}/${region}/latest/image?forecast_hour=${forecastHour}`;
    
    fetch(url)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch image");
        const blob = await res.blob();
        if (isMounted) {
          const objectUrl = URL.createObjectURL(blob);
          mapCache.set(cacheKey, objectUrl);
          setImageUrl(objectUrl);
          setLoading(false);
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
