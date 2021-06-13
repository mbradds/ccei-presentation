const cerPalette = {
  "Night Sky": "#054169",
  Sun: "#FFBE4B",
  Ocean: "#5FBEE6",
  Forest: "#559B37",
  Flame: "#FF821E",
  Aubergine: "#871455",
  "Dim Grey": "#8c8c96",
  "Cool Grey": "#42464B",
  hcBlue: "#7cb5ec",
  hcGreen: "#90ed7d",
  hcPink: "#f15c80",
  hcRed: "#f45b5b",
  hcAqua: "#2b908f",
  hcPurple: "#8085e9",
  hcLightBlue: "#91e8e1",
};

function exampleUpdating(div) {
  Highcharts.chart(div, {
    chart: {
      type: "spline",
      animation: Highcharts.svg, // don't animate in old IE
      marginRight: 10,
      events: {
        load: function () {
          // set up the updating of the chart each second
          var series = this.series[0];
          setInterval(function () {
            var x = new Date().getTime(), // current time
              y = Math.random();
            series.addPoint([x, y], true, true);
          }, 1000);
        },
      },
    },

    time: {
      useUTC: false,
    },

    title: {
      text: "",
    },

    xAxis: {
      type: "datetime",
      tickPixelInterval: 150,
    },

    yAxis: {
      title: {
        text: "Value",
      },
      plotLines: [
        {
          value: 0,
          width: 1,
          color: "#808080",
        },
      ],
    },

    tooltip: {
      headerFormat: "<b>{series.name}</b><br/>",
      pointFormat: "{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}",
    },

    legend: {
      enabled: false,
    },

    exporting: {
      enabled: false,
    },

    series: [
      {
        name: "Random data",
        data: (function () {
          // generate an array of random data
          var data = [],
            time = new Date().getTime(),
            i;

          for (i = -19; i <= 0; i += 1) {
            data.push({
              x: time + i * 1000,
              y: Math.random(),
            });
          }
          return data;
        })(),
      },
    ],
  });
}

function example500k(div) {
  function getData(n) {
    var arr = [],
      i,
      x,
      a,
      b,
      c,
      spike;
    for (
      i = 0, x = Date.UTC(new Date().getUTCFullYear(), 0, 1) - n * 36e5;
      i < n;
      i = i + 1, x = x + 36e5
    ) {
      if (i % 100 === 0) {
        a = 2 * Math.random();
      }
      if (i % 1000 === 0) {
        b = 2 * Math.random();
      }
      if (i % 10000 === 0) {
        c = 2 * Math.random();
      }
      if (i % 50000 === 0) {
        spike = 10;
      } else {
        spike = 0;
      }
      arr.push([x, 2 * Math.sin(i / 100) + a + b + c + spike + Math.random()]);
    }
    return arr;
  }
  var n = 500000,
    data = getData(n);

  Highcharts.chart(div, {
    chart: {
      zoomType: "x",
    },

    title: {
      text: "",
    },

    subtitle: {
      text: "",
    },

    tooltip: {
      valueDecimals: 2,
    },

    xAxis: {
      type: "datetime",
    },

    series: [
      {
        data: data,
        lineWidth: 0.5,
        name: "Hourly data points",
      },
    ],
  });
}

function exampleChart(div) {
  Highcharts.chart(div, {
    title: {
      text: "Solar Employment Growth by Sector, 2010-2016",
    },

    subtitle: {
      text: "Source: thesolarfoundation.com",
    },

    yAxis: {
      title: {
        text: "Number of Employees",
      },
    },

    xAxis: {
      accessibility: {
        rangeDescription: "Range: 2010 to 2017",
      },
    },

    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        pointStart: 2010,
      },
    },

    series: [
      {
        name: "Installation",
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
      },
      {
        name: "Manufacturing",
        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434],
      },
      {
        name: "Sales & Distribution",
        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387],
      },
      {
        name: "Project Development",
        data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227],
      },
      {
        name: "Other",
        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111],
      },
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  });
}

