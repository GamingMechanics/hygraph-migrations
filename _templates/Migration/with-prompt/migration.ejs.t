---
to: "<%= `app/src/cms/migrations/${number}-${name}.ts` %>"
---
import { Client } from '@hygraph/management-sdk'
import { IMigration } from '..'

export const <%= h.changeCase.camelCase( name ) %> : IMigration = {
  name: "<%- `${number}-${name}` %>",
  up: async (client: Client) => {

    return client
  },
  down: async (client: Client) => {
  
    return client
  }
}
