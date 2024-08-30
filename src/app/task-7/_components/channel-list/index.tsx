import React from "react";
import { ChannelList as Channel, ChannelListProps } from "stream-chat-react";
interface Props extends ChannelListProps {}
export default function ChannelList(props: Props) {
  return <Channel {...props} />;
}
