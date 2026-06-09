import * as fs from "fs/promises";
import { buildAccessLogChain } from "./chain/chains/AccessLogChain";
import { buildTransactionChain } from "./chain/chains/TransactionChain";
import { buildSystemErrorChain } from "./chain/chains/SystemErrorChain";
import { ProcessingMediator } from "./mediator/ProcessingMediator";
import { AccessLogWriter } from "./mediator/writers/AccessLogWriter";
import { TransactionWriter } from "./mediator/writers/TransactionWriter";
import { ErrorLogWriter } from "./mediator/writers/ErrorLogWriter";
import { RejectedWriter } from "./mediator/writers/RejectedWriter";
import { DataRecord } from "./models/DataRecord";

const handlerMap = {
  access_log: buildAccessLogChain,
  transaction: buildTransactionChain,
  system_error: buildSystemErrorChain,
};

async function main() {
  const raw = await fs.readFile("src/data/records.json", "utf-8");
  const records: DataRecord[] = JSON.parse(raw);

  const mediator = new ProcessingMediator(
    new AccessLogWriter(),
    new TransactionWriter(),
    new ErrorLogWriter(),
    new RejectedWriter()
  );

  let successCount = 0;
  let rejectedCount = 0;

  for (const record of records) {
    const buildChain = handlerMap[record.type];
    if (!buildChain) {
      mediator.onRejected(record, `Unknown record type: '${record.type}'`);
      rejectedCount++;
      continue;
    }
    try {
      const processed = buildChain().handle(record);
      mediator.onSuccess(processed);
      successCount++;
    } catch (err) {
      mediator.onRejected(record, (err as Error).message);
      rejectedCount++;
    }
  }

  await mediator.finalize();

  console.log(`[INFO] Завантажено записів: ${records.length}`);
  console.log(`[INFO] Успішно оброблено: ${successCount}`);
  console.log(`[WARN] Відхилено з помилками: ${rejectedCount}`);
  console.log(`[INFO] Звіт збережено у директорії output/`);
}

main();