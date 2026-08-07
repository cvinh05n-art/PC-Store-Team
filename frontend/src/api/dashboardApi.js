import axiosClient from "./axiosClient";

const dashboardApi = {
  getSummary() {
    return axiosClient.get("/dashboard/summary");
  }
};

export default dashboardApi;