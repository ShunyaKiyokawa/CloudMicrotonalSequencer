/* 参考
テーブルのセルをドラッグで選択する方法【JavaScript】
http://www.programming-magic.com/20071215024226/
tableタグに下記を追加
 <table onmousedown="mouseDown(this, event); return false;" onmouseup="mouseUp(this, event);" onmousemove="mouseMove(this, event); return false;">
*/

var startCell = null;
// マウスダウンのイベント処理
// セルの選択をさせるtableのonMouseDownイベント
function mouseDown(table, e){
	if (!e) var e = window.event;
	startCell = e.srcElement? e.srcElement: e.target;
	if(startCell.tagName != "TD"){
		startCell = null;
		return;
	}
	mouseMove(table, e);
}
	
//onMouseMoveイベントで呼ぶ処理。
//現在の位置にあるセルを取得し、ドラッグを開始した位置にあるセルとの間のセルの色を全て選択状態の色に変更する。 
//マウス移動のイベント処理
function mouseMove(table, e){
	if (!e) var e = window.event;
 
	var endCell = e.srcElement?e.srcElement:e.target;
	if(!(endCell.tagName=="TD" && startCell))
		return false;
 
	// セルの位置を取得
	var from = getCellPos(table, startCell); //開始位置
	var to = getCellPos(table, endCell); //終了位置
	if(!from || !to)
		return false;
 
	// 色を変更
	var x, y, cells;
	for(y=0; y<table.rows.length; y++){
		row = table.rows.item(y);
		for(x=0; x<row.cells.length; x++){
			//if((from.row-y)*(y-to.row)>=0 && (from.col-x)*(x-to.col)>=0) //yを受け付けないようにした
			if((from.row-y)*(y-from.row)>=0 && (from.col-x)*(x-to.col)>=0)
				row.cells.item(x).style.backgroundColor = "#ffdddd";// 選択状態の色
			else
				row.cells.item(x).style.backgroundColor = "transparent";// 未選択状態の色
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
	if(!(endCell.tagName=="TD" && startCell))
		return false;
	 
	// セルの位置を取得
	var from = getCellPos(table, startCell);
	var to = getCellPos(table, endCell);
	if(!from || !to)
		return false;
	 
	// mouseMoveで選択状態表示の更新をさせないようにする
	startCell = null;
	 
	// ここに選択後の処理を書く
		//alert("'from.colとfrom.row'("+from.col+", "+from.row+") -> 'to.colとto.row'("+to.col+", "+to.row+")");
	alert("'from.colとfrom.row'("+from.col+", "+from.row+") -> 'to.colとto.row'("+to.col+", "+from.row+")"); //yを受け付けないようにした
}