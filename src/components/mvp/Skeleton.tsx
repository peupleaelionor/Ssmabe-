/** Shimmer skeletons — perceived-performance layer (zero JS). */
export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`shimmer rounded-2xl ${className}`} aria-hidden />;
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
      <Skeleton className="mt-1 h-12 w-44 self-center rounded-full" />
    </div>
  );
}
