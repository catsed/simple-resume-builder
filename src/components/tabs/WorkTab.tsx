import TextareaInput from '../common/TextareaInput'
import TextInput from '../common/TextInput'
import EditorItemCard from '../editor/EditorItemCard'
import EditorSectionHeader from '../editor/EditorSectionHeader'
import type { WorkExperience } from '../../types/resume'

type WorkTabProps = {
    workItems: WorkExperience[]
    onAddWorkItem: () => void
    onRemoveWorkItem: (id: string) => void
    onChangeWorkItem: (id: string, field: keyof Omit<WorkExperience, 'id'>, value: string) => void
    onMoveWorkItem: (id: string, direction: 'up' | 'down') => void
}

export default function WorkTab({
    workItems,
    onAddWorkItem,
    onRemoveWorkItem,
    onChangeWorkItem,
    onMoveWorkItem,
}: WorkTabProps) {
    return (
        <div className="space-y-4 pb-4">
            <EditorSectionHeader title="Work Experience" actionLabel="Add Experience" onAction={onAddWorkItem} />

            <div className="space-y-5">
                {workItems.map((workItem, index) => (
                    <EditorItemCard
                        key={workItem.id}
                        title={`Experience ${workItem.name ? `at ${workItem.name}` : `#${index + 1}`}`}
                        canMoveUp={index > 0}
                        canMoveDown={index < workItems.length - 1}
                        onMoveUp={() => onMoveWorkItem(workItem.id, 'up')}
                        onMoveDown={() => onMoveWorkItem(workItem.id, 'down')}
                        onRemove={() => onRemoveWorkItem(workItem.id)}
                    >
                        <div className="grid gap-4 lg:grid-cols-2">
                            <TextInput
                                label="Company"
                                value={workItem.name}
                                onChange={(event) => onChangeWorkItem(workItem.id, 'name', event.target.value)}
                                name={`work-name-${workItem.id}`}
                                placeholder="Company"
                            />
                            <TextInput
                                label="Position"
                                value={workItem.position}
                                onChange={(event) => onChangeWorkItem(workItem.id, 'position', event.target.value)}
                                name={`work-position-${workItem.id}`}
                                placeholder="Position"
                            />
                            <TextInput
                                label="Start Date"
                                value={workItem.startDate}
                                onChange={(event) => onChangeWorkItem(workItem.id, 'startDate', event.target.value)}
                                name={`work-start-${workItem.id}`}
                                placeholder="e.g. 2021 or more detailed"
                            />
                            <TextInput
                                label="End Date"
                                value={workItem.endDate}
                                onChange={(event) => onChangeWorkItem(workItem.id, 'endDate', event.target.value)}
                                name={`work-end-${workItem.id}`}
                                placeholder="e.g. 2025 or more detailed"
                            />
                        </div>

                        <TextareaInput
                            label="Summary"
                            value={workItem.summary}
                            onChange={(event) => onChangeWorkItem(workItem.id, 'summary', event.target.value)}
                            name={`work-summary-${workItem.id}`}
                            rows={4}
                            placeholder="Description of your responsibilities and impact."
                        />
                    </EditorItemCard>
                ))}
            </div>
        </div>
    )
}