# @vlcn.io/ws-server

A WebSocket server for syncing CR-SQLite databases.

## Features

- WebSocket-based synchronization for CR-SQLite databases
- Configurable database and schema folders
- Custom path patterns and app name support
- Notification system with configurable latency

## Installation

```bash
npm install @vlcn.io/ws-server
```

## Basic Usage

```javascript
import { attachWebsocketServer } from "@vlcn.io/ws-server";
import * as http from "http";

const server = http.createServer();
const wsConfig = {
  dbFolder: "./dbs",
  schemaFolder: "./schemas",
  pathPattern: /\/sync/,
};

attachWebsocketServer(server, wsConfig);

server.listen(8080, () => {
  console.log("WebSocket server is running on port 8080");
});
```

## Configuration

Key options:

- `dbFolder`: Database storage folder
- `schemaFolder`: Schema files folder
- `pathPattern`: WebSocket path RegExp
- `appName`: Application name
- `notifyLatencyMs`: Notification latency (ms)

For more options, see the `Config` type in the source code.

## LiteFS Support (Experimental)

LiteFS support for backend DB replication is available but not production-ready. It doesn't handle primary node failover yet.

## License

MIT License
