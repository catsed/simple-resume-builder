import { forwardRef } from 'react'
import { MdEmail, MdLocationPin, MdPhone } from 'react-icons/md'
import type { BasicsInfo, EducationEntry, SkillEntry, WorkExperience } from '../types/resume'
import { FaGithub, FaGlobe, FaLinkedin } from 'react-icons/fa'
import { useResumePreviewScale } from '../hooks/useResumePreviewScale'

type ResumePreviewProps = {
    personalInfo: BasicsInfo
    workExperience: WorkExperience[]
    education: EducationEntry[]
    skills: SkillEntry[]
}

function renderContactLine(personalInfo: BasicsInfo) {
    const contactItems = [
        { icon: <MdEmail />, value: personalInfo.email },
        { icon: <MdPhone />, value: personalInfo.phone },
        { icon: <MdLocationPin />, value: personalInfo.location },
    ].filter((item) => Boolean(item.value))

    return (
        <div className="resume-contact-list text-sm text-slate-600">
            {contactItems.map((item, index) => (
                <div className="resume-inline-icon flex items-center" key={index}>
                    {item.icon}
                    <span>{item.value}</span>
                </div>
            ))}
        </div>
    )
}

function renderProfilesLine(personalInfo: BasicsInfo) {
    const profiles = [
        { icon: <FaGlobe />, value: personalInfo.url },
        { icon: <FaLinkedin />, value: personalInfo.linkedin },
        { icon: <FaGithub />, value: personalInfo.github },
    ].filter((profile) => Boolean(profile.value))

    return (
        <div className="resume-profiles flex flex-col items-end">
            {profiles.map((profile, index) => (
                <div key={index} className="resume-inline-icon flex items-center">
                    {profile.icon}
                    <span>{profile.value}</span>
                </div>
            ))}
        </div>
    )
}

function renderWorkSummary(summary: string) {
    const lines = summary.split('\n').filter(Boolean)

    if (lines.length === 1) {
        return <p className="resume-body-copy whitespace-pre-line text-[14px] text-slate-700">{summary}</p>
    }

    return (
        <ul className="resume-bullet-list list-disc text-[14px] text-slate-700">
            {lines.map((line, index) => (
                <li key={index}>{line}</li>
            ))}
        </ul>
    )
}

function renderEducationCourses(courses: string[]) {
    const normalizedCourses = courses
        .map((course) => course.trim())
        .filter(Boolean)

    if (normalizedCourses.length === 1) {
        return <p className="resume-body-copy whitespace-pre-line text-[14px] text-slate-700">{normalizedCourses[0]}</p>
    }

    if (normalizedCourses.length > 1) {
        return (
            <ul className="resume-bullet-list list-disc text-[14px] text-slate-700">
                {normalizedCourses.map((course, index) => (
                    <li key={index}>{course}</li>
                ))}
            </ul>
        )
    }

    return null
}

function renderStudyTypeArea(studyType: string, area: string) {
    if (studyType && area) {
        return `${studyType} in ${area}`
    }

    return studyType || area || '? in ?'
}

