import { invoker, prop } from '167'

/**
 * Returns location.has
 * @name hash(location: Location): string
 */
export const hash = prop<Location, 'hash'>('hash')
/**
 * Returns location.host
 * @name host(location: Location): string
 */
export const host = prop<Location, 'host'>('host')
/**
 * Returns location.hostname
 * @name hostname(location: Location): string
 */
export const hostname = prop<Location, 'hostname'>('hostname')
/**
 * Returns location.href
 * @name href(location: Location): string
 */
export const href = prop<Location, 'href'>('href')
/**
 * Returns location.origin
 * @name origin(location: Location): string
 */
export const origin = prop<Location, 'origin'>('origin')
/**
 * Returns location.pathname
 * @name pathname(location: Location): string
 */
export const pathname = prop<Location, 'pathname'>('pathname')
/**
 * Returns location.port
 * @name port(location: Location): string
 */
export const port = prop<Location, 'port'>('port')
/**
 * Returns location.protocol
 * @name protocol(location: Location): string
 */
export const protocol = prop<Location, 'protocol'>('protocol')
/**
 * Returns location.search
 * @name search(location: Location): string
 */
export const search = prop<Location, 'search'>('search')

/**
 * Loads the resource at the URL provided in parameter.
 * @name assign(url: string, location: Location): void
 */
export const assign: Assign = invoker<Location, string, void>(1, 'assign')

/**
 * Reloads the current resource. This has no behavior if it is detected you are
 * not inside the browser.
 * @name reload(location: Location): void
 */
export const reload = invoker<Location, void>(0, 'reload')
/**
 * Replaces the current resource with the one at the provided URL. The 
 * difference from the assign() method is that after using replace() the current 
 * page will not be saved in session History, meaning the user won't be able to 
 * use the back button to navigate to it.
 * @name replace(url: string, location: Location): void
 */
export const replace: Replace = invoker<Location, string, void>(1, 'replace')

// Interfaces
export type Assign = {
  (url: string, location: Location): void
  (url: string): (location: Location) => void
}

export type Replace = {
  (url: string, location: Location): void
  (url: string): (location: Location) => void
}
