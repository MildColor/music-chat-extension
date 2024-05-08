// content-script.js

/* Youtube Music 재생 bar html Parsing */
const getYoutubeMusicInfo = () => {
  const ytmusicBar = document.getElementsByTagName("ytmusic-player-bar")[0];
  const styles = window.getComputedStyle(ytmusicBar);
  const isVisibility = styles.visibility === "hidden" ? false : true;

  const ytmusicProgressElement =
    document.getElementsByTagName("tp-yt-paper-slider")[2];
  const nowValue = ytmusicProgressElement?.getAttribute("aria-valuenow");
  const maxValue = ytmusicProgressElement?.getAttribute("aria-valuemax");

  const durationElement = ytmusicBar.querySelector(".time-info") as HTMLElement;
  const duration = durationElement.textContent!.trim() || ""; // "0:0 / 3:05" 또는 빈 문자열

  const playPauseButton = ytmusicBar.querySelector("#play-pause-button");
  const isPlaying = playPauseButton?.getAttribute("title") !== "재생";

  const imageElement = ytmusicBar.querySelector(".image");
  const imageSrc =
    imageElement instanceof HTMLImageElement ? imageElement.src : "";

  const titleElement = ytmusicBar.querySelector(".title");
  const title = titleElement?.textContent || ""; // "잘 지내길 바래" 또는 빈 문자열

  const bylineElement = ytmusicBar.querySelector(".byline");
  const bylineText = bylineElement?.getAttribute("title") || "";

  // "김승민" 또는 빈 문자열, albub과 year는 반응형에서 undefined 될 수 있음.
  // album 재생목록에서 플레이시 조회수로 바뀜
  // year 재생목록에서 플레이시 좋아요로 바뀜
  const [artist, album, year] = bylineText.split("•");

  return {
    isVisibility,
    duration,
    isPlaying,
    imageSrc,
    title,
    artist,
    nowValue: (Number(nowValue) / Number(maxValue)) * 100,
    // maxValue: Number(maxValue),
  };
};

// 데이터를 주기적으로 업데이트하고 background script로 전송
window.setInterval(() => {
  const musicInfo = getYoutubeMusicInfo();
  chrome.runtime.sendMessage({
    type: "updateMusicInfo",
    data: musicInfo,
  });
}, 1000); // 1초 간격으로 정보 업데이트

/* player bar control */
const togglePlayPause = () => {
  const playPauseButton = document.querySelector(
    "tp-yt-paper-icon-button.play-pause-button"
  ) as HTMLElement;

  console.log("playPauseButton: ", playPauseButton);

  if (!playPauseButton) return;

  playPauseButton.click(); // 재생/일시정지 버튼 클릭
};

const clickNext = () => {
  const nextButton = document.querySelector(
    "tp-yt-paper-icon-button.next-button"
  ) as HTMLElement;

  if (!nextButton) return;

  nextButton.click(); // 다음 버튼 클릭
};

const clickPrevious = () => {
  const previousButton = document.querySelector(
    "tp-yt-paper-icon-button.previous-button"
  ) as HTMLElement;
  if (!previousButton) return;

  previousButton.click(); // 이전 버튼 클릭
};

// 메시지 리스너, 외부 명령 수신
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("content script message: ", message);

  switch (message.type) {
    case "togglePlayPause":
      console.log("togglePlayPause");
      togglePlayPause();
      sendResponse({ result: "success" });

      break;
    case "playNext":
      console.log("playNext");
      clickNext();
      sendResponse({ result: "success" });

      break;

    case "playPrevious":
      console.log("playPrevious");
      clickPrevious();
      sendResponse({ result: "success" });

      break;
  }
});
