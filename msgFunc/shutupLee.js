const scriptName = "shutupLee";
/**
 * (string) room
 * (string) sender
 * (boolean) isGroupChat
 * (void) replier.reply(message)
 * (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
 * (string) imageDB.getProfileBase64()
 * (string) packageName
 */
var isLee = false;
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  function timeOut(t) {
    setTimeout(changeFalse = () => {
      isBong = false;
    }, t * 1000);
  }

  if (sender == "이성영" && isLee == false) {
    isLee = true;
    if (msg.includes("죽어")) {
      replier.reply("어허! 형한테 그런 말 하는거 아니야");
    } else if (msg.includes("나가")) {
      replier.reply("강봉권 나가");
    }
    timeOut(60);
  }
}

//아래 4개의 메소드는 액티비티 화면을 수정할때 사용됩니다.
function onCreate(savedInstanceState, activity) {
  var textView = new android.widget.TextView(activity);
  textView.setText("Hello, World!");
  textView.setTextColor(android.graphics.Color.DKGRAY);
  activity.setContentView(textView);
}

function onStart(activity) {}

function onResume(activity) {}

function onPause(activity) {}

function onStop(activity) {}