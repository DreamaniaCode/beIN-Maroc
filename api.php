<?php
// --- Step 1: Configuration ---

// Allow your React app to fetch data from this script.
// IMPORTANT: For production, you should replace "*" with your actual website domain for better security.
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Your database credentials
$servername = "srv1935.hstgr.io";
$username   = "u45030231_bein";
$password   = "u45030231_bein";
$dbname     = "u45030231_bein";


// --- Step 2: Database Connection ---

// Create a new MySQLi connection object
$conn = new mysqli($servername, $username, $password, $dbname);

// Check for connection errors
if ($conn->connect_error) {
    // If connection fails, stop the script and send a JSON error message
    http_response_code(500); // Internal Server Error
    echo json_encode(["error" => "Database connection failed: " . $conn->connect_error]);
    exit();
}


// --- Step 3: Fetch Data from Database ---

// SQL query to select all channels.
// Ensure your table is named 'channels' and has these columns.
$sql = "
    SELECT 
        id, 
        name, 
        description,
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

// Check if the query itself failed
if (!$result) {
    http_response_code(500);
    echo json_encode(["error" => "SQL query failed: " . $conn->error]);
    $conn->close();
    exit();
}


// --- Step 4: Process and Format Data into JSON ---

// Create an empty array to hold our formatted channel data
$channels_array = [];

if ($result->num_rows > 0) {
    // Loop through each row of the results from the database
    while($row = $result->fetch_assoc()) {
        
        // Build the final structured array for each channel, matching the React app's 'Channel' type
        $channel_item = [
            'id'             => $row['id'],
            'name'           => $row['name'],
            'description'    => $row['description'],
            'logo'           => $row['logo'],
            'streamUrl'      => $row['streamUrl'],
            // Convert the comma-separated string from the DB (e.g., "3,5") into a proper JSON array ["3", "5"]
            'categoryIds'    => !empty($row['categoryIds']) ? explode(',', $row['categoryIds']) : [], 
            // Convert the TINYINT (0 or 1) from the DB into a true/false boolean
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
