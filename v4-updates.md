
# Conversion to D3 v4

Version 4 is not backwards compatible with v3. The GitHub repo for this project has been updated to use v4.
Major changes include breaking up of library into smaller [modules](https://github.com/d3) and a change from logical namespace (ex: d3.svg.arc) to flat namespace (ex: d3.arc).

### Code Base Changes:

**2-loadingdata.mp4**
* **0:57** - D3 v4 now allows modularity. You can choose to only include specific microlibraries of the build, or you can use the entire library as before:  
`<script src="https://d3js.org/d3.v4.js"></script>`  
(index.html, line: 26)

**3-timelineaddingsvg.mp4**
* **04:20** - D3 no longer allows you to include multiple attr() in an object. Instead use two separate attr:  
	`.attr('width', width + margin.left + margin.right)`  
	`.attr('height', height + margin.top + margin.bottom)`   
    (timeline.js, line 9-10)  

    Adding the d3-selection-multi library will allow you to to set multiple properties like in v3:  
    `<script src="https://d3js.org/d3-selection-multi.v0.4.min.js"></script>`

**5-timelineaxes.mp4**  
* **0:25** - New scale documenation for scale: [https://github.com/d3/d3/blob/master/API.md#scales-d3-scale](https://github.com/d3/d3/blob/master/API.md#scales-d3-scale)
* **0:45** - d3.scale.linear is now `d3.scaleLinear`
* **1:30** - d3.scale.ordinal is now `d3.scaleOrdinal` or can be d3.scaleBand (see above documentation to learn more)
* **2:54** - instead of d3.scale.ordinal, use `d3.scaleBand` (timeline.js, line 42)
* **3:40** - padding should now be declared separately.  
    `.padding(.05)`  (timeline.js, line 44-45)
* **4:05** - d3.svg.axis has had a major overhaul. Now instead of using d3.svg.axis, you can specify `d3.axisBottom()`, `d3.axisTop()`, `d3.axisLeft()`, `d3.axisRight()`. See documentation: [https://github.com/d3/d3/blob/master/API.md#axes-d3-axis](https://github.com/d3/d3/blob/master/API.md#axes-d3-axis).  

	Note - styles are now included with axes. For this design we have to manually remove the axis stroke.  
	```
	.y-axis path, .x-axis path {
		stroke: none;
	}
	```
	(index.html, line: 15-17)
	
	Note - change in ticks. In order to remove the ticks added by v4, we manually add:  
	```
	.tickSize(0)
	.tickPadding(0)
	```  
	(timeline.js, line: 47-50)  
	
* **6:07** - d3.scale.linear() is now `d3.scaleLinear()`
* **6:37** - d3.svg.axis is now `d3.axisLeft(y)`  
	As above with the bottom axis we add tick styling in V4:  
	```
    .tickSize(0)
    .tickPadding(10)
    ```  
	(timeline.js, line: 58-60)
* **9:20** - formatting has changed. Use `d3.timeFormat()`.  
	[https://github.com/d3/d3/blob/master/API.md#time-formats-d3-time-format](https://github.com/d3/d3/blob/master/API.md#time-formats-d3-time-format)  
	(timeline.js, line: 50)

**6-timelinebar.mp4**
* **2:00** - attr can no longer be listed as an object  
	```
    .attr('x', function(d) {return x(d.transDate)})  
	.attr('y', function(d) {return y(Math.max(0, d.amount))})  
	.attr('width', x.bandwidth())  
	.attr('height', function(d) {return Math.abs(y(d.amount) - y(0))})
	```  
	(timeline.js, line: 82-85)

* **3:30** - x.rangeBand() is now `x.bandWidth()`  
	(timeline.js, line: 84)

* **5:34** - attr can no longer be listed as an object  
	```
    .attr('dy', '.3em')  
	.attr('dx', '-1em')
	```  
	(timeline.js, line: 70-71)

**7-timelinefinishing.mp4**
* **2:12** - d3.time.format is now `d3.timeFormat`
	[https://github.com/d3/d3/blob/master/API.md#time-formats-d3-time-format](https://github.com/d3/d3/blob/master/API.md#time-formats-d3-time-format)  
	(timeline.js, line: 88)

**10-piechartsegments.mp4**
* **0:40** - d3.svg.arc() is now `d3.arc()` 
	(pie.js, line 38)

* **1:30** - d3.svg.pie() is now `d3.pie()` 
	(pie.js, line: 42)

* **2:12** - new pie layout documentation:   [https://github.com/d3/d3/blob/master/API.md#pies](https://github.com/d3/d3/blob/master/API.md#pies)

* **3:53** - d3.scale.category20() is now `d3.scaleOrdinal(d3.schemeCategory20)`  
	(pie.js, line: 52)

* **4:00** - new color documentation:   [https://github.com/d3/d3/blob/master/API.md#ordinal-scales](https://github.com/d3/d3/blob/master/API.md#ordinal-scales)

**12-piechartfinishingtouches.mp4**
* **2:49** - d3.format() documentation:   [https://github.com/d3/d3/blob/master/API.md#number-formats-d3-format](https://github.com/d3/d3/blob/master/API.md#number-formats-d3-format)

* **3:25** - use `',d'` instead of `',f'` 
	(pie.js, line: 98)
	

**Note:**
Many bl.ocks.org examples have not been updated. Before using any bl.ocks.org code, check the script url. V4 will include d3.v4 in the path to d3.

## Further Reading:
[https://github.com/d3/d3/blob/master/CHANGES.md](https://github.com/d3/d3/blob/master/CHANGES.md)  
[https://iros.github.io/d3-v4-whats-new/](https://iros.github.io/d3-v4-whats-new/)




