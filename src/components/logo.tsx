export default function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
        <span className="text-white font-bold text-xl">C</span>
      </div>
      <span className="text-xl font-bold tracking-tight text-slate-900">
        Closer <span className="text-blue-600">Intellect</span>
      </span>
    </div>
  )
}