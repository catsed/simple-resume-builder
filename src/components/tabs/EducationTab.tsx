import EditorItemCard from '../editor/EditorItemCard'
import EditorSectionHeader from '../editor/EditorSectionHeader'
import TextareaInput from '../common/TextareaInput'
import TextInput from '../common/TextInput'
import type { EducationEntry } from '../../types/resume'

type EducationTabProps = {
    educationItems: EducationEntry[]
    onAddEducationItem: () => void
    onRemoveEducationItem: (id: string) => void
    onChangeEducationItem: (
        id: string,
        field: keyof Omit<EducationEntry, 'id' | 'courses'>,
        value: string,
    ) => void
    onChangeEducationCourses: (id: string, value: string) => void
    onMoveEducationItem: (id: string, direction: 'up' | 'down') => void
}

export default function EducationTab({
    educationItems,
    onAddEducationItem,
    onRemoveEducationItem,
    onChangeEducationItem,
    onChangeEducationCourses,
    onMoveEducationItem,
}: EducationTabProps) {
    return (
        <div className="space-y-4 pb-4">
            <EditorSectionHeader title="Education" actionLabel="Add Education" onAction={onAddEducationItem} />

            <div className="space-y-5">
                {educationItems.map((educationItem, index) => (
                    <EditorItemCard
                        key={educationItem.id}
                        title={`Education ${educationItem.institution ? `at ${educationItem.institution}` : `#${index + 1}`}`}
                        canMoveUp={index > 0}
                        canMoveDown={index < educationItems.length - 1}
                        onMoveUp={() => onMoveEducationItem(educationItem.id, 'up')}
                        onMoveDown={() => onMoveEducationItem(educationItem.id, 'down')}
                        onRemove={() => onRemoveEducationItem(educationItem.id)}
                    >
                        <div className="grid gap-4 lg:grid-cols-2">
                            <TextInput
                                label="Institution"
                                value={educationItem.institution}
                                onChange={(event) => onChangeEducationItem(educationItem.id, 'institution', event.target.value)}
                                name={`education-institution-${educationItem.id}`}
                                placeholder="University"
                            />
                            <TextInput
                                label="Study Type"
                                value={educationItem.studyType}
                                onChange={(event) => onChangeEducationItem(educationItem.id, 'studyType', event.target.value)}
                                name={`education-study-type-${educationItem.id}`}
                                placeholder="Bachelor"
                            />
                            <TextInput
                                label="Area"
                                value={educationItem.area}
                                onChange={(event) => onChangeEducationItem(educationItem.id, 'area', event.target.value)}
                                name={`education-area-${educationItem.id}`}
                                placeholder="Software Development"
                            />
                            <TextInput
                                label="GPA"
                                value={educationItem.score}
                                onChange={(event) => onChangeEducationItem(educationItem.id, 'score', event.target.value)}
                                name={`education-gpa-${educationItem.id}`}
                                placeholder="4.0"
                            />
                            <TextInput
                                label="Start Date"
                                value={educationItem.startDate}
                                onChange={(event) => onChangeEducationItem(educationItem.id, 'startDate', event.target.value)}
                                name={`education-start-${educationItem.id}`}
                                placeholder="e.g. 2021 or more detailed"
                            />
                            <TextInput
                                label="End Date"
                                value={educationItem.endDate}
                                onChange={(event) => onChangeEducationItem(educationItem.id, 'endDate', event.target.value)}
                                name={`education-end-${educationItem.id}`}
                                placeholder="e.g. 2025 or more detailed"
                            />
                        </div>

                        <TextareaInput
                            label="Summary"
                            value={educationItem.courses.join('\n')}
                            onChange={(event) => onChangeEducationCourses(educationItem.id, event.target.value)}
                            name={`education-summary-${educationItem.id}`}
                            rows={4}
                            placeholder="Summary of education, courses, achievements, etc."
                        />
                    </EditorItemCard>
                ))}
            </div>
        </div>
    )
}