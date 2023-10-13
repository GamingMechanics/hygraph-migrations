import { Client, SimpleFieldType } from "@hygraph/management-sdk";
import { IMigration } from "..";

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
    client.deleteModel({
      apiId: "Page",
    });

    return client;
  },
};
