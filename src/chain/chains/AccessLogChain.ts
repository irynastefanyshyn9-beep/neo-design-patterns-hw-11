import { TimestampParser } from "../handlers/TimestampParser";
import { UserIdValidator } from "../handlers/UserIdValidator";
import { IpValidator } from "../handlers/IpValidator";
import { AbstractHandler } from "../AbstractHandler";

export function buildAccessLogChain(): AbstractHandler {
  const ts = new TimestampParser();
  const user = new UserIdValidator();
  const ip = new IpValidator();
  ts.setNext(user).setNext(ip);
  return ts;
}