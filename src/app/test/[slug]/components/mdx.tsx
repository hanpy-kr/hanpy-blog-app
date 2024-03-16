import { useMDXComponent } from "next-contentlayer/hooks";
// ...
export function Mdx({ code }: { code: string }) {
  const Component = useMDXComponent(code);
  return (
    <article className="prose dark:prose-invert prose-h1:text-2xl prose-a:break-all break-keep">
      <Component components={{ ...components }} />
    </article>
  );
}
