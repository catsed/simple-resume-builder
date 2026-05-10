import { useCallback, useState } from "react"
import type { ProjectEntry } from "../types/resume"
import { createEmptyProjectEntry } from "../utils/createEmptyStates"
import { moveArrayItemById } from "../utils/moveArrayItem"

type ProjectField = keyof Omit<ProjectEntry, "id">

type UseProjectsStateResult = {
    projects: ProjectEntry[]
    handleAddProject: () => void
    handleRemoveProject: (id: string) => void
    handleProjectChange: (id: string, field: ProjectField, value: string) => void
    handleMoveProject: (id: string, direction: "up" | "down") => void
    setProjectsState: (nextProjects: ProjectEntry[]) => void
}

export function useProjectsState(initialProjects: ProjectEntry[]): UseProjectsStateResult {
    const [projects, setProjects] = useState(initialProjects)

    const handleAddProject = useCallback(() => {
        setProjects((current) => [...current, createEmptyProjectEntry()])
    }, [])

    const handleRemoveProject = useCallback((id: string) => {
        setProjects((current) => current.filter((project) => project.id !== id))
    }, [])

    const handleProjectChange = useCallback((id: string, field: ProjectField, value: string) => {
        setProjects((current) =>
            current.map((project) =>
                project.id === id ? { ...project, [field]: value } : project,
            ),
        )
    }, [])

    const handleMoveProject = useCallback((id: string, direction: "up" | "down") => {
        setProjects((current) => moveArrayItemById(current, id, direction))
    }, [])

    return {
        projects,
        handleAddProject,
        handleRemoveProject,
        handleProjectChange,
        handleMoveProject,
        setProjectsState: setProjects,
    }
}
