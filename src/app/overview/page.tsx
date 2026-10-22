import Link from "next/link";

export default function OverviewPage() {
  return (
    <div className="w-full bg-slate-50 min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1 rounded-xl border border-gray-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">Workspace</span>
                <div className="text-sm font-bold text-gray-900">Field Workspace</div>
              </div>
              <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-mono text-gray-600">v1.2</span>
            </div>

            <nav className="mt-4 flex flex-col gap-1 text-sm font-medium">
              <Link
                href="/overview"
                className="flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2 text-emerald-900 font-semibold"
              >
                <div className="flex items-center gap-2">
                  <span>▦</span>
                  <span>Overview</span>
                </div>
                <span className="h-2 w-2 rounded-full bg-emerald-600"></span>
              </Link>
              <button className="flex items-center justify-between rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-50 text-left cursor-pointer">
                <div className="flex items-center gap-2">
                  <span>🔖</span>
                  <span>Saved Places</span>
                </div>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-bold text-gray-600">3</span>
              </button>
              <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-50 text-left cursor-pointer">
                <span>⚙</span>
                <span>Preferences</span>
              </button>
            </nav>

            <div className="mt-8 pt-4 border-t border-gray-100 flex flex-col gap-2 text-xs">
              <span className="text-gray-400 font-semibold uppercase">Index Resources</span>
              <button className="flex items-center gap-2 text-gray-600 hover:text-emerald-800 text-left py-1 cursor-pointer">
                <span>📖</span>
                <span>Documentation</span>
              </button>
              <Link
                href="/"
                className="flex items-center gap-2 text-emerald-800 font-semibold hover:underline py-1"
              >
                <span>←</span>
                <span>Exit to Public Explorer</span>
              </Link>
            </div>
          </aside>

          <main className="lg:col-span-3 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <div className="text-xs text-gray-500">Planner / Overview</div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  Trip Overview
                </h1>
                <p className="mt-1 text-xs text-gray-600">
                  Your current route draft and curated spatial bookmarks.
                </p>
              </div>
              <span className="text-xs text-gray-500 font-mono">Updated 42m ago</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <div className="md:col-span-2 rounded-xl border border-gray-200 bg-white p-6 shadow-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="rounded border border-emerald-300 bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-900">
                      Active Draft
                    </span>
                    <h2 className="mt-2 text-xl font-bold text-gray-900">Autumn in Honshu</h2>
                    <div className="text-xs text-gray-500 mt-0.5">Dates: Oct 14–22 · 3 Destinations</div>
                  </div>
                  <span className="rounded border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-mono font-semibold text-gray-700">
                    8 Days Total
                  </span>
                </div>

                <div className="mt-6 border-t border-gray-100 pt-4">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Itinerary Stops</span>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50/50 p-3.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-700 mt-1.5"></span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <strong className="text-sm text-gray-900">Kyoto</strong>
                          <span className="text-xs font-mono text-gray-600">3 nights</span>
                        </div>
                        <p className="mt-1 text-xs text-gray-600">
                          Historic ward corridors, Gion, Arashiyama bamboo path
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50/50 p-3.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-700 mt-1.5"></span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <strong className="text-sm text-gray-900">Osaka</strong>
                          <span className="text-xs font-mono text-gray-600">2 nights</span>
                        </div>
                        <p className="mt-1 text-xs text-gray-600">
                          Dotonbori food district, Namba architectural nexus
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50/50 p-3.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-700 mt-1.5"></span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <strong className="text-sm text-gray-900">Nara</strong>
                          <span className="text-xs font-mono text-gray-600">Day trip</span>
                        </div>
                        <p className="mt-1 text-xs text-gray-600">
                          Todai-ji temple, Kasuga Taisha park preserve
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-mono">Tokaido-Sanyo Main Corridor</span>
                    <button className="font-semibold text-emerald-800 hover:underline cursor-pointer">
                      Edit Schedule &gt;
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">Saved Destination Nodes</h3>
                    <span className="rounded-full bg-emerald-50 text-emerald-800 px-2 py-0.5 text-xs font-bold">3</span>
                  </div>

                  <div className="mt-3 divide-y divide-gray-100 text-xs">
                    <div className="py-2.5 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-gray-900">Kyoto, Japan</div>
                        <div className="font-mono text-gray-400 text-[11px]">35.0116° N, 135.7681° E</div>
                      </div>
                      <Link href="/destinations/1" className="text-emerald-800 font-semibold hover:underline">
                        Details
                      </Link>
                    </div>

                    <div className="py-2.5 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-gray-900">Bergen, Norway</div>
                        <div className="font-mono text-gray-400 text-[11px]">60.3913° N, 5.3221° E</div>
                      </div>
                      <Link href="/destinations/2" className="text-emerald-800 font-semibold hover:underline">
                        Details
                      </Link>
                    </div>

                    <div className="py-2.5 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-gray-900">Florence, Italy</div>
                        <div className="font-mono text-gray-400 text-[11px]">43.7696° N, 11.2558° E</div>
                      </div>
                      <Link href="/destinations/4" className="text-emerald-800 font-semibold hover:underline">
                        Details
                      </Link>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 text-right">
                    <Link href="/" className="text-xs font-semibold text-emerald-800 hover:underline">
                      Browse Spatial Bookmarks →
                    </Link>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-gray-900 pb-2 border-b border-gray-100">
                    <span>🚆</span>
                    <span>Transit & Route Notes</span>
                  </div>

                  <div className="mt-3 rounded border border-gray-200 bg-gray-50/70 p-3 space-y-1.5 font-mono text-[11px]">
                    <div className="flex justify-between font-bold text-gray-800">
                      <span>JR Kansai W. Pass</span>
                      <span className="text-emerald-800">Valid (Days 1–5)</span>
                    </div>
                    <div className="text-gray-600 flex justify-between">
                      <span>Kyoto ↔ Osaka Express</span>
                      <span>28m via Tokaido Line</span>
                    </div>
                    <div className="text-gray-600 flex justify-between">
                      <span>Osaka ↔ Nara Rapid</span>
                      <span>39m via Yamatoji Line</span>
                    </div>
                  </div>

                  <p className="mt-3 text-gray-500 leading-relaxed text-[11px]">
                    ⓘ Luggage forwarding available between Kyoto & Osaka terminals.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs text-xs">
              <div className="flex items-center gap-3">
                <span className="text-emerald-700 text-base">📍</span>
                <div>
                  <div className="font-bold text-gray-900">Spatial Topology Index: Clean</div>
                  <div className="text-gray-500">All geocodes and route links are verified against catalog definitions.</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="rounded border border-gray-300 bg-white px-3 py-1.5 font-medium text-gray-700 hover:bg-gray-50 shadow-2xs cursor-pointer">
                  Export GeoJSON
                </button>
                <button className="rounded border border-gray-300 bg-white px-3 py-1.5 font-medium text-gray-700 hover:bg-gray-50 shadow-2xs cursor-pointer">
                  Print Spatial Index
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
