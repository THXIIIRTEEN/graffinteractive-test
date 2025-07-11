import axios from "axios";
import { useEffect, useState, type SetStateAction } from "react";
import type { IComment } from "../types/types";
import Comment from "./Comment";

interface ICommentPopupProps {
    postId: number,
    setShowComments: React.Dispatch<SetStateAction<boolean>>,
}

const CommentPopup: React.FC<ICommentPopupProps> = ({postId, setShowComments}) => {

    const [ comments, setComments ] = useState<IComment[] | []>([])

    useEffect(() => {
        const getComments = async () => {
            const result = await axios.get(`https://jsonplaceholder.typicode.com/comments`);
            const filter = result.data.filter((comment: IComment) => {
                return comment.postId === postId
            }) 
            setComments(filter)
        }
        getComments()
    }, [postId]);

    return (
        <div className="fixed inset-0 bg-black bg-black/50 flex items-center justify-center z-50" onClick={() => setShowComments(false)}>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-xl w-[90%] max-w-md max-h-[80vh] overflow-y-auto space-y-4" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-semibold mb-2 line-clamp-2">Комментарии</h2>
                <div className="flex flex-col gap-y-4">
                    {
                    comments.map((comment) => (
                        <Comment key={comment.id} {...comment} />
                    ))
                    }
                </div>
            </div>
        </div>
    )
}

export default CommentPopup;