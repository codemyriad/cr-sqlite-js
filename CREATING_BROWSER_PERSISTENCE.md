# Browser Persistence and Synchronization with CR-SQLite

CR-SQLite enables local-first applications by providing powerful synchronization capabilities for SQLite databases. When building web applications that use CR-SQLite in the browser, there are several options available to synchronize data between clients:

- **Using a WebSocket Server (`ws-server`)**
- **Peer-to-Peer Synchronization**
- **Using a Partykit Room**

This guide explores these options, providing examples and architectural details to help you choose the best approach for your application.

---

## Using a WebSocket Server (`ws-server`)

A WebSocket server provides a centralized way to synchronize CR-SQLite databases between browsers. The `@vlcn.io/ws-server` package offers a ready-to-use WebSocket server implementation that integrates seamlessly with CR-SQLite.

### Architecture Overview

In this setup, each client connects to the WebSocket server. The server handles synchronization messages, ensuring that changes in one client are propagated to all connected clients.

### Implementation Steps

1. **Set Up the WebSocket Server**

   Install the `@vlcn.io/ws-server` package:

   ```bash
   npm install @vlcn.io/ws-server
   ```

   Create and configure the server:

   ```javascript
   // server.js
   const http = require('http');
   const { attachWebsocketServer } = require('@vlcn.io/ws-server');

   const server = http.createServer();
   attachWebsocketServer(server, {
     dbFolder: './dbs',
     schemaFolder: './schemas',
     pathPattern: /\/sync/,
   });

   server.listen(8080, () => {
     console.log('WebSocket server is running on port 8080');
   });
   ```

2. **Configure the Client**

   Install the `@vlcn.io/ws-client` package:

   ```bash
   npm install @vlcn.io/ws-client
   ```

   Use the client to connect to the server and start synchronization:

   ```javascript
   // client.js
   import { startSync } from '@vlcn.io/ws-client';

   startSync('my-database', `ws://localhost:8080/sync`);
   ```

### Advantages

- Centralized synchronization management
- Simplifies client implementation
- Easy to scale by scaling the server

### Considerations

- Requires maintaining a server
- Potential single point of failure
- Server infrastructure costs

---

## Peer-to-Peer Synchronization

Peer-to-peer (P2P) synchronization allows browsers to synchronize CR-SQLite databases directly with each other without a central server.

### Architecture Overview

In P2P synchronization, each client can connect directly to other clients, forming a mesh network. This approach decentralizes data synchronization.

### Implementation Steps

1. **Establish Peer Connections**

   Use WebRTC for browser-to-browser communication. Libraries like `peerjs` simplify this process:

   ```bash
   npm install peerjs
   ```

   ```javascript
   // peer-connection.js
   import Peer from 'peerjs';

   const peer = new Peer();

   peer.on('connection', (conn) => {
     conn.on('data', (data) => {
       // Handle incoming data
     });
   });

   // Connect to a peer
   const conn = peer.connect(peerId);
   ```

2. **Integrate CR-SQLite Synchronization**

   Exchange CR-SQLite synchronization messages over the established connections:

   ```javascript
   // sync.js
   conn.on('data', async (data) => {
     await crsqlite.applyChanges(data);
   });

   // Send changes
   const changes = await crsqlite.getChanges();
   conn.send(changes);
   ```

### Advantages

- No central server required
- Increased resilience and redundancy
- Scalability through decentralization

### Considerations

- More complex connection management
- NAT traversal and firewall penetration can be challenging
- Requires a signaling server for peer discovery (though not for data transfer)

---

## Using a Partykit Room

Partykit provides serverless WebSocket rooms with stateful backends, simplifying real-time synchronization without managing your own server.

### Architecture Overview

Partykit rooms act as dedicated servers for real-time communication and state management, handling the synchronization logic for connected clients.

### Implementation Steps

1. **Set Up Partykit**

   Install Partykit CLI:

   ```bash
   npm install -g partykit
   ```

   Create a Partykit server script:

   ```javascript
   // partykit.js
   export default {
     async fetch(request, env, ctx) {
       // Handle WebSocket connections and messages
     },
   };
   ```

2. **Deploy the Partykit Server**

   ```bash
   partykit deploy
   ```

3. **Connect Clients to the Partykit Room**

   ```javascript
   // client.js
   import { startSync } from '@vlcn.io/ws-client';

   startSync('my-database', `wss://myroom.partykit.dev`);
   ```

### Advantages

- No server infrastructure to manage
- Scalable and serverless
- Built-in support for stateful applications

### Considerations

- Platform-specific limitations and costs
- Less control over the server environment
- Learning curve for Partykit-specific features

---

## Conclusion

When synchronizing CR-SQLite enabled web applications between browsers, you have multiple options:

- **WebSocket Server**: Ideal for applications that can leverage a central server for synchronization.
- **Peer-to-Peer Synchronization**: Suitable for decentralized applications requiring direct client-to-client communication.
- **Partykit Room**: Great for developers who want serverless infrastructure with minimal setup.

Choose the approach that best fits your application's architecture and scalability requirements. Each method leverages CR-SQLite's synchronization capabilities to maintain consistent state across clients.
