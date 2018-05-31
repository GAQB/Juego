var movto=0;
var marcador=0;
var tmpmarcador=0;
var minutos=2;
var segundos=0;
var time=0;
var inter=0;
var eliminar=0;
var Horizontal=0;
var Vertical=0;
var NuevosDulces=0;
var colum=["","","","","","",""];
var rest=["","","","","","",""];
var maximo=0;
var matriz=0;
var contadorTotal=0;
var espera=0;


//cambiar titulos
$(document).ready(function() {
  setInterval(function(){
      $(".main-titulo").switchClass("main-titulo","main-container", 400),
      $(".main-titulo").switchClass("main-container","main-titulo", 400)
    },3000);
});

// Inicia el juego

$(".btn-reinicio").click(function(){
	i=0;
	movto=0;
  marcador=0;
  clearInterval(inter);
  clearInterval(time);
  minutos=2;
  segundos=0;
  borrar();
  $("#score-text").html("0");
  $("#movimientos-text").html("0");
  $(this).html("Reiniciar")
	$(".panel-score").css("width","25%");
	$(".panel-tablero").show();
	$(".time").show();
	inter=setInterval(function(){
		llena()
	},1000);
  time=setInterval(function(){
 		timer()
 	},1000);

});

function borrar(){
	for(var x=1;x<8;x=x+1){
		$(".col-"+x).children("img").detach();
  }
};

