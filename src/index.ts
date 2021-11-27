import app from "@server";
import logger from "@shared/Logger";

const PORT = 3000;

<<<<<<< HEAD
app.listen(process.env.PORT || PORT, () => {
  logger.info(`⚡️ [server]: Server is running at https://localhost:${PORT}`);
=======
app.listen(PORT, () => {
  logger.info(`⚡️ [server]: Server is running at http://localhost:${PORT}`);
>>>>>>> 006be82ff92ed9bf7200f83cafeaa1701b14c479
});
