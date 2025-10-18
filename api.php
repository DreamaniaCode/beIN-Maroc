<?php
// --- Step 1: Configuration ---

// Set the correct headers to allow your React app to fetch data from this script
header("Access-Control-Allow-Origin: *"); // Allows any domain to access. For production, you might want to restrict this to your actual domain.
header("Content-Type: application/json; charset=UTF-8");

// Your database credentials
$servername = "srv1935.hstgr.io";
$username   = "u450302341_bein";
$password   = "u450302341_bein"; // The password you provided
$dbname     = "u450302341_bein";


// --- Step 2: Database Connection ---

// Create a new MySQLi connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check for connection errors
if ($conn->connect_error) {
    // If connection fails, stop the script and send a JSON error message
    echo json_encode(["error" => "Database connection failed: " . $conn->connect_error]);
    exit();
}


// --- Step 3: Fetch Data from Database ---

// This is your SQL query. 
// IMPORTANT: Make sure your table name is 'channels' and the column names match this query.
$sql = "
    SELECT 
        id, 
        name, 
        logo, 
        streamUrl, 
        categoryIds, 
        isLive, 
        currentProgram_title, 
        currentProgram_startTime, 
        currentProgram_endTime, 
        nextProgram_title, 
        nextProgram_startTime, 
        nextProgram_endTime 
    FROM 
        channels
";

$result = $conn->query($sql);

// Check if the query was successful
if (!$result) {
    // If the query fails, send a JSON error message
    echo json_encode(["error" => "SQL query failed: " . $conn->error]);
    $conn->close();
    exit();
}


// --- Step 4: Process and Format Data ---

// Create an empty array to hold our formatted channel data
$channels_array = [];

if ($result->num_rows > 0) {
    // Loop through each row of the results from the database
    while($row = $result->fetch_assoc()) {
        
        // Build the final structured array for each channel, matching the React app's 'Channel' type
        $channel_item = [
            'id'             => $row['id'],
            'name'           => $row['name'],
            'logo'           => $row['logo'],
            'streamUrl'      => $row['streamUrl'],
            // Convert the comma-separated string from the DB into a proper array
            'categoryIds'    => explode(',', $row['categoryIds']), 
            // Convert the 0 or 1 from the DB into a true/false boolean
            'isLive'         => (bool)$row['isLive'], 
            'currentProgram' => [
                'title'      => $row['currentProgram_title'],
                'startTime'  => $row['currentProgram_startTime'],
                'endTime'    => $row['currentProgram_endTime']
            ],
            'nextProgram'    => [
                'title'      => $row['nextProgram_title'],
                'startTime'  => $row['nextProgram_startTime'],
                'endTime'    => $row['nextProgram_endTime']
            ]
        ];
        
        // Add the formatted channel to our main array
        array_push($channels_array, $channel_item);
    }
}


// --- Step 5: Send the JSON Response ---

// Close the database connection as we are done with it
$conn->close();

// Encode the final array into a JSON string and send it as the response
echo json_encode($channels_array);

?>
