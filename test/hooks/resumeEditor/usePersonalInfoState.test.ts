import { act, renderHook } from '@testing-library/react'
import type { BasicsInfo } from '../../../src/types/resume'
import { usePersonalInfoState } from '../../../src/hooks/resumeEditor/usePersonalInfoState'
import { createJaneEditorStateFixture } from '../../fixtures/resumeFixtures'

describe('usePersonalInfoState', () => {
    test('initializes with provided personal info', () => {
        const initialPersonalInfo = createJaneEditorStateFixture().personalInfo

        const { result } = renderHook(() => usePersonalInfoState(initialPersonalInfo))

        expect(result.current.personalInfo).toEqual(initialPersonalInfo)
    })

    test('handlePersonalInfoChange updates only the targeted field', () => {
        const initialPersonalInfo = createJaneEditorStateFixture().personalInfo
        const { result } = renderHook(() => usePersonalInfoState(initialPersonalInfo))

        act(() => {
            result.current.handlePersonalInfoChange('label', 'Staff Frontend Engineer')
        })

        expect(result.current.personalInfo).toMatchObject({
            label: 'Staff Frontend Engineer',
            name: initialPersonalInfo.name,
            email: initialPersonalInfo.email,
        })
    })

    test('setPersonalInfoState replaces the whole personal info object', () => {
        const initialPersonalInfo = createJaneEditorStateFixture().personalInfo
        const replacementPersonalInfo: BasicsInfo = {
            name: 'John Smith',
            label: 'Backend Engineer',
            email: 'john@example.com',
            phone: '+49 1234',
            url: 'https://john.dev',
            location: 'Munich, Germany',
            summary: 'Designs resilient backend services.',
            github: 'https://github.com/john',
            linkedin: 'https://linkedin.com/in/john',
        }

        const { result } = renderHook(() => usePersonalInfoState(initialPersonalInfo))

        act(() => {
            result.current.setPersonalInfoState(replacementPersonalInfo)
        })

        expect(result.current.personalInfo).toEqual(replacementPersonalInfo)
    })
})