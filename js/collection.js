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
    let nodeTay = $('#type-album-taylor').html();
    let nodeOli = $('#type-album-olivia').html();
    let nodeDua = $('#type-album-dua').html();
    let nodeSha = $('#type-album-shawn').html();
    let nodeCha = $('#type-album-charlie').html();
    console.log(sData);

    let Tay = [];
    let Oli = [];
    let Dua = [];
    let Sha = [];
    let Cha = [];

    $('#artist-avatar-taylor').click(function(event){
        $('.ID_olivia').hide();
        $('.ID_dua').hide();
        $('.ID_shawn').hide();
        $('.ID_charlie').hide();
        for(let i=1; i<sData.length; i++){
            if(sData[i][2] == 'Taylor Swift'){
                Tay.push(sData[i]);
            }
        }
        console.log(Tay);
        for(let i=Tay.length-1; i>=0; i--){
            let content = nodeTay.replace('NAME_HERE', Tay[i][1]);
            content = content.replace('IMG_URL_HERE', Tay[i][3]);
            content = content.replace('ID_HERE', Tay[i][0]);
            $('.row').append(content);
        }
    });
    $('#artist-avatar-shawn').click(function(event){
        $('.ID_olivia').hide();
        $('.ID_dua').hide();
        $('.ID_taylor').hide();
        $('.ID_charlie').hide();
        for(let i=1; i<sData.length; i++){
            if(sData[i][2] == 'Shawn Mendes'){
                Sha.push(sData[i]);
            }
        }
        console.log(Sha);
        for(let i=Sha.length-1; i>=0; i--){
            let content = nodeSha.replace('NAME_HERE', Sha[i][1]);
            content = content.replace('IMG_URL_HERE', Sha[i][3]);
            content = content.replace('ID_HERE', Sha[i][0]);
            $('.row').append(content);
        }
    });
    $('#artist-avatar-olivia').click(function(event){
        $('.ID_taylor').hide();
        $('.ID_dua').hide();
        $('.ID_shawn').hide();
        $('.ID_charlie').hide();
        for(let i=1; i<sData.length; i++){
            if(sData[i][2] == 'Olivia Rodrigo'){
                Oli.push(sData[i]);
            }
        }
        console.log(Oli);
        for(let i=Oli.length-1; i>=0; i--){
            let content = nodeOli.replace('NAME_HERE', Oli[i][1]);
            content = content.replace('IMG_URL_HERE', Oli[i][3]);
            content = content.replace('ID_HERE', Oli[i][0]);
            $('.row').append(content);
        }
    });
    $('#artist-avatar-dua').click(function(event){
        $('.ID_olivia').hide();
        $('.ID_taylor').hide();
        $('.ID_shawn').hide();
        $('.ID_charlie').hide();
        for(let i=1; i<sData.length; i++){
            if(sData[i][2] == 'Dua Lipa'){
                Dua.push(sData[i]);
            }
        }
        console.log(Dua);
        for(let i=Dua.length-1; i>=0; i--){
            let content = nodeDua.replace('NAME_HERE', Dua[i][1]);
            content = content.replace('IMG_URL_HERE', Dua[i][3]);
            content = content.replace('ID_HERE', Dua[i][0]);
            $('.row').append(content);
        }
    });
    $('#artist-avatar-charlie').click(function(event){
        $('.ID_olivia').hide();
        $('.ID_dua').hide();
        $('.ID_shawn').hide();
        $('.ID_taylor').hide();
        for(let i=1; i<sData.length; i++){
            if(sData[i][2] == 'Charlie Puth'){
                Cha.push(sData[i]);
            }
        }
        console.log(Cha);
        for(let i=Cha.length-1; i>=0; i--){
            let content = nodeCha.replace('NAME_HERE', Cha[i][1]);
            content = content.replace('IMG_URL_HERE', Cha[i][3]);
            content = content.replace('ID_HERE', Cha[i][0]);
            $('.row').append(content);
        }
    });
    // for(let i=1; i<sData.length; i++){
    //     if(sData[i][2] == 'Taylor Swift'){
    //         Tay.push(sData[i]);
    //     }
    //     if(sData[i][2] == 'Olivia Rodrigo'){
    //         Oli.push(sData[i]);
    //     }
    //     if(sData[i][2] == 'Dua Lipa'){
    //         Dua.push(sData[i]);
    //     }
    //     if(sData[i][2] == 'Shawn Mendes'){
    //         Sha.push(sData[i]);
    //     }
    //     if(sData[i][2] == 'Charlie Puth'){
    //         Cha.push(sData[i]);
    //     }
    // }
    // for(let i=Tay.length-1; i>=0; i--){
    //     let content = nodeTay.replace('NAME_HERE', Tay[i][1]);
    //     content = content.replace('IMG_URL_HERE', Tay[i][3]);
    //     content = content.replace('ID_HERE', Tay[i][0]);
    //     $('.row').append(content);
    // }
    // for(let i=Oli.length-1; i>=0; i--){
    //     let content = nodeOli.replace('NAME_HERE', Oli[i][1]);
    //     content = content.replace('IMG_URL_HERE', Oli[i][3]);
    //     content = content.replace('ID_HERE', Oli[i][0]);
    //     $('.row').append(content);
    // }
    // for(let i=Dua.length-1; i>=0; i--){
    //     let content = nodeDua.replace('NAME_HERE', Dua[i][1]);
    //     content = content.replace('IMG_URL_HERE', Dua[i][3]);
    //     content = content.replace('ID_HERE', Dua[i][0]);
    //     $('.row').append(content);
    // }
    // for(let i=Sha.length-1; i>=0; i--){
    //     let content = nodeSha.replace('NAME_HERE', Sha[i][1]);
    //     content = content.replace('IMG_URL_HERE', Sha[i][3]);
    //     content = content.replace('ID_HERE', Sha[i][0]);
    //     $('.row').append(content);
    // }
    // for(let i=Cha.length-1; i>=0; i--){
    //     let content = nodeCha.replace('NAME_HERE', Cha[i][1]);
    //     content = content.replace('IMG_URL_HERE', Cha[i][3]);
    //     content = content.replace('ID_HERE', Cha[i][0]);
    //     $('.row').append(content);
    // }
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