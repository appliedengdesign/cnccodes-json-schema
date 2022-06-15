/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */
'use strict';

import { expect } from 'chai';
import { cncCodesJSONSchema } from '../src';

describe('schemaDef', () => {
    it('should return correct json-schema.org spec', () => {
        const sd = cncCodesJSONSchema.$schema;
        expect(sd).to.equal('https://json-schema.org/draft/2020-12/schema');
    });
});
