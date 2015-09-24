var form = document.getElementById("userForm");

function register(){
  form.action = "/register";
  form.submit();
}

function login(){
  form.action = "/login";
  form.submit();
}