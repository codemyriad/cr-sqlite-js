# @vlcn.io/direct-connect-browser

A browser-based direct connection module for vlcn.io.

## Description

This package provides browser-specific functionality for direct connections in the vlcn.io ecosystem. It includes support for both shared and dedicated web workers.

## Installation

```bash
npm install @vlcn.io/direct-connect-browser
```

## Usage

This package exports its main functionality from `dist/index.js`. Additionally, it provides two worker scripts:

- Shared worker: `dist/shared.worker.js`
- Dedicated worker: `dist/dedicated.worker.js`

## Dependencies

This package depends on the following vlcn.io packages:

- @vlcn.io/crsqlite-wasm
- @vlcn.io/direct-connect-common
- @vlcn.io/rx-tbl
- @vlcn.io/xplat-api

## Scripts

- Build: `npm run build`
- Watch: `npm run watch`
- Test: `npm run test` (Note: Tests are not implemented yet)
- Deep Clean: `npm run deep-clean`

## Repository

This package is part of the vlcn-io/js repository. You can find the source code at:
[https://github.com/vlcn-io/js/tree/main/js/packages/direct-connect-browser](https://github.com/vlcn-io/js/tree/main/js/packages/direct-connect-browser)

## License

Please refer to the main repository for license information.
