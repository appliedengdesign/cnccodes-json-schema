/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */

export const SchemaVers = ['draft/2022-06', 'draft/2022-07', 'latest'] as const;
export type SchemaVer = (typeof SchemaVers)[number];
