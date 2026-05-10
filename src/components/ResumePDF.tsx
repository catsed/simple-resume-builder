import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import type { BasicsInfo, EducationEntry, ProjectEntry, SkillEntry, WorkExperience } from '../types/resume'
import EmailIcon from './icons/EmailIcon'
import PhoneIcon from './icons/PhoneIcon'
import LocationIcon from './icons/LocationIcon'
import GlobeIcon from './icons/GlobeIcon'
import LinkedinIcon from './icons/LinkedinIcon'
import GithubIcon from './icons/GithubIcon'

type ResumePDFProps = {
    personalInfo: BasicsInfo
    workExperience: WorkExperience[]
    projects: ProjectEntry[]
    education: EducationEntry[]
    skills: SkillEntry[]
}

const C = {
    slate900: '#0f172a',
    slate700: '#334155',
    slate600: '#475569',
    slate500: '#64748b',
    slate300: '#cbd5e1',
}

const s = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 10.5,
        color: C.slate900,
        paddingTop: 40,
        paddingRight: 40,
        paddingBottom: 45,
        paddingLeft: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderBottomWidth: 0.75,
        borderBottomColor: C.slate300,
        paddingBottom: 8,
    },
    name: {
        fontFamily: 'Helvetica-Bold',
        fontSize: 18,
        letterSpacing: -0.3,
    },
    contactCol: {
        alignItems: 'flex-start',
        marginTop: 3,
        gap: 2,
    },
    contactText: {
        fontSize: 9.5,
        color: C.slate600,
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
    },
    profilesCol: {
        alignItems: 'flex-end',
        marginTop: 4,
        gap: 1,
    },
    profileText: {
        fontSize: 9.5,
        color: C.slate600,
    },
    section: {
        marginTop: 11,
    },
    sectionTitle: {
        fontFamily: 'Helvetica-Bold',
        fontSize: 8,
        color: C.slate500,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    summaryText: {
        fontSize: 10.5,
        color: C.slate700,
        lineHeight: 1.45,
    },
    entryList: {
        gap: 4,
        marginTop: 2,
    },
    entryTitle: {
        fontFamily: 'Helvetica-Bold',
        fontSize: 11,
    },
    entryMeta: {
        fontSize: 9.5,
        color: C.slate600,
        marginTop: 1,
    },
    bodyText: {
        fontSize: 10,
        color: C.slate700,
        lineHeight: 1.45,
        marginTop: 3,
    },
    bulletList: {
        marginTop: 3,
        gap: 1,
    },
    bulletRow: {
        flexDirection: 'row',
    },
    bulletDot: {
        fontSize: 10,
        color: C.slate700,
        width: 10,
    },
    bulletText: {
        fontSize: 10,
        color: C.slate700,
        lineHeight: 1.45,
        flex: 1,
    },
    gpaText: {
        fontSize: 9.5,
        color: C.slate600,
        marginTop: 2,
    },
    skillsGrid: {
        marginTop: 2,
        gap: 2,
    },
    skillRow: {
        flexDirection: 'row',
        gap: 4,
    },
    skillName: {
        fontFamily: 'Helvetica-Bold',
        fontSize: 10,
        minWidth: 60,
    },
    skillKeywords: {
        fontSize: 10,
        color: C.slate700,
        flex: 1,
    },
    footerNote: {
        marginTop: 16,
        fontSize: 7.5,
        color: C.slate500,
        fontFamily: 'Helvetica-Oblique',
    },
})

function WorkSummary({ summary }: { summary: string }) {
    const lines = summary.split('\n').filter(Boolean)
    if (lines.length <= 1) {
        return <Text style={s.bodyText}>{summary}</Text>
    }
    return (
        <View style={s.bulletList}>
            {lines.map((line, i) => (
                <View key={i} style={s.bulletRow}>
                    <Text style={s.bulletDot}>•</Text>
                    <Text style={s.bulletText}>{line}</Text>
                </View>
            ))}
        </View>
    )
}

function EducationCourses({ courses }: { courses: string[] }) {
    const items = courses.map((c) => c.trim()).filter(Boolean)
    if (items.length === 0) return null
    if (items.length === 1) {
        return <Text style={s.bodyText}>{items[0]}</Text>
    }
    return (
        <View style={s.bulletList}>
            {items.map((course, i) => (
                <View key={i} style={s.bulletRow}>
                    <Text style={s.bulletDot}>•</Text>
                    <Text style={s.bulletText}>{course}</Text>
                </View>
            ))}
        </View>
    )
}

function studyTypeArea(studyType: string, area: string) {
    if (studyType && area) return `${studyType} in ${area}`
    return studyType || area || '? in ?'
}

