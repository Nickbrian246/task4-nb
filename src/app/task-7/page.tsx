"use client";
import { Box } from "@mui/material";
import React from "react";

import {
  Chat,
  Channel,
  ChannelList,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  useCreateChatClient,
  ChannelSearch,
  VirtualizedMessageList,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY as string;
const userId = "nb-jm";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoibmItam0ifQ.WRaVS2l3un8LFcBcZaIWqZU0WUFv1BDDRxfEpjSDfEY";

const filters = { members: { $in: [userId] } };
const options = { presence: true, state: true };
const sort = { last_message_at: "desc" };
const App = () => {
  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: token,
    userData: { id: userId },
  });

  if (!client) return <div>Loading...</div>;

  return (
    <Chat client={client}>
      <Box sx={{ display: "flex", height: "95vh", padding: "10px" }}>
        <Box sx={{ flexGrow: "1" }}>
          <ChannelList
            filters={{ members: { $in: [userId] } }}
            options={options}
            showChannelSearch
            sendChannelsToList
            allowNewMessagesFromUnfilteredChannels
          />
        </Box>
        <Box sx={{ flexGrow: "9" }}>
          <Channel>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
            </Window>
            <Thread />
          </Channel>
        </Box>
      </Box>
    </Chat>
  );
};
export default App;
