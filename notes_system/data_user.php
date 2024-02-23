<?php
$action = $_GET["action"] ?? 0;
date_default_timezone_set("America/Sao_Paulo");
if ($action == 0) {
    $data = [];
    if (file_exists("user_notes_arm.txt")) {
        $data = json_decode(file_get_contents("user_notes_arm.txt"), true);
    }
    if (isset($_POST["new_password"])) {
        $user_email = $_POST["user_email"];
        $new_password = $_POST["new_password"];
        $data["$user_email"]["user_data"][1] = $new_password;
        file_put_contents("user_notes_arm.txt", json_encode($data));
        header("Location: login.html");
        exit();
    } else {
        if (isset($_POST["user_name"])) {
            $user_email = $_POST["user_email"];
            $user_password = $_POST["user_password"];
            $user_name = $_POST["user_name"];
            $user_profile_link = $_POST["user_profile_link"];
            $data["$user_email"] = [
                "user_data" => ["$user_name", "$user_password", "$user_email", "$user_profile_link"],
                "user_notes" => [
                    ["Welcome to notes_writer, where you can public notes", date("m/d/Y"), true]
                ]
            ];
            file_put_contents("user_notes_arm.txt", json_encode($data));
        }
        $user_email = $_POST["user_email"];
        setcookie("user_login", "$user_email", time() + 120);
        header("Location: notes_writer.html");
        exit();
    }
    /*
    $a = [
        "email" => [
            "user_data" => ["user_name", "user_password", "user_profile_link"],
            "user_notes" => [
                ["note_date", "note_content"],
                ["note_date", "note_content"],
                ["note_date", "note_content"],
                ["note_date", "note_content"],
                ["note_date", "note_content"],
                ["note_date", "note_content"],
                ["note_date", "note_content"],
                ["note_date", "note_content"],
                ["note_date", "note_content"],
                ["note_date", "note_content"],
                ["note_date", "note_content"],
                ["note_date", "note_content"],
                ["note_date", "note_content"]
            ]
        ],
    ];
    */
} else if ($action == 1) {
    $data = [];
    if (file_exists("user_notes_arm.txt")) {
        $data = json_decode(file_get_contents("user_notes_arm.txt"), true);
    }
    printf(json_encode($data));
} else if ($action == 2) {
    setcookie("user_login", 0, time() - 1);
    header("Location: login.html");
    exit();
} else if ($action == 3) {
    $data = [];
    if (file_exists("user_notes_arm.txt")) {
        $data = json_decode(file_get_contents("user_notes_arm.txt"), true);
    }
    if (isset($_COOKIE["user_login"])) {
        printf(json_encode($data[$_COOKIE["user_login"]]));
    } else {
        printf(json_encode(false));
    }
}