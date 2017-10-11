// Initialize Firebase
var config = {
apiKey: "AIzaSyBw2bE_pxCWSJM0zdkhUtouRJfqjGfZgxc",
authDomain: "fir-campers.firebaseapp.com",
databaseURL: "https://fir-campers.firebaseio.com",
projectId: "fir-campers",
storageBucket: "",
messagingSenderId: "396436072298"
};
firebase.initializeApp(config);

var database = firebase.database();

var userEmail;
var userPassword;
var newUser = false;

$("#userLogin").on("click", function() {
	userEmail = $("#userEmail").val().trim();
	userPassword = $("#userPassword").val().trim();
	$("#userEmail").val("");
	$("#userPassword").val("");
	console.log(userEmail);
	console.log(userPassword);
	// if ($("#newUser").ischecked) {
	firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
	});
	// } else if (!$("#newUser").isChecked) {
		// firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
		// 	var errorCode = error.code;
		// 	var errorMessage = error.message;
		// });
	// };
	
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    alert("Sign in successful");
  } else {
    // No user is signed in.
    alert("No one is signed in");
  }
});

firebase.auth().signOut().then(function() {
  // Sign-out successful.
  alert("Sign out successful");
}).catch(function(error) {
  // An error happened.
  alert("Error.");
});

// database.ref().push({
// 	userEmail: userEmail,
// 	userPassword: userPassword
// });