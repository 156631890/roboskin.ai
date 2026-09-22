/** Stable section links shared by the table of contents and rendered headings. */
export function buildSectionIds(sections: { heading: string; id?: string }[]) {
  const used = new Set(sections.flatMap((section) => section.id ? [section.id] : []));
  return sections.map((section) => {
    if (section.id) return section.id;
    const slug = section.heading.toLowerCase().normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const base = `section-${slug || 'overview'}`;
    let id = base;
    for (let suffix = 2; used.has(id); suffix += 1) id = `${base}-${suffix}`;
    used.add(id);
    return id;
  });
}

export function getArticleHeadings(content: string) {
  const sections = content.split('\n').flatMap((line, index) => {
    const match = line.trim().match(/^##\s+(.+)$/);
    return match ? [{ heading: match[1], line: index }] : [];
  });
  const ids = buildSectionIds(sections);
  return sections.map((section, index) => ({ ...section, id: ids[index] }));
}
