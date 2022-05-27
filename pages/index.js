import { Box, Container, Input, Stack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
export default function Home() {
  const [messages, setMessages] = useState([
    { text: "Dobrodošli", isBot: true },
    { text: "Kako vam mogu pomoći?", isBot: true },
  ]);

  useEffect(() => {
    messages.filter((message) => !message.isBot).length > 0 &&
      setTimeout(
        () =>
          setMessages([
            ...messages,
            { text: "go fuck yourself.", isBot: true },
          ]),
        500 + Math.random() * 1500
      );
  }, [messages.filter((message) => !message.isBot).length]);

  return (
    <Container
      h="100vh"
      display="flex"
      flexDirection="column"
      overflowY="scroll"
    >
      <Stack marginBottom={"8"} flexGrow="1" justifyContent={"flex-end"}>
        {messages.map((message) => (
          <ChatBubble isBot={message.isBot}>{message.text}</ChatBubble>
        ))}
      </Stack>
      <Box
        pb={8}
        as="form"
        position="sticky"
        bottom={0}
        bg="white"
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          setMessages([...messages, { text: formData.get("message") }]);
          event.currentTarget.reset();
        }}
      >
        <Input name="message" placeholder="Type a message" />
      </Box>
    </Container>
  );
}

const ChatBubble = ({ children, isBot }) => {
  return (
    <Box
      background={isBot ? "gray.200" : "purple.400"}
      alignSelf={isBot ? "flex-start" : "flex-end"}
      color={isBot ? "purple.900" : "white"}
      paddingX={"3"}
      paddingY="1"
      borderRadius={"32"}
      borderBottomRightRadius="8"
      boxShadow="md"
    >
      {children}
    </Box>
  );
};
