# How does it work?

## System overview

### API

Core of the codechecks is an Codechecks' API.

#### Storage API

It allows for storing, retrieving and browsing artifacts. An artifact can be anything: piece of
json, file or whole directory. Also, it can be a servable content like HTML, this way you can
present any complicated data to users in form of HTML report.

#### Report API

Another important task of API is communication with Github. Codechecks require installing GitHub app
on repos that you're interested in. This allows us to provide feedback information using GitHub
Checks API. Support for other services like BitBucket and GitLab is coming soon.

### JS Client aka @codechecks/client

Client (currently written in TypeScript) allows for easy communication with API. It provides
execution context for plugins by parsing environment variables, getting more information about the
project from API etc. In future there maybe another implementation, written in something other than
TypeScript but it's out of scope for now and we threat JS client as the only official
implementation.

### Particular checks ex. @codechecks/build-size-watcher

JS client enables to write reusable "plugins" (we call them codechecks) in JS and distribute them
directly as NPM packages.
