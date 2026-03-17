import React, { useState } from "react";
import { LayoutDashboard, Map, Settings, Menu, X, Bell, Search, Zap, HelpCircle, CalendarDays, CreditCard, Wrench, } from "lucide-react";
import { Outlet, NavLink } from "react-router-dom";

const SIDEBAR_LINKS = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/client" },
  { name: "Stations", icon: Map, path: "/client/stations" },
  { name: "Bookings", icon: CalendarDays, path: "/client/bookings" },
  { name: "Payments", icon: CreditCard, path: "/client/payments" },
  { name: "Maintenance", icon: Wrench, path: "/client/maintenance" },
  { name: "Settings", icon: Settings, path: "/client/settings" },
];

export default function ClientLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#041a23] text-slate-300 [font-family:Inter,ui-sans-serif,system-ui,sans-serif]">
     
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

     
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-[250px] border-r border-white/5
          bg-[linear-gradient(180deg,#071a23_0%,#041a23_100%)]
          transform transition-transform duration-300 ease-in-out
          lg:static lg:translate-x-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex h-full flex-col p-5">
         
          <div className="mb-10 flex items-center justify-between pt-2">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0f3a4b] shadow-[0_0_30px_rgba(18,223,255,0.10)]">
                <Zap className="h-6 w-6 text-[#12dfff]" />
              </div>
              <span className="text-[20px] font-semibold tracking-[-0.03em] text-white">
                VoltCharge
              </span>
            </div>

            <button
              onClick={() => setIsSidebarOpen(false)}
              className="rounded-xl border border-white/10 p-2 text-white/80 lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {SIDEBAR_LINKS.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === "/client"}
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) =>
                    `
                    flex items-center gap-4 rounded-[22px] border px-5 py-4 transition-all
                    ${
                      isActive
                        ? "border-[#0fe1ff]/20 bg-[#0a2a39] text-[#12dfff] shadow-[inset_0_0_0_1px_rgba(18,223,255,0.03)]"
                        : "border-transparent text-slate-400 hover:bg-white/[0.02] hover:text-white"
                    }
                  `
                  }
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-[15px] font-medium">{item.name}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Bottom profile */}
          <div className="mt-auto rounded-[24px] border border-white/6 bg-[linear-gradient(180deg,rgba(11,37,48,0.98),rgba(9,29,39,0.98))] p-4">
            <button className="flex w-full items-center gap-4 text-left">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43b?auto=format&fit=crop&w=200&q=80"
                alt="John Doe"
                className="h-12 w-12 rounded-full object-cover ring-2 ring-[#12dfff]/15"
              />
              <div className="min-w-0">
                <h4 className="truncate text-[17px] font-semibold text-white">
                  John Doe
                </h4>
                <p className="mt-0.5 text-[13px] text-white/46">Premium Member</p>
              </div>
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-[#0fe1ff]/8 bg-[#041a23]/90 backdrop-blur-xl">
          <div className="flex h-[74px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="rounded-xl border border-white/8 bg-white/[0.02] p-2.5 text-white/80 lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>

              <div className="relative w-full max-w-[520px]">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/30" />
                <input
                  type="text"
                  placeholder="Search charging stations, addresses..."
                  className="h-[46px] w-full rounded-full border border-[#0fe1ff]/14 bg-[#082431] pl-12 pr-4 text-[15px] text-white outline-none placeholder:text-white/28 focus:border-[#12dfff]/25"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative rounded-full bg-[#0a2430] p-3 text-white/80">
                <Bell className="h-5 w-5" />
                <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-[#12dfff]" />
              </button>

              <button className="rounded-full bg-[#0a2430] p-3 text-white/80">
                <HelpCircle className="h-5 w-5" />
              </button>

              <div className="border-l border-white/8 pl-3">
                <button className="overflow-hidden rounded-full border border-white/6">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
                    alt="Avatar"
                    className="h-11 w-11 object-cover"
                  />
                </button>
              </div>
            </div>
          </div>
        </header>

       
        <main className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}