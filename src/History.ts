import { invoker, prop } from '167'

import { Href } from './createEnv'

/**
 * Goes back to the previous location
 * @name back(history: History): void
 */
export const back = invoker<History, void>(0, 'back')
/**
 * Goes to the next location
 * @name forward(history: History): void
 */
export const forward = invoker<History, void>(0, 'forward')
/**
 * Goes forward or back a specificed number of locations.
 * @name go(quantity: number, history: History): void
 */
export const go: Go = invoker<History, number, void>(1, 'go')
/**
 * Pushes a new location into the History stack
 * @name pushState(state: any, title: string, href: string, history: History): void
 */
export const pushState: StateArity4 = invoker<History, any, string, Href, void>(
  3,
  'pushState'
)
/**
 * Pushes an HREF to the History statck
 * @name pushHref(href: Href, history: History): void
 */
export const pushHref: StateArity2 = pushState({}, '')
/**
 * Replaces the current location into the History stack
 * @name replaceState(state: any, title: string, href: Href, history: History): void
 */
export const replaceState: StateArity4 = invoker<
  History,
  any,
  string,
  Href,
  void
>(3, 'replaceState')

/**
 * Returns History.state
 * @name state(location: History): any
 */
export const state: <A extends Record<string, any> = {}>(
  history: History
) => Readonly<A> = prop<History, 'state'>('state')

// Interfaces
export type Go = {
  (quantity: number, history: History): void
  (quantity: number): (history: History) => void
}

export type StateArity4 = {
  (state: any, title: string | null, href: Href, history: History): void
  (state: any, title: string | null, href: Href): StateArity1
  (state: any, title: string | null): StateArity2
  (state: any): StateArity3
}

export type StateArity3 = {
  (title: string | null, href: Href, history: History): void
  (title: string | null, href: Href): StateArity1
  (title: string | null): StateArity2
}

export type StateArity2 = {
  (href: Href, history: History): void
  (href: Href): StateArity1
}

export type StateArity1 = {
  (history: History): void
}
