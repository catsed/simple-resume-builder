import type { ReactNode } from 'react'
import Button from '../common/Button'
import { uiTokens } from '../../styles/uiTokens'

type EditorSectionHeaderProps = {
    title: ReactNode
    actionLabel: ReactNode
    onAction: () => void
}

export default function EditorSectionHeader({
    title,
    actionLabel,
    onAction,
}: EditorSectionHeaderProps) {
    return (
        <div className="flex items-center justify-between">
            <h2 className={uiTokens.sectionTitle}>{title}</h2>
            <Button onClick={onAction} variant="accent">
                {actionLabel}
            </Button>
        </div>
    )
}