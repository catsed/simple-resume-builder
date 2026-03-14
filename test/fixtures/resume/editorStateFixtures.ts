import type { ResumeEditorState } from '../../../src/types/resume'
import { cloneFixture } from './cloneFixture'

const janeEditorStateFixture: ResumeEditorState = {
    personalInfo: {
        name: 'Jane Doe',
        label: 'Frontend Engineer',
        email: 'jane@example.com',
        phone: '+1 555 123',
        url: 'https://janedoe.dev',
        location: 'Berlin, Germany',
        summary: 'Builds polished user interfaces.',
        github: 'https://github.com/janedoe',
        linkedin: 'https://linkedin.com/in/janedoe',
    },
    workExperience: [
        {
            id: 'work-1',
            name: 'Acme Corp',
            position: 'Engineer',
            startDate: '2022-01',
            endDate: '2024-01',
            summary: 'Worked on product features',
        },
    ],
    education: [
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
    ],
    skills: [
        {
            id: 'skill-1',
            name: 'Frontend',
            keywords: ['React', 'TypeScript'],
        },
    ],
}

const johnEditorStateFixture: ResumeEditorState = {
    personalInfo: {
        name: 'John Smith',
        label: 'Backend Engineer',
        email: 'john@example.com',
        phone: '+49 1234',
        url: 'https://john.dev',
        location: 'Munich, Germany',
        summary: 'Designs distributed systems.',
        github: 'https://github.com/john',
        linkedin: 'https://linkedin.com/in/john',
    },
    workExperience: [
        {
            id: 'work-next',
            name: 'Example Inc',
            position: 'Staff Engineer',
            startDate: '2021',
            endDate: '',
            summary: 'Led platform modernization.',
        },
    ],
    education: [
        {
            id: 'edu-next',
            institution: 'State University',
            area: 'Software Engineering',
            studyType: 'Master',
            startDate: '2017',
            endDate: '2019',
            score: '4.0',
            courses: ['Systems Design'],
        },
    ],
    skills: [
        {
            id: 'skill-next',
            name: 'Platform',
            keywords: ['Kubernetes', 'Observability'],
        },
    ],
}

export function createJaneEditorStateFixture(): ResumeEditorState {
    return cloneFixture(janeEditorStateFixture)
}

export function createJohnEditorStateFixture(): ResumeEditorState {
    return cloneFixture(johnEditorStateFixture)
}