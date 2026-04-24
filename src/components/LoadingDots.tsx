export const LoadingDots = () => (
  <div className="flex items-center justify-center py-24">
    <div className="flex gap-2">
      <div className="w-2 h-2 rounded-full bg-terracotta animate-bounce [animation-delay:0ms]" />
      <div className="w-2 h-2 rounded-full bg-terracotta animate-bounce [animation-delay:150ms]" />
      <div className="w-2 h-2 rounded-full bg-terracotta animate-bounce [animation-delay:300ms]" />
    </div>
  </div>
);
