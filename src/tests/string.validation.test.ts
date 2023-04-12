import {suite, test} from 'vitest'
import {validus} from "../validation";
import {expectError, expectSuccess} from "./test.utils";

const string = () => validus().string()

suite('string', () => {

  test('string.dataType-success', () => {
    expectError(validus().dataType('string')(5))
  })

  test('string.dataType-error', () => {
    expectSuccess(validus().dataType('string')('Hi'))
  })

  test('string.number', () => {
    expectError(string()(1))
  })

  test('string.string', () => {
    expectSuccess(string()(''))
  })

  test('string.boolean', () => {
    expectError(string()(true))
  })

  test('string.date', () => {
    expectError(string()(new Date()))
  })
})

suite('string-alphabetic', () => {

  test('string-alphabetic', () => {
    expectSuccess(string().alphabetic()('abc'))
  })

  test('string-alphabetic.number', () => {
    expectError(string().alphabetic()(1))
  })

  test('string-alphabetic.empty', () => {
    expectError(string().alphabetic()(''))
  })

  test('string-alphabetic.alphanumeric', () => {
    expectError(string().alphabetic()('123'))
  })

})

suite('string-alphanumeric', () => {

  test('string-alphanumeric', () => {
    expectSuccess(string().alphanumeric()('abc123'))
  })

  test('string-alphanumeric.number', () => {
    expectError(string().alphanumeric()(1))
  })

  test('string-alphanumeric.empty', () => {
    expectError(string().alphanumeric()(''))
  })

  test('string-alphanumeric.alphabetic', () => {
    expectSuccess(string().alphanumeric()('abc'))
  })

})

suite('string-numeric', () => {

  test('string-numeric', () => {
    expectSuccess(string().numeric()('123'))
  })

  test('string-numeric.number', () => {
    expectError(string().numeric()(1))
  })

  test('string-numeric.empty', () => {
    expectError(string().numeric()(''))
  })

  test('string-numeric.alphabetic', () => {
    expectError(string().numeric()('abc'))
  })

})

suite('string-regex', () => {

  test('string-regex.email', () => {
    expectSuccess(string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)('a@gmail.com'))
  })

  test('string-regex.url', () => {
    expectSuccess(string().regex(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/)('https://google.com'))
  })

})

suite('string-length', () => {

  test('string-length', () => {
    expectSuccess(string().length(3)('abc'))
  })

  test('string-length.number', () => {
    expectError(string().length(3)(1))
  })

  test('string-length.3as0', () => {
    expectError(string().length(3)(''))
  })

  test('string-length.3as2', () => {
    expectError(string().length(3)('ab'))
  })

})

suite('string-min-length', () => {

  test('string-min-length', () => {
    expectSuccess(string().minLength(3)('abc'))
  })

  test('string-min-length.number', () => {
    expectError(string().minLength(3)(1))
  })

  test('string-min-length.3as0', () => {
    expectError(string().minLength(3)(''))
  })

  test('string-min-length.3as2', () => {
    expectError(string().minLength(3)('ab'))
  })

})

suite('string-max-length', () => {

  test('string-max-length', () => {
    expectSuccess(string().maxLength(3)('abc'))
  })

  test('string-max-length.number', () => {
    expectError(string().maxLength(3)(1))
  })

  test('string-max-length.3as0', () => {
    expectSuccess(string().maxLength(3)(''))
  })

  test('string-max-length.3as2', () => {
    expectSuccess(string().maxLength(3)('ab'))
  })

})

suite('string-contains', () => {

  test('string-contains', () => {
    expectSuccess(string().includes('a')('abc'))
  })

  test('string-contains.number', () => {
    expectError(string().includes('a')(1))
  })

  test('string-contains.empty', () => {
    expectError(string().includes('a')(''))
  })

  test('string-contains.falsy', () => {
    expectError(string().includes('a')('b'))
  })

})

suite('string-not-contains', () => {

  test('string-not-contains', () => {
    expectSuccess(string().notIncludes('a')('bc'))
  })

  test('string-not-contains.number', () => {
    expectError(string().notIncludes('a')(1))
  })

  test('string-not-contains.empty', () => {
    expectSuccess(string().notIncludes('a')(''))
  })

  test('string-not-contains.falsy', () => {
    expectError(string().notIncludes('a')('a'))
  })

})

suite('string-equals', () => {

    test('string-equals', () => {
      expectSuccess(string().equals('a')('a'))
    })

    test('string-equals.number', () => {
      expectError(string().equals('a')(1))
    })

    test('string-equals.empty', () => {
      expectError(string().equals('a')(''))
    })

    test('string-equals.falsy', () => {
      expectError(string().equals('a')('b'))
    })

})