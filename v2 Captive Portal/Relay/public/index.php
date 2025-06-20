<?php

$url = "https://ferrywifi.com/public/?" ;
$url .= "vessel=" . $_GET['vessl'] ;
$url .= "&node_mac=" . $_GET['ap_mac'] ;
$url .= "&client_mac=" . $_GET['client_mac'] ;
$url .= "&client_ip=" . $_GET['client_ip'] ;
$url .= "&base_grant_url=" . rawurlencode($_GET['base_grant_url']) ;

?>
<!--
This page contains software contributions from:
----
Cory Guynn
www.InternetOfLEGO.com
2016
----
Dom Pannone
AMHS/DOT&PF 
2024
----
LICENSE: MIT
-->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="./css/style.css">
        <script src="./js/meraki.js"></script>
        <style>
            .custom-btn {
                display: inline-block;
                background-color: #103359; /* Adjust to match the original button's background color */
                color: #ffffff; /* Adjust to match the original button's text color */
                padding: 10px;
                text-align: center;
                text-decoration: none;
                font-size:15px;
                width: 100%;
                line-height:16px;
                transition: background-color 0.3s ease;
                border: none;
            }
            .custom-btn:hover {
                background-color: #2c54d6; /* Adjust to match the original button's hover color */
                text-decoration: none;
            }
        </style>
    </head>
    <div class="container">  
      
      <form id="loginForm" action="#">
        <center>Alaska Department of Transportation & Public Facilities</center>
            <center>
                <img src="./amhs-logo.png" alt="Alaska Marine Highway Logo" style="width:225px; margin-top:15px; height:auto;">
            </center>
        <br>
        <a href="<? echo $url;?>" target="_blank" rel="noopener noreferrer" class="custom-btn" onclick="window.open(this.href, '_blank'); return false;">Connect to Free Wi-Fi</a>
      </form>
    </div>
</html>
