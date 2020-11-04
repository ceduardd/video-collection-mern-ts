import { RequestHandler } from 'express';
import Video from '../models/Video';

export const getVideos: RequestHandler = async (req, res) => {
  try {
    const videos = await Video.find({});

    if (!videos) {
      return res.status(400).json({
        message: "There aren't videos",
      });
    }

    res.json({
      ok: true,
      videos,
    });
  } catch (error) {
    res.json({
      ok: false,
      error,
    });
  }
};

export const getVideo: RequestHandler = async (req, res) => {
  try {
    const foundVideo = await Video.findById(req.params.videoId);

    if (!foundVideo) {
      return res.status(400).json({
        ok: false,
        message: 'Video not found',
      });
    }

    res.json({
      ok: true,
      foundVideo,
    });
  } catch (error) {
    res.json({
      ok: false,
      error,
    });
  }
};

export const createVideo: RequestHandler = async (req, res) => {
  try {
    const foundVideo = await Video.findOne({ url: { $in: req.body.url } });
    if (foundVideo) {
      return res.json({
        ok: false,
        message: 'The url video already exists',
      });
    }
    const newVideo = new Video(req.body);
    const savedVideo = await newVideo.save();
    res.status(200).json({
      ok: true,
      savedVideo,
    });
  } catch (error) {
    res.json({
      ok: false,
      error,
    });
  }
};

export const updateVideo: RequestHandler = async (req, res) => {
  try {
    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.videoId,
      req.body,
      { new: true }
    );

    if (!updatedVideo) {
      return res.status(400).json({
        ok: false,
        message: 'Video not found',
      });
    }

    res.status(200).json({
      ok: true,
      updatedVideo,
    });
  } catch (error) {
    res.json({
      ok: false,
      error,
    });
  }
};

export const deleteVideo: RequestHandler = async (req, res) => {
  try {
    const deletedVideo = await Video.findByIdAndDelete(req.params.videoId);

    if (!deletedVideo) {
      return res.status(400).json({
        ok: false,
        message: 'Video not found',
      });
    }

    res.json({
      ok: true,
      deletedVideo,
    });
  } catch (error) {
    res.json({
      ok: false,
      error,
    });
  }
};
