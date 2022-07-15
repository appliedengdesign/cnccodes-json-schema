/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */
'use strict';

const start = process.hrtime();

import fs from 'fs';
import path from 'path';
import cncCodesJSONSchema from '../src/schema/cnccodes.schema.json';

// UPDATE DOCS //

// Copy README.md over to /docs
process.stdout.write('Copying README.md --> index.md...');
fs.copyFileSync(path.join(__dirname, '..', 'README.md'), path.join(__dirname, '..', 'docs', 'index.md'));
process.stdout.write('Done!\n');

// UPDATE SCHEMA //

// Get Schema draft location name
const folderName = cncCodesJSONSchema.$id.split('/')[5];
process.stdout.write(`Current Schema: ${folderName}\n`);

// Create new folder structure
process.stdout.write('Creating folder...');
if (!fs.existsSync(path.join(__dirname, '..', 'docs', 'draft', folderName))) {
    fs.mkdirSync(path.join(__dirname, '..', 'docs', 'draft', folderName), { recursive: true });
    process.stdout.write('Done!\n');
} else {
    process.stdout.write('Exists!\n');
}

// Copy schema over
process.stdout.write('Copying...');
fs.copyFileSync(
    path.join(__dirname, '..', 'src', 'schema', 'cnccodes.schema.json'),
    path.join(__dirname, '..', 'docs', 'draft', folderName, 'schema'),
);
process.stdout.write('Done!\n');

const [secs, nanosecs] = process.hrtime(start);
process.stdout.write(`\nFinished building GH pages in ${secs * 1000 + nanosecs / 1000000} ms\n`);
