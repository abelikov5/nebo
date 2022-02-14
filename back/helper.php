<?php
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
        header('Access-Control-Allow-Headers: token, Content-Type');
        header('Access-Control-Max-Age: 1728000');
        header('Content-Length: 0');
        header('Content-Type: text/plain');
        die();
    }

    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    
    $host       = 'localhost';
    $user       = 'a0077026_admin';
    $password   = 'admin';
    $dbname     = 'a0077026_playlist';

    $dsn = 'mysql:host=' . $host . ';dbname=' . $dbname . ';charset=utf8';
    // PDO instance, наследуем класс PDO в переменную $pdo;
    $pdo = new PDO($dsn, $user, $password);
    // PDO attribute, чтобы результат был ассоциативным массивом.
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
    $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, true);
    
    function sqlQuery ($pdo, $sql) {
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $posts = $stmt->fetchAll();
        return $posts;
    }

    function addInfo ($pdo, $data, $sql) {
        $stmt = $pdo->prepare($sql);
        $stmt->execute($data);
        return $pdo->lastInsertId();
    }
    
?>    