import clsx from "clsx";
import Head from "next/head";

export default function Layout({ children, className, ...props }) {
  return (
    <div
      className={clsx(
        "my-0 mx-auto flex min-h-screen max-w-2xl flex-col bg-gray-300",
        className
      )}
      {...props}
    >
      <Head>
        <title>Cometa 💫</title>
        <meta name="description" content="Demo app for Cometa" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      {children}
    </div>
  );
}
