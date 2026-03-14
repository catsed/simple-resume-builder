import {
    RESUME_STORAGE_KEY,
    loadResumeEditorState,
    saveResumeEditorState,
} from '../../src/lib/resumeStorage'
import { initialResumeEditorState, type ResumeEditorState } from '../../src/types/resume'
import {
    createJaneEditorStateFixture,
    createJohnJsonResumeFixture,
} from '../fixtures/resumeFixtures'

describe('resumeStorage', () => {
    beforeEach(() => {
        window.localStorage.clear()
    })

    test('loadResumeEditorState returns initial state when nothing is stored', () => {
        const result = loadResumeEditorState()

        expect(result).toBe(initialResumeEditorState)
    })

    test('loadResumeEditorState returns initial state when stored data is invalid JSON', () => {
        window.localStorage.setItem(RESUME_STORAGE_KEY, '{ not valid json')

        const result = loadResumeEditorState()

        expect(result).toBe(initialResumeEditorState)
    })

    test('saveResumeEditorState writes JSON Resume document to localStorage', () => {
        const editorState: ResumeEditorState = createJaneEditorStateFixture()

        saveResumeEditorState(editorState)

        const stored = window.localStorage.getItem(RESUME_STORAGE_KEY)

        expect(stored).not.toBeNull()
        expect(stored).toContain('Jane Doe')
        expect(stored).toContain('Acme Corp')
        expect(stored).toContain('Algorithms')
    })

    test('loadResumeEditorState hydrates editor state from stored JSON Resume data', () => {
        const storedJsonResume = createJohnJsonResumeFixture()

        window.localStorage.setItem(RESUME_STORAGE_KEY, JSON.stringify(storedJsonResume))

        const result = loadResumeEditorState()

        expect(result.personalInfo).toMatchObject({
            name: 'John Smith',
            label: 'Software Engineer',
            email: 'john@example.com',
            phone: '+49 1234',
            url: 'https://john.dev',
            location: 'Munich, Germany',
            summary: 'Builds reliable systems.',
            github: 'https://github.com/john',
            linkedin: 'https://linkedin.com/in/john',
        })
        expect(result.workExperience[0]).toMatchObject({
            name: 'Example Inc',
            position: 'Developer',
            startDate: '2020',
            endDate: '2025',
            summary: 'Delivered customer-facing features.',
        })
        expect(result.workExperience[0].id).toEqual(expect.any(String))
        expect(result.education[0].courses).toEqual(['Distributed Systems'])
        expect(result.skills[0].keywords).toEqual(['Node.js', 'PostgreSQL'])
    })
})