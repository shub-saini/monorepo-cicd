import { prisma } from "db/client";

Bun.serve({
  port: 8081,
  fetch(req, server) {
    // upgrade the request to a WebSocket
    if (server.upgrade(req)) {
      return; // do not return a Response
    }
    return new Response("Upgrade failed", { status: 500 });
  },
  websocket: {
    async message(ws, message) {
      const user = await prisma.user.create({
        data: {
          username: Math.random().toString(),
          password: Math.random().toString(),
        },
      });
      ws.send(JSON.stringify({ message, user }));
    },
  },
});
