import type { JsonResume, ResumeEditorState } from "../../types/resume"
import { createEmptyWorkExperience, createEmptyEducationEntry, createEmptySkillEntry } from "./../createEmptyStates"

function createId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function getProfileUrl(profiles: JsonResume['basics']['profiles'], network: string) {
    return profiles.find((profile) => profile.network.toLowerCase() === network.toLowerCase())?.url ?? ''
}

export function toJsonResumeDocument(state: ResumeEditorState): JsonResume {
    return {
        basics: {
            name: state.personalInfo.name,
            label: state.personalInfo.label,
            image: '',
            email: state.personalInfo.email,
            phone: state.personalInfo.phone,
            url: state.personalInfo.url,
            summary: state.personalInfo.summary,
            location: {
                address: '',
                postalCode: '',
                city: state.personalInfo.location,
                countryCode: '',
                region: '',
            },
            profiles: [
                state.personalInfo.github
                    ? { network: 'GitHub', username: '', url: state.personalInfo.github }
                    : null,
                state.personalInfo.linkedin
                    ? { network: 'LinkedIn', username: '', url: state.personalInfo.linkedin }
                    : null,
            ].filter(Boolean) as JsonResume['basics']['profiles'],
        },
        work: state.workExperience.map((workItem) => ({
            name: workItem.name,
            position: workItem.position,
            url: '',
            startDate: workItem.startDate,
            endDate: workItem.endDate,
            summary: workItem.summary,
            highlights: [],
        })),
        education: state.education.map((educationItem) => ({
            institution: educationItem.institution,
            url: '',
            area: educationItem.area,
            studyType: educationItem.studyType,
            startDate: educationItem.startDate,
            endDate: educationItem.endDate,
            score: educationItem.score,
            courses: educationItem.courses,
        })),
        skills: state.skills.map((skillItem) => ({
            name: skillItem.name,
            level: '',
            keywords: skillItem.keywords,
        })),
    }
}

export function fromJsonResumeDocument(document: JsonResume): ResumeEditorState {
    const workExperience = document.work.length
        ? document.work.map((workItem) => ({
            id: createId(),
            name: workItem.name ?? '',
            position: workItem.position ?? '',
            startDate: workItem.startDate ?? '',
            endDate: workItem.endDate ?? '',
            summary: workItem.summary ?? '',
        }))
        : [createEmptyWorkExperience()]

    const education = document.education.length
        ? document.education.map((educationItem) => ({
            id: createId(),
            institution: educationItem.institution ?? '',
            area: educationItem.area ?? '',
            studyType: educationItem.studyType ?? '',
            startDate: educationItem.startDate ?? '',
            endDate: educationItem.endDate ?? '',
            score: educationItem.score ?? '',
            courses: educationItem.courses ?? [],
        }))
        : [createEmptyEducationEntry()]

    const skills = document.skills.length
        ? document.skills.map((skillItem) => ({
            id: createId(),
            name: skillItem.name ?? '',
            keywords: skillItem.keywords ?? [],
        }))
        : [createEmptySkillEntry()]

    return {
        personalInfo: {
            name: document.basics.name ?? '',
            label: document.basics.label ?? '',
            email: document.basics.email ?? '',
            phone: document.basics.phone ?? '',
            url: document.basics.url ?? '',
            location: document.basics.location?.city ?? '',
            summary: document.basics.summary ?? '',
            github: getProfileUrl(document.basics.profiles ?? [], 'GitHub'),
            linkedin: getProfileUrl(document.basics.profiles ?? [], 'LinkedIn'),
        },
        workExperience,
        education,
        skills,
    }
}