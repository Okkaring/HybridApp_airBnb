
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
            'width':'100%',
            'height':'50px',
            'margin-top':'50px'
        });
        $('#password').css({
            'width':'100%',
            'height':'50px',
            'margin-top':'20px'
        });
        $('#content').append(app.compUI.btn('signin-btn'));
        $('#content').append(app.compUI.btn('signup-btn'));
        $('#signin-btn')
            .text('로그인')
            .css({
                'width':'100%',
                'height':'50px',
                'margin-top':'20px'
            });
        $('#signup-btn')
            .text('회원가입')
            .css({
                'width':'100%',
                'height':'50px',
                'margin-top':'20px'
            });
    };
    return{onCreate:onCreate};
})();
app.reservation = (function(){
    var onCreate = function(){
        setContentView();
    };
    var setContentView = function(){
        $('#content').empty();
        $('#content')
            .html('<h1> 예약 관리 </h1></br>')
            .css({
                'width':'100%',
                'height':'100%',
                'background-color':'white'
            });

        /* $('#tbl').css({        var arr = ['A','B','C','D','E'];
        var table = '<table id="tbl" border=1 style="border-collapse:collapse; margin: 0 auto">';

        $.each(arr,(i,j)=>{
            table += '<tr style="height:25px; width:50px">';
            $.each(arr,(d,c)=>{
                table += '<td style="width:10% ; text-align: center;">' + arr[i] + '' + (d+1) + '</td>';
            });
        });
        table += '</tr></table>';
        $('#content').append(table);
                     'border':'1px black solid',
                     'border-collapse' : 'collapse',
                     'width':'80%',
                     'height':'100%',
                     'margin':'0 auto'
                     });
         $('tr').css({
                     'width':'100%',
                     'height':'20%',
                     'text-align':'center'
         });
         $('td').css({
                     'background-color':'#A0EDE6',
                     'border':'1px black solid',
                     'width':'20%',
                     'height':'30px'
         });*/


    };
    return {onCreate:onCreate};
})();
app.destination =(function(){
    var onCreate =function(){
        setContentView();
    };
    var setContentView =function(){
        $('#content').empty();
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
            des += '<li id="'+i+'" class="list-group-item"><a onclick="app.destination.plz('+arr[i]+')">'+arr[i]+'</a></li>\n';

        });
        des += '</ul>';
        $('#content').append(des);

    };
    var plz=x=> {
        alert(x);
    };
    return {onCreate :onCreate, plz:plz};
})();
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