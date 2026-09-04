import { DocumentStats } from '../types';

export function calculateDocumentStats(text: string): DocumentStats {
  const characters = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text ? text.split('\n').length : 0;
  // Average reading speed ~ 200 words per minute
  const readingTimeMinutes = Math.max(1, Math.ceil(words / 200));

  return {
    characters,
    words,
    lines,
    readingTimeMinutes,
  };
}

export type FormatType =
  | 'bold'
  | 'italic'
  | 'strikethrough'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'quote'
  | 'code'
  | 'codeblock'
  | 'ul'
  | 'ol'
  | 'task'
  | 'link'
  | 'image'
  | 'table'
  | 'hr';

export function applyFormatting(
  textarea: HTMLTextAreaElement,
  format: FormatType,
  currentValue: string,
  setValue: (newVal: string) => void
) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = currentValue.substring(start, end);

  let prefix = '';
  let suffix = '';
  let placeholder = '';

  switch (format) {
    case 'bold':
      prefix = '**';
      suffix = '**';
      placeholder = 'bold text';
      break;
    case 'italic':
      prefix = '*';
      suffix = '*';
      placeholder = 'italic text';
      break;
    case 'strikethrough':
      prefix = '~~';
      suffix = '~~';
      placeholder = 'strikethrough text';
      break;
    case 'h1':
      prefix = '# ';
      placeholder = 'Heading 1';
      break;
    case 'h2':
      prefix = '## ';
      placeholder = 'Heading 2';
      break;
    case 'h3':
      prefix = '### ';
      placeholder = 'Heading 3';
      break;
    case 'quote':
      prefix = '> ';
      placeholder = 'Quote block';
      break;
    case 'code':
      prefix = '`';
      suffix = '`';
      placeholder = 'code';
      break;
    case 'codeblock':
      prefix = '```typescript\n';
      suffix = '\n```';
      placeholder = '// your code here';
      break;
    case 'ul':
      prefix = '- ';
      placeholder = 'List item';
      break;
    case 'ol':
      prefix = '1. ';
      placeholder = 'Ordered item';
      break;
    case 'task':
      prefix = '- [ ] ';
      placeholder = 'Pending task';
      break;
    case 'link':
      prefix = '[';
      suffix = '](https://example.com)';
      placeholder = 'Link text';
      break;
    case 'image':
      prefix = '![';
      suffix = '](https://via.placeholder.com/600x300)';
      placeholder = 'Alt text';
      break;
    case 'table':
      prefix =
        '\n| Header 1 | Header 2 | Header 3 |\n| :--- | :--- | :--- |\n| Value 1 | Value 2 | Value 3 |\n| Value 4 | Value 5 | Value 6 |\n';
      break;
    case 'hr':
      prefix = '\n---\n';
      break;
  }

  const insertText = selectedText || placeholder;
  const replacement = `${prefix}${insertText}${suffix}`;
  const nextValue =
    currentValue.substring(0, start) + replacement + currentValue.substring(end);

  setValue(nextValue);

  // Restore cursor and focus
  requestAnimationFrame(() => {
    textarea.focus();
    if (selectedText) {
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    } else if (placeholder) {
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + placeholder.length
      );
    } else {
      const newCursor = start + replacement.length;
      textarea.setSelectionRange(newCursor, newCursor);
    }
  });
}
