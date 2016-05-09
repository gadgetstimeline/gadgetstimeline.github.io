// DOM element where the Timeline will be attached
var timelineContainer = document.getElementById('visualization');

// Configuration for the Timeline
var timelineOptions = {
  groupOrder: 'content',
  zoomMin: 1000 * 60 * 60 * 24 * 30  * 3,   // about three months in milliseconds
  //zoomMax: 1000 * 60 * 60 * 24 * 365 * 4    // about four years in milliseconds
};

// Instantiate categories
var groups = new vis.DataSet(categories);

// Instantiate items
for(var i in gadgets){
  // fix items with no end date
  if(!gadgets[i].end){
    gadgets[i].end = moment().format('YYYY-MM-DD');
    gadgets[i].className = 'current';
  }
  // items names
  var content = '';
  content += gadgets[i].brand ? '<b>' + gadgets[i].brand + '</b> ' : '';
  content += gadgets[i].device || '';
  content += (gadgets[i].uri || gadgets[i].wikipedia || gadgets[i].color) ? '<br>' : '';
  content += gadgets[i].uri ? '<a href="' + gadgets[i].uri + '"><i class="fa fa-globe" aria-hidden="true"></i></a> ' : '';
  content += gadgets[i].wikipedia ? '<a href="' + gadgets[i].wikipedia + '"><i class="fa fa-wikipedia-w" aria-hidden="true"></i></a> ' : '';
  content += gadgets[i].color ? 'Color: <span class="color" style="background-color:' + gadgets[i].color + '"></span>' + gadgets[i].color : '';
  content += gadgets[i].photo_uri ? '<br><img src="' + gadgets[i].photo_uri + '">' : '';
  gadgets[i].content = content;
}
var items = new vis.DataSet(gadgets);

// Create a Timeline
var timeline = new vis.Timeline(timelineContainer);
timeline.setOptions(timelineOptions);
timeline.setGroups(groups);
timeline.setItems(items);