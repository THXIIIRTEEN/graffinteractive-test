import { useEffect, useRef, useState } from 'react'
import axios from "axios"
import type { IPost } from '../types/types';
import Post from '../components/Post';
import { motion, AnimatePresence } from "framer-motion";

const Home: React.FC = () => {
  const [ posts, setPosts ] = useState<IPost[] | []>([]);
  const [ filteredPosts, setFilteredPosts ] = useState<IPost[] | []>([]);
  const [ search, setSearch ] = useState<string>("");
  const [ isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const [ isSearching, setIsSearching ] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const lastPost = useRef(null)

  const limit = 12;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    let filter = posts.filter((post) => {
      return post.title.includes(search)
    });
    filter = filter.slice(0, limit)
    setFilteredPosts(filter)
    setIsSearching(false)
  };

  useEffect(() => {
    const getPosts = async () => {
      const result = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
      setPosts(result.data)
    }
    getPosts();
  }, []);

  useEffect(() => {
    if (!lastPost.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
      }
    }, {
      rootMargin: '0px',
      threshold: 1.0 
    });
    const current = lastPost.current;
    if (current !== null) {
      observer.observe(current);
    }
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [filteredPosts]);

  useEffect(() => {
    const fetchMorePosts = async () => {
      setIsLoadingMore(true);
      await new Promise(resolve => setTimeout(resolve, 3000));
      let filter = posts.filter((post) => {
        return post.title.includes(search)
      });
      const newLimit = limit + filteredPosts.length;
      filter = filter.slice(filteredPosts.length, newLimit);
      if (filter.length > 0) {
        setFilteredPosts(prev => [...prev, ...filter]);
      }
      setIsLoadingMore(false);
      setIsIntersecting(false);
    }
    if (isIntersecting) {
      fetchMorePosts();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIntersecting]);

  useEffect(() => {
    if (!search.trim()) {
      setIsSearching(true)
    }
  }, [search]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col items-center w-screen h-screen">
      <form className="w-full sticky top-0 z-10 bg-white shadow-md py-2 px-52 flex items-center justify-center gap-4" onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск постов"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="px-4 py-2 bg-blue-600 rounded-lg shadow hover:bg-blue-700 text-blue-500 hover:underline text-sm transition" type="submit">Ок</button>
      </form>
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4 p-6 overflow-x-hidden overflow-y-auto">
        <AnimatePresence>
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              exit={{ opacity: 0, y: -20 }}
              ref={index === filteredPosts.length - 1 ? lastPost : undefined}
              layout
            >
              <Post props={post} />
            </motion.div>
          ))}
        </AnimatePresence>
        { filteredPosts.length === 0 && search && !isSearching &&
          <p className="col-span-full justify-self-center self-center">Ничего не найдено</p>
        }
        {isLoadingMore && (
          <div className="flex justify-center col-span-full">
            <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default Home
