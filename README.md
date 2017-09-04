# @typed/history -- 1.0.0

Functional History API for the browser and node

## Get it
```sh
yarn add @typed/history
# or
npm install --save @typed/history
```

## API Documentation

All functions are curried!

#### (location: History): any

<p>

Returns History.state

</p>


<details>
<summary>See the code</summary>

```typescript

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

```

</details>
<hr />


#### Env

<p>

A collection of implementation of `Location` and `History`.

</p>


```typescript

export type Env = { readonly location: Location; readonly history: History }

```


#### ParsedHref

<p>

ParsedHref JSON data structure

</p>


```typescript

export type ParsedHref = {
  readonly href: string
  readonly protocol: string
  readonly host: string
  readonly userInfo: string
  readonly username: string
  readonly password: string
  readonly hostname: string
  readonly port: string
  readonly relative: string
  readonly pathname: string
  readonly directory: string
  readonly file: string
  readonly search: string
  readonly hash: string
}

```


#### ServerHistory

<p>

An implementation of the `History` interface.

</p>


<details>
<summary>See the code</summary>

```typescript

export class ServerHistory implements History {
  // Does not affect behavior
  public scrollRestoration: ScrollRestoration = 'auto'

  // ServerHistory specific
  private _states: Array<{ state: any; url: string }>
  private _index: number = 0
  private location: Location

  constructor(location: Location) {
    this.location = location
    this._states = [{ state: null, url: this.location.pathname }]
  }

  private set index(value: number) {
    this._index = value

    const { url } = this._states[this._index]

    this.location.replace(url)
  }

  private get index(): number {
    return this._index
  }

  get length(): number {
    return this._states.length
  }

  get state(): any {
    const { state } = this._states[this.index]

    return state
  }

  public go(quanity: number = 0): void {
    if (quanity === 0) return void 0

    const minIndex = 0
    const maxIndex = this.length - 1

    this.index = Math.max(minIndex, Math.min(maxIndex, this.index + quanity))
  }

  public back(): void {
    this.go(-1)
  }

  public forward(): void {
    this.go(1)
  }

  public pushState(state: any, _: string | null, url: string) {
    this._states = this._states.slice(0, this.index).concat({ state, url })
    this.index = this._states.length - 1
  }

  public replaceState(state: any, _: string | null, url: string) {
    this._states[this.index] = { state, url }
  }
}

```

</details>
<hr />


#### ServerLocation

<p>

An in-memory implementation of `Location`.

</p>


<details>
<summary>See the code</summary>

```typescript

export class ServerLocation implements Location {
  private history: History
  public href: string

  constructor(href: string) {
    const { protocol, host, relative } = parseHref(href)

    this.href = protocol ? href : `http://${host}${relative}`
  }

  get hash(): string {
    return parseValue('hash', this)
  }

  set hash(value: string) {
    const hash = value.startsWith('#') ? value : '#' + value

    replace('hash', hash, this)
  }

  get host(): string {
    return parseValue('host', this)
  }

  set host(value: string) {
    replace('host', value, this)
  }

  get hostname(): string {
    return parseValue('hostname', this)
  }

  set hostname(value: string) {
    replace('hostname', value, this)
  }

  get pathname(): string {
    return parseValue('pathname', this)
  }

  set pathname(value: string) {
    replace('pathname', value, this)
  }

  get port(): string {
    const { href } = this
    const { port, protocol } = parseHref(href)

    if (port) return port

    return protocol === HTTPS_PROTOCOL ? HTTPS_DEFAULT_PORT : HTTP_DEFAULT_PORT
  }

  set port(value: string) {
    replace('port', value, this)
  }

  get protocol(): string {
    return parseValue('protocol', this) || 'http:'
  }

  set protocol(value: string) {
    replace('protocol', value, this)
  }

  get search(): string {
    return parseValue('search', this)
  }

  set search(value: string) {
    const search = value.startsWith('?') ? value : '?' + value

    replace('search', search, this)
  }

  get origin(): string {
    return this.protocol + '//' + this.host
  }

  public assign(url: string): void {
    this.replace(url)

    if (this.history) this.history.pushState(null, null, this.href)
  }

  // Does not have defined behavior outside of browser
  public reload(): void {}

  public replace(url: string): void {
    const { host, relative } = parseHref(url)

    let href = host ? url : this.host + relative

    if (this.protocol) href = this.protocol + '//' + href

    this.href = href
  }

  public toString(): string {
    return this.href
  }

  // ServerLocation Specific
  public setHistory(history: History) {
    this.history = history

    return this
  }
}

