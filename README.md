# Hygraph Migrations Tool

This is a tool to help you migrate your Hygraph schema via API requests.

It has been developed to help make schema migrations easier, and to help you keep track of your schema changes.

It has been created with NextJS in mind, but can be used with any framework.

## Setup

To use this tool, you will need to have a Hygraph account, and a Hygraph API key. You must setup a hygraph auth token, and copy that along with the content api url into a `.env` file in the root of this project.

Once setup, you should create an endpoint that you can use to trigger the migrations. See `examples/migration-endpoint-example.ts` for an example of how to do this.

Once setup, you should be able to make requests to the end point to trigger the migrations.

## Usage

Migrations come in 2 flavours: "up" and "down", which are used to migrate your schema forwards and backwards respectively. When calling your migration endpoint you should pass the name of your migration and the direction you want to go. If there are any errors, hygraph will roll back your changes and return an error, which will be logged to the console.

## Creating Migrations

Migrations can be created manually, or via the cli with a hygen migration generator. To create a migration manually, create a new file in the `migrations` folder, and export a `IMigration`, e.g:

```ts
import { IMigration } from "../types";

export const createPage: IMigration = {
  name: "01-create-page",
  up: async (client: Client) => {
    client.createModel({
      apiId: "Page",
      apiIdPlural: "Pages",
      displayName: "Page",
    });
    client.createSimpleField({
      parentApiId: "Page",
      apiId: "title",
      displayName: "Title",
      type: SimpleFieldType.String,
      isTitle: true,
      isRequired: true,
    });

    client.createSimpleField({
      parentApiId: "Page",
      apiId: "slug",
      displayName: "Slug",
      type: SimpleFieldType.String,
      formRenderer: "GCMS_SLUG",
      isRequired: true,
    });

    return client;
  },
  down: async (client: Client) => {
    client.deleteModel("Page");

    return client;
  },
};
```

## Running migrations

You can run a migration by calling your endpoint with the name of the migration and the direction you want to go in the request body, e.g:

```

  "name": "01-create-page",
  "down": "false"

```
