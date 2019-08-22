# Adding new CI

This is a mini-guide on adding new CI provider to
[JavaScript client](https://github.com/codechecks/monorepo).

1. Create new file in `packages/client/src/ci-providers`. You can copy `Circle.ts` and use it as
   scaffolding.
2. If your CI creates explicit CI run on PR creation then set `supportsSpeculativeBranchSelection`
   to false. Otherwise return true. For example: CircleCI always runs your code on push. That's why
   we sometimes need to "guess" base branch (only before PR is really created by the user).
   [Read more](https://github.com/codechecks/docs/blob/master/configuration.md#speculative-branch-execution)

3. Implement rest of the class
4. Don't forget to add tests. Currently we test new CI providers by adding raw environment dump (you
   can use `printenv`) and asserting correct data.
   [Example](https://github.com/codechecks/monorepo/blob/master/packages/client/src/ci-providers/__tests__/Circle.test.ts)
