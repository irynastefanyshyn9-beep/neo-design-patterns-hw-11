import { AbstractHandler } from "../AbstractHandler";
import { AccessLogRecord } from "../../models/DataRecord";

const ipv4Regex =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export class IpValidator extends AbstractHandler {
  protected process(record: AccessLogRecord): AccessLogRecord {
    if (!ipv4Regex.test(record.ip)) throw new Error("Invalid IP address");
    return record;
  }
}