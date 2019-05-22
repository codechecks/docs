# Configuration

Client by default will try to find `codechecks.yml`, `codechecks.json`, `codechecks.js` and
`codechecks.ts` files and execute all that exist.

To specify custom file just use `codechecks [FILES]`. Specifying multiple files can be useful
because you should favour declarative configs (yml/json) but sometimes you still have custom rules
that you need to define in `js` or `ts` files.

## codechecks.yml

<!-- prettier-ignore -->
```yml
checks:
- name: build-size-watcher
  options:
    gzip: false
    files:
    - path: "./dist/**/*.d.ts"
    - path: "./dist/**/*.js"
```

This is a preferable way of defining checks (plugins). It's fully declarative and using yml make it
very readable. It works only with external checks ie. checks that part of your package.json.

Resolution engine for check's names will first try to find: `@codechecks/NAME` and then NAME in node
modules and pass options.

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

It's the same as YML config but written in JSON.

## codechecks.ts/js

If you want to execute arbitrary logic this is the way to go. The only thing you need to do is
export async function from your module. We support es6 named export `main`, default export and
commonjs export.
