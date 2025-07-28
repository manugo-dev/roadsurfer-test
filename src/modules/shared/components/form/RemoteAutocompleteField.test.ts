import { describe, it, expect, vi, beforeEach } from "vitest";
import { nextTick } from "vue";

import type { AutocompleteOption } from "./AutocompleteField.vue";
import RemoteAutocompleteField, { type RemoteAutocompleteFieldProps } from "./RemoteAutocompleteField.vue";
import { mountWithProviders } from "@/test/utils";

type MockedRemoteItem = { id: string; name: string; category: string };
const MOCKED_REMOTE_OPTIONS: MockedRemoteItem[] = [
  { id: "1", name: "Option 1", category: "Category A" },
  { id: "2", name: "Option 2", category: "Category B" },
];

const mockedFetchOptionsFn = vi.fn(async (query: string): Promise<MockedRemoteItem[]> => {
  if (!query) return MOCKED_REMOTE_OPTIONS;
  return MOCKED_REMOTE_OPTIONS.filter((opt) => opt.name.includes(query));
});

const mockedTransformOptionFn = (option: MockedRemoteItem): AutocompleteOption => ({
  label: option.name,
  value: option.id,
});

function mountRemoteAutocompleteWithMockedData(props: Partial<RemoteAutocompleteFieldProps<MockedRemoteItem>> = {}) {
  return mountWithProviders(RemoteAutocompleteField, {
    props: {
      fetchOptions: mockedFetchOptionsFn,
      transformOption: mockedTransformOptionFn,
      ...props,
    },
  });
}

describe("RemoteAutocompleteField", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with props", async () => {
    const wrapper = mountRemoteAutocompleteWithMockedData({ label: "Test Label", placeholder: "Type..." });
    expect(wrapper.text()).toContain("Test Label");
    expect(wrapper.find("input").attributes("placeholder")).toBe("Type...");
  });

  it("fetches and displays options", async () => {
    const wrapper = mountRemoteAutocompleteWithMockedData();
    const input = wrapper.find("input");
    expect(input.exists()).toBe(true);
    await input.trigger("focus");
    await nextTick();
    const options = wrapper.findAll('[role="option"]');
    expect(mockedFetchOptionsFn).toHaveBeenCalled();
    expect(options.length).toBeGreaterThan(0);
  });

  it("emits select and update:modelValue", async () => {
    const wrapper = mountRemoteAutocompleteWithMockedData();
    const input = wrapper.find("input");
    expect(input.exists()).toBe(true);
    await input.trigger("focus");
    await nextTick();
    const options = wrapper.findAll('[role="option"]');
    await options[0].trigger("click");
    const selectedOption = {
      label: MOCKED_REMOTE_OPTIONS[0].name,
      value: MOCKED_REMOTE_OPTIONS[0].id,
      original: MOCKED_REMOTE_OPTIONS[0],
    };
    expect(wrapper.emitted("select")).toStrictEqual([[selectedOption]]);
    expect(wrapper.emitted("update:modelValue")).toStrictEqual([[selectedOption]]);
  });

  it("updates input and emits update:input", async () => {
    const wrapper = mountRemoteAutocompleteWithMockedData();
    const input = wrapper.find("input");

    await input.setValue("Option");
    await input.trigger("input");
    await nextTick();

    expect(wrapper.emitted("update:input")).toBeTruthy();
    expect(mockedFetchOptionsFn).toHaveBeenCalled();
  });

  it("handles disabled prop", () => {
    const wrapper = mountRemoteAutocompleteWithMockedData({ disabled: true });
    expect(wrapper.find("input").attributes("disabled")).toBeDefined();
  });
});
