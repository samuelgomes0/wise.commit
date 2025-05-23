# 🧠 wisecommit

**Automated Conventional Commit Message Generator**  
Generate Conventional Commit messages automatically based on your staged files. Simple, configurable, and developer-friendly.

## ✅ Features

- 🔍 Auto-analyze staged files.
- ✨ Optional emoji support.
- ⚡ Auto-commit mode.
- 🛠 Configurable with persistent settings in `~/.wisecommitrc`.
- 🚫 Gracefully handles non-Git directories.
- 💻 Designed for modern developer workflows.

## 🚀 Installation

```bash
npm install -g wisecommit
```

or for local development:

```bash
npm link
```

## ⚙️ Configuration

**Configuration is saved globally** in:

```
~/.wisecommitrc
```

Example:

```json
{
  "emojis": true,
  "lang": "en",
  "apiKey": "sk-..."
}
```

## 💾 Saving configuration

Configuration is **automatically saved** when you pass flags:

```bash
wisecommit --emojis=true --api-key=sk-xxxx
```

➡️ Saved to `~/.wisecommitrc` automatically.

Check your current configuration:

```bash
wisecommit config
```

## ⚡ Usage

```bash
wisecommit [options]
```

Example:

```bash
wisecommit --emojis=true --commit
```

## 🛠 Options

| Option                 | Description                       | Default |
| ---------------------- | --------------------------------- | ------- |
| `-l, --limit <number>` | Limit number of files to process  | 10      |
| `-c, --commit`         | Automatically create Git commits  | false   |
| `--emojis <boolean>`   | Include emojis in commit messages | false   |
| `--api-key <key>`      | Set Groq API Key                  | -       |

## 📦 Example workflow

```bash
git add .
wisecommit --emojis=true
```

Example output:

```
✅ Configuration saved to ~/.wisecommitrc
🔍 Generating commit messages...

💡 Suggested commit messages:

✨ feat(index.ts): update index logic
✨ chore(package.json): update dependencies
```

## 🚫 Not in a Git repository?

Graceful message:

```
🚫 No Git repository detected in this directory.
💡 Tip: Initialize a repository with `git init` before using this command.
```

## 📝 Auto-committing

Use:

```bash
wisecommit --commit
```

The tool will sequentially create commits with the suggested messages.

## ❗ Requirements

- Node.js >= 14
- Git installed
- (Optional) Groq API Key

## 🚧 Roadmap

- [ ] Multi-language support.
- [ ] Enhanced AI commit message generation.
- [ ] Plugin system for custom commit styles.
- [ ] Dry-run mode for safe previews.

## 🤝 Contributing

1. Fork the repo.
2. Create your feature branch: `git checkout -b feature/my-feature`.
3. Commit your changes.
4. Push to the branch.
5. Open a pull request.

## 🛡️ License

MIT © Samuel Gomes Rosa

## 💡 Inspiration

Inspired by tools like `commitizen` and `opencommit` with a focus on AI integration and user-friendly automation.

## ✅ Ready to elevate your commits?

**→ Run `wisecommit` and never write boring commits again!**
