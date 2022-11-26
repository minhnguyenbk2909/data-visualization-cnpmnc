import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Bar } from "react-chartjs-2";

const convertStatisticDataToChartDatasets = (topTenData, criteria) => {
  let label;
  let borderColor;
  let backgroundColor;

  if (criteria === "death") {
    label = "Death";
    borderColor = "#ff4000";
    backgroundColor = "#ff8080";
  } else if (criteria === "active") {
    label = "Active";
    borderColor = "#0000ff";
    backgroundColor = "#8888ff";
  } else if (criteria === "recover") {
    label = "Recovered";
    borderColor = "#00ff00";
    backgroundColor = "#88ff88";
  }

  const convertedData = {
    labels: topTenData.map((data) => data.countryName),
    datasets: [
      {
        label: label,
        data: topTenData.map((data) => data.data),
        borderColor: borderColor,
        backgroundColor: backgroundColor,
      },
    ],
  };

  return convertedData;
};

export const Top10 = ({ isLoading, topTenData, criteria }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Top 10 countries with most COVID ${criteria} cases`,
      },
    },
  };

  const isChartDataEmpty = Object.keys(topTenData).length === 0;

  const data =
    !isChartDataEmpty &&
    convertStatisticDataToChartDatasets(topTenData, criteria);
  console.log(topTenData, criteria);

  const tableConfigs = {
    columns: [
      { label: "Country", field: "countryName", width: 200, color: "#000000" },
      criteria === "confirmed"
        ? { label: "Confirmed", field: "data", width: 150, color: "#0000af" }
        : criteria === "death"
        ? { label: "Deaths", field: "data", width: 150, color: "#af4000" }
        : { label: "Recovered", field: "data", width: 150, color: "#00af00" },
    ],
    rows: isChartDataEmpty ? [] : topTenData,
  };

  return (
    <Box
      sx={{
        paddingTop: 16,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        marginBottom: 50,
      }}
    >
      <Box
        sx={{
          width: "40%",
          border: "1px solid blue",
          borderRadius: 4,
          boxShadow: "0px 0px 2px",
          backgroundColor: "#f5f5ff",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          paddingY: "1rem",
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        Top 10 countries with most COVID {criteria} cases
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <Box
          sx={{
            width: "60%",
            height: "fit-content",
            padding: 20,
            border: "1px solid blue",
            borderRadius: 4,
            backgroundColor: "#f5f5ff",
          }}
        >
          {isLoading ? (
            "Loading..."
          ) : topTenData.length > 0 ? (
            <Bar options={options} data={data} />
          ) : (
            "No data to show!"
          )}
        </Box>

        <Table style={{ width: "30%" }}>
          <TableHead>
            <TableRow>
              {tableConfigs.columns.map((tableColumn) => {
                return (
                  <TableCell
                    align="center"
                    style={{
                      padding: 4,
                      width: tableColumn.width,
                      fontWeight: 700,
                      border: "1px solid blue",
                      boxSizing: "border-box",
                    }}
                  >
                    {tableColumn.label}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {tableConfigs.rows.map((tableRow) => {
              // const countryName = tableRow.countryName;
              // const data = tableRow.data;
              console.log("row", tableRow);
              return (
                <TableRow>
                  {tableConfigs.columns.map((tableColumn) => {
                    console.log(topTenData[tableColumn.field]);
                    return (
                      <TableCell
                        align="center"
                        style={{
                          padding: 4,
                          width: tableColumn.width,
                          color: tableColumn.color,
                          border: "1px solid blue",
                          boxSizing: "border-box",
                        }}
                      >
                        {tableRow[tableColumn.field]}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};
