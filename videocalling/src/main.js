import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "de01b90b16234af9a43f94406b56e771";
const token =
  "007eJxTYBCPq/e88+fMR/93X/I0fZv6t1ptvRgSGxvS/LC6t5PB/Y8CQ0qqgWGSpUGSoZmRsUlimmWiiXGapYmJgVmSqVmqublhejBDWkMgI8O/7QyMjAwQCOLzMaTqJufnFZfmlCSWZObnMTAAAAGdI+Y=";
//defining config fr rtc engine
export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const channelName = "e-consultation";

export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
