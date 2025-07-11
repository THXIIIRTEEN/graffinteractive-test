import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { type IComment, type IPost } from '../types/types';
import Comment from '../components/Comment';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PostPage: React.FC = () => {
    const { id } = useParams();

    const [ post, setPost ] = useState<IPost | null>(null);
    const [ comments, setComments ] = useState<IComment[] | []>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getPost = async () => {
            if (id) {
                const result = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
                
                const filter = result.data.filter((post: IPost) => {
                    return post.id === Number(id)
                })
                setPost(filter[0])
            }
        }
        getPost();
    }, [id]);

    useEffect(() => {
        const getComments = async () => {
            const result = await axios.get(`https://jsonplaceholder.typicode.com/comments`);
            const filter = result.data.filter((comment: IComment) => {
                return comment.postId === Number(id)
            }) 
            setComments(filter)
        }
        getComments()
    }, [id]);

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-20 lg:px-40 flex flex-col gap-8">
            <button onClick={() => navigate(-1)} className="mb-4 text-blue-600">← Назад к поиску</button>
            { post ?
                <>
                <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
                    <p className="text-sm text-gray-500">{post.id}</p>
                    <h1 className="text-2xl font-bold text-gray-900">{post.title}</h1>
                    <p className="text-gray-700">{post.body}</p>
                </div>
                <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Комментарии</h2>
                    <div className="space-y-4">
                    {comments.map((comment) => (
                        <Comment key={comment.id} {...comment} />
                    ))}
                    </div>
                </div>
                </>
                :
                <p className="text-center text-gray-500">Ничего не найдено</p>
            }
        </div>
    )
}

export default PostPage;