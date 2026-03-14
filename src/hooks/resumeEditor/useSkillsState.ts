import { useCallback, useState } from 'react'
import type { SkillEntry } from '../../types/resume'
import { createEmptySkillEntry } from '../../utils/createEmptyStates'
import { moveArrayItemById } from '../../utils/moveArrayItem'

type UseSkillsStateResult = {
    skills: SkillEntry[]
    handleAddSkill: () => void
    handleRemoveSkill: (id: string) => void
    handleSkillChange: (id: string, name: string) => void
    handleSkillKeywordsChange: (id: string, value: string) => void
    handleMoveSkill: (id: string, direction: 'up' | 'down') => void
    setSkillsState: (nextSkills: SkillEntry[]) => void
}

export function useSkillsState(initialSkills: SkillEntry[]): UseSkillsStateResult {
    const [skills, setSkills] = useState(initialSkills)

    const handleAddSkill = useCallback(() => {
        setSkills((currentSkills) => [...currentSkills, createEmptySkillEntry()])
    }, [])

    const handleRemoveSkill = useCallback((id: string) => {
        setSkills((currentSkills) => currentSkills.filter((skill) => skill.id !== id))
    }, [])

    const handleSkillChange = useCallback((id: string, name: string) => {
        setSkills((currentSkills) =>
            currentSkills.map((skill) => (skill.id === id ? { ...skill, name } : skill)),
        )
    }, [])

    const handleSkillKeywordsChange = useCallback((id: string, value: string) => {
        const keywords = value.split('\n')

        setSkills((currentSkills) =>
            currentSkills.map((skill) => (skill.id === id ? { ...skill, keywords } : skill)),
        )
    }, [])

    const handleMoveSkill = useCallback((id: string, direction: 'up' | 'down') => {
        setSkills((currentSkills) => moveArrayItemById(currentSkills, id, direction))
    }, [])

    return {
        skills,
        handleAddSkill,
        handleRemoveSkill,
        handleSkillChange,
        handleSkillKeywordsChange,
        handleMoveSkill,
        setSkillsState: setSkills,
    }
}