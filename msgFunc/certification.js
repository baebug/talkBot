const scriptName = "certification";
/**
 * (string) room
 * (string) sender
 * (boolean) isGroupChat
 * (void) replier.reply(message)
 * (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
 * (string) imageDB.getProfileBase64()
 * (string) packageName
 */

var agree = false;
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  // var asyncAfterMin = function (callbackFunction) {
  //   setTimeout(function () {
  //     callbackFunction();
  //   }, 30000);
  // };

  // var changeFalse = function () {
  //   agree = false;
  // };
  function timeOut(t) {
    setTimeout(changeFalse = () => {
      agree = false;
    }, t * 1000);
  }

  if (agree == false && msg == "ㄴㅇㅈㄴㅇㅈ") {
    agree = true;
    replier.reply("ㄴㅇㅈㄴㅇㅈ");
    timeOut(30);
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