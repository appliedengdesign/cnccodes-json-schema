/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */

import { Ajv2020 } from 'ajv/dist/2020.js';
import { expect } from 'chai';
import { cncCodesJSONSchema } from '../src/index.ts';
import gsample from './sample/g-sample.json' with { type: 'json' };
import msample from './sample/m-sample.json' with { type: 'json' };
import variant from './sample/variant-sample.json' with { type: 'json' };

const defaultOptions = {
    allErrors: true,
    verbose: true,
    code: { esm: true },
};

const ajv = new Ajv2020(defaultOptions);
/*
describe('CNC Codes JSON Schema', () => {
    context('Validate Schema JSON Files', () => {
        describe('Validate CNC Codes Schema', () => {
            it('Should return true for valid schema', () => {
                //let ajv = new Ajv.default(defaultOptions);

                const validate = ajv.getSchema(cncCodesJSONSchema.$schema);
                if (validate) {
                    expect(validate(cncCodesJSONSchema)).to.be.true;
                }
            });
        });
    });

    describe('Test Schema...', () => {
        describe('Test Schema Against Valid JSON', () => {
            //const ajv = new Ajv(.default(defaultOptions);
            const validate = ajv.compile(cncCodesJSONSchema);

            if (validate) {
                const valid = validate(msample);
                it('Should return true for valid JSON', () => {
                    expect(valid).to.be.true;
                });

                it('Validation Errors should be null', () => {
                    expect(validate.errors).to.be.null;
                });
            } else {
            }
        });

        describe('Test Schema Against Invalid JSON', () => {
            //const ajv = new Ajv(defaultOptions);

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
            // const ajv = new Ajv(defaultOptions);

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
*/
