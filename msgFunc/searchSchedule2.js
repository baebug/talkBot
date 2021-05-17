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
  var y = now.getFullYear();
  var scheduleStr = DataBase.getDataBase("scheduleInfo.txt");
  var strSchedule = "{" + scheduleStr + "}";
  var scheduleObj = JSON.parse(strSchedule);
  var schYY, schMM, scDD, schSender, schMsg;
  var scheduleList = '';
  var scheduleList1, scheduleList2, scheduleList3;
  var schedule_YMD, schedule_MM, schedule_M;
  var schYear, schMonth, schDate;

  function isSchedule(s){
    var isS = 'scheduleList' + s;
    if (isS.length > 5) {
      return isS = "[" + y + "년]" + isS;
    } else return ;
  }

  function searchSchedule(m) {
    scheduleList = m + "월 일정 안내";
    for (key in scheduleObj) {
      var sliceY = y.slice(2,4); // y = number; y%100 = 2021 = 21
      schYY = scheduleObj[key][0];
      schMM = scheduleObj[key][1];
      schDD = scheduleObj[key][2];
      schSender = scheduleObj[key][3];
      schMsg = scheduleObj[key][4];
      if (schMM == m) {
        if (schYY == sliceY) {
          scheduleList1 += "\n" + schDD +"일 " + schMsg + '\n작성자: ' + schSender; 
        } else if (schYY == sliceY+1) {
          scheduleList2 += "\n" + schDD +"일 " + schMsg + '\n작성자: ' + schSender;
        } else if (schYY == sliceY+2) {
          scheduleList3 += "\n" + schDD +"일 " + schMsg + '\n작성자: ' + schSender;
        }
      }
    }
    scheduleList = isSchedule(1) + isSchedule(2) + isSchedule(3);
    return scheduleList;
  }

  // 미완성 기능입니다.
  // 미완성 기능입니다.
  // 미완성 기능입니다.


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