export function ResumePDF({ personalInfo, workExperience, projects, education, skills }: ResumePDFProps) {
    const visibleSkills = skills
        .map((skill) => ({
            ...skill,
            keywords: skill.keywords.map((kw) => kw.trim()).filter(Boolean),
        }))
        .filter((skill) => [skill.name, ...skill.keywords].some(Boolean))

    const contactItems = [
        { value: personalInfo.email, Icon: EmailIcon },
        { value: personalInfo.phone, Icon: PhoneIcon },
        { value: personalInfo.location, Icon: LocationIcon },
    ].filter((item) => !!item.value)

    const profileItems = [
        { value: personalInfo.url, Icon: GlobeIcon },
        { value: personalInfo.linkedin, Icon: LinkedinIcon },
        { value: personalInfo.github, Icon: GithubIcon },
    ].filter((item) => !!item.value)

    const filteredWork = workExperience.filter((w) =>
        [w.name, w.position, w.startDate, w.endDate, w.summary].some(Boolean),
    )

    const filteredProjects = projects.filter((p) =>
        [p.name, p.url, p.startDate, p.endDate, p.description].some(Boolean),
    )

    const filteredEducation = education.filter((e) =>
        [e.institution, e.studyType, e.area, e.startDate, e.endDate, e.score, ...e.courses].some(Boolean),
    )

    return (
        <Document>
            <Page size="A4" style={s.page}>
                <View style={s.header}>
                    <View>
                        <Text style={s.name}>{personalInfo.name || 'Your Name'}</Text>
                        {contactItems.length > 0 && (
                            <View style={s.contactCol}>
                                {contactItems.map(({ value, Icon }, i) => (
                                    <View key={i} style={s.iconRow}>
                                        <Icon />
                                        <Text style={s.contactText}>{value}</Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                    {profileItems.length > 0 && (
                        <View style={s.profilesCol}>
                            {profileItems.map(({ value, Icon }, i) => (
                                <View key={i} style={s.iconRow}>
                                    <Icon />
                                    <Text style={s.profileText}>{value}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                </View>

                {personalInfo.summary && (
                    <View style={s.section}>
                        <Text style={s.sectionTitle}>{personalInfo.label || 'Profile'}</Text>
                        <Text style={s.summaryText}>{personalInfo.summary}</Text>
                    </View>
                )}

                <View style={s.section}>
                    <Text style={s.sectionTitle}>Work Experience</Text>
                    <View style={s.entryList}>
                        {filteredWork.map((work) => (
                            <View key={work.id} wrap={false}>
                                <Text style={s.entryTitle}>{work.position || 'Position'}</Text>
                                <Text style={s.entryMeta}>
                                    {work.name || 'Company'}  |  {work.startDate || 'Start'} - {work.endDate || 'End'}
                                </Text>
                                {work.summary ? <WorkSummary summary={work.summary} /> : null}
                            </View>
                        ))}
                    </View>
                </View>

                {filteredProjects.length > 0 && (
                    <View style={s.section}>
                        <Text style={s.sectionTitle}>Projects</Text>
                        <View style={s.entryList}>
                            {filteredProjects.map((project) => {
                                const datePart = [project.startDate, project.endDate].filter(Boolean).join(' - ')
                                const metaParts = [project.url, datePart].filter(Boolean)
                                return (
                                    <View key={project.id} wrap={false}>
                                        <Text style={s.entryTitle}>{project.name || 'Project'}</Text>
                                        {metaParts.length > 0 && (
                                            <Text style={s.entryMeta}>{metaParts.join('  |  ')}</Text>
                                        )}
                                        {project.description ? <WorkSummary summary={project.description} /> : null}
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                )}

                <View style={s.section}>
                    <Text style={s.sectionTitle}>Education</Text>
                    <View style={s.entryList}>
                        {filteredEducation.map((edu) => (
                            <View key={edu.id} wrap={false}>
                                <Text style={s.entryTitle}>{studyTypeArea(edu.studyType, edu.area)}</Text>
                                <Text style={s.entryMeta}>
                                    {edu.institution || 'Institution'}  |  {edu.startDate || 'Start'} - {edu.endDate || 'End'}
                                </Text>
                                {edu.score ? <Text style={s.gpaText}>GPA: {edu.score}</Text> : null}
                                <EducationCourses courses={edu.courses} />
                            </View>
                        ))}
                    </View>
                </View>

                {visibleSkills.length > 0 && (
                    <View style={s.section}>
                        <Text style={s.sectionTitle}>Skills</Text>
                        <View style={s.skillsGrid}>
                            {visibleSkills.map((skill) => (
                                <View key={skill.id} style={s.skillRow}>
                                    <Text style={s.skillName}>{skill.name || 'Skill'}:</Text>
                                    <Text style={s.skillKeywords}>{skill.keywords.join(', ')}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                <Text style={s.footerNote}>
                    Created using simple-resume-builder! Find the source code at: https://github.com/catsed/simple-resume-builder
                </Text>
            </Page>
        </Document>
    )
}
