export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-white">
      {/* Dots pattern */}
      <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      
      {/* Enhanced Theme Blue Glow */}
      <div className="absolute inset-0 h-full w-full bg-[radial-gradient(circle_1000px_at_50%_-100px,rgba(37,99,235,0.12),transparent)]"></div>
      <div className="absolute inset-0 h-full w-full bg-[radial-gradient(circle_600px_at_50%_100px,rgba(186,230,253,0.3),transparent)]"></div>
    </div>
  )
}
