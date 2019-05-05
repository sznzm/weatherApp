//http://api.openweathermap.org/data/2.5/forecast?q=London,us&mode=json&appid=d02cc80dfa05eafb0489d0d1246dc1d6
var url = 'https://api.openweathermap.org/data/2.5/forecast?';
var apiId = '&appid=d02cc80dfa05eafb0489d0d1246dc1d6';
var citiesUrls = [];

$(document).ready(function () {


	var cities = [
                        "Nis",
						"Belgrade",
						"Kragujevac",
						"Cacak",
						"Subotica",
						"Novi Sad",
	];


	for (var i in cities) {
		var city = "q=" + cities[i];
		var unit = "&units=metric";
		var mode = "&mode=json";
		var cityUrl = url + city + unit + mode + apiId;
		citiesUrls.push(cityUrl);

		$.ajax({

			url: cityUrl,
			type: "GET",
			dataType: "json",
			success: function (data) {
				show(data);
			}
		});
	}


	$("#date").datepicker({
		minDate: "-0d",
		maxDate: "+4d"
	});

	$("#cityBtn").click(function () {
		$("#cityResult").empty();

		var unit = document.getElementById("unit").value;
		var city = document.getElementById("city").value;
		var inputDate = document.getElementById("date").value;
		var date = new Date(inputDate).getDate();
		var apiUrl = url + "q=" + city + "&units=" + unit + "&mode=json" + apiId;

		if ($('#date').val() == '') {
			$("#cityResult").html("<h1>Please, enter data.</h1>");
		} else {

			$.ajax({
				url: apiUrl,
				type: "GET",
				dataType: "json",
				success: function (data) {
					for (var i in data.list) {
						var dt = new Date(data.list[i].dt * 1000);
						if (dt.getDate() == date) {
							show(data, true);
							break;
						}
					}

				}
			});

		}

	});

});


function show(data, city) {
	var weatherResult = document.getElementById("weatherResult");
	var weatherDiv = document.createElement('div');
	weatherDiv.setAttribute("class", "weatherDiv");

	var forCity = document.createElement('p');
	forCity.innerHTML = "<h2>Weather for " + data.city.name + "</h2>";
	weatherDiv.appendChild(forCity);

	var icon = document.createElement("img");
	icon.setAttribute("src", "http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png")
	forCity.appendChild(icon);

	var descriptionDiv = document.createElement("div");
	descriptionDiv.setAttribute("class", "descriptionDiv");

	var weather = document.createElement("p");
	weather.innerHTML = data.list[0].weather[0].main;
	descriptionDiv.appendChild(weather);

	var description = document.createElement("p");
	description.innerHTML = data.list[0].weather[0].description;
	descriptionDiv.appendChild(description);

	var temperature = document.createElement("p");
	temperature.setAttribute("class", "temp");
	temperature.innerHTML = "<h2>" + data.list[0].main.temp + " &#8451;<h2>";
	descriptionDiv.appendChild(temperature);

	weatherDiv.appendChild(descriptionDiv);
	weatherResult.appendChild(weatherDiv);

	var option = document.createElement("option");
	option.value = data.city.name;
	option.innerHTML = data.city.name;
	document.getElementById("city").appendChild(option);

	if (city) {
		document.getElementById("cityResult").appendChild(weatherDiv);
	}
}
