import { act, renderHook } from '@testing-library/react'
import type { SkillEntry } from '../../../src/types/resume'
import { useSkillsState } from '../../../src/hooks/resumeEditor/useSkillsState'
import { createEmptySkillEntry } from '../../../src/utils/createEmptyStates'
import { createSkillItems } from '../../fixtures/resumeFixtures'

jest.mock('../../../src/utils/createEmptyStates', () => ({
    createEmptySkillEntry: jest.fn(),
}))

const mockedCreateEmptySkillEntry =
    createEmptySkillEntry as jest.MockedFunction<typeof createEmptySkillEntry>

describe('useSkillsState', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('initializes with provided skills', () => {
        const initialSkills = createSkillItems().slice(0, 2)

        const { result } = renderHook(() => useSkillsState(initialSkills))

        expect(result.current.skills).toEqual(initialSkills)
    })

    test('handleAddSkill appends a newly created entry', () => {
        const initialSkills = createSkillItems().slice(0, 1)
        const newSkill: SkillEntry = {
            id: 'skill-new',
            name: '',
            keywords: [],
        }

        mockedCreateEmptySkillEntry.mockReturnValue(newSkill)

        const { result } = renderHook(() => useSkillsState(initialSkills))

        act(() => {
            result.current.handleAddSkill()
        })

        expect(mockedCreateEmptySkillEntry).toHaveBeenCalledTimes(1)
        expect(result.current.skills).toEqual([...initialSkills, newSkill])
    })

    test('handleRemoveSkill removes only the matching item id', () => {
        const initialSkills = createSkillItems()
        const { result } = renderHook(() => useSkillsState(initialSkills))

        act(() => {
            result.current.handleRemoveSkill('skill-2')
        })

        expect(result.current.skills.map((item) => item.id)).toEqual(['skill-1', 'skill-3'])
    })

    test('handleSkillChange updates only the targeted item name', () => {
        const initialSkills = createSkillItems().slice(0, 2)
        const { result } = renderHook(() => useSkillsState(initialSkills))

        act(() => {
            result.current.handleSkillChange('skill-1', 'Architecture')
        })

        expect(result.current.skills[0]).toMatchObject({
            id: 'skill-1',
            name: 'Architecture',
            keywords: ['React', 'TypeScript'],
        })
        expect(result.current.skills[1]).toEqual(initialSkills[1])
    })

    test('handleSkillKeywordsChange splits multiline value into keywords', () => {
        const initialSkills = createSkillItems().slice(0, 1)
        const { result } = renderHook(() => useSkillsState(initialSkills))

        act(() => {
            result.current.handleSkillKeywordsChange('skill-1', 'GraphQL\nREST\nTesting')
        })

        expect(result.current.skills[0].keywords).toEqual(['GraphQL', 'REST', 'Testing'])
    })

    test('handleMoveSkill moves an item up', () => {
        const initialSkills = createSkillItems()
        const { result } = renderHook(() => useSkillsState(initialSkills))

        act(() => {
            result.current.handleMoveSkill('skill-2', 'up')
        })

        expect(result.current.skills.map((item) => item.id)).toEqual(['skill-2', 'skill-1', 'skill-3'])
    })

    test('handleMoveSkill keeps order unchanged when moving first item up', () => {
        const initialSkills = createSkillItems().slice(0, 2)
        const { result } = renderHook(() => useSkillsState(initialSkills))

        act(() => {
            result.current.handleMoveSkill('skill-1', 'up')
        })

        expect(result.current.skills.map((item) => item.id)).toEqual(['skill-1', 'skill-2'])
    })

    test('setSkillsState replaces the full skills array', () => {
        const initialSkills = createSkillItems().slice(0, 2)
        const replacementSkills = [createSkillItems()[2]]
        const { result } = renderHook(() => useSkillsState(initialSkills))

        act(() => {
            result.current.setSkillsState(replacementSkills)
        })

        expect(result.current.skills).toEqual(replacementSkills)
    })
})