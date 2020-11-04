import React from 'react';
import Video from './Video';
import ReactPlayer from 'react-player';
import './VideoItem.css';
import { useHistory } from 'react-router-dom';
import { deleteVideo } from './VideoService';

interface Props {
  video: Video;
  loadVideos: () => void;
}

const VideoItem = ({ video, loadVideos }: Props) => {
  const history = useHistory();

  const handleDelete = async (videoId: string) => {
    await deleteVideo(videoId);
    await loadVideos();
  };

  return (
    <div className="col-md-4 p-2">
      <div
        className="card card-body video-card animate__animated animate__backInUp"
        style={{ cursor: 'pointer' }}
      >
        <div className="d-flex justify-content-between">
          <h5 onClick={() => history.push(`/update/${video._id}`)}>
            {video.title}
          </h5>
          <span
            onClick={() => video._id && handleDelete(video._id)}
            className="text-danger"
          >
            X
          </span>
        </div>
        <p>{video.description}</p>
        <div className="embed-responsive embed-responsive-16by9">
          <ReactPlayer url={video.url} />
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
