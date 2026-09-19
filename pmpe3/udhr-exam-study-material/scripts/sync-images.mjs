// Espelha public/images -> src/assets/images (rodado antes de dev/build).
import { cpSync, mkdirSync, readdirSync } from 'node:fs';

mkdirSync('src/assets/images', { recursive: true });
cpSync('public/images', 'src/assets/images', { recursive: true });
const n = readdirSync('src/assets/images').filter((f) => f.endsWith('.jpg')).length;
console.log(`sync-images: ${n} imagens disponíveis para o bundler.`);
