/* eslint-disable @typescript-eslint/no-unused-expressions */
/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */

import { Ajv2020 } from 'ajv/dist/2020.js';
import { expect } from 'chai';
import { CNCCodesJSONSchema } from '../../src/types/schema.ts';
import { loadJSON, readDirRecursive } from '../../src/util/helpers.ts';
import gsample from '../sample/g-sample.json' with { type: 'json' };
import msample from '../sample/m-sample.json' with { type: 'json' };
import variant from '../sample/variant-sample.json' with { type: 'json' };

const _META_SCHEMA = 'https://json-schema.org/draft/2020-12/schema';
const _BASE_URL = 'https://appliedengdesign.github.io/cnccodes-json-schema';
const _TITLE = 'JSON Schema File Test';
const __schemadir = './src/schemas';
const schemas = await readDirRecursive(__schemadir);

const ajv = new Ajv2020({ allErrors: true, verbose: true, code: { esm: true } });

process.stdout.write(`- ${_TITLE} -`);

for (const key in schemas) {
    const spec = await loadJSON<CNCCodesJSONSchema>(schemas[key]);
    const __schemaver = `draft/${key}`;

    // Do tests on each of the draft versions of the schema as JSON files
    describe(`${__schemaver}`, () => {
        it('has the correct $schema', () => {
            expect(spec).to.have.property('$schema', _META_SCHEMA);
        });

        it('has the correct $id', () => {
            expect(spec).to.have.property('$id', `${_BASE_URL}/${__schemaver}/schema`);
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

        describe('Validation', () => {
            const valid = ajv.compile(spec);
            it('shoud pass AJV validation', () => {
                expect(typeof valid).to.equal('function');
            });

            it('validate correct G-Code', () => {
                const test = valid(msample);
                expect(test).to.be.true;
            });
        });
    });
}
