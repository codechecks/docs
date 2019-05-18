# Developing checks

In this tutorial we are gonna build simplified version of
[build-size-watcher](https://github.com/codechecks/build-size-watcher). It's gonna be able just to
watch size of a single file and doesn't support gzip. We are gonna use yarn in this tutorial but you
can pick npm as well. Lets' start!

We want our check to be fully reusable so we are gonna create new npm package just for it.

```sh
mkdir simple-build-size-watcher
cd simple-build-size-watcher
yarn init -y
```

Let's install codechecks client.

```
yarn add --dev @codechecks/client
```

Let's start developing index.js file. Our check is just a function that takes a path to a file that
we want to observe and it a default export of a module.

```js
const { codechecks } = require("@codechecks/client");

module.exports = function(path) {
  // it's alive!
};
```

Lets calculate size of a file pointed by a path. After quick visit at stackoverflow we can come up
with a function getSize:

```js
const fs = require("fs");
function getSize(path) {
  const stats = fs.statSync(path);
  return stats.size;
}
```

Since we want to track how this value changes in time we need to upload it to StorageAPI. Client
makes this super simple:

```js
const { codechecks } = require("@codechecks/client");

module.exports = function(path) {
  const currentSize = getSize(path);
  await codechecks.saveValue("simple-build-size-watcher", currentSize);
};
```

`saveValue` takes two arguments: unique name of a value and any value. Saving data to storage api is
automatically prefixed with **current SHA** (opposed to reading).

Yay, we are half way through. Now we need to get previous build size and compare two values.
Remember that value for base branch may not exist, then we just assume it's 0. Nothing simpler:

```js
const { codechecks } = require("@codechecks/client");
const bytes = require("bytes");

module.exports = async function(path) {
  const currentSize = getSize(path);
  await codechecks.saveValue("simple-build-size-watcher", currentSize);

  const baseSize = (await codechecks.getValue("simple-build-size-watcher")) || 0;

  const diff = currentSize - baseSize; // ex. 1231
  const formattedBytes = bytes(diff); // "1KB"
};
```

Note how we can use existing packages to easily nicely format bytes into something readable. Now the
very last thing that we need to do is report data back to github. We use report api for that.

```js
const { codechecks } = require("@codechecks/client");
const bytes = require("bytes");

module.exports = async function({ path }) {
  const currentSize = getSize(path);
  await codechecks.saveValue("simple-build-size-watcher", currentSize);

  const baseSize = (await codechecks.getValue("simple-build-size-watcher")) || 0;

  const diff = currentSize - baseSize; // ex. 1231
  const formattedBytes = bytes(diff); // "1KB"

  await codechecks.success({
    name: "Simple Build Size",
    shortDescription: `Size changed by: ${formattedBytes} Total size: ${bytes(currentSize)}`,
  });
};

const fs = require("fs");
function getSize(path) {
  const stats = fs.statSync(path);
  return stats.size;
}
```

That's it. Whole code is placed in `/example` directory of this repo.

## Testing

Because codechecks client is an external dependency that is supposed to be imported by your modules
this makes testing a little bit harder. We recommend to use jest mocking super powers. Tests for
this project are part of `/example` dir.

You can find more complicated example here:
https://github.com/codechecks/build-size-watcher/tree/master/src/__tests__

## Debugging

For compatibility with codechecks client, to provide debug logs use `debug` package with
`codechecks:YOUR_CHECK_NAME` namespace.
