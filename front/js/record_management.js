class Record {

	constructor(name, serving_number, serving_size, serving_unit, energy, protein, fat, carb){
		this.name = name;
		this.serving_number = serving_number;
		this.serving_size = serving_size;
		this.serving_unit = serving_unit;
		this.energy = energy;
		this.protein = protein;
		this.fat = fat;
		this.carb = carb;
		this.addRecord();
	}

	addRecord() {
		Record.num_of_record++;
		Record.energy_sum += this.totalEnergy();
		Record.protein_sum += this.totalProtein();
		Record.fat_sum += this.totalFat();
		Record.carb_sum += this.totalCarb();
	}

	removeRecord(){
		Record.num_of_record -= 1;
		Record.energy_sum -= this.totalEnergy();
		Record.protein_sum -= this.totalProtein();
		Record.fat_sum -= this.totalFat();
		Record.carb_sum -= this.totalCarb();
	}

	changeServingNumber(new_number){
		this.removeRecord();
		this.serving_number = new_number;
		this.addRecord();
	}

	totalEnergy(){
		return (this.serving_number * this.energy);
	}

	totalProtein(){
		return (this.serving_number * this.protein);
	}

	totalFat(){
		return (this.serving_number * this.fat);
	}

	totalCarb(){
		return (this.serving_number * this.carb);
	}
}

// Static variables for class Record
Record.num_of_record = 0;
Record.energy_sum = 0;
Record.protein_sum = 0;
Record.fat_sum = 0;
Record.carb_sum = 0;

// Static variable for keys of Records
var record_key = 0;
// Dict storing all the records
var recordDict = {};

function addFood(name, serving_number, serving_size, serving_unit, energy, protein, fat, carb){
	var new_key = 'record' + record_key.toString();
	record_key++;
	recordDict[new_key] = new Record(name, serving_number, serving_size, serving_unit, energy, protein, fat, carb);
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
	$('#record-nutrition-ul').empty();
	recordDict[k].removeRecord();
	delete recordDict[k];
	var search_key = '#' + k;
	$(search_key).remove();
	alert('A record has been removed.')
	updateTotalDisplay();
}

function changeRecord(k, num){
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