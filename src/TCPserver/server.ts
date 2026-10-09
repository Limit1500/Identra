import net from "node:net";
import keyService from "./keys/keyService";

export default function startTCPServer() {
  const server = net.createServer((socket) => {
    console.log("Client connected!");

    socket.on("data", (data: Buffer) => {
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
  });

  server.listen(process.env.TCP_PORT, () => {
    console.log(`Server is listening on port ${process.env.TCP_PORT}`);
  });
}
