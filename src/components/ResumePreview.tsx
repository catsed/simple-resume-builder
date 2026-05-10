import { PDFViewer } from "@react-pdf/renderer"
import { useState, useEffect, memo } from "react"
import type { BasicsInfo, EducationEntry, ProjectEntry, SkillEntry, WorkExperience } from "../types/resume"
import { ResumePDF } from "./ResumePDF"

type ResumePreviewProps = {
    personalInfo: BasicsInfo
    workExperience: WorkExperience[]
    projects: ProjectEntry[]
    education: EducationEntry[]
    skills: SkillEntry[]
}

const StablePDFViewer = memo(function StablePDFViewer({ personalInfo, workExperience, projects, education, skills }: ResumePreviewProps) {
    return (
        <PDFViewer style={{ flex: 1, minHeight: 0, width: "100%", border: "none" }}>
            <ResumePDF
                personalInfo={personalInfo}
                workExperience={workExperience}
                projects={projects}
                education={education}
                skills={skills}
            />
        </PDFViewer>
    )
})

export default function ResumePreview({ personalInfo, workExperience, projects, education, skills }: ResumePreviewProps) {
    const [debounced, setDebounced] = useState({ personalInfo, workExperience, projects, education, skills })

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounced({ personalInfo, workExperience, projects, education, skills })
        }, 1000)
        return () => clearTimeout(timer)
    }, [personalInfo, workExperience, projects, education, skills])

    return (
        <StablePDFViewer
            personalInfo={debounced.personalInfo}
            workExperience={debounced.workExperience}
            projects={debounced.projects}
            education={debounced.education}
            skills={debounced.skills}
        />
    )
}
