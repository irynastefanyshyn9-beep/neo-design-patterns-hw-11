import { AbstractHandler } from "../AbstractHandler";
import { TransactionRecord } from "../../models/DataRecord";

export class AmountParser extends AbstractHandler {
  protected process(record: TransactionRecord): TransactionRecord {
    const amount =
      typeof record.amount === "string"
        ? parseFloat(record.amount)
        : record.amount;
    if (isNaN(amount)) throw new Error("Invalid amount");
    return { ...record, amount };
  }
}