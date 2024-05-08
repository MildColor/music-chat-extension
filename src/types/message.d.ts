type KeyValuePair<K, V> = {
  [key: K]: V;
};

type messageData = KeyValuePair;

interface Message {
  type: "checkTab" | "openWindow" | "updateMusicInfo" | "togglePlayPause";
  data?: messageData;
}
