let container = document.querySelector(".container");

function start_new() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://abelikov5.ru/nebo/start_new.php', true);
    xhr.send();

    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
            console.log('error!');
        } else {
            match_arr = JSON.parse(xhr.responseText).new_game;

            console.log(match_arr);
            container.classList.remove("align_center")
            document.querySelector(".wrap_play_btn").classList.add("d_none");
            document.querySelector(".play_game").classList.remove("d_none");
            // match_arr = JSON.parse(match_arr.live[0].game_info);
            console.log("match _ json", match_arr);
            timer(i, true, 1000, 0);
            if(match_arr[0].event == "Гол") {
                change_tablo(match_arr[0].command);
            }
            add_event('0" Начало матча! И сразу ' + match_arr[60 - i].event);

        }
    }

}

function fill_history(arr) {
    if (arr.live) {
        arr = arr.history;

        arr = arr.splice(1,9);
    } else {
        arr = arr.history;
    }
    console.log(arr);
    

    let cont_history = document.querySelector('.history_info');
    arr.forEach(el => {
        let tmp_hist = document.createElement('div');
        tmp_hist.classList.add('el_history');
        tmp_hist.innerHTML = `Игра номер ${el.id} закончилась со счетом ${JSON.parse(el.result).RED}:${JSON.parse(el.result).BLUE} RED против BLUE ${el.timestamp}`;
        cont_history.append(tmp_hist);
    });
}

function get_data() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://abelikov5.ru/nebo/nebo_rand.php', true);
    xhr.send();

    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
            console.log('error!');
        } else {
            match_arr = JSON.parse(xhr.responseText);

            console.log(match_arr);
            fill_history(match_arr);

            if (match_arr.live) {
                let ts_now = parseInt(new Date().valueOf() / 1000);
                let ts_bd  =  parseInt(Date.parse(match_arr.live[0].timestamp) / 1000); 
                let ts_div = ts_now - ts_bd;
                
                container.classList.remove("align_center")
                document.querySelector(".wrap_play_btn").classList.add("d_none");
                document.querySelector(".play_game").classList.remove("d_none");
                match_arr = JSON.parse(match_arr.live[0].game_info);

                console.log("seconds ts_now"  + ts_now, "ts_bd " + ts_bd, ts_now - ts_bd);
                timer(i, true, 1, ts_div);
                if(match_arr[0].event == "Гол") {
                    change_tablo(match_arr[0].command);
                }
                add_event('0" Начало матча! И сразу ' + match_arr[60 - i].event);
            }
        }
    }
}

function new_match() {
    container.classList.remove("align_center")
    document.querySelector(".wrap_play_btn").classList.add("d_none");
    document.querySelector(".play_game").classList.remove("d_none");
    get_data();
}

let min         = document.querySelector(".min")
let sec         = document.querySelector(".sec")
let info        = document.querySelector(".match_info");
let red_scoore  = document.querySelector(".red_scoore");
let blue_scoore = document.querySelector(".blue_scoore");
let i = 60;
let match_arr;
let event_text = '';
let goal_arr = ["ГОЛ!", "Это ГООООООЛЛЛЛЛ ", "Г о о о л!!!! ", "Ура Гол!!!", "ГОООЛ "];

function add_event(event) {
    let new_event = document.createElement("div");
    new_event.classList.add("event");
    new_event.innerHTML = event;
    info.prepend(new_event);
}
function change_tablo(team) {
    if(team == "RED") {
        let tmp_scoore = parseInt(red_scoore.textContent);
        red_scoore.innerHTML = tmp_scoore + 1 + ":";
        return ;
    }
    let tmp_scoore = parseInt(blue_scoore.textContent);
    blue_scoore.innerHTML = tmp_scoore + 1;
}

function timer(i, start, setTime, speedNum) {
    console.log("speedNum " + speedNum, "i " + i)
    if (60 - i >= speedNum) {
        setTime = 1000;
    }
    if (start) {
        setTimeout(() => {
            min.innerHTML = "00:";
            sec.innerHTML = "59";
            timer(i, false, setTime, speedNum);
        }, setTime)

    } else {
        if (i > 1) {
            i -= 1;
            let tmp = i + 1;
            let tmp_event = match_arr[60 - i].event;
            if (tmp_event == "Гол") {
                tmp_event = goal_arr[Math.floor(Math.random() * goal_arr.length)] + " Игрок " + match_arr[60 - i].player + " из команды " + match_arr[60 - i].command + ' забивает ';
                change_tablo(match_arr[60 - i].command);
            }

            add_event(60 - i + '" ' + tmp_event);
            tmp = tmp < 11 ? "0" + i : i;
            setTimeout(timer, setTime, i, false, setTime, speedNum);
            sec.innerHTML = tmp;
        } else {
            add_event('00" Матч окончен! Вот это была игра. Всем спасибо ;)');
            sec.innerHTML = '00';
        }
    }
}

get_data();
