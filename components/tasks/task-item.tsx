"use client"

import { Task } from "@/lib/store/task-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useTasks } from "@/lib/store/task-context"
import { Check, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface TaskItemProps {
  task: Task
}

export function TaskItem({ task }: TaskItemProps) {
  const { toggleTask, deleteTask } = useTasks()

  return (
    <Card
      className={cn(
        "transition-all hover:shadow-md",
        task.completed && "opacity-60"
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Button
            variant={task.completed ? "default" : "outline"}
            size="icon"
            onClick={() => toggleTask(task.id)}
            className={cn(
              "shrink-0",
              task.completed && "bg-primary text-primary-foreground"
            )}
            aria-label={task.completed ? "Marcar como não concluída" : "Marcar como concluída"}
          >
            <Check className="h-4 w-4" />
          </Button>
          <div className="flex-1 min-w-0">
            <h3
              className={cn(
                "font-medium text-base",
                task.completed && "line-through text-muted-foreground"
              )}
            >
              {task.title}
            </h3>
            {task.description && (
              <p
                className={cn(
                  "text-sm text-muted-foreground mt-1",
                  task.completed && "line-through"
                )}
              >
                {task.description}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-2">
              {new Date(task.createdAt).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => deleteTask(task.id)}
            className="shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
            aria-label="Excluir tarefa"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

