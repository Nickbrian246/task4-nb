import {
  CallControls,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-sdk";
import { MyVideoUI } from "./components/MyVideo";
import "@stream-io/video-react-sdk/dist/css/styles.css";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY as string;
const userId = "nb-jm";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoibmItam0ifQ.WRaVS2l3un8LFcBcZaIWqZU0WUFv1BDDRxfEpjSDfEY";

const user: User = { id: userId };

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call("default", "my-first-call");
call.join({ create: false });

export const MyVideoCall = () => {
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <StreamTheme>
          <SpeakerLayout />
          <CallControls />
        </StreamTheme>
      </StreamCall>
    </StreamVideo>
  );
};
