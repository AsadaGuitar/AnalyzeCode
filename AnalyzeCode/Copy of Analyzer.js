"use strict";


//display
$(function () {
	
	//$("#title").css("visibility","hidden");
	$("#project-display").css("visibility","hidden");
	$("#analyze-display").hide();
	$("#header").hide();
	$("#information").hide();
	$("#keyboard").hide();
	$("#keyboard").css("bottom","0");
	
	
	//画面フェーズ
	$("#display").click(function () {
		$("#title").fadeOut(1000);
		$("#analyze-display").fadeIn(2000);
		$("#header").fadeIn(2000);
		$("#title").css("top", "31.8%");
	});
	
	//keyselect
	$("#keyselect").css("display","none");
	$("#header-key").on("click", function () {
		$("#keyselect").fadeIn()
	});
	if ($("#keyselect").css("visibility")==="visible") {
		$("#main").not("#keyselect").on("click", function () {
		    $("#keyselect").fadeOut()
	    });
	};
	
	//open close
	function openfunc() {
		$(".interval-box").css("display", "none");
	    $(".code-data").css("height","20%");
	    $(".code-box").css("height", "100%");
	    $(".code").css("height", "82%");
	};
	openfunc();
	function closefunc() {
		$(".code").css("height", "82%");
		$(".code-box").css("height", "50%");
		$(".code-data").css("height","40%");
		$(".interval-box").fadeIn(1000).css("display", "flex");
	    $("#keyboard").slideUp(200);
	};
	
	$("#open").on("click", function () {
		closefunc();
	});
	$("#close").on("click", function () {
		openfunc();
	});
	
	//key action
	function keyopen() {
		for (let i = 0; i < $(".code").length; i++) {
			$(".code").on("click", function () {
				$("#keyboard").slideDown(150);
			}).bind("touchstart", function () {
		        $(this).css("background-color", "#EFBD55");
	        }).bind("touchend", function () {
		        $(this).css("background-color", "#F8F8F8");
	        });
		};
	};
	keyopen();
	$("#header-add").on("click", function () {
		keyopen();
	});
		
	//keyboard
	$("#keyboard div div").bind("touchstart", function () {
		$(this).css("background-color", "#B3B8C1");
	}).bind("touchend", function () {
		$(this).css("background-color", "white");
	});
	$(".top-side-btn, .mid-side-btn, .btm-side-btn").bind("touchstart", function () {
		$(this).css("background-color", "white");
	}).bind("touchend", function () {
		$(this).css("background-color", "#B3B8C1");
	});
	$("#key-close").on("click", function () {
		$("#keyboard").slideUp(200);
	});
	
	function infofunc() {
	    $(".interval").on("click", (e)=>{
	        let idx = [].slice.call($(".interval")).indexOf(e.target);
			let left = ["25%", "50%", "25%", "50%"];
			console.log(idx)
			for (let i = 0; i < 4; i++) {
				if (idx === i) {
					$("#information").fadeIn().css("left", left[i]).css("top","5%");	
				};
			};
		});
    };
	$("#open").on("click", ()=>{
		infofunc();
	});
});

//DOM
function getClass(data) {
	data = document.getElementsByClassName(data);
	return data;
};
function getId(data) {
	data = document.getElementById(data);
	return data;
};
const $project = getClass("project");
const $add = getId("header-add");
const $analyzedpy = getId("analyze-display");
const $codebox = getClass("code-box");
const $codedata = getClass("code-data");
const $intervalbox = getClass("interval-box");
const $code = getClass("code");
const $interval = getClass("interval");

//changing key'name
const $keybox = getId("header-key");
const $keyname = getClass("key-name");
let keydata = 0;

for (let i = 0; i < $keyname.length; i++) {
		$keyname[i].addEventListener("click",(e)=>{
			$keybox.textContent = "key : " + e.target.textContent;
			keydata = i;
			console.log(keydata)
		});
	};

//add action
let boxidx = 0;
let clndata;
let elmidx = 1;
let databox;
let clone ={
	addbox: function (){
		clndata = $analyzedpy.firstElementChild.cloneNode(true);
		boxidx++;
		for (let i = 0; i < clndata.children.length; i++) {
			clndata.children[i].innerHTML = "";
		};
		$analyzedpy.appendChild(clndata);
		elmidx = 0;
	},
	addelm: function () {
		databox = [$codebox[boxidx], $intervalbox[boxidx]];
		let copyelm = [$codebox[0], $intervalbox[0]];
		let elmname = ["code", "interval"]
	    for (let i = 0; i < databox.length; i++) {
			clndata = copyelm[i].firstElementChild.cloneNode(true);
			clndata.firstChild.textContent = elmname[i];
			databox[i].appendChild(clndata);
		};
		elmidx++;
	}
};
let selector;
let writeidx = 0;
function writeselect() {
	$code[$code.length-1].addEventListener("click", (e)=>{
		selector = [].slice.call($code).indexOf(e.target);
		console.log(selector)
		writeidx = 0;
	});
	selector = $code.length-1;
	writeidx = 0;
	console.log(selector)
};
writeselect();

$add.addEventListener("click", ()=>{
	if ($code[$code.length-1].firstChild.textContent !== "code") {
		if (elmidx === 4) {
		    clone.addbox()
	    };
	    clone.addelm();
		writeselect();
	};
});

