import React from "react";
import {
  Search,
  Bell,
  User,
  Settings,
  Download,
  Plus,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import { doLogout } from "@/services/authService";

export const DashboardHeader = () => {
  const handleExportData = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Header background
    doc.setFillColor(59, 130, 246); // Blue background
    doc.rect(0, 0, pageWidth, 50, "F");

    // Company logo area (placeholder)
    doc.setFillColor(255, 255, 255);
    doc.rect(20, 15, 30, 20, "F");
    doc.setTextColor(59, 130, 246);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("GMB", 35, 28);

    // Main title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("GMB Listings Report", 70, 30);

    // Date and subtitle
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 70, 40);

    // Reset text color for body
    doc.setTextColor(0, 0, 0);

    // Summary Statistics Section
    let yPos = 70;
    doc.setFillColor(249, 250, 251); // Light gray background
    doc.rect(20, yPos - 5, pageWidth - 40, 45, "F");

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("📊 Summary Statistics", 25, yPos + 5);

    // Stats boxes
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    // Total Listings
    doc.setFillColor(239, 246, 255);
    doc.rect(25, yPos + 15, 40, 20, "F");
    doc.setDrawColor(59, 130, 246);
    doc.rect(25, yPos + 15, 40, 20);
    doc.setFont("helvetica", "bold");
    doc.text("6", 45, yPos + 23);
    doc.setFont("helvetica", "normal");
    doc.text("Total Listings", 27, yPos + 30);

    // Avg Health Score
    doc.setFillColor(240, 253, 244);
    doc.rect(70, yPos + 15, 40, 20, "F");
    doc.setDrawColor(34, 197, 94);
    doc.rect(70, yPos + 15, 40, 20);
    doc.setFont("helvetica", "bold");
    doc.text("56%", 90, yPos + 23);
    doc.setFont("helvetica", "normal");
    doc.text("Avg Health Score", 72, yPos + 30);

    // Critical Issues
    doc.setFillColor(254, 242, 242);
    doc.rect(115, yPos + 15, 40, 20, "F");
    doc.setDrawColor(239, 68, 68);
    doc.rect(115, yPos + 15, 40, 20);
    doc.setFont("helvetica", "bold");
    doc.text("3", 135, yPos + 23);
    doc.setFont("helvetica", "normal");
    doc.text("Critical Issues", 117, yPos + 30);

    // Top Issues Section
    yPos = 140;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("⚠️ Top Issues Requiring Attention", 20, yPos);

    yPos += 10;
    const issues = [
      { issue: "Photos Missing", count: 8, severity: "high" },
      { issue: "Reviews Low", count: 5, severity: "medium" },
      { issue: "Citations Incomplete", count: 3, severity: "low" },
    ];

    issues.forEach((item, index) => {
      const color =
        item.severity === "high"
          ? [239, 68, 68]
          : item.severity === "medium"
          ? [245, 158, 11]
          : [107, 114, 128];

      // Issue indicator
      doc.setFillColor(color[0], color[1], color[2]);
      doc.circle(25, yPos + 8, 2, "F");

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(
        `${item.issue} (${item.count} listings affected)`,
        35,
        yPos + 10
      );
      yPos += 15;
    });

    // Listings Details Section
    yPos += 10;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("📍 Listings Details", 20, yPos);

    // Table header
    yPos += 15;
    doc.setFillColor(59, 130, 246);
    doc.rect(20, yPos - 5, pageWidth - 40, 12, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Business Name", 25, yPos + 2);
    doc.text("Category", 100, yPos + 2);
    doc.text("Health Score", 140, yPos + 2);
    doc.text("Status", 170, yPos + 2);

    // Reset text color
    doc.setTextColor(0, 0, 0);
    yPos += 12;

    const listingsData = [
      {
        name: "AGS AUTOWHEEL",
        category: "Automotive",
        score: 21,
        status: "Poor",
      },
      {
        name: "APE PIAGGIO MOTORS",
        category: "Automotive",
        score: 23,
        status: "Poor",
      },
      {
        name: "Advance Physiotherapy",
        category: "Healthcare",
        score: 91,
        status: "Excellent",
      },
      {
        name: "Agency Simplifier",
        category: "Services",
        score: 36,
        status: "Poor",
      },
      {
        name: "Citation Builder Pro",
        category: "Services",
        score: 78,
        status: "Good",
      },
      {
        name: "Coach Abhi Dietitian",
        category: "Healthcare",
        score: 86,
        status: "Good",
      },
    ];

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);

    listingsData.forEach((listing, index) => {
      const bgColor = index % 2 === 0 ? [255, 255, 255] : [249, 250, 251];
      doc.setFillColor(bgColor[0], bgColor[1], bgColor[2]);
      doc.rect(20, yPos, pageWidth - 40, 12, "F");

      // Status color coding
      const statusColor =
        listing.score >= 90
          ? [34, 197, 94]
          : listing.score >= 70
          ? [59, 130, 246]
          : listing.score >= 50
          ? [245, 158, 11]
          : [239, 68, 68];

      doc.setTextColor(0, 0, 0);
      doc.text(listing.name, 25, yPos + 7);
      doc.text(listing.category, 100, yPos + 7);
      doc.text(`${listing.score}%`, 140, yPos + 7);

      // Status with color
      doc.setTextColor(statusColor[0], statusColor[1], statusColor[2]);
      doc.text(listing.status, 170, yPos + 7);
      doc.setTextColor(0, 0, 0);

      yPos += 12;
    });

    // Footer
    doc.setFillColor(249, 250, 251);
    doc.rect(0, pageHeight - 30, pageWidth, 30, "F");
    doc.setFontSize(8);
    doc.setTextColor(107, 114, 128);
    doc.text("Generated by GMB Briefcase Dashboard", 20, pageHeight - 15);
    doc.text(
      `Report generated on ${new Date().toLocaleString()}`,
      20,
      pageHeight - 5
    );
    doc.text(
      "Confidential - For Internal Use Only",
      pageWidth - 80,
      pageHeight - 10
    );

    // Download the PDF
    doc.save("gmb-listings-report.pdf");
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">GMB</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Briefcase</h1>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex"
              onClick={handleExportData}
            >
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>

            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Listing
            </Button>

            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <Link
                to="/profile"
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <User className="w-5 h-5" />
              </Link>
              <button
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                onClick={doLogout}
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
