# Contribute to CNC Codes JSON Schema

Thank you for your interest in contributing to this g-code reference package. Here are a couple guidelines to get you started...

## Getting Started

To contribute to [CNC Codes JSON Schema](https://github.com/appliedengdesign/cnccodes-json-schema), you need to fork this repository and submit a pull request for the JSON that you want to add to or change.

* [How to fork a repository](https://help.github.com/articles/fork-a-repo)
* [How to make a pull request](https://help.github.com/articles/creating-a-pull-request/)
* [Changing a commit message](https://help.github.com/articles/changing-a-commit-message/)
* [How to squash commits](https://help.github.com/articles/about-pull-request-merges/)

### Repository Organization

The content in this repository is as follows:

* `/docs` - Location of Github Pages for schema
* `/scripts` - Location of helper scripts
* `/src` - Main Source Files of npm package
  * `/src/schema/` - Location of JSON Schema file
* `/test` - Mocha test to validate schema
  * `/test/sample` - sample files to test validation

### Branches

Create a local working branch that is specific to the scope of the changes that you want to make and then submit a pull request when your changes are ready. Each branch you create should be as specific as possible to streamline work flow and to reduce the possibility of merge conflicts. For instance, consider creating a branch to work on the github pages in `/docs`.

### Authoring Tools

[Visual Studio Code](https://code.visualstudio.com) is a preferred tool to work on this project.

### Useful Scripts

* `npm run test` - Runs a Mocha test against the JSON Schema
* `npm run build-ghp` - Builds the GitHub Pages with the current working schema and README

### Submitting Changes

* Push your changes to the branch in your fork of the repository.
* Validate your changes using the script `npm run test` and look for any breaking issues.
* Submit a pull request to the [development branch](https://github.com/appliedengdesign/cnccodes-json-schema/tree/dev) of the [cnccodes-json-schema](https://github.com/appliedengdesign/cnccodes-json-schema) respository.
* Make sure to explicitly say not to complete pull request if you are still making changes.

## Additional Resources

* [GitHub Docs](http://help.github.com/)
* [GitHub Pull Request Docs](http://help.github.com/send-pull-requests/)
* [Successful Git Branching Model](http://nvie.com/posts/a-successful-git-branching-model/)
  