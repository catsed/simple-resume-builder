import {
    initialResumeEditorState,
    type JsonResume,
    type ResumeEditorState,
} from '../types/resume'
import { fromJsonResumeDocument, toJsonResumeDocument } from '../utils/json/convertJsonResumeDocument'

export const RESUME_STORAGE_KEY = 'resume-builder:json-resume'

export function loadResumeEditorState(): ResumeEditorState {
    if (typeof window === 'undefined') {
        return initialResumeEditorState
    }

    const rawDocument = window.localStorage.getItem(RESUME_STORAGE_KEY)
    if (!rawDocument) {
        return initialResumeEditorState
    }

    try {
        const parsedDocument = JSON.parse(rawDocument) as JsonResume
        return fromJsonResumeDocument(parsedDocument)
    } catch {
        return initialResumeEditorState
    }
}

export function saveResumeEditorState(state: ResumeEditorState) {
    if (typeof window === 'undefined') {
        return
    }

    const jsonResumeDocument = toJsonResumeDocument(state)
    window.localStorage.setItem(RESUME_STORAGE_KEY, JSON.stringify(jsonResumeDocument))
}