import React, { useState, useRef, useEffect } from 'react';
import {
  Download,
  Copy,
  Check,
  RotateCcw,
  Columns2,
  FileEdit,
  Eye,
  FileText,
  Info
} from 'lucide-react';
import { Toolbar } from './components/Toolbar';
import { MarkdownEditor } from './components/MarkdownEditor';
import { MarkdownPreview } from './components/MarkdownPreview';
import { STARTER_TEMPLATES } from './data/templates';
import {
  applyFormatting,
  calculateDocumentStats,
  FormatType,
} from './utils/markdownHelpers';
import { ReadmeTemplate, SectionSnippet, ViewMode } from './types';

const STORAGE_KEY = 'readme_studio_content';

export default function App() {
  const [markdown, setMarkdown] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved !== null ? saved : STARTER_TEMPLATES[0].content;
  });

  const [fileName, setFileName] = useState<string>('README.md');
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, markdown);
  }, [markdown]);

  const stats = calculateDocumentStats(markdown);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleFormat = (format: FormatType) => {
    if (textareaRef.current) {
      applyFormatting(textareaRef.current, format, markdown, setMarkdown);
    }
  };

  const handleApplyTemplate = (template: ReadmeTemplate) => {
    if (
      markdown.trim() &&
      markdown.trim() !== STARTER_TEMPLATES[0].content.trim()
    ) {
      const confirmReplace = window.confirm(
        `Load "${template.name}" template? This will replace your current editor content.`
      );
      if (!confirmReplace) return;
    }
    setMarkdown(template.content);
    showToast(`Loaded template: ${template.name}`);
  };

  const handleInsertSnippet = (snippet: SectionSnippet) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      setMarkdown((prev) => prev + '\n' + snippet.content);
      return;
    }
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const nextVal =
      markdown.substring(0, start) +
      '\n' +
      snippet.content.trim() +
      '\n' +
      markdown.substring(end);
    setMarkdown(nextVal);
    showToast(`Inserted ${snippet.name}`);
    requestAnimationFrame(() => {
      textarea.focus();
    });
  };

  const handleCopyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      showToast('Markdown copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('Unable to copy to clipboard.');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName.endsWith('.md') ? fileName : `${fileName}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${fileName}`);
  };

  const handleReset = () => {
    const confirmReset = window.confirm(
      'Reset editor back to the standard README template?'
    );
    if (confirmReset) {
      setMarkdown(STARTER_TEMPLATES[0].content);
      showToast('Reset to default README');
    }
  };

  return (
    <div id="readme-app-root" className="flex h-screen w-full flex-col bg-zinc-100 text-zinc-900 overflow-hidden font-sans">
      {/* Top Application Header */}
      <header
        id="app-header"
        className="flex h-14 shrink-0 items-center justify-between border-b border-zinc-200 bg-white px-4 md:px-6"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-900 text-white shadow-2xs">
              <FileText className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold tracking-tight text-sm text-zinc-900">
                README.md
              </span>
              <span className="hidden sm:inline-block rounded bg-zinc-100 px-2 py-0.5 text-2xs font-mono font-medium text-zinc-600 border border-zinc-200">
                Studio
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center ml-4 border-l border-zinc-200 pl-4">
            <input
              id="file-name-input"
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              title="Click to rename document"
              className="h-7 rounded border border-transparent px-2 font-mono text-xs text-zinc-600 hover:border-zinc-300 focus:border-zinc-400 focus:bg-zinc-50 focus:text-zinc-900 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* View Mode Toggle Controls */}
        <div
          id="view-mode-selector"
          className="flex items-center rounded-lg border border-zinc-200 bg-zinc-100 p-0.5"
        >
          <button
            id="view-mode-editor"
            type="button"
            onClick={() => setViewMode('editor')}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
              viewMode === 'editor'
                ? 'bg-white text-zinc-900 shadow-2xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
            title="Raw Markdown Editor"
          >
            <FileEdit className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Write</span>
          </button>
          <button
            id="view-mode-split"
            type="button"
            onClick={() => setViewMode('split')}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
              viewMode === 'split'
                ? 'bg-white text-zinc-900 shadow-2xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
            title="Split Editor and Preview"
          >
            <Columns2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Split</span>
          </button>
          <button
            id="view-mode-preview"
            type="button"
            onClick={() => setViewMode('preview')}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
              viewMode === 'preview'
                ? 'bg-white text-zinc-900 shadow-2xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
            title="Rendered GitHub Preview"
          >
            <Eye className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Preview</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            id="btn-reset-readme"
            type="button"
            onClick={handleReset}
            title="Reset to starter template"
            className="flex items-center gap-1 rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors shadow-2xs"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Reset</span>
          </button>

          <button
            id="btn-copy-markdown"
            type="button"
            onClick={handleCopyMarkdown}
            className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 transition-colors shadow-2xs"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-green-600" />
                <span className="text-green-700">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-zinc-500" />
                <span>Copy</span>
              </>
            )}
          </button>

          <button
            id="btn-download-readme"
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-1.5 rounded-md bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-800 transition-colors shadow-2xs"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download</span>
          </button>
        </div>
      </header>

      {/* Editor Toolbar */}
      {viewMode !== 'preview' && (
        <Toolbar
          onFormat={handleFormat}
          onApplyTemplate={handleApplyTemplate}
          onInsertSnippet={handleInsertSnippet}
        />
      )}

      {/* Main Workspace Split Area */}
      <main id="main-workspace" className="flex-1 overflow-hidden">
        <div className="h-full w-full">
          {viewMode === 'split' && (
            <div className="flex h-full flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-zinc-200">
              <div className="h-1/2 md:h-full md:w-1/2 overflow-hidden">
                <MarkdownEditor
                  value={markdown}
                  onChange={setMarkdown}
                  textareaRef={textareaRef}
                  onFormat={handleFormat}
                />
              </div>
              <div className="h-1/2 md:h-full md:w-1/2 overflow-hidden bg-white">
                <MarkdownPreview content={markdown} />
              </div>
            </div>
          )}

          {viewMode === 'editor' && (
            <div className="h-full w-full overflow-hidden">
              <MarkdownEditor
                value={markdown}
                onChange={setMarkdown}
                textareaRef={textareaRef}
                onFormat={handleFormat}
              />
            </div>
          )}

          {viewMode === 'preview' && (
            <div className="h-full w-full overflow-hidden bg-white">
              <MarkdownPreview content={markdown} />
            </div>
          )}
        </div>
      </main>

      {/* Status Bar */}
      <footer
        id="app-status-bar"
        className="flex h-7 shrink-0 items-center justify-between border-t border-zinc-200 bg-white px-4 text-2xs text-zinc-500 select-none"
      >
        <div className="flex items-center gap-4">
          <span>{stats.words.toLocaleString()} words</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">{stats.characters.toLocaleString()} characters</span>
          <span>•</span>
          <span>{stats.lines.toLocaleString()} lines</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">~{stats.readingTimeMinutes} min read</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden md:flex items-center gap-1 text-zinc-400">
            <Info className="h-3 w-3" />
            <span>Tab = 2 spaces • Ctrl+B Bold • Ctrl+I Italic</span>
          </span>
          <span className="font-mono text-zinc-400 font-medium">UTF-8</span>
        </div>
      </footer>

      {/* Toast Notification */}
      {toastMessage && (
        <div
          id="toast-notification"
          className="fixed bottom-10 right-6 z-50 rounded-lg bg-zinc-900 px-3.5 py-2 text-xs font-medium text-white shadow-xl transition-all"
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
