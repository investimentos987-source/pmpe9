// Registro central de imagens do projeto.
//
// Os arquivos vivem em public/images (fonte) e são espelhados em
// src/assets/images (npm run dev/build sincroniza via scripts/sync-images.mjs).
// Importados pelo bundler, eles entram no grafo de módulos do Vite e, no build
// single-file (vite-plugin-singlefile), são embutidos como data-URI base64 no
// próprio HTML — garantindo renderização em QUALQUER contexto: dev server,
// preview sandboxado sem rede e até um arquivo .html aberto sozinho.
const modules = import.meta.glob('/src/assets/images/*.jpg', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

export function img(fileName: string): string {
  const url = modules[`/src/assets/images/${fileName}`];
  if (!url) {
    throw new Error(`[images] Arquivo não encontrado no bundle: ${fileName}`);
  }
  return url;
}

/** Nomes disponíveis (diagnóstico). */
export const bundledImages = Object.keys(modules)
  .map((k) => k.split('/').pop() as string)
  .sort();
