import { AbstractHandler } from "../AbstractHandler";
import { SystemErrorRecord } from "../../models/DataRecord";

export class MessageTrimmer extends AbstractHandler {
  protected process(record: SystemErrorRecord): SystemErrorRecord {
    if (record.message === undefined || record.message === null) {
      throw new Error("Missing required field 'message'");
    }
    return { ...record, message: record.message.trim().slice(0, 255) };
  }
}