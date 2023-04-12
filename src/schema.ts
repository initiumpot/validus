import type {ValidationFactor} from "./validation";

export type RawSchema<T> = Record<keyof T, ValidationFactor>

export type Schema<T> = {
  (data: T): { [key in keyof T]?: string } | false
  validate: (data: T) => { [key in keyof T]?: string } | false
}

export function schema<T>(object: RawSchema<T>): Schema<T> {
  const keys = Object.keys(object) as (keyof T)[]
  const formatMessage = (message: string, key: keyof T) => message.replace('{}', key as string)
  const execute = function (data: T) {
    const messages = {} as { [key in keyof T]?: string }
    let hasMessages = false
    for (const key of keys) {
      const validator = object[key]
      const value = data[key]
      const message = validator(value)
      if (message) {
        hasMessages = true
        messages[key] = typeof message === "string" ? formatMessage(message, key) : message
      }
    }
    return hasMessages && messages
  } as Schema<T>
  execute.validate = execute
  return execute
}