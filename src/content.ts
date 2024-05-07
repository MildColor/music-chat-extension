// content-script.js

const ytmusicBar = document.getElementsByTagName("ytmusic-player-bar")[0];
const styles = window.getComputedStyle(ytmusicBar);

/* Youtube Music 재성 bar html Parsing */
const getYoutubeMusicInfo = () => {
  const ytmusicBar = document.getElementsByTagName("ytmusic-player-bar")[0];
  const styles = window.getComputedStyle(ytmusicBar);
  const isVisibility = styles.visibility === "hidden" ? false : true;

  const durationElement = ytmusicBar.querySelector(".time-info") as HTMLElement;
  console.log("durationElement: ", durationElement);
  const duration = durationElement.textContent!.trim() || ""; // "0:0 / 3:05" 또는 빈 문자열
  console.log("duration: ", duration);

  const playPauseButton = ytmusicBar.querySelector("#play-pause-button");
  console.log("playPauseButton: ", playPauseButton);
  const isPlaying = playPauseButton?.getAttribute("title") !== "재생"; // true 또는 false
  console.log("isPlaying: ", isPlaying);

  const titleElement = ytmusicBar.querySelector(".title");
  console.log("titleElement: ", titleElement);
  const title = titleElement?.textContent || ""; // "잘 지내길 바래" 또는 빈 문자열
  console.log("title: ", title);

  const bylineElement = ytmusicBar.querySelector(".byline");
  console.log("bylineElement: ", bylineElement);
  const bylineText = bylineElement?.getAttribute("title") || "";
  console.log("bylineText: ", bylineText);
  const [artist, album, year] = bylineText.split("•"); // "김승민" 또는 빈 문자열
  console.log("artist: ", artist);
  console.log("album: ", album);
  console.log("year: ", year);
};

// 데이터를 주기적으로 업데이트하고 background script로 전송
window.setInterval(() => {
  getYoutubeMusicInfo();
  // chrome.runtime.sendMessage({
  //   type: "updateMusicInfo",
  //   data: musicInfo,
  // });
}, 1000); // 1초 간격으로 정보 업데이트

/* Legacy */
// const currentTimeElement = document.getElementById("#sliderBar");
// console.log("currentTimeElement: ", currentTimeElement);
// const currentTime = currentTimeElement?.textContent || ""; // "0:00" 또는 빈 문자열
// console.log("currentTime: ", currentTime);
