import React, { useState, useRef, useEffect } from 'react';
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Code,
  SquareCode,
  List,
  ListOrdered,
  ListTodo,
  Link as LinkIcon,
  Image as ImageIcon,
  Table as TableIcon,
  Minus,
  FileText,
  PlusCircle,
  ChevronDown
} from 'lucide-react';
import { FormatType } from '../utils/markdownHelpers';
import { STARTER_TEMPLATES, SECTION_SNIPPETS } from '../data/templates';
import { ReadmeTemplate, SectionSnippet } from '../types';

interface ToolbarProps {
  onFormat: (format: FormatType) => void;
  onApplyTemplate: (template: ReadmeTemplate) => void;
  onInsertSnippet: (snippet: SectionSnippet) => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onFormat,
  onApplyTemplate,
  onInsertSnippet,
}) => {
  const [templateMenuOpen, setTemplateMenuOpen] = useState(false);
  const [snippetMenuOpen, setSnippetMenuOpen] = useState(false);

  const templateRef = useRef<HTMLDivElement>(null);
  const snippetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (templateRef.current && !templateRef.current.contains(event.target as Node)) {
        setTemplateMenuOpen(false);
      }
      if (snippetRef.current && !snippetRef.current.contains(event.target as Node)) {
        setSnippetMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      id="editor-toolbar"
      className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 bg-zinc-50/90 px-3 py-2 text-zinc-700 backdrop-blur-xs select-none"
    >
      <div className="flex flex-wrap items-center gap-1">
        {/* Headings */}
        <div className="flex items-center border-r border-zinc-200 pr-1 mr-1 gap-0.5">
          <button
            id="btn-format-h1"
            type="button"
            onClick={() => onFormat('h1')}
            title="Heading 1 (#)"
            className="rounded p-1.5 hover:bg-zinc-200 text-zinc-700 transition-colors"
          >
            <Heading1 className="h-4 w-4" />
          </button>
          <button
            id="btn-format-h2"
            type="button"
            onClick={() => onFormat('h2')}
            title="Heading 2 (##)"
            className="rounded p-1.5 hover:bg-zinc-200 text-zinc-700 transition-colors"
          >
            <Heading2 className="h-4 w-4" />
          </button>
          <button
            id="btn-format-h3"
            type="button"
            onClick={() => onFormat('h3')}
            title="Heading 3 (###)"
            className="rounded p-1.5 hover:bg-zinc-200 text-zinc-700 transition-colors"
          >
            <Heading3 className="h-4 w-4" />
          </button>
        </div>

        {/* Inline styles */}
        <div className="flex items-center border-r border-zinc-200 pr-1 mr-1 gap-0.5">
          <button
            id="btn-format-bold"
            type="button"
            onClick={() => onFormat('bold')}
            title="Bold (**text**)"
            className="rounded p-1.5 hover:bg-zinc-200 text-zinc-700 transition-colors"
          >
            <Bold className="h-4 w-4" />
          </button>
          <button
            id="btn-format-italic"
            type="button"
            onClick={() => onFormat('italic')}
            title="Italic (*text*)"
            className="rounded p-1.5 hover:bg-zinc-200 text-zinc-700 transition-colors"
          >
            <Italic className="h-4 w-4" />
          </button>
          <button
            id="btn-format-strikethrough"
            type="button"
            onClick={() => onFormat('strikethrough')}
            title="Strikethrough (~~text~~)"
            className="rounded p-1.5 hover:bg-zinc-200 text-zinc-700 transition-colors"
          >
            <Strikethrough className="h-4 w-4" />
          </button>
        </div>

        {/* Lists and Quotes */}
        <div className="flex items-center border-r border-zinc-200 pr-1 mr-1 gap-0.5">
          <button
            id="btn-format-ul"
            type="button"
            onClick={() => onFormat('ul')}
            title="Unordered List (-)"
            className="rounded p-1.5 hover:bg-zinc-200 text-zinc-700 transition-colors"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            id="btn-format-ol"
            type="button"
            onClick={() => onFormat('ol')}
            title="Numbered List (1.)"
            className="rounded p-1.5 hover:bg-zinc-200 text-zinc-700 transition-colors"
          >
            <ListOrdered className="h-4 w-4" />
          </button>
          <button
            id="btn-format-task"
            type="button"
            onClick={() => onFormat('task')}
            title="Task List (- [ ])"
            className="rounded p-1.5 hover:bg-zinc-200 text-zinc-700 transition-colors"
          >
            <ListTodo className="h-4 w-4" />
          </button>
          <button
            id="btn-format-quote"
            type="button"
            onClick={() => onFormat('quote')}
            title="Blockquote (>)"
            className="rounded p-1.5 hover:bg-zinc-200 text-zinc-700 transition-colors"
          >
            <Quote className="h-4 w-4" />
          </button>
        </div>

        {/* Code & Media */}
        <div className="flex items-center border-r border-zinc-200 pr-1 mr-1 gap-0.5">
          <button
            id="btn-format-code"
            type="button"
            onClick={() => onFormat('code')}
            title="Inline Code (`code`)"
            className="rounded p-1.5 hover:bg-zinc-200 text-zinc-700 transition-colors"
          >
            <Code className="h-4 w-4" />
          </button>
          <button
            id="btn-format-codeblock"
            type="button"
            onClick={() => onFormat('codeblock')}
            title="Code Block (```)"
            className="rounded p-1.5 hover:bg-zinc-200 text-zinc-700 transition-colors"
          >
            <SquareCode className="h-4 w-4" />
          </button>
          <button
            id="btn-format-link"
            type="button"
            onClick={() => onFormat('link')}
            title="Link ([title](url))"
            className="rounded p-1.5 hover:bg-zinc-200 text-zinc-700 transition-colors"
          >
            <LinkIcon className="h-4 w-4" />
          </button>
          <button
            id="btn-format-image"
            type="button"
            onClick={() => onFormat('image')}
            title="Image (![alt](url))"
            className="rounded p-1.5 hover:bg-zinc-200 text-zinc-700 transition-colors"
          >
            <ImageIcon className="h-4 w-4" />
          </button>
          <button
            id="btn-format-table"
            type="button"
            onClick={() => onFormat('table')}
            title="Table"
            className="rounded p-1.5 hover:bg-zinc-200 text-zinc-700 transition-colors"
          >
            <TableIcon className="h-4 w-4" />
          </button>
          <button
            id="btn-format-hr"
            type="button"
            onClick={() => onFormat('hr')}
            title="Divider (---)"
            className="rounded p-1.5 hover:bg-zinc-200 text-zinc-700 transition-colors"
          >
            <Minus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Templates and Inserters */}
      <div className="flex items-center gap-2">
        {/* Insert Section Menu */}
        <div className="relative" ref={snippetRef}>
          <button
            id="btn-insert-section"
            type="button"
            onClick={() => setSnippetMenuOpen(!snippetMenuOpen)}
            className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-50 shadow-2xs transition-colors"
          >
            <PlusCircle className="h-3.5 w-3.5 text-zinc-500" />
            <span>Add Section</span>
            <ChevronDown className="h-3 w-3 text-zinc-400" />
          </button>

          {snippetMenuOpen && (
            <div
              id="snippet-dropdown-menu"
              className="absolute right-0 top-full z-20 mt-1 w-52 rounded-md border border-zinc-200 bg-white py-1 shadow-lg"
            >
              <div className="px-3 py-1.5 text-2xs font-semibold uppercase tracking-wider text-zinc-400">
                Insert Snippet
              </div>
              {SECTION_SNIPPETS.map((snippet) => (
                <button
                  key={snippet.id}
                  id={`btn-snippet-${snippet.id}`}
                  type="button"
                  onClick={() => {
                    onInsertSnippet(snippet);
                    setSnippetMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-zinc-700 hover:bg-zinc-100 transition-colors"
                >
                  {snippet.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Templates Menu */}
        <div className="relative" ref={templateRef}>
          <button
            id="btn-select-template"
            type="button"
            onClick={() => setTemplateMenuOpen(!templateMenuOpen)}
            className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-50 shadow-2xs transition-colors"
          >
            <FileText className="h-3.5 w-3.5 text-zinc-500" />
            <span>Templates</span>
            <ChevronDown className="h-3 w-3 text-zinc-400" />
          </button>

          {templateMenuOpen && (
            <div
              id="template-dropdown-menu"
              className="absolute right-0 top-full z-20 mt-1 w-64 rounded-md border border-zinc-200 bg-white py-1 shadow-lg"
            >
              <div className="px-3 py-1.5 text-2xs font-semibold uppercase tracking-wider text-zinc-400">
                Load Template
              </div>
              {STARTER_TEMPLATES.map((tpl) => (
                <button
                  key={tpl.id}
                  id={`btn-template-${tpl.id}`}
                  type="button"
                  onClick={() => {
                    onApplyTemplate(tpl);
                    setTemplateMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-zinc-50 transition-colors border-b border-zinc-100 last:border-b-0"
                >
                  <div className="text-xs font-medium text-zinc-900">{tpl.name}</div>
                  <div className="text-2xs text-zinc-500 mt-0.5 line-clamp-1">
                    {tpl.description}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
