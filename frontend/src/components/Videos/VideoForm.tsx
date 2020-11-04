import React, {
  ChangeEvent,
  FormEvent,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Video from './Video';
import { createVideo, getVideo, updateVideo } from './VideoService';
import { toast } from 'react-toastify';

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

interface Params {
  videoId: string;
}

const VideoForm = () => {
  const initialState = {
    title: '',
    url: '',
    description: '',
  };

  const params = useParams<Params>();

  const loadVideo = useCallback(async () => {
    const video = await getVideo(params.videoId);
    const { title, url, description } = video;
    setVideo({
      title,
      url,
      description,
    });
  }, [params]);

  useEffect(() => {
    if (params.videoId) {
      loadVideo();
    }
  }, [params, loadVideo]);

  const history = useHistory();
  const [video, setVideo] = useState<Video>(initialState);

  const handleInputChange = (e: InputChange) => {
    setVideo({ ...video, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!params.videoId) {
      await createVideo(video);
      setVideo(initialState);
      toast.success('New video was added');
    } else {
      await updateVideo(params.videoId, video);
      toast.success('Video updated');
    }

    history.push('/');
  };

  return (
    <div className="row">
      <div className="col-sm-10 col-md-6 mx-auto">
        <div className="card my-auto">
          <div className="card-body">
            <h3 className="mb-3">New Video</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  className="form-control"
                  onChange={handleInputChange}
                  value={video.title}
                  autoFocus
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="url"
                  placeholder="URL"
                  className="form-control"
                  onChange={handleInputChange}
                  value={video.url}
                />
              </div>

              <div className="form-group">
                <textarea
                  name="description"
                  rows={3}
                  placeholder="Description"
                  className="form-control"
                  onChange={handleInputChange}
                  value={video.description}
                ></textarea>
              </div>
              {params.videoId ? (
                <button className="btn btn-primary btn-block">Update</button>
              ) : (
                <button className="btn btn-info btn-block">Create</button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoForm;
