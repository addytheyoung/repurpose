export default function checkEmail(email) {
  if (!email) {
    alert("Bad email");
    return false;
  }
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  alert("Bad email");
  return false;
}
