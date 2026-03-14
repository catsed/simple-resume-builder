import type { JsonResume, ResumeEditorState } from '../../../src/types/resume'
import {
    fromJsonResumeDocument,
    toJsonResumeDocument,
} from '../../../src/utils/json/convertJsonResumeDocument'
import {
    createJaneEditorStateFixture,
    createJaneJsonResumeFixture,
} from '../../fixtures/resumeFixtures'

describe('convertJsonResumeDocument', () => {
    test('toJsonResumeDocument maps editor state to JSON Resume format', () => {
        const editorState: ResumeEditorState = createJaneEditorStateFixture()

        const jsonResume = toJsonResumeDocument(editorState)

        expect(jsonResume.basics.location.city).toBe('Berlin, Germany')
        expect(jsonResume.basics.profiles).toEqual([
            { network: 'GitHub', username: '', url: 'https://github.com/janedoe' },
            { network: 'LinkedIn', username: '', url: 'https://linkedin.com/in/janedoe' },
        ])
        expect(jsonResume.work[0]).toEqual({
            name: 'Acme Corp',
            position: 'Engineer',
            url: '',
            startDate: '2022-01',
            endDate: '2024-01',
            summary: 'Worked on product features',
            highlights: [],
        })
        expect(jsonResume.education[0].courses).toEqual(['Algorithms', 'Databases'])
        expect(jsonResume.skills[0]).toEqual({
            name: 'Frontend',
            level: '',
            keywords: ['React', 'TypeScript'],
        })
    })

    test('toJsonResumeDocument omits empty profile URLs', () => {
        const editorState: ResumeEditorState = {
            personalInfo: {
                name: 'John',
                label: '',
                email: '',
                phone: '',
                url: '',
                location: '',
                summary: '',
                github: '',
                linkedin: '',
            },
            workExperience: [],
            education: [],
            skills: [],
        }

        const jsonResume = toJsonResumeDocument(editorState)

        expect(jsonResume.basics.profiles).toEqual([])
    })

    test('fromJsonResumeDocument maps JSON Resume to editor state', () => {
        const jsonResume: JsonResume = createJaneJsonResumeFixture()

        const editorState = fromJsonResumeDocument(jsonResume)

        expect(editorState.personalInfo).toMatchObject({
            name: 'Jane Doe',
            label: 'Frontend Engineer',
            email: 'jane@example.com',
            phone: '+1 555 123',
            url: 'https://janedoe.dev',
            location: 'Berlin, Germany',
            summary: 'Builds polished user interfaces.',
            github: 'https://github.com/janedoe',
            linkedin: 'https://linkedin.com/in/janedoe',
        })
        expect(editorState.workExperience[0]).toMatchObject({
            name: 'Acme Corp',
            position: 'Engineer',
            startDate: '2022-01',
            endDate: '2024-01',
            summary: 'Worked on product features',
        })
        expect(editorState.workExperience[0].id).toEqual(expect.any(String))
        expect(editorState.education[0].courses).toEqual(['Algorithms'])
        expect(editorState.skills[0].keywords).toEqual(['React', 'TypeScript'])
    })

    test('fromJsonResumeDocument creates empty starter entries when arrays are empty', () => {
        const emptyJsonResume: JsonResume = {
            basics: {
                name: '',
                label: '',
                image: '',
                email: '',
                phone: '',
                url: '',
                summary: '',
                location: {
                    address: '',
                    postalCode: '',
                    city: '',
                    countryCode: '',
                    region: '',
                },
                profiles: [],
            },
            work: [],
            education: [],
            skills: [],
        }

        const editorState = fromJsonResumeDocument(emptyJsonResume)

        expect(editorState.workExperience).toHaveLength(1)
        expect(editorState.education).toHaveLength(1)
        expect(editorState.skills).toHaveLength(1)
        expect(editorState.workExperience[0]).toMatchObject({
            name: '',
            position: '',
            startDate: '',
            endDate: '',
            summary: '',
        })
        expect(editorState.education[0]).toMatchObject({
            institution: '',
            area: '',
            studyType: '',
            startDate: '',
            endDate: '',
            score: '',
            courses: [],
        })
        expect(editorState.skills[0]).toMatchObject({
            name: '',
            keywords: [],
        })
    })
})