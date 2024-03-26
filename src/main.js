import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "de01b90b16234af9a43f94406b56e771";
const token =
  "007eJxTYHBaZaz0Y+vhfMFnaXc7au5/6rw7X0u6puB04o6aTatjg5UVGFJSDQyTLA2SDM2MjE0S0ywTTYzTLE1MDMySTM1Szc0N2aSZ0hoCGRmcnrGyMjJAIIjPx5Cqm5yfV1yaU5JYkpmfx8AAAM+WIrk=";
//defining config fr rtc engine
export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const channelName = "e-consultation";

export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
