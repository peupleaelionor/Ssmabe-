/** Skeleton shimmer — fond de chargement doux (zéro JS). */
export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-white/[0.05] ${className}`} />;
}

export function BetaFormSkeleton() {
  return (
    <div className="flex flex-col gap-3" aria-hidden>
      <div className="grid gap-3 sm:grid-cols-2">
        <Skeleton className="h-12" />
        <Skeleton className="h-12" />
      </div>
      <Skeleton className="h-12" />
      <div className="grid gap-3 sm:grid-cols-2">
        <Skeleton className="h-12" />
        <Skeleton className="h-12" />
      </div>
      <Skeleton className="h-24" />
      <Skeleton className="h-12 w-40 self-center rounded-full" />
    </div>
  );
}
