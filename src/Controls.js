import { useState } from "react";
import { useClient } from "./main";
import { Button } from "@chakra-ui/react";

export default function Controls(props) {
  const client = useClient();
  const { tracks, setStart, setInCall } = props;
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  //for muting sound and video
  const mute = async (type) => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  //for leaving video call
  const leaveChannel = async () => {
    await client.leave();
    if (tracks[0]) {
      tracks[0].setEnabled(false);
    }
    if (tracks[1]) {
      tracks[1].setEnabled(false);
    }
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
  };

  //output
  return (
    <div>
      <Button
        justifyItems="flex-end"
        justifyContent="flex-end"
        borderRadius="0rem"
        onClick={() => leaveChannel()}
        bgColor="#000"
        mt="1rem"
        mx="1rem"
        color="red"
        size="sm"
      >
        Leave
      </Button>
      <Button
        borderRadius="0rem"
        bgColor="#004887"
        mx="1rem"
        mt="1rem"
        size="sm"
        color={trackState.audio ? "#fff" : "#000"}
        onClick={() => mute("audio")}
      >
        Mute Audio
      </Button>
      <Button
        borderRadius="0rem"
        bgColor="#004887"
        mx="1rem"
        mt="1rem"
        size="sm"
        color={trackState.video ? "#fff" : "#000"}
        onClick={() => mute("video")}
      >
        Turn Off Video
      </Button>
    </div>
  );
}
