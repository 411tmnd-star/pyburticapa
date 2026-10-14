// Test harness only: lets Node resolve extensionless relative imports (as Next.js/bundlers do) to .ts files,
// including a directory import such as "../src/lib/pipeline" -> "../src/lib/pipeline/index.ts".
//
// Run tests with:  node --import ./tests/resolve-ts.mjs --experimental-transform-types --test tests/*.test.ts
// (--experimental-transform-types is needed because the sources use TypeScript constructor parameter properties.)
import { register } from "node:module";

const hook = `
export async function resolve(specifier, context, nextResolve) {
  try { return await nextResolve(specifier, context); }
  catch (e) {
    if (specifier.startsWith('.') && !/\\.[a-z]+$/.test(specifier)) {
      try { return await nextResolve(specifier + '.ts', context); }
      catch { return await nextResolve(specifier + '/index.ts', context); }
    }
    throw e;
  }
}`;
register("data:text/javascript," + encodeURIComponent(hook), import.meta.url);
