/* Skeleton loading components — use wherever data is async */

const S = ({ className = '' }: { className?: string }) => (
  <div className={`skeleton ${className}`} />
);

export const ProductCardSkeleton = () => (
  <div className="flex flex-col">
    <S className="aspect-[4/5] mb-0 rounded-t-sm" />
    <div className="bg-white/70 p-5 rounded-b-sm shadow-float space-y-3">
      <S className="h-3 w-1/3" />
      <S className="h-5 w-3/4" />
      <S className="h-3 w-1/2" />
      <div className="pt-2 space-y-2">
        <S className="h-8 w-full" />
        <S className="h-10 w-full" />
      </div>
    </div>
  </div>
);

export const ProductGridSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

export const PostCardSkeleton = () => (
  <div className="space-y-4">
    <S className="aspect-[4/3] rounded-sm" />
    <S className="h-3 w-1/3" />
    <S className="h-5 w-3/4" />
    <S className="h-3 w-full" />
    <S className="h-3 w-2/3" />
  </div>
);

export const HeroProductSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="flex flex-col gap-4">
        <S className="aspect-[3/4] rounded-sm" />
        <S className="h-5 w-3/4" />
        <S className="h-3 w-1/2" />
      </div>
    ))}
  </div>
);
