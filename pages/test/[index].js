import React from "react";
import {
  productHandleGenerate,
  productByHandle,
} from "../../lib/serverRequest";

export default function Index({ data }) {
  console.log(data);
  return <div>Index</div>;
}

export async function getStaticProps({ params }) {
  let data = await productByHandle(params.index);
  return {
    props: {
      data: data,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const data = await productHandleGenerate();
  let paths = data.data.products.edges.map((handle) => ({
    params: { index: handle.node.handle },
  }));

  return {
    paths,
    fallback: false,
  };
}
