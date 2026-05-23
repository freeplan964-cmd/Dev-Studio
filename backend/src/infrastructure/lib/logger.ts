/**
 * Lightweight structured logger.
 * - Dev: coloured human-readable output to stdout
 * - Prod: newline-delimited JSON (NDJSON) for log aggregators
 */

const isProd = process.env.NODE_ENV === "production";

type LogLevel = "debug" | "info" | "warn" | "error";

const LEVEL_COLORS: Record<LogLevel, string> = {
  debug: "\x1b[36m",
  info:  "\x1b[32m",
  warn:  "\x1b[33m",
  error: "\x1b[31m",
};
const RESET = "\x1b[0m";

function write(level: LogLevel, msg: string, meta?: Record<string, unknown>): void {
  if (isProd) {
    const entry: Record<string, unknown> = {
      level,
      time: new Date().toISOString(),
      msg,
      ...meta,
    };
    process.stdout.write(JSON.stringify(entry) + "\n");
  } else {
    const color = LEVEL_COLORS[level];
    const metaStr = meta && Object.keys(meta).length ? " " + JSON.stringify(meta) : "";
    const line = `${color}[${level.toUpperCase().padEnd(5)}]${RESET} ${msg}${metaStr}`;
    if (level === "error") {
      process.stderr.write(line + "\n");
    } else {
      process.stdout.write(line + "\n");
    }
  }
}

export const logger = {
  debug: (msg: string, meta?: Record<string, unknown>) => write("debug", msg, meta),
  info:  (msg: string, meta?: Record<string, unknown>) => write("info",  msg, meta),
  warn:  (msg: string, meta?: Record<string, unknown>) => write("warn",  msg, meta),
  error: (msg: string, meta?: Record<string, unknown>) => write("error", msg, meta),
};
