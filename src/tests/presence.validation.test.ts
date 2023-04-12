import {suite, test} from 'vitest'
import {validus} from "@/*";
import {expectError, expectSuccess} from "./test.utils";

suite('required', () => {

  test('required.string-presence-type-present', () => {
    expectSuccess(validus().presenceType('required')(''))
  })

  test('required.string-presence-type-absent', () => {
    expectError(validus().presenceType('required')(null))
  })

  test('required.string', () => {
    expectSuccess(validus().required()('abc'))
  })

  test('required.number', () => {
    expectSuccess(validus().required()(1))
  })

  test('required.null', () => {
    expectError(validus().required()(null))
  })

})

suite('optional', () => {

  test('optional.string-presence-type-present', () => {
    expectSuccess(validus().presenceType('optional')(''))
  })

  test('optional.string-presence-type-absent', () => {
    expectSuccess(validus().presenceType('optional')(null))
  })

  test('optional.string', () => {
    expectSuccess(validus().optional()('abc'))
  })

  test('optional.number', () => {
    expectSuccess(validus().optional()(1))
  })

  test('optional.null', () => {
    expectSuccess(validus().optional()(null))
  })

})

suite('prohibited', () => {

  test('prohibited.string-presence-type-present', () => {
    expectError(validus().presenceType('prohibited')('abc'))
  })

  test('prohibited.string', () => {
    expectError(validus().prohibited()('abc'))
  })

  test('prohibited.number', () => {
    expectError(validus().prohibited()(1))
  })

  test('prohibited.null', () => {
    expectSuccess(validus().prohibited()(null))
  })

})