# Configuration

JS Client by default will try to find codechecks.json, codechecks.js and codechecks.ts files and
execute all that really exist. In near future we might support yml as well.

## codechecks.json

```json5
{
  checks: [
    {
      name: "type-coverage-watcher",
    },

    // ... any other check
  ],
}
```

This is a preferable way of defining checks (plugins) to execute. It's fully declarative.

## codechecks.ts/js

If you want to execute arbitrary logic this is the way to go. The only thing you need to do is
export async function from your module. We support es6 named export `main`, default export and
commonjs export.
