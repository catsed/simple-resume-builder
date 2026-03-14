import type { JsonResume } from '../../../src/types/resume'
import { cloneFixture } from './cloneFixture'

const janeJsonResumeFixture: JsonResume = {
    basics: {
        name: 'Jane Doe',
        label: 'Frontend Engineer',
        image: '',
        email: 'jane@example.com',
        phone: '+1 555 123',
        url: 'https://janedoe.dev',
        summary: 'Builds polished user interfaces.',
        location: {
            address: '',
            postalCode: '',
            city: 'Berlin, Germany',
            countryCode: '',
            region: '',
        },
        profiles: [
            { network: 'github', username: '', url: 'https://github.com/janedoe' },
            { network: 'LinkedIn', username: '', url: 'https://linkedin.com/in/janedoe' },
        ],
    },
    work: [
        {
            name: 'Acme Corp',
            position: 'Engineer',
            url: '',
            startDate: '2022-01',
            endDate: '2024-01',
            summary: 'Worked on product features',
            highlights: [],
        },
    ],
    education: [
        {
            institution: 'Tech University',
            url: '',
            area: 'Computer Science',
            studyType: 'Bachelor',
            startDate: '2018',
            endDate: '2021',
            score: '3.9',
            courses: ['Algorithms'],
        },
    ],
    skills: [
        {
            name: 'Frontend',
            level: '',
            keywords: ['React', 'TypeScript'],
        },
    ],
}

const johnJsonResumeFixture: JsonResume = {
    basics: {
        name: 'John Smith',
        label: 'Software Engineer',
        image: '',
        email: 'john@example.com',
        phone: '+49 1234',
        url: 'https://john.dev',
        summary: 'Builds reliable systems.',
        location: {
            address: '',
            postalCode: '',
            city: 'Munich, Germany',
            countryCode: '',
            region: '',
        },
        profiles: [
            { network: 'GitHub', username: '', url: 'https://github.com/john' },
            { network: 'LinkedIn', username: '', url: 'https://linkedin.com/in/john' },
        ],
    },
    work: [
        {
            name: 'Example Inc',
            position: 'Developer',
            url: '',
            startDate: '2020',
            endDate: '2025',
            summary: 'Delivered customer-facing features.',
            highlights: [],
        },
    ],
    education: [
        {
            institution: 'State University',
            url: '',
            area: 'Informatics',
            studyType: 'Bachelor',
            startDate: '2016',
            endDate: '2019',
            score: '1.7',
            courses: ['Distributed Systems'],
        },
    ],
    skills: [
        {
            name: 'Backend',
            level: '',
            keywords: ['Node.js', 'PostgreSQL'],
        },
    ],
}

export function createJaneJsonResumeFixture(): JsonResume {
    return cloneFixture(janeJsonResumeFixture)
}

export function createJohnJsonResumeFixture(): JsonResume {
    return cloneFixture(johnJsonResumeFixture)
}