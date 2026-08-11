import { describe, expect, test } from "vitest";
import type { IncomingHttpHeaders } from "http";
import { getAPIKey } from "../api/auth.js";

describe("getAPIKey", () => {
  test("returns null when authorization header is missing", () => {
    const headers: IncomingHttpHeaders = {};
    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns null when scheme is not ApiKey", () => {
    const headers: IncomingHttpHeaders = { authorization: "Bearer abc123" };
    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns null when header is malformed (no key)", () => {
    const headers: IncomingHttpHeaders = { authorization: "ApiKey" };
    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns the api key when header uses ApiKey scheme", () => {
    const headers: IncomingHttpHeaders = { authorization: "ApiKey my-secret-key" };
    expect(getAPIKey(headers)).toBe("my-secret-key");
  });
});

