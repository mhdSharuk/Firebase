function data(){

    var data =  firebase.database().ref('userlist');

    data.on('child_added', value);

}

var pwdref,outpwdref;
var k,name,email,password,prevChild;

function value(snapshot,prevChildKey){

    var usrdata = snapshot.val();

    var keys = Object.keys(usrdata);

    for(var i = 0; i<keys.length; i++){

         k = keys[i];

         name = usrdata[k].name;

         email = usrdata[k].email;

         password = usrdata[k].password;
         pwdref = password;
         for(i=1;i<keys.length;i++){
            document.getElementById("p").innerHTML = '<ul><li>'+password[i]+'</li></ul>';
         }
         console.log("inside for pwdref " + pwdref)
         console.log("inside for password " + password)

         prevKey = prevChildKey;
    }
    outpwdref = pwdref;
    console.log("outside for pwdref " + pwdref)
    console.log("outside for outpwdref " + outpwdref)

    console.log("outside for inside func " + password)

    call();

}
console.log("outside everything " + outpwdref)

var calling = outpwdref;
function call(){
    console.log("inside call() calling " + calling)
}
console.log(password)
 