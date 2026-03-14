import Button from './common/Button'
import { uiTokens } from '../styles/uiTokens'
import { FaTimes } from 'react-icons/fa'

type InfoCardProps = {
    onClose: () => void
}

export default function InfoCard({ onClose }: InfoCardProps) {
    return (
        <article
            role="dialog"
            aria-modal="true"
            aria-label="About Resume Builder"
            className={`w-full max-w-lg space-y-4 ${uiTokens.card}`}
        >
            <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-slate-200">
                    About Resume Builder
                </p>
                <Button onClick={onClose} variant="danger" className="min-w-0">
                    <FaTimes />
                </Button>
            </div>

            <p>
                This Resume Builder follows the <a href="https://jsonresume.org/" className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">JSON Resume standard</a>, allowing you to easily export your resume data in a widely supported format. You can also import existing JSON Resume files to edit and customize them with ease.
            </p>

            <p>
                Keep in mind that not all JSON Resume fields may be supported in the editor, but you can always edit the raw JSON for full control over your resume data.
            </p>

            <p className="text-sm text-slate-400">
                This project is open-source and available on <a href="https://github.com/catsed/simple-resume-builder" className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">GitHub</a>. Contributions and feedback are welcome!
            </p>
        </article>
    )
}