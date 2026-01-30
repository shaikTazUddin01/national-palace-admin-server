import app from "./app";
import mongoose from "mongoose";
import { config } from "./app/config";
import { createAdminIfNotExists } from "./app/utils/CreateDefaultAdmin";

async function main() {
  try {
    await mongoose.connect(config.db_url as string);
    await createAdminIfNotExists();

    app.listen(config.port, () => {
      console.log(`Server running on port: ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
