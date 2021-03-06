# 2021-03 Draft Schema

[Link to Schema](https://appliedengdesign.github.io/cnccodes-json-schema/draft/2021-03/schem)

```json
{
    "$schema": "http://json-schema.org/schema",
    "$id": "https://appliedengdesign.github.io/cnccodes-json-schema/draft/2021-03/schema",
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
                "mill",
                "lathe",
                "3dprinter"
            ]
        },
        "title": {
            "description": "Descriptive title of the JSON",
            "type": "string"
        },
        "codes": {
            "description": "Individual G-Codes",
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
                                "other"
                            ]
                        },
                        "modal": {
                            "description": "Modal / Non-Modal (boolean)",
                            "type": "boolean"
                        },
                        "shortDesc": {
                            "description": "A short description of the code",
                            "type": "string"
                        },
                        "desc": {
                            "description": "A longer description with markdown formatting",
                            "type": "string"
                        },
                        "parameters": {
                            "$ref": "#/$defs/parameters"
                        }
                    },
                    "additionalProperties": false,
                    "required": [
                        "category",
                        "modal"
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
                        "desc": {
                            "description": "A description of the parameter",
                            "type": "string"
                        },
                        "optional": {
                            "description": "Parameter is required (boolean)",
                            "type": "boolean"
                        }
                    }
                }
            }
        }
    }
}
```
