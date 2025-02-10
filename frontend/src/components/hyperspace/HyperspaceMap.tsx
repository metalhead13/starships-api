/**
 * @fileoverview Componente para visualizar rutas hiperespaciales del Imperio Galáctico
 * Renderiza un mapa interactivo que muestra las rutas entre diferentes puntos del espacio,
 * con indicadores de nivel de peligro y distancia.
 */

import { useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { type HyperspaceRoute } from "@shared/schema";

interface HyperspaceMapProps {
  /** Lista de rutas hiperespaciales a visualizar */
  routes: HyperspaceRoute[];
  /** Ancho del mapa en píxeles */
  width?: number;
  /** Alto del mapa en píxeles */
  height?: number;
}

/**
 * Componente HyperspaceMap
 *
 * @component
 * @description Visualiza rutas hiperespaciales en un canvas HTML5, mostrando
 * las conexiones entre diferentes puntos del espacio con códigos de color
 * basados en el nivel de peligro.
 *
 * @param {HyperspaceMapProps} props - Propiedades del componente
 * @param {HyperspaceRoute[]} props.routes - Array de rutas a visualizar
 * @param {number} [props.width=800] - Ancho del canvas en píxeles
 * @param {number} [props.height=600] - Alto del canvas en píxeles
 *
 * @returns {JSX.Element} Mapa de rutas hiperespaciales renderizado
 */
export default function HyperspaceMap({
  routes,
  width = 800,
  height = 600,
}: HyperspaceMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Limpiar canvas y establecer fondo
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);

    // Dibujar cuadrícula de referencia
    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = 1;
    const gridSize = 50;

    // Líneas verticales de la cuadrícula
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Líneas horizontales de la cuadrícula
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Renderizar cada ruta hiperespacial
    routes.forEach((route) => {
      // Dibujar línea de la ruta
      ctx.beginPath();
      ctx.moveTo(route.startPoint.x, route.startPoint.y);
      ctx.lineTo(route.endPoint.x, route.endPoint.y);

      // Asignar color según nivel de peligro
      switch (route.dangerLevel) {
        case "Safe":
          ctx.strokeStyle = "#00ff00"; // Verde para rutas seguras
          break;
        case "Moderate":
          ctx.strokeStyle = "#ffff00"; // Amarillo para riesgo moderado
          break;
        case "Dangerous":
          ctx.strokeStyle = "#ff9900"; // Naranja para rutas peligrosas
          break;
        case "Extremely Dangerous":
          ctx.strokeStyle = "#ff0000"; // Rojo para rutas extremadamente peligrosas
          break;
        case "Rebel Activity":
          ctx.strokeStyle = "#ff00ff"; // Magenta para actividad rebelde
          break;
      }

      ctx.lineWidth = 2;
      ctx.stroke();

      // Dibujar puntos de inicio y fin
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(route.startPoint.x, route.startPoint.y, 4, 0, Math.PI * 2);
      ctx.arc(route.endPoint.x, route.endPoint.y, 4, 0, Math.PI * 2);
      ctx.fill();

      // Agregar etiquetas de texto
      ctx.fillStyle = "#888888";
      ctx.font = "12px monospace";
      ctx.fillText(
        route.name,
        (route.startPoint.x + route.endPoint.x) / 2,
        (route.startPoint.y + route.endPoint.y) / 2
      );
    });
  }, [routes, width, height]);

  return (
    <Card className="p-4 bg-black border-red-900/30">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="rounded-lg"
      />
    </Card>
  );
}
