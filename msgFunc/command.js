const scriptName = "command";
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
  const birthStr = DataBase.getDataBase("birthinfo.txt");
  const birthObj = JSON.parse(birthStr);
  var birthList = '생일자 명단';
  var nYear, nMonth, nDate, nDay, nWeek, nHour, nMin;
  var mName, mMonth, mDate;
  var rowData;
  var result = [], dustResult = [], numResult = [], upResult = [], downResult = [];
  var dustList = '';
  var rp = rand(299);
  var react;

  function makeDate(){
    nYear = now.getFullYear();
    nMonth = now.getMonth() + 1;
    nDate = now.getDate();
    nDay = now.getDay();
    nHour = now.getHours();
    nMin = now.getMinutes();
    switch (nDay) {
      case 0:
        nWeek = "일";
        break;
      case 1:
        nWeek = "월";
        break;
      case 2:
        nWeek = "화";
        break;
      case 3:
        nWeek = "수";
        break;
      case 4:
        nWeek = "목";
        break;
      case 5:
        nWeek = "금";
        break;
      case 6:
        nWeek = "토";
        break;
    }
  }
  
  function searchMonth(m) {
    for (key in birthObj) {
      mName = birthObj[key].name;
      mMonth = birthObj[key].info[0];
      mDate = birthObj[key].info[1];
      if (mMonth === m) {
        birthList += '\n' + mDate + '일 ' + mName;
      }
    } return birthList;
  }

  function isWeather() {
    var wData = rowData.select("section").get(1);
    wData = wData.select("div.weather_body");
    if (wData.attr("class").includes("weather")){
      return true;
    } else return false;
  }

  function delay_response(ment) {
    setTimeout(delayed = () => {
      replier.reply(ment);
    }, rand(5) * 1000);
  }

  function dustName(d){
    var dData = rowData.select("div.text_info").get(d);
    dData = dData.select("span.figure_text");
    for (var i = 0; i < dData.size(); i++) {
      dustResult[i] = dData.get(i).text();
    } return dustResult;  
  }

  function dustNumb(d){
    var nData = rowData.select("div.graph_info").get(d);
    nData = nData.select("span.figure_result");
    for (var n = 0; n < nData.size(); n++) {
      numResult[n] = nData.get(n).text();
    } return numResult;
  }

  function dustAssemble(a){
    dustName(a);
    dustNumb(a);
  }

  function rand(max) {
    return Math.floor(Math.random() * (max+1));
  }

  if (msg.startsWith("!") && msg !== "!") {
    var real_msg = msg.slice(1);
    if (!real_msg.startsWith("!")) {
      if (real_msg === "명령어") {
        replier.reply("!봉권\n!생일 <월>\n!생일 <이름>\n!<지역>\n!달력 <월>\n!달력 yymmdd <내용>\n#<검색어>\n!확률");
      } else if (real_msg === "봉권") {
        replier.reply("봉형 넘 멋져...(제발)");
      } else if (real_msg === "확률") {
        replier.reply("ㄹㅇㅋㅋ (0.33%)\n아 ㄹㅇ? (0.33%)\nㅇㅈㅇㅈ (0.33%)\nㄴㄴ 아님 (0.33%)\n안물 (0.33%)\n(무시) (0.33%)\n\n<봉형 전용>\n강봉권 죽어 (0.01%)\n칭찬 3개 (각 5%)\n헛소리 ㄴ (84.99%)");
      } else if (real_msg.startsWith("생일")) {
        var birth = real_msg.slice(2).trim();
        if (parseInt(birth) < 13 && parseInt(birth) > 0) {
          searchMonth(parseInt(birth));
          replier.reply(birthList);
        } else {
          for (key in birthObj) {
            mName = birthObj[key].name;
            mMonth = birthObj[key].info[0];
            mDate = birthObj[key].info[1];
            if (mName === birth) {
              replier.reply(mMonth + '월 ' + mDate + '일');
            }
          }
        }
      } else {
        makeDate();
        var w_location = real_msg;
        var w_query = "https://m.search.naver.com/search.naver?query=" + w_location + "날씨";
        rowData = Utils.parse(w_query);
        if (isWeather() == true) {
          var data = rowData.select("div.temperature_text").get(0);
          data = data.select("strong");
          for (var k = 0; k < data.size(); k++) {
            result[k] = data.get(k).text();
          }
          dustList += "\n" + result.join();
          var upData = rowData.select("dd.up_temperature").get(0);
          upData = upData.select("strong");
          for (var u = 0; u < upData.size(); u++) {
            upResult[u] = upData.get(u).text();
          }
          dustList += "\n최고: " + upResult;
          var downData = rowData.select("dd.down_temperature").get(0);
          downData = downData.select("strong");
          for (var d = 0; d < downData.size(); d++) {
            downResult[d] = downData.get(d).text();
          }
          dustList += "  최저: " + downResult;
          dustAssemble(0);
          dustList += "\n미세먼지: " + dustResult + "(" + numResult + ")";
          dustAssemble(1);
          dustList += "\n초미세먼지: " + dustResult + "(" + numResult + ")";
          dustAssemble(2);
          dustList += "\n자외선: " + dustResult + "(" + numResult + ")";
          dustAssemble(3);
          dustList += "\n습도: " + dustResult + "(" + numResult + "%)";
          replier.reply(nYear + "년 " + nMonth + "월 " + nDate + "일 (" + nWeek + ")\n" + nHour + "시 " + nMin + "분 - " + w_location + "\n" + dustList + "\n\nhttps://m.mm\n" + w_query);
        } else replier.reply("검색 결과가 없습니다.");
      }
    }
  } else {
    switch (rp) {
      case 13:
        react = "ㄹㅇㅋㅋ";
        delay_response(react);
        break;
      case 178:
        react = "아 ㄹㅇ?";
        delay_response(react);
      break;
      case 234:
        react = "ㅇㅈㅇㅈ";
        delay_response(react);
      break;
      case 49:
        react = "ㄴㄴ 아님";
        delay_response(react);
      break;
      case 193:
        react = "안물";
        delay_response(react);
      break;
      case 264:
        react = "(무시)";
        delay_response(react);
      break;
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