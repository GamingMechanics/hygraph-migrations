---
to: app/src/cms/migrations/index.ts
inject: true
after: !!js/regexp /Add new migrations here/g
skip_if: injected!
---
  <%= h.changeCase.camelCase( name ) %>,
