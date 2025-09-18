/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */

import { readdir, readFile } from 'node:fs/promises';
import { basename, dirname, join } from 'node:path';

export async function readDirRecursive(
    dirPath: string,
    ignorePattern: string = '',
    basePath: string = dirPath,
    result: Record<string, string> = {},
): Promise<Record<string, string>> {
    const entries = await readdir(dirPath, { withFileTypes: true });
    const regex = new RegExp(ignorePattern);

    for (const entry of entries) {
        const fullPath = join(dirPath, entry.name);
        const dirName = basename(dirname(fullPath));

        if (entry.isDirectory()) {
            await readDirRecursive(fullPath, ignorePattern, basePath, result);
        } else if (regex.test(entry.name)) {
            result[dirName] = fullPath;
        }
    }

    return result;
}

export async function loadJSON<T>(filePath: string): Promise<T> {
    const data = await readFile(filePath, 'utf-8');
    return <T>JSON.parse(data);
}
