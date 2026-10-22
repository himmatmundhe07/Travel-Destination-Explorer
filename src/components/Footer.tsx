import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white py-6 mt-auto text-sm text-gray-500">
      <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div>
          © 2025 Wayfinder Spatial Index. All rights reserved.
        </div>
        <div className="flex items-center gap-6 text-xs text-gray-600">
          <Link href="/" className="hover:text-emerald-800 transition-colors">
            Destinations
          </Link>
          <Link href="/regions" className="hover:text-emerald-800 transition-colors">
            Regions
          </Link>
          <Link href="/overview" className="hover:text-emerald-800 transition-colors">
            Trip Planner
          </Link>
        </div>
      </div>
    </footer>
  );
}
