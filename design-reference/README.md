# Design reference

`figma-make-source/` is a verbatim archive of the Figma Make prototype
("Implement Website Design Prompt") that the Astro site in the repository root
was implemented from. It is kept for visual and structural comparison only.

It is **not** part of the build and cannot run outside Figma Make (its Vite
config depends on Figma-internal files). Its `package.json` is stored as
`package.reference.json` so hosting platforms do not mistake the folder for a
deployable app. The project root (`./`) is the only thing to deploy.
