$(loaded);

function loaded() {
  showText();
  // ボタンをクリックしたときに実行するイベントを設定する
  $("#formButton").click(
    // コールバックとしてメソッドを引数にわたす
    function() {
      saveText();
      showText();
    });
}

// 入力された内容をローカルストレージに保存する
function saveText() {
  // 時刻をキーにして入力されたテキストを保存する
  var text = $("#formText");
  if (checkText(text.val())) {
    var time = new Date();
    localStorage.setItem(time, text.val());
    // テキストボックスを空にする
    text.val("");
  }
}

// ローカルストレージに保存した値を再描画する
function showText() {
  // すでにある要素を削除する
  var list = $("#list")
  list.children().remove();
  // ローカルストレージに保存された値すべてを要素に追加する
  var key, value, html = [];
  for(var i=localStorage.length - 1; i >= 0; i--) {
    key = localStorage.key(i);
    value = localStorage.getItem(key);
    value = escapeText(value);
    html.push("<li>" + value + "</li>");
  }

  list.append(html.join(''));
}


// 文字をエスケープする
function escapeText(text) {
  return jQuery('<div>').text(text).html();
}

// 入力チェックを行う
function checkText(text) {
  // 文字数が0または20以上は不可
  if (0 === text.length || 30 < text.length) {
    alert("文字数は1〜30字にしてください");
    return false;
  }

  // すでに入力された値があれば不可
  var length = localStorage.length;
  for (var i = 0; i < length; i++) {
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);
    // 内容が一致するものがあるか比較
    if (text === value) {
      alert("同じ内容は避けてください");
      return false;
    }
  }

  // すべてのチェックを通過できれば可
  return true;
}