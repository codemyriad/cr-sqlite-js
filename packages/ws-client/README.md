# @vlcn.io/ws-client

A WebSocket client to do streaming database sync. Meant to be paired with the `@vlcn.io/ws-server` package or any server that speaks the same protocol.

Setup is pretty trivial as the `React` bindings support websocket sync. The [vlcn vite starter](https://github.com/vlcn-io/vite-starter) uses WebSocket sync as well.

# Setup

## Create a Sync Worker

The sync worker file will be loaded and run in its own worker thread. The config will only change when moving between platforms (e.g., React Native vs Web vs Tauri vs Electron).

For web, the config looks like:

```ts
import { Config, defaultConfig } from "@vlcn.io/ws-client";
import { start } from "@vlcn.io/ws-client/worker.js";
// Interface to WASM sqlite
import { createDbProvider } from "@vlcn.io/ws-browserdb";

export const config: Config = {
  dbProvider: createDbProvider(),
  transportProvider: defaultConfig.transportProvider,
};

start(config);
```

Put that code in its own file such as [sync-worker.ts](https://github.com/vlcn-io/vite-starter/blob/main/src/sync-worker.ts).

## Instantiate the SyncWorker

Somewhere in the bootstrapping of your application, create an instance of your worker. You should only do this _once_ for your application. The sync worker can sync any number of databases you'd like so there's no need to create many sync workers.

The sync worker is also smart enough to coordinate between tabs and other workers. In other words, if many tabs are open on the same page and they all start the same worker, only one will actively sync a given database at a time.

```ts
import SyncWorker from "./sync-worker.js?worker";
const worker = new SyncWorker();
```

See [App.tsx](https://github.com/vlcn-io/vite-starter/blob/e69fdc061f1d9d15af083ec837c9d09832bac41d/src/App.tsx#L23) in the Vite starter.

## Kick Off Sync

If you're using the React bindings this is pretty simple. Just call the `useSync` hook:

```ts
useSync({
  dbname,
  endpoint: `ws://host/sync`,
  room: dbname,
  worker,
});
```

See [App.tsx](https://github.com/vlcn-io/vite-starter/blob/e69fdc061f1d9d15af083ec837c9d09832bac41d/src/App.tsx#L26-L31) in the Vite starter.# @vlcn.io/ws-client

A WebSocket client for syncing databases using CR-SQLite.

## Features

- Provides a WebSocket-based transport for syncing CR-SQLite databases
- Supports custom database providers
- Offers a configurable client for different sync scenarios

## Installation

```bash
npm install @vlcn.io/ws-client
```

## Usage

```javascript
import { defaultConfig, createClient } from "@vlcn.io/ws-client";
import { DB } from "./your-db-implementation";

// Configure the client
const config = {
  ...defaultConfig,
  dbProvider: async (dbname) => {
    // Your implementation to provide a DB instance
    return new DB(dbname);
  },
};

// Create a client
const client = createClient(config);

// Connect to a room
const room = await client.connect("your-db-name", "your-room-name", "wss://your-websocket-server.com");

// The room is now syncing
// You can use the room object to manage the connection and sync state
```

## API Highlights

- `createClient(config)`: Create a new client instance
- `client.connect(dbName, roomName, url)`: Connect to a sync room
- `config.dbProvider`: Custom function to provide DB instances
- `config.transportProvider`: Custom function to provide Transport instances

For more detailed API information, please refer to the source code and type definitions.

## License

MIT License
