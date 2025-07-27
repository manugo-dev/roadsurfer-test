import { describe, expect, it } from "vitest";

import ErrorView from "@/modules/core/views/ErrorView.vue";
import { mountWithProviders } from "@/test/utils";

describe("ErrorView", () => {
  it("renders error message", () => {
    const wrapper = mountWithProviders(ErrorView);
    expect(wrapper.find("h1").text()).toBe("Error");
    expect(wrapper.find("p").text()).toBe("Oops! Something went wrong.");
  });
});
