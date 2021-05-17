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
  var scheduleObj = JSON.parse(scheduleStr);
  var schYY, schMM, scDD, schSender, schMsg;
  var scheduleList = '';

  function searchSchedule(m) {
    for (key in scheduleObj) {
      schYY = scheduleObj[key][0];
      schMM = scheduleObj[key][1];
      schDD = scheduleObj[key][2];
      schSender = scheduleObj[key][3];
      schMsg = scheduleObj[key][4];
      scheduleList = schMM + "월 일정 안내";
      if (schMM == m) {
        scheduleList += '\n' + date + '일 ' + schMsg;
      }
    } return scheduleList;
  }



  if (real_msg.startsWith("달력")){ //  "달력(v)~~~~~"
    var schedule_msg = real_msg.slice(2); //  "(v)YMD(v)~~~~~~" 
    var trimSchedule = schedule_msg.trim(); //  "YMD(v)~~~~~"
    var schedule_YMD = trimSchedule.slice(0,6); //  "YYMMDD"
    var schedule_MM = trimSchedule.slice(0,2); //  "MM" or "M(v)"
    var schedule_M = schedule_MM.trim(); // "MM" or "M"
    var schYear = schedule_YMD.slice(0,2); // "YY"
    var schMonth = schedule_YMD.slice(2,4); //  "MM"
    var schDate = schedule_YMD.slice(4,6); // "DD"
    if (typeof parseInt(schedule_YMD) == "number" && schedule_YMD.length == 6) {
      var schedule = trimSchedule.slice(6);
      var real_schedule = schedule.trim();
      DataBase.appendDataBase("scheduleInfo", now.getTime() + ":["+schYear+","+schMonth+","+schDate+",\""+sender+"\",\""+real_schedule+"\"],");
    } else if (parseInt(schedule_M) < 13 && parseInt(schedule_M) > 0) {
      searchSchedule(parseInt(schedule_M));
      replier.reply(scheduleList);
    }
  }


  ```
  !달력 YYMMDD <내용>
  12 34 567890

  getTime():[YY,MM,DD,sender,schedule],

  ```
  ```
  !달력 M

  M월 일정 안내
  DD일 가나다라마바사
  작성자: sender
  ---
  DD일 마바사아자차
  작성자: sender
  ---
  DD일 차카타파하
  작성자: sender
  ```
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