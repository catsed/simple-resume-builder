import { useId } from 'react'
import type { InputHTMLAttributes } from 'react'
import FormField from './FormField'
import { uiTokens } from '../../styles/uiTokens'

type TextInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> & {
    id?: string
    label: string
    hint?: string
    error?: string
}

const inputClassName = [
    uiTokens.inputBase,
    'rounded-2xl',
].join(' ')

export default function TextInput({
    id,
    label,
    hint,
    error,
    required,
    className,
    ...props
}: TextInputProps) {
    const generatedId = useId()
    const inputId = id ?? generatedId

    return (
        <FormField
            htmlFor={inputId}
            label={label}
            hint={hint}
            error={error}
            required={required}
        >
            <input
                {...props}
                id={inputId}
                required={required}
                className={[inputClassName, className].filter(Boolean).join(' ')}
            />
        </FormField>
    )
}