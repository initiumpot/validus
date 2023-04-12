import {RawSchema, schema, Schema} from "./schema";

export type ValidationFactor = (data: any) => typeof $continue | typeof $break | string | false

export type RawValidators<T> = Record<keyof T, (this: RawValidators<T>, ...args: any[]) => ValidationFactor>

export type Validators<T extends RawValidators<any>> =
    { (data: any): string | false } &
    { [key in keyof T]: ((...args: Parameters<T[key]>) => Validators<T>) & Validators<T> }

const $break = '$break'
const $continue = '$continue'

function validators<T, E extends RawValidators<T>>(object: E): Validators<E> {
  const keys = Object.keys(object) as (keyof E)[]
  const factors: ValidationFactor[] = []
  const execute: Validators<E> = ((data: T) => {
    for (const factor of factors) {
      const factorResult = factor(data)
      if (factorResult == $continue) continue
      if (factorResult == $break) break
      if (typeof factorResult == 'string') return factorResult
    }
    return false
  }) as Validators<E>
  for (const key of keys) {
    Object.defineProperty(execute, key, {
      value: (...params: Parameters<E[typeof key]>) => {
        factors.push(object[key](...params))
        return execute
      },
      writable: true
    })
  }
  return execute
}

export type PresenceTypes = keyof typeof presenceTypes
export type DataTypes = keyof typeof dataTypes

const presenceTypes = {
  optional: (value: boolean = true) => (data: any) => value && data == null ? $break : $continue,
  prohibited: (value: boolean = true) => (data: any) => value ? data != null ? must('not be present') : $break : $continue,
  required: (value: boolean = true) => (data: any) => value && data == null ? must('be present') : $continue
} satisfies Record<keyof any, (value: boolean) => ValidationFactor>

const dataTypes = {
  string: () => (data: any) => typeof data !== 'string' && must('be a string'),
  integer: () => (data: any) => (typeof data !== 'number' || data % 1 !== 0) && must('be an integer'),
  float: () => (data: any) => (typeof data !== 'number' || data % 1 === 0) && must('be a float'),
  number: () => (data: any) => typeof data !== 'number' && must('be a number'),
  boolean: () => (data: any) => typeof data !== 'boolean' && must('be a boolean'),
  date: () => (data: any) => !(data instanceof Date) && must('be a date'),
  array: () => (data: any) => !Array.isArray(data) && must('be an array'),
  object: () => (data: any) => typeof data !== 'object' && must('be an object')
} satisfies Record<keyof any, () => ValidationFactor>

const presenceType = (value: PresenceTypes) => presenceTypes[value]() ?? (() => $continue)
const dataType = (value: DataTypes) => dataTypes[value]() ?? (() => $continue)

const must = (message: string) => `The {} field must ${message}.`

export const validus = () => validators({

  ...dataTypes,
  ...presenceTypes,

  dataType,
  presenceType,

  equals: (value: any) => (data: any) => data !== value && must(`be equal to ${value}`),

  includes: (value: any) => (data: any) => !data?.includes?.(value) && must(`contain the value ${value}`),
  notIncludes: (value: any) => (data: any) => data?.includes?.(value) && must(`not contain the value ${value}`),

  alphabetic: () => (data: any) => !/^[a-zA-Z]+$/.test(data) && must('be alphabetic'),
  alphanumeric: () => (data: any) => !/^[a-zA-Z0-9]+$/.test(data) && must('be alphanumeric'),
  numeric: () => (data: any) => !/^\d+$/.test(data) && must('be numeric'),

  empty: () => (data: any) => data !== '' && must('be empty'),
  notEmpty: () => (data: any) => data === '' && must('not be empty'),

  blank: () => (data: any) => data.trim() === '' && must('be blank'),
  notBlank: () => (data: any) => data !== '' && must('not be blank'),

  positive: () => (data: any) => data < 0 && must('be positive'),
  negative: () => (data: any) => data > 0 && must('be negative'),

  min: (min: number) => (data: any) => data < min && must(`be at least ${min}`),
  max: (max: number) => (data: any) => data > max && must(`be at most ${max}`),
  between: (min: number, max: number) => (data: any) => (data < min || data > max) && must(`be between ${min} and ${max}`),

  anyOf: (values: any[] | readonly any[]) => (data: any) => !values.includes(data) && must(`be one of ${values.join(', ')}`),
  notAnyOf: (values: any[] | readonly any[]) => (data: any) => values.includes(data) && must(`not be one of ${values.join(', ')}`),

  length: (length: number) => (data: any) => data.length !== length && must(`be ${length} characters long`),
  lengthBetween: (min: number, max: number) => (data: any) => (data.length < min || data.length > max) && must(`be between ${min} and ${max} characters long`),
  minLength: (minLength: number) => (data: any) => data.length < minLength && must(`be at least ${minLength} characters long`),
  maxLength: (maxLength: number) => (data: any) => data.length > maxLength && must(`be at most ${maxLength} characters long`),

  regex: (regex: RegExp) => (data: any) => !regex.test(data) && must(`match the regex ${regex}`),
  schema: <T>(s: RawSchema<T> | Schema<T>) => 'validate' in s ? s.validate : schema(s),
})