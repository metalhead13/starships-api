import { Link } from "wouter";
import { Home, Ship, Orbit } from "lucide-react";
import { GiDeathStar } from "react-icons/gi";

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-black border-r border-red-900/30 flex flex-col">
      <div className="p-6 border-b border-red-900/30 flex flex-col items-center bg-gradient-to-b from-black to-red-950/20">
        <GiDeathStar className="h-16 w-16 text-red-600 mb-2 animate-pulse" />
        <h1 className="text-xl font-bold text-red-500">Imperial Fleet</h1>
      </div>

      <div className="p-6 border-b border-red-900/30 bg-gradient-to-r from-black to-red-950/10">
        <h2 className="text-sm font-semibold text-red-400/70 uppercase tracking-wider mb-1">Supreme Commander</h2>
        <p className="text-2xl font-bold text-red-500 tracking-tight">My Lord Vader</p>
        <p className="text-xs text-red-400/50 mt-1 uppercase tracking-widest">Dark Side Master</p>
      </div>

      <nav className="flex-1 p-4 space-y-2 bg-black/95">
        <Link href="/">
          <div className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-red-950/30 text-gray-300 cursor-pointer group">
            <Home className="h-5 w-5 group-hover:text-red-500 transition-colors" />
            <span className="group-hover:text-red-500 transition-colors">Dashboard</span>
          </div>
        </Link>
        <Link href="/">
          <div className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-red-950/30 text-gray-300 cursor-pointer group">
            <Ship className="h-5 w-5 group-hover:text-red-500 transition-colors" />
            <span className="group-hover:text-red-500 transition-colors">Fleet</span>
          </div>
        </Link>
        <Link href="/hyperspace">
          <div className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-red-950/30 text-gray-300 cursor-pointer group">
            <Orbit className="h-5 w-5 group-hover:text-red-500 transition-colors" />
            <span className="group-hover:text-red-500 transition-colors">Hyperspace Routes</span>
          </div>
        </Link>
      </nav>

      <div className="p-4 border-t border-red-900/30 bg-black">
        <div className="text-xs text-red-500/40 tracking-wider">
          Imperial Fleet Management v1.0
        </div>
      </div>
    </div>
  );
}