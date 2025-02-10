/**
 * @fileoverview Página principal para la visualización y gestión de rutas hiperespaciales
 * Muestra un mapa interactivo y estadísticas sobre las rutas del Imperio
 */

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import HyperspaceMap from "@/components/hyperspace/HyperspaceMap";
import { type HyperspaceRoute } from "@shared/schema";

/**
 * Página de Rutas Hiperespaciales
 * 
 * @component
 * @description Página principal que muestra el mapa de rutas hiperespaciales y
 * proporciona información estadística sobre las rutas del Imperio. Incluye una
 * leyenda de colores para los diferentes niveles de peligro.
 * 
 * @returns {JSX.Element} Página completa de rutas hiperespaciales
 */
export default function HyperspacePage() {
  const { data: routes, isLoading } = useQuery<HyperspaceRoute[]>({
    queryKey: ["/api/hyperspace-routes"],
  });

  if (isLoading) {
    return (
      <div className="p-4">
        <Skeleton className="h-[600px] w-full" />
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-red-500">Hyperspace Route Network</h1>
      </div>

      <div className="flex justify-center">
        <HyperspaceMap 
          routes={routes || []} 
          width={800} 
          height={600}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-red-400">Route Legend</h2>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500" />
              <span>Safe Route</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500" />
              <span>Moderate Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500" />
              <span>Dangerous</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500" />
              <span>Extremely Dangerous</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-fuchsia-500" />
              <span>Known Rebel Activity</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-red-400">Statistics</h2>
          <div className="space-y-1 text-sm">
            <p>Total Routes: {routes?.length || 0}</p>
            <p>Safe Routes: {routes?.filter(r => r.dangerLevel === "Safe").length || 0}</p>
            <p>Dangerous Routes: {routes?.filter(r => ["Dangerous", "Extremely Dangerous"].includes(r.dangerLevel)).length || 0}</p>
            <p>Routes with Rebel Activity: {routes?.filter(r => r.dangerLevel === "Rebel Activity").length || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}