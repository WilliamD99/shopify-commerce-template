import React, { useState, useContext, useEffect } from "react";
import userContext from "../../utils/userContext";
import useCustomerGet from "../../utils/hooks/useCustomerGet";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import useCustomerUpdateWishlist from "../../utils/hooks/useCustomerUpdateWishlist";
import { toast } from "react-toastify";
import { accessTokenExist } from "../../utils/utils";

export default function WishlistButton({ list, id, userId }) {
  let { setUser } = useContext(userContext);
  let getCustomer = useCustomerGet();
  list = JSON.parse(list);
  let [isInWishlist, setIsInWishlist] = useState(list.some((e) => e === id));
  let updateWishlist = useCustomerUpdateWishlist();

  const handleAddToWishlist = () => {
    if (!isInWishlist) {
      list.push(id);
      updateWishlist.mutate({ list: list, id: userId });
      toast.success("Added to Wishlist");
      setIsInWishlist(true);
    } else {
      let index = list.indexOf(id);
      list.splice(index, 1);
      updateWishlist.mutate({ list: list, id: userId });
      setIsInWishlist(false);
      toast.success("Removed from Wishlist");
    }
  };

  useEffect(() => {
    if (getCustomer.data) {
      setUser(getCustomer.data.customer);
    }
  }, [getCustomer.isLoading]);

  useEffect(() => {
    if (
      !updateWishlist.isLoading &&
      updateWishlist.isSuccess &&
      updateWishlist.data
    ) {
      getCustomer.mutate({
        accessToken: accessTokenExist(),
      });
    }
  }, [updateWishlist.isLoading]);

  return (
    <>
      <button
        disabled={updateWishlist.isLoading ? true : false}
        className="n"
        onClick={handleAddToWishlist}
      >
        {isInWishlist ? (
          <AiFillHeart className="text-xl" />
        ) : (
          <AiOutlineHeart className="text-xl" />
        )}
      </button>
    </>
  );
}
