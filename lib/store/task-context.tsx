"use client"

import React, { createContext, useContext, useReducer, ReactNode } from "react"

export interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  createdAt: Date
}

interface TaskState {
  tasks: Task[]
}

type TaskAction =
  | { type: "ADD_TASK"; payload: Omit<Task, "id" | "createdAt"> }
  | { type: "TOGGLE_TASK"; payload: string }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "UPDATE_TASK"; payload: Task }

const initialState: TaskState = {
  tasks: [],
}

function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case "ADD_TASK":
      return {
        tasks: [
          ...state.tasks,
          {
            ...action.payload,
            id: crypto.randomUUID(),
            createdAt: new Date(),
          },
        ],
      }
    case "TOGGLE_TASK":
      return {
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      }
    case "DELETE_TASK":
      return {
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      }
    case "UPDATE_TASK":
      return {
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      }
    default:
      return state
  }
}

interface TaskContextType {
  state: TaskState
  addTask: (task: Omit<Task, "id" | "createdAt">) => void
  toggleTask: (id: string) => void
  deleteTask: (id: string) => void
  updateTask: (task: Task) => void
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export function TaskProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, initialState)

  const addTask = (task: Omit<Task, "id" | "createdAt">) => {
    dispatch({ type: "ADD_TASK", payload: task })
  }

  const toggleTask = (id: string) => {
    dispatch({ type: "TOGGLE_TASK", payload: id })
  }

  const deleteTask = (id: string) => {
    dispatch({ type: "DELETE_TASK", payload: id })
  }

  const updateTask = (task: Task) => {
    dispatch({ type: "UPDATE_TASK", payload: task })
  }

  return (
    <TaskContext.Provider
      value={{ state, addTask, toggleTask, deleteTask, updateTask }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TaskContext)
  if (context === undefined) {
    throw new Error("useTasks deve ser usado dentro de um TaskProvider")
  }
  return context
}

