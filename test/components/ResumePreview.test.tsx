import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import ResumePreview from '../../src/components/ResumePreview'
import { useResumePreviewScale } from '../../src/hooks/useResumePreviewScale'
import { createJaneEditorStateFixture } from '../fixtures/resumeFixtures'

jest.mock('../../src/hooks/useResumePreviewScale', () => ({
    useResumePreviewScale: jest.fn(),
}))

const mockedUseResumePreviewScale =
    useResumePreviewScale as jest.MockedFunction<typeof useResumePreviewScale>

describe('ResumePreview', () => {
    beforeEach(() => {
        mockedUseResumePreviewScale.mockReturnValue({
            viewportRef: { current: null },
            pageScale: 0.8,
            scaledPageWidth: 635.2,
            scaledPageHeight: 898.4,
        })
    })

    test('renders resume sections and applies preview scale styles', () => {
        const editorState = createJaneEditorStateFixture()
        const { container } = render(
            <ResumePreview
                personalInfo={editorState.personalInfo}
                workExperience={editorState.workExperience}
                education={editorState.education}
                skills={editorState.skills}
            />,
        )

        expect(screen.getByText('Jane Doe')).toBeInTheDocument()
        expect(screen.getByText('Work Experience')).toBeInTheDocument()
        expect(screen.getByText('Education')).toBeInTheDocument()
        expect(screen.getByText('Skills')).toBeInTheDocument()

        const page = container.querySelector('[data-resume-page="true"]') as HTMLElement
        const frame = page.parentElement as HTMLElement

        expect(frame).toHaveStyle({ width: '635.2px', height: '898.4px' })
        expect(page).toHaveStyle({ transform: 'scale(0.8)', transformOrigin: 'top left' })
    })

    test('forwards resume page element through ref', () => {
        const editorState = createJaneEditorStateFixture()
        const ref = createRef<HTMLElement>()

        render(
            <ResumePreview
                ref={ref}
                personalInfo={editorState.personalInfo}
                workExperience={editorState.workExperience}
                education={editorState.education}
                skills={editorState.skills}
            />,
        )

        expect(ref.current).not.toBeNull()
        expect(ref.current?.getAttribute('data-resume-page')).toBe('true')
    })

    test('uses name and profile fallbacks when personal fields are missing', () => {
        const editorState = createJaneEditorStateFixture()

        render(
            <ResumePreview
                personalInfo={{
                    ...editorState.personalInfo,
                    name: '',
                    label: '',
                    email: '',
                    phone: '',
                    location: '',
                    summary: 'Summary text',
                }}
                workExperience={[]}
                education={[]}
                skills={[]}
            />,
        )

        expect(screen.getByText('Your Name')).toBeInTheDocument()
        expect(screen.getByText('Profile')).toBeInTheDocument()
        expect(screen.queryByText('jane@example.com')).not.toBeInTheDocument()
    })

    test('renders multiline work summaries and normalized skill keywords', () => {
        const editorState = createJaneEditorStateFixture()

        render(
            <ResumePreview
                personalInfo={{
                    ...editorState.personalInfo,
                    summary: '',
                }}
                workExperience={[
                    {
                        id: 'work-1',
                        name: 'Acme',
                        position: 'Engineer',
                        startDate: '2020',
                        endDate: '2024',
                        summary: 'Built feature A\nImproved performance',
                    },
                ]}
                education={[
                    {
                        id: 'edu-1',
                        institution: 'State University',
                        area: '',
                        studyType: '',
                        startDate: '2018',
                        endDate: '2022',
                        score: '',
                        courses: ['  Systems Design  ', '', 'Distributed Systems'],
                    },
                ]}
                skills={[
                    {
                        id: 'skill-hidden',
                        name: '',
                        keywords: ['   ', ''],
                    },
                    {
                        id: 'skill-1',
                        name: 'Backend',
                        keywords: [' Node.js ', ''],
                    },
                ]}
            />,
        )

        expect(screen.getByText('Built feature A')).toBeInTheDocument()
        expect(screen.getByText('Improved performance')).toBeInTheDocument()
        expect(screen.getByText('? in ?')).toBeInTheDocument()
        expect(screen.getByText('Systems Design')).toBeInTheDocument()
        expect(screen.getByText('Distributed Systems')).toBeInTheDocument()
        expect(screen.getByText('Backend:')).toBeInTheDocument()
        expect(screen.getByText('Node.js')).toBeInTheDocument()
        expect(screen.queryByText('Skill:')).not.toBeInTheDocument()
    })
})