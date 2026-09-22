type ArticleContentsProps = {
  sections: { id: string; heading: string }[];
};

export default function ArticleContents({ sections }: ArticleContentsProps) {
  if (sections.length < 3) return null;
  return (
    <nav aria-label="On this page" className="my-6 rounded-md border border-white/10 p-5">
      <p className="text-sm font-semibold text-white">On this page</p>
      <ol className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
        {sections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`} className="text-sm text-[#ffd5c5] underline underline-offset-4 hover:text-white">
              {section.heading}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
