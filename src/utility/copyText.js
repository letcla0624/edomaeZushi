function copyText(txt) {
  const copyText = txt;
  // 一定要建立一個隱藏的文字區域
  const textArea = document.createElement("textarea");
  textArea.value = copyText;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("Copy");
  textArea.remove();
}

export default copyText;
