const youtubeMusicUrl = "https://music.youtube.com";
let popupWindow: chrome.windows.Window | undefined = undefined;

/* 팝업창 생성 */
const createPopupWindow = () => {
  chrome.windows.create(
    {
      url: chrome.runtime.getURL("index.html"),
      type: "popup",
      // width: 400,
      // height: 500,
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

/* 브라우저에 youtube 주소를 가진 탭 Checking*/
const checkYoutubeTab = async () => {
  let hasTab = false;
  let youtubeWindows = null;
  const allWindows = await chrome.windows.getAll({ populate: true });

  // 유튜브를 포함하는 탭을 가진 창을 필터링
  const filteredWindows = allWindows.filter((window) =>
    window.tabs?.some((tab) => tab.url && tab.url.includes("youtube.com"))
  );
  hasTab = filteredWindows.length > 0;
  youtubeWindows = filteredWindows;

  console.log("await checkYoutubeTab", {
    hasTab,
    windows: youtubeWindows,
  });

  return { hasTab, windows: youtubeWindows };
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
chrome.windows.onCreated.addListener(async () => {
  const data = await checkYoutubeTab();
  sendMessageToPopup({ type: "checkTab", data });
});

/* Legacy */

/* 앱에서 보내는 메시지 Listener */
// chrome.runtime.onMessage.addListener(
//   (
//     message: Message,
//     sender: chrome.runtime.MessageSender,
//     sendResponse: (response?: unknown) => void
//   ): void => {
//     console.log("message.type: ", message.type);
//     switch (message.type) {
//       case "openWindow":
// 모든 창 가져오기
// chrome.windows.getAll({ windowTypes: ["normal"] }, (windows) => {
//   if (windows.length > 0) {
//     // 첫 번째 'normal' 타입의 창에 새 탭을 추가
//     chrome.tabs.create(
//       { windowId: windows[0].id, url: message.url },
//       (newTab) => {
//         console.log("New tab opened in an existing window:", newTab);
//       }
//     );
//   } else {
//     // 적절한 창이 없다면 새 창을 생성
//     chrome.windows.create({ url: message.url }, (newWindow) => {
//       console.log(
//         "No existing window found, new window and tab created:",
//         newWindow
//       );
//     });

//     chrome.windows.getAll({ windowTypes: ["normal"] }, (windows) => {});
//   }
// });
//     }

//     console.log("service worker runtime message", message);
//   }
// );
