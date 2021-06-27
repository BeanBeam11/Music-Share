let serverURL = 'https://script.google.com/macros/s/AKfycbxh0AzyZEk04pXRf79rCjdTyrZgPTG03eVaL8BpgGNPxO4sjhvD1TGOYk6etnKjdiX6/exec';
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
$('select').change(function(){
    removeTip($(this));
});

function initBtnFunc(){
    $('.btn-add').click(function(event){
        checkField();
    });
}

function sendToServer(){
    let parameter = {};
    parameter.userName = $('input[name=userName]').val();
    parameter.imgURL = $('input[name=imgURL]').val();
    parameter.typeArtist = $('select[name=typeArtist]').val();
    console.log(parameter);

    parameter.method = "write1";

    $.post(serverURL, parameter, function(data){
        console.log(data);
        if(data.result = 'sus'){
            alert('Thank you for Adding');
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
        setPhoto(data);
    }).fail(function(data){
        alert('error');
    });
}

function setAlbum(){
    $('#type-album-taylor').hide();

    $('#artist-avatar-shawn').click(function(event){
        checkField();
    });
    $('#artist-avatar-olivia').click(function(event){
        checkField();
    });
    $('#artist-avatar-taylor').click(function(event){
        checkField();
    });
    $('#artist-avatar-dua').click(function(event){
        checkField();
    });
    $('#artist-avatar-charlie').click(function(event){
        checkField();
    });
}

function setPhoto(sData){

    let node = $('#type-album').html();
    console.log(sData);

    for(let i=sData.length-1; i>0; i--){
        let content = node.replace('NAME_HERE', sData[i][1]);
        content = content.replace('IMG_URL_HERE', sData[i][3]);
        content = content.replace('ID_HERE', sData[i][0]);

        if(sData[i][2] == 'Taylor Swift'){
            content = content.replace('BOX_ID', 'ID_taylor');
        }
        if(sData[i][2] == 'Olivia Rodrigo'){
            content = content.replace('BOX_ID', 'ID_olivia');
        }
        if(sData[i][2] == 'Dua Lipa'){
            content = content.replace('BOX_ID', 'ID_dua');
        }
        if(sData[i][2] == 'Shawn Mendes'){
            content = content.replace('BOX_ID', 'ID_shawn');
        }
        if(sData[i][2] == 'Charlie Puth'){
            content = content.replace('BOX_ID', 'ID_charlie');
        }
        
        $('.row').append(content);
    }

    $('.artist-avatar').hover(function(){
        $(this).toggleClass('op-1');
    });

    //預設顯示全部
    $('.ID_olivia').show();
    $('.ID_dua').show();
    $('.ID_shawn').show();
    $('.ID_charlie').show();
    $('.ID_taylor').show();

    //分別點擊會出現該歌手的專屬相簿
    $('#artist-avatar-taylor').click(function(event){
        $(this).toggleClass('op-1');
        $('#artist-avatar-shawn').removeClass('op-1');
        $('#artist-avatar-olivia').removeClass('op-1');
        $('#artist-avatar-dua').removeClass('op-1');
        $('#artist-avatar-charlie').removeClass('op-1');

        $('.ID_olivia').hide();
        $('.ID_dua').hide();
        $('.ID_shawn').hide();
        $('.ID_charlie').hide();

        $('.ID_taylor').show();
    });
    $('#artist-avatar-shawn').click(function(event){
        $(this).toggleClass('op-1');
        $('#artist-avatar-taylor').removeClass('op-1');
        $('#artist-avatar-olivia').removeClass('op-1');
        $('#artist-avatar-dua').removeClass('op-1');
        $('#artist-avatar-charlie').removeClass('op-1');

        $('.ID_olivia').hide();
        $('.ID_dua').hide();
        $('.ID_taylor').hide();
        $('.ID_charlie').hide();

        $('.ID_shawn').show();
    });
    $('#artist-avatar-olivia').click(function(event){
        $(this).toggleClass('op-1');
        $('#artist-avatar-shawn').removeClass('op-1');
        $('#artist-avatar-taylor').removeClass('op-1');
        $('#artist-avatar-dua').removeClass('op-1');
        $('#artist-avatar-charlie').removeClass('op-1');

        $('.ID_taylor').hide();
        $('.ID_dua').hide();
        $('.ID_shawn').hide();
        $('.ID_charlie').hide();

        $('.ID_olivia').show();
    });
    $('#artist-avatar-dua').click(function(event){
        $(this).toggleClass('op-1');
        $('#artist-avatar-shawn').removeClass('op-1');
        $('#artist-avatar-olivia').removeClass('op-1');
        $('#artist-avatar-taylor').removeClass('op-1');
        $('#artist-avatar-charlie').removeClass('op-1');

        $('.ID_olivia').hide();
        $('.ID_taylor').hide();
        $('.ID_shawn').hide();
        $('.ID_charlie').hide();

        $('.ID_dua').show();
    });
    $('#artist-avatar-charlie').click(function(event){
        $(this).toggleClass('op-1');
        $('#artist-avatar-shawn').removeClass('op-1');
        $('#artist-avatar-olivia').removeClass('op-1');
        $('#artist-avatar-dua').removeClass('op-1');
        $('#artist-avatar-taylor').removeClass('op-1');

        $('.ID_olivia').hide();
        $('.ID_dua').hide();
        $('.ID_shawn').hide();
        $('.ID_taylor').hide();

        $('.ID_charlie').show();
    });
}

function checkField(){
    let name = $('input[name=userName]');
    let imgURL = $('input[name=imgURL]');

    if( name.val() == ''){
        setTip(name);
        return false;
    }
    if( imgURL.val() == ''){
        setTip(imgURL);
        return false;
    }
    if($('select').val() == null){
        setTip($('select'));
        return false;
    }
    else if(name.val() != '' && imgURL.val() != '' && $('select').val() != null){
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

function refreshPage(){
    window.location.reload();
} 

function showSpinner(){
    $('.loading').show();
    setTimeout(function hideSpinner(){
        $('.loading').hide();
    }, 1700);
}