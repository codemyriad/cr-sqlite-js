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
- Efficient synchronization of local and remote databases
- Automatic handling of connection interruptions and restarts

## Usage

```javascript
import { WorkerInterface } from '@vlcn.io/direct-connect-browser';

// Create a new WorkerInterface instance
const workerInterface = new WorkerInterface();

// Start syncing a database
workerInterface.startSync(
  wasmUri,
  dbid,
  endpoints,
  transportContentType
);

// Stop syncing a specific database
workerInterface.stopSync(dbid);

// Stop all syncs and close the worker
workerInterface.stopAll();
```

## API

### WorkerInterface

- `constructor(workerUri?: string, isShared: boolean = false)`: Creates a new WorkerInterface instance
- `startSync(wasmUri: string | undefined, dbid: DBID, endpoints: AsUrls<Endpoints>, transportContentType: "application/json" | "application/octet-stream" = "application/json")`: Starts synchronization for a specific database
- `stopSync(dbid: DBID)`: Stops synchronization for a specific database
- `stopAll()`: Stops all synchronizations and closes the worker

### SyncedDB

- `start(port: Port, endpoints: Endpoints)`: Starts the synchronization process
- `stop(port: Port)`: Stops the synchronization process

## Advanced Usage

The package includes lower-level components like `InboundStream`, `OutboundStream`, and `Fetcher` for more fine-grained control over the synchronization process.

## Scripts

- `npm run build`: Build the package
- `npm run watch`: Watch for changes and rebuild
- `npm run test`: Run tests (not implemented yet)
- `npm run deep-clean`: Perform a deep clean

## Contributing

Contributions are welcome! Please see the main repository for contribution guidelines.

## License

MIT License. See the main repository for full license information.
