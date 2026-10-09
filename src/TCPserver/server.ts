import net from "node:net";
import { validateCredentials } from "./protocol/validation";

export default function startTCPServer() {
  const server = net.createServer((socket) => {
    console.log("User connected!");

    socket.on("data", (data: Buffer) => {
      try {
        const [name, secret] = validateCredentials(data);
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
