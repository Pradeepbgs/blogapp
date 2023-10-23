import React,{useEffect,useState} from 'react'
import appwriteservice from '../../appwrite/conf'
import {Container, PostCard} from '../index'



function Home() {
    const [posts, setPosts] = useState([])
    useEffect(() =>{
        appwriteservice.getPosts()
        .then((posts) =>{
            if(posts){
                setPosts(posts.documents)
            }
        })
    },[])

  
    if(posts.length === 0){
        return <Container>
            <h1 className='mt-[20%]'>Click Add Post to Create Post</h1>
            
        </Container>
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) =>(
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )


}

export default Home


