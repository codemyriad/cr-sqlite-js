# @vlcn.io/rx-query

A highly efficient reactive query system for database operations.

## Overview

`rx-query` is an advanced query-based reactivity system designed to optimize database operations in applications with complex data requirements. It significantly improves upon the `rx-tbl` approach by selectively updating only the queries affected by specific writes, rather than re-running all queries that touch a given table.

## Key Features

- Efficient query-based reactivity
- Selective query updates based on write operations
- Support for single table queries and single-hop joins
- Query AST manipulation and dataflow rewriting
- Relation caching for optimized join operations
- Transactional write processing

## Use Case Example

Imagine a presentation editor with hundreds of slides, each containing multiple components. With `rx-query`, adding a component to a single slide won't trigger unnecessary re-queries for all other slides, significantly improving performance in large-scale applications.

## Efficiency Breakdown

### Highly Efficient For:
- Single table queries (`SELECT * FROM foo WHERE ...`)
- Single-hop join queries (`SELECT * FROM foo JOIN bar ON foo.id = bar.foo_id WHERE ...`)
- Updates and deletes with WHERE conditions matching select query columns
- Insert operations

### Less Efficient For:
- Multi-hop join queries
- Updates or deletes without WHERE conditions matching select query columns
- Scenarios with thousands of active queries against a single table (optimization planned)

## Core Components

1. **QueryAST**: Handles query Abstract Syntax Tree operations
   - `QueryAST`: Type definition for query ASTs
   - `queryToAST()`: Converts query strings to ASTs
   - `astToQuery()`: Converts ASTs back to query strings

2. **QueryToDataflow**: Manages query rewriting for dataflow optimization
   - `rewrittenQueryToDataflow()`: Converts query ASTs to dataflow representations

3. **RelationCache**: Implements caching for optimized join operations

4. **RxDbTx**: Manages reactive database transactions
   - Collects writes and processes them post-commit

## Benefits

- Eliminates duplicate queries
- Implements efficient query caching
- Consolidates read queries across micro-tasks into single IndexedDB transactions
- Optimizes multiple calls to the same `useQuery` into a single database query

## Future Improvements

- Implementation of range trees to optimize scenarios with thousands of active queries against a single table

## Getting Started

(Add installation instructions and basic usage examples here)

## Contributing

(Add contribution guidelines here)

## License

(Add license information here)
