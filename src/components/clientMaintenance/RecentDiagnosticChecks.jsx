import React from "react";
import { Eye } from "lucide-react";
import { joinClasses } from "../../utils/common/helper";
import MobileDiagnosticCheckCard from "./MobileDiagnosticCheck";
import { getDiagnosticStatusPresentation } from "./utils";

export default function DiagnosticChecksList({
  diagnosticChecks,
  handleViewAllHistoryClick,
  handleDiagnosticDetailsClick,
  handleDiagnosticStatusClick,
  handleDiagnosticTimestampClick,
}) {
  return (
    <section className="min-w-0">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Eye className="h-5 w-5 text-[#12dfff]" />
          <h2 className="text-[22px] font-semibold tracking-[-0.03em] text-white">
            Recent Diagnostic Checks
          </h2>
        </div>
        <button onClick={handleViewAllHistoryClick} className="text-[16px] font-medium text-[#12dfff]">
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
              const statusPresentation = getDiagnosticStatusPresentation(diagnosticCheck.status);
              return (
                <div key={diagnosticCheck.id} className="grid grid-cols-[1.4fr_1.1fr_0.9fr_0.7fr] items-center border-b border-white/[0.04] px-7 py-6">
                  <button onClick={() => handleDiagnosticDetailsClick(diagnosticCheck)} className="text-left">
                    <div className="text-[16px] font-semibold text-white">{diagnosticCheck.componentName}</div>
                    <div className="mt-1 text-[14px] text-white/44">{diagnosticCheck.testName}</div>
                  </button>
                  <button onClick={() => handleDiagnosticTimestampClick(diagnosticCheck)} className="text-left text-[15px] text-white/60">
                    {diagnosticCheck.timestampLabel}
                  </button>
                  <button onClick={() => handleDiagnosticStatusClick(diagnosticCheck)} className="flex items-center gap-2 text-left">
                    {statusPresentation.icon}
                    <span className={joinClasses("text-[15px] font-medium", statusPresentation.textClasses)}>{statusPresentation.text}</span>
                  </button>
                  <button onClick={() => handleDiagnosticDetailsClick(diagnosticCheck)} className="text-left text-[15px] font-medium text-[#12dfff]">
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
  );
}
