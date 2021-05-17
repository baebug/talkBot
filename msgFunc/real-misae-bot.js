const scriptName = "misae-bot";
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
  const birthStr = DataBase.getDataBase("birthinfo.txt");
  const birthObj = JSON.parse(birthStr);
  const abuseStr = DataBase.getDataBase("abuseinfo.txt");
  const abuseArray = JSON.parse(abuseStr);  var now = new Date();
  var birthList = '생일자 명단';
  var miName, month, date;
  var rowData;
  var result = [];
  var dustResult = [];
  var numResult = [];
  var upResult = [];
  var downResult = [];
  var dustList = '';
  var wYear, wMonth, wDate, vDay, wDay, wHour, wMin;
  var rp = rand(99);

  var asyncAfterFive = function (callbackFunction) {
    setTimeout(function () {
      callbackFunction();
    }, 300000);
  };

  var afterFive = function () {
    isBong = false;
  };

  function checkAbuse( ) {
    var i = 0 ;
    while ( i < abuseArray.length) {
      if (msg.includes(abuseArray[i]) == true) {
      return isAbuse = true;
      } else i++;
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
  
  function isWeather() {
    var iwData = rowData.select("section").get(1);
    iwData = iwData.select("div.weather_body");
    if (iwData.attr("class").includes("weather")){
      return true;
    } else return false;
  }

  function rand(max) {
    return Math.floor(Math.random() * (max+1));
  }

  if (isGroupChat === true && sender == "강봉권") {
      if (isBong == false) {
        isBong = true;
        var randBong = rand(9999);
          if (randBong == 44) {
            replier.reply("강봉권 죽어");
            asyncAfterFive(afterFive);
        } else {
          randBong = rand(89);
            switch (randBong) {
              case 22:
                replier.reply("전 솔직히 봉햄 말씀이 옳다고 생각합니다.");
                asyncAfterFive(afterFive);
                break;
              case 44:
                replier.reply("아니 ㅋㅋㅋ 지금 봉햄 얘기하잖아 ㅋㅋㅋ 호응 안하냐??");
                asyncAfterFive(afterFive);
                break;
              case 66:
                replier.reply("역시 우리형 너무 멋쪄 ㅋㅋ (부끄)");
                asyncAfterFive(afterFive);
                break;
              default:
                replier.reply("헛소리 좀 그만하십쇼 형님");
                asyncAfterFive(afterFive);
            }
        }
      }
  } else if (msg.startsWith("!")) {
      if (msg !== "!") {
        var real_msg = msg.slice(1);
        if (!real_msg.startsWith("!")) {
          var i;
          if (real_msg === "명령어") {
            replier.reply("!이름\n!생일 n\n!봉권\n!날씨 지역");
          } else if (real_msg === "봉권") {
            replier.reply("봉형 넘 멋져...(제발)");
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
  } else if (rp == 13) {
      replier.reply("ㄹㅇㅋㅋ");
  } else if (rp == 49) {
      replier.reply("ㄴㄴ 아님");
  } else return ;
}
//아래 4개의 메소드는 액티비티 화면을 수정할때 사용됩니다.
function onCreate(savedInstanceState, activity) {
  var textView = new android.widget.TextView(activity);
  textView.setText("Hello, World!");
  textView.setTextColor(android.graphics.Color.DKGRAY);
  activity.setContentView(textView);
}
function onStart(activity) {
}
function onResume(activity) {
}
function onPause(activity) {
}
function onStop(activity) {
}