//change keyboard's text
const textdata ={
	mark:["A","B","C","D","E","F","G","M","m","m7-5","sus4","dim","arg","#","##","♭","♭♭","♮"],
	code:["ⅠM7","Ⅱm7","Ⅲm7","ⅣM7","Ⅴ7","Ⅵm7","Ⅶm7-5","Ⅰ7","Ⅱ7","Ⅲ7","Ⅳ7","Ⅵ7","Ⅶ7","♭Ⅱ7","♭Ⅲdim7","Ⅳm7","♭Ⅵ7","♭Ⅶ7"],
	tension:["A","B","C","D","E","F","G","4","6","7","9","11","13","add","mM","on","omit","sus"]
};
const [$keymark, $keycode, $keytension] = [getId("key-mark"), getId("key-code"), getId("key-tension")];
const keytext =[textdata.mark, textdata.code, textdata.tension];
const changetext = [$keymark, $keycode, $keytension];

function change(data) {
	for (let i = 0; i < $keybtn.length; i++) {
		$keybtn[i].firstChild.textContent = keytext[data][i];
	};
};
for (let i = 0; i < changetext.length; i++) {
	changetext[i].addEventListener("click", (e)=>{
		let work = changetext.indexOf(e.target);
		console.log("very");
		change(work);
	});
};

//write limit
const lim ={
	code:["A","B","C","D","E","F","G"],
	type:["M","m","m7-5","sus4","dim","arg"],
	key:["#","##","♭","♭♭","♮"],
	tension:["4","6","7","9","11","13"],
	option:["add","mM","on","omit","sus"]
};
let bfrcode = 0;
let bfr = "";
let aft = "";

function writelim(e){
	//押したボタンがlimboxのどれに所属しているかを取得
	
	let limbox = [lim.code, lim.type, lim.key, lim.tension, lim.option];
	$code[selector].text = e.target.firstChild.textContent;
	for (let i = 0; i < limbox.length; i++) {
		if (limbox[i].indexOf($code[selector].text) >= 0) {
		   	aft = i;
		};
	};
	if (writeidx === 0 && aft === 0){
		//最初に、かつコードを押した場合
		$code[selector].firstChild.textContent = $code[selector].text;
		bfr = aft;
	    writeidx = 1;
		bfrcode = 0;
	}else if(writeidx === 1){
		switch (aft) {
		    case 1:
		    if (bfr === 0 || (bfr === 2 && bfrcode === 1)) {	
				$code[selector].firstChild.textContent += $code[selector].text;
				bfr = aft;
				bfrcode = 0;
		    };
			break;
			case 2:
			if (bfr !== aft){
            	$code[selector].firstChild.textContent += $code[selector].text;
                if (bfr === 0 && bfrcode === 0) {
					$code[selector].key = $code[selector].text;
					$code[selector].action = true;
				    bfrcode = 1;
					
                };
				bfr = aft;
			};
			break;
			case 3:
		    if (bfr !== aft) {
		    	$code[selector].firstChild.textContent += $code[selector].text;
				bfr = aft;
		    };
			break;
			case 4:
		    if (bfr === aft || (bfr === 2 && bfrcode === 0)) {
		    	
		    }else {
		    	$code[selector].firstChild.textContent +=  $code[selector].text;
				bfr = aft;
				bfrcode = 0;
		    };
		};
	};
};

const $keybtn = getClass("key-btn");
for (let i = 0; i < $keybtn.length; i++) {
	$keybtn[i].addEventListener("click", (e)=>{
		writelim(e);
	});
};

//delete
const $delete = getId("key-delete");
$delete.addEventListener("click", function () {
	let cut = $code[selector].text.length;
	console.log(cut);
	$code[selector].firstChild.textContent = $code[selector].firstChild.textContent.slice(0, -cut);
});

//calculation
const $open = getId("open");
const keyarray = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B","C","C#","D","D#","E","F","F#","G","G#","A","A#"];
const inttext = ["Ⅰ","#Ⅰ","Ⅱ","#Ⅱ","Ⅲ","Ⅳ","#Ⅳ","Ⅴ","#Ⅴ","Ⅵ","#Ⅵ","Ⅶ"];


function intervalfunc() {
	
	//選択された調性の度数を検出
	let intdata = keyarray.slice(keydata, keydata+12);
	let intnum;
	//テキストの分解
	function slicefunc(idx,data,work) {
		let target = $code[idx].firstChild.textContent.slice(data, work);
		return target;
	};
	//コードを抜き取りその後に調号で度数を調整。
	for (let i = 0; i < $code.length; i++) {
		//コードを抜き取る
		$code[i].code = slicefunc(i,0,1);
		console.log($code[i].code);
		let idx = i;
		intnum = intdata.indexOf($code[i].code);
		console.log(intnum)
		
		//調号で調整する度合いを検出
	    if ($code[i].action == true) {
			console.log("調号があります");
		    let keys ={
		    	a:["#", "##","♭","♭♭"],
		    	b:[+1,+2,-1,-2]
    	    };
			let keyaction = keys.b[keys.a.indexOf($code[i].key)];
			intnum += keyaction;
			if (intnum === -1) {
				intnum = 11;
			}else if (intnum === -2) {
				intnum = 10;
			}else if (intnum === 12) {
				intnum = 0;
			}else if (intnum === 13) {
				intnum = 1
			};
            //表示する際の調整
			if ($code[i].key.length === 2) {
				$code[i].option = slicefunc(i,3, $code[i].firstChild.textContent.length);
			}else {
				$code[i].option = slicefunc(i,2, $code[i].firstChild.textContent.length);
			};
			
		}else {
			//表示する際の調整
			console.log("調号はありません")
			$code[i].option = slicefunc(i,1,$code[i].firstChild.textContent.length);
		};
		console.log($code[i].option)
		$interval[i].firstChild.textContent = inttext[intnum] + " " + $code[i].option;
	};
};

$open.addEventListener("click", ()=>{
	intervalfunc();
	//infofunc();
});
