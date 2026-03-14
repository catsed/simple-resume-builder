import TextareaInput from '../common/TextareaInput'
import TextInput from '../common/TextInput'
import type { BasicsInfo } from '../../types/resume'

type PersonalTabProps = {
    personalInfo: BasicsInfo
    onChange: (field: keyof BasicsInfo, value: string) => void
}

export default function PersonalTab({ personalInfo, onChange }: PersonalTabProps) {
    return (
        <div className="space-y-4 pb-4 pt-1">
            <div className="space-y-4">
                <TextInput
                    label="Full Name"
                    value={personalInfo.name}
                    onChange={(event) => onChange('name', event.target.value)}
                    name="name"
                    placeholder="Your Name"
                    hint="Use the name you want at the top of the resume."
                />
                <div className="grid gap-4 lg:grid-cols-2">
                    <TextInput
                        label="Title"
                        value={personalInfo.label}
                        onChange={(event) => onChange('label', event.target.value)}
                        name="label"
                        placeholder="Your Title"
                    />
                    <TextInput
                        label="Email"
                        value={personalInfo.email}
                        onChange={(event) => onChange('email', event.target.value)}
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                    />
                    <TextInput
                        label="Phone"
                        value={personalInfo.phone}
                        onChange={(event) => onChange('phone', event.target.value)}
                        name="phone"
                        type="tel"
                        placeholder="+000 0000"
                    />
                    <TextInput
                        label="Location"
                        value={personalInfo.location}
                        onChange={(event) => onChange('location', event.target.value)}
                        name="location"
                        placeholder="City, Country"
                    />
                </div>
                <div className="grid gap-4 lg:grid-cols-3">
                    <TextInput
                        label="Website"
                        value={personalInfo.url}
                        onChange={(event) => onChange('url', event.target.value)}
                        name="url"
                        type="url"
                        placeholder="https://yourdomain.com"
                    />
                    <TextInput
                        label="GitHub"
                        value={personalInfo.github}
                        onChange={(event) => onChange('github', event.target.value)}
                        name="github"
                        type="url"
                        placeholder="https://github.com/yourname"
                    />
                    <TextInput
                        label="LinkedIn"
                        value={personalInfo.linkedin}
                        onChange={(event) => onChange('linkedin', event.target.value)}
                        name="linkedin"
                        type="url"
                        placeholder="https://linkedin.com/in/yourname"
                    />
                </div>
                <TextareaInput
                    label="Profile"
                    value={personalInfo.summary}
                    onChange={(event) => onChange('summary', event.target.value)}
                    name="summary"
                    placeholder="Write a short summary that highlights your most relevant experience, strengths, and career direction."
                    hint="Two to four concise sentences is usually enough."
                />
            </div>
        </div>
    )
}