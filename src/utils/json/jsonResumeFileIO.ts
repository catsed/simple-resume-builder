import type { JsonResume } from '../../types/resume'

export function downloadJsonResumeDocument(jsonResume: JsonResume, fileNameBase: string) {
    const jsonBlob = new Blob([JSON.stringify(jsonResume, null, 2)], {
        type: 'application/json',
    })
    const downloadUrl = URL.createObjectURL(jsonBlob)
    const anchorElement = document.createElement('a')
    anchorElement.href = downloadUrl
    anchorElement.download = `${fileNameBase}.json`
    anchorElement.click()
    URL.revokeObjectURL(downloadUrl)
}

export async function readJsonResumeDocumentFromFile(file: File): Promise<JsonResume> {
    const fileText = await file.text()
    return JSON.parse(fileText) as JsonResume
}