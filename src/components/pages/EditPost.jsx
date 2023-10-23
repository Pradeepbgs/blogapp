import React,{useEffect,useState} from 'react'
import {Container,PostForm} from '../index'
import appwriteservice from '../../appwrite/conf' // we are importing service from appwrite/conf as appwriteservice
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
  const [post, setPosts] = useState(null)
  const {slug} = useParams()
  const navigate = useNavigate()
  useEffect(() =>{
      if(slug){
        appwriteservice.getPost(slug).then((post) =>{
          if(post){
            setPosts(post)
          }
        })
      } else{
        navigate("/")
      }
  },[slug, navigate])

  return post ? (
    <div className='py-8'>
      <Container>
        <PostForm  post={post} />
      </Container>
    </div>
  ): null
}

export default EditPost
