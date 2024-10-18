# @vlcn.io/direct-connect-browser

Browser-based direct connection module for vlcn.io, supporting shared and dedicated web workers.

## Installation

```bash
npm install @vlcn.io/direct-connect-browser
```

## Features

- Browser-specific functionality for direct connections
- Support for shared and dedicated web workers
- Seamless integration with vlcn.io ecosystem

## Usage

```javascript
import { createSyncedDB } from '@vlcn.io/direct-connect-browser';

const syncedDB = await createSyncedDB(wasmUri, dbid, endpoints, serializer);
await syncedDB.start(port, endpoints);
```

## API

- `createSyncedDB(wasmUri, dbid, endpoints, serializer)`: Creates a synced database instance
- `SyncedDB.start(port, endpoints)`: Starts the synchronization process
- `SyncedDB.stop(port)`: Stops the synchronization process

## Scripts

- `npm run build`: Build the package
- `npm run watch`: Watch for changes and rebuild
- `npm run test`: Run tests (not implemented yet)
- `npm run deep-clean`: Perform a deep clean

## License

MIT License. See the main repository for full license information.
