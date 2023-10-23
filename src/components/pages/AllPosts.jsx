import React,{useState,useEffect} from 'react'
import appwriteservice from '../../appwrite/conf' // we are importing service from appwrite/conf as appwriteservice

import {PostCard, Container} from '../index'


function AllPosts() {
    const [posts, setPosts] = useState([])

    useEffect(()=>{

      appwriteservice.getPosts([])
    .then((posts) => {
        if(posts){
            setPosts(posts.documents)
        }
    })
    .catch((error) => (
        console.log("appwrite error:: getAllPosts ", error)
    ))
    },[])

  if(posts.length === 0){
    return (<div className='mt-[20%] '>
    <div>No Post  to show here</div>
    <div>Please write something...</div>
    </div>
    )
  }    

  return  (
    <div className='w-full py-8 '>
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

export default AllPosts
