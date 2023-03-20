import { AppContext } from "@/context/AppContext";
import { useState, useContext } from "react";
import styled from "styled-components";

const API_KEY = process.env.NEXT_PUBLIC_CHATGPT_API;

const systemMessage = {
  role: "system",

  //extract html, css and javascript from the message
  //I defined how that ai will send the data
  //instructed that the code will wrap by ---starthtml--- ---endhtml--- (html, for example)
  //wrapping code with ---starthtml--- ---endhtml---, because it will be required while extracting code from message
  content:
    "Write code. Html should be without html, body, head and script tag. Wrap html code with ---starthtml--- ---endhtml---, css code with ---startcss--- ---endcss--- and javascript code ---startjs--- ---endjs---. And ---startcss--- ---endcss--- and javascript code ---startjs--- ---endjs--- will not be between  ---starthtml--- ---endhtml---",
};

const Generator = ({ handleCurrentBuild }) => {
  const [messages, setMessages] = useState([]);

  const [command, setCommand] = useState("");

  const { isGenerating, toggleIsGenerating } = useContext(AppContext);

  const handleOnChangeCommand = (e) => {
    setCommand(e.target.value);
  };

  const handleSend = async () => {
    if (command.trim().length) {
      const newMessage = {
        message: command,
        direction: "outgoing",
        sender: "user",
      };

      const newMessages = [...messages, newMessage];

      setMessages(newMessages);
      toggleIsGenerating();
      await processMessageToChatGPT(newMessages);
    }
  };

  async function processMessageToChatGPT(chatMessages) {
    // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to
    // determine how we want chatGPT to act.
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage, // The system message DEFINES the logic of our chatGPT
        ...apiMessages, // The messages from our chat with ChatGPT
      ],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        // setIsGenerating(false);
        toggleIsGenerating();
        handleCurrentBuild(command, data.choices[0].message.content);
        setCommand("");
      });
  }

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
