import { act, renderHook } from '@testing-library/react'
import type { WorkExperience } from '../../../src/types/resume'
import { useWorkExperienceState } from '../../../src/hooks/resumeEditor/useWorkExperienceState'
import { createEmptyWorkExperience } from '../../../src/utils/createEmptyStates'
import { createWorkItems } from '../../fixtures/resumeFixtures'

jest.mock('../../../src/utils/createEmptyStates', () => ({
    createEmptyWorkExperience: jest.fn(),
}))

const mockedCreateEmptyWorkExperience =
    createEmptyWorkExperience as jest.MockedFunction<typeof createEmptyWorkExperience>

describe('useWorkExperienceState', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('initializes with provided work experience', () => {
        const initialItems = createWorkItems().slice(0, 2)

        const { result } = renderHook(() => useWorkExperienceState(initialItems))

        expect(result.current.workExperience).toEqual(initialItems)
    })

    test('handleAddWorkExperience appends a newly created entry', () => {
        const initialItems = createWorkItems().slice(0, 1)
        const newItem: WorkExperience = {
            id: 'work-new',
            name: '',
            position: '',
            startDate: '',
            endDate: '',
            summary: '',
        }

        mockedCreateEmptyWorkExperience.mockReturnValue(newItem)

        const { result } = renderHook(() => useWorkExperienceState(initialItems))

        act(() => {
            result.current.handleAddWorkExperience()
        })

        expect(mockedCreateEmptyWorkExperience).toHaveBeenCalledTimes(1)
        expect(result.current.workExperience).toEqual([...initialItems, newItem])
    })

    test('handleRemoveWorkExperience removes only the matching item id', () => {
        const initialItems = createWorkItems()
        const { result } = renderHook(() => useWorkExperienceState(initialItems))

        act(() => {
            result.current.handleRemoveWorkExperience('work-2')
        })

        expect(result.current.workExperience.map((item) => item.id)).toEqual(['work-1', 'work-3'])
    })

    test('handleWorkExperienceChange updates only the targeted field and item', () => {
        const initialItems = createWorkItems().slice(0, 2)
        const { result } = renderHook(() => useWorkExperienceState(initialItems))

        act(() => {
            result.current.handleWorkExperienceChange('work-1', 'position', 'Staff Engineer')
        })

        expect(result.current.workExperience[0]).toMatchObject({
            id: 'work-1',
            position: 'Staff Engineer',
            name: 'Acme',
        })
        expect(result.current.workExperience[1]).toEqual(initialItems[1])
    })

    test('handleMoveWorkExperience moves an item up', () => {
        const initialItems = createWorkItems()
        const { result } = renderHook(() => useWorkExperienceState(initialItems))

        act(() => {
            result.current.handleMoveWorkExperience('work-2', 'up')
        })

        expect(result.current.workExperience.map((item) => item.id)).toEqual(['work-2', 'work-1', 'work-3'])
    })

    test('handleMoveWorkExperience keeps order unchanged when moving first item up', () => {
        const initialItems = createWorkItems().slice(0, 2)
        const { result } = renderHook(() => useWorkExperienceState(initialItems))

        act(() => {
            result.current.handleMoveWorkExperience('work-1', 'up')
        })

        expect(result.current.workExperience.map((item) => item.id)).toEqual(['work-1', 'work-2'])
    })

    test('setWorkExperienceState replaces the full array', () => {
        const initialItems = createWorkItems().slice(0, 2)
        const replacementItems = [createWorkItems()[2]]
        const { result } = renderHook(() => useWorkExperienceState(initialItems))

        act(() => {
            result.current.setWorkExperienceState(replacementItems)
        })

        expect(result.current.workExperience).toEqual(replacementItems)
    })
})