import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full bg-white py-12 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-xs text-gray-500 mb-6">
          <span>Wayfinder</span>
          <span className="mx-2">/</span>
          <span className="font-semibold text-gray-900">Error 404</span>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-gray-100 pb-4 text-xs font-mono">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 font-sans font-semibold text-gray-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-700"></span>
              404 · Unresolved Destination Path
            </span>
            <span className="text-gray-400">REF: ERR_PATH_UNRESOLVED</span>
          </div>

          <div className="mt-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
              Destination or region not found
            </h1>
            <p className="mt-3 text-sm text-gray-600 max-w-2xl leading-relaxed">
              The requested geographic route identifier could not be resolved within the Wayfinder spatial database. The path may have changed or the slug syntax is invalid.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-800 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-900 transition-colors"
            >
              <span>↗</span>
              <span>Return to Destinations</span>
            </Link>
            <Link
              href="/regions"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <span>▦</span>
              <span>Browse All Regions</span>
            </Link>
          </div>

          <div className="mt-10 border-t border-gray-100 pt-6">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              <span>Suggested Directory Shortcuts</span>
              <span className="font-mono text-gray-400">SPATIAL INDEX VERIFIED</span>
            </div>

            <div className="divide-y divide-gray-100 rounded-lg border border-gray-200 bg-white text-xs">
              <Link
                href="/destinations/1"
                className="flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-gray-900">Kyoto, Japan</span>
                <span className="font-mono text-gray-500">/destinations/1 →</span>
              </Link>
              <Link
                href="/destinations/2"
                className="flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-gray-900">Bergen, Norway</span>
                <span className="font-mono text-gray-500">/destinations/2 →</span>
              </Link>
              <Link
                href="/regions/asia/japan/kansai"
                className="flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-gray-900">Kansai Region</span>
                <span className="font-mono text-gray-500">/regions/asia/japan/kansai →</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
