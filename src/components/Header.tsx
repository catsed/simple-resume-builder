import { FaInfo } from "react-icons/fa";

type HeaderProps = {
    onInfoClick: () => void
}

export default function Header({ onInfoClick }: HeaderProps) {
    return (
        <div className="relative text-center p-4 border-b border-slate-700 overflow-hidden">
            <div
                className="absolute inset-0 z-0 animate-gradient bg-linear-to-r from-purple-600 via-blue-500 to-teal-400 opacity-30 blur-lg"
                style={{
                    backgroundSize: '200% 200%',
                    animation: 'gradientMove 6s ease-in-out infinite',
                }}
            />
            <div className="relative z-10 flex items-center justify-center gap-2">
                <h1 className="text-2xl font-bold drop-shadow-lg">Resume Builder</h1>
                <button
                    type="button"
                    onClick={onInfoClick}
                    aria-label="Open app information"
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/35 bg-white/10 text-xs font-bold text-white transition hover:bg-white/20 cursor-pointer"
                >
                    <FaInfo />
                </button>
            </div>
            <h3 className="relative z-10 text-sm mt-1 text-slate-300 drop-shadow">Create a professional resume with ease</h3>
        </div>
    );
}