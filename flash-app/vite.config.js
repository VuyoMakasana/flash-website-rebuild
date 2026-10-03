import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const HOMEPAGE_ONLY_BLOCK = /[ \t]*<!-- homepage-only:start[\s\S]*?<!-- homepage-only:end -->\r?\n?/

// index.html carries a block of homepage-only tags (canonical, og:url,
// twitter:url, Organization/Person JSON-LD). Write shell.html — the same
// page without that block — for vercel.json to serve on every other route.
// Fails the build if the markers go missing, rather than shipping the
// homepage's tags on every page.
function homepageOnlyShell() {
  return {
    name: 'homepage-only-shell',
    apply: 'build',
    writeBundle(options) {
      const dir = options.dir
      const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8')
      if (!HOMEPAGE_ONLY_BLOCK.test(html)) {
        throw new Error('homepage-only markers not found in index.html')
      }
      fs.writeFileSync(path.join(dir, 'shell.html'), html.replace(HOMEPAGE_ONLY_BLOCK, ''))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), homepageOnlyShell()],
})
