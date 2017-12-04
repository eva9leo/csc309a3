
function addFood(name, serving_number, serving_size, serving_unit, energy, protein, fat, carb, ndbno){
	var local_record = {
		year: currentDate.year,
		month: currentDate.month,
		day:currentDate.date,
		name: name,
		ndbno: ndbno,
		serving_number: serving_number,
		serving_size: serving_size,
		serving_unit: serving_unit,
		energy: energy,
		protein: protein,
		fat: fat,
		carb: carb
	};
	
	$.ajax({
		type: 'POST',
		url: (backAPI_url + '/records?username=' + current_username + '&password=' + current_password),
		data: JSON.stringify(local_record),
		dataType: "json",
		contentType: "application/json",
		success: function(msg) {
			console.log(msg);
			console.log(msg['_id']);
			createLocalRecord(name, serving_number, serving_size, serving_unit, energy, protein, fat, carb, msg['_id'], ndbno);
			alert('A record has been added to your intake records');
		},
	error: function() {
		alert('Error adding order to server');
	}
	});
	
}

function createLocalRecord(name, serving_number, serving_size, serving_unit, energy, protein, fat, carb, id, ndbno) {
	var new_key = 'record' + record_key.toString();
	record_key++;
	recordDict[new_key] = new Record(name, serving_number, serving_size, serving_unit, energy, protein, fat, carb, id, ndbno);
	$('#record-list').append(
		$('<button>', {
		class: 'results_button',
		id: new_key,
		text: name,
		title: 'Click to edit this record'
		}).click( 
		function() {
			displayRecord(new_key);
		}
		)
	);
	
	updateTotalDisplay()
}

function displayRecord(k){
	$('#record-nutrition-ul').empty();
	// Display name
	$('#record-nutrition-ul').append($('<h2 class = "food_info_title food_info_name" >').text(recordDict[k].name));
	// Display serving size
	$('#record-nutrition-ul').append($('<li>').text('Serving size: ' + recordDict[k].serving_size.toString() + ' ' + recordDict[k].serving_unit));
	// Display servings number
	$('#record-nutrition-ul').append($('<li>').text('Servings: ' + recordDict[k].serving_number));
	// Display total calories
	var totalEnergy = parseFloat(Math.round((recordDict[k].totalEnergy()) * 100 / 100));
	$('#record-nutrition-ul').append($('<li>').text('Energy: ' + totalEnergy + ' kcal'));
	// Display protein
	var totalProtein = parseFloat(Math.round((recordDict[k].totalProtein()) * 100 / 100));
	$('#record-nutrition-ul').append($('<li>').text('Protein: ' + totalProtein + ' g'));
	// Display fat
	var totalFat = parseFloat(Math.round((recordDict[k].totalFat()) * 100 / 100));
	$('#record-nutrition-ul').append($('<li>').text('Fat: ' + totalFat + ' g'));
	// Display carbohydrate
	var totalCarb = parseFloat(Math.round((recordDict[k].totalCarb()) * 100 / 100));
	$('#record-nutrition-ul').append($('<li>').text('Carbohydrate: ' + totalCarb + ' g'));
	
	// Add input box
	$('#record-nutrition-ul').append(
		$('<input>', {
			type: 'text',
			'maxlength': '4',
			id: 'change-serving-input',
			'placeholder': 'Enter number of servings'
		})
	);
	
	$('#record-nutrition-ul').append(
		$('<button id = "change-serving">')
		.text('Change')
		.click(function() { 
			var serving_number_input = document.getElementById('change-serving-input').value;
			if (serving_number_input.length == 0){
				alert('Nothing entered, please enter a number!');
			}else if (isNaN(serving_number_input)){
				alert('Please enter only a number!');
			}else if (Number(serving_number_input) < 0) {
				alert('Please enter a non-negative number!');
			} else {
				var serving_number_var = Number(serving_number_input);
				if (serving_number_var == 0) {
					removeRecord(k);
				} else {
					changeRecord(k, serving_number_input);
				}
			}
					
		})
	);
	
}

function removeRecord(k){
	
	$.ajax({
		type: 'DELETE',
		url: (backAPI_url + '/records?username=' + current_username + '&password=' + current_password + '&_id=' + recordDict[k].id),
		success: function(msg) {
			console.log(msg);
			$('#record-nutrition-ul').empty();
			recordDict[k].removeRecord();
			delete recordDict[k];
			var search_key = '#' + k;
			$(search_key).remove();
			alert('A record has been removed.')
			updateTotalDisplay();			
		}
	});
	
}

function changeRecord(k, num){
	var local_record = {
		year: currentDate.year,
		month: currentDate.month,
		day:currentDate.date,
		name: recordDict[k].name,
		ndbno: ndbno,
		serving_number: serving_number,
		serving_size: serving_size,
		serving_unit: serving_unit,
		energy: energy,
		protein: protein,
		fat: fat,
		carb: carb
	};
	
	$.ajax({
		type: 'PUT',
		url: (backAPI_url + '/records?username=' + current_username + '&password=' + current_password + '&_id=' + recordDict[k].id + '&serving_number=' + num),
		
	});
	
	$('#record-nutrition-ul').empty();
	recordDict[k].changeServingNumber(num);
	displayRecord(k);
	updateTotalDisplay();
}

function updateTotalDisplay() {
	$('#total-calories-display').empty();
	var new_summary = '';
	new_summary += 'Energy: ';
	new_summary +=  parseFloat(Math.round((Record.energy_sum) * 100 / 100));
	new_summary += ' kCal, Protein: ';
	new_summary += parseFloat(Math.round((Record.protein_sum) * 100 / 100))
	new_summary += ' g, Fat: ';
	new_summary += parseFloat(Math.round((Record.fat_sum) * 100 / 100)) ;
	new_summary += ' g, Carbohydrate: ';
	new_summary += parseFloat(Math.round((Record.carb_sum) * 100 / 100));
	new_summary += ' g';
	$('#total-calories-display').append(
		$('<h2>', {
			class: "summary_text",
		text: new_summary
	}));
}
