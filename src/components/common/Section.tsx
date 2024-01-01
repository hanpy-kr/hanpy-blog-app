import "./Section.css";

function Section({
  children,
  className,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  title?: React.ReactNode;
}) {
  return (
    <section className={"section__container"}>
      {title !== null ? <div className="section__title">{title}</div> : null}
      {children}
    </section>
  );
}
export default Section;
