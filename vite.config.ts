import { defineConfig } from 'vite'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  base: '/portfolio_lana/',
  build: {
    rollupOptions: {
      input: {
        accueil: resolve(root, 'index.html'),
        projets: resolve(root, 'projets.html'),
        auBonheur: resolve(root, 'projets/au-bonheur.html'),
        ampoules: resolve(root, 'projets/detection-ampoules.html'),
        appareil: resolve(root, 'projets/appareil-photo.html'),
        ligne: resolve(root, 'projets/une-ligne-et-des-ames.html'),
        livret: resolve(root, 'projets/livret-de-voyage.html'),
        formes: resolve(root, 'projets/formes-d-amis.html'),
        aPropos: resolve(root, 'a-propos.html'),
        contact: resolve(root, 'contact.html'),
      },
    },
  },
})
