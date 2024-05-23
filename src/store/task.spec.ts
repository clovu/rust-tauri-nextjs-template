import { describe, test, expect } from "vitest"
import reducer, { addTask, setTaskList } from "./task"

describe("task store", () => {
  test("should add task", () => {
    const state = { list: [] }

    expect(
      reducer(state, addTask({ name: "eat", status: 1 })).list,
    ).toEqual([{ id: 1, name: "eat", status: 1 }])
  })

  test("should set task list", () => {
    const state = { list: [] }

    expect(
      reducer(state, setTaskList([{ name: "eat", status: 1, id: 1 }])).list,
    ).toEqual([{ id: 1, name: "eat", status: 1 }])
  })
})
