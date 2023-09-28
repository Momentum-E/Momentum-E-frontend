import React,{useEffect, useState} from 'react'
import Image from 'next/image'
import axios from 'axios'
import { toast } from 'react-toastify';

type UploadUserImageProps ={
    userId:string;
    userImage:string|null;
}

const postImage = async ({image, imageType, userId}:any)  => {
    const formData = new FormData();
    formData.append("image", image)
    formData.append("type", imageType)
    formData.append("imageName", userId)
  
    const result = await axios.post('http://localhost:5000/auth/users/image', formData,
    { headers: 
        {
            'Content-Type': 'multipart/form-data'
        }
    })
    return result.data
}

const UploadUserImage = ({
    userId,
    userImage,
}:UploadUserImageProps) => {

    const [error, setError] = useState('')
    const [file, setFile] = useState()
    const [image, setImage] = useState("")

    const onSelectFile = async (event:any) => {
        // user image 
        const image_file = event.target.files[0]
        const fileType = ['image/jpg','image/jpeg','image/png']
        const image_file_type = image_file.type

        if(!fileType.includes(image_file_type)){
            setError('Please select a valid file type')
            toast.error(error)
            toast.error('Please select a valid file type')
            return
        }

        setFile(image_file)
        // console.log(file)
        // const result = await postImage({image: file, image_file_type, userId})
        // console.log(result)

        const extension = image_file_type.split('/')[1]
        // Request will be sent from here to server
        const response:string= await axios.post('http://localhost:5000/auth/users/image',
            {
                // image: file,
                imageName: `${userId}.${extension}`,
                type: image_file_type
            }
        );
        console.log(response)

        if(response){
            const form = new FormData()
            form.append(userId,image_file)
            
            let config = {
                method: 'put',
                url: response,
                // headers: { 
                //   'Content-Type': image_file_type,
                // },
                data : image_file
              };
              
              axios.request(config)
              .then((response) => {
                console.log(JSON.stringify(response.data));
              })
              .catch((error) => {
                console.log(error);
              });
        } 
        else {
            toast.error('Could not upload image.');
        }
    }
    // const convertToBase64 = (file:Blob) => {
    //     return new Promise(resolve => {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         reader.onload = () => {
    //             resolve(reader.result);
    //         }
    //     })
    // }
 
    return (
        <div className="group relative flex items-center justify-center rounded-full border-2 border-black dark:border-white-100 w-40 h-40">
            {
                userImage ?
                    <Image  
                        className="rounded-full"
                        src={image}
                        alt="User Image"
                        width={160}
                        height={160}
                    />
                :
                    <div className="flex items-center justify-center w-full h-full rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                    </div>
            }
            <div className="absolute hidden group-hover:flex items-center justify-center group-hover:bg-black/20 rounded-full w-40 h-40">
                <label className='border-2 dark:border-white-100 border-black bg-me-green-200 w-14 h-14 rounded-full cursor-pointer flex items-center justify-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-black dark:text-white-100 w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                    </svg>
                    <input 
                    className='hidden' 
                    accept="image/*"
                    onChange={(e) => onSelectFile(e)}
                    name='image' 
                    id='image' 
                    type="file" 
                    />
                </label>
            </div>           
        </div>
  )
}

export default UploadUserImage