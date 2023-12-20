import React from 'react'
import axios from 'axios'
import { UserImage } from './UserImage';
import { toast } from 'react-toastify';

type UploadUserImageProps = {
    idToken:string|null;
    userId:string|null;
    userImage:string;
    isImageLoading:boolean;
    fetchUserImage:() => Promise<void>;
    setUserImage:React.Dispatch<React.SetStateAction<string>>
}

const UploadUserImage:React.FC<UploadUserImageProps> = ({
    idToken,
    userId,
    userImage,
    isImageLoading,
    fetchUserImage,
    setUserImage
}) => {
    const onSelectFile = async (event:any) => {
        
        const imageFile = event.target.files[0]
        const fileType = ['image/jpg','image/jpeg','image/png']
        const imageFileType = imageFile.type
        
        if(!imageFile){
            toast.info('please select an image.')
        }

        if(!fileType.includes(imageFileType)){
            toast.error('Please select a valid file type (jpg, jpeg, or png).')
            return
        }

        let config = {
            method:"post",
            url:`${process.env.NEXT_PUBLIC_SERVER_ROUTE}/user-data/users/image`,
            headers:{
                authorization: `Bearer ${idToken}`,
            },
            data:{
                imageName: userId,
                type: `image/${imageFileType}`,
            }
        }
        // const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_ROUTE}/user-data/users/image`,data,AxiosHeaders)
        const response = await axios.request(config)
        const put_url = response.data
        console.log(put_url)

        if(put_url)
        {
            const config = {
                headers: {
                  'Content-Type': imageFile,
                },
              };
      
              // PUT request with the selected image file
              axios.put(put_url, imageFile, config)
              .then((response) => {
                console.log(response);
                toast.success('Image changed successfully.');
                // setSelectedFile(null)
                console.log("in the then statement. fetching user Image")
                fetchUserImage()
              })
              .catch((error) => { 
                console.log(error);
                toast.error('Could not upload image.');
                // return
              })
        } 
        else{
            console.log('No URL received in put statement.')
        }
    }

    const removeImage = async () => {
        axios.delete(`${process.env.NEXT_PUBLIC_SERVER_ROUTE}/user-data/users/image/${userId}`,{
            headers:{
                authorization:`Bearer ${idToken}`
            }
        })
        .then((res)=>{
            console.log('User image deleted from s3: '+res.data)
            setUserImage('')
        })
        .catch((err)=>{
            console.log('Error deleting user image from s3: '+err)
        })
    }

    return (
        <div className="group relative flex items-center justify-center rounded-full border-2 border-black dark:border-white-100 w-40 h-40">
            <UserImage 
                userImage={userImage}
                isLoading={isImageLoading}
                imageWidth={160}
                imageHeight={160}
                svgClassName={'w-20 h-20'}
                imageSize={'w-40 h-40'}
                loaderSize={24}
            />
            <div className="absolute hidden border dark:border-white-100 border-black group-hover:flex items-center justify-center group-hover:bg-black/20 rounded-full w-40 h-40">
                <div className="p-1 flex bg-gray-900 rounded-r-full rounded-l-full">
                    <label className='hover:bg-me-green-200 p-1 rounded-full cursor-pointer flex items-center justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white-100 w-6 h-6">
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
                    <button
                        onClick={removeImage}
                        type="button"
                        className=' hover:bg-me-green-200 p-1 rounded-full cursor-pointer flex items-center justify-center'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white-100 w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>           
        </div>
  )
}

export default UploadUserImage