/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */

import { join } from 'node:path';
import { CNCCodesJSONSchemaType } from './types/schema.ts';
import { SchemaVer } from './types/schemaVer.ts';
import { __LATEST_SCHEMA_VER__, __SCHEMA_DIR__, __SCHEMA_FILE_NAME__ } from './util/constants.ts';
import { loadJSON, tryCatch } from './util/helpers.ts';

class CNCCodesSchema {
    private _schemaObj: CNCCodesJSONSchemaType | undefined;
    private _curSchema: SchemaVer;
    private _isLoaded: boolean = false;

    constructor(schema?: SchemaVer) {
        this._curSchema = schema || 'latest';
    }

    private async _initialize(): Promise<boolean> {
        if (
            await this._loadSchema(this._curSchema)
                .then(() => {
                    return true;
                })
                .catch(err => {
                    console.error('Error initializing...', err);
                })
        ) {
            return true;
        } else {
            return false;
        }
    }

    private async _loadSchema(s: SchemaVer): Promise<boolean> {
        const schemaPath = join(
            import.meta.dirname,
            __SCHEMA_DIR__,
            s === 'latest' ? __LATEST_SCHEMA_VER__ : s,
            __SCHEMA_FILE_NAME__,
        );

        console.info(schemaPath);

        const [data, err] = await tryCatch(async () => {
            return await loadJSON<CNCCodesJSONSchemaType>(schemaPath);
        });

        if (err) {
            console.error('Error loading schema...', s);
            return Promise.reject(err);
        } else if (data) {
            this._schemaObj = data;
            this._curSchema = s;
            this._isLoaded = true;
            return true;
        } else {
            return false;
        }
    }

    async init(): Promise<boolean> {
        return await this._initialize();
    }

    async setSchema(s: SchemaVer): Promise<boolean> {
        this._curSchema = s;
        return await this._loadSchema(s);
    }

    get isLoaded(): boolean {
        return this.isLoaded;
    }

    get schema(): CNCCodesJSONSchemaType | undefined {
        return this._schemaObj;
    }

    get version(): string {
        return this._curSchema as string;
    }
}

export {
    CNCCodesSchema,
    /**
     * Export below is for backwards compatability
     */
    CNCCodesSchema as cncCodesJSONSchema,
};
