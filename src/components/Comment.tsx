import type { IComment } from "../types/types";

const Comment: React.FC<IComment> = (props) => {
    return (
        <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-md border border-gray-200">
            <img
                src="/avatar.png"
                alt="avatar"
                className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex flex-col">
                <p className="font-semibold text-gray-800">{props.name}</p>
                <p className="text-sm text-gray-500 mb-2">{props.email}</p>
                <p className="text-gray-700">{props.body}</p>
            </div>
        </div>
    )
}

export default Comment