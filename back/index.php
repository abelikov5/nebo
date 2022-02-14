<?php 
    require_once 'helper.php';

    $sql = 'SELECT * FROM `nebo` ORDER BY `timestamp` DESC LIMIT 1';
    $current_game = sqlQuery($pdo, $sql);

    $ts = strtotime($current_game[0]->timestamp);
    $ts_diff = time() - $ts;
    $sql          = 'SELECT id, result, timestamp FROM `nebo` ORDER BY `timestamp` DESC LIMIT 10';
    $history_game = sqlQuery($pdo, $sql);

    if ($ts_diff < 59) {
        $resp->history = $history_game;
        $resp->live    = $current_game; 
        echo json_encode($resp);
        return ;
    } 
    
    $resp->history  = $history_game;
    $resp->live     = false;
    echo json_encode($resp);

