# THIS SITE IS VIBECODED, DO NOT LOOK

# Portfolio GitHub Pages Deployment

Built with **React + Vite**, bundled as a static site with relative asset paths for GitHub Pages compatibility.

## Deploy to GitHub Pages

### Option A Push the `dist/` folder directly

```bash
# From inside this project folder:
npm run build

# Then push only the dist/ contents to gh-pages branch:
git subtree push --prefix dist origin gh-pages
```

### Option B Use `gh-pages` npm package

```bash
npm install --save-dev gh-pages
z
# Add to package.json scripts:
# "deploy": "gh-pages -d dist"

npm run build
npm run deploy
```

### Option C GitHub Actions (recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with: { node-version: "20" }
      - run: npm ci && npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Development

```bash
npm install
npm run dev
```

## Customize

- **Hero roles**: edit the `ROLES` array in `src/components/Hero.jsx`
- **Projects**: edit the `PROJECTS` array in `src/components/Projects.jsx`
- **Skills**: edit `SKILL_GROUPS` in `src/components/Skills.jsx`
- **Links**: update hrefs in `Contact.jsx` and `Hero.jsx`
