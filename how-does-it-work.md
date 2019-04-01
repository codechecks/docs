# How does it work?

## API
Core of the codececks is an Codechecks' API. 

It allows for storing, retrieving and browsing artifacts. An artifact can be anything: piece of json, file or whole directory. Also, it can be a servable content like HTML, this way you can present any complicated data to users in form of HTML report. 

Another important task of API is communication with Github. Codechecks require installing GitHub app on repos that you're interested in. This allows us to provide feedback information using GitHub Checks API. Support for other services like BitBucket and GitLab is coming soon.

## Client
...