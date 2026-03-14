import type { ButtonHTMLAttributes } from 'react'
import { uiTokens } from '../../styles/uiTokens'

type ButtonVariant = 'tab' | 'tab-active' | 'accent' | 'subtle' | 'danger'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant
}

const baseClassName =
    'cursor-pointer rounded-lg border transition-all duration-300 focus:outline-none'

const variantClassNames: Record<ButtonVariant, string> = {
    tab: `md:text-left min-w-40 border-slate-300 bg-slate-800 px-3 py-2 ${uiTokens.buttonTextTab} text-slate-300 hover:border-blue-300 hover:bg-slate-700 md:min-w-0`,
    'tab-active': `md:text-left min-w-40 border-blue-300 bg-slate-950 px-3 py-2 ${uiTokens.buttonTextTab} text-white hover:border-blue-300 md:min-w-0`,
    accent: `border-cyan-300/30 bg-cyan-300/10 px-3 py-2 ${uiTokens.buttonTextAction} text-cyan-100 hover:border-cyan-200 hover:bg-cyan-200/15`,
    subtle: 'rounded-md border-slate-300/20 px-2.5 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/5 disabled:border-slate-300/10 disabled:text-slate-500',
    danger: 'rounded-md border-rose-300/35 px-2.5 py-1.5 text-xs font-medium text-rose-200 hover:bg-rose-200/10',
}

export default function Button({
    variant = 'tab',
    className,
    type = 'button',
    ...props
}: ButtonProps) {
    return (
        <button
            {...props}
            type={type}
            className={[baseClassName, variantClassNames[variant], className]
                .filter(Boolean)
                .join(' ')}
        />
    )
}