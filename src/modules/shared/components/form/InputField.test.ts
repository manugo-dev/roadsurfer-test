import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { ref } from "vue";

import InputField from "./InputField.vue";

describe("InputField.vue", () => {
  it("renders label and required asterisk when is required", () => {
    const wrapper = mount(InputField, {
      props: {
        label: "Email",
        required: true,
      },
    });
    expect(wrapper.find("label").exists()).toBe(true);
    expect(wrapper.find("span.text-red-500").text()).toBe("*");
  });

  it("does not render required asterisk when not required", () => {
    const wrapper = mount(InputField, {
      props: {
        label: "Email",
        required: false,
      },
    });
    expect(wrapper.find("span.text-red-500").exists()).toBe(false);
  });

  it("renders error message and applies error styles", () => {
    const wrapper = mount(InputField, {
      props: {
        errorMessage: "Invalid input",
      },
    });
    expect(wrapper.find(".text-red-500").text()).toBe("Invalid input");
    expect(wrapper.find("input").classes()).toContain("border-red-500");
  });

  it("renders helper text", () => {
    const wrapper = mount(InputField, {
      props: {
        helperText: "Enter your email",
      },
    });
    expect(wrapper.find(".text-zinc-500").text()).toBe("Enter your email");
  });

  it("disables input when disabled prop is true", () => {
    const wrapper = mount(InputField, {
      props: {
        disabled: true,
      },
    });
    expect(wrapper.find("input").attributes("disabled")).toBeDefined();
    expect(wrapper.find("input").classes()).toContain("cursor-not-allowed");
  });

  it("binds v-model correctly", async () => {
    const model = ref("");
    const wrapper = mount(InputField, {
      props: {
        label: "Name",
        modelValue: model.value,
        "onUpdate:modelValue": (val: string) => (model.value = val),
      },
    });
    const input = wrapper.find("input");
    await input.setValue("John Doe");
    expect(model.value).toBe("John Doe");
  });
});
