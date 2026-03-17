import React, { useRef, useState } from "react";
import {User, Bell, Shield, Camera, Trash2, LockKeyhole, KeyRound, Smartphone, } from "lucide-react";

function joinClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}

function SettingsSectionHeader({ icon, title }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0b4a61]/55">
        {icon}
      </div>
      <h2 className="text-[22px] font-semibold tracking-[-0.03em] text-white">
        {title}
      </h2>
    </div>
  );
}

function NotificationPreferenceRow({
  title,
  description,
  enabled,
  onToggle,
}) {
  return (
    <button
      onClick={onToggle}
      className="flex w-full items-center justify-between gap-4 rounded-[24px] border border-white/6 bg-[linear-gradient(180deg,rgba(16,42,56,0.96),rgba(12,34,46,0.98))] px-5 py-5 text-left transition hover:border-[#12dfff]/10"
    >
      <div className="min-w-0">
        <div className="text-[18px] font-medium text-white">{title}</div>
        <div className="mt-1 text-[15px] text-white/38">{description}</div>
      </div>

      <div
        className={joinClasses(
          "relative h-8 w-12 shrink-0 rounded-full transition",
          enabled ? "bg-[#19d6ff]" : "bg-[#33435a]"
        )}
      >
        <span
          className={joinClasses(
            "absolute top-1 h-6 w-6 rounded-full bg-white shadow transition",
            enabled ? "left-[22px]" : "left-1"
          )}
        />
      </div>
    </button>
  );
}

function SecurityActionCard({
  icon,
  title,
  description,
  buttonLabel,
  onClick,
}) {
  return (
    <div className="rounded-[28px] border border-white/6 bg-[linear-gradient(180deg,rgba(16,42,56,0.96),rgba(12,34,46,0.98))] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.16)]">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0b4a61]/55">
          {icon}
        </div>

        <div className="min-w-0">
          <div className="text-[18px] font-semibold text-white">{title}</div>
          <div className="mt-1 text-[15px] leading-6 text-white/40">
            {description}
          </div>
        </div>
      </div>

      <button
        onClick={onClick}
        className="mt-5 inline-flex h-12 items-center justify-center rounded-[16px] border border-white/12 bg-white/[0.02] px-5 text-[15px] font-medium text-white transition hover:bg-white/[0.04]"
      >
        {buttonLabel}
      </button>
    </div>
  );
}

