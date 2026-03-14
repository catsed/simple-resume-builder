import { fireEvent, render, screen } from '@testing-library/react'
import EditorItemCard from '../../../src/components/editor/EditorItemCard'

describe('EditorItemCard', () => {
    test('renders title, controls, and children', () => {
        render(
            <EditorItemCard
                title="Work #1"
                canMoveUp={true}
                canMoveDown={true}
                onMoveUp={jest.fn()}
                onMoveDown={jest.fn()}
                onRemove={jest.fn()}
            >
                <div>Card Content</div>
            </EditorItemCard>,
        )

        expect(screen.getByText('Work #1')).toBeInTheDocument()
        expect(screen.getByText('Card Content')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Up' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Down' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Remove' })).toBeInTheDocument()
    })

    test('disables move controls based on canMove flags', () => {
        render(
            <EditorItemCard
                title="Education #1"
                canMoveUp={false}
                canMoveDown={false}
                onMoveUp={jest.fn()}
                onMoveDown={jest.fn()}
                onRemove={jest.fn()}
            >
                <div>Details</div>
            </EditorItemCard>,
        )

        expect(screen.getByRole('button', { name: 'Up' })).toBeDisabled()
        expect(screen.getByRole('button', { name: 'Down' })).toBeDisabled()
        expect(screen.getByRole('button', { name: 'Remove' })).not.toBeDisabled()
    })

    test('invokes callbacks when controls are clicked', () => {
        const onMoveUp = jest.fn()
        const onMoveDown = jest.fn()
        const onRemove = jest.fn()

        render(
            <EditorItemCard
                title="Skill #1"
                canMoveUp={true}
                canMoveDown={true}
                onMoveUp={onMoveUp}
                onMoveDown={onMoveDown}
                onRemove={onRemove}
            >
                <div>Skill Fields</div>
            </EditorItemCard>,
        )

        fireEvent.click(screen.getByRole('button', { name: 'Up' }))
        fireEvent.click(screen.getByRole('button', { name: 'Down' }))
        fireEvent.click(screen.getByRole('button', { name: 'Remove' }))

        expect(onMoveUp).toHaveBeenCalledTimes(1)
        expect(onMoveDown).toHaveBeenCalledTimes(1)
        expect(onRemove).toHaveBeenCalledTimes(1)
    })
})