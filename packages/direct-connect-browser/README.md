# @vlcn.io/direct-connect-browser

Browser-based direct connection module for vlcn.io, supporting shared and dedicated web workers for efficient database synchronization.

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
- [Advanced Usage](#advanced-usage)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Installation

```bash
npm install @vlcn.io/direct-connect-browser
```

## Features

- Browser-specific functionality for direct connections
- Support for both shared and dedicated web workers
- Seamless integration with the vlcn.io ecosystem
- Efficient synchronization of local and remote databases
- Automatic handling of connection interruptions and restarts
- Configurable transport content types (JSON or binary)

## Quick Start

Here's a basic example to get you started with @vlcn.io/direct-connect-browser:

```javascript
import { WorkerInterface } from '@vlcn.io/direct-connect-browser';

// Create a new WorkerInterface instance
const workerInterface = new WorkerInterface();

// Start syncing a database
const wasmUri = 'path/to/your/wasm/file.wasm';
const dbid = 'your-database-id';
const endpoints = {
  applyChanges: 'https://your-server.com/apply-changes',
  getChanges: 'https://your-server.com/get-changes',
  // Add other endpoints as needed
};

workerInterface.startSync(wasmUri, dbid, endpoints);

// Later, when you want to stop syncing
workerInterface.stopSync(dbid);

// To stop all syncs and close the worker
workerInterface.stopAll();
```

## API Reference

### WorkerInterface

The main class for managing synchronization.

#### Constructor

```javascript
new WorkerInterface(workerUri?: string, isShared: boolean = false)
```

- `workerUri`: Optional. The URI of the worker script.
- `isShared`: Optional. Whether to use a shared worker. Default is `false`.

#### Methods

- `startSync(wasmUri: string | undefined, dbid: DBID, endpoints: AsUrls<Endpoints>, transportContentType: "application/json" | "application/octet-stream" = "application/json")`
  - Starts synchronization for a specific database.
- `stopSync(dbid: DBID)`
  - Stops synchronization for a specific database.
- `stopAll()`
  - Stops all synchronizations and closes the worker.

### SyncedDB

Handles the synchronization process for a single database.

#### Methods

- `start(port: Port, endpoints: Endpoints)`
  - Starts the synchronization process.
- `stop(port: Port)`
  - Stops the synchronization process.

## Advanced Usage

For more fine-grained control, you can use lower-level components:

- `InboundStream`: Manages incoming data streams.
- `OutboundStream`: Manages outgoing data streams.
- `Fetcher`: Handles network requests.

Example of using a lower-level component:

```javascript
import { InboundStream } from '@vlcn.io/direct-connect-browser';

const inboundStream = new InboundStream(/* ... */);
inboundStream.start();
```

## Configuration

You can configure the package behavior through the `WorkerInterface` constructor and `startSync` method parameters. Key configuration options include:

- Worker type (shared or dedicated)
- WASM file location
- Endpoint URLs
- Transport content type (JSON or binary)

## Troubleshooting

Common issues and their solutions:

1. **Worker not starting**: Ensure the worker URI is correct and the file is accessible.
2. **Sync not working**: Check your endpoint URLs and network connectivity.
3. **Performance issues**: Consider using binary transport for large datasets.

## Contributing

We welcome contributions to @vlcn.io/direct-connect-browser! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the main repository for full license information.
