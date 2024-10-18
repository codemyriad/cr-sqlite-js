# @vlcn.io/crsqlite-wasm

WASM build of `sqlite` that can:

- run without COEP headers
- run in SharedWorkers
- run concurrently in many tabs
- run in the UI thread if desired
- includes the `crsqlite` extension.

Builds upon https://github.com/rhashimoto/wa-sqlite/. The only delta is that we add our extension at build time and expose a few extra sqlite methods.

# Examples

- [Observable Notebook](https://observablehq.com/@tantaman/cr-sqlite-basic-setup)
- [Working TODO MVC](https://github.com/vlcn-io/js/tree/main/js/examples/p2p-todomvc)
- [WIP Local-First Presentation Editor](https://github.com/tantaman/strut)
# @vlcn.io/crsqlite-wasm

A WebAssembly build of CR-SQLite & SQLite for use in the browser.

## Features

- Provides a WebAssembly-based SQLite implementation with CR-SQLite extensions
- Supports opening databases in memory or using IndexedDB for persistence
- Offers an asynchronous API for database operations
- Includes support for prepared statements and transactions
- Provides update hooks for tracking changes to the database

## Installation

```bash
npm install @vlcn.io/crsqlite-wasm
```

## Usage

```javascript
import initWasm from "@vlcn.io/crsqlite-wasm";
import wasmUrl from "@vlcn.io/crsqlite-wasm/crsqlite.wasm?url";

const sqlite3 = await initWasm(wasmUrl);
const db = await sqlite3.open("mydb");

// Use the database
await db.exec("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT)");
await db.exec("INSERT INTO users (name) VALUES (?)", ["Alice"]);
const result = await db.execO("SELECT * FROM users");
console.log(result);

// Close the database when done
await db.close();
```

## API Highlights

- `initWasm(locateWasm?)`: Initialize the WebAssembly module
- `sqlite3.open(filename?, mode?)`: Open a database
- `db.exec(sql, bind?)`: Execute SQL statements
- `db.execO(sql, bind?)`: Execute SQL and return results as objects
- `db.execA(sql, bind?)`: Execute SQL and return results as arrays
- `db.prepare(sql)`: Prepare a statement
- `db.tx(callback)`: Run operations in a transaction
- `db.onUpdate(callback)`: Set up update hooks

For more detailed API information, please refer to the source code and type definitions.

## License

MIT License
