import React from "react";
import Link from "next/link";

export default function NextLink({
  children,
  className,
  style,
  scroll,
  ...props
}) {
  function defaultFunction(e) {
    if (props.href == "#") {
      e.preventDefault();
    }
  }

  return (
    <Link scroll={scroll} {...props}>
      <a className={className} style={style} onClick={defaultFunction}>
        {children}
      </a>
    </Link>
  );
}
