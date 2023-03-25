import { useContext } from "react";
import Head from "next/head";
import styled from "styled-components";
import Editor from "@/componets/Editor";
import Preview from "@/componets/Preview";
import Loader from "@/componets/Loader";
import FindInGithub from "@/componets/FindInGithub";
import { AppContext } from "@/context/AppContext";

const Home = (): JSX.Element => {
  const { isGenerating } = useContext(AppContext);
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <Head>
        <title>cGPT Web Builder</title>
        <meta name="description" content="A basic web builder using ChatGPT" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Editor />
        <Preview />
      </Container>
      {isGenerating ? (
        <Loader
          texts={[
            "Generating...",
            "Wait few seconds",
            "Patience! Patience! Patience!",
            "Almost There!",
          ]}
        />
      ) : null}
      <FindInGithub />
    </div>
  );
};

const Container = styled.main`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 20px;
  position: relative;
`;

export default Home;
