export default function Card({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`rounded-3xl text-sm md:text-base h-full bg-white border border-slate-100 p-8 md:p-10 flex flex-col items-start justify-start text-start gap-4 md:gap-5 shadow-soft hover:shadow-xl transition-all duration-300 ${className}`}>
      {children}
    </div>
  )
}