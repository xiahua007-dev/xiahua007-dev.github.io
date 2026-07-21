# AGENTS.md

This repository is a Vite + React personal homepage deployed with GitHub Pages.

## Project structure

- `src/main.jsx`: React page structure and lightweight browser interactions.
- `src/siteData.js`: editable content data for profile, projects, writing topics, and contact links.
- `src/styles.css`: main visual system and responsive CSS.
- `public/`: static assets copied by Vite as-is. The favicon lives at `public/favicon.svg`.
- `.github/workflows/deploy.yml`: GitHub Pages deployment workflow. A push to `main` triggers build and deploy.
- `scripts/publish.ps1`: local publish helper used to build, commit, and push.

## Visual direction

The current homepage intentionally follows the visual language of `qiushi-skill`:

- warm paper background (`#f5efe6`)
- vermilion primary color (`#8b1a1a`)
- Chinese serif typography (`Noto Serif SC`, `Songti SC`, `SimSun` fallback)
- double-line framed sections via `.frame`
- red section labels via `.section-label`
- restrained card hover and scroll reveal motion

When changing the design, preserve this direction unless the user explicitly asks for a new style. Avoid generic SaaS gradients, emoji-heavy iconography, and unrelated decorative cards.

The portrait image should keep natural colors. Do not reintroduce `mix-blend-mode: multiply` or strong sepia filters on `.tilted-card img`, because that makes the image inherit the paper background color.

## Development workflow

Install dependencies only when needed:

```powershell
npm install
```

Run local development server:

```powershell
npm run dev
```

Validate before handing off or publishing:

```powershell
npm run build
```

`dist/` is generated output and is ignored by git.

## Publishing workflow

Use the publish helper instead of manually chaining git commands:

```powershell
npm run publish:github
```

Custom commit message:

```powershell
npm run publish:github -- -Message "feat: update homepage"
```

What the script does:

1. runs `npm run build`
2. checks git status
3. stages publishable project files
4. commits changes
5. pushes to `origin/<current-branch>`
6. lets GitHub Actions deploy GitHub Pages from `.github/workflows/deploy.yml`

The script explicitly checks external command exit codes. If build, git add, commit, or push fails, it should stop instead of continuing.

## Deployment notes

- Main branch: `main`
- Remote: `origin` should point to `https://github.com/xiahua007-dev/xiahua007-dev.github.io.git`
- GitHub Pages deployment is handled by GitHub Actions after push.
- If a sandbox blocks `npm run build`, `.git/index.lock`, or `git push`, rerun the publish command with the required approval/escalation instead of bypassing the workflow.

## Agent working rules for this repo

- Keep content edits in `src/siteData.js` when possible.
- Keep visual/system edits in `src/styles.css`.
- Keep structural React edits in `src/main.jsx` minimal and purposeful.
- Always run `npm run build` before final handoff after code/style changes.
- Do not commit generated `dist/` output.
- For browser tab icon changes, update `public/favicon.svg` and verify `index.html` still references `/favicon.svg`.
