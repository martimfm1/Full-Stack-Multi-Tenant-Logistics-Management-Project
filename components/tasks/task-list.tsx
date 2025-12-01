"use client"

import { useTasks } from "@/lib/store/task-context"
import { TaskItem } from "./task-item"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Circle } from "lucide-react"

export function TaskList() {
  const { state } = useTasks()
  const { tasks } = state

  const completedTasks = tasks.filter((task) => task.completed).length
  const totalTasks = tasks.length

  if (tasks.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Circle className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
          <p className="text-muted-foreground">
            Nenhuma tarefa ainda. Adicione uma nova tarefa para começar!
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Minhas Tarefas</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4" />
              <span>
                {completedTasks} de {totalTasks} concluídas
              </span>
            </div>
          </div>
          <CardDescription>
            Gerencie suas tarefas de forma organizada e eficiente
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}

