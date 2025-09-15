/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */

export interface CNCCodesJSONSchema {
    readonly $schema?: string;
    readonly title: string;
    readonly description: string;
    readonly keywords?: string[];
    readonly type: CodeTypes;
    readonly codes?: { [key: string]: any };
    readonly machineType: MachineTypes;
    readonly variant?: Variant;
}

export enum MachineTypes {
    EDM = "edm",
    Laser = "laser",
    Lathe = "lathe",
    Mill = "mill",
    Printer = "printer",
    Swiss = "swiss",
}

export enum CodeTypes {
    G = 'gcode',
    M = 'mcode'
}

export type Code = {
    category: Categories;
    modal?: boolean;
    shortDesc: string;
    desc?: string;
    parameters: Parameters;
}

export enum Categories {
    Motion = 'motion',
    Coordinate = 'coordinate',
    Compensation = 'compensation',
    Canned = 'canned',
    Other = 'other',
}

export type Parameter = {
    shortDesc: string;
    desc?: string;
    optional: boolean;
}

export interface Parameters extends Record<string, Parameter> {
    [parameter: string]: Parameter;
}

export interface Variant {
    readonly name?:   string;
    readonly remove?: string[];
}