const ResumePreview = forwardRef<HTMLElement, ResumePreviewProps>(function ResumePreview(
    { personalInfo, workExperience, education, skills },
    ref,
) {
    const {
        viewportRef,
        pageScale,
        scaledPageWidth,
        scaledPageHeight,
    } = useResumePreviewScale()

    const visibleSkills = skills
        .map((skill) => ({
            ...skill,
            keywords: skill.keywords.map((keyword) => keyword.trim()).filter(Boolean),
        }))
        .filter((skill) => [skill.name, ...skill.keywords].some(Boolean))

    const setResumePageRef = (node: HTMLElement | null) => {
        if (typeof ref === 'function') {
            ref(node)
            return
        }

        if (ref) {
            ref.current = node
        }
    }

    return (
        <div
            ref={viewportRef}
            className="flex flex-1 min-h-0 min-w-0 items-start justify-center overflow-y-auto overflow-x-hidden bg-slate-800 p-4 md:p-6"
        >
            <div
                className="shrink-0 overflow-hidden"
                style={{
                    width: `${scaledPageWidth}px`,
                    height: `${scaledPageHeight}px`,
                }}
            >
                <article
                    ref={setResumePageRef}
                    data-resume-page="true"
                    className="resume-page overflow-hidden bg-white text-slate-900"
                    style={{
                        transform: `scale(${pageScale})`,
                        transformOrigin: 'top left',
                    }}
                >
                    <div data-resume-content="true" className="h-full">
                        <header className="-mt-3 resume-header border-b border-slate-300 flex flex-row">
                            <div>
                                <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                                    {personalInfo.name || 'Your Name'}
                                </h1>
                                <div className="text-sm text-slate-600">
                                    {renderContactLine(personalInfo)}
                                </div>
                            </div>
                            <div className="mt-6 ml-auto text-sm text-slate-600">
                                {renderProfilesLine(personalInfo)}
                            </div>
                        </header>

                        {personalInfo.summary && (
                            <section className="resume-section">
                                <h2 className="text-xs font-bold text-slate-500 uppercase">
                                    {personalInfo.label || 'Profile'}
                                </h2>
                                <p className="resume-body-copy whitespace-pre-line text-[15px] text-slate-700">
                                    {personalInfo.summary}
                                </p>
                            </section>
                        )}

                        <section className="resume-section">
                            <h2 className="text-xs font-bold text-slate-500 uppercase">
                                Work Experience
                            </h2>

                            <div className="resume-entry-list">
                                {workExperience
                                    .filter((workItem) =>
                                        [
                                            workItem.name,
                                            workItem.position,
                                            workItem.startDate,
                                            workItem.endDate,
                                            workItem.summary,
                                        ].some(Boolean),
                                    )
                                    .map((workItem) => (
                                        <article key={workItem.id}>
                                            <div className="resume-entry-head">
                                                <p className="text-base font-semibold text-slate-900">
                                                    {workItem.position || 'Position'}
                                                </p>
                                                <p className="text-sm text-slate-600">
                                                    {workItem.name || 'Company'} | {workItem.startDate || 'Start'} - {workItem.endDate || 'End'}
                                                </p>
                                            </div>

                                            {workItem.summary ? renderWorkSummary(workItem.summary) : null}
                                        </article>
                                    ))}
                            </div>
                        </section>

                        <section className="resume-section">
                            <h2 className="text-xs font-bold text-slate-500 uppercase">
                                Education
                            </h2>

                            <div className="resume-entry-list">
                                {education
                                    .filter((educationItem) =>
                                        [
                                            educationItem.institution,
                                            educationItem.studyType,
                                            educationItem.area,
                                            educationItem.startDate,
                                            educationItem.endDate,
                                            educationItem.score,
                                            ...educationItem.courses,
                                        ].some(Boolean),
                                    )
                                    .map((educationItem) => (
                                        <article key={educationItem.id}>
                                            <div className="resume-entry-head">
                                                <p className="text-base font-semibold text-slate-900">
                                                    {renderStudyTypeArea(educationItem.studyType, educationItem.area)}
                                                </p>
                                                <p className="text-sm text-slate-600">
                                                    {educationItem.institution || 'Institution'} | {educationItem.startDate || 'Start'} - {educationItem.endDate || 'End'}
                                                </p>
                                            </div>

                                            {educationItem.score ? (
                                                <p className="resume-meta-note text-[13px] text-slate-600">
                                                    GPA: {educationItem.score}
                                                </p>
                                            ) : null}

                                            {renderEducationCourses(educationItem.courses)}
                                        </article>
                                    ))}
                            </div>
                        </section>

                        <section className="resume-section">
                            <h2 className="text-xs font-bold text-slate-500 uppercase">
                                Skills
                            </h2>

                            <div className="resume-skills-grid grid grid-cols-[max-content_1fr] text-[14px] text-slate-700">
                                {visibleSkills.map((skill) => (
                                    <div key={skill.id} className="contents">
                                        <p className="pr-1 font-semibold text-slate-900 whitespace-nowrap">
                                            {skill.name || 'Skill'}:
                                        </p>
                                        <p className="wrap-break-word">
                                            {skill.keywords.join(', ') || ''}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <div className="resume-footer-note text-xs text-slate-500 italic">Created using simple-resume-builder! Find the source code at: https://github.com/catsed/simple-resume-builder</div>
                    </div>
                </article>
            </div>
        </div>
    )
})

export default ResumePreview