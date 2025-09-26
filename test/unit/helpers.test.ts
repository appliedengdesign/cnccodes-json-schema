/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */

import { join } from 'node:path';
import { describe, it, suite } from 'node:test';
import { expect } from 'chai';
import { __SCHEMA_FILE_NAME__ } from '../../src/util/constants.ts';
import { loadJSON, readDirRecursive } from '../../src/util/helpers.ts';

const __testTitle = 'Helpers Unit Tests';

const __goodPath = join(import.meta.dirname, '../../src');
const __badPath = join(import.meta.dirname, '../../source');
const __propTest = ['src/schemas/draft/2022-06', 'src/schemas/draft/2022-07'];
const __regex = /index.ts/;
const __jsonTestFile = join(import.meta.dirname, '../../package.json');
const _jsonBadPath = join(import.meta.dirname, '../package-bad.json');
const __jsonBadFile = join(import.meta.filename);
const __pkgKeys = ['name', 'version', 'type', 'author'];

interface PackageJSON {
    [key: string]: string | string[] | PackageJSON;
}

// Display test title
suite(`${__testTitle}`, () => {
    /**
     * readDirRecursive Helper test
     */
    describe('readDirRecursive Helper', () => {
        it('should return correct recursive dir object', async () => {
            await readDirRecursive(__goodPath).then(list => {
                expect(list).to.include.keys(...__propTest);
                expect(list[__propTest[0]]).to.include(`${__SCHEMA_FILE_NAME__}`);
                expect(list[__propTest[1]]).to.include(`${__SCHEMA_FILE_NAME__}`);
            });
        });

        it('should throw an error with incorrect path', async () => {
            await readDirRecursive(__badPath).catch(error => {
                expect(error).to.be.a.instanceOf(Error);
            });
        });

        it('should return correct recursive dir with regex', async () => {
            await readDirRecursive(__goodPath, { pattern: __regex }).then(list => {
                expect(list).to.include.keys('src');
                expect(list).to.have.a.property('src').that.includes('index.ts');
            });
        });
    });

    /**
     * loadJSON Helper test
     */
    describe('loadJSON Helper', () => {
        it('should return the correct JSON object', async () => {
            await loadJSON<PackageJSON>(__jsonTestFile).then(json => {
                expect(json).to.be.an('object').and.include.keys(__pkgKeys);
                expect(json.type).to.be.eql('module');
                expect(json.license).to.be.eql('MIT');
                expect(json.repository).to.have.property('type', 'git');
            });
        });

        it('should throw an error with incorrect path', async () => {
            await loadJSON<PackageJSON>(_jsonBadPath).catch(error => {
                expect(error).to.be.a.instanceOf(Error);
                expect((error as Error).message).to.include('Error reading file...');
            });
        });

        it('should throw an error parsing incorrect JSON', async () => {
            await loadJSON<PackageJSON>(__jsonBadFile).catch(error => {
                expect(error).to.be.a.instanceOf(Error);
                expect((error as Error).message).to.eql('Error parsing JSON file...');
            });
        });
    });
});
