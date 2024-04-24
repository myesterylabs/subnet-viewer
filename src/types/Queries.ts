export enum Queries {
  CHECK_APP_REGISTRATION = 'CHECK_APP_REGISTRATION',
  GET_ACCOUNTS = 'GET_ACCOUNTS',
}

export type Query = {
  query: Queries
  channel: string
  async: boolean
}
