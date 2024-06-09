"use client";

import '@livekit/components-styles';
import {
  LiveKitRoom,
  VideoConference,
  GridLayout,
  ParticipantTile,
  useTracks,
  RoomAudioRenderer,
  ControlBar,
} from '@livekit/components-react';
import { Track } from 'livekit-client';
import { useContext, useEffect, useState } from 'react';
import { getToken } from '@/lib/callapi';
import { serverContext } from '@/lib/context';
import { Loader2 } from 'lucide-react';

export default function PageVideo({room}:{room:any}) {
  const [token, setToken] = useState("");
  const [video, setVideo] = useState<boolean>(false);
  const [voice, setVoice] = useState<boolean>(false);
  const {channel} = useContext(serverContext);
  const getTokenVideo = async () =>{
    const result = await getToken(room);
    if(result){
      setToken(result);
    }
  } ;
  useEffect(() => {
    if(channel?._id){
      if(channel.type == "video"){
        setVideo(true);
      }else{
        setVoice(true);
      }
    }
    if(room){
      getTokenVideo();
    }
  }, []);


  if (token === "") {
    return <Loader2  className='animate-spin mt-[30%] ml-[50%]' size={40}/>;
  }

  return (
    <LiveKitRoom
      video={video}
      audio={voice}
      token={token}
      serverUrl="wss://discord-clone-9yil2f8o.livekit.cloud"
      data-lk-theme="default"
      style={{ height: '100vh'  }}
      className='w-full '
    >
      <VideoConference/>
      {/* <MyVideoConference /> */}
      <RoomAudioRenderer />
      {/* <ControlBar />  */}
    </LiveKitRoom>
  );
}

function MyVideoConference() {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false },
  );
  return (
    <GridLayout tracks={tracks} style={{ height: 'calc(100vh - var(--lk-control-bar-height))' }}>
      <ParticipantTile />
    </GridLayout>
  );
}