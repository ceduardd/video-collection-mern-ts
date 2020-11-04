import axios from 'axios';
import Video from './Video';

const API_URL = 'http://localhost:4000/api';

export const getVideos = async () => {
  const { data } = await axios.get(`${API_URL}/videos`);
  return data.videos;
};

export const getVideo = async (videoId: string) => {
  const { data } = await axios.get(`${API_URL}/videos/${videoId}`);
  return data.foundVideo;
};

export const createVideo = async (video: Video) => {
  const { data } = await axios.post(`${API_URL}/videos`, video);
  return data.savedVideo;
};

export const updateVideo = async (videoId: string, video: Video) => {
  const { data } = await axios.put(`${API_URL}/videos/${videoId}`, video);
  return data.updatedVideo;
};

export const deleteVideo = async (videoId: string) => {
  const { data } = await axios.delete(`${API_URL}/videos/${videoId}`);
  return data.deletedVideo;
};
