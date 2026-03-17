import React, { useMemo, useState } from "react";
import {
  TriangleAlert,
  CircleAlert,
  CheckCircle2,
  CircleX,
  ChevronRight,
  Activity,
  Gauge,
  PlugZap,
  Ban,
  Eye,
  CalendarDays,
  Cpu,
} from "lucide-react";

const initialHardwareComponents = [
  {
    id: 1,
    title: "Power Inverters",
    value: "98.4% Eff.",
    statusLabel: "OPTIMAL",
    statusTone: "optimal",
    iconType: "power",
    subtitle: "Stable high-voltage conversion",
  },
  {
    id: 2,
    title: "Cooling Pumps",
    value: "3 Active Warnings",
    statusLabel: "NEEDS ATTENTION",
    statusTone: "warning",
    iconType: "cooling",
    subtitle: "Monitor thermal circulation",
  },
  {
    id: 3,
    title: "Connector Pins",
    value: "Zero Wear",
    statusLabel: "OPTIMAL",
    statusTone: "optimal",
    iconType: "connector",
    subtitle: "No visible degradation",
  },
  {
    id: 4,
    title: "Node C-14 Gateway",
    value: "Disconnected",
    statusLabel: "OFFLINE",
    statusTone: "offline",
    iconType: "offline",
    subtitle: "Remote gateway unavailable",
  },
];

const initialDiagnosticChecks = [
  {
    id: 1,
    componentName: "Station Alpha-12",
    testName: "HVDC Transformer Test",
    timestampLabel: "Today, 10:45 AM",
    status: "passed",
  },
  {
    id: 2,
    componentName: "Berlin Hypercharger",
    testName: "Coolant Pressure Sweep",
    timestampLabel: "Today, 09:12 AM",
    status: "degraded",
  },
  {
    id: 3,
    componentName: "Potsdamer Plaza",
    testName: "RFID Reader Latency",
    timestampLabel: "Yesterday, 11:30 PM",
    status: "passed",
  },
  {
    id: 4,
    componentName: "Highway Hub X",
    testName: "Network Handshake",
    timestampLabel: "Yesterday, 06:15 PM",
    status: "failed",
  },
];

const initialScheduledTasks = [
  {
    id: 1,
    monthLabel: "JUN",
    dayLabel: "14",
    title: "Cable Insulation Check",
    subtitle: "Station Gamma-08",
  },
  {
    id: 2,
    monthLabel: "JUN",
    dayLabel: "18",
    title: "Firmware v4.2 Rollout",
    subtitle: "Global - Region EU West",
  },
  {
    id: 3,
    monthLabel: "JUN",
    dayLabel: "22",
    title: "HVAC Filter Swap",
    subtitle: "Substation Terminal 4",
  },
];

function joinClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}

function formatCurrentFullDate() {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());
}

function formatCurrentTimeLabel() {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date());
}

function getCurrentFutureTaskDate(daysToAdd) {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);

  return {
    monthLabel: new Intl.DateTimeFormat("en-US", { month: "short" })
      .format(date)
      .toUpperCase(),
    dayLabel: String(date.getDate()).padStart(2, "0"),
  };
}

function getHardwareCardPresentation(statusTone) {
  if (statusTone === "optimal") {
    return {
      badgeClasses: "bg-[#15d79d]/10 text-[#22e2aa]",
      iconWrapperClasses: "bg-[#103d34]/55",
      iconClasses: "text-[#22e2aa]",
      hoverBorderClasses: "hover:border-[#22e2aa]/20",
    };
  }

  if (statusTone === "warning") {
    return {
      badgeClasses: "bg-[#f0ae3e]/12 text-[#f0ae3e]",
      iconWrapperClasses: "bg-[#493b1f]/55",
      iconClasses: "text-[#f0ae3e]",
      hoverBorderClasses: "hover:border-[#f0ae3e]/18",
    };
  }

  return {
    badgeClasses: "bg-[#ff545d]/10 text-[#ff545d]",
    iconWrapperClasses: "bg-[#40252b]/55",
    iconClasses: "text-[#ff545d]",
    hoverBorderClasses: "hover:border-[#ff545d]/18",
  };
}

