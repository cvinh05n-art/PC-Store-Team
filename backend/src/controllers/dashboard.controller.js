const dashboardService = require("../services/dashboard.service");

exports.getDashboardSummary = async (req, res) => {
  try {
    const dashboard = await dashboardService.getDashboardSummary();

    res.status(200).json({
      success: true,
      data: dashboard
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Không thể tải dữ liệu Dashboard",
      error: error.message
    });
  }
};