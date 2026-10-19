// Route group for pages that don't need the docs sidebar (/about, /search).
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">{children}</main>;
}
