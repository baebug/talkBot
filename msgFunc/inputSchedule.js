const scriptName = "template";
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
  var schYY, schMM, schDD, schSender, schMsg;
  var scheduleList = '';
  var schedule_msg, schedule_M, schedule;
  var schedule_YMD, schYear, schMonth, schDate;

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



  if (real_msg.startsWith("달력")){ //  "달력(v)~~~~~"
    schedule_msg = real_msg.slice(2).trim(); //  "YMD(v)~~~~~~" 
    schedule_YMD = schedule_msg.slice(0,6); //  "YYMMDD"
    schYear = schedule_YMD.slice(0,2); // "YY"
    schMonth = schedule_YMD.slice(2,4); //  "MM"
    schDate = schedule_YMD.slice(4,6); // "DD"
    schedule_M = schedule_msg.slice(0,2).trim(); // "MM" or "M"
    if (parseInt(schedule_M) < 13 && parseInt(schedule_M) > 0 && schedule_msg.length < 3) {
      searchSchedule(parseInt(schedule_M));
      replier.reply(scheduleList);
    } else if (schMonth > 0 && schDate > 0 && schMonth < 13 && schDate < 32) {
      schedule = schedule_msg.slice(6).trim();
      DataBase.appendDataBase("scheduleInfo", ", \"" + now.getTime() + "\":[\"" + schYear + "\",\"" + schMonth + "\",\"" + schDate + "\",\"" + sender + "\",\"" + schedule + "\"]");
      replier.reply("일정 등록 완료");
    } else {
      replier.reply("명령어를 확인해주세요.\n!달력 mm\n!달력 yymmdd <내용>");
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