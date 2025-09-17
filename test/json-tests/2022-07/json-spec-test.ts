/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */

import { readFileSync } from 'fs';
import { basename, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { expect } from 'chai';
import { describe } from 'mocha';
import { CNCCodesJSONSchema } from '../../../src/types/schema.ts';

const META_SCHEMA = 'https://json-schema.org/draft/2020-12/schema';
const BASE_URL = 'https://appliedengdesign.github.io/cnccodes-json-schema';
const __schemadir = './src/schemas';
const __schemaname = 'cnccodes.schema.json';
const __schemaver = `draft/${basename(dirname(fileURLToPath(import.meta.url)))}`;

const spec = <CNCCodesJSONSchema>JSON.parse(readFileSync(join(__schemadir, __schemaver, __schemaname), 'utf-8'));

// Do tests on each of the draft versions of the schema as JSON files
describe(`${__schemaver}`, () => {
    it('should have the correct $schema', () => {
        expect(spec).to.have.property('$schema', META_SCHEMA);
    });

    it('should have the correct $id', () => {
        expect(spec).to.have.property('$id', `${BASE_URL}/${__schemaver}/schema`);
    });

    it('has a title', () => {
        expect(spec).to.have.property('title');
    });

    it('should have the correct type (object)', () => {
        expect(spec).to.have.property('type', 'object');
    });
});
