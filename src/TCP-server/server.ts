import net from "node:net";
import keyService from "../keys/key.service";
import { env } from "../config/environment.var";

export default function startTCPServer() {
  const server = net.createServer((socket) => {
    console.log("Client connected!");

    try {
      socket.write(JSON.stringify(keyService.getAllKeyPairsWrapped()));
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Unknown error:", error);
      }
    }
  });

  server.listen(env.TCP_PORT, () => {
    console.log(`TCP server is listening on port ${env.TCP_PORT}`);
  });
}
