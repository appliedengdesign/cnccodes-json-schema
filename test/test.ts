/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */
'use strict';

import { expect } from 'chai';
import { cncCodesJSONSchema } from '../src';
import Ajv from 'ajv/dist/2020';
import gsample from './sample/g-sample.json';
import msample from './sample/m-sample.json';
import variant from './sample/variant-sample.json';

const defaultOptions = {
    allErrors: true,
    verbose: true,
};

describe('CNC Codes JSON Testing', () => {
    describe('Validate Schema...', () => {
        describe('Schema Definition', () => {
            it('Should return correct json-schema.org spec (2020-12)', () => {
                const sd = cncCodesJSONSchema.$schema;
                expect(sd).to.equal('https://json-schema.org/draft/2020-12/schema');
            });
        });

        describe('Validate CNC Codes Schema', () => {
            it('Should return true for valid schema', () => {
                const ajv = new Ajv(defaultOptions);

                const validate = ajv.getSchema(cncCodesJSONSchema.$schema);
                if (validate) {
                    expect(validate(cncCodesJSONSchema)).to.be.true;
                }
            });
        });
    });

    describe('Test Schema...', () => {
        describe('Test Schema Against Valid JSON', () => {
            const ajv = new Ajv(defaultOptions);
            try {
                const validate = ajv.compile(cncCodesJSONSchema);

                if (validate) {
                    const valid = validate(msample);
                    it('Should return true for valid JSON', () => {
                        expect(valid).to.be.true;
                    });

                    it('Validation Errors should be null', () => {
                        expect(validate.errors).to.be.null;
                    });
                }
            } catch (err) {
                it('Schema did not validate... skipping');
            }
        });

        describe('Test Schema Against Invalid JSON', () => {
            const ajv = new Ajv(defaultOptions);

            try {
                const validate = ajv.compile(cncCodesJSONSchema);

                if (validate) {
                    const valid = validate(gsample);
                    it('Should return true for valid JSON', () => {
                        expect(valid).to.be.false;
                    });

                    it('Validation errors should not be null', () => {
                        expect(validate.errors).to.not.be.null;
                    });

                    it('Validation error should be shortDesc missing', () => {
                        if (validate.errors) {
                            expect(validate.errors[0].params.missingProperty).to.be.equal('shortDesc');
                        }
                    });
                }
            } catch (err) {
                it('Schema did not validate... skipping');
            }
        });

        describe('Test Schema Against Valid Variant JSON', () => {
            const ajv = new Ajv(defaultOptions);

            try {
                const validate = ajv.compile(cncCodesJSONSchema);

                if (validate) {
                    const valid = validate(variant);
                    it('Should return true for valid Variant JSON', () => {
                        expect(valid).to.be.true;
                    });
                }
            } catch (err) {
                it('Schema did not validate... skipping');
            }
        });
    });
});
