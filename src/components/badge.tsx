export default function Badge({ number, text }: { number: number, text: string }) {
  return (
    <div className="flex items-center h-8 text-muted text-[10px] md:text-[12px] bg-secondary w-fit rounded-full mx-auto border border-border">
      <div className="h-8 w-8 flex items-center justify-center bg-primary text-white rounded-full font-bold text-[12px] md:text-[14px]">{number}</div>
      <div className="uppercase tracking-widest font-bold py-2 px-4 w-fit">{text}</div>
    </div>
  )
}