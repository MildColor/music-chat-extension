const { adjectives, features, animals } = require("../constants/words");

// 각 tabId별 사용된 별명을 저장할 맵
const usedNicknamesByTab = new Map();

// 중복되지 않는 별명 생성 함수
function generateUniqueNickname(tabId) {
  let nickname;
  let attempts = 0;

  do {
    // 각 카테고리에서 랜덤하게 항목 선택
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const feature = features[Math.floor(Math.random() * features.length)];
    const animal = animals[Math.floor(Math.random() * animals.length)];

    // 별명 조합
    nickname = `${adjective} ${feature} ${animal}`;

    attempts++;

    // 너무 많은 시도를 방지
    if (attempts > 100) {
      throw new Error("Too many attempts to generate a unique nickname");
    }
  } while (isNicknameUsedByTab(nickname, tabId));

  // 성공적으로 생성된 별명을 해당 tabId의 기록에 추가
  let nicknames = usedNicknamesByTab.get(tabId) || new Set();
  nicknames.add(nickname);
  usedNicknamesByTab.set(tabId, nicknames);

  return nickname;
}

// 해당 tabId에 대해 이미 사용된 별명인지 확인하는 함수
function isNicknameUsedByTab(nickname, tabId) {
  const nicknames = usedNicknamesByTab.get(tabId);
  return nicknames ? nicknames.has(nickname) : false;
}

module.exports = { generateUniqueNickname };
