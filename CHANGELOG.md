# Change Log

All changes to the CNC Codes JSON Schema will be documented here.

## v0.1.0 [#](https://github.com/appliedengdesign/cnccodes-json-schema/releases/tag/v0.1.0)

### New Features

- Schema updated to draft 2022-06
  - Updated base schema to draft 2020-12
  - Added `variant` property to allow for sub-variants of MTB specific codes
    - Property is 3 characters minimum, 8 characters maximum, no spaces, letters & numbers only
  - Added `minLength` property to `shortDesc` and `desc` properties.
  - For array of `parameters`, added `shortDesc` and `optional` as required properties.
- Created npm package and schema can be loaded via code locally instead of via https

### Other

- Updated [README](https://github.com/appliedengdesign/cnccodes-json-schema/blob/main/README.md)
- Added [CHANGELOG](https://github.com/appliedengdesign/cnccodes-json-schema/blob/main/CHANGELOG.md)
- Added [CODE_OF_CONDUCT](https://github.com/appliedengdesign/cnccodes-json-schema/blob/main/CODE_OF_CONDUCT.md)
- Added [CONTRIBUTING](https://github.com/appliedengdesign/cnccodes-json-schema/blob/main/CONTRIBUTING.md)
- Added [SECURITY](https://github.com/appliedengdesign/cnccodes-json-schema/blob/main/SECURITY.md)
- Updated License Copyright year
- Updated dependencies
- Added Mocha tests to validate schema work
- Added script to build docs for GH Pages.
