import './App.css'
import { useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import Header from './components/Header'
import InfoCard from './components/InfoCard'
import ResumePreview from './components/ResumePreview'
import ResumeEditorTabs from './components/tabs/ResumeEditorTabs'
import { useResumeEditorState } from './hooks/resumeEditor/useResumeEditorState'
import Button from './components/common/Button'
import { useJsonResumeHandlers } from './hooks/resumeEditor/useJsonResumeHandlers'

function App() {
    const [mobileView, setMobileView] = useState<'form' | 'preview'>('form')
    const [isInfoCardOpen, setIsInfoCardOpen] = useState(false)

    const {
        personalInfo,
        workExperience,
        education,
        skills,
        handlePersonalInfoChange,
        handleAddWorkExperience,
        handleRemoveWorkExperience,
        handleWorkExperienceChange,
        handleMoveWorkExperience,
        handleAddEducation,
        handleRemoveEducation,
        handleEducationChange,
        handleEducationCoursesChange,
        handleMoveEducation,
        handleAddSkill,
        handleRemoveSkill,
        handleSkillChange,
        handleSkillKeywordsChange,
        handleMoveSkill,
        replaceEditorState,
    } = useResumeEditorState()

    const resumePreviewRef = useRef<HTMLElement>(null)

    const {
        importJsonInputRef,
        handleExportJson,
        handleImportJsonClick,
        handleImportJsonFile,
    } = useJsonResumeHandlers({
        editorState: {
            personalInfo,
            workExperience,
            education,
            skills,
        },
        replaceEditorState,
        onImportSuccess: () => setMobileView('form'),
    })

    const handleExportPdf = useReactToPrint({
        contentRef: resumePreviewRef,
        documentTitle: personalInfo.name ? `${personalInfo.name}'s resume` : 'resume',
        pageStyle: `
            @page {
                size: A4;
                margin: 0;
            }

            html,
            body {
                margin: 0;
                padding: 0;
            }
        `,
    })

    return (
        <main className="flex h-dvh overflow-hidden bg-slate-800 text-white">
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
                <Header onInfoClick={() => setIsInfoCardOpen(true)} />
                <input
                    ref={importJsonInputRef}
                    type="file"
                    accept="application/json,.json"
                    className="hidden"
                    onChange={handleImportJsonFile}
                />

                <div className="flex shrink-0 gap-2 border-b border-slate-700 p-2 md:hidden">
                    <Button
                        onClick={() => setMobileView('form')}
                        variant={mobileView === 'form' ? 'tab-active' : 'tab'}
                        className="flex-1 text-center"
                    >
                        Form
                    </Button>
                    <Button
                        onClick={() => setMobileView('preview')}
                        variant={mobileView === 'preview' ? 'tab-active' : 'tab'}
                        className="flex-1 text-center"
                    >
                        Preview
                    </Button>
                </div>

                <div className="flex min-h-0 flex-1 flex-col overflow-hidden md:flex-row">
                    <section className={`${mobileView === 'form' ? 'flex' : 'hidden'} min-h-0 min-w-0 md:min-w-1/2 flex-1 basis-1/2 overflow-hidden border-b border-slate-700 md:flex md:basis-auto md:border-r md:border-b-0`}>
                        <ResumeEditorTabs
                            className="flex-1 min-h-0 overflow-hidden"
                            personalInfo={personalInfo}
                            workExperience={workExperience}
                            education={education}
                            skills={skills}
                            onPersonalInfoChange={handlePersonalInfoChange}
                            onAddWorkExperience={handleAddWorkExperience}
                            onRemoveWorkExperience={handleRemoveWorkExperience}
                            onWorkExperienceChange={handleWorkExperienceChange}
                            onMoveWorkExperience={handleMoveWorkExperience}
                            onAddEducation={handleAddEducation}
                            onRemoveEducation={handleRemoveEducation}
                            onEducationChange={handleEducationChange}
                            onEducationCoursesChange={handleEducationCoursesChange}
                            onMoveEducation={handleMoveEducation}
                            onAddSkill={handleAddSkill}
                            onRemoveSkill={handleRemoveSkill}
                            onSkillChange={handleSkillChange}
                            onSkillKeywordsChange={handleSkillKeywordsChange}
                            onMoveSkill={handleMoveSkill}
                            onImportJson={handleImportJsonClick}
                        />
                    </section>

                    <section className={`${mobileView === 'preview' ? 'flex' : 'hidden'} min-h-0 min-w-0 md:min-w-1/2 flex-1 basis-1/2 flex-col overflow-hidden md:flex md:basis-auto`}>
                        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-slate-700 p-4">
                            <div className="flex flex-wrap items-center gap-2">
                                <Button
                                    onClick={handleExportPdf}
                                    variant="accent"
                                >
                                    Export PDF
                                </Button>
                                <Button
                                    onClick={handleExportJson}
                                    variant="accent"
                                >
                                    Export JSON
                                </Button>
                            </div>
                            <span className="text-xs italic text-slate-300">
                                Note that preview might not be 100% accurate to export.
                            </span>
                        </div>
                        <ResumePreview
                            ref={resumePreviewRef}
                            personalInfo={personalInfo}
                            workExperience={workExperience}
                            education={education}
                            skills={skills}
                        />
                    </section>
                </div>

                {isInfoCardOpen ? (
                    <div className="absolute inset-0 z-50 flex items-start justify-center bg-slate-950/50 p-4 pt-20 md:items-center md:pt-4">
                        <button
                            type="button"
                            className="absolute inset-0"
                            aria-label="Close information popup"
                            onClick={() => setIsInfoCardOpen(false)}
                        />
                        <div className="relative z-10">
                            <InfoCard onClose={() => setIsInfoCardOpen(false)} />
                        </div>
                    </div>
                ) : null}
            </div>
        </main>
    )
}

export default App
