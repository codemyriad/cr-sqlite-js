# @vlcn.io/direct-connect-common

Common utilities and types for direct connections in the vlcn.io ecosystem. This package provides essential tools for implementing direct connections across different environments in the vlcn.io framework.

## Features

- Shared functionality for direct connections across different environments
- Common types and interfaces for direct connection packages
- Serialization utilities for JSON and binary data
- Utility functions for data conversion and manipulation

## Installation

```bash
npm install @vlcn.io/direct-connect-common
```

## Usage

Here's a basic example of how to use some of the key exports:

```typescript
import { 
  ISerializer, 
  hexToBytes, 
  bytesToHex, 
  JsonSerializer, 
  BinarySerializer, 
  SerializerFactory,
  tags 
} from "@vlcn.io/direct-connect-common";

// Convert hex string to bytes
const bytes = hexToBytes("48656c6c6f20576f726c64");
console.log(bytes); // Uint8Array(11) [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]

// Convert bytes back to hex string
const hex = bytesToHex(bytes);
console.log(hex); // "48656c6c6f20576f726c64"

// Use JsonSerializer
const jsonSerializer = new JsonSerializer();
const message = { type: "greeting", content: "Hello, World!" };
const encoded = jsonSerializer.encode(message);
const decoded = jsonSerializer.decode(encoded);

// Use SerializerFactory
const serializer = SerializerFactory.getSerializer("application/json");

// Access tags
console.log(tags.applyChanges); // 0
```

## Key Exports

- `ISerializer`: Interface for message serialization
- `JsonSerializer`: JSON serialization implementation
- `BinarySerializer`: Binary serialization implementation
- `SerializerFactory`: Factory for creating serializers
- `hexToBytes`: Convert hex string to Uint8Array
- `bytesToHex`: Convert Uint8Array to hex string
- `tags`: Constant object containing message type tags
- Various type definitions (e.g., `Seq`, `CID`, `Change`, `Msg`)

## Types

This package defines several important types used in the direct connection protocol:

- `Seq`: Tuple of [bigint, number] representing a sequence
- `Change`: Tuple representing a change in the database
- `Msg`: Union type of all possible message types in the protocol
- `ApplyChangesMsg`, `GetChangesMsg`, etc.: Specific message type interfaces

## Scripts

- `npm run build`: Build the package
- `npm run watch`: Watch for changes and rebuild
- `npm run test`: Run tests using Vitest
- `npm run deep-clean`: Perform a deep clean

## Contributing

Contributions are welcome! Please refer to the main vlcn.io repository for contribution guidelines.

## License

MIT License. See the main repository for full license information.

## Related Packages

- @vlcn.io/direct-connect-browser
- @vlcn.io/direct-connect-nodejs

For more information, visit the [vlcn.io documentation](https://vlcn.io).