function replace(
  key: keyof ParsedHref,
  value: string,
  location: ServerLocation
) {
  const { href } = location

  const currentValue = parseHref(href)[key]

  const updateHref = href.replace(currentValue, value)

  location.replace(updateHref)
}

function parseValue(key: keyof ParsedHref, location: ServerLocation): string {
  return parseHref(location.href)[key] as string
}

```

</details>
<hr />


#### assign(url: string, location: Location): void

<p>

Loads the resource at the URL provided in parameter.

</p>


<details>
<summary>See the code</summary>

```typescript

export const assign: Assign = invoker<Location, string, void>(1, 'assign')

```

</details>
<hr />


#### back(history: History): void

<p>

Goes back to the previous location

</p>


<details>
<summary>See the code</summary>

```typescript

export const back = invoker<History, void>(0, 'back')

```

</details>
<hr />


#### createEnv(href: string = '/'): Env

<p>

Given an href returns a collection of History and Location implementations. 
The given href is only used if it has been detected your are not in a browser
environment. If it's detected you are in a browser references to `window.history`
and `window.location` are simply returned.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { createEnv, href, pushState } from '@typed/history'

const { history, location } = createEnv('https://my.example.com/')

console.log(href(location)) // logs => https://my.example.com/

pushState(null, null, 'https://my.example.com/other')

console.log(href(location)) // logs => https://my.example.com/other
```

</details>

<details>
<summary>See the code</summary>

```typescript

export function createEnv(href: string = '/'): Env {
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

```

</details>
<hr />


#### forward(history: History): void

<p>

Goes to the next location

</p>


<details>
<summary>See the code</summary>

```typescript

export const forward = invoker<History, void>(0, 'forward')

```

</details>
<hr />


#### go(quantity: number, history: History): void

<p>

Goes forward or back a specificed number of locations.

</p>


<details>
<summary>See the code</summary>

```typescript

export const go: Go = invoker<History, string, void>(1, 'go')

```

</details>
<hr />


#### hash(location: Location): string

<p>

Returns location.has

</p>


<details>
<summary>See the code</summary>

```typescript

export const hash = prop<Location, 'hash'>('hash')

```

</details>
<hr />


#### host(location: Location): string

<p>

Returns location.host

</p>


<details>
<summary>See the code</summary>

```typescript

export const host = prop<Location, 'host'>('host')

```

</details>
<hr />


#### hostname(location: Location): string

<p>

Returns location.hostname

</p>


<details>
<summary>See the code</summary>

```typescript

export const hostname = prop<Location, 'hostname'>('hostname')

```

</details>
<hr />


#### href(location: Location): string

<p>

Returns location.href

</p>


<details>
<summary>See the code</summary>

```typescript

export const href = prop<Location, 'href'>('href')

```

</details>
<hr />


#### origin(location: Location): string

<p>

Returns location.origin

</p>


<details>
<summary>See the code</summary>

```typescript

export const origin = prop<Location, 'origin'>('origin')

```

</details>
<hr />


#### parseHref(href: string): ParsedHref

<p>

Parses an href into JSON.

</p>


<details>
<summary>See the code</summary>

