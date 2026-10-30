import React from 'react';

/**
 * Renders a post's `body` block list into lightweight, styled markup.
 * Supported block types: { h }, { p }, { list }, { quote }, { note }.
 * Markdown is deliberately NOT auto-rendered — authoring plain JSON keeps
 * the pipeline small, predictable and dependency-free. If you want
 * markdown paragraphs later, swap this for a renderer without changing
 * the data shape: a `{ md: "..." }` block maps naturally onto it.
 */
const inline = (text) => (
  text
    .split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
    .map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={i}>{part.slice(1, -1)}</code>;
      }
      return <React.Fragment key={i}>{part}</React.Fragment>;
    })
);

export default function PostBody({ blocks }) {
  if (!blocks?.length) return null;

  return (
    <div className="flex flex-col gap-4">
      {blocks.map((block, i) => {
        if (block.h) {
          return (
            <h2 key={i} className="pt-2 text-xl font-bold tracking-tight text-fg">
              {block.h}
            </h2>
          );
        }
        if (block.p) {
          return (
            <p key={i} className="leading-[1.8] text-fg-muted">
              {inline(block.p)}
            </p>
          );
        }
        if (block.list) {
          return (
            <ul key={i} className="flex flex-col gap-2 pl-1">
              {block.list.map((item, j) => (
                <li key={j} className="flex gap-3 leading-relaxed text-fg-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  <span>{inline(item)}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (block.quote) {
          return (
            <blockquote
              key={i}
              className="rounded-r-xl border-l-4 border-brand/70 bg-ink-850 px-5 py-4 text-fg-muted italic"
            >
              {inline(block.quote)}
            </blockquote>
          );
        }
        if (block.note) {
          return (
            <div
              key={i}
              className="rounded-xl border border-brand/30 bg-brand/5 px-5 py-4 text-sm leading-relaxed text-fg-muted"
            >
              <strong className="mr-2 text-brand">Note:</strong>
              {inline(block.note)}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}