import React, { useEffect, useState } from 'react'
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai'
import useCustomerUpdateWishlist from '../../utils/hooks/useCustomerUpdateWishlist'
import { toast } from 'react-toastify'

export default function WishlistButton({list, id, userId}) {
    list = JSON.parse(list)
    let [isInWishlist, setIsInWishlist] = useState(list.some((e) => e === id))
    let updateWishlist = useCustomerUpdateWishlist()

    const handleAddToWishlist = () => {
        if (!isInWishlist) {
            list.push(id)
            updateWishlist.mutate({ list: list, id: userId })
            toast.success("Added to Wishlist")
            setIsInWishlist(true)
        } else {
            let index = list.indexOf(id)
            list.splice(index, 1)
            updateWishlist.mutate({ list: list, id: userId })
            setIsInWishlist(false)
            toast.success("Removed from Wishlist")
        }
    }

  return (
    <>
        <button disabled={updateWishlist.isLoading ? true : false} className='' onClick={handleAddToWishlist}>
            {
                isInWishlist ?
                <AiFillHeart className='text-xl' />
                :
                <AiOutlineHeart className='text-xl' />
            }
        </button>
    </>
  )
}
