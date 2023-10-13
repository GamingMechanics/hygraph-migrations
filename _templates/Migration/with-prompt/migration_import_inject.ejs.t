---
to: app/src/cms/migrations/index.ts
inject: true
after: !!js/regexp /Add new migration imports here/g
skip_if: injected!
---
import { <%= h.changeCase.camelCase( name ) %> } from './<%- `${number}-${name}` %>'
