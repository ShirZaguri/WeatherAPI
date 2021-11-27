import app from "@server";
import logger from "@shared/Logger";

const PORT = 3000;

app.listen(process.env.PORT || PORT, () => {
  logger.info(`⚡️ [server]: Server is running at https://localhost:${PORT}`);
});
