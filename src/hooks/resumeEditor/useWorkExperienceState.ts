import { useCallback, useState } from 'react'
import type { WorkExperience } from '../../types/resume'
import { createEmptyWorkExperience } from '../../utils/createEmptyStates'
import { moveArrayItemById } from '../../utils/moveArrayItem'

type WorkField = keyof Omit<WorkExperience, 'id'>

type UseWorkExperienceStateResult = {
    workExperience: WorkExperience[]
    handleAddWorkExperience: () => void
    handleRemoveWorkExperience: (id: string) => void
    handleWorkExperienceChange: (id: string, field: WorkField, value: string) => void
    handleMoveWorkExperience: (id: string, direction: 'up' | 'down') => void
    setWorkExperienceState: (nextWorkExperience: WorkExperience[]) => void
}

export function useWorkExperienceState(
    initialWorkExperience: WorkExperience[],
): UseWorkExperienceStateResult {
    const [workExperience, setWorkExperience] = useState(initialWorkExperience)

    const handleAddWorkExperience = useCallback(() => {
        setWorkExperience((currentWorkExperience) => [
            ...currentWorkExperience,
            createEmptyWorkExperience(),
        ])
    }, [])

    const handleRemoveWorkExperience = useCallback((id: string) => {
        setWorkExperience((currentWorkExperience) =>
            currentWorkExperience.filter((workItem) => workItem.id !== id),
        )
    }, [])

    const handleWorkExperienceChange = useCallback((id: string, field: WorkField, value: string) => {
        setWorkExperience((currentWorkExperience) =>
            currentWorkExperience.map((workItem) =>
                workItem.id === id ? { ...workItem, [field]: value } : workItem,
            ),
        )
    }, [])

    const handleMoveWorkExperience = useCallback((id: string, direction: 'up' | 'down') => {
        setWorkExperience((currentWorkExperience) =>
            moveArrayItemById(currentWorkExperience, id, direction),
        )
    }, [])

    return {
        workExperience,
        handleAddWorkExperience,
        handleRemoveWorkExperience,
        handleWorkExperienceChange,
        handleMoveWorkExperience,
        setWorkExperienceState: setWorkExperience,
    }
}