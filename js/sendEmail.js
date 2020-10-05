function submitToAPI(e) {
    e.preventDefault();
    var URL = "https://azg2582j45.execute-api.us-east-1.amazonaws.com/Production/sendemail";


    var name = document.getElementById("name-input").value;
    var email = document.getElementById("email-input").value;
    var desc = document.getElementById("description-input").value;
    if (name == "" || email == "" || desc == "") {
        alert("Please Fill All Required Field");
        return false;
    }

    nameRE = /^[A-Z]{1}[a-z]{2,20}[ ]{1}[A-Z]{1}[a-z]{2,20}/;
    if (!nameRE.test(name)) {
        alert("Name entered, is not valid");
        return false;
    }

    //  phoneRE = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/;
    //  if(!phoneRE.test(phone)) {
    //          alert("Phone number entered, is not valid");
    //          return false;
    //      }

    emailRE = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRE.test(email)) {
        alert("Email Address entered, is not valid");
        return false;
    }
    var data = {
        name: name,
        //    phone : phone,
        email: email,
        desc: desc
    };

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", URL);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify(data));
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
            var response = JSON.parse(xmlhttp.responseText);
            if (xmlhttp.status === 200) {
                console.log('successful');
                document.getElementById("contact-form").innerHTML = "<h1>Thank you for your message/feedback<br>our team will get back to you soon!</h1>";
            } else {
                console.log('failed');
            }
        }
    }

    document.getElementById('contact-form').reset();

}