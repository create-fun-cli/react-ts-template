import { RestHandler } from 'msw'
import { setupWorker } from 'msw'

const modules = import.meta.globEager('./handlers/*.ts')

const handlers = Object.keys(modules).reduce((acc, key) => {
  if (Array.isArray(modules[key].default)) {
    acc.push(...modules[key].default)
  }
  return acc
}, [] as RestHandler[])

export const worker = setupWorker(...handlers)
