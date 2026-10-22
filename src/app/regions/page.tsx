import Link from "next/link";
import { continentalDivisions } from "@/data/regionData";

export default function RegionsPage() {
  return (
    <div className="w-full bg-white py-8 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-xs text-gray-500 flex items-center gap-2 mb-3">
          <span>catalog</span>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Regions</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-6 border-b border-gray-100">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Geographic Regions
            </h1>
            <p className="mt-2 text-sm text-gray-600 max-w-2xl leading-relaxed">
              Explore global destinations cataloged by continent, subcontinent, and terrain systems. Select a continental division to drill down into nested jurisdictions.
            </p>
          </div>

          <div className="flex items-center gap-4 border border-gray-200 rounded-lg p-3 bg-gray-50/50">
            <div className="pr-4 border-r border-gray-200">
              <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">SETTLEMENTS</div>
              <div className="text-lg font-bold text-gray-900">70 Indexed</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">JURISDICTIONS</div>
              <div className="text-lg font-bold text-gray-900">4 Divisions</div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-gray-900">Continental Divisions</h2>
            <span className="rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 px-2.5 py-0.5 text-xs font-semibold">
              4 systems
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {continentalDivisions.map((division) => (
            <div
              key={division.id}
              className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-xs transition hover:border-emerald-600 hover:shadow-md"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center text-xs">
                      🌐
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900">{division.name}</h3>
                      <div className="font-mono text-xs text-gray-500 mt-0.5">{division.code}</div>
                    </div>
                  </div>
                  <span className="rounded bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 text-xs font-semibold">
                    {division.settlements}
                  </span>
                </div>

                <div className="mt-4 rounded border border-gray-200 bg-gray-100 h-28 flex items-end p-3">
                  <span className="rounded bg-black/75 px-2 py-1 font-mono text-[11px] text-white">
                    {division.terrain}
                  </span>
                </div>

                <p className="mt-3 text-xs text-gray-600 leading-relaxed">
                  {division.subregions}
                </p>
              </div>

              <div className="mt-5 border-t border-gray-100 pt-3 flex items-center justify-between text-xs">
                <span className="font-mono text-gray-500">{division.jurisdiction}</span>
                <Link
                  href={division.path}
                  className="font-semibold text-emerald-800 hover:text-emerald-950 transition-colors"
                >
                  {division.linkText}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-200 pt-4 text-xs font-mono text-gray-500">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-600"></span>
            <span>INDEX STATUS: SYNCED</span>
          </div>
          <div>
            PROJECTION: EPSG:4326 · GRANULARITY: SUBREGIONAL
          </div>
        </div>
      </div>
    </div>
  );
}
