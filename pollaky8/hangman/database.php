<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    
    // Create connection
    $conn = new mysqli($servername, $username, $password);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    /*
    // Create database
    $sql = "CREATE DATABASE hangman CHARACTER SET 'utf8' COLLATE 'utf8_hungarian_ci'";
    if ($conn->query($sql) === TRUE) {
    echo "Database created successfully";
    } else {
    echo "Error creating database: " . $conn->error;
    }
    
    // create table
    $sql = "CREATE TABLE `hangman`.`szavak`
    (`id` INT NOT NULL , 
    `word` VARCHAR(40) NOT NULL , 
    `category` VARCHAR(30) NOT NULL , 
    PRIMARY KEY (`id`))
    ENGINE = InnoDB;";

    if (mysqli_query($conn, $sql)) {
        echo "Table szavak created successfully";
      } else {
        echo "Error creating table: " . mysqli_error($conn);
      }
   
  
    $dbname = "hangman";
    $conn = new mysqli($servername, $username, $password, $dbname);

    $orszagok = ["Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia","Cameroon","Canada","Central African Republic","Chile","China","Colombia","Comoros","Democratic Republic of the Congo","Republic of the Congo","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Guatemala","Guinea","Guinea-Bissau","Guyana","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Togo","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Venezuela","Vietnam","Zambia","Zimbabwe"
];

    $final = 0;
    
    for ($i=0; $i < count($orszagok); $i++) { 
        // echo "$i, $orszagok[$i]";
        $sql = "INSERT INTO `szavak` (`id`, `word`, `category`) VALUES ('$i', '$orszagok[$i]', 'ország')";
        mysqli_query($conn, $sql);
        $final++ ;
    }
     
    
      
    
      $varosok = [
        "New York", "London", "Paris", "Tokyo", "Beijing", 
        "Berlin", "Rome", "Amsterdam", "Barcelona", "Los Angeles", 
        "Madrid", "Vienna", "Brussels", "Lisbon", "Sydney", 
        "Milan", "Toronto", "Moscow", "Dubai", "Seoul", 
        "Rome", "Prague", "Bangkok", "Mexico City", 
        "São Paulo", "Buenos Aires", "Singapore", "Toronto", "Istanbul", 
        "Copenhagen", "Oslo", "Helsinki", "San Francisco", "Jakarta", 
        "Rio de Janeiro", "Cairo", "Los Angeles","San Diego",  
        "Miami", "Shanghai", "Hong Kong", "Madrid", "Valencia", "Manchester", "Washington", "Chicago",
        "Ottawa","Szeged","Budapest","Zalaegerszeg","Debrecen","Gyula","Sopron","Eger","Bratislava", "Bucharest",
        "zagreb", "Ljubljana", "Velence", "Frankfurt", "New Delhi", 
    ];
    

    for ($i=0; $i < count($varosok); $i++) { 
       
        $sql = "INSERT INTO `szavak` (`id`, `word`, `category`) VALUES ('$final', '$varosok[$i]', 'város')";
        mysqli_query($conn, $sql);
        $final++ ;
    }
    
    $animek = [
        "Naruto", "One Piece", "Attack on Titan", "Dragon Ball", "Fullmetal Alchemist", 
        "My Hero Academia", "Demon Slayer", "Death Note", "Tokyo Ghoul", "Bleach", 
        "Sword Art Online", "Hunter x Hunter", "JoJos Bizarre Adventure", "Neon Genesis Evangelion", "Cowboy Bebop", 
        "Fairy Tail", "Naruto Shippuden", "Black Clover", "One Punch Man", 
        "Tokyo Revengers", "Dragon Ball Z", "Mob Psycho", "The Seven Deadly Sins", "Black Lagoon", 
        "Code Geass", "The Promised Neverland", "Solo Leveling", "Sakamoto Days", "Dragon Ball Daima", "Blue Lock", "Inazuma Eleven",
        "Haikyuu", "Another", "Erased", "Chainsaw Man", "Death Parade", "Horimiya", "Jujutsu Kaisen", "Mashle",
        "No game No life", "Your Lie in april", "Food wars", "Vinland Saga", "Berserk",
    ];

    for ($i=0; $i < count($animek); $i++) { 
        
        $sql = "INSERT INTO `szavak` (`id`, `word`, `category`) VALUES ('$final', '$animek[$i]', 'anime')";
        mysqli_query($conn, $sql);
        $final++ ;
    }

    $jatekok = [
        "Super Mario Bros", "The Legend of Zelda", "Tetris", "Pac Man", "Minecraft", "Silent Hill",
        "The Witcher", "Grand Theft Auto", "Fortnite", "Halo", "Call of Duty", "Spider Man", "Dota",
        "Street Fighter", "Final Fantasy", "Pokemon", "World of Warcraft", "Overwatch", "Getting over it",
        "Red Dead Redemption", "Metal Gear Solid", "Dark Souls", "Half Life", "Counter-Strike", "Farming Simulator",
        "Sonic the Hedgehog", "The Last of Us", "DOOM", "Assassins Creed", "Grand Theft Auto: San Andreas", "Resident Evil", 
        "Mega Man", "Mario Kart", "Destiny", "The Sims", "Diablo", "Portal", "Elden Ring", "Terraria", "Dead by Daylight",
        "FIFA", "Bloodborne", "Far Cry", "Animal Crossing", "Among Us", "Fall Guys", "Cuphead", "OSU", "Roblox","Arma",
        "Forza Horizon", "Need for Speed", "World of Tanks", "Phasmophobia", "The forest", "Euro Truck Simulator","Trackmania",
        "Brawl Stars", "Clash Royale", "Clash of Clans", "Valorant", "League of Legends", "Rocket League", "Stardew Valley",
        "Battlefield", "Ark survival", "War thunder", "PUBG", "MiSide", "God of War", "Cyberpunk", "Subnautica", "FNAF", "Warhammer"
    ];

    for ($i=0; $i < count($jatekok); $i++) { 
        
        $sql = "INSERT INTO `szavak` (`id`, `word`, `category`) VALUES ('$final', '$jatekok[$i]', 'videójáték')";
        mysqli_query($conn, $sql);
        $final++ ;
    } */
    $conn->close();
?>

