# @vlcn.io/ws-client

WebSocket client for syncing CR-SQLite databases, compatible with `@vlcn.io/ws-server`.

## Features

- WebSocket-based sync for CR-SQLite databases
- Custom database provider support
- Configurable for various sync scenarios
- React integration via hooks

## Quick Start

1. Install:
   ```bash
   npm install @vlcn.io/ws-client
   ```

2. Create a sync worker (e.g., `sync-worker.ts`):
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

3. Instantiate the worker:
   ```typescript
   import SyncWorker from "./sync-worker.js?worker";
   const worker = new SyncWorker();
   ```

4. Start syncing (React example):
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

For non-React usage and more detailed API information, refer to the source code and type definitions.

## License

MIT