function exampleMap(div) {
  // The demo uses https://api.met.no/ API. Every AJAX
  // call downloads the XML format data, basing on specific capital
  // city latitude and longitude values.

  function getJSON(url, cb) {
    const request = new XMLHttpRequest();
    request.open("GET", url, true);

    request.onload = function () {
      if (this.status < 400) {
        return cb(JSON.parse(this.response));
      }
    };

    request.send();
  }

  // Data structure: [country_code, latitude, longitude, capital_city]
  const newData = [
    ["dk", 55.66, 12.58, "Copenhagen"],
    ["fo", 62, -6.79, "Torshavn"],
    ["hr", 45.8, 16, "Zagreb"],
    ["nl", 52.35, 4.91, "Amsterdam"],
    ["ee", 59.43, 24.71, "Tallinn"],
    ["bg", 42.68, 23.31, "Sofia"],
    ["es", 40.4, -3.68, "Madrid"],
    ["it", 41.9, 12.48, "Rome"],
    ["sm", 43.93, 12.41, "San Marino"],
    ["va", 41.9, 12.45, "Vatican"],
    ["tr", 39.93, 32.86, "Ankara"],
    ["mt", 35.88, 14.5, "Valetta"],
    ["fr", 48.86, 2.33, "Paris"],
    ["no", 59.91, 10.75, "Oslo"],
    ["de", 52.51, 13.4, "Berlin"],
    ["ie", 53.31, -6.23, "Dublin"],
    ["ua", 50.43, 30.51, "Kyiv"],
    ["fi", 60.16, 24.93, "Helsinki"],
    ["se", 59.33, 18.05, "Stockholm"],
    ["ru", 55.75, 37.6, "Moscow"],
    ["gb", 51.5, -0.08, "London"],
    ["cy", 35.16, 33.36, "Nicosia"],
    ["pt", 38.71, -9.13, "Lisbon"],
    ["gr", 37.98, 23.73, "Athens"],
    ["lt", 54.68, 25.31, "Vilnius"],
    ["si", 46.05, 14.51, "Ljubljana"],
    ["ba", 43.86, 18.41, "Sarajevo"],
    ["mc", 43.73, 7.41, "Monaco"],
    ["al", 41.31, 19.81, "Tirana"],
    ["nc", 35.18, 33.36, "North Nicosia"],
    ["rs", 44.83, 20.5, "Belgrade"],
    ["ro", 44.43, 26.1, "Bucharest"],
    ["me", 42.43, 19.26, "Podgorica"],
    ["li", 47.13, 9.51, "Vaduz"],
    ["at", 48.2, 16.36, "Vienna"],
    ["sk", 48.15, 17.11, "Bratislava"],
    ["hu", 47.5, 19.08, "Budapest"],
    ["ad", 42.2, 1.24, "Andorra la Vella"],
    ["lu", 49.6, 6.11, "Luxembourg"],
    ["ch", 46.91, 7.46, "Bern"],
    ["be", 50.83, 4.33, "Brussels"],
    ["pl", 52.25, 21, "Warsaw"],
    ["mk", 42, 21.43, "Skopje"],
    ["lv", 56.95, 24.1, "Riga"],
    ["by", 53.9, 27.56, "Minsk"],
    ["is", 64.15, -21.95, "Reykjavik"],
    ["md", 47, 28.85, "Chisinau"],
    ["cz", 50.08, 14.46, "Prague"],
  ];
  // Get temperature for specific localization, and add it to the chart.
  // It takes point as first argument, countries series as second
  // and capitals series as third. Capitals series have to be the
  // 'mappoint' series type, and it should be defined before in the
  // series array.
  function getTemp(point, countries, capitals) {
    const url =
      "https://api.met.no/weatherapi/locationforecast/2.0/?lat=" +
      point[1] +
      "&lon=" +
      point[2];

    const callBack = (json) => {
      const temp =
        json.properties.timeseries[0].data.instant.details.air_temperature;
      const colorAxis = countries.chart.colorAxis[0];

      const country = {
        "hc-key": point[0],
        value: parseInt(temp, 10) || null,
      };
      const capital = {
        name: point[3],
        lat: point[1],
        lon: point[2],
        color: colorAxis.toColor(temp),
        temp: parseInt(temp, 10) || "No data",
      };

      countries.addPoint(country);
      capitals.addPoint(capital);
      return temp;
    };

    getJSON(url, callBack);
  }

  // Create the chart
  Highcharts.mapChart(div, {
    chart: {
      map: "custom/europe",
      animation: false,
      events: {
        load: function () {
          var countries = this.series[0];
          var capitals = this.series[1];
          newData.forEach(function (elem) {
            getTemp(elem, countries, capitals);
          });
        },
      },
    },

    title: {
      text: "Current temperatures in capitals of Europe",
    },

    subtitle: {
      text: 'Data source: <a href="https://api.met.no/">https://api.met.no/</a>',
    },

    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: "bottom",
      },
    },

    colorAxis: {
      min: -25,
      max: 40,
      labels: {
        format: "{value}°C",
      },
      stops: [
        [0, "#0000ff"],
        [0.3, "#6da5ff"],
        [0.6, "#ffff00"],
        [1, "#ff0000"],
      ],
    },

    legend: {
      title: {
        text: "Degrees Celsius",
      },
    },

    tooltip: {
      headerFormat:
        '<span style="color:{point.color}">\u25CF</span> {point.key}:<br/>',
      pointFormatter: function () {
        var value = Number.isInteger(this.temp) ? this.temp + "°C" : "No data";
        return "Temperature: <b>" + value + "</b>";
      },
    },

    series: [
      {
        name: "Temperatures",
        states: {
          hover: {
            color: "#BADA55",
          },
        },
        dataLabels: {
          enabled: false,
        },
        enableMouseTracking: false,
      },
      {
        name: "Capitals of Europe",
        type: "mappoint",
        showInLegend: false,
        marker: {
          lineWidth: 1,
          lineColor: "#000",
        },
        dataLabels: {
          crop: true,
          formatter: function () {
            var value = Number.isInteger(this.point.temp)
              ? this.point.temp + "°C"
              : "No data";
            return (
              "<span>" + this.key + "</span><br/><span>" + value + "</span>"
            );
          },
        },
      },
    ],
  });
}

