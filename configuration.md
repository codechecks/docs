# Configuration

JS Client by default will try to find codechecks.json, codechecks.js and codechecks.ts files and
execute all that exist. In near future we might support yml as well.

## codechecks.json

<!-- prettier-ignore -->
```json5
{
  "checks": [
    {
      "name": "commit-deployment",
      "options": {
        "buildPath": "./dist"
      }
    }

    // ...
  ]
}
```

This is a preferable way of executing external checks (plugins). It's fully declarative. It will
first try to find: `@codechecks/NAME` and then NAME in node modules and pass options.

## codechecks.ts/js

If you want to execute arbitrary logic this is the way to go. The only thing you need to do is
export async function from your module. We support es6 named export `main`, default export and
commonjs export.

To specify custom file just use codechecks [FILES] Specifying multiple files makes sense because you
should favour JSON configs but sometimes you still have custom rules that you need to define in `js`
or `ts`.
