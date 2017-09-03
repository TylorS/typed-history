# @typed/history -- 0.3.0

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
  if (location && history) return { location, history }

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

  location.search.replace(
    QUERYSTRING_REGEX,
    (_: string, name: string, value: string) => {
      if (name) queries[name] = value

      return value
    }
  )

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
