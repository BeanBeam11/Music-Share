let serverURL = 'https://script.google.com/macros/s/AKfycbxyYWGlQrAWoQNDVgFZqbgVS7STXDnH7xkIlqyfOTzv3ERccYn8sbmWzl2Yrafrtw4/exec';

$(document).ready(function(){
    initBtnFunc();
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
            alert('送出成功');
        } else{
            alert('送出失敗，請檢查後再試試看');
        }
    }).fail(function(data){
        alert('送出失敗');
        console.log(data);
    });  
}