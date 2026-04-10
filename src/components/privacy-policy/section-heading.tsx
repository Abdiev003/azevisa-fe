interface SectionHeadingProps {
  number: string;
  title: string;
  id: string;
}

export function SectionHeading({ number, title, id }: SectionHeadingProps) {
  return (
    <div id={id} className="flex items-center gap-4 scroll-mt-24">
      <span className="text-5xl font-bold text-[#004E34]/10 select-none leading-none">
        {number}
      </span>
      <h2 className="text-2xl md:text-3xl font-bold text-[#004E34]">{title}</h2>
    </div>
  );
}
