import { useState, type RefObject } from "react"
import type { IPost } from "../types/types"
import CommentPopup from "./CommentPopup"
import { Link } from "react-router"

interface IPostProps {
    props: IPost,
    ref?: RefObject<null> | undefined,
}

const Post: React.FC<IPostProps> = ({props, ref}) => {

    const [ showComments, setShowComments ] = useState<boolean>(false);

    return (
        <>
            <div ref={ref} className="bg-white p-2 sm:p-3 rounded-lg shadow text-xs sm:text-sm flex flex-col justify-between h-full">
                <h2 className="font-semibold line-clamp-2">{props.title}</h2>
                <p className="mt-2 line-clamp-3 text-gray-600">{props.body}</p>
                <div className="mt-4 flex flex-wrap gap-2 sm:gap-4 justify-start items-center">
                    <button
                        className="text-[6px] sm:text-[9px] md:text-xs px-2 py-1 sm:px-3 sm:py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-300 transition"
                        onClick={() => setShowComments(true)}
                    >
                        Комментарии
                    </button>
                    <Link
                        to={`/post/${props.id}`}
                        className="text-[6px] sm:text-[9px] md:text-xs px-2 py-1 sm:px-3 sm:py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-300 transition"
                    >
                        Открыть пост
                    </Link>
                </div>
            </div>
            {   showComments &&
                <CommentPopup postId={props.id} setShowComments={setShowComments}/>
            }
        </>
    )
}

export default Post