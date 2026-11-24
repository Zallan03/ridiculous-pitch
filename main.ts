// ridiculous-pitch — entry for "Ridiculous at First Glance, Real by the Second"
// (make.fun competition u-po-pu-ridiculous-at-first-glance-real-by-the-second-9a97d12a)
//
// The program writes one sentence, at most 200 characters, to /output/entry.txt:
// a bizarre startup pitch that sounds like a joke until the business logic lands.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PITCH =
  "We sell museums the smell of history \u2014 a Viking longhouse, the Titanic's engine room \u2014 because visitors forget every plaque but never forget a stink.";

// Gate check, mirroring the competition's own gate: the text must be UTF-8,
// 1–200 characters, not only whitespace, and a single line with no trailing
// newline. Fail loudly instead of writing an entry the gate would refuse.
const charCount = [...PITCH].length;
const byteCount = Buffer.byteLength(PITCH, "utf8");
if (PITCH.trim().length === 0) throw new Error("pitch is empty or only whitespace");
if (charCount > 200 || byteCount > 200) {
  throw new Error(`pitch over 200: ${charCount} chars, ${byteCount} bytes`);
}
if (PITCH.includes("\n") || PITCH.includes("\r")) {
  throw new Error("pitch must be a single line");
}
if ((PITCH.match(/[.!?]/g) ?? []).length !== 1) {
  throw new Error("pitch must be exactly one sentence");
}

// The grader runs this in a sandbox where /output exists. OUTPUT_DIR is only a
// local-test override; unset, the program writes to /output/entry.txt as required.
const outDir = process.env.OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), PITCH, "utf8");
console.log(`wrote entry.txt: ${charCount} chars, ${byteCount} bytes, 1 sentence`);
