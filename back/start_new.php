<?php 
    require_once 'helper.php';

    function new_game($pdo) {
        $event    = ["Гол", "Пенальти", "Штрафной", ""];
        $command  = ["RED", "BLUE"];
        $player   = ["One", "Two", "Three"];
    
        $res = [];

        $scoore->RED = 0;
        $scoore->BLUE = 0;
    
        for($i = 0; $i < 60; $i++) {
            $goal   = $event[rand(0, 3)];
            $team   = $command[rand(0, 1)];
            if($goal == "Гол") {
                $scoore->$team = $scoore->$team + 1;
            }
            
            $res[]  = ["event"   => $goal, 
                      "command" => $team,
                      "player"  => $player[rand(0, 2)],
                      "num" => $i
                    ];
        }
    
        $sql = "INSERT nebo (`result`, `game_info`) VALUES (?, ?)";
        $data = [json_encode($scoore), json_encode($res)];
    
        addInfo($pdo, $data, $sql);
        $resp->new_game = $res;
        echo json_encode($resp);
    }
    
    new_game($pdo);

