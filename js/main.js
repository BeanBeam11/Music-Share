let serverURL = 'https://script.google.com/macros/s/AKfycbxyYWGlQrAWoQNDVgFZqbgVS7STXDnH7xkIlqyfOTzv3ERccYn8sbmWzl2Yrafrtw4/exec';

$(document).ready(function(){
    showSpinner();
    initBtnFunc();
    readFromServer();
});

function initBtnFunc(){
    $('.btn-share').click(function(event){
        sendToServer();
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

    // refreshPage();
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
    for(let i=1; i<sData.length; i++){
        let content = node.replace('SONG_HERE', sData[i][2]);
        content = content.replace('SINGER_HERE', sData[i][3]);
        content = content.replace('NAME_HERE', sData[i][1]);
        content = content.replace('LYRIC_HERE', sData[i][4]);
        content = content.replace('REASON_HERE', sData[i][5]);
        $('.row').append(content);
    }

    switchContent();
}

function switchContent(){
    $('.info').hover(function(event){
        
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