export default function Settings() {
  const profileImageInputRef = useRef(null);

  const [fullName, setFullName] = useState("John Doe");
  const [emailAddress, setEmailAddress] = useState("john.doe@voltcharge.com");
  const [profileImageUrl, setProfileImageUrl] = useState(
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80"
  );

  const [notificationPreferences, setNotificationPreferences] = useState({
    chargingStartEnd: true,
    paymentInvoices: true,
    nearbyStationAlerts: false,
  });

  const [toastMessage, setToastMessage] = useState("");

  const showToast = (message) => {
    setToastMessage(message);
    window.clearTimeout(showToast.timeoutId);
    showToast.timeoutId = window.setTimeout(() => {
      setToastMessage("");
    }, 2200);
  };

  const handleProfilePhotoChangeClick = () => {
    profileImageInputRef.current?.click();
  };

  const handleProfilePhotoFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    const imageUrl = URL.createObjectURL(selectedFile);
    setProfileImageUrl(imageUrl);
    showToast("Profile photo updated");
  };

  const handleProfilePhotoDeleteClick = () => {
    setProfileImageUrl(
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80"
    );
    showToast("Profile photo removed");
  };

  const handleProfileFieldClick = (fieldName) => {
    showToast(`${fieldName} selected`);
  };

  const handleNotificationToggle = (preferenceKey, label) => {
    setNotificationPreferences((previousPreferences) => ({
      ...previousPreferences,
      [preferenceKey]: !previousPreferences[preferenceKey],
    }));

    showToast(`${label} ${notificationPreferences[preferenceKey] ? "disabled" : "enabled"}`);
  };

  const handleChangePasswordClick = () => {
    showToast("Change password opened");
  };

  const handleTwoFactorClick = () => {
    showToast("Two-factor authentication opened");
  };

  const handleManageDevicesClick = () => {
    showToast("Device management opened");
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden text-white">
      <div className="mx-auto w-full max-w-[1280px] pb-10">
        
        <div>
          <h1 className="text-[42px] font-semibold leading-none tracking-[-0.05em] text-white sm:text-[50px]">
            Account Settings
          </h1>
          <p className="mt-4 text-[18px] text-white/56">
            Manage your profile information, preferences, and security settings.
          </p>
        </div>

       
        <div className="mt-12">
          <SettingsSectionHeader
            icon={<User className="h-5 w-5 text-[#19d6ff]" />}
            title="User Profile"
          />

          <div className="mt-6 h-px w-full bg-white/8" />

          <div className="mt-7 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_430px]">
            <div className="space-y-6">
              <div>
                <label className="mb-3 block text-[16px] text-white/76">
                  Full Name
                </label>
                <button
                  onClick={() => handleProfileFieldClick("Full Name")}
                  className="flex h-[54px] w-full items-center rounded-[18px] border border-white/6 bg-[linear-gradient(180deg,rgba(16,42,56,0.96),rgba(12,34,46,0.98))] px-5 text-left text-[16px] text-white/95"
                >
                  {fullName}
                </button>
              </div>

              <div>
                <label className="mb-3 block text-[16px] text-white/76">
                  Email Address
                </label>
                <button
                  onClick={() => handleProfileFieldClick("Email Address")}
                  className="flex h-[54px] w-full items-center rounded-[18px] border border-white/6 bg-[linear-gradient(180deg,rgba(16,42,56,0.96),rgba(12,34,46,0.98))] px-5 text-left text-[16px] text-white/95"
                >
                  {emailAddress}
                </button>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/6 bg-[linear-gradient(180deg,rgba(16,42,56,0.96),rgba(12,34,46,0.98))] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.16)]">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="relative shrink-0">
                  <img
                    src={profileImageUrl}
                    alt="Profile"
                    className="h-28 w-28 rounded-[24px] border border-white/10 object-cover"
                  />

                  <button
                    onClick={handleProfilePhotoChangeClick}
                    className="absolute bottom-[-8px] right-[-8px] flex h-10 w-10 items-center justify-center rounded-2xl bg-[#12dfff] text-[#071821] shadow-[0_12px_25px_rgba(18,223,255,0.18)]"
                  >
                    <Camera className="h-4 w-4" />
                  </button>

                  <input
                    ref={profileImageInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/gif"
                    className="hidden"
                    onChange={handleProfilePhotoFileChange}
                  />
                </div>

                <div className="min-w-0">
                  <div className="text-[18px] font-medium text-white">
                    Profile Photo
                  </div>
                  <div className="mt-2 text-[15px] text-white/38">
                    JPG, GIF or PNG. Max size of 800K
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleProfilePhotoChangeClick}
                      className="inline-flex h-11 items-center justify-center rounded-[14px] bg-[#22344c] px-5 text-[15px] font-medium text-white transition hover:bg-[#2d4261]"
                    >
                      Change
                    </button>

                    <button
                      onClick={handleProfilePhotoDeleteClick}
                      className="inline-flex h-11 items-center justify-center rounded-[14px] bg-[#3d222b] px-5 text-[15px] font-medium text-[#ff626c] transition hover:bg-[#4b2933]"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

       
        <div className="mt-12">
          <SettingsSectionHeader
            icon={<Bell className="h-5 w-5 text-[#19d6ff]" />}
            title="Notifications"
          />

          <div className="mt-6 h-px w-full bg-white/8" />

          <div className="mt-7 space-y-5">
            <NotificationPreferenceRow
              title="Charging Start/End"
              description="Get notified when your vehicle starts and stops charging."
              enabled={notificationPreferences.chargingStartEnd}
              onToggle={() =>
                handleNotificationToggle(
                  "chargingStartEnd",
                  "Charging Start/End"
                )
              }
            />

            <NotificationPreferenceRow
              title="Payment Invoices"
              description="Receive digital receipts via email after every charging session."
              enabled={notificationPreferences.paymentInvoices}
              onToggle={() =>
                handleNotificationToggle("paymentInvoices", "Payment Invoices")
              }
            />

            <NotificationPreferenceRow
              title="Nearby Station Alerts"
              description="Alerts for available chargers when battery level is low."
              enabled={notificationPreferences.nearbyStationAlerts}
              onToggle={() =>
                handleNotificationToggle(
                  "nearbyStationAlerts",
                  "Nearby Station Alerts"
                )
              }
            />
          </div>
        </div>

       
        <div className="mt-12">
          <SettingsSectionHeader
            icon={<Shield className="h-5 w-5 text-[#19d6ff]" />}
            title="Security"
          />

          <div className="mt-6 h-px w-full bg-white/8" />

          <div className="mt-7 grid grid-cols-1 gap-5 xl:grid-cols-3">
            <SecurityActionCard
              icon={<LockKeyhole className="h-5 w-5 text-[#19d6ff]" />}
              title="Password"
              description="Update your account password and keep your account secure."
              buttonLabel="Change Password"
              onClick={handleChangePasswordClick}
            />

            <SecurityActionCard
              icon={<KeyRound className="h-5 w-5 text-[#19d6ff]" />}
              title="Two-Factor Authentication"
              description="Add an extra layer of protection with verification codes."
              buttonLabel="Enable 2FA"
              onClick={handleTwoFactorClick}
            />

            <SecurityActionCard
              icon={<Smartphone className="h-5 w-5 text-[#19d6ff]" />}
              title="Trusted Devices"
              description="Review and manage devices currently signed in to your account."
              buttonLabel="Manage Devices"
              onClick={handleManageDevicesClick}
            />
          </div>
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