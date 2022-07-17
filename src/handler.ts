import fetch from 'isomorphic-unfetch'

import type { RequestSchemaType, ResponseSchemaType } from './schema'
import { API_VERSION, ResponseSchema } from './schema'

const APPLICATION_STATE: {
  login_token: string | null
} = {
  login_token: null,
}

const TimeZoneOffset = new Date().getTimezoneOffset() * -60

export const isLoggedIn = () => APPLICATION_STATE.login_token !== null

const handleResponse = (res: ResponseSchemaType) => {
  console.log(res)
}

export const sendCommand = async (command: string, payload: Record<string, unknown>) => {
  const requestData: RequestSchemaType = {
    c: command,
    t: APPLICATION_STATE.login_token,
    p: payload,
    z: TimeZoneOffset,
    y: false,
  }

  const rawResponse = await fetch('https://ballistica.net/bacloudcmd', {
    method: 'POST',
    headers: {
      'User-Agent': `bacloud-community/${API_VERSION}`,
      'Accept-Encoding': 'gzip, deflate',
      Accept: '*/*',
      Connection: 'keep-alive',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      v: API_VERSION.toString(),
      r: JSON.stringify(requestData),
    }),
  })

  const response = ResponseSchema.parse(await rawResponse.json())
  handleResponse(response)
}
