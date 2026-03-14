import { useMemo, useState, type ReactNode } from 'react'
import Button from './common/Button'

export type TabItem = {
    id: string
    label: string
    content: ReactNode
}

type TabPickerProps = {
    tabs: TabItem[]
    initialTabId?: string
    onTabChange?: (tabId: string) => void
    className?: string
    sidebarFooter?: ReactNode
}

export default function TabPicker({
    tabs,
    initialTabId,
    onTabChange,
    className,
    sidebarFooter,
}: TabPickerProps) {
    const firstTabId = useMemo(() => tabs[0]?.id ?? '', [tabs])
    const [activeTabId, setActiveTabId] = useState(initialTabId ?? firstTabId)

    const activeTab =
        tabs.find((tab) => tab.id === activeTabId) ?? tabs[0] ?? null

    const handleTabClick = (tabId: string) => {
        setActiveTabId(tabId)
        onTabChange?.(tabId)
    }

    if (!tabs.length) {
        return (
            <div className={className}>
                <p className="text-sm text-slate-300">No tabs available.</p>
            </div>
        )
    }

    return (
        <div
            className={[
                "flex h-full min-h-0 min-w-0 flex-col overflow-hidden gap-2 md:flex-row md:gap-0",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <div
                role="tablist"
                className="flex shrink-0 gap-2 overflow-x-auto p-2 md:h-full md:w-44 md:flex-col md:overflow-x-hidden md:overflow-y-auto md:border-r md:border-slate-700 md:pr-4 md:pb-0"
            >
                {tabs.map((tab) => {
                    const isActive = tab.id === activeTab?.id;

                    return (
                        <Button
                            key={tab.id}
                            id={`tab-${tab.id}`}
                            role="tab"
                            aria-selected={isActive}
                            aria-controls={`panel-${tab.id}`}
                            onClick={() => handleTabClick(tab.id)}
                            variant={isActive ? 'tab-active' : 'tab'}
                        >
                            {tab.label}
                        </Button>
                    );
                })}

                {sidebarFooter ? (
                    <div className="min-w-40 md:min-w-0 md:mt-auto md:pt-3 md:mb-2">
                        {sidebarFooter}
                    </div>
                ) : null}
            </div>

            <div
                id={`panel-${activeTab?.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${activeTab?.id}`}
                className="min-h-0 min-w-0 flex-1 overflow-y-auto py-2 px-4 mb-2 md:mb-0"
            >
                {activeTab?.content}
            </div>
        </div>
    )
}