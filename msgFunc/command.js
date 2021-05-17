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
  const birthStr = DataBase.getDataBase("birthinfo.txt");
  const birthObj = JSON.parse(birthStr);
  var birthList = '생일자 명단';
  var wYear, wMonth, wDate, vDay, wDay, wHour, wMin;
  var miName, month, date;
  var rowData;
  var result = [];
  var dustResult = [];
  var numResult = [];
  var upResult = [];
  var downResult = [];
  var dustList = '';
  var rp = rand(299);

  function makeDate(){
    wYear = now.getFullYear();
    wMonth = now.getMonth() + 1;
    wDate = now.getDate();
    vDay = now.getDay();
    wHour = now.getHours();
    wMin = now.getMinutes();
    switch (vDay) {
      case 0:
        wDay = "일";
        break;
      case 1:
        wDay = "월";
        break;
      case 2:
        wDay = "화";
        break;
      case 3:
        wDay = "수";
        break;
      case 4:
        wDay = "목";
        break;
      case 5:
        wDay = "금";
        break;
      case 6:
        wDay = "토";
        break;
    }
  }
  
  function searchMonth(m) {
    for (key in birthObj) {
      miName = birthObj[key].name;
      month = birthObj[key].info[0];
      date = birthObj[key].info[1];
      if (month === m) {
        birthList += '\n' + date + '일 ' + miName;
      }
    } return birthList;
  }

  function isWeather() {
    var iwData = rowData.select("section").get(1);
    iwData = iwData.select("div.weather_body");
    if (iwData.attr("class").includes("weather")){
      return true;
    } else return false;
  }

  function dustCheck(d){
    var dustData = rowData.select("div.text_info").get(d);
    dustData = dustData.select("span.figure_text");
    for (var dust = 0; dust < dustData.size(); dust++) {
      dustResult[dust] = dustData.get(dust).text();
    } return dustResult;  
  }

  function numCheck(nu){
    var numData = rowData.select("div.graph_info").get(nu);
    numData = numData.select("span.figure_result");
    for (var num = 0; num < numData.size(); num++) {
      numResult[num] = numData.get(num).text();
    } return numResult;
  }

  function rand(max) {
    return Math.floor(Math.random() * (max+1));
  }

  if (msg.startsWith("!")) {
    if (msg !== "!") {
      var real_msg = msg.slice(1);
      if (!real_msg.startsWith("!")) {
        if (real_msg === "명령어") {
          replier.reply("!이름\n!생일 n\n!봉권\n!날씨 지역\n!달력 n\n!달력 yymmdd <내용>\n#<명령어>\n!확률");
        } else if (real_msg === "봉권") {
          replier.reply("봉형 넘 멋져...(제발)");
        } else if (real_msg === "확률") {
          replier.reply("ㄹㅇㅋㅋ (0.33%)\n아 ㄹㅇ? (0.33%)\nㅇㅈㅇㅈ (0.33%)\nㄴㄴ 아님 (0.33%)\n안물 (0.33%)\n(무시) (0.33%)\n\n<봉형 전용>\n강봉권 죽어 (0.01%)\n칭찬 3개 (각 3%)\n헛소리 ㄴ (90.99%)");
        } else if (real_msg.startsWith("생일")) {
          var birth = real_msg.slice(2);
          var trimBirth = birth.trim();
          if (parseInt(trimBirth) < 13 && parseInt(trimBirth) > 0) {
            searchMonth(parseInt(trimBirth));
            replier.reply(birthList);
          } else replier.reply("!생일 n");
        } else if (real_msg.startsWith("날씨")) {
          makeDate();
          var locationSlice = real_msg.slice(2);
          var misae_location = locationSlice.trim();
          var misae_lo_query = "https://m.search.naver.com/search.naver?query=" + misae_location + "날씨";
          rowData = Utils.parse(misae_lo_query);
          if (isWeather() == true) {
            var data = rowData.select("div.temperature_text").get(0);
            data = data.select("strong");
            for (var n = 0; n < data.size(); n++) {
              result[n] = data.get(n).text();
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
            for (var down = 0; down < downData.size(); down++) {
              downResult[down] = downData.get(down).text();
            }
            dustList += "  최저: " + downResult;
            dustCheck(0);
            numCheck(0);
            dustList += "\n미세먼지: " + dustResult + "(" + numResult + ")";
            dustCheck(1);
            numCheck(1);
            dustList += "\n초미세먼지: " + dustResult + "(" + numResult + ")";
            dustCheck(2);
            numCheck(2);
            dustList += "\n자외선: " + dustResult + "(" + numResult + ")";
            dustCheck(3);
            numCheck(3);
            dustList += "\n습도: " + dustResult + "(" + numResult + "%)";
            replier.reply(wYear + "년 " + wMonth + "월 " + wDate + "일 (" + wDay + ")\n" + wHour + "시 " + wMin + "분 - " + misae_location + "\n" + dustList + "\n\nm.mm\n" + misae_lo_query);
          } else replier.reply("검색 결과가 없습니다.");
        } else {
          var trimMsg = real_msg.trim();
          for (key in birthObj) {
            miName = birthObj[key].name;
            month = birthObj[key].info[0];
            date = birthObj[key].info[1];
            if (miName === trimMsg) {
              replier.reply(month + '월 ' + date + '일');
            }
          }
        }
      }
    }
  } else {
    switch (rp) {
      case 13:
        replier.reply("ㄹㅇㅋㅋ");
        break;
      case 178:
        replier.reply("아 ㄹㅇ?");
      break;
      case 234:
        replier.reply("ㅇㅈㅇㅈ");
      break;
      case 49:
        replier.reply("ㄴㄴ 아님");
      break;
      case 193:
        replier.reply("안물");
      break;
      case 264:
        replier.reply("(무시)");
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