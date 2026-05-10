import EditorItemCard from '../editor/EditorItemCard'
import EditorSectionHeader from '../editor/EditorSectionHeader'
import TextareaInput from '../common/TextareaInput'
import TextInput from '../common/TextInput'
import type { ProjectEntry } from '../../types/resume'

type ProjectsTabProps = {
    projects: ProjectEntry[]
    onAddProject: () => void
    onRemoveProject: (id: string) => void
    onChangeProject: (id: string, field: keyof Omit<ProjectEntry, 'id'>, value: string) => void
    onMoveProject: (id: string, direction: 'up' | 'down') => void
}

export default function ProjectsTab({
    projects,
    onAddProject,
    onRemoveProject,
    onChangeProject,
    onMoveProject,
}: ProjectsTabProps) {
    return (
        <div className="space-y-4 pb-4">
            <EditorSectionHeader title="Projects" actionLabel="Add Project" onAction={onAddProject} />

            <div className="space-y-5">
                {projects.map((project, index) => (
                    <EditorItemCard
                        key={project.id}
                        title={project.name || `Project #${index + 1}`}
                        canMoveUp={index > 0}
                        canMoveDown={index < projects.length - 1}
                        onMoveUp={() => onMoveProject(project.id, 'up')}
                        onMoveDown={() => onMoveProject(project.id, 'down')}
                        onRemove={() => onRemoveProject(project.id)}
                    >
                        <div className="grid gap-4 lg:grid-cols-2">
                            <TextInput
                                label="Project Name"
                                value={project.name}
                                onChange={(event) => onChangeProject(project.id, 'name', event.target.value)}
                                name={`project-name-${project.id}`}
                                placeholder="My Project"
                            />
                            <TextInput
                                label="URL"
                                value={project.url}
                                onChange={(event) => onChangeProject(project.id, 'url', event.target.value)}
                                name={`project-url-${project.id}`}
                                placeholder="https://..."
                            />
                            <TextInput
                                label="Start Date"
                                value={project.startDate}
                                onChange={(event) => onChangeProject(project.id, 'startDate', event.target.value)}
                                name={`project-start-${project.id}`}
                                placeholder="e.g. 2021 or more detailed"
                            />
                            <TextInput
                                label="End Date"
                                value={project.endDate}
                                onChange={(event) => onChangeProject(project.id, 'endDate', event.target.value)}
                                name={`project-end-${project.id}`}
                                placeholder="e.g. 2025 or more detailed"
                            />
                        </div>

                        <TextareaInput
                            label="Description"
                            value={project.description}
                            onChange={(event) => onChangeProject(project.id, 'description', event.target.value)}
                            name={`project-description-${project.id}`}
                            rows={3}
                            placeholder="Brief description of the project."
                        />

                    </EditorItemCard>
                ))}
            </div>
        </div>
    )
}
