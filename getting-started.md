# Getting started

Codechecks is a open source platform for code review automation. It allows to create reusable
plugins (aka. "codechecks") that can track any metric of your code (like build-size, or test
coverage) and it integrates directly with GitHub PR flow. A `codecheck` can be even more complicated
and perform for example visual regression between screenshots of the frontend app.

If you want to use already created codecheck, you need to install our GitHub app, setup CI secret,
drop `codechecks.yml` file into your repository and you're done!

Here's a step by step guide.

First of all, you need to install Github CodeChecks app on repositories that you're interested using
with CC.

![Codechecks App](/images/getting-started/app.png)

1. Log into our [web application](https://app.codechecks.io/) using Github.
2. Click "Add new project" button
3. You will be redirected back into Github interface where you need to select appropriate
   repositories. Note: support for private repositories is in closed beta. Please send as an email
   to [hello@codechecks.io](mailto:hello@codechecks.io) to enable them.
4. Once done you should be able to see all repositories within our app (if not please refresh). Note
   that in the right top corner you can switch between orgs.
5. Copy secret using "copy" button and paste it as secret environment inside your CI interface:

```
CC_SECRET=COPIED SECRET
```

[List of supported CI providers](./supported-ci.md)

In this mini tutorial we assume that you develop frontend app so we want to watch how build size is
changing between PRs. Already existing codecheck does exactly this:
https://github.com/codechecks/build-size-watcher

Let's start with installing deps:

```sh
yarn add --dev @codechecks/client @codechecks/build-size-watcher
```

Now, let's create `codechecks.yml` (json is supported as well) file which is used to declaratively
configure multiple checks. Note that there are also other ways to use codechecks, for example you
can create codechecks.ts (or js) file and execute arbitrary code (including other codechecks) and
access API directly.

`codechecks.yml`:

```yml
checks:
  - name: build-size-watcher
    options:
      gzip: false
      files:
        - path: "./build/static/js/*.js"
        - path: "./build/static/css/*.css"
        - path: "./build/static/media/*"
```

We specify that we want to track JS, CSS and images. Note that by using wildcards we track correctly
files with hashes. You might want to tweaks these paths depending on your file structure.

We can dry run our config locally. Just type `yarn codechecks`. You should see something similar to:

![localmode](/images/getting-started/localmode.png)

Notice that each status of the file is "new" because this is the very first time we run codechecks.

We are almost done, last thing is to actually run codechecks as part of your CI pipeline. Important
bit here is that you need to build app before running codechecks (so we can measure it's size). You
can see sample here:
https://github.com/OasisDEX/eth2dai/blob/4bc1606dfbe0f002261b24fefc0a5c47c0cd950c/.circleci/config.yml#L72
To run codechecks simple do `npx codechecks` or `yarn codechecks`.

Make sure that you added `CC_SECRET` environment variable to your CI secrets. That's it! Push your
changes, create PR and see how we measure build size. Remember, this is one of the simplest
codechecks, imagine all the possibilities! 🔥
