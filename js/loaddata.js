d3.csv('activity.csv', function(d) {

	return {
		transDate: new Date(d.TransDate),
		amount: +d.Amount,
		category: d.Category
	};

}, function(error, data){

	buildTimeline(data);
	buildPieChart(data);

});