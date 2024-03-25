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

  // const audio_mute = document.getElementById("audio_mute");
  // audio_mute.addEventListener("click", () => {
  //   if (audio_mute.textContent === "Mute audio") {
  //     audio_mute.textContent = "Unmute audio";
  //   } else {
  //     audio_mute.textContent = "Mute audio";
  //   }
  // });
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
        id="audio_mute"
        borderRadius="0rem"
        bgColor="#004887"
        mx="1rem"
        mt="1rem"
        size="sm"
        color={trackState.audio ? "#fff" : "#000"}
        onClick={() => mute("audio")}
      >
        {trackState.audio ? "Mute Audio" : "Unmute audio"}
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
        {trackState.video ? "Turn Off Video" : "Turn On Video"}
      </Button>
    </div>
  );
}
