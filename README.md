# Mohd Saquib — Portfolio

The source for [mohdsaquib.com](https://mohdsaquib.com), a dependency-free static portfolio highlighting my cloud infrastructure experience, certifications, education, and selected projects.

## About the site

The site is built with static HTML, CSS, and JavaScript. It uses Bootstrap and a small set of browser-loaded libraries already included by the site, so there is no package installation or build step.

Main areas include:

- Home and professional overview
- Experience, certifications, education, and recognition
- Project portfolio
- Detailed project case studies
- Release notes
- Custom 404 page

## Run locally

Python 3 is the only local requirement.

```bash
python3 serve.py
```

Then open [http://127.0.0.1:4173](http://127.0.0.1:4173).

The local server uses the site's custom `404.html` page for missing routes. For a basic preview, you can also run:

```bash
python3 -m http.server 4173
```

## Project structure

```text
.
├── assets/       Images, certification badges, logos, and favicons
├── content/      Experience, projects, case studies, and release notes
├── css/          Shared and page-specific styles
├── deployment/   Infrastructure configuration references
├── js/           Shared navigation and footer behavior
├── 404.html      Custom not-found page
├── index.html    Home page
├── robots.txt    Search crawler directives
├── sitemap.xml   Search engine sitemap
└── serve.py      Dependency-free local development server
```

## Deploy to AWS

The production site is designed for static hosting with:

- Amazon S3 for site files
- Amazon CloudFront for content delivery
- AWS Certificate Manager for TLS certificates
- Amazon Route 53 for DNS

Only the public site files should be copied to the S3 bucket:

- `index.html`
- `404.html`
- `robots.txt`
- `sitemap.xml`
- `assets/`
- `content/`
- `css/`
- `js/`

Files such as `.git/`, `.gitignore`, `serve.py`, and `deployment/` are repository or local-development files and should not be uploaded as website content.

## Updating the repository

Review the changes before committing:

```bash
git status
git diff --stat
```

Commit and publish an update:

```bash
git add -A
git diff --cached --stat
git commit -m "Modernize portfolio site"
git pull --rebase origin master
git push origin master
```
