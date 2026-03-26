export function BrowseHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 md:mb-8">
      <div className="flex flex-col gap-0.5 md:gap-1">
        <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tighter text-slate-100 leading-none">
          Browse <span className="text-sky-500">Comics</span>
        </h1>
        <p className="text-slate-400 font-medium text-sm leading-tight">Discover your next favorite story</p>
      </div>
    </div>
  );
}
