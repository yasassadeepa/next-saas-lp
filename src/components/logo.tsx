import Image from "next/image"

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/full_logo.png"
        alt="Closer Intellect AI Logo"
        width={54}
        height={54}
        className="h-11 w-11 object-contain"
        priority
      />
      <span className="text-2xl font-bold tracking-tight text-white">
        Closer <span className="text-primary">Intellect</span> AI
      </span>
    </div>
  )
}