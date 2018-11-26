
$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyD9HqZtjdhYtjVERALcgp92--T4nhCfKpA",
        authDomain: "train-scheduler-9c2ab.firebaseapp.com",
        databaseURL: "https://train-scheduler-9c2ab.firebaseio.com",
        projectId: "train-scheduler-9c2ab",
        storageBucket: "",
        messagingSenderId: "836854342074"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    var name = "";
    var destination = "";
    var trainTime = 0;
    var frequency = "";


    $("#submitBtn").on("click", function (event) {

        event.preventDefault();

        // Grabbed values from text boxes
        name = $("#enter-name").val().trim();
        destination = $("#enter-dest").val().trim();
        trainTime = $("#enter-time").val().trim();
        frequency = $("#enter-frequency").val().trim();

        var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
        var currentTime = moment();

        // Difference between the times
        var diffTime = moment().diff(moment(trainTimeConverted), "minutes");

        // Time apart (remainder)
        var tRemainder = diffTime % frequency;

        

        // Code for handling the push        

        database.ref().push({
            name: name,
            destination: destination,
            trainTime: trainTime,
            frequency: frequency,
            tMinutesTillTrain: tMinutesTillTrain,
            nextTrainFormat: nextTrainFormat
        });



        name = $("#enter-name").val("");
        destination = $("#enter-dest").val("");
        trainTime = $("#enter-time").val("");
        frequency = $("#enter-frequency").val("");

    });

    database.ref().on("child_added", function (snapshot) {
        debugger;
        var sv = snapshot.val();


        


        console.log(sv.tMinutesTillTrain);
        sv.tMinutesTillTrain-1;
        console.log(sv.tMinutesTillTrain);

        var newRow = $("<tr>").append(
            $("<td>").text(sv.name),
            $("<td>").text(sv.destination),
            $("<td>").text(sv.frequency),
            $("<td>").text(sv.nextTrainFormat),
            $("<td>").text(sv.tMinutesTillTrain)
        );


        $("#tableId>tbody").append(newRow);



        // Handle the errors
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });




});