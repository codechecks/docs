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
settings:
  branches:
    - dev
    - master
```

This is a preferable way of defining checks (plugins). It's fully declarative and using yml make it
very readable. It works only with external checks ie. checks that part of your package.json.

Resolution engine for check's names will first try to find: `@codechecks/NAME` and then NAME in node
modules and pass options.

### Settings

Client will always try to load settings from `codechecks.yml/json` file

#### Speculative branch execution

This is a feature useful for CI systems that are not triggered by PR creation but rather commit
push.

Imagine a situation you create a new branch and push some changes. You are happy with these changes
so you create a PR. Most of CI providers by this time already run whole CI pipeline for pushed
commit — CI was triggered by pushing new commit. That's why when codechecks ran we didn't know
anything about PR because it didn't exist then. That's why we will try to "guess" base branch for
you. This is currently useful only with Circle CI.

You can switch off this behaviour by specifying `speculativeBranchSelection: false` in yml.

By default we will always try to point speculative PRs to `master` branch. If you use more
complicated branching model you can specify them as following:

```yml
branches:
  - dev
  - master
```

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

## CLI

- `--fail-fast` — stops running checks after the first failure, works only in local mode. CLI exits
  with non-zero code. This might be useful for executing codechecks in precommit hooks.
