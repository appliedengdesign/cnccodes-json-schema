/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */
'use strict';

const start = process.hrtime();

import fs from 'fs';
import path from 'path';

// Copy README.md over to /docs
process.stdout.write('Copying README.md...');
fs.copyFileSync(path.join(__dirname, '..', 'README.md'), path.join(__dirname, '..', 'docs', 'README.md'));
process.stdout.write('Done!\n');

const [secs, nanosecs] = process.hrtime(start);
process.stdout.write(`\nFinished building GH pages in ${secs * 1000 + nanosecs / 1000000} ms\n`);
