[![MIT License](https://badgen.net/badge/license/MIT)](https://opensource.org/licenses/MIT)

[![Follow @appliedengdesign](https://badgen.net/twitter/follow/appliedengdes)](https://twitter.com/appliedengdes)

# CNCCodes JSON Schema

This project is a schema definition for using JSON to store description and usage information about G & M codes. It was developed out of a necessity for [G-Code Reference](https://github.com/appliedengdesign/gcode-reference). It will be updated as the needs arise for the various types of G/M codes and various Machine Tools or 3D Printers.

Latest Draft Version: 2022-06

## Schema

```json
{
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://appliedengdesign.github.io/cnccodes-json-schema/draft/2022-06/schema",
    "title": "G/M Code Dictionary",
    "description": "JSON Schema for CNC G & M Codes",
    "type": "object",
    "required": [
        "type",
        "machineType",
        "title"
    ],
    "properties": {
        "$schema": {
            "description": "Link to this schema",
            "type": "string"
        },
        "type": {
            "description": "The type of code (G or M)",
            "type": "string",
            "enum": [
                "gcode",
                "mcode"
            ]
        },
        "machineType": {
            "description": "The type of CNC machine",
            "type": "string",
            "enum": [
                "edm",
                "mill",
                "lathe",
                "laser",
                "printer",
                "swiss"
            ]
        },
        "variant": {
            "description": "Defined if G/M Codes are for specific MTB/3DP Variant. (Must be lower case, 3-8 characters)",
            "type": "string",
            "minLength": 3,
            "maxLength": 8,
            "pattern": "[A-Za-z0-9]"
        },
        "title": {
            "description": "Descriptive title of the JSON",
            "type": "string"
        },
        "codes": {
            "description": "Individual G/M Codes",
            "type": "object",
            "patternProperties": {
                "^G|^M": {
                    "type": "object",
                    "properties": {
                        "category": {
                            "description": "Category for the code",
                            "type": "string",
                            "enum": [
                                "motion",
                                "coordinate",
                                "compensation",
                                "canned",
                                "other",
                                "mcode"
                            ]
                        },
                        "modal": {
                            "description": "Modal / Non-Modal (boolean)",
                            "type": "boolean"
                        },
                        "shortDesc": {
                            "description": "A short description of the code",
                            "type": "string",
                            "minLength": 3
                        },
                        "desc": {
                            "description": "A longer description with markdown formatting",
                            "type": "string",
                            "minLength": 3
                        },
                        "parameters": {
                            "$ref": "#/$defs/parameters"
                        }
                    },
                    "additionalProperties": false,
                    "required": [
                        "category",
                        "shortDesc"
                    ]
                },
                "additionalProperties": false
            }
        }
    },
    "additionalProperties": false,
    "$defs": {
        "parameters": {
            "description": "An array of possible parameters to the code",
            "type": "object",
            "patternProperties": {
                "^[A-Z]{1}": {
                    "type": "object",
                    "properties": {
                        "shortDesc": {
                            "description": "A short description of the parameter",
                            "type": "string",
                            "minLength": 3
                        },
                        "desc": {
                            "description": "A description of the parameter",
                            "type": "string",
                            "minLength": 3
                        },
                        "optional": {
                            "description": "Parameter is required (boolean)",
                            "type": "boolean"
                        }
                    },
                    "required": [
                        "shortDesc",
                        "optional"
                    ],
                    "additionalProperties": false
                }
            }
        }
    }
}
```

## Goals

Provide a an accurate JSON Schema to validate JSON files containing G & M code information.

## Usage

Use the schema in your JSON that describes a set of G & M codes in your project (Or use our [gcode-reference](https://github.com/appliedengdesign/gcode-reference) project) by adding [https://appliedengdesign.github.io/cnccodes-json-schema/draft/2022-06/schema](https://appliedengdesign.github.io/cnccodes-json-schema/draft/2022-06/schema) to your `$schema` reference in your JSON file.

Alternatively, you can install this as a package inside of your Javscript or Typescript project:

Install the latest version:

`npm install @appliedengdesign/cnccodes-json-schema`

Reference the schema file from `node_modules`:

`node_modules/@appliedengdesign/cnccodes-json-schema/dist/schema/cnccodes.schema.json`

Or use directly in script applications:

```javascript
// Import the Schema
import { cncCodesJSONSchema } from 'cnccodes-json-schema';
// OR
const cncCodesJSONSchema = require('cnccodes-json-schema');

// Use schema with AJV
const Ajv = require('ajv').default;
const validate = ajv.compile(cncCodesJSONSchema);
```

## Issues

If you find any bugs or issues with the package, please create a [new GitHub issue](https://github.com/appliedengdesign/cnccodes-json-schema/issues).

## Contributing

For information on contributing, please refer to the [CONTRIBUTING](https://github.com/appliedengdesign/cnccodes-json-schema/blob/master/CONTRIBUTING.md) doc for workflows and best practices.

## About Applied Eng & Design

We are a full service engineering and design firm, specializing in CAD/CAM, CNC milling, rapid prototyping, training and more.  We also like to dabble in Arudino / RaspberryPi projects, electronics, drones and robotics projects! Subscribe to our YouTube channel for videos on our projects, screencast tutorials, and more!

Follow us on [Twitter](https://twitter.com/appliedengdes) & [Instagram](https://instagram.com/appliedengdes), and like our [Facebook Page](https://facebook.com/appliedengdesign)!

## License

This extension is licensed under the [MIT License](https://opensource.org/licenses/MIT).
