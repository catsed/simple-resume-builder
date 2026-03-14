import { useCallback, useRef, type ChangeEvent } from 'react'
import type { ResumeEditorState } from '../../types/resume'
import { fromJsonResumeDocument, toJsonResumeDocument } from '../../utils/json/convertJsonResumeDocument'
import { downloadJsonResumeDocument, readJsonResumeDocumentFromFile } from '../../utils/json/jsonResumeFileIO'

type UseJsonResumeHandlersArgs = {
    editorState: ResumeEditorState
    replaceEditorState: (nextState: ResumeEditorState) => void
    onImportSuccess?: () => void
}

export function useJsonResumeHandlers({
    editorState,
    replaceEditorState,
    onImportSuccess,
}: UseJsonResumeHandlersArgs) {
    const importJsonInputRef = useRef<HTMLInputElement>(null)

    const handleExportJson = useCallback(() => {
        const jsonResume = toJsonResumeDocument(editorState)

        const fileNameBase = editorState.personalInfo.name
            ? editorState.personalInfo.name.toLowerCase().trim().replace(/\s+/g, '-')
            : 'resume'

        downloadJsonResumeDocument(jsonResume, fileNameBase)
    }, [editorState])

    const handleImportJsonClick = useCallback(() => {
        importJsonInputRef.current?.click()
    }, [])

    const handleImportJsonFile = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0]

        if (!selectedFile) {
            return
        }

        try {
            const parsedDocument = await readJsonResumeDocumentFromFile(selectedFile)
            const nextState = fromJsonResumeDocument(parsedDocument)
            replaceEditorState(nextState)
            onImportSuccess?.()
        } catch {
            window.alert('Could not import JSON. Please select a valid JSON Resume document.')
        } finally {
            event.target.value = ''
        }
    }, [onImportSuccess, replaceEditorState])

    return {
        importJsonInputRef,
        handleExportJson,
        handleImportJsonClick,
        handleImportJsonFile,
    }
}