import { runMigration } from "..";

type ApiRequest = {
  method: "POST" | "GET" | "PUT" | "DELETE" | "PATCH";
  body: {
    migration: string;
    dryRun?: boolean;
    down?: boolean;
  };
};

type ApiResponse = {
  message: string;
  error?: string;
  status: (statusCode: number) => ApiResponse;
  json: (data: any) => ApiResponse;
};

export default async (req: ApiRequest, res: ApiResponse): Promise<void> => {
  try {
    if (req.method !== "POST") {
      res.status(405).json({ message: "Method Not Allowed" });
      return;
    }

    const migration = req.body.migration;

    const options = {
      dryRun: req.body.dryRun || false,
      down: req.body.down || false,
      migrations: [],
    };

    if (!migration) {
      res.status(500).json({ message: "Must provide migration" });
      return;
    }

    const result = await runMigration(migration, options);

    if (result.errors) {
      console.error(result.errors);
      throw new Error(result.errors);
    }
    res
      .status(200)
      .json({ message: `Finished migration at: ${result.finishedAt}` });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: `[HYGRAPH-MIGRATION-ERROR]: something went wrong in attempting to migrate, please read the logs for details`,
      error: `${err}`,
    });
  }
};
