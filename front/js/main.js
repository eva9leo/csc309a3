
var API_key = 'tnHClg06xiETjM4DRViZYx3W63FQcLnjhfSNAPro';

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

var username = document.getElementById("uname").value;
var loginbtn = document.getElementById("loginbtn");