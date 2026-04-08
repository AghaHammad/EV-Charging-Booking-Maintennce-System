import React from "react";
import { joinClasses } from "../../utils/common/helper";
import { getDiagnosticStatusPresentation } from "./utils";

export default function MobileDiagnosticCheckCard({
  diagnosticCheck,
  onDetailsClick,
}) {
  const statusPresentation = getDiagnosticStatusPresentation(diagnosticCheck.status);

  return (
    <div className="rounded-[24px] border border-white/6 bg-[#102d3b]/65 p-4">
        <div className="flex items-start justify-between gap-4">
        <div className="text-left">
          <div className="text-[16px] font-semibold text-white">
            {diagnosticCheck.componentName}
          </div>
          <div className="mt-1 text-[14px] text-white/44">
            {diagnosticCheck.testName}
          </div>
        </div>

        
        <button
          onClick={() => onDetailsClick(diagnosticCheck)}
          className="text-[14px] font-medium text-[#12dfff]"
        >
          Details
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        
        
        <div>
          <div className="text-[12px] uppercase tracking-[0.12em] text-white/38">
            Timestamp
          </div>
          <div className="mt-2 text-[15px] text-white/70">
            {diagnosticCheck.timestampLabel}
          </div>
        </div>

       
        <div>
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
        </div>

      </div>
    </div>
  );
}