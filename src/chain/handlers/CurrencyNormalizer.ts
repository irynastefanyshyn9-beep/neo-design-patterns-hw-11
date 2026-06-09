import { AbstractHandler } from "../AbstractHandler";
import { TransactionRecord } from "../../models/DataRecord";

export class CurrencyNormalizer extends AbstractHandler {
  protected process(record: TransactionRecord): TransactionRecord {
    if (!record.currency || record.currency.trim() === "") {
      throw new Error("Invalid currency");
    }
    return { ...record, currency: record.currency.toUpperCase() };
  }
}