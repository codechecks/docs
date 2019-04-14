# Local mode

Local mode enables you to simulate codechecks running on your local machine.

To use it just run `codechecks` CLI on local machine. If you want to explicitly provide project slug
use `--project` option ex. `codechecks --project krzkaczor/ts-essentials`.

It will try to get all required information from GIT repository like project slug (based on remote
config), changed files etc. Codechecks API for public repos is read only without any auth so you can
access baselines. Any reports will be rendered in console. It will always simulate PR to master
branch.
