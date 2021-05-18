// const scriptName = "shutupBong";
/**
 * (string) room
 * (string) sender
 * (boolean) isGroupChat
 * (void) replier.reply(message)
 * (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
 * (string) imageDB.getProfileBase64()
 * (string) packageName
 */

var isBong = false;
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  function rand(max) {
    return Math.floor(Math.random() * (max+1));
  }

  function timeOut(t) {
    setTimeout(changeFalse = () => {
      isBong = false;
    }, t * 1000);
  }

  if (sender == "강봉권") {
    if (isBong == false) {
      isBong = true;
      var randBong = rand(9999);
      if (randBong == 44) {
          replier.reply("강봉권 죽어");
      } else {
        randBong = rand(89);
          switch (randBong) {
            case 22:
              replier.reply("전 솔직히 봉햄 말씀이 옳다고 생각합니다.");
              break;
            case 44:
              replier.reply("아니 ㅋㅋㅋ 지금 봉햄 얘기하잖아 ㅋㅋㅋ 호응 안하냐??");
              break;
            case 66:
              replier.reply("역시 우리형 너무 멋쪄 ㅋㅋ (부끄)");
              break;
            default:
              replier.reply("헛소리 좀 그만하십쇼 형님");
            }
      }
      timeOut(300);
    }
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