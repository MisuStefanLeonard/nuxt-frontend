<script setup>
import { computed } from 'vue'

const props = defineProps({
  titleText: String,
  titleAlignment: String,
  height: Number,
  chartType: String,
  isNumericXAxis: Boolean,
  isCategoryXAxis: Boolean,
  isDateTimeXAxis : Boolean,
  categories: Array,
  series: Array,
  xLabel: String,
  yLabel: String,
//   pointAnnotations : Array,
});

// Create a computed property for the x-axis options
const xaxisOptions = computed(() => {
    // isNumericXAxis : true
    // isCategoryXAxis : false
    // than go numeric or array []
  if(props.isNumericXAxis && !props.isCategoryXAxis){
    return props.isNumericXAxis
        ? { type: 'numeric' }
        : { categories: props.categories };
  }

  if(!props.isNumericXAxis && props.isCategoryXAxis){
    return {type: 'category'}
  }

  if(props.isDateTimeXAxis){
    return {type: 'datetime'}
  }
});

// const annotationsComputed = computed(() => {
//     if(props.isDateTimeXAxis){
//         return {points : props.pointAnnotations}
//     }
    
// })




// Create a computed property for the full chart options
const chartOptions = computed(() => ({
  chart: {
    height: props.height,
    type: props.chartType,
    zoom: {
      enabled: true,
    },
  },
//   annotations:{
//     ...annotationsComputed.value
//   },
  stroke: {
        curve: 'straight'
    },
  colors: ['#43A047' , '#B71C1C'],
  dataLabels: {
    style:{
        colors : ['white']
    },
    enabled: false,
  },
  title: {
    text: props.titleText,
    align: props.titleAlignment,
    style: {color: 'white'}
  },
  grid: {
    row: {
      colors: ['#212121', 'transparent'], // This array is repeated over columns
      opacity: 1,
    },
  },
  xaxis: {
    ...xaxisOptions.value,
    labels: {
        style : {colors: 'white'}
    },
    title: {
        text: props.xLabel, // 👈 X-Axis label
        style: {
            color: '#fff'
        }
    },
    axisBorder: {
      show: true,
      color: '#fff', // white x-axis line
    },
    axisTicks: {
      show: true,
      color: '#fff', // white x-axis ticks
    },
  },
  yaxis: {
    labels: {
      style: { colors: '#fff' }, // white y-axis labels
    },
    title: {
        text: props.yLabel, // 👈 X-Axis label
        style: {
            color: '#fff'
        }
    },
    axisBorder: {
      show: true,
      color: '#fff', // white y-axis line
    },
    axisTicks: {
      show: true,
      color: '#fff', // white y-axis ticks
    },
  },
  tooltip: {
    theme: 'dark', // sets a dark theme for the tooltip
    style: {
      fontSize: '12px',
      fontFamily: 'Helvetica, Arial, sans-serif',
    },
    custom: function({ series, seriesIndex, dataPointIndex, w }) {
        const dataPoint = w.config.series[seriesIndex].data[dataPointIndex];
        let tooltipHtml = `<div style="padding: 10px; color: #fff; background-color: black;">`
                               ;
        // Only show the total and sales if the data point has a 'sales' property.
        if (dataPoint.sales !== undefined) {
            tooltipHtml += `<strong>${dataPoint.x}</strong> <br>Total acumulat: ${dataPoint.y} RON
                            <br>Vanzari: ${dataPoint.sales}`;
        }
        if(dataPoint.order === 'type'){
            tooltipHtml += ` <strong>${dataPoint.x}</strong><span> : ${dataPoint.y}</span>`
        }
        if(dataPoint.seconds === 'seconds'){
            tooltipHtml += ` <strong>${dataPoint.x}</strong><br> ${dataPoint.y} minute</br>`
        }
        if(dataPoint.percent === 'percent'){
            tooltipHtml += ` <strong>${dataPoint.x}</strong><br> ${dataPoint.y} %</br>`

        }
        if(dataPoint.typeCount === 'typeCount'){
            tooltipHtml += ` <strong>Ora: ${dataPoint.x}</strong><br>Acumulat: ${dataPoint.y} RON</br>`
            tooltipHtml += `<span>Comenzi: ${dataPoint.count}</span>`

        }
        if(dataPoint.month === 'month'){
            tooltipHtml += ` <strong>Data: ${dataPoint.x}</strong><br>Acumulat: ${dataPoint.y} RON</br>`
            tooltipHtml += `<span>Comenzi: ${dataPoint.count}</span>`

        }
        tooltipHtml += `</div>`;
        return tooltipHtml;
    }

  }
}));
</script>

<template>
  <apexchart
    :type="props.chartType"
    :height="props.height"
    :options="chartOptions"
    :series="props.series"
  ></apexchart>
</template>
