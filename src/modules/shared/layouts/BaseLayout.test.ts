import { shallowMount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import HeaderBar from "@/modules/shared/components/ui/HeaderBar.vue";
import BaseLayout from "@/modules/shared/layouts/BaseLayout.vue";

describe("BaseLayout", () => {
  it("should render HeaderBar", () => {
    const wrapper = shallowMount(BaseLayout, { global: { stubs: { RouterView: true } } });
    expect(wrapper.findComponent(HeaderBar).exists()).toBe(true);
  });

  it("should render router-view", () => {
    const wrapper = shallowMount(BaseLayout, { global: { stubs: { RouterView: true } } });
    expect(wrapper.findComponent({ name: "RouterView" }).exists()).toBe(true);
  });
});
