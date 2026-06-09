import { DataRecord } from "../../models/DataRecord";
import * as fs from "fs/promises";

export class RejectedWriter {
  private lines: string[] = [];
  write(record: DataRecord, error: string) {
    this.lines.push(JSON.stringify({ record, error }));
  }
  async finalize() {
    await fs.writeFile("src/output/rejected.jsonl", this.lines.join("\n"));
  }
}