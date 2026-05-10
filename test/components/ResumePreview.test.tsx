import { render, screen } from "@testing-library/react"
import ResumePreview from "../../src/components/ResumePreview"
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
        PDFViewer: ({ children }: { children: React.ReactNode }) =>
            React.createElement("div", { "data-testid": "pdf-viewer" }, children),
    }
})

describe("ResumePreview", () => {
    test("renders resume sections", () => {
        const state = createJaneEditorStateFixture()
        render(
            <ResumePreview
                personalInfo={state.personalInfo}
                workExperience={state.workExperience}
                projects={state.projects}
                education={state.education}
                skills={state.skills}
            />,
        )

        expect(screen.getByText("Jane Doe")).toBeInTheDocument()
        expect(screen.getByText("Work Experience")).toBeInTheDocument()
        expect(screen.getByText("Education")).toBeInTheDocument()
        expect(screen.getByText("Skills")).toBeInTheDocument()
    })

    test("uses name fallback when name is empty", () => {
        const state = createJaneEditorStateFixture()

        render(
            <ResumePreview
                personalInfo={{
                    ...state.personalInfo,
                    name: "",
                    label: "",
                    summary: "Summary text",
                }}
                workExperience={[]}
                projects={[]}
                education={[]}
                skills={[]}
            />,
        )

        expect(screen.getByText("Your Name")).toBeInTheDocument()
        expect(screen.getByText("Profile")).toBeInTheDocument()
    })

    test("renders multiline work summaries as bullet items", () => {
        const state = createJaneEditorStateFixture()

        render(
            <ResumePreview
                personalInfo={{ ...state.personalInfo, summary: "" }}
                workExperience={[
                    {
                        id: "work-1",
                        name: "Acme",
                        position: "Engineer",
                        startDate: "2020",
                        endDate: "2024",
                        summary: "Built feature A\nImproved performance",
                    },
                ]}
                projects={[]}
                education={[
                    {
                        id: "edu-1",
                        institution: "State University",
                        area: "",
                        studyType: "",
                        startDate: "2018",
                        endDate: "2022",
                        score: "",
                        courses: ["  Systems Design  ", "", "Distributed Systems"],
                    },
                ]}
                skills={[]}
            />,
        )

        expect(screen.getByText("Built feature A")).toBeInTheDocument()
        expect(screen.getByText("Improved performance")).toBeInTheDocument()
        expect(screen.getByText("? in ?")).toBeInTheDocument()
        expect(screen.getByText("Systems Design")).toBeInTheDocument()
        expect(screen.getByText("Distributed Systems")).toBeInTheDocument()
    })

    test("filters empty skills and normalizes keywords", () => {
        const state = createJaneEditorStateFixture()

        render(
            <ResumePreview
                personalInfo={{ ...state.personalInfo, summary: "" }}
                workExperience={[]}
                projects={[]}
                education={[]}
                skills={[
                    { id: "skill-hidden", name: "", keywords: ["   ", ""] },
                    { id: "skill-1", name: "Backend", keywords: [" Node.js ", ""] },
                ]}
            />,
        )

        expect(screen.getByText("Backend:")).toBeInTheDocument()
        expect(screen.getByText("Node.js")).toBeInTheDocument()
        expect(screen.queryByText("Skill:")).not.toBeInTheDocument()
    })
})
