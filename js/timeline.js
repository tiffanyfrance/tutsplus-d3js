var buildTimeline = function(data) {

	var margin = {top: 60, right: 60, bottom: 100, left: 60},
		width = 640 - margin.left - margin.right,
		height = 400 - margin.top - margin.bottom;

	var timeline = d3.select('#timeline')
		.append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr('transform',
			'translate(' + margin.left + ',' + margin.top + ')');

	var condesendData = [];

	for (var i = 0; i < data.length; i++) {
		var isPayment = data[i].category === 'Payment';
		var transDate = data[i].transDate;

		var obj = condesendData.find(function(element){
			return isPayment === element.isPayment
			&& transDate.getTime() === element.transDate.getTime();
		})

		if (!obj) {
			condesendData.push({
				'transDate': transDate,
				'amount': data[i].amount,
				'isPayment': isPayment
			});
		} else {
			obj.amount += data[i].amount;
		}
	};

	condesendData.sort(function compare(a, b) {
		return d3.ascending(a.transDate, b.transDate);
	});


	var x = d3.scaleBand()
		.domain(condesendData.map(function(d) {return d.transDate}))
		.rangeRound([0,width])
		.padding(.05);

	var xAxis = d3.axisBottom(x)
		.tickSize(0)
		.tickPadding(0)
		.tickFormat(d3.timeFormat('%m/%d/%Y'));

	var max = d3.max(condesendData, function(d) {return Math.abs(d.amount)});

	var y = d3.scaleLinear()
		.domain([-max,max])
		.range([height,0]);

	var yAxis = d3.axisLeft(y)
		.tickSize(0)
		.tickPadding(10);


	timeline.append('g')
		.attr('class', 'x-axis')
		.call(xAxis)
		.attr('transform', 'translate(0,' + height +')')
		.selectAll('text')
		.style('text-anchor', 'end')
		.attr('transform', 'rotate(-90)')
		.attr('dy', '.3em')
		.attr('dx', '-1em');

	timeline.append('g')
		.attr('class', 'y-axis')
		.call(yAxis);


	timeline.selectAll('rect')
		.data(condesendData)
		.enter()
		.append('rect')
		.attr('x', function(d) {return x(d.transDate)})
		.attr('y', function(d) {return y(Math.max(0, d.amount))})
		.attr('width', x.bandwidth())
		.attr('height', function(d) {return Math.abs(y(d.amount) - y(0))})
		.attr('fill', function(d) {return (d.amount < 0) ? '#d62728' : '#1f77b4'});

	var format = d3.timeFormat('%m/%d/%Y');

	var minDate = d3.min(condesendData, function(d) {return d.transDate});

	var maxDate = d3.max(condesendData, function(d) {return d.transDate});

	timeline.append('text')
		.text('Activity between ' + format(minDate) + ' and ' + format(maxDate))
		.style('font-size', '16px')
		.attr('x', -40)
		.attr('y', -20);
};
