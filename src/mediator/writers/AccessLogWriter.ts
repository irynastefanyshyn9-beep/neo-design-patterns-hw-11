import { AccessLogRecord } from "../../models/DataRecord";
import * as fs from "fs/promises";

export class AccessLogWriter {
  private records: AccessLogRecord[] = [];
  write(record: AccessLogRecord) {
    this.records.push(record);
  }
  async finalize() {
    await fs.writeFile(
      "src/output/access_logs.json",
      JSON.stringify(this.records, null, 2)
    );
  }
}