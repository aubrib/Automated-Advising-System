function signIn() {
    console.log('button clicked');
    window.location = 'homePage.html';
};

function signUp() {
    console.log('button clicked');
    window.location = 'signUp.html';
};

function showPassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
}