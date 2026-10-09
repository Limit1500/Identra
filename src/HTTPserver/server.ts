import Fastify from "fastify";

export default function startHTTPServer() {
  const server = Fastify({
    logger: true,
  });

  server.listen(
    {
      port: Number(process.env.HTTP_PORT),
    },
    () => {
      console.log(`HTTP server is listening on port ${process.env.HTTP_PORT}`);
    }
  );
}
