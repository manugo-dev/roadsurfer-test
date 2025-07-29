import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import RootLayout from "./RootLayout.vue";

describe("RootLayout.vue", () => {
  it("renders slot content", () => {
    const wrapper = mount(RootLayout, {
      slots: {
        default: '<div class="test-slot">Hello World</div>',
      },
    });
    expect(wrapper.find(".test-slot").exists()).toBe(true);
    expect(wrapper.text()).toContain("Hello World");
  });
});
