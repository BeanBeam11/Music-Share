let serverURL = 'https://script.google.com/macros/s/AKfycbyNYdTkYBGaRODfS4MNtbVZKghi3B67ZuB-7s8alJsWPaMbdvcP5xHmg1MFMtnXItw/exec';
let event_ary = ['input[type=text]','textarea'];

$(document).ready(function(){
    showSpinner();
    initBtnFunc();
    readFromServer();
});

for(let i=0;i<event_ary.length;i++){
    $(event_ary[i]).focusout(function(event){
        if($(this).val() == ''){
            setTip($(this));
        }
    });
    $(event_ary[i]).keyup(function(event){
        if($(this).val() != ''){
            removeTip($(this));
        }
    });
}

function initBtnFunc(){
    $('.btn-share').click(function(event){
        checkField();
    });
}

function sendToServer(){
    let parameter = {};
    parameter.userName = $('input[name=userName]').val();
    parameter.userSong = $('input[name=userSong]').val();
    parameter.userSinger = $('input[name=userSinger]').val();
    parameter.userLyric = $('textarea[name=userLyric]').val();
    parameter.userReason = $('textarea[name=userReason]').val();
    console.log(parameter);

    parameter.method = "write1";

    $.post(serverURL, parameter, function(data){
        console.log(data);
        if(data.result = 'sus'){
            alert('Thank you for sharing');
            setTimeout(refreshPage(), 1700);
        } else{
            alert('送出失敗，請檢查後再試試看');
        }
    }).fail(function(data){
        alert('送出失敗');
        console.log(data);
    });  
}

function readFromServer(){
    let parameter = {};
    parameter.method = 'read1';
    $.post(serverURL, parameter, function(data){
        setBox(data);
    }).fail(function(data){
        alert('error');
    });
}

function setBox(sData){
    let node = $('#box01').html();
    console.log(sData);
    for(let i=sData.length-1; i>0; i--){
        let content = node.replace('SONG_HERE', sData[i][2]);
        content = content.replace('SINGER_HERE', sData[i][3]);
        content = content.replace('NAME_HERE', sData[i][1]);
        content = content.replace('LYRIC_HERE', sData[i][4]);
        content = content.replace('REASON_HERE', sData[i][5]);
        content = content.replace('ID_HERE', sData[i][0]);
        $('.row').append(content);
    }

    switchContent();
}

function checkField(){
    let name = $('input[name=userName]');
    let song = $('input[name=userSong]');
    let singer = $('input[name=userSinger]');
    let lyric = $('textarea[name=userLyric]');
    let reason = $('textarea[name=userReason]');

    if( name.val() == ''){
        setTip(name);
        return false;
    }
    if( song.val() == ''){
        setTip(song);
        return false;
    }
    if( singer.val() == ''){
        setTip(singer);
        return false;
    }
    if( lyric.val() == ''){
        setTip(lyric);
        return false;
    }
    if( reason.val() == ''){
        setTip(reason);
        return false;
    }
    else if(name.val() != '' && song.val() != '' && singer.val() != '' && lyric.val() != '' && reason.val() != ''){
        sendToServer();
    }
}

function setTip(dom){
    let template = $('#tipTemplate01');
    let node = $('#tipTemplate01').html();
    if(dom.closest('.main-group').find('.tip').length == 0){
        dom.closest('.main-group').append(node);
        dom.closest('.main-group').addClass('bdr');
    }
}

function removeTip(dom){
    dom.closest('.main-group').find('.tip').remove();
    dom.closest('.main-group').removeClass('bdr');
}

function switchContent(){
    $('.box').click(function(event){
        let boxID = $(this).attr("id");  
        // console.log(boxID);
        $('#' + boxID).toggleClass('flipped');
    });
}

function refreshPage(){
    window.location.reload();
} 

function showSpinner(){
    $('.loading').show();
    setTimeout(function hideSpinner(){
        $('.loading').hide();
    }, 1700);
}