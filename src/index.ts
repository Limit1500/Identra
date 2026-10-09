import startHTTPServer from "./HTTPserver/server";
import keyService from "./TCPserver/keys/keyService";
import startTCPServer from "./TCPserver/server";

async function startApplication() {
  startHTTPServer();
  startTCPServer();
}

startApplication().catch((error) => {
  console.error("Failed to start Identra:", error);
  process.exitCode = 1;
});
