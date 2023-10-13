import { Client } from "@hygraph/management-sdk";

/**
 * Defines the options that can be passed to a migration
 * @param dryRun - If true, the migration will not be applied to the Hygraph CMS
 * @param down - If true, the migration will be rolled back
 */
interface IMigrationOptions {
  dryRun?: boolean;
  down?: boolean;
  migrations: IMigration[];
}

/**
 * Defines the function that is run when a migration is applied or rolled back
 */
export type CreateMigration = (client: Client) => Promise<Client>;

/**
 * Defines a migration to be run against the Hygraph CMS
 * @param name - The name of the migration. This should be unique and descriptive and is used in API calls to call the correct migration
 * @param up - The function to run when the migration is being applied
 * @param down - The function to run when the migration is being rolled back
 */
export interface IMigration {
  name: string;
  up: CreateMigration;
  down: CreateMigration;
}

interface IMigrationResult {
  errors: string | null;
  finishedAt: string | null;
  options?: IMigrationOptions;
}

/**
 * Function to get a migration by name
 * @param name The name of the migration to run
 * @returns the migration to run
 * @throws Error if the migration is not found
 */
const getMigration = (
  name: string,
  options?: IMigrationOptions
): IMigration => {
  if (!options || !options.migrations) {
    throw new Error("No migrations provided");
  }
  const migration = options.migrations.find((x) => x.name === name);
  if (!migration) {
    throw new Error(`Migration ${name} not found`);
  }
  return migration;
};

/**
 * Function to run a migration
 * @param name The name of the migration to run
 * @param options the options to pass to the migration
 * @returns the result of the migration
 * @throws Error if the migration is not found or is not run successfully
 */
export const runMigration = async (
  name: string,
  options?: IMigrationOptions
): Promise<IMigrationResult> => {
  if (!process.env.HYGRAPH_AUTH_TOKEN || !process.env.HYGRAPH_ENDPOINT) {
    throw new Error(
      "HYGRAPH_AUTH_TOKEN or HYGRAPH_ENDPOINT not set, please add to env file"
    );
  }

  const client = new Client({
    authToken: process.env.HYGRAPH_AUTH_TOKEN ?? "",
    endpoint: process.env.HYGRAPH_ENDPOINT ?? "",
  });

  const migration = getMigration(name, options);

  const migrationToRun =
    options && options.down
      ? await migration.down(client)
      : await migration.up(client);

  const result = await migrationToRun.run();

  return {
    errors: result.errors,
    finishedAt: result.finishedAt,
    options,
  };
};