// Tiempos
function timer(){
	if(segundos!=0){
		 segundos=segundos-1;
  }
	if(segundos==0){
    if(minutos==0){
      clearInterval(eliminar);
			clearInterval(nuevosDulces);
			clearInterval(inter);
			clearInterval(time);
			segundos=59;
		minutos=minutos-1;}
	$("#timer").html("0"+minutos+":"+segundos);
};


function llena(){
	i=i+1
  var imagen=0;
	var numero=0;
  $(".elemento").draggable()
  if(i<8){
		for(var x=1;x<8;x= x+1){
			if($(".col-"+x).children("img:nth-child("+i+")").html()==null){
				numero=Math.floor(Math.random()*4)+1;
				imagen="image/"+numero+".png";
				$(".col-"+x).prepend("<img src="+imagen+" class='elemento'/>").css("justify-content","flex-start")
			}}}
      if(i==8){
    clearInterval(inter);
       eliminar=setInterval(function(){
      eliminarhorver()
    },150);}
};

function funcioncita(){
	$( ".panel-score" ).animate({width:'100%'},3000);
};


function eliminarhorver(){
	matriz=0;
	Horizontal=horizontal();
	Vertical=vertical();
	for(var x=1;x<8;x=x+1){
		matriz=matriz+$(".col-"+x).children().length;}


	if(Horizontal==0 && Vertical==0 && matriz!=49){
		clearInterval(eliminar);
		NuevosDulces=0;
		nuevosDulces=setInterval(function(){
			nuevosdulces()
		},600);}

	if(Horizontal==1||Vertical==1){
		$(".elemento").draggable({disabled:true});
		$("div[class^='col']").css("justify-content","flex-end");
		$(".activo").hide("pulsate",1000,function(){
			var tmpmarcador=$(".activo").length;
			$(".activo").remove("img");
			marcador=marcador+tmpmarcador*10;
			$("#score-text").html(marcador);
		});
	}
	if(Horizontal==0 && Vertical==0 && matriz==49){
		$(".elemento").draggable({
			disabled:false,
			containment:".panel-tablero",
			revert:true,
			revertDuration:0,
			snap:".elemento",
			snapMode:"inner",
			snapTolerance:40,
			start:function(event,ui){
				movto=movto+1;
				$("#movimientos-text").html(movto);}
		});
	}
	$(".elemento").droppable({
		drop:function (event,ui){
			var dropped=ui.draggable;
			var droppedOn=this;
			espera=0;
			do{
				espera=dropped.swap($(droppedOn));}
			while(espera==0);
			Horizontal=horizontal();
			Vertical=vertical();
			if(Horizontal==0 && Vertical==0){
				dropped.swap($(droppedOn));}
			if(Horizontal==1 ||Vertical==1){
				clearInterval(nuevosDulces);
				clearInterval(eliminar);
				eliminar=setInterval(function(){
					eliminarhorver()
				},150);}},
	});
};



jQuery.fn.swap=function(b){
	b=jQuery(b)[0];
	var a=this[0];
	var t=a.parentNode.insertBefore(document.createTextNode(''),a);
	b.parentNode.insertBefore(a,b);
	t.parentNode.insertBefore(b,t);
	t.parentNode.removeChild(t);
	return this;
};


function nuevosdulces(){
	$(".elemento").draggable({disabled:true});
	$("div[class^='col']").css("justify-content","flex-start")
	for(var x=1;x<8;x= x+1){
		colum[x-1]=$(".col-"+x).children().length;}
	if(NuevosDulces==0){
		for(var x=0;x<7;x=x+1){
			rest[x]=(7-colum[x]);}
		maximo=Math.max.apply(null,rest);
		contadorTotal=maximo;}
	if(maximo!=0){
		if(NuevosDulces==1){
			for(var x=1;x<8;x=x+1){
				if(contadorTotal>(maximo-rest[x-1])){
					$(".col-"+x).children("img:nth-child("+(rest[x-1])+")").remove("img");}}
		}
		if(NuevosDulces==0){
			NuevosDulces=1;
			for(var k=1;k<8;k++){
				for(var x=0;x<(rest[k-1]-1);x++){
					$(".col-"+k).prepend("<img src='' class='elemento' style='visibility:hidden'/>");}}
		}
		for(var x=1;x<8;x++){
			if(contadorTotal>(maximo-rest[x-1])){
				numero=Math.floor(Math.random()*4)+1;
				imagen="image/"+numero+".png";
				$(".col-"+x).prepend("<img src="+imagen+" class='elemento'/>");}
		}
	}
	if(contadorTotal==1){
		clearInterval(nuevosDulces);
		eliminar=setInterval(function(){
			eliminarhorver()
		},150);
	}
	contadorTotal=contadorTotal-1;
};


function horizontal(){
	var buscarh=0;
	for(var j=1;j<8;j++){
		for(var k=1;k<6;k++){
			var col1=$(".col-"+k).children("img:nth-last-child("+j+")").attr("src");
			var col2=$(".col-"+(k+1)).children("img:nth-last-child("+j+")").attr("src");
			var col3=$(".col-"+(k+2)).children("img:nth-last-child("+j+")").attr("src");
			if((col1==col2) && (col2==col3) && (col1!=null) && (col2!=null) && (col3!=null)){
				$(".col-"+k).children("img:nth-last-child("+(j)+")").attr("class","elemento activo");
				$(".col-"+(k+1)).children("img:nth-last-child("+(j)+")").attr("class","elemento activo");
				$(".col-"+(k+2)).children("img:nth-last-child("+(j)+")").attr("class","elemento activo");
				buscarh=1;
			}
		}
	}
	return buscarh;
};

function vertical(){
	var buscarv=0;
	for(var l=1;l<6;l++){
		for(var k=1;k<8;k++){
			var col1=$(".col-"+k).children("img:nth-child("+l+")").attr("src");
			var col2=$(".col-"+k).children("img:nth-child("+(l+1)+")").attr("src");
			var col3=$(".col-"+k).children("img:nth-child("+(l+2)+")").attr("src");
			if((col1==col2) && (col2==col3) && (col1!=null) && (col2!=null) && (col3!=null)){
				$(".col-"+k).children("img:nth-child("+(l)+")").attr("class","elemento activo");
				$(".col-"+k).children("img:nth-child("+(l+1)+")").attr("class","elemento activo");
				$(".col-"+k).children("img:nth-child("+(l+2)+")").attr("class","elemento activo");
				buscarv=1;
			}
		}
	}
	return buscarv;
};
