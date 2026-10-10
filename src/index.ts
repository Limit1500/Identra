import startHTTPServer from "./HTTP-server/server";
import startTCPServer from "./TCP-server/server";

async function startApplication() {
  startHTTPServer();
  startTCPServer();
}

startApplication().catch((error) => {
  console.error("Failed to start Identra:", error);
  process.exitCode = 1;
});
