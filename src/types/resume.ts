import { initialBasicsInfo, initialEducation, initialProjects, initialSkills, initialWorkExperience } from "../utils/createEmptyStates"

export type BasicsCommonFields = {
    name: string
    label: string
    email: string
    phone: string
    url: string
    summary: string
}

export type WorkCommonFields = {
    name: string
    position: string
    startDate: string
    endDate: string
    summary: string
}

export type EducationCommonFields = {
    institution: string
    area: string
    studyType: string
    startDate: string
    endDate: string
    score: string
    courses: string[]
}

export type SkillCommonFields = {
    name: string
    keywords: string[]
}

export type ProjectCommonFields = {
    name: string
    url: string
    startDate: string
    endDate: string
    description: string
}

type EditorEntryId = {
    id: string
}

export type BasicsInfo = BasicsCommonFields & {
    location: string
    github: string
    linkedin: string
}

export type WorkExperience = EditorEntryId & WorkCommonFields

export type EducationEntry = EditorEntryId & EducationCommonFields

export type SkillEntry = EditorEntryId & SkillCommonFields

export type ProjectEntry = EditorEntryId & ProjectCommonFields

export type JsonResumeProfile = {
    network: string
    username: string
    url: string
}

export type JsonResumeLocation = {
    address: string
    postalCode: string
    city: string
    countryCode: string
    region: string
}

export type JsonResumeBasics = BasicsCommonFields & {
    image: string
    location: JsonResumeLocation
    profiles: JsonResumeProfile[]
}

export type JsonResumeWorkItem = WorkCommonFields & {
    url: string
    highlights: string[]
}

export type JsonResumeEducationItem = EducationCommonFields & {
    url: string
}

export type JsonResumeSkillItem = SkillCommonFields & {
    level: string
}

export type JsonResumeProjectItem = ProjectCommonFields & {
    highlights: string[]
}

export type JsonResume = {
    basics: JsonResumeBasics
    work: JsonResumeWorkItem[]
    education: JsonResumeEducationItem[]
    skills: JsonResumeSkillItem[]
    projects: JsonResumeProjectItem[]
}

export type ResumeEditorState = {
    personalInfo: BasicsInfo
    workExperience: WorkExperience[]
    projects: ProjectEntry[]
    education: EducationEntry[]
    skills: SkillEntry[]
}

export const initialResumeEditorState: ResumeEditorState = {
    personalInfo: initialBasicsInfo,
    workExperience: initialWorkExperience,
    projects: initialProjects,
    education: initialEducation,
    skills: initialSkills,
}
