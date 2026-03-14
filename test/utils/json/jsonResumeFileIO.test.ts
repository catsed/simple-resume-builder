import type { JsonResume } from '../../../src/types/resume'
import {
    downloadJsonResumeDocument,
    readJsonResumeDocumentFromFile,
} from '../../../src/utils/json/jsonResumeFileIO'
import { createJaneJsonResumeFixture } from '../../fixtures/resumeFixtures'

describe('jsonResumeFileIO', () => {
    beforeEach(() => {
        Object.defineProperty(URL, 'createObjectURL', {
            configurable: true,
            writable: true,
            value: jest.fn(),
        })

        Object.defineProperty(URL, 'revokeObjectURL', {
            configurable: true,
            writable: true,
            value: jest.fn(),
        })
    })

    test('downloadJsonResumeDocument creates, clicks, and revokes a download URL', () => {
        const jsonResume = createJaneJsonResumeFixture()
        const createObjectURLMock = URL.createObjectURL as jest.MockedFunction<typeof URL.createObjectURL>
        const revokeObjectURLMock = URL.revokeObjectURL as jest.MockedFunction<typeof URL.revokeObjectURL>
        createObjectURLMock.mockReturnValue('blob:resume-url')

        const anchorElement = document.createElement('a')
        const clickMock = jest.fn()
        anchorElement.click = clickMock

        const createElementMock = jest
            .spyOn(document, 'createElement')
            .mockReturnValue(anchorElement)

        downloadJsonResumeDocument(jsonResume, 'jane-doe')

        expect(createObjectURLMock).toHaveBeenCalledTimes(1)
        expect(createObjectURLMock.mock.calls[0][0]).toBeInstanceOf(Blob)
        expect(createElementMock).toHaveBeenCalledWith('a')
        expect(anchorElement.href).toBe('blob:resume-url')
        expect(anchorElement.download).toBe('jane-doe.json')
        expect(clickMock).toHaveBeenCalledTimes(1)
        expect(revokeObjectURLMock).toHaveBeenCalledWith('blob:resume-url')
    })

    test('readJsonResumeDocumentFromFile parses valid JSON content', async () => {
        const jsonResume = createJaneJsonResumeFixture()
        const file = {
            text: jest.fn().mockResolvedValue(JSON.stringify(jsonResume)),
        } as unknown as File

        const parsed = await readJsonResumeDocumentFromFile(file)

        expect(parsed).toEqual(jsonResume)
    })

    test('readJsonResumeDocumentFromFile rejects when file content is invalid JSON', async () => {
        const file = {
            text: jest.fn().mockResolvedValue('{ invalid json'),
        } as unknown as File

        await expect(readJsonResumeDocumentFromFile(file)).rejects.toThrow(SyntaxError)
    })

    test('downloadJsonResumeDocument serializes with indentation', () => {
        const jsonResume: JsonResume = createJaneJsonResumeFixture()
        const createObjectURLMock = URL.createObjectURL as jest.MockedFunction<typeof URL.createObjectURL>
        createObjectURLMock.mockReturnValue('blob:resume-url')
        const anchorElement = document.createElement('a')
        jest.spyOn(document, 'createElement').mockReturnValue(anchorElement)
        const stringifySpy = jest.spyOn(JSON, 'stringify')

        downloadJsonResumeDocument(jsonResume, 'jane-doe')

        expect(stringifySpy).toHaveBeenCalledWith(jsonResume, null, 2)
    })
})