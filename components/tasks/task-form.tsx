"use client"

import { useState, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTasks } from "@/lib/store/task-context"
import { Plus } from "lucide-react"

export function TaskForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const { addTask } = useTasks()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      addTask({
        title: title.trim(),
        description: description.trim() || undefined,
        completed: false,
      })
      setTitle("")
      setDescription("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título da Tarefa</Label>
        <Input
          id="title"
          type="text"
          placeholder="Digite o título da tarefa..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Descrição (opcional)</Label>
        <Input
          id="description"
          type="text"
          placeholder="Adicione uma descrição..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <Button type="submit" className="w-full">
        <Plus className="h-4 w-4" />
        Adicionar Tarefa
      </Button>
    </form>
  )
}

