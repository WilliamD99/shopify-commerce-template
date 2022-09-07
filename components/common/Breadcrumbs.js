import React, { useEffect } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "./Link";

export default function CustomBreadcrumbs({ path }) {
  if (!path || path.length === 0) return <></>;

  return (
    <>
      <div className="my-5 px-10">
        <Breadcrumbs className="breadcrumbs">
          {path.map((e, i) => (
            <Link
              className="breadcrumbs-crumb text-lg text-black"
              key={`breadcrumb-${i}`}
              href={e.path}
            >
              {e.name}
            </Link>
          ))}
        </Breadcrumbs>
      </div>
    </>
  );
}
