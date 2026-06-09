export type RecordType = "access_log" | "transaction" | "system_error";

export interface BaseRecord {
  type: RecordType;
  timestamp: string;
}

export interface AccessLogRecord extends BaseRecord {
  type: "access_log";
  userId: string;
  ip: string;
}

export interface TransactionRecord extends BaseRecord {
  type: "transaction";
  amount: string | number;
  currency: string;
}

export interface SystemErrorRecord extends BaseRecord {
  type: "system_error";
  level: "info" | "warning" | "critical";
  message: string;
}

export type DataRecord =
  | AccessLogRecord
  | TransactionRecord
  | SystemErrorRecord;