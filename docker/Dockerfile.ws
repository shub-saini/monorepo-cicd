FROM oven/bun

WORKDIR /usr/src/app

COPY package.json bun.lockb turbo.json ./
COPY apps/ws/package.json apps/ws/
COPY packages packages

RUN bun install

COPY apps/ws ./apps/ws

RUN bun run generate:db

EXPOSE 8081

CMD ["bun", "start:ws"]