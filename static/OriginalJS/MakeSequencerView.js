/**
 * 
 */
var MakeSequencerView = function(nEdoValue, defaultSize){
	var colums = 12;
	//alert(defaultSize); //test 2
	//alert(/*[[${(nEdoValueInt)}]]*/); //false
	
	$(function(){ //動作確認用
		$('h1').html('loadMakeSequencerView'); //h1タグの文字の書き換え
	});
	$(function(){
		//alert(colums);
		//console.log("append </tr>")
		$('#SequencerSetThead').append('<tr id=SetTheadHead></tr>');
		for (var i=1; i<=colums; i++){
			$('#SetTheadHead').append('<th>xxxx</th>');
		}
	});
	$(function(){
		//alert(colums);
		//tr:lastでtrが最後に出力されたものを指定
		for (var i=1; i<=nEdoValue; i++){
			$('#SequencerSetTbody').append('<tr></tr>');
			for (var k=1; k<=colums; k++){
				$('tr:last').append('<td onclick="sound()">  test </td>');
			}
		}
	});
	$(function(){
		$('#MainTable').addClass('table table-bordered table-hover table-condensed table-responsive table-striped');
	});
}