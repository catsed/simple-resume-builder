import { useCallback, useEffect, useMemo } from "react"
import { loadResumeEditorState, saveResumeEditorState } from "../lib/resumeStorage"
import type { ResumeEditorState } from "../types/resume"
import { useEducationState } from "./useEducationState"
import { usePersonalInfoState } from "./usePersonalInfoState"
import { useProjectsState } from "./useProjectsState"
import { useSkillsState } from "./useSkillsState"
import { useWorkExperienceState } from "./useWorkExperienceState"

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
        projects,
        handleAddProject,
        handleRemoveProject,
        handleProjectChange,
        handleMoveProject,
        setProjectsState,
    } = useProjectsState(initialEditorState.projects)

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
        setProjectsState(nextState.projects)
        setEducationState(nextState.education)
        setSkillsState(nextState.skills)
    }, [setEducationState, setPersonalInfoState, setProjectsState, setSkillsState, setWorkExperienceState])

    useEffect(() => {
        saveResumeEditorState({
            personalInfo,
            workExperience,
            projects,
            education,
            skills,
        })
    }, [personalInfo, workExperience, projects, education, skills])

    return {
        personalInfo,
        workExperience,
        projects,
        education,
        skills,
        handlePersonalInfoChange,
        handleAddWorkExperience,
        handleRemoveWorkExperience,
        handleWorkExperienceChange,
        handleMoveWorkExperience,
        handleAddProject,
        handleRemoveProject,
        handleProjectChange,
        handleMoveProject,
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