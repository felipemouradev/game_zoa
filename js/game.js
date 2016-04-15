
$(document).ready(function(){
    var w = 119;
    var a = 97;
    var s = 115;
    var d = 100;

    var i = 105;

    var char = { ix: '20px', iy:'20px', ml: '20px', mb: '20px', mt: '20px', speed:11};

    $('.map').html("<div class='left-par' id='char' style='left:"+char.ml+"; top:"+char.mt+"; '></div>");

    function movex(x){
        if(x==a || x==d){
            space = $('#char').css('left');
            res = parseInt(space.replace("px",""));
            classe = res%2==0 ? "-impar" : "-par";
            if(d==x) {
                move = res+char.speed;
                $('#char').removeClass();
                $('#char').addClass('right'+classe);
            }
            else if (x==a) {
                move = res-char.speed;
                $('#char').removeClass();
                $('#char').addClass('left'+classe);
            }

            $('#char').css({'left': move+"px"});
        }
    }

    function movey(x){
        if(x==w || x==s){
            space = $('#char').css('top');
            res = parseInt(space.replace("px",""));
            classe = res%2==0 ? "-impar" : "-par";
            console.log("y -> "+res);
            if(x==s) {
                move = res+char.speed;

                $('#char').removeClass();
                $('#char').addClass("down"+classe);
            }
            else if (x==w) {
                move = res-char.speed;
                $('#char').removeClass();
                $('#char').addClass('up'+classe);
            }
            console.log("move ->"+move);

            $('#char').css({'top': move+"px"});

        }
    }

    function montaObj(x,y){
        console.log('ox->'+x+'; oy->'+y);
        $('.obj').remove();
        map = $('.map').html();
        $('.map').html(map+"<div class='obj' style='left:"+x+"px; top: "+y+"px'></div>");
    }

    function helperParseInt(v){
        return parseInt(v.replace("px",""));
    }

    function getCoordObj(){
        obj = { x: helperParseInt($('.obj').css('left')), y: helperParseInt($('.obj').css('top')) }
        return obj
    }

    function getCoordChar(){
        obj = { x: helperParseInt($('#char').css('left')), y: helperParseInt($('#char').css('top')) }
        return obj
    }

    function colider(){
        dchar = getCoordChar();
        dobj = getCoordObj();
        console.log("fui executado!");
        console.log(dchar);
        console.log(dobj);
        if ((dchar.x >= dobj.x ) && (dchar.x < dobj.x+22) && (dobj.y >= dchar.y) && (dchar.y < dobj.y+22) ){
           // $('.obj').html("<img src='expl.gif'/>");
        }
    }

    function explosion(b){
        time = 400;
        max_left = 40;
        max_range = 20;
        if(b==i){
            obj = getCoordChar();
            charac = $('#char').html();

            $("#char").html(charac+"<div class='explosion' style='left:"+max_left+"px'></div>");
            count = 0;
            setTimeout(function(){
                for(n = 0; n < max_range; n++) {
                     left = helperParseInt($('.explosion').css('left'));
                     console.log(left);
                     $('.explosion').css({'left':(left+n)+"px"});
                }
            },50);

            console.log('explodiu');
            setTimeout(function(){
                $('.explosion').remove();
            },time);
        }
    }

    randx = Math.floor((Math.random() * 500) + 1);
    randy = Math.floor((Math.random() * 500) + 1);
    //montaObj(randx,randy);
    //console.log(getCoordObj());
    //console.log(getCoordChar());
    $(document).keypress(function(e){
        movex(e.which);
        movey(e.which);
        //colider();
        explosion(e.which);
    });

});
