import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-gray-900">
            <span className="h-4 w-4 bg-emerald-800 rounded-sm inline-block"></span>
            <span>Wayfinder</span>
          </Link>

          <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link href="/" className="text-emerald-800 font-semibold border-b-2 border-emerald-800 pb-1 -mb-1">
              Destinations
            </Link>
            <Link href="/regions" className="hover:text-emerald-800 transition-colors">
              Regions
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-mono text-gray-600">
            GEO.INDEX v2.4
          </span>
          <Link
            href="/overview"
            className="rounded-md bg-emerald-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-900 transition-colors"
          >
            Plan Trip
          </Link>
        </div>
      </div>
    </header>
  );
}
