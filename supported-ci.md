# Supported CI providers

- Circle CI
- Travis CI
- BuildKite CI
- Semaphore CI

Is your favorite CI provider missing? Just create an issue
[here](https://github.com/codechecks/monorepo). You can implement it on your own, read this
[quick guide](adding-new-ci.md)

## Semaphore CI Known issues

Note that passing secrets requires specifying

```
secrets:
  - name: CC_SECRET
```

in task description.

Unfortunately, at this time Semaphore using codechecks won't have access to detailed PR info (things
like PR title or body information). It also requires
[speculative-branch execution](https://github.com/codechecks/docs/blob/master/configuration.md#speculative-branch-execution)
feature. So please configure branch priority if you use other branches than `master`.

In Semaphore CI settings remember to **turn off** CI execution on pull requests.
