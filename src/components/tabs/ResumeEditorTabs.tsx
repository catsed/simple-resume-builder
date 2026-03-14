import PersonalTab from './PersonalTab'
import WorkTab from './WorkTab'
import EducationTab from './EducationTab'
import SkillsTab from './SkillsTab'
import TabPicker from '../TabPicker'
import Button from '../common/Button'
import type { BasicsInfo, EducationEntry, SkillEntry, WorkExperience } from '../../types/resume'

type ResumeEditorTabsProps = {
    personalInfo: BasicsInfo
    workExperience: WorkExperience[]
    education: EducationEntry[]
    skills: SkillEntry[]
    onPersonalInfoChange: (field: keyof BasicsInfo, value: string) => void
    onAddWorkExperience: () => void
    onRemoveWorkExperience: (id: string) => void
    onWorkExperienceChange: (id: string, field: keyof Omit<WorkExperience, 'id'>, value: string) => void
    onMoveWorkExperience: (id: string, direction: 'up' | 'down') => void
    onAddEducation: () => void
    onRemoveEducation: (id: string) => void
    onEducationChange: (
        id: string,
        field: keyof Omit<EducationEntry, 'id' | 'courses'>,
        value: string,
    ) => void
    onEducationCoursesChange: (id: string, value: string) => void
    onMoveEducation: (id: string, direction: 'up' | 'down') => void
    onAddSkill: () => void
    onRemoveSkill: (id: string) => void
    onSkillChange: (id: string, name: string) => void
    onSkillKeywordsChange: (id: string, value: string) => void
    onMoveSkill: (id: string, direction: 'up' | 'down') => void
    onImportJson: () => void
    className?: string
}

export default function ResumeEditorTabs({
    personalInfo,
    workExperience,
    education,
    skills,
    onPersonalInfoChange,
    onAddWorkExperience,
    onRemoveWorkExperience,
    onWorkExperienceChange,
    onMoveWorkExperience,
    onAddEducation,
    onRemoveEducation,
    onEducationChange,
    onEducationCoursesChange,
    onMoveEducation,
    onAddSkill,
    onRemoveSkill,
    onSkillChange,
    onSkillKeywordsChange,
    onMoveSkill,
    onImportJson,
    className,
}: ResumeEditorTabsProps) {
    return (
        <TabPicker
            className={className}
            sidebarFooter={(
                <Button
                    onClick={onImportJson}
                    variant="accent"
                    className="w-full text-center"
                >
                    Import JSON
                </Button>
            )}
            tabs={[
                {
                    id: 'personal',
                    label: 'Personal Info',
                    content: (
                        <PersonalTab
                            personalInfo={personalInfo}
                            onChange={onPersonalInfoChange}
                        />
                    ),
                },
                {
                    id: 'experience',
                    label: 'Experience',
                    content: (
                        <WorkTab
                            workItems={workExperience}
                            onAddWorkItem={onAddWorkExperience}
                            onRemoveWorkItem={onRemoveWorkExperience}
                            onChangeWorkItem={onWorkExperienceChange}
                            onMoveWorkItem={onMoveWorkExperience}
                        />
                    ),
                },
                {
                    id: 'education',
                    label: 'Education',
                    content: (
                        <EducationTab
                            educationItems={education}
                            onAddEducationItem={onAddEducation}
                            onRemoveEducationItem={onRemoveEducation}
                            onChangeEducationItem={onEducationChange}
                            onChangeEducationCourses={onEducationCoursesChange}
                            onMoveEducationItem={onMoveEducation}
                        />
                    ),
                },
                {
                    id: 'skills',
                    label: 'Skills',
                    content: (
                        <SkillsTab
                            skills={skills}
                            onAddSkill={onAddSkill}
                            onRemoveSkill={onRemoveSkill}
                            onChangeSkill={onSkillChange}
                            onChangeSkillKeywords={onSkillKeywordsChange}
                            onMoveSkill={onMoveSkill}
                        />
                    ),
                },
            ]}
            initialTabId="personal"
        />
    )
}