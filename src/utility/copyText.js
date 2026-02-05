async function copyText(txt) {
  // 現代瀏覽器
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(txt);
  }

  // fallback（舊瀏覽器）
  const textArea = document.createElement("textarea"); // 一定要建立一個隱藏的文字區域
  textArea.value = txt;

  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  document.execCommand("copy");
  document.body.removeChild(textArea);
}

export default copyText;
