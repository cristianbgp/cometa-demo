import Head from "next/head";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-300">
      <Head>
        <title>Create Next App</title>
      </Head>
      {children}
    </div>
  );
}
