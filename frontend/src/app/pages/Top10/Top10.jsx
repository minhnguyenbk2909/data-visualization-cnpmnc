import { Box } from "@material-ui/core";
import { Bar } from "react-chartjs-2";

export const Top10 = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() => 10),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: labels.map(() => 20),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <Box
      sx={{
        paddingTop: 16,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
      }}
    >
      <Box
        sx={{
          width: "40%",
          border: "1px solid #009df0",
          borderRadius: 4,
          boxShadow: "0px 0px 2px #3333d3",
          backgroundColor: "#f5f5ff",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          paddingY: "1rem",
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        Top 10 countries with most COVID cases
      </Box>
      <Box
        sx={{
          width: "90%",
          padding: 20,
          border: "1px solid blue",
          borderRadius: 4,
          backgroundColor: "#f5f5ff",
        }}
      >
        <Bar options={options} data={data} />
      </Box>
    </Box>
  );
};
