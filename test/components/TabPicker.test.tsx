import { fireEvent, render, screen } from '@testing-library/react'
import TabPicker from '../../src/components/TabPicker'
import { createTabPickerTabsFixture } from '../fixtures/tabPickerFixtures'

describe('TabPicker', () => {
    test('renders empty state when no tabs are provided', () => {
        render(<TabPicker tabs={[]} className="custom-shell" />)

        expect(screen.getByText('No tabs available.')).toBeInTheDocument()
    })

    test('uses initialTabId when it matches an existing tab', () => {
        render(<TabPicker tabs={createTabPickerTabsFixture()} initialTabId="experience" />)

        expect(screen.getByRole('tabpanel')).toHaveTextContent('Experience Panel')
        expect(screen.getByRole('tab', { name: 'Experience' })).toHaveAttribute('aria-selected', 'true')
    })

    test('falls back to first tab content when initialTabId is invalid', () => {
        render(<TabPicker tabs={createTabPickerTabsFixture()} initialTabId="unknown" />)

        expect(screen.getByRole('tabpanel')).toHaveTextContent('Personal Panel')
        expect(screen.getByRole('tab', { name: 'Personal Info' })).toHaveAttribute('aria-selected', 'true')
    })

    test('changes active tab and calls onTabChange when a tab is clicked', () => {
        const onTabChange = jest.fn()

        render(<TabPicker tabs={createTabPickerTabsFixture()} onTabChange={onTabChange} />)

        fireEvent.click(screen.getByRole('tab', { name: 'Skills' }))

        expect(onTabChange).toHaveBeenCalledWith('skills')
        expect(screen.getByRole('tabpanel')).toHaveTextContent('Skills Panel')
        expect(screen.getByRole('tab', { name: 'Skills' })).toHaveAttribute('aria-selected', 'true')
        expect(screen.getByRole('tab', { name: 'Personal Info' })).toHaveAttribute('aria-selected', 'false')
    })

    test('renders sidebarFooter content when provided', () => {
        render(
            <TabPicker
                tabs={createTabPickerTabsFixture()}
                sidebarFooter={<button type="button">Import JSON</button>}
            />,
        )

        expect(screen.getByRole('button', { name: 'Import JSON' })).toBeInTheDocument()
    })
})