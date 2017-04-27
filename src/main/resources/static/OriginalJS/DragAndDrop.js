/* 参考
テーブルのセルをドラッグで選択する方法【JavaScript】
http://www.programming-magic.com/20071215024226/
tableタグに下記を追加
 <table onmousedown="mouseDown(this, event); return false;" onmouseup="mouseUp(this, event);" onmousemove="mouseMove(this, event); return false;">
*/

var NoteCell = {
	noteEndCell: null,
	startCell: null
};

// マウスダウンのイベント処理
// セルの選択をさせるtableのonMouseDownイベント
function mouseDown(table, e){
	if (!e) var e = window.event;
	NoteCell.startCell = e.srcElement? e.srcElement: e.target;
	if(NoteCell.startCell.tagName != "TD"){
		NoteCell.startCell = null;
		return;
	}
	$(event.target).addClass('NoteStart'); 
	mouseMove(table, e);
	 
}
	
//onMouseMoveイベントで呼ぶ処理。
//現在の位置にあるセルを取得し、ドラッグを開始した位置にあるセルとの間のセルの色を全て選択状態の色に変更する。 
//マウス移動のイベント処理
function mouseMove(table, e){
	if (!e) var e = window.event;
 
	var endCell = e.srcElement?e.srcElement:e.target;
	if(!(endCell.tagName=="TD" && NoteCell.startCell))
		return false;
 
	// セルの位置を取得
	var from = getCellPos(table, NoteCell.startCell); //開始位置
	var to = getCellPos(table, endCell); //終了位置
	if(!from || !to)
		return false;
 

	var x, y, cells;
	// 鉛筆モード、色を変更してNoteSetクラスをセットする
	if($("input[id='rd0']:checked").val()){
		for(y=0; y<table.rows.length; y++){
			row = table.rows.item(y);
			for(x=0; x<row.cells.length; x++){
				//if((from.row-y)*(y-to.row)>=0 && (from.col-x)*(x-to.col)>=0) //yを受け付けないようにした
				//NoteSetClassがないとき
				if((from.row-y)*(y-from.row)>=0 && (from.col-x)*(x-to.col)>=0){
					//row.cells.item(x).style.backgroundColor = "#ffdddd"; // 選択状態の色
					$(row.cells.item(x)).css('background-color', 'Lime');
					$(row.cells.item(x)).addClass('NoteSet'); 
					$(row.cells.item(x)).css('border-right-style', 'hidden');
					NoteCell.noteEndCell=row.cells.item(x);
					//$(row.cells.item(x)).removeClass('NoteUnset');
				}
				
				else{
					//ここはロッククラスがついていないものに対する処理
					//row.cells.item(x).style.backgroundColor = "transparent";// 未選択状態の色
					$(row.cells.item(x)).not('.lock').css('background-color', 'transparent');
					$(row.cells.item(x)).not('.lock').removeClass('NoteSet');
					$(row.cells.item(x)).not('.lock').css('border-right-style', 'solid');
				}
				
				//NoteSetClassがある時 //if ( $('div').hasClass('hoge') ) ; http://qiita.com/mimoe/items/312bf70547825f5d9133
				//たしかにドラッグ＆ドロップでのノート移動が理想だが、それよりまず、消しゴムモードで消せればOK
			}
		}
	}
	//消しゴム。色を変更してNoteUnsetクラスをセットする
	if($("input[id='rd1']:checked").val()){
		for(y=0; y<table.rows.length; y++){
			row = table.rows.item(y);
			for(x=0; x<row.cells.length; x++){
				//if((from.row-y)*(y-to.row)>=0 && (from.col-x)*(x-to.col)>=0) //yを受け付けないようにした
				//NoteSetClassがないとき
				if((from.row-y)*(y-from.row)>=0 && (from.col-x)*(x-to.col)>=0){
					row.cells.item(x).style.backgroundColor = "transparent"; // 選択状態の色
					//row.cells.item(x).class = "NoteSet"; //そもそもデフォルトでこんなのない
					//$(row.cells.item(x)).addClass('NoteUnset');
					$(row.cells.item(x)).removeClass('NoteSet'); 
				/*
				else
					row.cells.item(x).style.backgroundColor = "transparent";// 未選択状態の色
					*/
				}
				//NoteSetClassがある時 //if ( $('div').hasClass('hoge') ) ; http://qiita.com/mimoe/items/312bf70547825f5d9133
				//たしかにドラッグ＆ドロップでのノート移動が理想だが、それよりまず、消しゴムモードで消せればOK
			}
		}
	}
}

//tableの中のcellの位置を取得する
// getCellPos関数の実装
function getCellPos(table, cell){
	var pos = new Object();
	if(cell.nodeName == "TD"){
		var x, y, cells;
		for(y=0; y<table.rows.length; y++){
			row = table.rows.item(y);
			for(x=0; x<row.cells.length; x++){
				if(row.cells.item(x) == cell){
					pos.row = y;
					pos.col = x;
					return pos;
				}
			}
		}
	}
	return null;
}


//マウスアップのイベント処理
// onMouseUpイベントで以下のような関数を呼び、マウスが動いても選択状態を更新しないようにしてから、選択後の処理を実行する。
function mouseUp(table, e){
	if (!e) var e = window.event;
	 
	var endCell = e.srcElement?e.srcElement:e.target;
	if(!(endCell.tagName=="TD" && NoteCell.startCell))
		return false;
	 
	// セルの位置を取得
	var from = getCellPos(table, NoteCell.startCell);
	var to = getCellPos(table, endCell);
	if(!from || !to)
		return false;
	 
	// mouseMoveで選択状態表示の更新をさせないようにする
	NoteCell.startCell = null;
	 
	// ここに選択後の処理を書く
	//alert("'from.colとfrom.row'("+from.col+", "+from.row+") -> 'to.colとto.row'("+to.col+", "+to.row+")"); //もとのソース
	//alert("'from.colとfrom.row'("+from.col+", "+from.row+") -> 'to.colとto.row'("+to.col+", "+from.row+")"); //yを受け付けないようにした
	if(from.col>to.col){
		alert("fromがtoより大きいです。")
		//ここのエラーハンドリングついかすること
	}else{
		$(NoteCell.noteEndCell).addClass('NoteEnd');
		$(NoteCell.noteEndCell).css('border-right-style', 'solid'); //これを基準に表の枠線を消す
		$('.NoteSet').addClass('lock');
		//Note.SetRange(from.col, from.row, to.col); //その範囲を保存する
		//lockクラスがないものに関して、lockクラスを設定する。
		Note.MakeObject();
	}
}