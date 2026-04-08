import React, { useMemo, useState } from "react";
import { CircleAlert, Cpu } from "lucide-react";
import {
  joinClasses,
  formatCurrentDate as formatCurrentFullDate,
  formatCurrentTimeLabel,
  getFutureTaskDate as getCurrentFutureTaskDate,
} from "../../utils/common/helper";
import {
  hardwareComponents as hardwareComponentsData,
  diagnosticChecks as diagnosticChecksData,
  scheduledTasks as scheduledTasksData,
} from "../../data/constant";

import HardwareStatusCard from "../../components/clientMaintenance/HardwareComponentStatus";
import DiagnosticChecksList from "../../components/clientMaintenance/RecentDiagnosticChecks";
import MaintenanceSidebar from "../../components/clientMaintenance/AutomatedDiagnostics";

export default function ClientMaintenance() {
  const [hardwareComponents, setHardwareComponents] = useState(hardwareComponentsData);
  const [diagnosticChecks, setDiagnosticChecks] = useState(diagnosticChecksData);
  const [scheduledTasks, setScheduledTasks] = useState(scheduledTasksData);

  const currentFullDate = useMemo(() => formatCurrentFullDate(), []);

  const handleHardwareCardClick = (component) => {};
  const handleHardwareTitleClick = (component) => {};
  const handleHardwareStatusClick = (component) => {};

  const handleViewAllHistoryClick = () => {
    const nextDiagnosticCheck = {
      id: diagnosticChecks.length + 1,
      componentName: `New Station ${diagnosticChecks.length + 1}`,
      testName: "Thermal Balance Sweep",
      timestampLabel: `Today, ${formatCurrentTimeLabel()}`,
      status: diagnosticChecks.length % 3 === 0 ? "degraded" : "passed",
    };

    setDiagnosticChecks((previousChecks) => [...previousChecks, nextDiagnosticCheck]);
  };

  const handleDiagnosticDetailsClick = (diagnosticCheck) => {};
  const handleDiagnosticStatusClick = (diagnosticCheck) => {};
  const handleDiagnosticTimestampClick = (diagnosticCheck) => {};

  const handleManageTasksClick = () => {
    const futureTaskDate = getCurrentFutureTaskDate(7 + scheduledTasks.length * 3);

    const nextTask = {
      id: scheduledTasks.length + 1,
      monthLabel: futureTaskDate.monthLabel,
      dayLabel: futureTaskDate.dayLabel,
      title: `Inspection Task ${scheduledTasks.length + 1}`,
      subtitle: "Auto-generated maintenance plan",
    };

    setScheduledTasks((previousTasks) => [...previousTasks, nextTask]);
  };

  const handleScheduledTaskClick = (task) => {};
  const handleScheduledTaskDateClick = (task) => {};
  const handleScheduledTaskTitleClick = (task) => {};

  const handleReportIssueClick = () => {
    const incidentTime = formatCurrentTimeLabel();

    const nextCheck = {
      id: diagnosticChecks.length + 1,
      componentName: "Manual Incident Report",
      testName: `Reported ${incidentTime}`,
      timestampLabel: `Today, ${incidentTime}`,
      status: "degraded",
    };

    setDiagnosticChecks((previousChecks) => [nextCheck, ...previousChecks]);
  };

  const handleInitiateFullSweepClick = () => {
    setHardwareComponents((previousComponents) =>
      previousComponents.map((component, index) =>
        index === 1
          ? {
              ...component,
              value: "System Sweep Running",
              statusLabel: "IN PROGRESS",
              statusTone: "warning",
              subtitle: "Live maintenance scan active",
            }
          : component
      )
    );

    const sweepDiagnosticCheck = {
      id: diagnosticChecks.length + 1,
      componentName: "Automated Full Sweep",
      testName: `Initiated ${formatCurrentTimeLabel()}`,
      timestampLabel: `Today, ${formatCurrentTimeLabel()}`,
      status: "degraded",
    };

    setDiagnosticChecks((previousChecks) => [sweepDiagnosticCheck, ...previousChecks]);
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden text-white">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="flex flex-col gap-5 border-b border-white/6 pb-8 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h1 className="text-[38px] font-semibold leading-none tracking-[-0.05em] text-white sm:text-[46px]">
              Maintenance & Diagnostics
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-[18px] text-white/58">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#23df9f]" />
              <span>All local nodes performing within expected parameters</span>
              <span>•</span>
              <span>{currentFullDate}</span>
            </div>
          </div>

          <div className="flex items-center justify-start gap-3 xl:justify-end">
            <button
              onClick={handleReportIssueClick}
              className="inline-flex h-14 items-center justify-center gap-3 rounded-[18px] bg-[#12dfff] px-7 text-[16px] font-semibold text-[#06141b] shadow-[0_16px_30px_rgba(18,223,255,0.22)] transition hover:brightness-105"
            >
              <CircleAlert className="h-5 w-5" />
              Report Issue
            </button>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center gap-3">
            <Cpu className="h-5 w-5 text-[#12dfff]" />
            <h2 className="text-[22px] font-semibold tracking-[-0.03em] text-white">
              Hardware Component Status
            </h2>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {hardwareComponents.map((component) => (
              <HardwareStatusCard
                key={component.id}
                component={component}
                onCardClick={handleHardwareCardClick}
                onTitleClick={handleHardwareTitleClick}
                onStatusClick={handleHardwareStatusClick}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_330px]">
          <DiagnosticChecksList
            diagnosticChecks={diagnosticChecks}
            handleViewAllHistoryClick={handleViewAllHistoryClick}
            handleDiagnosticDetailsClick={handleDiagnosticDetailsClick}
            handleDiagnosticStatusClick={handleDiagnosticStatusClick}
            handleDiagnosticTimestampClick={handleDiagnosticTimestampClick}
          />
          <MaintenanceSidebar
            scheduledTasks={scheduledTasks}
            handleManageTasksClick={handleManageTasksClick}
            handleScheduledTaskClick={handleScheduledTaskClick}
            handleScheduledTaskDateClick={handleScheduledTaskDateClick}
            handleScheduledTaskTitleClick={handleScheduledTaskTitleClick}
            handleInitiateFullSweepClick={handleInitiateFullSweepClick}
          />
        </div>
      </div>
    </div>
  );
}