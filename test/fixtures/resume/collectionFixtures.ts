import type { EducationEntry, SkillEntry, WorkExperience } from '../../../src/types/resume'
import { cloneFixture } from './cloneFixture'

const workItemsFixture: WorkExperience[] = [
    {
        id: 'work-1',
        name: 'Acme',
        position: 'Engineer',
        startDate: '2020',
        endDate: '2022',
        summary: 'Built features',
    },
    {
        id: 'work-2',
        name: 'Beta',
        position: 'Senior Engineer',
        startDate: '2022',
        endDate: '2025',
        summary: 'Led projects',
    },
    {
        id: 'work-3',
        name: 'Gamma',
        position: 'Lead',
        startDate: '2025',
        endDate: '',
        summary: 'Managing roadmap',
    },
]

const educationItemsFixture: EducationEntry[] = [
    {
        id: 'edu-1',
        institution: 'Tech University',
        area: 'Computer Science',
        studyType: 'Bachelor',
        startDate: '2018',
        endDate: '2021',
        score: '3.9',
        courses: ['Algorithms', 'Databases'],
    },
    {
        id: 'edu-2',
        institution: 'State University',
        area: 'Software Engineering',
        studyType: 'Master',
        startDate: '2022',
        endDate: '2024',
        score: '4.0',
        courses: ['Distributed Systems', 'ML Systems'],
    },
    {
        id: 'edu-3',
        institution: 'Open Course Program',
        area: 'Cloud',
        studyType: 'Certificate',
        startDate: '2025',
        endDate: '',
        score: '',
        courses: ['Kubernetes'],
    },
]

const skillItemsFixture: SkillEntry[] = [
    {
        id: 'skill-1',
        name: 'Frontend',
        keywords: ['React', 'TypeScript'],
    },
    {
        id: 'skill-2',
        name: 'Backend',
        keywords: ['Node.js', 'PostgreSQL'],
    },
    {
        id: 'skill-3',
        name: 'Testing',
        keywords: ['Jest', 'RTL'],
    },
]

export function createWorkItems(): WorkExperience[] {
    return cloneFixture(workItemsFixture)
}

export function createEducationItems(): EducationEntry[] {
    return cloneFixture(educationItemsFixture)
}

export function createSkillItems(): SkillEntry[] {
    return cloneFixture(skillItemsFixture)
}