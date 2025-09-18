/* eslint-disable @typescript-eslint/no-unused-expressions */
/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */

import path from 'node:path';
import { Ajv2020 } from 'ajv/dist/2020.js';
import { expect } from 'chai';
import { CNCCodesJSONSchema } from '../../src/types/schema.ts';
import { loadJSON, readDirRecursive } from '../../src/util/helpers.ts';

const __metaSchema = 'https://json-schema.org/draft/2020-12/schema';
const __baseUrl = 'https://appliedengdesign.github.io/cnccodes-json-schema';
const __latestSpec = '2022-07';
const __testTitle = 'JSON Schema File Test';
const __schemaDir = './src/schemas';

const __sampleDir = './samples';
const __sampleFileNames = {
    _gInvalid: 'g.invalid.json',
    _mValid: 'm.valid.json',
    _variant: 'variant.valid.json',
};

// Get available schemas from source dir
const schemas = await readDirRecursive(__schemaDir);

// Create AJV instance
const ajv = new Ajv2020({ allErrors: true, verbose: true, code: { esm: true } });

// Display test title
process.stdout.write(`- ${__testTitle} -`);

// Iterate through schemas and run tests
for (const key in schemas) {
    const spec = await loadJSON<CNCCodesJSONSchema>(schemas[key]);
    const __schemaver = `draft/${key}`;

    // Run tests on schema
    describe(`${__schemaver}`, () => {
        it('has the correct $schema', () => {
            expect(spec).to.have.property('$schema', __metaSchema);
        });

        it('has the correct $id', () => {
            expect(spec).to.have.property('$id', `${__baseUrl}/${__schemaver}/schema`);
        });

        it('has a title', () => {
            expect(spec).to.have.property('title');
        });

        it('has a description', () => {
            expect(spec).to.have.property('description');
        });

        it('has the correct type (object)', () => {
            expect(spec).to.have.property('type', 'object');
        });

        it('has required properties\n', () => {
            expect(spec).to.have.property('required').and.to.be.an('array').that.does.not.include('variant');
        });

        // Run validation tests with schema
        describe('Validation', () => {
            const valid = ajv.compile(spec);
            it('shoud pass AJV validation', () => {
                expect(typeof valid).to.equal('function');
            });

            it('can validate correct M-Code', async () => {
                const json = await loadJSON(
                    path.join(__sampleDir, key === __latestSpec ? 'latest' : key, __sampleFileNames._mValid),
                );
                const test = valid(json);
                expect(test).to.be.true;
            });

            it('can invalidate bad G-Code', async () => {
                const json = await loadJSON(
                    path.join(__sampleDir, key === __latestSpec ? 'latest' : key, __sampleFileNames._gInvalid),
                );
                const test = valid(json);
                expect(test).to.be.false;
                if (valid.errors) {
                    expect(valid.errors[0].params.missingProperty).to.be.equal('shortDesc');
                }
            });

            it('can validate a variant', async () => {
                const json = await loadJSON(
                    path.join(__sampleDir, key === __latestSpec ? 'latest' : key, __sampleFileNames._variant),
                );
                const test = valid(json);
                expect(test).to.be.true;
            });
        });
    });
}
