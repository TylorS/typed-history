import { invoker, prop } from '167'

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
export const go: Go = invoker<History, string, void>(1, 'go')
/**
 * Pushes a new location into the History stack
 * @name pushState(state: any, title: string, url: string, history: History): void
 */
export const pushState: StateArity4 = invoker<
  History,
  any,
  string,
  string,
  void
>(3, 'pushState')
/**
 * Pushes a URL to the History statck
 * @name pushUrl(url: string, history: History): void
 */
export const pushUrl: StateArity2 = pushState({}, '')
/**
 * Replaces the current location into the History stack
 * @name replaceState(state: any, title: string, url: string, history: History): void
 */
export const replaceState: StateArity4 = invoker<
  History,
  any,
  string,
  string,
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
export interface Go {
  (quantity: string, history: History): void
  (quantity: string): (history: History) => void
}

export interface StateArity4 {
  (state: any, title: string | null, url: string, history: History): void
  (state: any, title: string | null, url: string): StateArity1
  (state: any, title: string | null): StateArity2
  (state: any): StateArity3
}

export interface StateArity3 {
  (title: string | null, url: string, history: History): void
  (title: string | null, url: string): StateArity1
  (title: string | null): StateArity2
}

export interface StateArity2 {
  (url: string, history: History): void
  (url: string): StateArity1
}

export interface StateArity1 {
  (history: History): void
}
