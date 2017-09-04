import { Test, describe, given, it } from '@typed/test'

import { createEnv } from './createEnv'

export const test: Test = describe(`creatEnv`, [
  given(`a href`, [
    it(`returns { history: History, location: Location }`, ({ equal }) => {
      const { location, history } = createEnv('https://www.example.com')

      history.pushState(null, null, '/example')

      equal('https://www.example.com/example', location.href)
      equal('https:', location.protocol)
      equal('443', location.port)
    }),
  ]),
])
