import { ReadmeTemplate, SectionSnippet } from '../types';

export const STARTER_TEMPLATES: ReadmeTemplate[] = [
  {
    id: 'standard-project',
    name: 'Standard Project',
    description: 'Comprehensive structure with badges, architecture, installation, and usage',
    content: `# Project Name

<!-- BADGES: Replace with your actual project metrics -->
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-informational.svg)](https://github.com)

A concise, one-sentence description of what this project does and the primary problem it solves.

---

## 📌 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#-usage)
- [Configuration](#-configuration)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

- **Blazing Fast**: Engineered with zero bloat and optimized runtime efficiency.
- **Type-Safe**: Full TypeScript coverage with strict compiler checks.
- **Accessible & Tested**: Complies with modern accessibility and unit test standards.
- **Configurable**: Simple environment-based configuration for multiple stages.

---

## 🏛 Architecture

\`\`\`text
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│   Web Client    │ ───>  │   Core Engine   │ ───>  │  Data Storage   │
└─────────────────┘       └─────────────────┘       └─────────────────┘
\`\`\`

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0 (or pnpm / yarn)

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/your-username/project-name.git
   cd project-name
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Set up environment variables:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

---

## 💡 Usage

To run the development server locally:

\`\`\`bash
npm run dev
\`\`\`

Build for production:

\`\`\`bash
npm run build
\`\`\`

---

## ⚙️ Configuration

| Variable | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| \`PORT\` | \`number\` | \`3000\` | Local server listen port |
| \`NODE_ENV\` | \`string\` | \`development\` | Application runtime stage |
| \`API_KEY\` | \`string\` | \`undefined\` | Third-party access token |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the Project
2. Create your Feature Branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your Changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the Branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See \`LICENSE\` for more information.
`
  },
  {
    id: 'minimal-clean',
    name: 'Minimal Clean',
    description: 'Clean, lightweight format for utilities and small repositories',
    content: `# Utility Name

A lightweight utility for streamlining daily developer workflows.

## Installation

\`\`\`bash
npm install -g my-utility
\`\`\`

## Quick Start

\`\`\`javascript
import { formatData } from 'my-utility';

const result = formatData({ sample: "input" });
console.log(result);
\`\`\`

## Checklist

- [x] Initial release
- [x] Full test suite
- [ ] Plugin ecosystem
- [ ] Documentation site

## License

MIT © 2026
`
  },
  {
    id: 'cli-tool',
    name: 'CLI Tool',
    description: 'Specialized layout for command-line interfaces and developer tools',
    content: `# cli-tool

> Next-generation terminal utility for automated project workflows.

## 📦 Installation

\`\`\`bash
# Homebrew (macOS / Linux)
brew install yourname/tap/cli-tool

# Direct npm global
npm install -g @yourname/cli-tool
\`\`\`

## 💻 Commands & Options

\`\`\`bash
cli-tool [command] [options]
\`\`\`

### Global Flags

| Option | Shorthand | Description |
| :--- | :--- | :--- |
| \`--help\` | \`-h\` | Show contextual help message |
| \`--version\` | \`-v\` | Print current CLI version |
| \`--verbose\` | \`-V\` | Run with verbose debug logging |
| \`--dry-run\` | \`-d\` | Simulate execution without applying changes |

### Examples

Generate a fresh workspace:
\`\`\`bash
cli-tool init --template react-app
\`\`\`

Verify configuration health:
\`\`\`bash
cli-tool check --strict
\`\`\`

## 🛡 Security

If you discover a security vulnerability, please send an e-mail to security@example.com instead of opening a public issue.
`
  },
  {
    id: 'api-library',
    name: 'API / Library',
    description: 'Documenting SDKs, packages, and client libraries',
    content: `# Package Name

Modern, high-performance client library for consuming the Cloud API.

[![npm version](https://img.shields.io/npm/v/@scope/pkg.svg)](https://www.npmjs.com/package/@scope/pkg)
[![Downloads](https://img.shields.io/npm/dm/@scope/pkg.svg)](https://www.npmjs.com/package/@scope/pkg)

## Installation

\`\`\`bash
npm install @scope/pkg
\`\`\`

## Quick Example

\`\`\`typescript
import { Client } from '@scope/pkg';

const client = new Client({
  apiKey: process.env.API_KEY,
});

async function run() {
  const data = await client.resources.list({ limit: 10 });
  console.log(data);
}

run();
\`\`\`

## API Reference

### \`new Client(options)\`
Creates an authenticated API client.

- **\`options.apiKey\`** (*string*, required): Your API key from the dashboard.
- **\`options.timeout\`** (*number*, optional): Request timeout in milliseconds (default: 30000).

### \`client.resources.list(params)\`
Returns a paginated list of resources.
`
  }
];

export const SECTION_SNIPPETS: SectionSnippet[] = [
  {
    id: 'badges',
    name: 'Shields.io Badges',
    content: `
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](#)
[![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)](#)
`
  },
  {
    id: 'tech-stack-table',
    name: 'Tech Stack Table',
    content: `
## 🛠 Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 19, TypeScript | Reactive User Interface |
| **Styling** | Tailwind CSS | Design System & Utility Styling |
| **Bundler** | Vite | Rapid HMR & Production Builds |
| **Testing** | Vitest, Playwright | Unit & End-to-End Tests |
`
  },
  {
    id: 'task-checklist',
    name: 'Roadmap / Checklist',
    content: `
## 🗺 Roadmap

- [x] Phase 1: Core engine architecture
- [x] Phase 2: Live preview and syntax rendering
- [ ] Phase 3: Collaborative real-time sync
- [ ] Phase 4: Plugin registry and custom exporters
`
  },
  {
    id: 'faq',
    name: 'FAQ Section',
    content: `
## ❓ Frequently Asked Questions

<details>
<summary><strong>Is this library free for commercial use?</strong></summary>
<p>Yes, this project is licensed under the MIT License and can be freely used in commercial projects.</p>
</details>

<details>
<summary><strong>How do I report a bug?</strong></summary>
<p>Please use GitHub Issues and include a minimal reproducible example.</p>
</details>
`
  },
  {
    id: 'acknowledgments',
    name: 'Acknowledgments',
    content: `
## 🙏 Acknowledgments

- [Awesome README](https://github.com/matiassingers/awesome-readme)
- [Shields.io](https://shields.io/)
- [Lucide Icons](https://lucide.dev/)
`
  }
];
