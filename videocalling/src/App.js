import { useState } from "react";
import { Button, Text, Box, Image } from "@chakra-ui/react";
import VideoCall from "./VideoCall";
import bg1 from "../src/bg1.jpg";

export default function App() {
  const [inCall, setInCall] = useState(false);

  return (
    <div className="App" style={{ height: "100%" }}>
      {inCall ? (
        <VideoCall setInCall={setInCall} />
      ) : (
        <Box
          style={{
            display: "flex",
            textAlign: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image
            w="100%"
            h="100%"
            position="fixed"
            objectFit="cover"
            src={bg1}
          />
          <Text
            color="#fff"
            mt="14rem"
            justifyContent="center"
            textShadow="2px 2px 0px #000;"
            fontWeight="700"
            fontSize="2rem"
            zIndex="5"
          >
            Welcome to HiiDoc Video conferencing
          </Text>

          <Text
            textShadow="2px 1px 0px #000;"
            color="#fff"
            fontWeight="500"
            fontSize="1rem"
            zIndex="5"
          >
            Click the button below to join a call
          </Text>
          <Button
            color="#fff"
            mt="1rem"
            bgColor="#004887"
            zIndex="5"
            onClick={() => setInCall(true)}
          >
            Join Call
          </Button>
        </Box>
      )}
    </div>
  );
}
