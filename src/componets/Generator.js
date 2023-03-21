import { AppContext } from "@/context/AppContext";
import useMessageWithChatGPT from "@/hooks/useMessageWithChatGPT";
import { useState, useContext, useEffect } from "react";
import styled from "styled-components";

const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

const Generator = ({ handleCurrentBuild }) => {
  const [messages, setMessages] = useState([]);
  const [command, setCommand] = useState("");

  const { isGenerating, toggleIsGenerating } = useContext(AppContext);

  const { content, isLoading, error, refetch, removeContent } =
    useMessageWithChatGPT(messages, API_KEY);

  const handleSend = async () => {
    if (command.trim().length) {
      const newMessage = {
        message: command,
        direction: "outgoing",
        sender: "user",
      };

      const newMessages = [...messages, newMessage];
      setMessages(newMessages);

      refetch();
    }
  };

  useEffect(() => {
    toggleIsGenerating(isLoading);
    if (content && !error) {
      handleCurrentBuild(command, content);
      removeContent();
      setCommand("");
    }
  }, [isLoading, content, error]);

  const handleOnChangeCommand = (e) => {
    setCommand(e.target.value);
  };

  return (
    <Container>
      <Textarea
        placeholder="Write what you want to build"
        value={command}
        onChange={handleOnChangeCommand}
      />
      <ButtonGroup>
        {isGenerating ? (
          <button disabled>Generating</button>
        ) : (
          <button onClick={handleSend}>Generate</button>
        )}
      </ButtonGroup>
    </Container>
  );
};

const Container = styled.div`
  padding: 10px;
  width: 100%;
  background-color: #f2f1f0;
`;

const Textarea = styled.textarea`
  height: 150px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  resize: none;
  font-size: 20px;
  font-family: "Arial", sans-serif;
  width: -webkit-fill-available;

  &:focus {
    outline: none;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;

  button {
    background-color: #fff;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    color: #555;
    cursor: pointer;
    font-size: 16px;
    font-family: "Arial", sans-serif;
    margin: 0px 5px;
    padding: 10px 20px;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: #555;
      color: #fff;
    }
  }
`;

export default Generator;
