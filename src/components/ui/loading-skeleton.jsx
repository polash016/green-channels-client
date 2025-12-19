import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-neutral-800/50", className)}
      {...props}
    />
  );
}

export function ContactSectionSkeleton() {
  return (
    <section className="relative w-full min-h-screen bg-black flex items-center justify-center">
      <div className="max-w-4xl w-full bg-neutral-900/70 rounded-2xl shadow-2xl p-6 flex flex-col items-center gap-4 backdrop-blur-md border border-white/10 mx-4">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-full max-w-2xl mb-3" />
        <div className="w-full flex flex-col gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </section>
  );
}
