/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */

import path from 'node:path';
import { before, beforeEach, describe, it } from 'node:test';
import { Ajv2020, ValidateFunction } from 'ajv/dist/2020.js';
import { expect } from 'chai';
import { CNCCodesSchema } from '../../src/cncCodesSchema.ts';
import { CNCCodesJSONSchemaType } from '../../src/index.ts';
import { SchemaVers } from '../../src/types/schemaVer.ts';
import { __LATEST_SCHEMA_VER__ } from '../../src/util/constants.ts';
import { loadJSON } from '../../src/util/helpers.ts';

const __testTitle = 'JSON Schema Module Test';

const __testSchemaFile = '../../src/schemas/draft/2022-07/cnccodes.schema.json';
const __testSchema = await loadJSON<CNCCodesJSONSchemaType>(path.join(import.meta.dirname, __testSchemaFile));

const __sampleDir = path.join(import.meta.dirname, '../../samples');
const __sampleFileNames = {
    _gInvalid: 'g.invalid.json',
    _mValid: 'm.valid.json',
    _variant: 'variant.valid.json',
};

const ajv = new Ajv2020({ allErrors: true, verbose: true, code: { esm: true } });

// Display test title
describe(`${__testTitle}`, () => {
    describe('CNCCodesSchema Module Initialization', () => {
        it('can create an instance with no params (default: latest)', () => {
            const c = new CNCCodesSchema();
            expect(c).to.be.an.instanceOf(CNCCodesSchema);
            expect(c.version).to.eql('latest');
            expect(c.schema).to.be.undefined;
        });

        SchemaVers.forEach(ver => {
            it(`can create an instance with version: ${ver}`, () => {
                const c = new CNCCodesSchema(ver);
                expect(c).to.be.an.instanceOf(CNCCodesSchema);
                expect(c.version).to.eql(ver);
                expect(c.schema).to.be.undefined;
            });
        });
    });

    describe('CNCCodesSchema Functions', () => {
        let c: CNCCodesSchema;
        beforeEach(() => {
            c = new CNCCodesSchema();
        });

        it('can initialize the schema', async () => {
            const c = new CNCCodesSchema();
            await c.init().then(() => {
                expect(c.schema).to.deep.equal(__testSchema);
            });
        });

        it('can set a new schema and load it', async () => {
            //const c = new CNCCodesSchema();
            const oldVer = c.version;
            await c.setSchema('draft/2022-06').then(() => {
                expect(c.version).to.not.be.equal(oldVer);
                expect(c.version).to.be.equal('draft/2022-06');
                expect(c.schema?.$id).to.include('2022-06');
            });
        });

        it('can correctly return isLoaded', async () => {
            //const c = new CNCCodesSchema();
            expect(c.isLoaded).to.be.false;
            await c.init().then(() => {
                expect(c.isLoaded).to.be.true;
            });
        });

        it('can correctly retrieve object parameters', async () => {
            //const c = new CNCCodesSchema();
            await c.init().then(() => {
                expect(c.schema?.properties.machineType).to.deep.equal(__testSchema.properties.machineType);
            });
        });
    });

    describe('CNCCodesSchema Usage', () => {
        let c: CNCCodesSchema;
        let valid: ValidateFunction<CNCCodesJSONSchemaType>;
        before(async () => {
            c = new CNCCodesSchema();
            await c.init();
            if (c.schema) {
                valid = ajv.compile(c.schema);
            }
        });

        it('can use the object to initialize AJV', () => {
            if (c.schema) {
                expect(typeof valid).to.equal('function');
                expect(valid.errors).to.not.exist;
            }
        });

        it('can use the object to validate correct M-Code', async () => {
            await loadJSON(path.join(__sampleDir, __LATEST_SCHEMA_VER__, __sampleFileNames._mValid)).then(data => {
                expect(valid(data)).to.be.true;
            });
        });

        it('can use the object to invalidate bad G-Code', async () => {
            await loadJSON(path.join(__sampleDir, __LATEST_SCHEMA_VER__, __sampleFileNames._gInvalid)).then(data => {
                expect(valid(data)).to.be.false;
                expect(valid.errors).to.exist;
                if (valid.errors) {
                    expect(valid.errors[0].params.missingProperty).to.be.equal('shortDesc');
                }
            });
        });

        it('can use the object to validate a variant', async () => {
            await loadJSON(path.join(__sampleDir, __LATEST_SCHEMA_VER__, __sampleFileNames._variant)).then(data => {
                expect(valid(data)).to.be.true;
            });
        });
    });
});
