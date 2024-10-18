# @vlcn.io/ws-server

# Basic Setup

WebSocket sync server. Setups is pretty straightforward and involves:

1. Defining a config
2. Attaching the websocket server to your http server

## Define Config

```ts
const wsConfig = {
  // Folder where database files should be placed
  dbFolder: "./dbs",
  // Folder that contains `.sql` schema files to apply to databases
  schemaFolder: "./src/schemas",
  // The path(s) that the websocket server should listen to
  pathPattern: /\/sync/,
};
```

## Attach to Server

```ts
import * as http from "http";
const app = express(); // or fastify or nest or whatever
const server = http.createServer(app);

const wsConfig = {
  dbFolder: "./dbs",
  schemaFolder: "./src/schemas",
  pathPattern: /\/sync/,
};

// Attach here:
attachWebsocketServer(server, wsConfig);

server.listen(PORT, () =>
  console.log("info", `listening on http://localhost:${PORT}!`)
);
```

# LiteFS Setup

> Note: LiteFS support is not production ready. It currently does not handle 
> LiteFS primary node failover.

If you want to replicate your DB on the backend via [LiteFS](https://fly.io/docs/litefs/) you can specify a few additional configuration options.

```ts
const wsConfig = {
  dbFolder: "./dbs",
  schemaFolder: "./src/schemas",
  pathPattern: /\/sync/,
  // appName is REQUIRED for LiteFS setups
  appName: process.env.FLY_APP_NAME
};

const WRITE_FORWARD_PORT = 9000;
const dbFactory = await createLiteFSDBFactory(WRITE_FORWARD_PORT, wsConfig);
dbCache = attachWebsocketServer(
  server,
  wsConfig,
  dbFactory,
  new FSNotify(wsConfig)
);

// Set up a service to receive forwarded writes
createLiteFSWriteService(WRITE_FORWARD_PORT, wsConfig, dbCache);
```# @vlcn.io/ws-server

A WebSocket server implementation for syncing CR-SQLite databases.

## Features

- WebSocket-based synchronization server for CR-SQLite databases
- Configurable database and schema folders
- Support for custom path patterns and app names
- Notification system with configurable latency

## Installation

```bash
npm install @vlcn.io/ws-server
```

## Usage

```javascript
import { createServer } from "@vlcn.io/ws-server";
import { defaultConfig } from "@vlcn.io/ws-server/config";

const config = {
  ...defaultConfig,
  dbFolder: "./my-dbs",
  schemaFolder: "./my-schemas",
  appName: "my-app",
};

const server = createServer(config);
server.listen(8080, () => {
  console.log("WebSocket server is running on port 8080");
});
```

## Configuration

The server can be configured using the following options:

- `dbFolder`: The folder where databases are stored (default: "./dbs")
- `schemaFolder`: The folder where schema files are stored (default: "./schemas")
- `pathPattern`: RegExp pattern for WebSocket path (default: /\/vlcn-ws/)
- `appName`: Name of the application (default: "fix-me")
- `notifyLatencyMs`: Latency for notifications in milliseconds (default: 50)
- `notifyPat`: Pattern for notifications (optional)
- `notifyPolling`: Whether to use polling for notifications (optional)

## API

The main export of this package is the `createServer` function, which creates a WebSocket server instance with the provided configuration.

For more detailed API information, please refer to the source code and type definitions.

## Dependencies

- @vlcn.io/crsqlite
- @vlcn.io/ws-common
- better-sqlite3
- chokidar
- throttle-debounce
- winston
- ws

## License

MIT License
