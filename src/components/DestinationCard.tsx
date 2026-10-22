import Link from "next/link";
import { Destination } from "@/data/destinationData";

export default function DestinationCard({ destination }: { destination: Destination }) {
  if (!destination) return null;

  return (
    <div className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-emerald-600 hover:shadow-md">
      <div>
        <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50/80 px-3 py-2.5">
          <div className="flex items-center gap-2 font-mono text-xs text-slate-700">
            <span>⌖</span>
            <span>{destination.loc}</span>
          </div>
          <span className="rounded bg-white px-2 py-0.5 text-xs font-semibold text-gray-700 shadow-2xs border border-gray-200">
            {destination.code}
          </span>
        </div>

        <div className="mt-4 flex items-baseline justify-between">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            {destination.name}
          </h2>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {destination.tag}
          </span>
        </div>

        <p className="mt-1 text-xs font-medium text-emerald-800">
          {destination.country} • {destination.region}
        </p>

        <p className="mt-3 text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {destination.description}
        </p>
      </div>

      <div className="mt-5 border-t border-gray-100 pt-3">
        <Link
          href={`/destinations/${destination.id}`}
          className="flex items-center justify-between text-xs font-semibold text-emerald-800 hover:text-emerald-950 transition-colors"
        >
          <span>View destination →</span>
          <span className="text-gray-300">●</span>
        </Link>
      </div>
    </div>
  );
}
