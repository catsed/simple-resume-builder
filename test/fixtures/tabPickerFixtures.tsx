import type { TabItem } from '../../src/components/TabPicker'

export function createTabPickerTabsFixture(): TabItem[] {
    return [
        {
            id: 'personal',
            label: 'Personal Info',
            content: <div>Personal Panel</div>,
        },
        {
            id: 'experience',
            label: 'Experience',
            content: <div>Experience Panel</div>,
        },
        {
            id: 'skills',
            label: 'Skills',
            content: <div>Skills Panel</div>,
        },
    ]
}