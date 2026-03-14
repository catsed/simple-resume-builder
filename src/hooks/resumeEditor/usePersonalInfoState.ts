import { useCallback, useState } from 'react'
import type { BasicsInfo } from '../../types/resume'

type UsePersonalInfoStateResult = {
    personalInfo: BasicsInfo
    handlePersonalInfoChange: (field: keyof BasicsInfo, value: string) => void
    setPersonalInfoState: (nextPersonalInfo: BasicsInfo) => void
}

export function usePersonalInfoState(initialPersonalInfo: BasicsInfo): UsePersonalInfoStateResult {
    const [personalInfo, setPersonalInfo] = useState(initialPersonalInfo)

    const handlePersonalInfoChange = useCallback((field: keyof BasicsInfo, value: string) => {
        setPersonalInfo((currentPersonalInfo) => ({
            ...currentPersonalInfo,
            [field]: value,
        }))
    }, [])

    return {
        personalInfo,
        handlePersonalInfoChange,
        setPersonalInfoState: setPersonalInfo,
    }
}