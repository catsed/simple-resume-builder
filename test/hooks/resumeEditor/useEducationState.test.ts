import { act, renderHook } from '@testing-library/react'
import type { EducationEntry } from '../../../src/types/resume'
import { useEducationState } from '../../../src/hooks/resumeEditor/useEducationState'
import { createEmptyEducationEntry } from '../../../src/utils/createEmptyStates'
import { createEducationItems } from '../../fixtures/resumeFixtures'

jest.mock('../../../src/utils/createEmptyStates', () => ({
    createEmptyEducationEntry: jest.fn(),
}))

const mockedCreateEmptyEducationEntry =
    createEmptyEducationEntry as jest.MockedFunction<typeof createEmptyEducationEntry>

describe('useEducationState', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('initializes with provided education items', () => {
        const initialItems = createEducationItems().slice(0, 2)

        const { result } = renderHook(() => useEducationState(initialItems))

        expect(result.current.education).toEqual(initialItems)
    })

    test('handleAddEducation appends a newly created entry', () => {
        const initialItems = createEducationItems().slice(0, 1)
        const newItem: EducationEntry = {
            id: 'edu-new',
            institution: '',
            area: '',
            studyType: '',
            startDate: '',
            endDate: '',
            score: '',
            courses: [],
        }

        mockedCreateEmptyEducationEntry.mockReturnValue(newItem)

        const { result } = renderHook(() => useEducationState(initialItems))

        act(() => {
            result.current.handleAddEducation()
        })

        expect(mockedCreateEmptyEducationEntry).toHaveBeenCalledTimes(1)
        expect(result.current.education).toEqual([...initialItems, newItem])
    })

    test('handleRemoveEducation removes only the matching item id', () => {
        const initialItems = createEducationItems()
        const { result } = renderHook(() => useEducationState(initialItems))

        act(() => {
            result.current.handleRemoveEducation('edu-2')
        })

        expect(result.current.education.map((item) => item.id)).toEqual(['edu-1', 'edu-3'])
    })

    test('handleEducationChange updates only the targeted field and item', () => {
        const initialItems = createEducationItems().slice(0, 2)
        const { result } = renderHook(() => useEducationState(initialItems))

        act(() => {
            result.current.handleEducationChange('edu-1', 'area', 'Data Science')
        })

        expect(result.current.education[0]).toMatchObject({
            id: 'edu-1',
            area: 'Data Science',
            institution: 'Tech University',
        })
        expect(result.current.education[1]).toEqual(initialItems[1])
    })

    test('handleEducationCoursesChange splits multiline value into course entries', () => {
        const initialItems = createEducationItems().slice(0, 1)
        const { result } = renderHook(() => useEducationState(initialItems))

        act(() => {
            result.current.handleEducationCoursesChange('edu-1', 'Course A\nCourse B\nCourse C')
        })

        expect(result.current.education[0].courses).toEqual(['Course A', 'Course B', 'Course C'])
    })

    test('handleMoveEducation moves an item down', () => {
        const initialItems = createEducationItems()
        const { result } = renderHook(() => useEducationState(initialItems))

        act(() => {
            result.current.handleMoveEducation('edu-2', 'down')
        })

        expect(result.current.education.map((item) => item.id)).toEqual(['edu-1', 'edu-3', 'edu-2'])
    })

    test('handleMoveEducation keeps order unchanged when moving first item up', () => {
        const initialItems = createEducationItems().slice(0, 2)
        const { result } = renderHook(() => useEducationState(initialItems))

        act(() => {
            result.current.handleMoveEducation('edu-1', 'up')
        })

        expect(result.current.education.map((item) => item.id)).toEqual(['edu-1', 'edu-2'])
    })

    test('setEducationState replaces the full education array', () => {
        const initialItems = createEducationItems().slice(0, 2)
        const replacementItems = [createEducationItems()[2]]
        const { result } = renderHook(() => useEducationState(initialItems))

        act(() => {
            result.current.setEducationState(replacementItems)
        })

        expect(result.current.education).toEqual(replacementItems)
    })
})