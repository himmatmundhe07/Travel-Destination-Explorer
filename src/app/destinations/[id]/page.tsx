import Link from "next/link";
import { notFound } from "next/navigation";
import destinationData from "@/data/destinationData";

export async function generateStaticParams() {
  return destinationData.map((d) => ({
    id: String(d.id),
  }));
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const destination = destinationData.find((d) => String(d.id) === String(id));

  if (!destination) {
    notFound();
  }

  return (
    <div className="w-full bg-white py-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-xs text-gray-500 flex items-center gap-2 mb-2">
          <Link href="/" className="hover:underline">Destinations</Link>
          <span>/</span>
          <span>Asia</span>
          <span>/</span>
          <span>{destination.country}</span>
          <span>/</span>
          <span className="text-gray-900 font-semibold">{destination.name}</span>
        </div>

        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:underline"
          >
            <span>←</span> Back to destinations
          </Link>
        </div>

        <div className="mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-700"></span>
            {destination.country} · {destination.region}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-100">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            {destination.name}
          </h1>

          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded border border-gray-200 bg-gray-50 px-3 py-1 font-mono text-xs text-gray-700">
              GEO: {destination.geo}
            </span>
            <span className="rounded border border-gray-200 bg-gray-50 px-3 py-1 font-mono text-xs text-gray-700">
              INDEX: KIX-{destination.subRegion.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold tracking-wider text-emerald-800 uppercase font-mono">
                  CARTOGRAPHIC OVERVIEW
                </span>
                <p className="mt-3 text-sm text-gray-700 leading-relaxed">
                  {destination.overview}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-gray-500 font-medium">Elevation:</span>
                  <span className="ml-2 font-semibold text-gray-800">{destination.elevation}</span>
                </div>
                <div>
                  <span className="text-gray-500 font-medium">Prefecture:</span>
                  <span className="ml-2 font-semibold text-gray-800">{destination.prefecture}</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-dashed border-gray-300 bg-slate-50 p-4 flex flex-col items-center justify-center text-center">
              <span className="text-xs font-mono text-gray-500">Spatial Inset (480 × 200 Ref)</span>
              <span className="mt-2 text-xs font-semibold text-emerald-900 bg-emerald-50 border border-emerald-200 rounded px-2 py-1">
                Zone 03 / Historic Core
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-4 w-1 bg-emerald-800 rounded"></span>
            <h2 className="text-base font-bold text-gray-900">Key Information</h2>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white divide-y divide-gray-100 shadow-xs text-sm">
            <div className="p-4 grid grid-cols-1 sm:grid-cols-4 gap-2">
              <div className="flex items-center gap-2 text-gray-500 font-medium">
                <span>🗓</span>
                <span>Best season</span>
              </div>
              <div className="sm:col-span-3 text-gray-800 font-normal">
                {destination.bestSeason}
              </div>
            </div>

            <div className="p-4 grid grid-cols-1 sm:grid-cols-4 gap-2">
              <div className="flex items-center gap-2 text-gray-500 font-medium">
                <span>🧭</span>
                <span>Known for</span>
              </div>
              <div className="sm:col-span-3 text-gray-800 font-normal">
                {destination.knownFor}
              </div>
            </div>

            <div className="p-4 grid grid-cols-1 sm:grid-cols-4 gap-2">
              <div className="flex items-center gap-2 text-gray-500 font-medium">
                <span>⏱</span>
                <span>Typical trip length</span>
              </div>
              <div className="sm:col-span-3 text-gray-800 font-normal">
                {destination.tripLength}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-2 text-emerald-800 text-lg">
              🚆
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Practical Transit Notes</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {destination.transitNotes}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2">
          <span>Spatial Taxonomy Division: West Honshu Basin</span>
          <Link
            href="/regions/asia/japan/kansai"
            className="font-semibold text-emerald-800 hover:underline inline-flex items-center gap-1"
          >
            Explore Kansai Region →
          </Link>
        </div>
      </div>
    </div>
  );
}
