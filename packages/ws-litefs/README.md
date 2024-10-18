# @vlcn.io/ws-litefs

A package for integrating LiteFS with WebSocket-based synchronization for CR-SQLite databases.

## Features

- LiteFS Write Service: Handles forwarded writes in a leader-follower setup.
- LiteFS DB Factory: Creates database instances compatible with LiteFS replication.
- File System Notification: Custom notification system for LiteFS secondaries.

## Main Components

1. `createLiteFSWriteService`: Sets up a server to handle forwarded writes in a LiteFS cluster.
2. `createLiteFSDBFactory`: Creates a database factory for LiteFS-compatible databases.
3. `FSNotify`: Implements a custom file system notification system for LiteFS secondaries.

## Usage

```typescript
import { createLiteFSWriteService, createLiteFSDBFactory, FSNotify } from '@vlcn.io/ws-litefs';

// Set up LiteFS Write Service
const writeService = createLiteFSWriteService(port, config, dbCache);

// Create LiteFS DB Factory
const dbFactory = await createLiteFSDBFactory(port, config);

// Use FSNotify for file system notifications
const fsNotify = new FSNotify(config);
```

Note: This package is designed to work with LiteFS and requires additional setup and configuration.

## License

MIT License
