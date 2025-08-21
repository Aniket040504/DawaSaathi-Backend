import initApp from "./app";
import initDB from "./config/db.config";

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await initDB();
    const app = initApp();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Server Start Error", error);
  }
};
startServer();