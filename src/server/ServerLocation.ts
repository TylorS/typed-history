import { ParsedHref, parseHref } from './parseHref'

const HTTPS_PROTOCOL = 'https:'
const HTTPS_DEFAULT_PORT = '443'
const HTTP_DEFAULT_PORT = '80'

export class ServerLocation implements Location {
  private history: History

  public href: string

  constructor(href: string) {
    this.href = href
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
    return parseValue('protocol', this)
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
    const {
      hash,
      host,
      hostname,
      href,
      pathname,
      port,
      protocol,
      search,
    } = parseHref(url)

    this.hash = hash
    this.host = host
    this.hostname = hostname
    this.href = href
    this.pathname = pathname
    this.port = port
    this.protocol = protocol
    this.search = search
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

  const currentValue = parseHref(href)[key] as string

  const updateHref = href.replace(currentValue, value)

  location.replace(updateHref)
}

function parseValue(key: keyof ParsedHref, location: ServerLocation): string {
  return parseHref(location.href)[key] as string
}