function highchartsStuff(div) {
  const hcList = document.getElementById(div);

  const hcInfo = [
    {
      prod: "https://www.cer-rec.gc.ca/en/data-analysis/facilities-we-regulate/2021/index.html",
      name: "Canada Pipeline System 2021",
      test: "https://mbradds.github.io/transportation-report/",
      code: "https://github.com/mbradds/transportation-report",
      release: "June 9, 2021",
    },
    {
      prod: "https://www.cer-rec.gc.ca/en/data-analysis/facilities-we-regulate/pipeline-profiles/index.html",
      name: "Pipeline Profiles",
      test: "https://pipeline-profiles.herokuapp.com/",
      code: "https://github.com/mbradds/pipeline-profiles",
      release: "Ongoing",
    },
    {
      prod: "https://www.cer-rec.gc.ca/en/data-analysis/energy-commodities/crude-oil-petroleum-products/statistics/weekly-crude-run-summary-data.html",
      name: "Crude Runs",
      test: "https://crude-runs.herokuapp.com/",
      code: "https://github.com/mbradds/crude-runs",
      release: "June 7, 2021",
    },
  ];

  const html = (v, i) =>
    `<section class="panel panel-default">
    <header class="panel-heading">
        <h5 class="panel-title">${i + 1}. ${v.name}</h5>
    </header>
    <div class="panel-body">
        <ul class="lst-spcd">
        <li>
            <strong>Production link:</strong>
            <a href="${v.prod}" target="_blank">CER Website</a>
        </li>
        <li>
            <strong>Test link:</strong>
            <a href="${v.test}" target="_blank">${v.test}</a>
        </li>
        <li>
            <strong>Source code:</strong>
            <a href="${v.code}" target="_blank">${v.code}</a>
        </li>
        <li><strong>Release Date:</strong> ${v.release}</li>
        </ul>
    </div>
    </section>`;

  let totalHtml = "";
  hcInfo.forEach((v, i) => {
    totalHtml += html(v, i);
  });

  hcList.innerHTML = totalHtml;
}

function pageSizeChart(div) {
  return new Highcharts.chart(div, {
    chart: {
      type: "column",
    },
    title: {
      text: "Total network transfer size: Lower is better",
    },
    xAxis: {
      categories: true,
      labels: {
        style: {
          fontSize: "14px",
          color: cerPalette["Cool Grey"],
        },
      },
    },
    credits: {
      text: "",
    },
    yAxis: {
      min: 0,
      title: {
        text: "",
      },
      labels: {
        style: {
          fontSize: "14px",
          color: cerPalette["Cool Grey"],
        },
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: "bold",
          color: cerPalette["Cool Grey"],
          fontSize: "14px",
        },
        formatter: function () {
          return `${this.total} MB`;
        },
      },
    },
    legend: {
      itemStyle: {
        fontSize: "16px",
      },
    },
    tooltip: {
      // headerFormat: "<b>{point.x}</b><br/>",
      // pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [
      {
        name: "CER",
        data: [{ name: "NGTL Profile (3 months ago)", y: 6.2 }],
        color: cerPalette["Sun"],
        showInLegend: true,
      },
      {
        name: "Non-CER",
        data: [{ name: "NYT Front Page", y: 5.7 }],
        color: cerPalette["Night Sky"],
        showInLegend: true,
      },
      {
        name: "Non-CER",
        data: [{ name: "CCEI Front Page (now)", y: 5.5 }],
        color: cerPalette["Night Sky"],
        showInLegend: false,
      },
      {
        name: "CER",
        data: [{ name: "Crude Runs (1 week ago)", y: 4.5 }],
        color: cerPalette["Sun"],
        showInLegend: false,
      },
      {
        name: "CER",
        data: [{ name: "NGTL Profile (now)", y: 3.9 }],
        color: cerPalette["Sun"],
        showInLegend: false,
      },
      {
        name: "Non-CER",
        data: [{ name: "CCEI Front Page (potential)", y: 2.4 }],
        color: cerPalette["Night Sky"],
        showInLegend: false,
      },
      {
        name: "Non-CER",
        data: [{ name: "EIA Crude Imports (Highcharts)", y: 2 }],
        color: cerPalette["Night Sky"],
        showInLegend: false,
      },
      {
        name: "CER",
        data: [{ name: "Conditions Data Viz", y: 1.6 }],
        color: cerPalette["Sun"],
        showInLegend: false,
      },
      {
        name: "CER",
        data: [{ name: "Crude Runs (now)", y: 0.596 }],
        color: cerPalette["Sun"],
        showInLegend: false,
      },
    ],
  });
}

exampleChart("example-chart");
exampleMap("example-map");
exampleUpdating("example-live");
example500k("example-500k");
highchartsStuff("highcharts-stuff");
pageSizeChart("page-sise-chart");
