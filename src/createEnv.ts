import { ServerHistory, ServerLocation } from './server'

/**
 * Given an href returns a collection of History and Location implementations. 
 * The given href is only used if it has been detected your are not in a browser
 * environment. If it's detected you are in a browser references to `window.history`
 * and `window.location` are simply returned.
 * @name createEnv(href: string = '/'): Env
 * @example
 * import { createEnv, href, pushHref } from '@typed/history'
 * 
 * const { history, location } = createEnv('https://my.example.com/')
 *
 * console.log(href(location)) // logs => https://my.example.com/
 * 
 * pushHref('https://my.example.com/other', history)
 * 
 * console.log(href(location)) // logs => https://my.example.com/other
 */
export function createEnv(href: Href = '/'): Env {
  if (typeof location !== 'undefined' && typeof history !== 'undefined')
    return { location, history }

  const serverLocation = new ServerLocation(href)
  const serverHistory = new ServerHistory(serverLocation)
  serverLocation.setHistory(serverHistory)

  return {
    location: serverLocation,
    history: serverHistory,
  }
}

/**
 * A type-alias to represent strings that are HREFs.
 * @name Href
 * @type
 */
export type Href = string

/**
 * Implementations of `Location` and `History`.
 * @name Env
 * @type
 */
export type Env = Readonly<{ location: Location; history: History }>