```typescript

export function parseHref(href: string): ParsedHref {
  const matches = HREF_REGEX.exec(href)

  const parsedHref = {} as Record<keyof ParsedHref, string>

  for (let i = 0; i < keys.length; ++i) {
    const key = keys[i]
    let value = matches[i] || ''

    if (key === 'search' && value) value = '?' + value
    if (key === 'protocol' && value && !value.endsWith(':')) value = value + ':'

    if (key === 'hash') value = '#' + value

    parsedHref[key] = value
  }

  return parsedHref
}

const keys: ReadonlyArray<keyof ParsedHref> = [
  'href',
  'protocol',
  'host',
  'userInfo',
  'username',
  'password',
  'hostname',
  'port',
  'relative',
  'pathname',
  'directory',
  'file',
  'search',
  'hash',
]

```

</details>
<hr />


#### parseQueries\<Queries extends Record\<string, string\>\>(location: Location): Queries

<p>

Parses a Location's query string into an object of key/value pairs.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { createEnv, pushUrl, parseQueries } from '@typed/history'

const { history, location } = createEnv()

console.log(parseQueries(location)) // logs => {}

pushUrl('/?q=hello&lang=en', history)

console.log(parseQueries(location)) // logs => { q: 'hello', lang: 'en' }
```

</details>

<details>
<summary>See the code</summary>

```typescript

export function parseQueries<Queries extends Record<string, string> = {}>(
  location: Location
): Readonly<Queries> {
  const { search } = location
  const queries = {} as Queries

  if (!search) return queries

  location.search
    .substring(1)
    .replace(QUERYSTRING_REGEX, (_: string, name: string, value: string) => {
      if (name) queries[name] = value

      return value
    })

  return queries
}

```

</details>
<hr />


#### pathname(location: Location): string

<p>

Returns location.pathname

</p>


<details>
<summary>See the code</summary>

```typescript

export const pathname = prop<Location, 'pathname'>('pathname')

```

</details>
<hr />


#### port(location: Location): string

<p>

Returns location.port

</p>


<details>
<summary>See the code</summary>

```typescript

export const port = prop<Location, 'port'>('port')

```

</details>
<hr />


#### protocol(location: Location): string

<p>

Returns location.protocol

</p>


<details>
<summary>See the code</summary>

```typescript

export const protocol = prop<Location, 'protocol'>('protocol')

```

</details>
<hr />


#### pushState(state: any, title: string, url: string, history: History): void

<p>

Pushes a new location into the History stack

</p>


<details>
<summary>See the code</summary>

```typescript

export const pushState: StateArity4 = invoker<
  History,
  any,
  string,
  string,
  void
>(3, 'pushState')

```

</details>
<hr />


#### pushUrl(url: string, history: History): void

<p>

Pushes a URL to the History statck

</p>


<details>
<summary>See the code</summary>

```typescript

export const pushUrl: StateArity2 = pushState({}, '')

```

</details>
<hr />


#### reload(location: Location): void

<p>

Reloads the current resource. This has no behavior if it is detected you are
not inside the browser.

</p>


<details>
<summary>See the code</summary>

```typescript

export const reload = invoker<Location, void>(0, 'reload')

```

</details>
<hr />


#### replace(url: string, location: Location): void

<p>

Replaces the current resource with the one at the provided URL. The 
difference from the assign() method is that after using replace() the current 
page will not be saved in session History, meaning the user won't be able to 
use the back button to navigate to it.

</p>


<details>
<summary>See the code</summary>

```typescript

export const replace: Replace = invoker<Location, string, void>(1, 'replace')

// Interfaces
export interface Assign {
  (url: string, location: Location): void
  (url: string): (location: Location) => void
}

export interface Replace {
  (url: string, location: Location): void
  (url: string): (location: Location) => void
}

```

</details>
<hr />


#### replaceState(state: any, title: string, url: string, history: History): void

<p>

Replaces the current location into the History stack

</p>


<details>
<summary>See the code</summary>

```typescript

export const replaceState: StateArity4 = invoker<
  History,
  any,
  string,
  string,
  void
>(3, 'replaceState')

```

</details>
<hr />


#### search(location: Location): string

<p>

Returns location.search

</p>


<details>
<summary>See the code</summary>

```typescript

export const search = prop<Location, 'search'>('search')

```

</details>
<hr />
