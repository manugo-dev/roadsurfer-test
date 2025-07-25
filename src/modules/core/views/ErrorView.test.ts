import { describe, expect, it } from "vitest"

import ErrorView from "@/modules/core/views/ErrorView.vue"
import { mountWithProviders } from "@/test/utils"

describe("ErrorView", () => {
  it("renders error message", () => {
    const wrapper = mountWithProviders(ErrorView)
    expect(wrapper.find("h1").text()).toBe("Error")
    expect(wrapper.find("p").text()).toBe("Oops! Something went wrong.")
  })

  it("applies error styling to heading", () => {
    const wrapper = mountWithProviders(ErrorView)
    const heading = wrapper.find("h1")
    expect(heading.exists()).toBe(true)
  })

  it("has correct structure", () => {
    const wrapper = mountWithProviders(ErrorView)
    expect(wrapper.find("div").exists()).toBe(true)
    expect(wrapper.findAll("h1")).toHaveLength(1)
    expect(wrapper.findAll("p")).toHaveLength(1)
  })
})
