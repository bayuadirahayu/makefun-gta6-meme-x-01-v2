// main.ts — gta6-meme-x-01 v2 entry program.
// The entry itself is the X post: the house reads the post from X, so this
// program only hands over the two files the house reads from the repository —
// the meme picture and the post's address. Nothing else it writes is judged.
import { cpSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(here, "out");
mkdirSync(outDir, { recursive: true });

// Copy one entry file next to this program into the output directory,
// refusing to run when a file the house must read is missing.
function handOver(name: string) {
  const src = join(here, name);
  if (!existsSync(src)) throw new Error(`missing ${name} next to main.ts`);
  cpSync(src, join(outDir, name));
}

handOver("meme.png");
handOver("POST.json");

console.log("copied meme.png and POST.json to", outDir);

// Deterministic by construction: the program only copies two files it ships
// with, byte for byte, so two runs always produce identical outputs.
