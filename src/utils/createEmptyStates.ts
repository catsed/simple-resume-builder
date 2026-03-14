import type { WorkExperience, EducationEntry, SkillEntry, BasicsInfo } from "../types/resume"

export const initialBasicsInfo: BasicsInfo = {
    name: '',
    label: '',
    email: '',
    phone: '',
    url: '',
    location: '',
    summary: '',
    github: '',
    linkedin: '',
}

export function createEmptyWorkExperience(): WorkExperience {
    return {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name: '',
        position: '',
        startDate: '',
        endDate: '',
        summary: '',
    }
}

export const initialWorkExperience: WorkExperience[] = [createEmptyWorkExperience()]

export function createEmptyEducationEntry(): EducationEntry {
    return {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        institution: '',
        area: '',
        studyType: '',
        startDate: '',
        endDate: '',
        score: '',
        courses: [],
    }
}

export const initialEducation: EducationEntry[] = [createEmptyEducationEntry()]

export function createEmptySkillEntry(): SkillEntry {
    return {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name: '',
        keywords: [],
    }
}

export const initialSkills: SkillEntry[] = [createEmptySkillEntry()]