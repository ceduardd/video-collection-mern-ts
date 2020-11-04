import React, { useEffect, useState } from 'react';
import Video from './Video';
import VideoItem from './VideoItem';
import { getVideos } from './VideoService';

const VideoList = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  const loadVideos = async () => {
    const loadedVideos = await getVideos();
    setVideos(loadedVideos);
  };
  useEffect(() => {
    loadVideos();
  }, []);

  return (
    <div className="row">
      {videos.map(video => (
        <VideoItem key={video._id} video={video} loadVideos={loadVideos} />
      ))}
    </div>
  );
};

export default VideoList;
