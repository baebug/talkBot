// const scriptName = "template";
/**
 * (string) room
 * (string) sender
 * (boolean) isGroupChat
 * (void) replier.reply(message)
 * (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
 * (string) imageDB.getProfileBase64()
 * (string) packageName
 */
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  var now = new Date();
  var scheduleStr = DataBase.getDataBase("scheduleInfo.txt");
  var strSchedule = "{" + scheduleStr + "}";
  var scheduleObj = JSON.parse(strSchedule);
  var schYY, schMM, scDD, schSender, schMsg;
  var scheduleList = '';
  var schedule_YMD, schedule_MM, schedule_M;
  var schYear, schMonth, schDate;

  function searchSchedule(m) {
    scheduleList = m + "월 일정 안내";
    for (key in scheduleObj) {
      schYY = scheduleObj[key][0];
      schMM = scheduleObj[key][1];
      schDD = scheduleObj[key][2];
      schSender = scheduleObj[key][3];
      schMsg = scheduleObj[key][4];
      if (schMM == m) {
        scheduleList += '\n' + schDD + '일 ' + schMsg + '\n작성자: ' + schSender;
      }
    } return scheduleList;
  }

  if (msg.startsWith("달력")){ 
    if (parseInt(schedule_M) < 13 && parseInt(schedule_M) > 0) {
      searchSchedule(parseInt(schedule_M));
      replier.reply(scheduleList);
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