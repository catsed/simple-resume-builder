import type { ReactNode } from 'react'
import { uiTokens } from '../../styles/uiTokens'
import Button from '../common/Button'

type EditorItemCardProps = {
    title: ReactNode
    canMoveUp: boolean
    canMoveDown: boolean
    onMoveUp: () => void
    onMoveDown: () => void
    onRemove: () => void
    children: ReactNode
}

export default function EditorItemCard({
    title,
    canMoveUp,
    canMoveDown,
    onMoveUp,
    onMoveDown,
    onRemove,
    children,
}: EditorItemCardProps) {
    return (
        <article className={`space-y-4 ${uiTokens.cardSurface}`}>
            <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-slate-200">{title}</p>
                <div className="flex items-center gap-2">
                    <Button
                        onClick={onMoveUp}
                        variant="subtle"
                        className="min-w-0"
                        disabled={!canMoveUp}
                    >
                        Up
                    </Button>
                    <Button
                        onClick={onMoveDown}
                        variant="subtle"
                        className="min-w-0"
                        disabled={!canMoveDown}
                    >
                        Down
                    </Button>
                    <Button onClick={onRemove} variant="danger">
                        Remove
                    </Button>
                </div>
            </div>

            {children}
        </article>
    )
}