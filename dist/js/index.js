"use strict";var init=new scriptInit;var elem=document.querySelector(".scrollTo");init.addAction(function(){},{initTime:"now"}).addAction(function(){new Glide(".glide").mount()},{initTime:"scroll",scrollElement:elem,scrollDelayTime:300,stock:1500}).addAction(_console,{initTime:"now"},5);function _console(n){}