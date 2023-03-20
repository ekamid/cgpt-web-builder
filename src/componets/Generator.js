import { useEffect, useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_CHATGPT_API;

const systemMessage = {
  role: "system",

  //instructions for what will be displayed
  //wrapping code with ---starthtml--- ---endhtml---, because it will be required while extracting code from message
  content:
    "only show html css and javascript in seperate part. Wrap html code with ---starthtml--- ---endhtml---, css code with ---startcss--- ---endcss--- and javascript code ---startjs--- ---endjs---",
};

const Generator = ({ handleCurrentBuild }) => {
  const [messages, setMessages] = useState([]);

  const [command, setCommand] = useState("");

  const [isTyping, setIsTyping] = useState(false);

  const handleOnChangeCommand = (e) => {
    setCommand(e.target.value);
  };

  const handleSend = async (message) => {
    const newMessage = {
      message: command,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
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
    // and the messages which we formatted above. We add a system message in the front to'
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
        setIsTyping(false);
        handleCurrentBuild(data.choices[0].message.content);
        // setMessages([
        //   ...chatMessages,
        //   {
        //     message: data.choices[0].message.content,
        //     sender: "ChatGPT",
        //   },
        // ]);
        // setIsTyping(false);
      });
  }

  //   useEffect(() => {
  //     console.log(messages);
  //   }, [messages]);

  return (
    <div>
      <div className="form-group mx-sm-3 mb-2 d-flex gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Write what you want to build"
          value={command}
          onChange={handleOnChangeCommand}
        />
        {isTyping ? (
          <button disabled>Generating</button>
        ) : (
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSend}
          >
            Send
          </button>
        )}
      </div>
    </div>
  );
};

export default Generator;
