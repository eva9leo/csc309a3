$('#search').click(function() {searchFood()});
$('#search-txt').keyup(function(event) {
	if (event.keyCode==13) {
		searchFood()
	}
})

function setUpRecordView() {
			$('#post-login-content').append(
				$('<div>', {
				id: 'total-calories-display'
			}));

			$('#total-calories-display').append(
				$('<h2>', {
				text: 'Energy: 0 kCal, Protein: 0 g, Fat: 0 g, Carbohydrate: 0 g'
			}));

			$('#post-login-content').append(
				$('<div>', {
				class: 'view2_container',
				id: 'record-container'
			}));

			$('#record-container').append(
				$('<div>', {
				class: 'itembox search_result',
				id: 'record-list-div'
			}));

			$('#record-list-div').append(
				$('<ul>', {
				id: 'record-list'
			}));

			$('#record-container').append(
				$('<div>', {
				class: 'itembox food_info',
				id: 'record-info'
			}));

			$('#record-info').append(
				$('<h2>', {
				class: 'food_info_title',
				text: 'Nutritional value'
			}));

			$('#record-info').append(
				$('<ul>', {
				id: 'record-nutrition-ul'
			}));
}

function searchFood() {
	var name = document.getElementById("search-txt").value;

		$.ajax({
			// Get the list of foods from the keyword name.
			type: 'GET',
			url: 'https://api.nal.usda.gov/ndb/search/?format=json&q=' + name + '&sort=r&max=60&api_key=' + API_key,
			success: function(results) {
				// When no food is found
				if ('errors' in results) {
					alert('No food found, try another keyword');
				} else {
					// Delete the previous search results
					$('#result-table').empty();
					// Walk through each item of the list
					$.each(results.list.item, function(i, result) {
						$('#result-table').append(
							$('<tr>')
								// Add button to each item
								.append($('<td>').append(
									$('<button class = "results_button">')
									.text(result.name)
									.click(function() {
										DisplayItemInfo(result.ndbno);
									})

								))

						);
					});
				}

			}

		});
}

function DisplayItemInfo(ndbno) {
	var serving_unit;
	var serving_size;
	var energy_scalar = 0;
	var energy_unit = 'kcal';
	var protein_scalar = 0;
	var protein_unit = 'g';
	var fat_scalar = 0;
	var fat_unit = 'g';
	var carb_scalar = 0;
	var carb_unit = 'g';

	// Retrieve data from API
	$.ajax({
		type: 'GET',
		url: 'https://api.nal.usda.gov/ndb/reports/?ndbno=' + ndbno + '&api_key=' + API_key,
		success: function(data) {
			serving_size = parseFloat(data.report.food.nutrients[0].measures[0].eqv);
			serving_unit = data.report.food.nutrients[0].measures[0].eunit;

			$.each(data.report.food.nutrients, function(i, nutrient){
				// Take energy amount
				if (nutrient.nutrient_id == '208') {
					energy_scalar = parseFloat(nutrient.measures[0].value);
					energy_unit = nutrient.unit;
				// Protein amount
				} else if (nutrient.nutrient_id == '203') {
					protein_scalar = parseFloat(nutrient.measures[0].value);
					protein_unit = nutrient.unit;
				// Fat amount
				} else if (nutrient.nutrient_id == '204') {
					fat_scalar = parseFloat(nutrient.measures[0].value);
					fat_unit = nutrient.unit;
				// Carbohydrate amount
				} else if (nutrient.nutrient_id == '205') {
					carb_scalar = parseFloat(nutrient.measures[0].value);
					carb_unit = nutrient.unit;
				}
			});

			// Display name
			$('#foodname').remove();
			$('.food_info_title').after($('<h2 class = "food_info_title food_info_name" id = "foodname">').text(data.report.food.name));

			$('#nutrition-list').empty();
			// Display serving
			$('#nutrition-list').append($('<li>').text('Serving size: ' + serving_size.toString() + ' ' + sejrving_unit));
			// Display energy
			$('#nutrition-list').append($('<li>').text('Energy: ' + energy_scalar.toString() + ' ' + energy_unit));
			// Display protein
			$('#nutrition-list').append($('<li>').text('Protein: ' + protein_scalar.toString() + ' ' + protein_unit));
			// Display fat
			$('#nutrition-list').append($('<li>').text('Fat: ' + fat_scalar.toString() + ' ' + fat_unit));
			// Display carbohydrate
			$('#nutrition-list').append($('<li>').text('Carbohydrate: ' + carb_scalar.toString() + ' ' + carb_unit));

			// Display serving number input
			$('#nutrition-list').append(
			 $('<input>', {
				 type: 'text',
				 'maxlength': '4',
				 id: 'serving-input',
				 'placeholder': 'Enter number of servings'
			 })
			);
			//Display add food button
			$('#nutrition-list').append(
				$('<button id = "add-food">')
				.text('Add')
				.click(function() {
					var serving_number_input = document.getElementById('serving-input').value;
					if (logged_in == false) {
						alert('You can add foods to your intake record once logged in.');
						renderThirdView();
					}else if (serving_number_input.length == 0){
						alert('Nothing entered, please enter a number!');
					}else if (isNaN(serving_number_input)){
						alert('Please enter only a number!');
					}else if (Number(serving_number_input) <= 0) {
						alert('Please enter a positive number!');
					} else {
						var serving_number_var = Number(serving_number_input);
						addFood(
						data.report.food.name, serving_number_var, serving_size, serving_unit, energy_scalar, protein_scalar, fat_scalar, carb_scalar
						);
						alert('A record has been added to your intake records');
					}

				})
			);
		}

	});

}
