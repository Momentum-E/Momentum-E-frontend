import React,{useState} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { VendorCountProp } from '@/utils/props';
import { Modal } from '@/components/shared';

type DeleteVehicleProps = {
    idToken:string|null;
    userId:string|any;
    VendorCounts: VendorCountProp[];
}

const DeleteVehicle:React.FC<DeleteVehicleProps> = ({
    idToken,
    userId,
    VendorCounts,
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [deleteVendor,setDeleteVendor] = useState('')

    // This deletes all the vehicles for a particular vendor_type (eg: Tesla, BMW) 
    function DeleteEntireVendor(vendorName:string){
        axios
        .get(`${process.env.NEXT_PUBLIC_SERVER_ROUTE}/vehicles/delete-entire-vendor/${userId}/${vendorName}`,{
            headers:{
                authorization: `Bearer ${idToken}`
            }
        })
        .then((res) => {
            if(res.status === 204){
                toast.success('Vehicles deleted successfully.')
                // window.location.reload()
            }
            else{
                toast.success("Vehicles deleted successfully.")
                // window.location.reload()
            }
        })
        .catch((err) => {
            toast.error(err);
        });
    }

    function DeleteButton(vendorName:string){
        setIsOpen(true)
        setDeleteVendor(vendorName)
    }

     return (
        <div className='space-y-4 border border-me-green-200 p-4 rounded-xl w-full'>
            <p className='mt-2 text-center text-xl leading-9 text-black dark:text-white-100'>
                Your Vehicle Count
            </p>
            <div className="w-full h-full">
                <table className='table-auto w-full '>
                    <thead className='w-full  border-b-[1px] border-b-me-green-200 dark:border-b-white-200/30'>
                        <tr className=''>
                            <th className=' border-r-[1px] border-r-me-green-200 dark:border-r-white-200/30'>Vendor Name</th>
                            <th className=' border-r-[1px] border-r-me-green-200 dark:border-r-white-200/30'>Number of Connected Cars</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className='w-full'>
                        {
                            VendorCounts.map((vendors,idx) => (
                                <tr className="text-center border-t-[1px] border-t-me-green-200 dark:border-t-white-200/30" key={idx}>
                                    <td className='border-r-[1px] p-2 border-r-me-green-200 dark:border-r-white-200/30'>
                                        {vendors.vendor}
                                    </td>
                                    <td className='border-r-[1px] border-r-me-green-200 dark:border-r-white-200/30'>
                                        {vendors.count}
                                    </td>
                                    <td className='flex '>
                                        <button
                                        type="button" 
                                        onClick={()=>DeleteButton(vendors.vendor)}
                                        className='flex ml-3 mt-1 items-center justify-center hover:bg-me-green-100/70 dark:hover:bg-gray-700/40 rounded-md'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 p-1 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <Modal
                isOpen={isOpen} 
                setIsOpen={setIsOpen} 
                title={`Confirm delete all ${deleteVendor} `}
                content={'This will delete your particular vendor data.'}
                buttonClass={`p-1 rounded-lg border border-red-600 text-red-600`} 
                modalFunction={()=>DeleteEntireVendor(deleteVendor)} 
            />
        </div>
  )
}

export default DeleteVehicle