/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */

// Very lightly typed schema

interface BaseJSONSchema {
    $schema?: string;
    $id?: string;
    $vocabulary?: Record<string, boolean>;
    $anchor?: string;
    $dynamicAnchor?: string;
    $defs?: Record<string, JSONProps>;
    title?: string;
    description?: string;
    depreciated?: string;
    readOnly?: boolean;
    writeOnly?: boolean;
    required?: string[];
    additionalProperties?: boolean;
}

interface JSONStringKeywords {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    format?: string;
}

interface JSONProps {
    description?: string;
    type: string;
    [key: string]: unknown;
}

interface JSONArrayType extends JSONProps, JSONStringKeywords {
    type: 'array';
    items: JSONProps;
}

interface JSONEnumType extends JSONProps {
    enum?: string[];
}

interface CNCCJSONSchema extends BaseJSONSchema {
    properties: CNCCodesProperties;
}

interface CNCCodesProperties extends BaseJSONSchema, Record<string, unknown> {
    keywords: JSONArrayType;
    type: JSONEnumType;
    machineType: JSONEnumType;
    variant: JSONProps;
    codes: JSONProps;
}

export type CNCCodesJSONSchema = CNCCJSONSchema;
