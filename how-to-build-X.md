## How to build X?

In this section we will provide high level overview how to build useful stuff using our system.

### Build size tracking

1. Measure size of files that you're interested in (just grab some lib from NPM or use `fs.stat` ).
   We treat that value as an artifact.
1. Save value to Storage API for **current** commit.
1. Get previously saved value for **base** branch from Storage API.
1. Compare these values to get information how build size changed.
1. Use our Report API to report back to github result of comparison.

This is a literally description of what
[@codechcecks/build-size-watcher](https://github.com/codechecks/build-size-watcher) does.

### Visual regression

1. Obtain screenshots of the current state of the app. Use one of many libraries to make screenshots
   of storybook or make screenshots during E2E tests.
1. Save collection of screenshots for **current** commit using Storage API.
1. Retrieve previously saved screenshots for **base** branch from the Storage API.
1. Compare screenshots using one of many libraries available on NPM and create HTML report
   describing all changes etc.
1. Upload the HTML report as normal artifact — artifacts are browserable by default.
1. Obtain the URL to the uploaded HTML report and attach it to Github PR by using Report API.

Using similar logic you can implement code coverage tracking, performance tracking and basically
whatever you want.
