import Badge from "./Badge";

export default function SectionHeading({ eyebrow, title, description, align = "center" }: { eyebrow?: string; title: string; description?: string; align?: "center" | "left" }) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? <Badge>{eyebrow}</Badge> : null}
      <h2 className="mt-5 font-display text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">{title}</h2>
      {description ? <p className="mt-5 text-base leading-7 text-slate-300">{description}</p> : null}
    </div>
  );
}
