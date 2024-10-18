# @vlcn.io/ws-demo

A demonstration package for real-time database synchronization using WebSockets and PartyKit.

## Features
- Real-time database state synchronization across clients
- Efficient multi-client communication via PartyKit rooms
- Robust state management with @vlcn.io/ws-client

## What is PartyKit?
PartyKit is a platform for building real-time multiplayer applications. It provides:
- Serverless WebSocket rooms
- Durable objects for state persistence
- Easy deployment and scaling

## Installation
1. Install PartyKit CLI:
   ```
   npm install -g partykit
   ```
2. Install package dependencies:
   ```
   npm install
   ```

## Integration with @vlcn.io/ws-demo
1. Configure database and WebSocket connection in `src/syncConfig.ts`
2. Initialize the worker in your app using `src/worker.ts`
3. Create a PartyKit server file (e.g., `party/index.ts`) to handle room logic
4. Deploy your PartyKit server:
   ```
   partykit deploy
   ```
5. Update `transportProvider` in `src/syncConfig.ts` with your PartyKit server URL

## Usage
1. Start your application
2. Connect to a PartyKit room to begin syncing

For detailed configuration, see `src/worker.ts` and `src/syncConfig.ts`.
