import { act, renderHook } from '@testing-library/react'
import { useResumeEditorState } from '../../../src/hooks/resumeEditor/useResumeEditorState'
import { loadResumeEditorState, saveResumeEditorState } from '../../../src/lib/resumeStorage'
import { createJaneEditorStateFixture, createJohnEditorStateFixture } from '../../fixtures/resumeFixtures'

jest.mock('../../../src/lib/resumeStorage', () => ({
    loadResumeEditorState: jest.fn(),
    saveResumeEditorState: jest.fn(),
}))

const mockedLoadResumeEditorState =
    loadResumeEditorState as jest.MockedFunction<typeof loadResumeEditorState>
const mockedSaveResumeEditorState =
    saveResumeEditorState as jest.MockedFunction<typeof saveResumeEditorState>

describe('useResumeEditorState', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        mockedLoadResumeEditorState.mockReturnValue(createJaneEditorStateFixture())
    })

    test('initializes from stored editor state and persists initial snapshot', () => {
        const initialState = createJaneEditorStateFixture()
        mockedLoadResumeEditorState.mockReturnValue(initialState)

        const { result } = renderHook(() => useResumeEditorState())

        expect(mockedLoadResumeEditorState).toHaveBeenCalledTimes(1)
        expect(result.current.personalInfo).toEqual(initialState.personalInfo)
        expect(result.current.workExperience).toEqual(initialState.workExperience)
        expect(result.current.education).toEqual(initialState.education)
        expect(result.current.skills).toEqual(initialState.skills)
        expect(mockedSaveResumeEditorState).toHaveBeenCalledWith(initialState)
    })

    test('does not reload editor state on rerender', () => {
        const { rerender } = renderHook(() => useResumeEditorState())

        rerender()

        expect(mockedLoadResumeEditorState).toHaveBeenCalledTimes(1)
    })

    test('handlePersonalInfoChange updates personal info and persists merged state', () => {
        const initialState = createJaneEditorStateFixture()
        mockedLoadResumeEditorState.mockReturnValue(initialState)

        const { result } = renderHook(() => useResumeEditorState())

        act(() => {
            result.current.handlePersonalInfoChange('name', 'Jane Austin')
        })

        expect(result.current.personalInfo.name).toBe('Jane Austin')
        expect(mockedSaveResumeEditorState).toHaveBeenLastCalledWith({
            ...initialState,
            personalInfo: {
                ...initialState.personalInfo,
                name: 'Jane Austin',
            },
        })
    })

    test('handleSkillKeywordsChange splits multiline values and persists updated skills', () => {
        const initialState = createJaneEditorStateFixture()
        mockedLoadResumeEditorState.mockReturnValue(initialState)

        const { result } = renderHook(() => useResumeEditorState())

        act(() => {
            result.current.handleSkillKeywordsChange('skill-1', 'GraphQL\nREST\nTesting')
        })

        expect(result.current.skills[0].keywords).toEqual(['GraphQL', 'REST', 'Testing'])
        expect(mockedSaveResumeEditorState).toHaveBeenLastCalledWith({
            ...initialState,
            skills: [
                {
                    ...initialState.skills[0],
                    keywords: ['GraphQL', 'REST', 'Testing'],
                },
            ],
        })
    })

    test('replaceEditorState replaces all sections and persists replacement', () => {
        const nextState = createJohnEditorStateFixture()

        const { result } = renderHook(() => useResumeEditorState())

        act(() => {
            result.current.replaceEditorState(nextState)
        })

        expect(result.current.personalInfo).toEqual(nextState.personalInfo)
        expect(result.current.workExperience).toEqual(nextState.workExperience)
        expect(result.current.education).toEqual(nextState.education)
        expect(result.current.skills).toEqual(nextState.skills)
        expect(mockedSaveResumeEditorState).toHaveBeenLastCalledWith(nextState)
    })
})