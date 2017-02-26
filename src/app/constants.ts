const BOMB = -1;

const EVENTS = {
  authentication: "authentication",
  connect: "connect",
  connectError: "connect_error",
  connection: "connection",
  disconnect: "disconnect",
  gameEnd: "game.end",
  gameMark: "game.mark",
  gameMarked: "game.marked",
  gameStart: "game.start",
  gameStarted: "game.started",
  gameShooted: "game.shooted",
  gameShot: "game.shot",
  gameWarn: "game.warn",
  userAcceptedPlay: "user.acceptedPlay",
  userAdded: "user.added",
  userAnswerPlay: "user.answerPlay",
  userDeclinedPlay: "user.declinedPlay",
  userError: "user.error",
  userLeft: "user.left",
  userList: "user.list",
  userListed: "user.listed",
  userSelect: "user.select",
  userWantPlay: "user.wantPlay",
  globalUserAdded: "global.user.added",
  globalUserLeft: "global.user.left"
};

const PAGES = {
  login: "/login",
  dashboard: "/dashboard",
  game: "/game",
  connectWaiting: "/connect-waiting"
};

export let Constants = {
  BOMB: BOMB,
  EVENTS: EVENTS,
  PAGES: PAGES
};
