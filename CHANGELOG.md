# Change Log

All changes to the CNC Codes JSON Schema will be documented here.

## v0.3.0 [#](https://github.com/appliedengdesign/cnccodes-json-schema/releases/tag/v0.3.0)

### New Features

- *BREAKING* Added `remove` array property to `variant` (Now an object) for modifying JSON for which it is a variant

### Fixes

- Fixed tests to provide more information if the schema is invalid

### Other

- Updated dependencies
- Updated [README](README.md)
- `variant` is now object with `name` property and `remove` array.

## v0.2.2 [#](https://github.com/appliedengdesign/cnccodes-json-schema/releases/tag/v0.2.2)

### Fixes

- Typos in CHANGELOG and README

## v0.2.1 [#](https://github.com/appliedengdesign/cnccodes-json-schema/releases/tag/v0.2.1)

### New Features

- Schema updated to draft 2022-07
  - Added `description` to main required schema definitions
  - Added `minProperties` of 1 to `codes` and `Parameters`

### Fixes

- Fixed GH-Pages script to keep older versions

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
