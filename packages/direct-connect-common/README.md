# @vlcn.io/direct-connect-common

Common utilities and types for direct connections in the vlcn.io ecosystem.

## Features

- Shared functionality for direct connections across different environments
- Common types and interfaces for direct connection packages
- Serialization utilities for JSON and binary data

## Installation

```bash
npm install @vlcn.io/direct-connect-common
```

## Usage

```javascript
import { ISerializer, hexToBytes, tags } from "@vlcn.io/direct-connect-common";

// Use the imported utilities and types in your project
```

## Key Exports

- `ISerializer`: Interface for message serialization
- `JsonSerializer`: JSON serialization implementation
- `BinarySerializer`: Binary serialization implementation
- `SerializerFactory`: Factory for creating serializers
- Various utility functions and type definitions

## Scripts

- `npm run build`: Build the package
- `npm run watch`: Watch for changes and rebuild
- `npm run test`: Run tests using Vitest
- `npm run deep-clean`: Perform a deep clean

## License

MIT License. See the main repository for full license information.
