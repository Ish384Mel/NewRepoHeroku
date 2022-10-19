// let n = 20;
// const lift = {
//   currentFloor: 0,
//   maxFloor: n,
//   moveTo: function (floor) {
//     if (!(floor % 2)) {
//       throw new Error("Лифт может останавливаться только на нечетных этажах");
//     }
//     if (floor > this.maxFloor) {
//       throw new Error(`Невозможно подняться выше ${this.maxFloor} этажа.`);
//     }
//     this.currentFloor = floor;
//     console.log(this.currentFloor);
//   },
//   calc: function (number) {
//     const lvl = Math.min(Math.ceil(number / 3), this.maxFloor),
//       dir = lvl % 2 ? 0 : lvl == this.maxFloor ? -1 : 1,
//       messages = new Map([
//         [0, "на этом этаже"],
//         [1, "этажом ниже"],
//         [-1, "этажом выше"]
//       ]);
//     return {
//       floor: lvl + dir,
//       direction: messages.get(dir)
//     };
//   },
//   enter: function (input) {
//     if (input > this.maxFloor * 3) {
//       console.log("здесь такой квартиры нет");
//       return;
//     }
//     const floor = this.calc(input).floor;
//     this.moveTo(floor);
//     console.log(
//       `Вы на этаже ${floor}, ваша квартирка ${this.calc(input).direction}`
//     );
//   }
// };
// lift.enter(5);
function dannie(){

	var visota = parseInt(document.getElementById("vis").value);
    var shirina = parseInt(document.getElementById("shir").value);
	
	document.getElementById('out').innerHTML = display(maze(visota,shirina));
}

function maze(x,y) {
	var n=x*y-1;
	if (n<0) {alert("Плохие данные");return;}
	var horiz=[]; 
		for (var j= 0; j<x+1; j++) horiz[j]= [];
	var verti=[]; 
		for (var j= 0; j<y+1; j++) verti[j]= [];
		
	var here= [Math.floor(Math.random()*x), Math.floor(Math.random()*y)];
	var path= [here];
	var unvisited= [];
	for (var j= 0; j<x+2; j++) {
		unvisited[j]= [];
		for (var k= 0; k<y+1; k++)
			unvisited[j].push(j>0 && j<x+1 && k>0 && (j != here[0]+1 || k != here[1]+1));
	}
	while (0<n) {
		var potential= [[here[0]+1, here[1]], [here[0],here[1]+1],
		    [here[0]-1, here[1]], [here[0],here[1]-1]];
		var neighbors= [];
		for (var j= 0; j < 4; j++)
			if (unvisited[potential[j][0]+1][potential[j][1]+1])
				neighbors.push(potential[j]);
		if (neighbors.length) {
			n= n-1;
			next= neighbors[Math.floor(Math.random()*neighbors.length)];
			unvisited[next[0]+1][next[1]+1]= false;
			if (next[0] == here[0])
				horiz[next[0]][(next[1]+here[1]-1)/2]= true;
			else 
				verti[(next[0]+here[0]-1)/2][next[1]]= true;
			path.push(here= next);
		} else 
			here= path.pop();
	}
	return ({x: x, y: y, horiz: horiz, verti: verti});
}
 
function display(m) {
	var text= [];
	for (var j= 0; j<m.x*2+1; j++) {
		var line= [];
		if (0 == j%2)
			for (var k=0; k<m.y*4+1; k++)
				if (0 == k%4) 
					line[k]= 'X';
				else
					if (j>0 && m.verti[j/2-1][Math.floor(k/4)])
						line[k]= ' ';
					else
						line[k]= 'X';
		else
			for (var k=0; k<m.y*4+1; k++)
				if (0 == k%4)
					if (k>0 && m.horiz[(j-1)/2][k/4-1])
						line[k]= ' ';
					else
						line[k]= 'X';
				else
					line[k]= ' ';
		if (0 == j) line[1]=line[3]=' ',line[2]= '1';
		if (m.x*2-1 == j) line[4*m.y]= '2';
		text.push(line.join('')+'\r\n');
		
	}
	return text.join('');
}
