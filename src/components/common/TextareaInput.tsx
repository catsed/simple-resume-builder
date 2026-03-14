import { useId } from 'react'
import type { TextareaHTMLAttributes } from 'react'
import FormField from './FormField'
import { uiTokens } from '../../styles/uiTokens'

type TextareaInputProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> & {
    id?: string
    label: string
    hint?: string
    error?: string
}

const textareaClassName = [
    uiTokens.inputBase,
    'min-h-36 rounded-[1.5rem]',
    'resize-y',
].join(' ')

export default function TextareaInput({
    id,
    label,
    hint,
    error,
    required,
    className,
    rows = 6,
    ...props
}: TextareaInputProps) {
    const generatedId = useId()
    const textareaId = id ?? generatedId

    return (
        <FormField
            htmlFor={textareaId}
            label={label}
            hint={hint}
            error={error}
            required={required}
        >
            <textarea
                {...props}
                id={textareaId}
                rows={rows}
                required={required}
                className={[textareaClassName, className].filter(Boolean).join(' ')}
            />
        </FormField>
    )
}