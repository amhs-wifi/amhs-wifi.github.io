// 2024.12.07 - modified by Dom Pannone for Wi-Fi pilot Project on Flagship Columbia!

// Parse paramaters
var base_grant_url = decodeURIComponent(GetURLParameter("base_grant_url"));
// Make.com webhook:
var user_continue_url = "https://hook.us2.make.com/zh84bj98611ifbps8z2xtyasowhjs5js";

var user_continue_url_original = GetURLParameter("user_continue_url");
var node_mac = GetURLParameter("node_mac");
var client_ip = GetURLParameter("client_ip");
var client_mac = GetURLParameter("client_mac");
var vessel = GetURLParameter("vessel");
var data = {};
const cookieName = "wifiUniqueDeviceID";


document.addEventListener("DOMContentLoaded", function(event) {
    checkAndRedirect();
});

// Form Submit handler. 
document.getElementById('loginForm').onsubmit= function(e){
    e.preventDefault(); //prevents default form submission process to allow login and validation
    login();
}


// Button handler function to store the form data and login. 
function login(){
    // send the data somewhere like a database

    data.email = document.getElementById("email").value;
    if (validateEmail(data.email))
    {
        // Complete Login
        authUser();
    }
}

// if email is valid
function authUser(){
    var loginUrl = base_grant_url;
    
    user_continue_url += "?vessel="+vessel+"&email="+btoa(data.email)+"&cip="+client_ip+"&cmac="+client_mac+"&apmac="+node_mac;
    user_continue_url = encodeURIComponent(user_continue_url);
    
    loginUrl += "?continue_url="+user_continue_url;

    const uniqueID = generateUniqueID();
    setCookie(cookieName, uniqueID, 24);

    window.location.href = loginUrl;
}

// Helper function to parse URL
function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}

function validateEmail() {
    const emailField = document.getElementById('email');
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    if (!emailPattern.test(emailField.value)) {
        alert('Please enter a valid email address.');
        return false; // Prevent form submission
    }
    return true; // Allow form submission
}

function setCookie(name, value, hours) {
    const date = new Date();
    date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/; Secure; SameSite=Strict`;
}

function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(cname) === 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}

function generateUniqueID() {
    return 'id-' + Math.random().toString(36).substring(2, 16) + '-' + Date.now();
}

function checkAndRedirect() {
    const redirectURL = user_continue_url_original;
    const cookieValue = getCookie(cookieName);

    if (cookieValue) {
        // Cookie exists, redirect to another page
        var loginUrl = base_grant_url;
       
        user_continue_url += "?vessel="+vessel+"&email=ReAuth&cip="+client_ip+"&cmac="+client_mac+"&apmac="+node_mac;
        user_continue_url = encodeURIComponent(user_continue_url);
        
        loginUrl += "?continue_url="+user_continue_url;
        
        window.location.href = loginUrl;
    } 
}