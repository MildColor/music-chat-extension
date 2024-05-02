import { create } from "zustand";

type contentScriptState = {
  url: string;
  isYouTubeMusicUrl: boolean;
};

type contentScriptActions = {
  updateUrl: (newUrl: contentScriptState["url"]) => void;
  //   validateUrl: () => void;
};

const validateUrl = (url: string) => {
  return url.includes("music.youtube.com");
};

export const contentScriptStore = create<
  contentScriptState & contentScriptActions
>()((set) => ({
  url: "",
  isYouTubeMusicUrl: false,
  updateUrl: (newUrl) =>
    set({ url: newUrl, isYouTubeMusicUrl: validateUrl(newUrl) }),
}));
