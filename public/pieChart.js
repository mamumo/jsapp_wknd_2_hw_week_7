var PieChart = function(data){

  var container = document.getElementById("pieChart");

  var chart = new Highcharts.Chart({
    chart: {
      type: 'pie',
      renderTo: container
    },
    title: { 
          text: "Countries of the World by Population"
       },
    series: [
          {
              data: data
          }
          ]
  });

}