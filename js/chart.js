let serverURL = 'https://script.google.com/macros/s/AKfycbyNYdTkYBGaRODfS4MNtbVZKghi3B67ZuB-7s8alJsWPaMbdvcP5xHmg1MFMtnXItw/exec';

$(document).ready(function(){
    showSpinner();
    initBtnFunc();
    readFromServer();
});

function initBtnFunc(){
    $('.btn-vote').click(function(event){
        sendToServer();
    });
}

function sendToServer(){
    let parameter = {};
    parameter.voteArtist = $('select[name=voteArtist]').val();
    console.log(parameter);

    parameter.method = "write1";

    $.post(serverURL, parameter, function(data){
        console.log(data);
        if(data.result = 'sus'){
            alert('Thank you for voting');
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
        // setBox(data);
    }).fail(function(data){
        alert('error');
    });
}

function setBox(sData){
    let node = $('.vote-card-area').html();
    for(let i=1; i<sData.length; i++){
        let content = node.replace('VOTE_NUM_OLIVIA', sData[i][2]);
        content = content.replace('VOTE_NUM_TAYLOR', sData[i][3]);
        content = content.replace('VOTE_NUM_DUA', sData[i][3]);
    }
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