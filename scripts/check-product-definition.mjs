import { loadProductDefinition } from "../product-factory/lib/definition.mjs";

if (process.argv.length !== 3) {
  throw new Error("Usage: node scripts/check-product-definition.mjs <definition-path>");
}

const definition = await loadProductDefinition(process.argv[2]);
console.log(`PASS: ${definition.slug} ${definition.version}`);
