import { AgoraVideoPlayer } from "agora-rtc-react";
import { useState, useEffect } from "react";

export default function Video(props) {
  const { users, tracks } = props;

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            height: "25rem",
            borderRadius: "0.5rem",
            boxShadow: "2px 2px 5px #000",
            width: "100%",
            border: "0",
          }}
        >
          <AgoraVideoPlayer
            videoTrack={tracks[1]}
            style={{
              height: "25rem",
              borderRadius: "0.5rem",
              boxShadow: "2px 2px 5px #000",
              width: "100%",
              border: "0",
            }}
          />
        </div>
        {users.length > 0 &&
          users.map((user) => {
            if (user.videoTrack) {
              return (
                <div
                  className=""
                  style={{
                    height: "25rem",
                    borderRadius: "0.5rem",
                    boxShadow: "2px 2px 5px #000",
                    width: "100%",
                    border: "0",
                  }}
                >
                  <AgoraVideoPlayer
                    videoTrack={user.videoTrack}
                    key={user.uid}
                    style={{
                      height: "25rem",
                      border: "0",
                      borderRadius: "0.5rem",
                      boxShadow: "2px 2px 5px #000",
                      width: "100%",
                      marginLeft: "1rem",
                    }}
                  />
                </div>
              );
            } else return null;
          })}
      </div>
    </div>
  );
}
