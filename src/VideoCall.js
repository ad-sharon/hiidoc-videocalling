import { useState, useEffect } from "react";
import {
  config,
  useClient,
  useMicrophoneAndCameraTracks,
  channelName,
} from "./main.js";
import Video from "./Video.js";
import Controls from "./Controls";
import { Button, Text, Box, Input } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faCircleUser } from "@fortawesome/free-solid-svg-icons";

// display all video feeds
export default function VideoCall(props) {
  const { setInCall } = props;

  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks(); //give us audio and video tracks

  useEffect(() => {
    //initialize the sdk
    let init = async (name) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });

      client.on("user-unpublished", (user, mediaType) => {
        if (mediaType === "audio") {
          if (user.audioTrack) user.audioTrack?.stop();
        }
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      await client.join(config.appId, name, config.token, null);

      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };

    if (ready && tracks) {
      try {
        init(channelName);
      } catch (error) {
        console.log(error);
      }
    }
  }, [channelName, client, ready, tracks]);

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <div style={{ display: "flex" }}>
          <FontAwesomeIcon style={{ margin: "0.5rem" }} icon={faVideo} />
          <Text mt="0.2rem" fontWeight="600">
            HiiDoc
          </Text>
        </div>

        <div
          style={{
            display: "flex",
          }}
        >
          <Text alignItems="right" fontSize="0.8rem" mt="0.4rem">
            Sharon Jones
          </Text>

          <FontAwesomeIcon style={{ margin: "0.5rem" }} icon={faCircleUser} />
        </div>
      </div>

      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            boxShadow: "2px 2px 2px 2px #000",
          }}
        >
          <div style={{ display: "flex", width: "100%" }}>
            <div style={{ width: "70%" }}>
              <div style={{ display: "flex" }}>
                <Text mt="1rem" mx="1rem">
                  E-consultation Room
                </Text>
                {ready && tracks && (
                  <Controls
                    tracks={tracks}
                    setStart={setStart}
                    setInCall={setInCall}
                  />
                )}
              </div>

              <Box
                mx="1rem"
                my="1rem"
                display="flex"
                style={{ width: "100%", border: "0" }}
              >
                <Box
                  mr="1rem"
                  borderRadius="0.5rem"
                  style={{
                    boxShadow: "2px 2px 5px #000",
                    width: "100%",
                    border: "0",
                    height: "25rem",
                  }}
                >
                  {start && tracks && <Video tracks={tracks} users={users} />}
                </Box>
              </Box>
            </div>

            <div style={{ width: "30%", marginLeft: "2rem" }}>
              <Box boxShadow={"2px 2px 2px 2px #000"} minHeight="100%">
                <Text ml="1rem" pt="1rem" mb="1rem" fontWeight="600">
                  Chat
                </Text>
                <Box
                  borderRadius="0.5rem"
                  style={{
                    boxShadow: "2px 2px 5px #000",
                    width: "90%",
                    margin: "auto",
                    borderRadius: "0.8rem",
                    height: "20rem",
                  }}
                >
                  {}
                </Box>

                <div
                  style={{
                    display: "flex",
                    margin: "1rem",
                  }}
                >
                  <Input
                    boxShadow="2px 2px 5px #000"
                    borderRadius="none"
                    placeholder="Type a message..."
                    size="sm"
                  ></Input>
                  <Button
                    bgColor="green"
                    color="#000"
                    borderRadius="0.2rem"
                    ml="1rem"
                    size="sm"
                  >
                    Send
                  </Button>
                </div>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
