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

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(function() {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return firebase.auth().signInWithEmailAndPassword(email, password);
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });

$("#userLogin").on("click", function() {
	var email = $("#userEmail").val().trim();
	var password = $("#userPassword").val().trim();
	$("#userEmail").val("");
	$("#userPassword").val("");
	if ($("#newUser").is(":checked")) {
		$("#newUser").prop("checked", false);
		firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
			var errorCode = error.code;
			var errorMessage = error.message;
		});
	} else {
		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
			var errorCode = error.code;
			var errorMessage = error.message;
		});
	};
	
});

$("#userLogOut").on("click", function() {
	firebase.auth().signOut().then(function() {
	  // Sign-out successful.
	  alert("Sign out successful");
	}).catch(function(error) {
	  // An error happened.
	  console.log("Error.");
	});
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    alert("Sign in successful");
    var currentUser = firebase.auth().currentUser;
	if (currentUser !== null) {
		email = currentUser.email;
		uid = currentUser.uid;
		$("#submit").on("click", function(event) {
			event.preventDefault();
			var search = $("#search").val().trim();
			console.log(search);
			database.ref(uid + "/searches").push({
				location: search,
				dateAdded: firebase.database.ServerValue.TIMESTAMP
			});
		});
		
		database.ref(uid + "/searches").orderByChild("dateAdded").limitToLast(5).on("child_added", function(snapshot) {
			$("#userSearches").prepend("<div>" + snapshot.val().location + "</div><br>");
		});
		

	};
  } else {
    // No user is signed in.
    console.log("No one is signed in");
  }
});

$("#userSearches").on("click", "div", function() {
	var search = $(this).text();
	$("#search").val(search);
	$("#submit").trigger("click");
});


