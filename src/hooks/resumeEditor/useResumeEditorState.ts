import { useCallback, useEffect, useMemo } from 'react'
import { loadResumeEditorState, saveResumeEditorState } from '../../lib/resumeStorage'
import type { ResumeEditorState } from '../../types/resume'
import { useEducationState } from './useEducationState'
import { usePersonalInfoState } from './usePersonalInfoState'
import { useSkillsState } from './useSkillsState'
import { useWorkExperienceState } from './useWorkExperienceState'

export function useResumeEditorState() {
    const initialEditorState = useMemo(() => loadResumeEditorState(), [])

    const {
        personalInfo,
        handlePersonalInfoChange,
        setPersonalInfoState,
    } = usePersonalInfoState(initialEditorState.personalInfo)

    const {
        workExperience,
        handleAddWorkExperience,
        handleRemoveWorkExperience,
        handleWorkExperienceChange,
        handleMoveWorkExperience,
        setWorkExperienceState,
    } = useWorkExperienceState(initialEditorState.workExperience)

    const {
        education,
        handleAddEducation,
        handleRemoveEducation,
        handleEducationChange,
        handleEducationCoursesChange,
        handleMoveEducation,
        setEducationState,
    } = useEducationState(initialEditorState.education)

    const {
        skills,
        handleAddSkill,
        handleRemoveSkill,
        handleSkillChange,
        handleSkillKeywordsChange,
        handleMoveSkill,
        setSkillsState,
    } = useSkillsState(initialEditorState.skills)

    const replaceEditorState = useCallback((nextState: ResumeEditorState) => {
        setPersonalInfoState(nextState.personalInfo)
        setWorkExperienceState(nextState.workExperience)
        setEducationState(nextState.education)
        setSkillsState(nextState.skills)
    }, [setEducationState, setPersonalInfoState, setSkillsState, setWorkExperienceState])

    useEffect(() => {
        saveResumeEditorState({
            personalInfo,
            workExperience,
            education,
            skills,
        })
    }, [personalInfo, workExperience, education, skills])

    return {
        personalInfo,
        workExperience,
        education,
        skills,
        handlePersonalInfoChange,
        handleAddWorkExperience,
        handleRemoveWorkExperience,
        handleWorkExperienceChange,
        handleMoveWorkExperience,
        handleAddEducation,
        handleRemoveEducation,
        handleEducationChange,
        handleEducationCoursesChange,
        handleMoveEducation,
        handleAddSkill,
        handleRemoveSkill,
        handleSkillChange,
        handleSkillKeywordsChange,
        handleMoveSkill,
        replaceEditorState,
    }
}