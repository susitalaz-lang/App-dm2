import React, { KeyboardEvent, RefObject } from 'react';
import { applyFormatting, FormatType } from '../utils/markdownHelpers';

interface MarkdownEditorProps {
  value: string;
  onChange: (val: string) => void;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  onFormat: (format: FormatType) => void;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value,
  onChange,
  textareaRef,
  onFormat,
}) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Tab key indent
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);

      requestAnimationFrame(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      });
      return;
    }

    // Ctrl/Cmd shortcuts
    if (e.metaKey || e.ctrlKey) {
      if (e.key.toLowerCase() === 'b') {
        e.preventDefault();
        onFormat('bold');
      } else if (e.key.toLowerCase() === 'i') {
        e.preventDefault();
        onFormat('italic');
      } else if (e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onFormat('link');
      }
    }
  };

  return (
    <div
      id="markdown-editor-pane"
      className="flex flex-col h-full bg-white relative overflow-hidden"
    >
      <div className="flex items-center justify-between border-b border-zinc-200/80 bg-zinc-50/50 px-4 py-1.5 text-xs font-medium text-zinc-500">
        <span className="uppercase tracking-wider text-2xs font-semibold text-zinc-400">
          Raw Markdown Source
        </span>
        <span className="text-2xs text-zinc-400">
          Markdown + GFM Supported
        </span>
      </div>

      <div className="relative flex-1 overflow-hidden flex">
        <textarea
          id="markdown-textarea"
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type or paste your Markdown here..."
          spellCheck={false}
          className="w-full h-full resize-none border-0 bg-transparent p-4 font-mono text-sm leading-relaxed text-zinc-800 focus:outline-none focus:ring-0 selection:bg-blue-100 selection:text-blue-900"
        />
      </div>
    </div>
  );
};
