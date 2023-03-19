import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Editor from "@/componets/Editor";
import Preview from "@/componets/Preview";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Easy Web Builder</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="row">
          <div className="col-4">
            <Editor />
          </div>
          <div className="col-8">
            <Preview />
          </div>
        </div>
      </main>
    </>
  );
}
