interface PublicSkeletonProps {
  variant?: "card" | "grid" | "text";
  count?: number;
}

function SkeletonBlock({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse bg-zinc-800/70 ${className}`}
    />
  );
}

export default function PublicSkeleton({
  variant = "card",
  count = 3,
}: PublicSkeletonProps) {
  if (variant === "text") {
    return (
      <div
        role="status"
        aria-label="Loading content"
        className="space-y-3"
      >
        <SkeletonBlock className="h-4 w-3/4" />
        <SkeletonBlock className="h-4 w-full" />
        <SkeletonBlock className="h-4 w-5/6" />

        <span className="sr-only">
          Loading content
        </span>
      </div>
    );
  }

  if (variant === "grid") {
    return (
      <div
        role="status"
        aria-label="Loading content"
        className="grid gap-7 lg:grid-cols-2 lg:gap-10"
      >
        {Array.from({ length: count }).map(
          (_, index) => (
            <div
              key={index}
              className="border border-zinc-800 bg-[#080808]"
            >
              <SkeletonBlock className="min-h-[280px] sm:min-h-[360px]" />

              <div className="space-y-5 p-6 sm:p-7">
                <SkeletonBlock className="h-2 w-28" />
                <SkeletonBlock className="h-8 w-3/4" />
                <SkeletonBlock className="h-16 w-full" />

                <div className="grid grid-cols-2 gap-3">
                  <SkeletonBlock className="h-10" />
                  <SkeletonBlock className="h-10" />
                </div>
              </div>
            </div>
          )
        )}

        <span className="sr-only">
          Loading content
        </span>
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-label="Loading content"
      className="border border-zinc-800 bg-[#080808] p-6"
    >
      <SkeletonBlock className="h-3 w-28" />

      <div className="mt-5">
        <SkeletonBlock className="h-8 w-2/3" />
      </div>

      <div className="mt-5 space-y-3">
        <SkeletonBlock className="h-4 w-full" />
        <SkeletonBlock className="h-4 w-5/6" />
      </div>

      <span className="sr-only">
        Loading content
      </span>
    </div>
  );
}