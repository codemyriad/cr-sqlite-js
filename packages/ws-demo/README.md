# @vlcn.io/ws-demo

A demonstration package for real-time database synchronization using WebSockets and PartyKit.

## Features
- Syncs database state across clients in real-time
- Utilizes PartyKit rooms for efficient multi-client communication
- Integrates @vlcn.io/ws-client for robust state management

## PartyKit Room
- Each database is associated with a unique PartyKit room
- Rooms facilitate real-time updates between connected clients
- Ensures data consistency across multiple users/devices

## Usage
1. Configure your database and WebSocket connection in `src/syncConfig.ts`
2. Initialize the worker in your application using `src/worker.ts`
3. Connect to a PartyKit room to start syncing

For detailed configuration, refer to `src/worker.ts` and `src/syncConfig.ts`.
