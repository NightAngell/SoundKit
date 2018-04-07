document.addEventListener("DOMContentLoaded", startApp);
//i is there like a i-track
function startApp()
{
    //Buttons handlers
    let record_buttons = document.querySelectorAll(".record_track-button"); //Start and Stop record. Clear when started.
    let play_track_buttons = document.querySelectorAll(".play-track-button");
    let clear_track_buttons = document.querySelectorAll(".clear-track-button");
    let choose_to_play_track_buttons = document.querySelectorAll(".choose_to_play_track_button");
    let play_choosed_tracks_button = document.querySelector(".play-choosed-tracks-button");
    let play_all_track_button = document.querySelector(".play-tracks-all-button");
    let stop = document.querySelectorAll(".stop_button");
    let stop_all = document.querySelector(".stop-all");
    //Virtual keyboard buttons
    let virtual_keyboard = document.querySelectorAll(".container-virtual-buttons > button");
    //Helping variables
    let number_of_tracks = record_buttons.length;
    let tracks_total_time = new Array(number_of_tracks);
    let delay_time = 500;
    for(let i = 0; i < tracks_total_time.length; i++)
    {
        //Make 0.5s delay when i-track doesn`t recorded 
        //Because I want prevent "blink effect" when I click play button
        tracks_total_time[i] = delay_time;
    }
    //Timeouts Handlers
    let sound_timeouts = new Array(number_of_tracks);
    let track_total_time_timeout;
    //Flags
    let first_defined = false;
    let is_recording = new Array(number_of_tracks);
    let is_choosed_to_play = new Array(number_of_tracks);
    for(let i = 0; i < number_of_tracks; i++)
    {
        is_recording[i] = false;
        is_choosed_to_play[i] = false;
    }
    //Sounds handlers
    let boom = document.querySelector("#boom");
    let clap = document.querySelector("#clap");
    let hihat = document.querySelector("#hihat");
    let kick = document.querySelector("#kick");
    let openhat = document.querySelector("#openhat");
    let ride = document.querySelector("#ride");
    let snare = document.querySelector("#snare");
    let tink = document.querySelector("#tink");
    let tom = document.querySelector("#tom");
    //Tracks handlers
    let tracks = new Array(number_of_tracks);
    //Actual time in miliseconds
    let now = Date.now();
    //Event Listeners
    for(let i = 0; i < number_of_tracks; i++)
    {
        record_buttons[i].addEventListener("click", (e)=>{
            if(is_recording[i])
            {
                enable_all_butttons();
                is_recording[i] = false;
            }
            else
            {
                clearTrack(i);
                disable_buttons_without_recording(i);
                is_recording[i] = true;
                now = Date.now();
            }
        });

        play_track_buttons[i].addEventListener("click", (e)=>{
            disable_buttons_without_stop(i);
            if(tracks[i] !== undefined)
            {
                play_track(i);
            }
            enable_buttons_by_time(i);
        });

        stop[i].addEventListener("click", (e)=>{
            enable_all_butttons();
            if(sound_timeouts[i] !== undefined)
            {
                clearTimeout(track_total_time_timeout);
                for(let j = 0; j < sound_timeouts[i].length; j++)
                {
                    clearTimeout(sound_timeouts[i][j]);
                }
            }
        });

        clear_track_buttons[i].addEventListener("click", (e)=>{
            clearTrack(i);
            e.target.innerHTML = "CLEARED";
            setTimeout(()=>{
                e.target.innerHTML = "Clear Track" + (i+1);
            }, delay_time*2);
        });

        choose_to_play_track_buttons[i].addEventListener("click", (e)=>{
            let button = e.target;
            if(is_choosed_to_play[i] === false)
            {
                is_choosed_to_play[i] = true;
                button.innerHTML = "CHOOSEN"
            }
            else
            {
                is_choosed_to_play[i] = false;
                button.innerHTML = "Choose track"+(i+1);
            }
        });

        window.addEventListener("keypress", (e)=>{
            if(is_recording[i])
            {
                tracks[i].push({
                    'key' : e.key,
                    'timestamp': Date.now() - now
                });
                play(e.key);   
            }
        });

        virtual_keyboard.forEach(function(element) {
            element.addEventListener("click", (e)=>{
                let key = e.target.getAttribute("data-key");
                if(is_recording[i])
                {
                    tracks[i].push({
                        'key' : key,
                        'timestamp': Date.now() - now
                    });
                    play(key);   
                }
            });
        }, this);
    }

    stop_all.addEventListener("click", (e)=>{
        enable_all_butttons();
        clearTimeout(track_total_time_timeout);
        for(let i= 0; i < number_of_tracks; i++)
        {
            if(sound_timeouts[i] !== undefined)
            {
                for(let j = 0; j < sound_timeouts[i].length; j++)
                {
                    clearTimeout(sound_timeouts[i][j]);
                }
            }
        }
    });

    play_all_track_button.addEventListener("click",(e)=>{
        disable_buttons_without_stop(null);
        for(let i = 0; i < number_of_tracks; i++)
        {
            if(tracks[i] !== undefined)
            {
                play_track(i);
                first_defined = true;
            }
        }
        enable_all_buttons_using_first_defined();
    });

    play_choosed_tracks_button.addEventListener("click", (e)=>{
        disable_buttons_without_stop(null);
        for(let i = 0; i < number_of_tracks; i++)
        { 
            if(tracks[i] !== undefined && is_choosed_to_play[i] === true)
            {   
                play_track(i);
                first_defined = true;
            }
        }
        enable_all_buttons_using_first_defined();
    });
    
    //Functions
    function play_track(i)
    {
        let x = 0;
        sound_timeouts[i] = new Array();
        tracks[i].forEach(function(element) {
            tracks_total_time[i] = element.timestamp;
            sound_timeouts[i][x] = setTimeout(()=>{
                play(element.key);
            },element.timestamp)
            x++
        }, this);     
    }

    //Play single sound
    function play(key)
    {   
        switch(key.toLowerCase())
        {
            case '7':
            {
                boom.currentTime = 0;
                boom.play();
                break;
            }
            case '8':
            {
                clap.currentTime = 0;
                clap.play();
                break;
            }
            case '9':
            {
                hihat.currentTime = 0;
                hihat.play();
                break;
            }
            case '4':
            {
                kick.currentTime = 0;
                kick.play();
                break;
            }
            case '5':
            {
                openhat.currentTime = 0;
                openhat.play();
                break;
            }
            case '6':
            {
                ride.currentTime = 0;
                ride.play();
                break;
            }
            case '1':
            {
                snare.currentTime = 0;
                snare.play();
                break;
            }
            case '2':
            {
                tink.currentTime = 0;
                tink.play();
                break;
            }
            case '3':
            {
                tom.currentTime = 0;
                tom.play();
                break;
            }
        }
    }

    function disable_buttons_without_stop(i)
    {
        for(let j = 0; j < number_of_tracks ; j++)
        {
            if(i !== j)
            {
                stop[j].disabled = true;
            }
            record_buttons[j].disabled = true;
            play_track_buttons[j].disabled= true;
            clear_track_buttons[j].disabled = true;
            choose_to_play_track_buttons[j].disabled = true;
        }
        play_all_track_button.disabled = true;
        play_choosed_tracks_button.disabled = true;
    }

    function disable_buttons_without_recording(i)
    {
        for(let j = 0; j < number_of_tracks ; j++)
        {
            if(i !== j)
            {
                record_buttons[j].disabled = true;
            }
            play_track_buttons[j].disabled= true;
            clear_track_buttons[j].disabled = true;
            choose_to_play_track_buttons[j].disabled = true;
            stop[j].disabled = true;
        }
        stop_all.disabled = true;
        play_all_track_button.disabled = true;
        play_choosed_tracks_button.disabled = true;
    }

    function enable_all_butttons()
    {
        for(let j = 0; j < number_of_tracks ; j++)
        {
            record_buttons[j].disabled = false;
            play_track_buttons[j].disabled= false;
            clear_track_buttons[j].disabled = false;
            choose_to_play_track_buttons[j].disabled = false;
            stop[j].disabled = false;
        }
        stop_all.disabled = false;
        play_all_track_button.disabled = false;
        play_choosed_tracks_button.disabled = false;
    }

    function enable_buttons_by_max_time()
    {
        let max = 0;
        let is_first = false;
        for(let i = 0; i < number_of_tracks; i++)
        {
            if(tracks_total_time[i] !== undefined)
            {
                if(!is_first)
                {
                    max = tracks_total_time[i];
                    is_first = true;   
                }
                if(max < tracks_total_time[i])
                {
                    max = tracks_total_time[i];
                }
            }
        }
        track_total_time_timeout = setTimeout(()=>{
            enable_all_butttons();
        }, max)
    }

    function enable_buttons_by_time(i)
    {
        track_total_time_timeout = setTimeout(()=>{
            enable_all_butttons();
        }, tracks_total_time[i]);
    }

    function enable_all_buttons_using_first_defined()
    {
        if(first_defined)
        {
            
            enable_buttons_by_max_time();
        }
        else
        {
            setTimeout(()=>{
                enable_all_butttons();
            }, delay_time);
        }
    }

    function clearTrack(i)
    {
        tracks[i] = [];
        for(let i = 0; i < tracks_total_time.length; i++)
        {
            tracks_total_time[i] = delay_time;
        }
    }
}
        