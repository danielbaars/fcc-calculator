$(document).ready(function(){

	var buttons = document.querySelector(".calc__buttons");
	var d1 = document.getElementById("d1");
	var d2 = document.getElementById("d2");
	
	var calcArray = [];
	var afterResult = false;

	function operator(value) {

		var operatorsArray = ["+", "-", "*", "/"];

		if ( operatorsArray.indexOf(value) !== -1 ) {

			return true;

		} else {

			return false;

		}

	}

	buttons.addEventListener("click", function(e) {
		
		var last = calcArray[calcArray.length-1];
		var input = e.target.dataset.input;
		var cat = e.target.dataset.cat;

		var re1 = /\*/g;
		var re2 = /\//g;
		var displayInput = input.replace(re1, "x").replace(re2, "÷");		

		if ( input === "ac" ) {

			calcArray.length = 0;
			d1.innerHTML = "0";
			d2.innerHTML = "0"
			afterResult = false;

		}

		if ( input === "ce" ) {

			calcArray.pop();
			var calcString = calcArray.join("");
			var re = /[0-9]*$/g;
			var prev = re.exec(calcString)[0];

			if ( calcArray.length !== 0 ) {

				d1.innerHTML = prev;
				d2.innerHTML = calcArray.join("");

			} else {

				d1.innerHTML = "0";
				d2.innerHTML = "0";

			}
			

		}

		if ( cat === "digit" ) {

			if ( !afterResult ) {

				calcArray.push(input);

			} else {

				calcArray.length = 0;
				calcArray.push(input);

			}

			if ( d1.innerHTML === "0" || afterResult ) {

				d1.innerHTML = input;
				d2.innerHTML = input;

			} else if ( operator(last) ) {

				d1.innerHTML = input;
				d2.innerHTML += input;

			} else {

				d1.innerHTML += input;
				d2.innerHTML += input;

			}

			afterResult = false;

		}

		if ( cat === "operator" ) {

			if ( d1.innerHTML !== "0" && !operator(last) && !afterResult ) {

				d1.innerHTML = displayInput;
				d2.innerHTML += displayInput;
				calcArray.push(input);
				afterResult = false;

			}

			if ( afterResult ) {

				d1.innerHTML = displayInput;
				d2.innerHTML = last + displayInput;
				calcArray.push(input);
				afterResult = false;				

			}

		}
		
		if ( input === "=" && !afterResult ) {
			
			var equationString = calcArray.join("");
			var result = math.eval(equationString);
			d1.innerHTML = result;
			d2.innerHTML += displayInput + result;
			calcArray.length = 0;
			calcArray.push(result);
			afterResult = true;
			
		}
		
	});

});











