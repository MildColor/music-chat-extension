const youtubeMusicUrl = "https://music.youtube.com";

export const openYoutubeMusicTab = () => {
  chrome.windows.getAll({ windowTypes: ["normal"] }, (windows) => {
    if (windows.length > 0) {
      // 첫 번째 'normal' 타입의 창에 새 탭을 추가
      chrome.tabs.create(
        { windowId: windows[0].id, url: youtubeMusicUrl },
        (newTab) => {
          console.log("New tab opened in an existing window:", newTab);
        }
      );
    } else {
      // 적절한 창이 없다면 새 창을 생성
      chrome.windows.create({ url: youtubeMusicUrl });
    }
  });
};
