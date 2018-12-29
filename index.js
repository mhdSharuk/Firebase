window.onload = function(){

    document.getElementById("cpwd").style.display = "none";
    document.getElementById("name").style.display = "none";
    document.getElementById("verf").style.display = "none";

}


function newaccount(){

    document.getElementById("new").style.width = "300px";
    document.getElementById("log").style.display = "none";
    document.getElementById("forgot").style.display = "none";
    document.getElementById("verf").style.display = "flex";
    document.getElementById("cpwd").style.display = "flex";
    document.getElementById("name").style.display = "block";

    console.log("ui changed")

}

function newvalidate(){
    console.log("newvalidate()")

    var email = document.getElementById('email').value;
    console.log(email)
    var password = document.getElementById('pwd').value;
    console.log(password)
    var cpassword = document.getElementById("cpwd").value;
    console.log(cpassword)
    var name = document.getElementById("name").value;
    console.log(name)


    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
      console.log(email.length)
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }
    console.log(password.length)
    if(password != cpassword){
        alert("password does not match");
    }
    else if((name && email && password) != null){
        firebase.auth().createUserWithEmailAndPassword(email,password).then(function(msg){
            console.log("user created");
            console.log(msg.val())
            firebase.auth().onAuthStateChanged((user) => {
                var uid = user.uid;
                console.log("current user uid : " + uid);
            });
            saveData(name,email,password)
            console.log("data saved")
            console.log("email verification sending..........")
            emailVerification();
            console.log("email verificati0n sent")

        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
        console.log("Account Created");
        document.getElementById("form").reset();
        console.log("reseted")
    }
    else{
        alert("Enter all Form Fields");
    }

}

function login(){
    document.getElementById("cpwd").style.display = "none";
    document.getElementById("verf").style.display = "none";
    document.getElementById("new").style.display = "none";
    document.getElementById("name").style.display = "none";

    console.log("login ui changed");
}

function logvalidate(){

    var email = document.getElementById('email').value;
    console.log(email)
    var password = document.getElementById('pwd').value;
    console.log(password)

    if (email.length < 4) {
       alert('Please enter an email address.');
       return;
    }
    console.log(email.length)
    if (password.length < 4) {
       alert('Please enter a password.');
       return;
    }
    console.log(password.length)
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(msg){
        console.log(msg);
        alert("Logged In")
        console.log("loggedin")
        authRetrieve();
    })
    .catch(function(error) {
        var errorCode = error.code;
        console.log(errorCode)
        var errorMessage = error.message;
        console.log(errorMessage)
        document.getElementById("form").reset();
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        }
        else {
          alert(errorMessage);
        }
        console.log(error);
        console.log("inside catch")
    });    
    console.log("didnt reach catch")
}

function authRetrieve(){
    firebase.auth().onAuthStateChanged((user) => {
        if(user){
            var name = user.email;
            console.log(name);
        }
    })

}

function emailVerification(email){
    email = document.getElementById("email").value;
    firebase.auth().currentUser.sendEmailVerification()
    .then(function(msg){
        alert("Email Verification Sent")
        console.log(msg);
    })
    .catch(function(err){
        var errorcode = err.code;
        var errormessage = err.message;
        if(errorcode == 'auth/invalid-email'){
            console.log("ErrorCode : ". errorcode);
            console.log(errormessage)
        }
        else if(errorcode == 'auth/user-not-found'){
            console.log("ErrorCode : ".errorcode);
            console.log(errormessage);
        }
        console.log(err);
    });
}
function forgot(){
    document.getElementById("log").style.display = "none";
    document.getElementById("cpwd").style.display = "none";
    document.getElementById("verf").style.display = "none";
    document.getElementById("new").style.display = "none";
    document.getElementById("pwd").style.display = "none";
    document.getElementById("name").style.display = "none";
    document.getElementById("forgot").style.marginTop = "-200px";

    fmessage();

}
function fmessage(){
    var email = document.getElementById('email').value;
    firebase.auth().sendPasswordResetEmail(email)
    .then(function(msg){
        console.log(msg);
        alert("Password Reset Email Sent");
    })
    .catch(function(err){
        var errorcode = err.code;
        var errormessage = err.message;
        if(errorcode == 'auth/invalid-email'){
            alert("Invalid E-mail");
            console.log("ErrorCode : ".errorcode)
        }
        else if(errorcode  == 'auth/user-not-found'){
            alert("User not found");
            console.log("ErrorCode : ".errorcode)
        }
        console.log(err);

    });
}
function saveData(name,email,pwd){
    
    console.log("inside savedata")

    var user = firebase.auth();
    console.log("user"+ user)
    for(var value in user){
        console.log("key : " + user + "value : " + user[value]);
        //console.log(user[value])
    }    
    console.log("db refferring..........")
    var database = firebase.database().ref("userlist");
    console.log("db reffered")
    var push = database.push().child("Acoount Details");
    console.log("pushed")
    push.set({
        name:name,
        email:email,
        password:pwd
    });
    console.log("finish savedata() inside savedata")

}

var validate = newvalidate();
if(validate){
    console.log("savedata calling........ inside validate")
    saveData(name,email,pwd); 
    console.log("savedata called inside validate !")
}
else{
    console.log("data not saved.........")
}


