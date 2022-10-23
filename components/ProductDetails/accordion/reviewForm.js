import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import useProductPostReviews from "../../../utils/hooks/useProductPostReview";
import { useRouter } from "next/router";

export default function ReviewForm({ productTitle, id }) {
  const [ratingValue, setRatingValue] = useState(5);
  const [contents, setContents] = useState({
    name: "",
    email: "",
    title: "",
    content: "",
  });
  const postReview = useProductPostReviews();

  const handleChangeInput = (e) => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    let title = document.getElementById("review_title").value,
      name = document.getElementById("review_name").value,
      email = document.getElementById("review_email").value,
      content = document.getElementById("review_content").value;

    if (!title || !name || !email || !content) {
      toast.warning("Please fill out all the form");
    } else {
      postReview.mutate({
        name: name,
        email: email,
        title: title,
        content: content,
        score: ratingValue,
        productTitle: productTitle,
        id: id,
      });
    }
  };

  useEffect(() => {
    if (postReview.data && postReview.isSuccess && !postReview.isLoading) {
      toast.success("Thank you for your review!");
    }
  }, [postReview.isLoading]);

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
        <div className="flex flex-row w-full space-x-5">
          <TextField
            id="review_name"
            required
            className="w-full"
            placeholder="Name"
            type="text"
          />
          <TextField
            id="review_email"
            required
            className="w-full"
            placeholder="Email"
            type="email"
          />
        </div>
        <TextField
          id="review_title"
          type="text"
          placeholder="Title"
          required
          className="w-full"
        />
        <TextField
          id="review_content"
          placeholder="Write a review here..."
          className="w-full"
          type="text"
          multiline
          rows={5}
          required
        />
        <div className="flex flex-row items-center justify-between">
          <Rating
            value={ratingValue}
            onChange={(e, newValue) => setRatingValue(newValue)}
          />
          <Button
            className="w-44 text-black border-black hover:text-white hover:bg-black hover:border-white"
            variant="outlined"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </form>
    </>
  );
}
