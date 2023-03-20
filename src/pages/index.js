import Head from "next/head";
import Editor from "@/componets/Editor";
import Preview from "@/componets/Preview";
import styled from "styled-components";

export default function Home() {
  return (
    <>
      <Head>
        <title>Easy Web Builder</title>
        <meta name="description" content="A basic web builder using ChatGPT" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Editor />
        <Preview />
      </Container>
    </>
  );
}

const Container = styled.main`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 10px;
`;
