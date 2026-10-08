import Fastify from "fastify";

const server = Fastify({
  logger: true,
});

server.listen(
  {
    port: Number(process.env.HTTP_PORT),
  },
  () => {
    console.log(`HTTP server is listening on port ${process.env.HTTP_PORT}`);
  },
);
