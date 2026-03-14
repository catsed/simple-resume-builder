import { useCallback, useState } from 'react'
import type { EducationEntry } from '../../types/resume'
import { createEmptyEducationEntry } from '../../utils/createEmptyStates'
import { moveArrayItemById } from '../../utils/moveArrayItem'

type EducationField = keyof Omit<EducationEntry, 'id' | 'courses'>

type UseEducationStateResult = {
    education: EducationEntry[]
    handleAddEducation: () => void
    handleRemoveEducation: (id: string) => void
    handleEducationChange: (id: string, field: EducationField, value: string) => void
    handleEducationCoursesChange: (id: string, value: string) => void
    handleMoveEducation: (id: string, direction: 'up' | 'down') => void
    setEducationState: (nextEducation: EducationEntry[]) => void
}

export function useEducationState(initialEducation: EducationEntry[]): UseEducationStateResult {
    const [education, setEducation] = useState(initialEducation)

    const handleAddEducation = useCallback(() => {
        setEducation((currentEducation) => [...currentEducation, createEmptyEducationEntry()])
    }, [])

    const handleRemoveEducation = useCallback((id: string) => {
        setEducation((currentEducation) =>
            currentEducation.filter((educationItem) => educationItem.id !== id),
        )
    }, [])

    const handleEducationChange = useCallback((id: string, field: EducationField, value: string) => {
        setEducation((currentEducation) =>
            currentEducation.map((educationItem) =>
                educationItem.id === id ? { ...educationItem, [field]: value } : educationItem,
            ),
        )
    }, [])

    const handleEducationCoursesChange = useCallback((id: string, value: string) => {
        const courses = value
            .split('\n')

        setEducation((currentEducation) =>
            currentEducation.map((educationItem) =>
                educationItem.id === id ? { ...educationItem, courses } : educationItem,
            ),
        )
    }, [])

    const handleMoveEducation = useCallback((id: string, direction: 'up' | 'down') => {
        setEducation((currentEducation) => moveArrayItemById(currentEducation, id, direction))
    }, [])

    return {
        education,
        handleAddEducation,
        handleRemoveEducation,
        handleEducationChange,
        handleEducationCoursesChange,
        handleMoveEducation,
        setEducationState: setEducation,
    }
}