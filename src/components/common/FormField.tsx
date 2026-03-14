import type { ReactNode } from 'react'
import { uiTokens } from '../../styles/uiTokens'

type FormFieldProps = {
    label: string
    htmlFor: string
    hint?: string
    error?: string
    required?: boolean
    children: ReactNode
}

export default function FormField({
    label,
    htmlFor,
    hint,
    error,
    required,
    children,
}: FormFieldProps) {
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
                <label
                    htmlFor={htmlFor}
                    className={uiTokens.fieldLabel}
                >
                    {label}
                </label>
                {required ? (
                    <span className={uiTokens.fieldRequired}>
                        Required
                    </span>
                ) : null}
            </div>
            {children}
            {error ? (
                <p className="text-sm text-rose-300">{error}</p>
            ) : hint ? (
                <p className="text-sm text-slate-400">{hint}</p>
            ) : null}
        </div>
    )
}