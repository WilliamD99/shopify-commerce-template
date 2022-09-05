import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="">
        <Head>
          <base href={process.env.PUBLIC_URL} />
        </Head>
        <body className="relative">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}