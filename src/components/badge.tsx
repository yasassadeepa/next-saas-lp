export default function Badge({ number, text }: { number: number, text: string }) {
  return (
    <div className="flex items-center h-8 text-slate-600 text-[10px] md:text-[12px] bg-slate-100 w-fit rounded-full mx-auto border border-slate-200">
      <div className="h-8 w-8 flex items-center justify-center bg-blue-600 text-white rounded-full font-bold text-[12px] md:text-[14px]">{number}</div>
      <div className="uppercase tracking-widest font-bold py-2 px-4 w-fit">{text}</div>
    </div>
  )
}