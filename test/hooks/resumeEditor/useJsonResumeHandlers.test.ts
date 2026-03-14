import { act, renderHook } from '@testing-library/react'
import type { ResumeEditorState } from '../../../src/types/resume'
import { useJsonResumeHandlers } from '../../../src/hooks/resumeEditor/useJsonResumeHandlers'
import { createJaneEditorStateFixture, createJaneJsonResumeFixture } from '../../fixtures/resumeFixtures'
import {
    fromJsonResumeDocument,
    toJsonResumeDocument,
} from '../../../src/utils/json/convertJsonResumeDocument'
import {
    downloadJsonResumeDocument,
    readJsonResumeDocumentFromFile,
} from '../../../src/utils/json/jsonResumeFileIO'

jest.mock('../../../src/utils/json/convertJsonResumeDocument', () => ({
    fromJsonResumeDocument: jest.fn(),
    toJsonResumeDocument: jest.fn(),
}))

jest.mock('../../../src/utils/json/jsonResumeFileIO', () => ({
    downloadJsonResumeDocument: jest.fn(),
    readJsonResumeDocumentFromFile: jest.fn(),
}))

const mockedToJsonResumeDocument = toJsonResumeDocument as jest.MockedFunction<typeof toJsonResumeDocument>
const mockedFromJsonResumeDocument = fromJsonResumeDocument as jest.MockedFunction<typeof fromJsonResumeDocument>
const mockedDownloadJsonResumeDocument = downloadJsonResumeDocument as jest.MockedFunction<typeof downloadJsonResumeDocument>
const mockedReadJsonResumeDocumentFromFile = readJsonResumeDocumentFromFile as jest.MockedFunction<typeof readJsonResumeDocumentFromFile>

describe('useJsonResumeHandlers', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('handleExportJson converts editor state and downloads JSON with slugified file name', () => {
        const editorState = createJaneEditorStateFixture()
        const jsonResume = createJaneJsonResumeFixture()
        mockedToJsonResumeDocument.mockReturnValue(jsonResume)

        const { result } = renderHook(() =>
            useJsonResumeHandlers({
                editorState,
                replaceEditorState: jest.fn(),
            }),
        )

        act(() => {
            result.current.handleExportJson()
        })

        expect(mockedToJsonResumeDocument).toHaveBeenCalledWith(editorState)
        expect(mockedDownloadJsonResumeDocument).toHaveBeenCalledWith(jsonResume, 'jane-doe')
    })

    test('handleExportJson uses default file name when personal name is empty', () => {
        const editorState = createJaneEditorStateFixture()
        editorState.personalInfo.name = ''
        const jsonResume = createJaneJsonResumeFixture()
        mockedToJsonResumeDocument.mockReturnValue(jsonResume)

        const { result } = renderHook(() =>
            useJsonResumeHandlers({
                editorState,
                replaceEditorState: jest.fn(),
            }),
        )

        act(() => {
            result.current.handleExportJson()
        })

        expect(mockedDownloadJsonResumeDocument).toHaveBeenCalledWith(jsonResume, 'resume')
    })

    test('handleImportJsonClick triggers hidden file input click', () => {
        const { result } = renderHook(() =>
            useJsonResumeHandlers({
                editorState: createJaneEditorStateFixture(),
                replaceEditorState: jest.fn(),
            }),
        )

        const clickMock = jest.fn()

        act(() => {
            result.current.importJsonInputRef.current = { click: clickMock } as unknown as HTMLInputElement
            result.current.handleImportJsonClick()
        })

        expect(clickMock).toHaveBeenCalledTimes(1)
    })

    test('handleImportJsonFile parses and applies imported state, then resets file input value', async () => {
        const editorState = createJaneEditorStateFixture()
        const parsedJsonResume = createJaneJsonResumeFixture()
        const nextState: ResumeEditorState = createJaneEditorStateFixture()
        const replaceEditorState = jest.fn()
        const onImportSuccess = jest.fn()
        const file = new File(['{}'], 'resume.json', { type: 'application/json' })

        mockedReadJsonResumeDocumentFromFile.mockResolvedValue(parsedJsonResume)
        mockedFromJsonResumeDocument.mockReturnValue(nextState)

        const { result } = renderHook(() =>
            useJsonResumeHandlers({
                editorState,
                replaceEditorState,
                onImportSuccess,
            }),
        )

        const event = {
            target: {
                files: [file],
                value: 'resume.json',
            },
        } as unknown as React.ChangeEvent<HTMLInputElement>

        await act(async () => {
            await result.current.handleImportJsonFile(event)
        })

        expect(mockedReadJsonResumeDocumentFromFile).toHaveBeenCalledWith(file)
        expect(mockedFromJsonResumeDocument).toHaveBeenCalledWith(parsedJsonResume)
        expect(replaceEditorState).toHaveBeenCalledWith(nextState)
        expect(onImportSuccess).toHaveBeenCalledTimes(1)
        expect(event.target.value).toBe('')
    })

    test('handleImportJsonFile shows alert on failure and still resets file input value', async () => {
        const replaceEditorState = jest.fn()
        const onImportSuccess = jest.fn()
        const file = new File(['{}'], 'resume.json', { type: 'application/json' })
        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => { })

        mockedReadJsonResumeDocumentFromFile.mockRejectedValue(new Error('invalid file'))

        const { result } = renderHook(() =>
            useJsonResumeHandlers({
                editorState: createJaneEditorStateFixture(),
                replaceEditorState,
                onImportSuccess,
            }),
        )

        const event = {
            target: {
                files: [file],
                value: 'resume.json',
            },
        } as unknown as React.ChangeEvent<HTMLInputElement>

        await act(async () => {
            await result.current.handleImportJsonFile(event)
        })

        expect(alertSpy).toHaveBeenCalledWith(
            'Could not import JSON. Please select a valid JSON Resume document.',
        )
        expect(replaceEditorState).not.toHaveBeenCalled()
        expect(onImportSuccess).not.toHaveBeenCalled()
        expect(event.target.value).toBe('')

        alertSpy.mockRestore()
    })

    test('handleImportJsonFile exits early when no file is selected', async () => {
        const replaceEditorState = jest.fn()

        const { result } = renderHook(() =>
            useJsonResumeHandlers({
                editorState: createJaneEditorStateFixture(),
                replaceEditorState,
            }),
        )

        const event = {
            target: {
                files: [],
                value: '',
            },
        } as unknown as React.ChangeEvent<HTMLInputElement>

        await act(async () => {
            await result.current.handleImportJsonFile(event)
        })

        expect(mockedReadJsonResumeDocumentFromFile).not.toHaveBeenCalled()
        expect(mockedFromJsonResumeDocument).not.toHaveBeenCalled()
        expect(replaceEditorState).not.toHaveBeenCalled()
    })
})