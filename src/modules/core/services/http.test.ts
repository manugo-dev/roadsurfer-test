import axios, { type AxiosInstance } from "axios";
import { describe, it, expect, vi } from "vitest";

import { createHttpClient } from "./http";

vi.mock("axios");

describe("createHttpClient", () => {
  it("should create an axios instance with default headers", () => {
    const mockCreate = vi.spyOn(axios, "create");
    const config = { baseURL: "https://api.example.com" };
    createHttpClient(config);
    expect(mockCreate).toHaveBeenCalledWith({
      headers: {
        "Content-Type": "application/json",
      },
      ...config,
    });
    mockCreate.mockRestore();
  });

  it("should return the axios instance", () => {
    const mockInstance = {};
    vi.spyOn(axios, "create").mockReturnValue(mockInstance as AxiosInstance);
    const config = {};
    const result = createHttpClient(config);
    expect(result).toBe(mockInstance);
  });
});
