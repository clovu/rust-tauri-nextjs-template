import { describe, test, expect } from "vitest"
import reducer, { Task, addTask, setTaskList, removeTaskById, TaskStatus, updateTask } from "./task"

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

  test("should remove task", () => {
    let state = { list: [] as Task[] }
    state = reducer(state, addTask({ name: "eat", status: 1 }))

    expect(
      reducer(state, removeTaskById(1)).list,
    ).toEqual([])
  })

  test("should update task", () => {
    let state = { list: [] as Task[] }
    state = reducer(state, addTask({ name: "eat", status: 1 }))

    expect(
      reducer(state, updateTask({ id: 1, name: "sleep", status: TaskStatus.Done })).list,
    ).toEqual([{ id: 1, name: "sleep", status: TaskStatus.Done }])
  })
})
