import { useState, useEffect } from "react";

const systemMessage = {
  role: "system",

  //extract html, css and javascript from the message
  //I defined how that ai will send the data
  //instructed that the code will wrap by ---starthtml--- ---endhtml--- (html, for example)
  //wrapping code with ---starthtml--- ---endhtml---, because it will be required while extracting code from message
  content:
    "Write code. Html should be without html, body, head and script tag. Wrap html code with ---starthtml--- ---endhtml---, css code with ---startcss--- ---endcss--- and javascript code ---startjs--- ---endjs---. And ---startcss--- ---endcss--- and javascript code ---startjs--- ---endjs--- will not be between  ---starthtml--- ---endhtml---",
};
interface IMessageObject {
  sender: string;
  message: string;
}

interface IMesssageWithChatGPTReturn {
  content: string;
  isLoading: boolean;
  error: string;
  refetch: () => void;
  removeContent: () => void;
}

const useMessageWithChatGPT = (
  messages: IMessageObject[],
  apiKey: string
): IMesssageWithChatGPTReturn => {
  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [messageChanged, setMessageChanged] = useState<boolean>(false);

  const refetch = (): void => {
    setMessageChanged(true);
  };

  const removeContent = (): void => {
    setContent(null);
  };

  useEffect(() => {
    // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = messages.map((messageObject) => {
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

    const fetchMessages = async (): Promise<void> => {
      try {
        const response = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: "Bearer " + apiKey,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(apiRequestBody),
          }
        );
        const responseData = await response.json();
        setContent(responseData.choices[0].message.content);

        // setData(responseData);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
      setMessageChanged(false);
    };

    if (messages.length && messageChanged) {
      setIsLoading(true);
      fetchMessages();
    } else {
      setIsLoading(false);
    }
  }, [messages, apiKey, messageChanged]);

  return { content, isLoading, error, refetch, removeContent };
};

export default useMessageWithChatGPT;
