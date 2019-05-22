# Client API reference

## codechecks: Client

```typescript
export class Client {
  readonly context: ExecutionContext;

  getValue<T>(name: string): Promise<T | undefined>;
  saveValue(name: string, value: any): Promise<void>;
  getDirectory(name: string, destinationPath: string): Promise<void>;
  saveDirectory(name: string, directoryPath: string): Promise<void>;
  getFile(name: string, destinationPath: string): Promise<void>;
  saveFile(name: string, filePath: string): Promise<void>;

  report(report: CodeChecksReport): Promise<void>;
  success(report: CodeChecksReportBody): Promise<void>;
  failure(report: CodeChecksReportBody): Promise<void>;

  isPr(): boolean;

  getArtifactLink(path: string): string;
  getPageLink(dirPath: string, filenamePath?: string): string;
}
```

### context: ExecutionContext

Access all important information about execution environment.

```typescript
interface ExecutionContext {
  // absolute path to currently executed codechecks file
  codeChecksFileAbsPath: string;
  // absolute path to directory containing current codechecks file
  workspaceRoot: string;
  // for github, something like krzkaczor/react-starter-kit
  projectSlug: string;
  // details about service used for serving artifacts, should not be accessed directly but rather through getArtifactLink and getPageLink function of a client
  currentSha: string;
  // did CI run in PR context?
  isPr: boolean;
  // more details about PR, undefined if not isPr === false
  pr?: PrInfo;
  artifactsProxy: {
    url: string;
    // does it support page links via rewriting paths to subdomains
    supportsPages: boolean;
  };
}
```

```typescript
interface PrInfo {
  id: number;
  meta: {
    title: string;
    body: string;
  };
  head: {
    sha: string;
  };
  base: {
    sha: string;
  };
  files: {
    changed: string[];
    added: string[];
    removed: string[];
  };
}
```

### getValue<T>(name: string): Promise<T | undefined>;

Get JSON value with a given name that was saved on **base** branch. Note that this can return
undefined when no value was saved.

### saveValue(name: string, value: any): Promise<void>;

Save JSON value with a given name for **current** commit.

### getDirectory(name: string, destinationPath: string): Promise<void>;

Get directory (set of files) with a given name for **base** branch and save all of them to
destinationPath. `destinationPath` needs to be absolute path (for now).

### saveDirectory(name: string, directoryPath: string): Promise<void>;

Save a directory (set of files) placed in `directoryPath` for \*current\*\* commit. All files will
be saved under the common `name`. Nested files will be saved as well. `destinationPath` needs to be
absolute path (for now).

### getFile(name: string, destinationPath: string): Promise<void>;

Get a single file with a given name for **base** branch and save it locally.

### saveFile(name: string, filePath: string): Promise<void> {

Save a single file placed in `directoryPath` for \*current\*\* commit and use `name` as a name.
`filePath` needs to be absolute path.

### report(report: CodeChecksReport): Promise<void>;

Report back to SCM (Github, BitBucket etc) with information about check result.

#### CodeCheckReport

```typescript
export interface CodeChecksReport {
  status: "success" | "failure";
  name: string;
  // ~45 characters fits here
  // no markdown
  shortDescription: string;
  // markdown support
  longDescription?: string;

  // if you provide label and url we will be able to render it nicely on github's checks page
  detailsUrl?: string | { url: string; label: string };
}
```

### success(report: CodeChecksReportBody): Promise<void>;

As `report` but with status = "success".

### failure(report: CodeChecksReportBody): Promise<void>;

As `report` but with status = "failure".

### isPr(): boolean;

Check if CI runs in context of a PR.

### getArtifactLink(path: string): string;

Get link to the artifact for **current commit**. Something like:
https://artifacts.codechecks.io/yourcommitsha/path This is useful for uploading any reports and
obtaing a link that you want to pass as `detailsUrl` for report.

### getPageLink(dirPath: string, filenamePath?: string): string;

filenamePath defaults to `index.html`

Get link to the page artifact for **current commit**. Difference between `getArtifactLink` is that
this link will be pointing to a URL without path component for example:
`https://commitsha--path/artifacts.codechecks.io/filenamePath` This works because `dirPath` and
commit sha is encoded into subdomain part. It's very useful when hosting SPA with custom routing. In
the future we might support here custom redirects to improve it even more.
