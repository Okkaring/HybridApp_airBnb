
var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        app.member.onCreate();
    },
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        /*var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');*/
        console.log('Received Event: ' + id);
    }
};
app.member= (function(){
    var onCreate=function(){
        setContentView();
        $('#signin-btn').click(e=>{
            e.preventDefault();
            var id= $('#id').val();
            var pass= $('#password').val();
            console.log('입력된 id, pass : '+id+' , '+pass);
            $.ajax({
                async : false,
                url : 'json/member.json',
                type : 'post',
                data : {id:id,pass:pass},
                dataType:'json',
                success : d=>{
                    alert('진입 성공');
                    $.each(d,(i,o)=>{   /*d=data, i=index, o=object*/
                        if(o.id === id && o.pass === pass){
                            checkval = true;
                            return false;
                        }else{
                            checkval = false; /*checkval을 안주면 전역 (스태틱)이 된다.*/
                        }
                    });
                    if(checkval === true){
                        alert('SUCCESS!!');
                        //app.reservation.onCreate();
                        app.destination.onCreate();
                    }else{
                        alert('FAIL!!');
                        $('#id').val('');
                        $('#password').val('');
                    }
                },
                error : e=>{
                    alert('ERROR!!');
                }
            });
        });
        $('#signup-btn').click(e=>{
            e.preventDefault();
        });
    };
    var setContentView=function(){
        $('body').empty();
        $('<div></div>').attr('id','wrapper').appendTo('body');
        $('#wrapper')
            .css({
                'width':'100%',
                'height':'100%',
                'background-color':'white'
            })
            .html('<div id="container" style="width:100% ; height:100%">'
                +'<div id="content" style="width:100% ; height:100%"></div>'
                +'</div>'
            );
        $('#container')
            .css({
                'width':'100%',
                'height':'100%',
                'background-color':'white'
            });
        $('#content')
            .css({
                'width':'100%',
                'height':'100%',
                'background-color':'white'
            })
            .html(
                '<input type="text" id="id" class="id" placeholder="ID를 입력하세요"/>'+
                '<input type="password" id="password" class="password" placeholder="비밀번호를 입력하세요" />'
            );
        $('#id').css({
            'width':'80%',
            'height':'50px',
            'margin-top':'50px',
            'margin-left':'50px'
        });
        $('#password').css({
            'width':'80%',
            'height':'50px',
            'margin-top':'20px',
            'margin-left':'50px'
        });
        $('#content').append(app.compUI.btn('signin-btn'));
        $('#content').append(app.compUI.btn('signup-btn'));
        $('#signin-btn')
            .text('로그인')
            .addClass('btn btn-default')
            .css({
            'margin':'30px auto',
            'margin-left':'50px',
            'margin-right':'20px'});
        $('#signup-btn')
            .text('회원가입')
            .addClass('btn btn-default')
            .css({
                'margin':'10px auto'});
    };
    return{onCreate:onCreate};
})();
app.reservation = (function(){
    var onCreate = function(){
        setContentView();
    };
    var setContentView = function(){
        $('#content')
            .html('<h1> 예약 관리 </h1></br>')
            .css({
                'width':'100%',
                'height':'100%',
                'background-color':'white'
            });
        var arr = ['A','B','C','D','E'];
        var table = '<table id="tbl" border=1 style="border-collapse:collapse; margin: 0 auto">';

        $.each(arr,(i,j)=>{
            table += '<tr style="height:25px; width:50px">';
            $.each(arr,(d,c)=>{
                table += '<td style="width:10% ; text-align: center;" onclick="app.reservation.select('+'\''+arr[i]+(d+1)+'\')">' + arr[i] + '' + (d+1) + '</td>';
            });
        });
        table += '</tr></table>';
        $('#content').append(table);
        $('#content').append(app.compUI.btn('map-btn'));
        $('#map-btn')
            .text('도시 지도 보기')
            .addClass('btn btn-default')
            .css({
                'margin':'30px auto'})
        ;
        $('#content').append(app.compUI.div('bulb')).css({'text-align':'center'});
        $('#bulb').append(app.compUI.btn('bulb-on-btn'));
        $('#bulb-on-btn')
            .text('Turn On')
            .addClass('btn btn-default')
            .css({
                'margin':'30px auto',
                'margin-right':'20px'})
        ;
        $('#bulb').append(app.compUI.btn('bulb-off-btn'));
        $('#bulb-off-btn')
            .text('Turn Off')
            .addClass('btn btn-default')
            .css({
                'margin':'30px auto',
                'margin-right':'20px'})
        ;
        $('#content')
            .append(app.compUI.div('bulb-img-box'))
            .css({'text-align':'center'});
        $('#bulb-img-box').append(app.compUI.image('bulb-img','https://www.w3schools.com/js/pic_bulboff.gif'));
        $('#bulb-on-btn').click(e=>{
            $('#bulb-img-box').html(app.compUI.image('bulb-img','https://www.w3schools.com/js/pic_bulbon.gif'));
        });
        $('#bulb-off-btn').click(e=>{
            $('#bulb-img-box').html(app.compUI.image('bulb-img','https://www.w3schools.com/js/pic_bulboff.gif'));
        });
        $('#content').append('<br><h1>정규식 샘플</h1>');
        $('#content').append(app.compUI.div('num-div'));
        $('#num-div').append(app.compUI.input('only-num','text'));
        $('#only-num').attr('placeholder','숫자만 입력');
        $('#num-div').append(app.compUI.btn('test-num-btn'));
        $('#test-num-btn')
            .text('숫자 테스트')
            .addClass('btn btn-default')
            .click(e=>{
                var flag = app.valid.isNumber($('#only-num').val()*1);
                alert(flag);
                if(flag){
                    alert('입력하신 숫자는 : '+ $('#only-num').val());
                }else{
                    alert('숫자만 가능하다.');
                    $('#only-num').val(''); //input에 입력된 값 새로고침
                }
            });

        $('#content').append(app.compUI.div('pass-div'));
        $('#pass-div').append(app.compUI.input('pass-val','password'));
        $('#pass-val').attr('placeholder','영문 대소문자, 숫자만 가능 4~10자 사이');
        $('#pass-div').append(app.compUI.btn('test-pass-btn'));
        $('#test-pass-btn')
            .text('비번 테스트')
            .addClass('btn btn-default')
            .click(e=>{
                if(app.valid.pwChecker($('#pass-val').val())==='yes'){
                    alert('조건 맞음. 비번은 : '+ $('#pass-val').val());
                }else{
                    alert('비밀번호 조건이 다르다.');
                    $('#pass-val').val('');
                }
            });

        $('#content').append(app.compUI.div('select-date'));
        $('#select-date').append(app.compUI.div('calendar'));

        $('#calendar').append(app.compUI.btn('select-date-btn'));
        $('#select-date-btn')
            .text('날짜 선택하기')
            .addClass('btn btn-default')
            .css({
                'margin':'30px auto',
                'margin-right':'20px'})
            .click(e=>{
            $('#calendar').datepicker({
                language:"kr",
                format: "yyyy-mm-dd",
                startDate : "+0d",
                endDate : "+3d",
                todayHighlight: true,
                autoclose : true
            });
        });
        $('#content').append(app.compUI.div('select-time'));
        $('#select-time').append(app.compUI.input('clock','text').addClass('timepicker'));

        $('#select-time').append(app.compUI.btn('select-clock-btn'));
        $('#select-clock-btn')
            .text('시간 선택하기')
            .addClass('btn btn-default')
            .css({
                'margin':'30px auto',
                'margin-right':'20px'})
            .click(e=>{
                $('.timepicker').timepicker({
                    timeFormat: 'h:mm p',
                    interval: 60,
                    minTime: '10',
                    maxTime: '6:00pm',
                    defaultTime: '11',
                    startTime: '10:00',
                    dynamic: false,
                    dropdown: true,
                    scrollbar: true
                });
            });
    };
    var select = x=> {
        alert('예매된 도시는 ' + app.cookie.getCookie('dest') + '이고, 좌석번호는 '+ x +'임!');
    };
    return {onCreate:onCreate,select:select};
})();
app.destination =(function(){
    var onCreate =function(){
        setContentView();
    };
    var setContentView =function(){
        $('#content')
            .html(
                '<h1> 리스트 </h1></br>'
            )
            .css({
                'margin':'0 auto',
                'width':'100%',
                'height':'100%',
                'background-color':'white'
            });
        var arr = ['서울','런던','도쿄','파리','제주'];
        var des = '<ul class="list-group">\n';
        $.each(arr,(i,j)=>{
            des += '<li id="'+i+'" class="list-group-item"><a onclick="app.destination.select('+'\''+arr[i]+'\')">'+arr[i]+'</a></li>\n';

        });
        des += '</ul>';
        $('#content').append(des);


    };
    var select=x=> {
        alert(x);
        app.cookie.setCookie('dest',x);
        app.reservation.onCreate();
    };
    return {onCreate :onCreate, select:select};
})();
app.bulb ={
    bulbOn : e=>{

    },
    bulbOff : e=>{

    }
};
app.valid ={
    isNumber : x=>{
        return typeof x === 'number' && isFinite(x);
    },
    pwChecker : x=>{
        var pw_regex = /^[0-9a-zA-Z]{4,10}$/;
        return pw_regex.test(x)?"yes":"no";
    }
};
app.cookie={
    setCookie : (k,v) =>{
        document.cookie = k + "=" +v;
    },
    getCookie : k=>{
        var x = k + "=";
        var i = 0;
        var arr = document.cookie.split(';');
        for(i=0;i<arr.length;i++){
            var j = arr[i];
            while(j.charAt(0)==''){
                j = j.substring(1,j.length)
            }
            if(j.indexOf(x)==0){
                return j.substring(x.length,j.length);
            }
            return null;
        }
    },
    removeCookie : k=>{

    }
};
app.compUI={
    br    :()=>{return $('<br/>');},
    div   : x=>{return $('<div/>',{id:x});},
    h1    : x=>{return $('<h1/>',{id:x});},
    span  : x=>{return $('<span/>',{id:x});},
    iTxt  : x=>{return $('<input/>',{id:x,type:'text'});},
    aBtn  : x=>{return $('<a/>',{href:'#', role: 'button', id:x});},
    iBtn  : x=>{return $('<input/>',{id:x,type:'button'});},
    image : (x,y)=>{return $('<img/>',{id:x,src:y});},
    input : (x,y)=>{return $('<input/>',{id:x,type:y});},
    btn : x=>{return $('<button>',{id:x});},
    nav: x=>{return $('<nav/>',{id: x});},
    ul : x=>{return $('<ul/>',{id:x});},
    li : ()=>{return $('<li/>');},
    a : ()=>{return $('<a/>',{href:'#'});}
};
$(function(){
    app.initialize();
});
app.initialize();

