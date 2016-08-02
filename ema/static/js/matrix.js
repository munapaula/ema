// Helfer-Funktionen
// Verteilung
/*
	@param taken = Array mit schon eingetragenen Punkten (Objekte)
		dot = {
			date: x,
			imp: y
		}
	@param task_x = x-Koordinate(date) des neuen Punktes
	@param task_y = y-Koordinate(importance) des neuen Punktes
*/
function doubles(dots, newDot_x, newDot_y) {
	dots.forEach(function(oldDot) {
		if( liesIn(oldDot.date, newDot_x) && liesIn(oldDot.imp, newDot_y) ) {
			newDot_x += 10;
			newDot_y += 10;
		}
	});
	var dot = {
		'date': newDot_x,
		'imp': newDot_y
	};
	return dot;
}

// left oder bottom property gegeben, bis wo liegen die Punkte ganz oder
// teilweise aufeinander
function liesIn(oldCoo, newCoo) {
	if (oldCoo - 8 < newCoo && oldCoo + 8 > newCoo) {
		return true;
	}	else {
		return false;
	}
}

// Date in lesbare Zahlen umwandeln
function formatDate(date) {

}

var s,
Matrix = {
	settings: {
		//canvas: $('canvas'),
		//drawing: document.getElementById('ema').getContext("2d"),
		width: $('#dots').width(),
		height: $('#dots').height()
	},
	init: function() {
		s = this.settings;
	},
	drawAxes: function(field, width, height) {
		// untere Ecke y-Wert
		var uEy = height-25;
		// rechte Ecke x-Wert
		var rEx = width-20;
		// Mitte y-Achse
		var my = (height-20-25)/2 + 20;
		// Mitte x-Achse
		var mx = (width-25-20)/2 + 25;

		// Spitze senkrechter Pfeil
		field.moveTo(25,20);
		// zur untere Ecke
		field.lineTo(25,uEy);
		field.stroke();
		// zur rechten Spitze
		field.lineTo(rEx,uEy);
		field.stroke();

		// Pfeil oben linke Seite
		field.moveTo(15,30);

		field.lineTo(25,20);
		field.stroke();

		// Pfeil oben rechte Seite
		field.lineTo(35,30);
		field.stroke();

		// Pfeil rechts oberer Teil
		field.moveTo(rEx-10,uEy-10);
		// zur rechten Spitze
		field.lineTo(rEx,uEy);
		field.stroke();
		// zum Pfeil rechts unterer Teil
		field.lineTo(rEx-10,uEy+10);
		field.stroke();

		// Mittellinie y-Achse
		field.moveTo(25,my);
		field.lineTo(rEx,my);
		field.stroke;

		// Mittellinie x-Achse
		field.moveTo(mx,20);
		field.lineTo(mx,uEy);
		field.stroke();

		// Beschriftung x-Achse
		field.font = "20px Arial";
		// field.textAlign = "center";
		field.fillText("U R G E N T", width/2-50, height);

		field.save();
		field.translate(width/2,height/2);
		// Beschriftung y-Achse
		field.font = "20px Arial";
		field.rotate(-Math.PI/2);
		field.translate(height/2,-width/2);
		field.fillText("I M P O R T A N T", -height/2-50, 15);

		field.restore();
	},
	drawTasks: function(taskData, topicData, width, height) {
		// how to find out if tasks are on the same spot
		var that = this;
		var taken = [];
		// Hilfsvariablen
		// durch alle übergebenen Aufgaben
		taskData.forEach(function(task){
			// check überschneidungen
			var dot = doubles(taken, task.x, task.y);
			task.x = dot.date;
			task.y = dot.imp;
			var colorIndex = task.topic;
			var topicColor = topicData[colorIndex]['color'];
			// eigentlichen Punkt kreieren und zeichnen
			that.drawDot(task, topicColor);
			// Array mit bereits gezeichneten Koordinaten
			taken.push(dot);
		});
	},
	drawDot: function(task, color) {
		var taskItem = $('<div/>', {
			class: 'dot',
			id: task.id,
			css: {
				left: task.x,
				bottom: task.y,
				borderColor: color,
				width: 7,
				height: 7
			}
		});
		$('#dots').append(taskItem);
		var label = $('<div/>', {
			class: 'label'
		});
		var title = $('<h1/>', {
			class: 'dotLabel',
			text: task.name
		});
		var attributes = $('<p/>', {
			text: 'Due Date: '+formatDate(task.due_date)+', Importance: '+task.importance
		})
		$('#'+task.id).append(label);
		$('#'+task.id).children('.label').append(title, attributes);
	}
};

// init();
