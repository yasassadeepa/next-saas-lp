import Image from "next/image"

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/full_logo.png"
        alt="Closer Intellect Logo"
        width={48}
        height={48}
        className="h-10 w-10 object-contain"
        priority
      />
      <span className="text-xl font-bold tracking-tight text-white">
        Closer <span className="text-primary">Intellect</span>
      </span>
    </div>
  )
}