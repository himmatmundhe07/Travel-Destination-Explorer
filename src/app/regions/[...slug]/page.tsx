import Link from "next/link";
import { kansaiRegion } from "@/data/regionData";

export async function generateStaticParams() {
  return [
    { slug: ["asia", "japan", "kansai"] },
  ];
}

export default async function RegionDetailPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const currentPath = slug.join("/");
  const region = kansaiRegion;

  return (
    <div className="w-full bg-white py-6 pb-16">
      <div className="border-b border-gray-100 bg-gray-50/60 py-2.5 mb-6 text-xs text-gray-500 font-mono">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-2">
          <div>
            URI: <span className="text-emerald-900 font-semibold">/regions/{currentPath}</span> · TYPE: SUB_REGION_INDEX
          </div>
          <div>
            CRS: EPSG:4326 · INDEX_ID: #7240-KNSI
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
          <Link
            href="/regions"
            className="text-xs font-semibold text-emerald-800 hover:underline inline-flex items-center gap-1"
          >
            <span>←</span> Back to overview
          </Link>

          <div className="text-xs text-gray-500 flex items-center gap-1.5">
            <Link href="/" className="hover:underline">Destinations</Link>
            <span>/</span>
            <span>Asia</span>
            <span>/</span>
            <span>Japan</span>
            <span>/</span>
            <span className="font-semibold text-gray-900">Kansai</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <div className="text-xs font-mono text-emerald-800 flex items-center gap-1">
              <span>↳</span> Asia / Japan / Kansai
            </div>

            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {region.name}
            </h1>

            <p className="mt-3 text-sm text-gray-600 leading-relaxed max-w-2xl">
              {region.description}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded border border-gray-200 bg-gray-50 px-2.5 py-1 text-gray-700">
                Parent: <strong className="text-gray-900">{region.parent}</strong> ↗
              </span>
              <span className="rounded border border-gray-200 bg-gray-50 px-2.5 py-1 text-gray-700">
                Grandparent: <strong className="text-gray-900">{region.grandparent}</strong> ↗
              </span>
              <span className="rounded border border-gray-200 bg-gray-50 px-2.5 py-1 text-gray-700">
                ● {region.prefectures}
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 text-xs">
              <span className="font-semibold text-gray-500 uppercase tracking-wider">Spatial Index Metrics</span>
              <span className="font-mono text-emerald-900 font-bold">{region.spatialMetrics.index}</span>
            </div>

            <div className="divide-y divide-gray-100 text-xs">
              <div className="py-2.5 flex justify-between">
                <span className="text-gray-500">Administrative Division</span>
                <span className="font-semibold text-gray-800">{region.spatialMetrics.admin}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-gray-500">Total Area</span>
                <span className="font-semibold text-gray-800">{region.spatialMetrics.area}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-gray-500">Population Index</span>
                <span className="font-semibold text-gray-800">{region.spatialMetrics.population}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-gray-500">Principal Gateway</span>
                <span className="font-semibold text-gray-800">{region.spatialMetrics.gateway}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex items-center justify-between pb-3 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Destinations in this region ({region.destinations.length})
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                Settlement nodes cataloged with active transit corridors and spatial reference points.
              </p>
            </div>
            <div className="text-xs font-mono text-gray-500">
              Sort: Hierarchy | Density Map
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            {region.destinations.map((dest) => (
              <div
                key={dest.id}
                className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-xs transition hover:border-emerald-600 hover:shadow-md"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-mono text-[11px] text-gray-500">
                        {dest.shortCode} • {dest.code}
                      </div>
                      <h3 className="mt-1 text-lg font-bold text-gray-900">{dest.name}</h3>
                    </div>
                    <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-700">
                      {dest.tag}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-gray-600 leading-relaxed">
                    {dest.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="font-mono text-gray-500">{dest.coords}</span>
                  <Link
                    href={`/destinations/${dest.id}`}
                    className="font-semibold text-emerald-800 hover:text-emerald-950 transition-colors"
                  >
                    View destination →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-xl border border-gray-200 bg-slate-50/70 p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm">ⓘ</span>
            <h3 className="text-sm font-bold text-gray-900">Regional Spatial Notes & Connectivity</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-600">
            <div>
              <div className="flex items-center gap-1.5 font-bold text-gray-800 mb-1">
                <span>🚆</span>
                <span>Rail Interconnectivity & Transit Arteries</span>
              </div>
              <p className="leading-relaxed">
                The Kansai corridor is bound by one of the densest private and national rail meshes globally. The JR Tokaido-Sanyo Shinkansen anchors the primary east-west spine connecting Kyoto, Shin-Osaka, and Shin-Kobe in under 30 minutes. Hankyu, Hanshin, Keihan, and Kintetsu private networks provide non-JR redundant links serving suburban belts and pilgrimage footpaths into Mount Koya and Yoshino.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-1.5 font-bold text-gray-800 mb-1">
                <span>🌡</span>
                <span>Geographic Microclimates & Topography</span>
              </div>
              <p className="leading-relaxed">
                Flanked by the Tamba highlands to the north, the Kii mountain spine to the south, and Osaka Bay to the west, Kansai experiences stark microclimates. Kyoto&apos;s closed basin results in sharp seasonal temperature deltas, whereas Kobe and southern Osaka benefit from maritime moderations created by the Seto Inland Sea wind tunnels.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-2 font-mono">
            <div>
              Primary pass: JR Kansai Area Pass · Transit interoperability: ICOCA / Suica integrated
            </div>
            <div>
              Verified spatial notes (Updated: Autumn cycle)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
