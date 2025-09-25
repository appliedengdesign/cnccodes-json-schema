/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */

import { readdir, readFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';

/**
 * try catch helper function for async error handling
 *
 * @param fn - passed arrow function
 * @param logError - boolean to output error
 * @returns typed output of error function
 */
export const tryCatch = async <T>(
    fn: () => Promise<T>,
    logError = false,
): Promise<[T | undefined, Error | undefined]> => {
    try {
        const data = await fn();
        return [data, undefined];
    } catch (error: unknown) {
        const err = error instanceof Error ? error : new Error(String(error));

        if (logError) {
            console.error(err);
        }

        return [undefined, err];
    }
};

/**
 * Defines the recursive object for dir parsing
 */
interface DirTree {
    [key: string]: string | string[];
}

/**
 * Defines the Options for readDirRecursive
 */
interface DirOpts {
    pattern?: string | RegExp;
}

/**
 * Reads a given directory recurisvely and returns a structured object of paths
 *
 * @param dirPath - The path to the directory to read
 * @param opts - Options parameters
 * @param opts.pattern - A string or RegExp to apply to results
 * @param result - A DirTree object of the files
 * @param home - a placeholder for recursive pointer to original dir
 * @returns
 */
export async function readDirRecursive(
    dirPath: string,
    opts: DirOpts = { pattern: '.*' },
    result: DirTree = {},
    home: string = '',
): Promise<DirTree> {
    home = home ? home : dirPath;

    const regex = new RegExp(opts.pattern!);

    const [entries, error] = await tryCatch(async () => {
        return await readdir(dirPath, { withFileTypes: true });
    });

    if (error) {
        throw new Error('Error reading directory...', error);
        return result;
    }
    if (entries) {
        for (const entry of entries) {
            const fullPath = join(dirPath, entry.name);
            const keyName = relative(dirname(home), dirPath).replace(/\\/g, '/');
            if (entry.isDirectory()) {
                const [res, error] = await tryCatch(async () => {
                    return await readDirRecursive(fullPath, opts, result, home);
                });
                if (error) {
                    throw new Error('Error reading subdirectory...', error);
                    continue;
                } else if (res) {
                    result = { ...res };
                }
            } else {
                if (!regex.test(entry.name)) {
                    continue;
                }

                if (keyName in result) {
                    if (typeof result[keyName] === 'string') {
                        result[keyName] = [result[keyName], fullPath];
                    } else {
                        result[keyName].push(fullPath);
                    }
                }
                result = { [keyName]: fullPath, ...result };
            }
        }
    }
    return result;
}

/**
 * Loads and parses a typed JSON string given a file path
 *
 * @typeParam - T the type casting of the JSON object
 * @param filePath - A string of the path to the file to parse
 * @param logError - A boolean to display the error or not
 * @returns a parsed JSON object of type T
 */
export async function loadJSON<T>(filePath: string): Promise<T> {
    const [data, err] = await tryCatch(async () => {
        return await readFile(filePath, 'utf8');
    });

    if (data) {
        return new Promise((resolve, reject) => {
            try {
                const res = JSON.parse(data) as T;
                resolve(res);
            } catch (_err) {
                reject(new Error('Error parsing JSON file...'));
            }
        });
        //return Promise.resolve(JSON.parse(data) as T);
    } else {
        throw new Error(`Error reading file...${err ? err.message : ''}`);
    }
}
