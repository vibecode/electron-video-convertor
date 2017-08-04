import {
  ADD_VIDEO,
  ADD_VIDEOS,
  REMOVE_VIDEO,
  REMOVE_ALL_VIDEOS,
  VIDEO_PROGRESS,
  VIDEO_COMPLETE
} from "./types";

const { ipcRenderer } = window.require('electron');

export const addVideos = videos => dispatch => {
  ipcRenderer.send('videos:added', videos);
  ipcRenderer.on('metadata:complete', (ev, videosData) => {
    dispatch({
      type: ADD_VIDEOS,
      payload: videosData
    });
  });
};

export const convertVideos = videos => dispatch => {
  ipcRenderer.send('conversion:start', videos);
  ipcRenderer.on('conversion:end', (ev, { video, outputPath }) => {
    dispatch(
        {
          type: VIDEO_COMPLETE,
          payload: {
            ...video,
            outputPath
          }
        }
    )
  });
};

// TODO: Open the folder that the newly created video
// exists in
export const showInFolder = outputPath => dispatch => {

};

export const addVideo = video => {
  return {
    type: ADD_VIDEO,
    payload: { ...video }
  };
};

export const setFormat = (video, format) => {
  return {
    type: ADD_VIDEO,
    payload: { ...video, format, err: "" }
  };
};

export const removeVideo = video => {
  return {
    type: REMOVE_VIDEO,
    payload: video
  };
};

export const removeAllVideos = () => {
  return {
    type: REMOVE_ALL_VIDEOS
  };
};
