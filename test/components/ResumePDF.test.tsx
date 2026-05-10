import { render, screen } from "@testing-library/react"
import { ResumePDF } from "../../src/components/ResumePDF"
import { createJaneEditorStateFixture } from "../fixtures/resumeFixtures"

jest.mock("@react-pdf/renderer", () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const React = require("react")
    return {
        Document: ({ children }: { children: React.ReactNode }) => React.createElement("div", null, children),
        Page: ({ children }: { children: React.ReactNode }) => React.createElement("div", null, children),
        View: ({ children }: { children: React.ReactNode }) => React.createElement("div", null, children),
        Text: ({ children }: { children: React.ReactNode }) => React.createElement("span", null, children),
        Svg: ({ children }: { children: React.ReactNode }) => React.createElement("svg", null, children),
        Path: () => React.createElement("path"),
        StyleSheet: { create: (s: unknown) => s },
    }
})

describe("ResumePDF", () => {
    test("renders name, label, and contact info", () => {
        const state = createJaneEditorStateFixture()
        render(
            <ResumePDF
                personalInfo={state.personalInfo}
                workExperience={state.workExperience}
                projects={state.projects}
                education={state.education}
                skills={state.skills}
            />,
        )

        expect(screen.getByText("Jane Doe")).toBeInTheDocument()
        expect(screen.getByText("jane@example.com")).toBeInTheDocument()
        expect(screen.getByText("Berlin, Germany")).toBeInTheDocument()
        expect(screen.getByText("Frontend Engineer")).toBeInTheDocument()
        expect(screen.getByText("Builds polished user interfaces.")).toBeInTheDocument()
    })

    test("uses 'Your Name' fallback when name is empty", () => {
        const state = createJaneEditorStateFixture()
        render(
            <ResumePDF
                personalInfo={{ ...state.personalInfo, name: "" }}
                workExperience={state.workExperience}
                projects={state.projects}
                education={state.education}
                skills={state.skills}
            />,
        )

        expect(screen.getByText("Your Name")).toBeInTheDocument()
    })

    test("falls back to 'Profile' label when label is empty", () => {
        const state = createJaneEditorStateFixture()
        render(
            <ResumePDF
                personalInfo={{ ...state.personalInfo, label: "" }}
                workExperience={state.workExperience}
                projects={state.projects}
                education={state.education}
                skills={state.skills}
            />,
        )

        expect(screen.getByText("Profile")).toBeInTheDocument()
    })

    test("omits profile section when summary is empty", () => {
        const state = createJaneEditorStateFixture()
        render(
            <ResumePDF
                personalInfo={{ ...state.personalInfo, summary: "" }}
                workExperience={state.workExperience}
                projects={state.projects}
                education={state.education}
                skills={state.skills}
            />,
        )

        expect(screen.queryByText("Profile")).not.toBeInTheDocument()
        expect(screen.queryByText("Frontend Engineer")).not.toBeInTheDocument()
    })

    test("renders single-line work summary as plain text", () => {
        const state = createJaneEditorStateFixture()
        render(
            <ResumePDF
                personalInfo={{ ...state.personalInfo, summary: "" }}
                workExperience={state.workExperience}
                projects={[]}
                education={[]}
                skills={[]}
            />,
        )

        expect(screen.getByText("Worked on product features")).toBeInTheDocument()
    })

    test("renders multiline work summary as bullet list", () => {
        const state = createJaneEditorStateFixture()
        render(
            <ResumePDF
                personalInfo={{ ...state.personalInfo, summary: "" }}
                workExperience={[
                    {
                        ...state.workExperience[0],
                        summary: "Built the platform\nImproved performance\nMentored junior devs",
                    },
                ]}
                projects={[]}
                education={[]}
                skills={[]}
            />,
        )

        expect(screen.getByText("Built the platform")).toBeInTheDocument()
        expect(screen.getByText("Improved performance")).toBeInTheDocument()
        expect(screen.getByText("Mentored junior devs")).toBeInTheDocument()
    })

    test("filters out fully empty work entries", () => {
        const state = createJaneEditorStateFixture()
        render(
            <ResumePDF
                personalInfo={{ ...state.personalInfo, summary: "" }}
                workExperience={[
                    { id: "empty", name: "", position: "", startDate: "", endDate: "", summary: "" },
                    ...state.workExperience,
                ]}
                projects={[]}
                education={[]}
                skills={[]}
            />,
        )

        expect(screen.getByText("Engineer")).toBeInTheDocument()
        expect(screen.getAllByText("Work Experience")).toHaveLength(1)
    })

    test("renders projects section from fixture", () => {
        const state = createJaneEditorStateFixture()
        render(
            <ResumePDF
                personalInfo={{ ...state.personalInfo, summary: "" }}
                workExperience={[]}
                projects={state.projects}
                education={[]}
                skills={[]}
            />,
        )

        expect(screen.getByText("Projects")).toBeInTheDocument()
        expect(screen.getByText("Portfolio Site")).toBeInTheDocument()
        expect(screen.getByText("Personal portfolio built with React.")).toBeInTheDocument()
    })

    test("omits projects section when all entries are empty", () => {
        const state = createJaneEditorStateFixture()
        render(
            <ResumePDF
                personalInfo={{ ...state.personalInfo, summary: "" }}
                workExperience={[]}
                projects={[{ id: "p1", name: "", url: "", startDate: "", endDate: "", description: "" }]}
                education={[]}
                skills={[]}
            />,
        )

        expect(screen.queryByText("Projects")).not.toBeInTheDocument()
    })

    test("renders education with studyType, area, and GPA from fixture", () => {
        const state = createJaneEditorStateFixture()
        render(
            <ResumePDF
                personalInfo={{ ...state.personalInfo, summary: "" }}
                workExperience={[]}
                projects={[]}
                education={state.education}
                skills={[]}
            />,
        )

        expect(screen.getByText("Bachelor in Computer Science")).toBeInTheDocument()
        expect(screen.getByText("GPA: 3.9")).toBeInTheDocument()
    })

    test("shows '? in ?' fallback for education missing studyType and area", () => {
        const state = createJaneEditorStateFixture()
        render(
            <ResumePDF
                personalInfo={{ ...state.personalInfo, summary: "" }}
                workExperience={[]}
                projects={[]}
                education={[{ ...state.education[0], studyType: "", area: "" }]}
                skills={[]}
            />,
        )

        expect(screen.getByText("? in ?")).toBeInTheDocument()
    })

    test("renders education courses as bullet list and trims whitespace", () => {
        const state = createJaneEditorStateFixture()
        render(
            <ResumePDF
                personalInfo={{ ...state.personalInfo, summary: "" }}
                workExperience={[]}
                projects={[]}
                education={[
                    {
                        ...state.education[0],
                        courses: ["  Algorithms  ", "", "  Distributed Systems  "],
                    },
                ]}
                skills={[]}
            />,
        )

        expect(screen.getByText("Algorithms")).toBeInTheDocument()
        expect(screen.getByText("Distributed Systems")).toBeInTheDocument()
    })

    test("renders skills from fixture", () => {
        const state = createJaneEditorStateFixture()
        render(
            <ResumePDF
                personalInfo={{ ...state.personalInfo, summary: "" }}
                workExperience={[]}
                projects={[]}
                education={[]}
                skills={state.skills}
            />,
        )

        expect(screen.getByText("Frontend:")).toBeInTheDocument()
        expect(screen.getByText("React, TypeScript")).toBeInTheDocument()
    })

    test("filters empty skills and trims keyword whitespace", () => {
        const state = createJaneEditorStateFixture()
        render(
            <ResumePDF
                personalInfo={{ ...state.personalInfo, summary: "" }}
                workExperience={[]}
                projects={[]}
                education={[]}
                skills={[
                    { id: "s-hidden", name: "", keywords: ["   ", ""] },
                    { ...state.skills[0], keywords: [" React ", "", " TypeScript "] },
                ]}
            />,
        )

        expect(screen.getByText("Frontend:")).toBeInTheDocument()
        expect(screen.getByText("React, TypeScript")).toBeInTheDocument()
        expect(screen.queryByText("Skill:")).not.toBeInTheDocument()
    })

    test("omits skills section when all skills are empty", () => {
        const state = createJaneEditorStateFixture()
        render(
            <ResumePDF
                personalInfo={{ ...state.personalInfo, summary: "" }}
                workExperience={[]}
                projects={[]}
                education={[]}
                skills={[{ id: "s1", name: "", keywords: ["", "  "] }]}
            />,
        )

        expect(screen.queryByText("Skills")).not.toBeInTheDocument()
    })
})
