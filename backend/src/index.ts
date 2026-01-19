import app from "./app.js";
import { connectDb } from "./config/connect-db.js";
import { validateEnv } from "./config/env.js";
import { initGracefulShutdown } from "./config/shutdown.js";

validateEnv();


connectDb()
  .then(() => {
    console.log(typeof process.env.PORT);
    const server = app.listen(process.env.PORT , () => {
      console.log(`Server is running on port ${process.env.PORT}`);
      initGracefulShutdown(server);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });
