# Getting started

**Note: we are in close beta**

First of all, contact us at hello@codechecks.io to get your secret code, needed to set up the
project.

Install our Github app using this link: https://github.com/apps/codechecks Please install it only on
repos that you really need (just for now).

In this mini tutorial we assume that you develop frontend app so we want to watch how build size is
changing between PRs. We can use already existing codecheck:
https://github.com/codechecks/build-size-watcher

Let's start with installing deps:

- yarn add --dev @codechecks/client @codechecks/build-size-watcher

Now, let's create `codechecks.json` file which allows to declaratively configure multiple checks.
Note that there are also other ways to use codechecks, for example you can create codechecks.ts (or
js) file and execute arbitrary code (including other codechecks) and access API directly.

`codechecks.json`:

```json
{
  "checks": [
    {
      "name": "build-size-watcher",
      "options": {
        "gzip": false,
        "files": [
          { "path": "./build/static/js/*.js" },
          { "path": "./build/static/css/*.css" },
          { "path": "./build/static/images/*" }
        ]
      }
    }
  ]
}
```

We specify that we want to track JS, CSS and images. Note that by using wildcards we track correctly
files with hashes. You might want to tweaks these paths depending on your file structure.

We are almost done, last thing is to actually run codechecks as part of your CI pipeline. So far we
support only CircleCI (travis support is coming soon). Important bit here is that you need to build
app before running codehecks (so we can measure it's size). You can see sample here:
https://github.com/OasisDEX/eth2dai/blob/4bc1606dfbe0f002261b24fefc0a5c47c0cd950c/.circleci/config.yml#L72
To run codehecks simple do `yarn codechecks`.

Make sure to add `CC_SECRET` environment variable to your CI secrets. That's it! Push your changes,
create PR and see how we measure build size. Remeber, this is one of the simplest codechecks,
imagine all the possibilities! 🔥
