import {suite, test} from 'vitest'
import {validus} from "../validation";
import {expectSchemaError, expectSuccess} from "./test.utils";
import {schema} from "@/*";

suite('schema', () => {

  test('schema.success', () => {
    expectSuccess(schema({
      name: validus().string().required(),
    }).validate({
      name: 'John'
    }))
  })

  test('schema.fail', () => {
    expectSchemaError(schema({
      name: validus().string().required(),
    }).validate({
      name: null
    }))
  })

})