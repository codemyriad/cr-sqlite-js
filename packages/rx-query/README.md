# @vlcn.io/rx-query

WIP - more efficient query based reactivity.

`rx-tbl` would re-run all queries that hit a given table when a write hit that table. This is problematic for apps with hundreds of queries against the same table.

Why would this happen? Well imagine a presentation editor. You have little slide thumbnails or previews. Each of these previews would query a `component` table to get the components belonging to the slide. Any time you add a component on a slide, each preview would re-query the component table. If you have hundreds of slides this could be hundreds of queries with the dumb `rx-tbl` approach.

`rx-query` looks at the write being made and finds the exact queries that would be impacted by that write.

# Where this is efficient

- Single table queries (`SELECT * FROM foo WHERE ...`)
- Queries that do a single hop join (`SELECT * FROM foo JOIN bar ON foo.id = bar.foo_id WHERE ...`)
- Updates that include WHERE conditions on the same columns used by select queries
- Deletes that include WHERE conditions on the same columns used by select queries
- Inserts

# Where this is inefficient

- Queries that do multi-hop joins (`SELECT foo.* FROM foo JOIN bar ON foo.id = bar.foo_id JOIN baz on bar.baz_id = baz.id`)
- Updates or deletes that do not include WHERE conditions on the same columns used by select queries
- When thousands of queries against the same table are active. We currently scan the list of active queries for a table on insert. This is fine up to a few hundred active queries against a single table. In the future we'll introduce range trees to optimize this case.
# rx-query

A reactive query system for efficient database operations.

## Features

- Query AST manipulation
- Dataflow rewriting
- Relation caching
- Transactional operations

## Components

### QueryAST

Provides types and functions for working with query Abstract Syntax Trees (ASTs).

- `QueryAST`: Type definition for the query AST.
- `queryToAST()`: Converts a query string to an AST.
- `astToQuery()`: Converts an AST back to a query string.

### QueryToDataflow

Handles the rewriting of queries into dataflow representations.

- `rewrittenQueryToDataflow()`: Converts a query AST to a dataflow representation.

### RelationCache

Implements caching for relation data to optimize join operations.

### RxDbTx

Manages reactive database transactions, collecting writes and processing them post-commit.

## Benefits

- Coalesces duplicate queries
- Implements query caching
- Collects read queries across micro-tasks into a single IndexedDB transaction
- Folds multiple calls to the same `useQuery` into a single database query

This package aims to simplify the implementation of a fully reactive query system.
# rx-query

A reactive query system for efficient database operations.

## Features

- Query AST manipulation
- Dataflow rewriting
- Relation caching
- Transactional operations

## Components

### QueryAST

Provides types and functions for working with query Abstract Syntax Trees (ASTs).

- `QueryAST`: Type definition for the query AST.
- `queryToAST()`: Converts a query string to an AST.
- `astToQuery()`: Converts an AST back to a query string.

### QueryToDataflow

Handles the rewriting of queries into dataflow representations.

- `rewrittenQueryToDataflow()`: Converts a query AST to a dataflow representation.

### RelationCache

Implements caching for relation data to optimize join operations.

### RxDbTx

Manages reactive database transactions, collecting writes and processing them post-commit.

## Benefits

- Coalesces duplicate queries
- Implements query caching
- Collects read queries across micro-tasks into a single IndexedDB transaction
- Folds multiple calls to the same `useQuery` into a single database query

This package aims to simplify the implementation of a fully reactive query system.
