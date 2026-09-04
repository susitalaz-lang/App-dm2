# README.md Editor & Previewer

A streamlined, browser-based Markdown editor and live preview tool built with React, Tailwind CSS, and TypeScript. Designed for writing, previewing, formatting, and exporting high-quality project documentation and `README.md` files.

## Features

- **Live GitHub-Flavored Preview**: Real-time rendering including headings, tables, task lists, code blocks, and blockquotes.
- **Markdown Quick Formatting**: Instant shortcuts for bold, italic, strikethrough, lists, links, images, tables, and code formatting.
- **Section Inserters & Templates**: Pre-configured templates for open-source projects, minimal setups, and libraries.
- **Word & Readability Stats**: Live metrics tracking word count, character count, and estimated reading time.
- **Export & Portability**: Copy raw markdown directly to your clipboard or download as a standalone `README.md` file.
- **Flexible View Modes**: Split-screen, editor-only, and preview-only modes optimized for both desktop and mobile screens.

## Getting Started

### Installation

Clone the repository and install the dependencies:

```bash
npm install
```

### Running the Development Server

Start the local Vite development server:

```bash
npm run dev
```

Visit `http://localhost:3000` to access the application.

### Building for Production

To create an optimized production build:

```bash
npm run build
```

## Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Markdown Processing**: `react-markdown` and `remark-gfm`
- **Build Tool**: [Vite](https://vitejs.dev/)

## License

Apache-2.0
