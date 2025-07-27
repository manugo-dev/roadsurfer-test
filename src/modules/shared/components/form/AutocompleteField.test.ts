import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import AutocompleteField from "./AutocompleteField.vue";

const MOCKED_OPTIONS = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
];

describe("AutocompleteField.vue", () => {
  it("renders input and options", async () => {
    const wrapper = mount(AutocompleteField, {
      props: { options: MOCKED_OPTIONS },
    });
    const input = wrapper.find("input");
    expect(input.exists()).toBe(true);
    await input.trigger("focus");
    await wrapper.vm.$nextTick();
    expect(wrapper.find("ul").exists()).toBe(true);
    expect(wrapper.findAll("li").length).toBe(MOCKED_OPTIONS.length);
  });

  it("filters options based on input", async () => {
    const wrapper = mount(AutocompleteField, {
      props: { options: MOCKED_OPTIONS },
    });
    const input = wrapper.find("input");
    await input.trigger("focus");
    await input.setValue("Banana");
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll("li").length).toBe(1);
    expect(wrapper.find("li").text()).toBe("Banana");
  });

  it("selects option on click", async () => {
    const wrapper = mount(AutocompleteField, {
      props: { options: MOCKED_OPTIONS },
    });
    const input = wrapper.find("input");
    await input.trigger("focus");
    await wrapper.vm.$nextTick();
    await wrapper.findAll("li")[1].trigger("click");
    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")?.[0]?.[0]).toEqual(MOCKED_OPTIONS[1]);
  });

  it("handles keyboard navigation and selection", async () => {
    const wrapper = mount(AutocompleteField, {
      props: { options: MOCKED_OPTIONS },
    });
    const input = wrapper.find("input");
    await input.trigger("focus");
    await wrapper.vm.$nextTick();
    await wrapper.trigger("keydown", { key: "ArrowDown" });
    expect(wrapper.findAll("li")[0].attributes("aria-selected")).toBe("true");
    await wrapper.trigger("keydown", { key: "ArrowDown" });
    expect(wrapper.findAll("li")[1].attributes("aria-selected")).toBe("true");
    await wrapper.trigger("keydown", { key: "Enter" });
    expect(wrapper.emitted("update:modelValue")?.[0][0]).toEqual(MOCKED_OPTIONS[1]);
  });

  it("shows no options found text", async () => {
    const wrapper = mount(AutocompleteField, {
      props: { options: MOCKED_OPTIONS },
    });
    const input = wrapper.find("input");
    await input.trigger("focus");
    await input.setValue("ANYOPTIONWILLNOTMATCH");
    await wrapper.vm.$nextTick();
    expect(wrapper.find("li").text()).toBe("No options found");
  });
});