function getDiagnosticStatusPresentation(status) {
  if (status === "passed") {
    return {
      text: "Passed",
      textClasses: "text-[#21df9f]",
      icon: <CheckCircle2 className="h-4.5 w-4.5 text-[#21df9f]" />,
    };
  }

  if (status === "degraded") {
    return {
      text: "Degraded",
      textClasses: "text-[#f0ae3e]",
      icon: <TriangleAlert className="h-4.5 w-4.5 text-[#f0ae3e]" />,
    };
  }

  return {
    text: "Failed",
    textClasses: "text-[#ff545d]",
    icon: <CircleX className="h-4.5 w-4.5 text-[#ff545d]" />,
  };
}

function HardwareStatusCard({
  component,
  onCardClick,
  onTitleClick,
  onStatusClick,
}) {
  const presentation = getHardwareCardPresentation(component.statusTone);

  return (
    <div
      className={joinClasses(
        "rounded-[28px] border border-white/6 bg-[linear-gradient(180deg,rgba(16,42,56,0.96),rgba(12,34,46,0.98))] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition",
        presentation.hoverBorderClasses
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <button
          onClick={() => onCardClick(component)}
          className={joinClasses(
            "flex h-12 w-12 items-center justify-center rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.12)]",
            presentation.iconWrapperClasses
          )}
        >
          {component.iconType === "power" ? (
            <PlugZap className={joinClasses("h-5 w-5", presentation.iconClasses)} />
          ) : component.iconType === "cooling" ? (
            <Activity className={joinClasses("h-5 w-5", presentation.iconClasses)} />
          ) : component.iconType === "connector" ? (
            <Gauge className={joinClasses("h-5 w-5", presentation.iconClasses)} />
          ) : (
            <Ban className={joinClasses("h-5 w-5", presentation.iconClasses)} />
          )}
        </button>

        <button
          onClick={() => onStatusClick(component)}
          className={joinClasses(
            "rounded-xl px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.08em]",
            presentation.badgeClasses
          )}
        >
          {component.statusLabel}
        </button>
      </div>

      <div className="mt-5">
        <button
          onClick={() => onTitleClick(component)}
          className="text-left text-[15px] text-white/58"
        >
          {component.title}
        </button>

        <button
          onClick={() => onCardClick(component)}
          className="mt-1 block text-left text-[22px] font-semibold tracking-[-0.03em] text-white"
        >
          {component.value}
        </button>

        <div className="mt-2 text-[14px] text-white/38">{component.subtitle}</div>
      </div>
    </div>
  );
}

function ScheduledTaskCard({
  task,
  onCardClick,
  onDateClick,
  onTitleClick,
}) {
  return (
    <button
      onClick={() => onCardClick(task)}
      className="flex w-full items-center justify-between gap-4 rounded-[28px] border border-white/6 bg-[linear-gradient(180deg,rgba(16,42,56,0.96),rgba(12,34,46,0.98))] p-4 text-left shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition hover:border-[#12dfff]/12"
    >
      <div className="flex min-w-0 items-center gap-4">
        <button
          onClick={(event) => {
            event.stopPropagation();
            onDateClick(task);
          }}
          className="flex h-[72px] w-[72px] shrink-0 flex-col items-center justify-center rounded-[18px] bg-[#1e3948]/70"
        >
          <div className="text-[12px] uppercase tracking-[0.08em] text-white/46">
            {task.monthLabel}
          </div>
          <div className="mt-1 text-[20px] font-semibold leading-none text-white">
            {task.dayLabel}
          </div>
        </button>

        <div className="min-w-0">
          <button
            onClick={(event) => {
              event.stopPropagation();
              onTitleClick(task);
            }}
            className="truncate text-left text-[16px] font-semibold text-white"
          >
            {task.title}
          </button>
          <div className="mt-1 truncate text-[14px] text-white/46">
            {task.subtitle}
          </div>
        </div>
      </div>

      <ChevronRight className="h-5 w-5 shrink-0 text-white/42" />
    </button>
  );
}

function MobileDiagnosticCheckCard({
  diagnosticCheck,
  onDetailsClick,
  onStatusClick,
  onTimestampClick,
}) {
  const statusPresentation = getDiagnosticStatusPresentation(diagnosticCheck.status);

  return (
    <div className="rounded-[24px] border border-white/6 bg-[#102d3b]/65 p-4">
      <div className="flex items-start justify-between gap-4">
        <button onClick={() => onDetailsClick(diagnosticCheck)} className="text-left">
          <div className="text-[16px] font-semibold text-white">
            {diagnosticCheck.componentName}
          </div>
          <div className="mt-1 text-[14px] text-white/44">
            {diagnosticCheck.testName}
          </div>
        </button>

        <button
          onClick={() => onDetailsClick(diagnosticCheck)}
          className="text-[14px] font-medium text-[#12dfff]"
        >
          Details
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <button onClick={() => onTimestampClick(diagnosticCheck)} className="text-left">
          <div className="text-[12px] uppercase tracking-[0.12em] text-white/38">
            Timestamp
          </div>
          <div className="mt-2 text-[15px] text-white/70">
            {diagnosticCheck.timestampLabel}
          </div>
        </button>

        <button onClick={() => onStatusClick(diagnosticCheck)} className="text-left">
          <div className="text-[12px] uppercase tracking-[0.12em] text-white/38">
            Status
          </div>
          <div className="mt-2 flex items-center gap-2">
            {statusPresentation.icon}
            <span
              className={joinClasses(
                "text-[15px] font-medium",
                statusPresentation.textClasses
              )}
            >
              {statusPresentation.text}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default function Maintenance() {
  const [hardwareComponents, setHardwareComponents] = useState(initialHardwareComponents);
  const [diagnosticChecks, setDiagnosticChecks] = useState(initialDiagnosticChecks);
  const [scheduledTasks, setScheduledTasks] = useState(initialScheduledTasks);
  const [toastMessage, setToastMessage] = useState("");

  const currentFullDate = useMemo(() => formatCurrentFullDate(), []);

  const showToast = (message) => {
    setToastMessage(message);
    window.clearTimeout(showToast.timeoutId);
    showToast.timeoutId = window.setTimeout(() => {
      setToastMessage("");
    }, 2200);
  };

  const handleHardwareCardClick = (component) => {
    showToast(`${component.title} opened`);
  };

  const handleHardwareTitleClick = (component) => {
    showToast(`${component.title} details opened`);
  };

  const handleHardwareStatusClick = (component) => {
    showToast(`${component.statusLabel} status opened`);
  };

  const handleViewAllHistoryClick = () => {
    const nextDiagnosticCheck = {
      id: diagnosticChecks.length + 1,
      componentName: `New Station ${diagnosticChecks.length + 1}`,
      testName: "Thermal Balance Sweep",
      timestampLabel: `Today, ${formatCurrentTimeLabel()}`,
      status: diagnosticChecks.length % 3 === 0 ? "degraded" : "passed",
    };

    setDiagnosticChecks((previousChecks) => [...previousChecks, nextDiagnosticCheck]);
    showToast("More diagnostic history loaded");
  };

  const handleDiagnosticDetailsClick = (diagnosticCheck) => {
    showToast(`${diagnosticCheck.componentName} details opened`);
  };

  const handleDiagnosticStatusClick = (diagnosticCheck) => {
    showToast(`${diagnosticCheck.componentName} status opened`);
  };

  const handleDiagnosticTimestampClick = (diagnosticCheck) => {
    showToast(diagnosticCheck.timestampLabel);
  };

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
    showToast("New scheduled task added");
  };

  const handleScheduledTaskClick = (task) => {
    showToast(`${task.title} opened`);
  };

  const handleScheduledTaskDateClick = (task) => {
    showToast(`${task.monthLabel} ${task.dayLabel} selected`);
  };

  const handleScheduledTaskTitleClick = (task) => {
    showToast(`${task.title} details opened`);
  };

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
    showToast("Issue reported");
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
    showToast("Full sweep initiated");
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

              <button
                onClick={() => showToast("System health clicked")}
                className="text-left"
              >
                All local nodes performing within expected parameters
              </button>

              <span>•</span>

              <button
                onClick={() => showToast(currentFullDate)}
                className="text-left"
              >
                {currentFullDate}
              </button>
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
          
          <section className="min-w-0">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Eye className="h-5 w-5 text-[#12dfff]" />
                <h2 className="text-[22px] font-semibold tracking-[-0.03em] text-white">
                  Recent Diagnostic Checks
                </h2>
              </div>

              <button
                onClick={handleViewAllHistoryClick}
                className="text-[16px] font-medium text-[#12dfff]"
              >
                View All History
              </button>
            </div>

            <div className="overflow-hidden rounded-[30px] border border-white/6 bg-[linear-gradient(180deg,rgba(16,42,56,0.96),rgba(12,34,46,0.98))] shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
              
              <div className="hidden lg:block">
                <div className="grid grid-cols-[1.4fr_1.1fr_0.9fr_0.7fr] border-b border-white/5 px-7 py-5 text-[12px] font-semibold uppercase tracking-[0.12em] text-white/40">
                  <div>Component / Station</div>
                  <div>Timestamp</div>
                  <div>Status</div>
                  <div>Action</div>
                </div>

                <div>
                  {diagnosticChecks.map((diagnosticCheck) => {
                    const statusPresentation = getDiagnosticStatusPresentation(
                      diagnosticCheck.status
                    );

                    return (
                      <div
                        key={diagnosticCheck.id}
                        className="grid grid-cols-[1.4fr_1.1fr_0.9fr_0.7fr] items-center border-b border-white/[0.04] px-7 py-6"
                      >
                        <button
                          onClick={() => handleDiagnosticDetailsClick(diagnosticCheck)}
                          className="text-left"
                        >
                          <div className="text-[16px] font-semibold text-white">
                            {diagnosticCheck.componentName}
                          </div>
                          <div className="mt-1 text-[14px] text-white/44">
                            {diagnosticCheck.testName}
                          </div>
                        </button>

                        <button
                          onClick={() => handleDiagnosticTimestampClick(diagnosticCheck)}
                          className="text-left text-[15px] text-white/60"
                        >
                          {diagnosticCheck.timestampLabel}
                        </button>

                        <button
                          onClick={() => handleDiagnosticStatusClick(diagnosticCheck)}
                          className="flex items-center gap-2 text-left"
                        >
                          {statusPresentation.icon}
                          <span
                            className={joinClasses(
                              "text-[15px] font-medium",
                              statusPresentation.textClasses
                            )}
                          >
                            {statusPresentation.text}
                          </span>
                        </button>

                        <button
                          onClick={() => handleDiagnosticDetailsClick(diagnosticCheck)}
                          className="text-left text-[15px] font-medium text-[#12dfff]"
                        >
                          Details
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

             
              <div className="grid gap-4 p-4 lg:hidden">
                {diagnosticChecks.map((diagnosticCheck) => (
                  <MobileDiagnosticCheckCard
                    key={diagnosticCheck.id}
                    diagnosticCheck={diagnosticCheck}
                    onDetailsClick={handleDiagnosticDetailsClick}
                    onStatusClick={handleDiagnosticStatusClick}
                    onTimestampClick={handleDiagnosticTimestampClick}
                  />
                ))}
              </div>
            </div>
          </section>

          
          <aside className="min-w-0">
            <div className="space-y-6">
              
              <div>
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <CalendarDays className="h-5 w-5 text-[#12dfff]" />
                    <h2 className="text-[22px] font-semibold tracking-[-0.03em] text-white">
                      Scheduled Tasks
                    </h2>
                  </div>

                  <button
                    onClick={handleManageTasksClick}
                    className="text-[16px] font-medium text-[#12dfff]"
                  >
                    Manage
                  </button>
                </div>

                <div className="space-y-4">
                  {scheduledTasks.map((task) => (
                    <ScheduledTaskCard
                      key={task.id}
                      task={task}
                      onCardClick={handleScheduledTaskClick}
                      onDateClick={handleScheduledTaskDateClick}
                      onTitleClick={handleScheduledTaskTitleClick}
                    />
                  ))}
                </div>
              </div>

             
              <div className="rounded-[30px] border border-white/6 bg-[linear-gradient(180deg,rgba(16,42,56,0.96),rgba(12,34,46,0.98))] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
                <h3 className="text-[18px] font-semibold tracking-[-0.03em] text-white">
                  Automated Diagnostics
                </h3>

                <button
                  onClick={() => showToast("Automated diagnostics info opened")}
                  className="mt-4 text-left text-[16px] leading-7 text-white/56"
                >
                  Run a full system sweep to detect potential failures before they occur.
                </button>

                <button
                  onClick={handleInitiateFullSweepClick}
                  className="mt-6 inline-flex h-14 w-full items-center justify-center rounded-[16px] border border-white/16 bg-transparent px-6 text-[16px] font-medium text-white transition hover:bg-white/[0.03]"
                >
                  Initiate Full Sweep
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      
      <div
        className={joinClasses(
          "pointer-events-none fixed bottom-5 right-5 z-[100] rounded-2xl border border-[#10e8ff]/15 bg-[#0c2230]/95 px-4 py-3 text-[14px] text-white shadow-[0_20px_45px_rgba(0,0,0,0.35)] transition",
          toastMessage ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        )}
      >
        {toastMessage}
      </div>
    </div>
  );
}