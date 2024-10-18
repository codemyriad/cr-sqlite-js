# @vlcn.io/ws-client

A WebSocket client for syncing databases using CR-SQLite, designed to be paired with the `@vlcn.io/ws-server` package or any server that speaks the same protocol.

## Features

- Provides a WebSocket-based transport for syncing CR-SQLite databases
- Supports custom database providers
- Offers a configurable client for different sync scenarios
- Integrates easily with React through custom hooks

## Installation

```bash
npm install @vlcn.io/ws-client
```

## Setup

### 1. Create a Sync Worker

Create a sync worker file that will run in its own worker thread. The configuration may vary depending on the platform (e.g., React Native, Web, Tauri, Electron).

For web, create a file (e.g., `sync-worker.ts`) with the following content:

```typescript
import { Config, defaultConfig } from "@vlcn.io/ws-client";
import { start } from "@vlcn.io/ws-client/worker.js";
import { createDbProvider } from "@vlcn.io/ws-browserdb";

export const config: Config = {
  dbProvider: createDbProvider(),
  transportProvider: defaultConfig.transportProvider,
};

start(config);
```

### 2. Instantiate the SyncWorker

In your application's bootstrap process, create a single instance of your worker:

```typescript
import SyncWorker from "./sync-worker.js?worker";
const worker = new SyncWorker();
```

### 3. Start Syncing

For React applications, use the `useSync` hook:

```typescript
import { useSync } from "@vlcn.io/react";

function App() {
  useSync({
    dbname: "your-db-name",
    endpoint: `ws://your-host/sync`,
    room: "your-room-name",
    worker,
  });

  // ... rest of your component
}
```

## Usage (Non-React)

```javascript
import { defaultConfig, createClient } from "@vlcn.io/ws-client";
import { DB } from "./your-db-implementation";

const config = {
  ...defaultConfig,
  dbProvider: async (dbname) => new DB(dbname),
};

const client = createClient(config);
const room = await client.connect("your-db-name", "your-room-name", "wss://your-websocket-server.com");

// The room is now syncing
```

## API Highlights

- `createClient(config)`: Create a new client instance
- `client.connect(dbName, roomName, url)`: Connect to a sync room
- `config.dbProvider`: Custom function to provide DB instances
- `config.transportProvider`: Custom function to provide Transport instances

For more detailed API information, please refer to the source code and type definitions.

## Examples

- [Vite Starter](https://github.com/vlcn-io/vite-starter): A starter project using WebSocket sync
- [App.tsx in Vite Starter](https://github.com/vlcn-io/vite-starter/blob/main/src/App.tsx): Example of using the `useSync` hook

## License

MIT License
