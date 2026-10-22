import destinationData from "@/data/destinationData";
import DestinationCard from "@/components/DestinationCard";

export default function DestinationsPage() {
  const destinations = destinationData.slice(0, 6);

  return (
    <div className="w-full bg-white pb-16 pt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-xs font-bold tracking-widest text-emerald-800 uppercase font-mono">
          CATALOGUE // 01 • LIVE SURVEY
        </div>

        <div className="mt-2 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Explore destinations
            </h1>
            <p className="mt-2 text-sm text-gray-600 max-w-2xl">
              Browse curated travel places organized by geographic region and terrain.
            </p>
          </div>
          <div className="md:text-right">
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              TOTAL RECORDED ENTITIES
            </div>
            <div className="text-xl font-bold text-gray-900 font-mono">
              06 NODES ACTIVE
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <button className="rounded-full border border-emerald-700 bg-emerald-50 px-4 py-1.5 text-xs font-bold text-emerald-900">
            All Regions
          </button>
          <button className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50">
            East Asia
          </button>
          <button className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50">
            Southern Europe
          </button>
          <button className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50">
            Scandinavia
          </button>
          <button className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50">
            South America
          </button>
          <button className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50">
            North Africa
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((item) => (
            <DestinationCard key={item.id} destination={item} />
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50/70 p-4 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <span>ⓘ</span>
            <span>Destinations are systematically validated against public cartographic terrain datasets.</span>
          </div>
          <div className="font-mono text-gray-500 font-medium">
            COORDINATE FORMAT: WGS84
          </div>
        </div>
      </div>
    </div>
  );
}
