<p align="center">
  <h3 align="center">Simple build size watcher</h3>
</p>

## Install

```sh
npm add --save-dev simple-build-size-watcher
```

or

```sh
yarn add --dev simple-build-size-watcher
```

## Usage

Add to your `codechecks.json` file:

<!-- prettier-ignore -->
```json5
{
  "checks": [
    {
      "name": "simple-build-size-watcher",
      "options": {
        "path": "./index.js"
      }
    }

    // ...
  ]
}
```

With each pull request you will get information how does build size change over time.

## Licence

MIT @ [codechecks.io](https://codechecks.io)
