import {expect} from "vitest";

export const expectError = (result: any) =>
    expect(result).toBeTypeOf("string")

export const expectSchemaError = (result: any) =>
    expect(result).toBeTypeOf("object")

export const expectSuccess = (result: any) =>
    expect(result).toBeFalsy()