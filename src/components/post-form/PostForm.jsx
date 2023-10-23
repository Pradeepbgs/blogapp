import React,{useCallback, useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {RTE,Button,Input, Select,} from '../index'
import appwriteservice from '../../appwrite/conf'  // we are importing service as appwriteservice from appwrite conf file.
import { useNavigate } from 'react-router-dom'
import {  useSelector } from 'react-redux'
import Rolling from "../../assets/Rolling-1s-200px.svg"

function PostForm({post}) {
  const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)
    const {register,handleSubmit, watch, setValue, control,getValues} = useForm({
      defaultValues:{
          title:post?.title || "",
          slug:post?.slug || "",
          content:post?.content || "",
          status:post?.status || "active"
      }
  })


    
    const submit = async(data) =>{
      setLoading(true)
        if(post){
          const file = data.image[0] ? appwriteservice.uploadFile(data.image[0]) : null;
          if(file){
            appwriteservice.deleteFile(post.featuredImage)
          }

          const dbPost = await appwriteservice.updatePost(post.$id,{
            ...data,
            featuredImage: file ? file.$id : undefined,
          })
          if(dbPost){
            navigate(`/post/${dbPost.$id}`)
          }
        } else{
          const file = await appwriteservice.uploadFile(data.image[0])
          
          if(file){
            const fileId = file.$id;
            data.featuredImage = fileId
            const dbPost = await appwriteservice.createPost({
              ...data,
              userId: userData.$id
            })
            if(dbPost){
              navigate(`/post/${dbPost.$id}`)
          }
        }

    }
    setLoading(false)
  }

    const slugTransform = useCallback((value) => {
      if(value && typeof value === "string"){
         return value
         .trim()
         .toLowerCase()
         .replace(/[^a-zA-Z\d\s]+/g, "-")
         .replace(/\s/g, '-')
      }
      return '';
    },[])

    useEffect(() =>{
      const subscription = watch((value,{name}) =>{
        if(name === "title"){
        setValue('slug',slugTransform(value.title),{shouldValidate:true })
        }
      })

      return () =>{
        subscription.unsubscribe()
      }
    },[watch, slugTransform, setValue])

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap mt-20">
    <div className="w-2/3 px-2">
        <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
        />
        <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
            }}
        />
        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
        
      {
        loading ? (
          <div className='absolute top-[20%] left-[43%]'>
            <img src={Rolling} alt='wait...' className='w-[100%]' />
          </div>
        ) : null
      }

    </div>
    <div className="w-1/3 px-2">
        <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
        />
        {post && (
            <div className="w-full mb-4">
                <img
                    src={appwriteservice.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="rounded-lg"
                />
            </div>
        )}
        <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
        />
        <Button 
        disabled={loading}
        type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
            {post ? "Update" : "Submit"}
        </Button>
    </div>
</form>
  )
}

export default PostForm
