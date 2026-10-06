import net from "node:net";

const server = net.createServer((socket) => {
  console.log("User connected!");
});

server.listen(process.env.TCP_PORT, () => {
  console.log(`Server is listening on port ${process.env.TCP_PORT}`);
});
