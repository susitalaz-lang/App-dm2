import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Check, Copy } from 'lucide-react';

interface MarkdownPreviewProps {
  content: string;
}

export const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ content }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyCode = (codeText: string, index: number) => {
    navigator.clipboard.writeText(codeText);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  let codeBlockCounter = 0;

  return (
    <div
      id="markdown-preview-pane"
      className="flex flex-col h-full bg-white overflow-hidden"
    >
      <div className="flex items-center justify-between border-b border-zinc-200/80 bg-zinc-50/50 px-4 py-1.5 text-xs font-medium text-zinc-500">
        <span className="uppercase tracking-wider text-2xs font-semibold text-zinc-400">
          Rendered Preview
        </span>
        <span className="text-2xs text-zinc-400">
          GitHub Style
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div id="rendered-markdown-content" className="max-w-4xl mx-auto">
          {content.trim() === '' ? (
            <div className="flex h-64 flex-col items-center justify-center text-center text-zinc-400">
              <p className="text-sm">No markdown content to preview.</p>
              <p className="text-xs text-zinc-400 mt-1">
                Start typing in the editor or select a template from the toolbar.
              </p>
            </div>
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 border-b border-zinc-200 pb-2.5 mt-2 mb-4">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 border-b border-zinc-100 pb-2 mt-6 mb-3">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg font-semibold text-zinc-900 mt-5 mb-2">
                    {children}
                  </h3>
                ),
                h4: ({ children }) => (
                  <h4 className="text-base font-semibold text-zinc-900 mt-4 mb-2">
                    {children}
                  </h4>
                ),
                p: ({ children }) => (
                  <p className="text-sm sm:text-base text-zinc-700 leading-relaxed my-3">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-6 my-3 space-y-1 text-sm sm:text-base text-zinc-700">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-6 my-3 space-y-1 text-sm sm:text-base text-zinc-700">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="leading-relaxed">{children}</li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-zinc-300 bg-zinc-50/70 pl-4 py-2 my-4 text-zinc-600 rounded-r text-sm sm:text-base italic">
                    {children}
                  </blockquote>
                ),
                hr: () => (
                  <hr className="border-t border-zinc-200 my-6" />
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 underline underline-offset-2 font-medium transition-colors"
                  >
                    {children}
                  </a>
                ),
                img: ({ src, alt }) => (
                  <img
                    src={src}
                    alt={alt || ''}
                    referrerPolicy="no-referrer"
                    className="max-w-full rounded-md border border-zinc-200 my-3 inline-block shadow-2xs"
                  />
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-4 rounded-md border border-zinc-200">
                    <table className="w-full text-left text-sm border-collapse">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-zinc-100/90 text-zinc-800 border-b border-zinc-200">
                    {children}
                  </thead>
                ),
                th: ({ children }) => (
                  <th className="px-3 py-2 font-semibold text-xs uppercase tracking-wider text-zinc-700">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-3 py-2 text-zinc-700 border-t border-zinc-200 text-xs sm:text-sm">
                    {children}
                  </td>
                ),
                code: ({ className, children, ...props }) => {
                  const isInline = !className && typeof children === 'string' && !children.includes('\n');
                  if (isInline) {
                    return (
                      <code
                        className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 border border-zinc-200"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  }

                  const blockIndex = ++codeBlockCounter;
                  const codeString = String(children).replace(/\n$/, '');

                  return (
                    <div className="relative group my-4 rounded-lg bg-zinc-900 text-zinc-100 overflow-hidden text-xs sm:text-sm">
                      <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-800/80 border-b border-zinc-700 text-2xs text-zinc-400 font-mono">
                        <span>{className ? className.replace('language-', '') : 'code'}</span>
                        <button
                          type="button"
                          onClick={() => handleCopyCode(codeString, blockIndex)}
                          className="flex items-center gap-1 rounded bg-zinc-700/60 px-2 py-0.5 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors"
                          title="Copy Code"
                        >
                          {copiedIndex === blockIndex ? (
                            <>
                              <Check className="h-3 w-3 text-green-400" />
                              <span className="text-green-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-4 overflow-x-auto font-mono leading-relaxed">
                        <code className={className} {...props}>
                          {children}
                        </code>
                      </pre>
                    </div>
                  );
                },
                input: ({ type, checked, readOnly }) => {
                  if (type === 'checkbox') {
                    return (
                      <input
                        type="checkbox"
                        checked={checked}
                        readOnly={readOnly}
                        className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-0 mr-2 align-middle"
                      />
                    );
                  }
                  return <input type={type} checked={checked} readOnly={readOnly} />;
                },
              }}
            >
              {content}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
};
