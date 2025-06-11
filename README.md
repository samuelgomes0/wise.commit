# 🧠 wise.commit

**Automated Conventional Commit Messages with AI Assistance**  
Make your Git workflow smarter. `wise.commit` analyzes your staged changes and generates Conventional Commits automatically — with optional emojis, configuration persistence, and seamless Git integration.

[![NPM Version](https://img.shields.io/npm/v/wise.commit?color=blue)](https://www.npmjs.com/package/wise.commit)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)
[![Node Version](https://img.shields.io/node/v/wise.commit)](https://nodejs.org/)

---

## ✨ Overview

`wise.commit` is a CLI tool that uses AI to generate [Conventional Commit](https://www.conventionalcommits.org/) messages based on your staged files. It streamlines commit creation, improves consistency, and supports customization to suit your workflow.

---

## 🔧 Key Features

- 📁 Context-aware commit message generation based on `git diff`.
- 🤖 AI-powered suggestions (via Groq LLM).
- ✨ Optional emoji support for visual flair.
- 💾 Persistent global configuration (`~/.wisecommitrc`).
- ⚡ One-liner auto-commit support.
- 🧱 Works smoothly even outside Git projects (with graceful error handling).

---

## 📦 Installation

### Global (recommended)

```bash
npm install -g wise.commit
```

### Local Development

```bash
git clone https://github.com/samuelgomes0/wise.commit.git
cd wise.commit
npm install
npm link
```

---

## ⚙️ Configuration

`wise.commit` stores its configuration globally in:

```bash
~/.wisecommitrc
```

### Sample `.wisecommitrc`

```json
{
  "emojis": true,
  "lang": "en",
  "apiKey": "sk-..."
}
```

You can modify these manually or automatically via CLI flags.

### Set config from CLI

```bash
wisecommit --emojis=true --api-key=sk-xxxx
```

✅ The config will be saved automatically.

### View current configuration

```bash
wisecommit config
```

---

## 🚀 Usage

```bash
wisecommit [options]
```

### Example

```bash
git add .
wisecommit --emojis=true --commit
```

🔍 Sample output:

```bash
✅ Configuration saved to ~/.wisecommitrc
🔍 Analyzing changes...

✨ feat(index.ts): improve validation logic
📦 chore(package.json): update dependency versions
```

---

## 🛠 Available Options

| Flag                   | Description                              | Default |
| ---------------------- | ---------------------------------------- | ------- |
| `-l, --limit <number>` | Max number of files to analyze           | `10`    |
| `-c, --commit`         | Automatically create commits from output | `false` |
| `--emojis <boolean>`   | Enable emojis in generated messages      | `false` |
| `--api-key <key>`      | Define your Groq API key                 | —       |

---

## ❗ Requirements

- **Node.js** ≥ 14
- **Git** installed
- **Groq API Key** (for LLM-powered commit generation)

---

## 📂 Sample Workflow

```bash
git init
touch index.js
git add index.js
wisecommit --emojis=true --commit
```

---

## 🚫 Not a Git Repository?

The tool will handle it gracefully:

```bash
🚫 No Git repository detected in this directory.
💡 Tip: Run `git init` to get started.
```

---

## 🛣️ Roadmap

- [ ] i18n support for multiple languages
- [ ] Smarter AI commit generation
- [ ] Plugin system for custom commit formats
- [ ] Dry-run and interactive preview modes

---

## 🤝 Contributing

We welcome contributions! To get started:

1. Fork this repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes
4. Push to your fork
5. Open a pull request

---

## 📄 License

MIT License © [Samuel Gomes Rosa](https://github.com/samuelgomes0)

---

## 💡 Inspiration

This tool was inspired by the practicality of `commitizen`, the automation of `opencommit`, and the power of modern LLMs — designed to eliminate decision fatigue when writing commit messages.

---

## ✅ Ready to commit like a pro?

**Run `wisecommit` and let your commits speak for themselves.**
