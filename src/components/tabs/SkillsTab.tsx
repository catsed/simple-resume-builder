import EditorItemCard from '../editor/EditorItemCard'
import EditorSectionHeader from '../editor/EditorSectionHeader'
import TextareaInput from '../common/TextareaInput'
import TextInput from '../common/TextInput'
import type { SkillEntry } from '../../types/resume'

type SkillsTabProps = {
    skills: SkillEntry[]
    onAddSkill: () => void
    onRemoveSkill: (id: string) => void
    onChangeSkill: (id: string, name: string) => void
    onChangeSkillKeywords: (id: string, value: string) => void
    onMoveSkill: (id: string, direction: 'up' | 'down') => void
}

export default function SkillsTab({
    skills,
    onAddSkill,
    onRemoveSkill,
    onChangeSkill,
    onChangeSkillKeywords,
    onMoveSkill,
}: SkillsTabProps) {
    return (
        <div className="space-y-4 pb-4">
            <EditorSectionHeader title="Skills" actionLabel="Add Skill" onAction={onAddSkill} />

            <div className="space-y-5">
                {skills.map((skill, index) => (
                    <EditorItemCard
                        key={skill.id}
                        title={`Skill ${skill.name ? `${skill.name}` : `#${index + 1}`}`}
                        canMoveUp={index > 0}
                        canMoveDown={index < skills.length - 1}
                        onMoveUp={() => onMoveSkill(skill.id, 'up')}
                        onMoveDown={() => onMoveSkill(skill.id, 'down')}
                        onRemove={() => onRemoveSkill(skill.id)}
                    >
                        <TextInput
                            label="Name"
                            value={skill.name}
                            onChange={(event) => onChangeSkill(skill.id, event.target.value)}
                            name={`skill-name-${skill.id}`}
                            placeholder="Web Development"
                        />

                        <TextareaInput
                            label="Keywords"
                            value={skill.keywords.join('\n')}
                            onChange={(event) => onChangeSkillKeywords(skill.id, event.target.value)}
                            name={`skill-keywords-${skill.id}`}
                            rows={4}
                            placeholder="One keyword per line"
                            hint="Displayed as comma-separated values in the preview."
                        />
                    </EditorItemCard>
                ))}
            </div>
        </div>
    )
}