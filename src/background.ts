// background.ts

const youtubeMusicUrl = "https://music.youtube.com";
let popupWindow: chrome.windows.Window | undefined = undefined;

/* 팝업창 생성 */
const createPopupWindow = () => {
  chrome.windows.create(
    {
      url: chrome.runtime.getURL("index.html"),
      type: "popup",
      width: 200,
      height: 400,
    },
    (window) => {
      popupWindow = window;
      console.log("createPopupWindow", window);
    }
  );
};

/* 팝업창 포커스 */
const focusOrCreatePopup = () => {
  chrome.windows.getAll(
    { populate: true, windowTypes: ["popup"] },
    (windows) => {
      if (!popupWindow) return createPopupWindow();

      if (popupWindow) {
        chrome.windows.remove(popupWindow.id!);
        return createPopupWindow();
      }
    }
  );
};

/* 사용자가 확장 프로그램의 아이콘을 클릭할 때 */
chrome.action.onClicked.addListener(async (tab) => {
  focusOrCreatePopup();
});

/* 팝업으로 정보 보내기 */
const sendMessageToPopup = (message: Message) => {
  chrome.runtime.sendMessage(message, (response) => {
    console.log("message: ", message);
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError);
    } else if (response) {
      console.log("팝업으로부터의 응답:", response);
    }
  });
};

let connectedTabId: number | null | undefined = null; // 연결된 탭의 ID 저장

/* 브라우저에 youtube 주소를 가진 탭 Checking */
const checkYoutubeTab = async () => {
  let connectTab = null;
  let hasTab = false;
  let youtubeTabs = null;

  const allWindows = await chrome.windows.getAll({ populate: true });

  const filteredTabs = allWindows
    .flatMap((window) => {
      return window.tabs;
    })
    .filter((tab) => {
      return tab?.url?.includes("music.youtube");
    });

  console.log("filteredTabs: ", filteredTabs);

  hasTab = filteredTabs.length > 0;
  youtubeTabs = filteredTabs;
  connectTab = hasTab ? filteredTabs[0] : null;

  // 유튜브 뮤직 탭이 없으면 ID를 null로 설정
  if (!connectTab) return (connectedTabId = null);

  // 기존 유튜브 뮤직 탭이 없거나, 이전 아이디 연결하고자하는 connectTab.id가 다른 경우, 새로 할당한 후, content.js 삽입
  if (!connectedTabId || connectedTabId !== connectTab.id) {
    connectedTabId = connectTab.id;

    // localStorage.setItem("connectedTabId", JSON.stringify(connectedTabId));

    connectedTabId &&
      chrome.scripting.executeScript({
        target: { tabId: connectedTabId },
        files: ["content.js"],
      });
    console.log("executeScript connectedTabId: ", connectedTabId);
  }

  console.log("await checkYoutubeTab", {
    hasTab,
    youtubeTabs,
    connectTab,
    connectedTabId,
  });

  return { hasTab, youtubeTabs, connectTab };
};

/* 사용자 탭 이동시 상태 추적 */
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const data = await checkYoutubeTab();
  sendMessageToPopup({ type: "checkTab", data });
});

/* 사용자 탭 업데이트시 상태 추적 */
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  const data = await checkYoutubeTab();
  sendMessageToPopup({ type: "checkTab", data });
});

/* 사용자 탭 생성시 상태 추적 */
chrome.windows.onCreated.addListener(async (tab) => {
  const data = await checkYoutubeTab();
  sendMessageToPopup({ type: "checkTab", data });
});

/* Legacy */

/* 앱에서 보내는 메시지 Listener */
chrome.runtime.onMessage.addListener(
  (
    message: Message,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: unknown) => void
  ): void => {
    switch (message.type) {
      case "togglePlayPause":
      // console.log("toggle message.type: ", message.type);
    }

    // console.log("service worker runtime message", message);
  }
);

// 유튜브를 포함하는 탭을 가진 창을 필터링
// const filteredWindows = allWindows.filter((window) =>
//   window.tabs?.some((tab) => tab.url && tab.url.includes("youtube.com"))
// );
