neo-design-patterns-hw-11

A structured JSON record processing system built on the Chain of Responsibility and Mediator behavioral patterns.

How to run

npm install
npx ts-node src/main.ts

After running,gi  the `src/output/` directory will contain:

| File | Contents |
|---|---|
| `access_logs.json` | Processed `access_log` records |
| `transactions.csv` | Processed transactions |
| `errors.jsonl` | Processed system error records |
| `rejected.jsonl` | Records that failed validation |

Patterns

Chain of Responsibility — validation pipeline

Each record type passes through its own chain of handlers. Every handler extends `AbstractHandler` and implements the `process(record)` method. If data is invalid, an `Error` is thrown and the record goes to `rejected.jsonl`. Otherwise it is passed to the next handler in the chain.

hains:
- `AccessLogChain` → `TimestampParser` → `UserIdValidator` → `IpValidator`
- `TransactionChain` → `TimestampParser` → `AmountParser` → `CurrencyNormalizer`
- `SystemErrorChain` → `TimestampParser` → `LevelValidator` → `MessageTrimmer`

Mediator — centralized routing

`ProcessingMediator` receives processed records and routes them to the appropriate writer based on the `type` field. Rejected records always go to `RejectedWriter`. Files are only written when `await mediator.finalize()` is called after all records have been processed.

How to add a new record type

1. Model — add a new interface in [src/models/DataRecord.ts](src/models/DataRecord.ts) and include it in the `DataRecord` union type.

2. Handlers — create the required handlers in [src/chain/handlers/](src/chain/handlers/) by extending `AbstractHandler`.

3. Chain — create a file in [src/chain/chains/](src/chain/chains/) with a `buildXxxChain()` function that connects handlers via `setNext`.

4. Writer— create a class in [src/mediator/writers/](src/mediator/writers/) with `write(record)` and `async finalize()` methods.

5. Registration — in [src/main.ts](src/main.ts) add the new type to `handlerMap`, and in [src/mediator/ProcessingMediator.ts](src/mediator/ProcessingMediator.ts) pass the writer to the constructor and register it in `writerMap`.
