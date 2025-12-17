import Link from "next/link";
import { CloudSun } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-600 dark:text-blue-400">
          <CloudSun className="h-6 w-6" />
          <span>Israel Weather Hub</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Dashboard</Link>
          <Link href="/models" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Models</Link>
          <Link href="/observations" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Observations</Link>
          <Link href="/alerts" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Alerts</Link>
        </nav>
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50">
            Sign In
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}
