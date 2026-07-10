import type { ReactNode } from 'react';

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const linkPattern = /\[([^\]]+)\]\(((?:https?:\/\/|\/)[^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const href = match[2];
    const isInternal = href.startsWith('/');
    const isExternal = !isInternal;

    nodes.push(
      <a
        key={`${href}-${match.index}`}
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noreferrer' : undefined}
        className="text-accent underline decoration-white/30 underline-offset-4 hover:text-white"
      >
        {match[1]}
      </a>,
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

export default function ArticleBody({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: ReactNode[] = [];
  let listItems: string[] = [];
  let tableRows: string[][] = [];

  const flushList = () => {
    if (!listItems.length) {
      return;
    }

    elements.push(
      <ul key={`list-${elements.length}`} className="mt-4 space-y-2 text-sm leading-relaxed text-[#d8dce4]">
        {listItems.map((item) => (
          <li key={item} className="rounded-lg border border-white/8 bg-[#0d1016] px-4 py-2.5">
            {renderInline(item)}
          </li>
        ))}
      </ul>,
    );
    listItems = [];
  };

  const flushTable = () => {
    if (!tableRows.length) {
      return;
    }

    const [header, ...bodyRows] = tableRows;
    const rows = bodyRows.filter((row) => !row.every((cell) => /^:?-{3,}:?$/.test(cell.trim())));

    if (header?.length && rows.length) {
      elements.push(
        <div key={`table-${elements.length}`} className="mt-6 overflow-x-auto rounded-lg border border-white/8">
          <table className="w-full min-w-[620px] border-collapse text-left text-sm">
            <thead className="bg-[#0d1016] text-white">
              <tr>
                {header.map((cell) => (
                  <th key={cell} className="border-b border-white/8 px-4 py-3 font-semibold">
                    {renderInline(cell.trim())}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/8">
              {rows.map((row, rowIndex) => (
                <tr key={`${row.join('-')}-${rowIndex}`}>
                  {row.map((cell, cellIndex) => (
                    <td key={`${cell}-${cellIndex}`} className="px-4 py-3 text-soft">
                      {renderInline(cell.trim())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
    }

    tableRows = [];
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      flushTable();
      return;
    }

    if (trimmed.startsWith('- ')) {
      flushTable();
      listItems.push(trimmed.slice(2));
      return;
    }

    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      flushList();
      tableRows.push(trimmed.split('|').slice(1, -1).map((cell) => cell.trim()));
      return;
    }

    flushList();
    flushTable();

    if (trimmed.startsWith('# ')) {
      return;
    }

    if (trimmed.startsWith('## ')) {
      elements.push(
        <h2 key={`h2-${index}`} className="mt-10 text-2xl font-semibold tracking-tight text-white">
          {trimmed.slice(3)}
        </h2>,
      );
      return;
    }

    if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
      elements.push(
        <p key={`strong-${index}`} className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#9aa3b2]">
          {trimmed.replaceAll('**', '')}
        </p>,
      );
      return;
    }

    elements.push(
      <p key={`p-${index}`} className="mt-4 text-sm leading-relaxed text-soft">
        {renderInline(trimmed)}
      </p>,
    );
  });

  flushList();
  flushTable();

  return <div className="mt-8">{elements}</div>;
}
