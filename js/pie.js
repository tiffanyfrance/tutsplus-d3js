var buildPieChart = function(data) {

	var pieData = [];

	for (var i = 0; i < data.length; i++) {
		if (data[i].category != 'Payment') {
			var cat = data[i].category;

			var obj = pieData.find(function (element) {
				return (element.category === cat);
			});

			if(!obj) {
				pieData.push({
					'category': data[i].category,
					'amount': data[i].amount
				});
			} else {
				obj.amount += data[i].amount;
			}
		}
	}

	var margin = {top: 70, bottom: 50, left: 70, right: 70},
		width = 380 - margin.left - margin.right,
		height = 400 - margin.top - margin.bottom,
		radius = Math.min(width, height) / 2,
		ring = 50;

	var piechart = d3.select('#piechart')
		.append('svg')
		.attr('width', width + margin.right + margin.left)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr('transform', 'translate(' + ((width + margin.left + margin.right) / 2) +
			',' + ((height + margin.top + margin.bottom) / 2) + ')');

	var arc = d3.arc()
		.innerRadius(radius - ring)
		.outerRadius(radius);

	var pie = d3.pie()
		.value(function(d) {return Math.abs(d.amount)})
		.sort(null);

	var segments = piechart.selectAll('g')
		.data(pie(pieData))
		.enter()
		.append('g')
		.attr('class', 'pie-segment');

	var color = d3.scaleOrdinal(d3.schemeCategory20);

	segments.append('path')
		.attr('d', arc)
		.attr('fill', function(d) {
			return color(d.data.category);
		});

	segments.append('text')
		.attr('class', 'pie-labels text-wrap')
		.attr('text-anchor', 'middle')
		.attr('transform', function(d) {
			var a = arc.centroid(d)[0],
				b = arc.centroid(d)[1],
				c = Math.sqrt(a*a + b*b);
			return 'translate(' + (a/c * (radius + 30)) + ',' +
				(b/c * (radius + 30)) + ')';

		})
		.text(function(d, i) {
			var str = pieData[i].category + '\n' + Math.abs(pieData[i].amount).toFixed(0);
			return str;
		});

	d3.selectAll('.text-wrap').each(breaksLines);

	function breaksLines() {
		var el = d3.select(this);
		var words = this.innerHTML.split('\n');
		el.text('');

		for (var i = 0; i < words.length; i++) {
			var tspan = el.append('tspan').text(words[i]);

			if (i > 0) {
				tspan.attr('x', 0).attr('dy', '15');
			}
		}
	}

	var total = 0;

	for (var i = 0; i < pieData.length; i++) {
		total += pieData[i].amount;
	}

	var formatNum = d3.format(',d');

	segments.append('text')
		.attr('text-anchor', 'middle')
		.text(formatNum(Math.abs(total)))
		.style('font-size', '40px')
		.style('font-weight', '100');

	segments.append('text')
		.attr('text-anchor', 'middle')
		.text('spent')
		.attr('transform', 'translate(0,25)')
		.style('font-weight', '100');

	segments.append('text')
		.text('Expenditures by Category')
		.style('font-size', '16px')
		.attr('text-anchor', 'middle')
		.attr('x', 0)
		.attr('y', -180);
};
