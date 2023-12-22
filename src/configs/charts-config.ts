export const chartsConfig = {
  chart: {
    redrawOnParentResize: true,
    toolbar: {
      show: true,
      offsetX: 0,
      offsetY: 0,
      tools: {
        download: true,
        selection: true,
        zoom: true,
        zoomin: true,
        zoomout: true,
        pan: true,
        reset: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  yaxis: {
    labels: {
      style: {
        colors: "#848484",
        fontSize: "13px",
        fontFamily: "inherit",
        fontWeight: 300,
      },
    },
  },
  grid: {
    show: true,
    borderColor: "#848484",
    strokeDashArray: 5,
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  tooltip: {
    theme: "dark",
  },
};
  
export default chartsConfig;

