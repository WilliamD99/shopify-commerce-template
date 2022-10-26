import React from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";

export default function Pagination({
  isPrevious,
  isNext,
  cursorFirst,
  cursorLast,
  // setDirection,
}) {
  const router = useRouter();
  const routerQuery = router.query;

  const handlePaginateClick = async (direction, cursor) => {
    scroll(0, 0);
    // await setDirection(direction);
    routerQuery.cursor = cursor;
    routerQuery.direction = direction
    router.push(
      {
        pathname: window.location.pathname,
        query: routerQuery,
      },
      undefined
    );
  };

  if (!isNext && !isPrevious) return <></>;

  return (
    <div className="flex justify-center items-center space-x-5 mt-5">
      <Button
        disabled={!isPrevious}
        onClick={async () => {
          handlePaginateClick(false, cursorFirst);
        }}
        className=""
      >
        Prev
      </Button>
      <Button
        disabled={!isNext}
        onClick={async () => {
          handlePaginateClick(true, cursorLast);
        }}
        className=""
      >
        Next
      </Button>
    </div>
  );
}
