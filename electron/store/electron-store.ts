import {type SavedStore } from '../../src/types/Store'
import Store from 'electron-store'

const schema: Store.Schema<SavedStore> = {
  accounts: {
    type: 'array',
    default: []
  },
  auth: {
    type: "object",
    default: {}
  }

}

export const store = new Store({
  schema
})

// console.log(store.get('foo'))
//=> 50

// store.set('foo', '1')
