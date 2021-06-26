let serverURL = 'https://script.google.com/macros/s/AKfycbxb3oNf7jKEt8VcAVqNOLHXXlBT7kLIZ-vf1N7gmNWt_Qr5jX9C81AskG-dyU3FacE/exec';

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
        setNum(data);
    }).fail(function(data){
        alert('error');
    });
}

function setNum(sData){
    let num_olivia = 0;
    let num_taylor = 0;
    let num_dua = 0;
    let num_shawn = 0;
    let num_charlie = 0;

    for(let i=1; i<sData.length; i++){
        if(sData[i][1] == 'Olivia Rodrigo'){
            num_olivia++;
        }
        if(sData[i][1] == 'Taylor Swift'){
            num_taylor++;
        }
        if(sData[i][1] == 'Dua Lipa'){
            num_dua++;
        }
        if(sData[i][1] == 'Shawn Mendes'){
            num_shawn++;
        }
        if(sData[i][1] == 'Charlie Puth'){
            num_charlie++;
        }
    }

    console.log(num_taylor);
    console.log(num_olivia);
    console.log(num_dua);
    console.log(num_shawn);
    console.log(num_charlie);

    $('#olivia .vote-num').html(num_olivia + ' votes');
    $('#taylor .vote-num').html(num_taylor + ' votes');
    $('#dua .vote-num').html(num_dua + ' votes');
    $('#shawn .vote-num').html(num_shawn + ' votes');
    $('#charlie .vote-num').html(num_charlie + ' votes');
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