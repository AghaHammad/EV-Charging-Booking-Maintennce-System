import React, { useEffect, useRef, useState } from "react";
import {
  User,
  Bell,
  Shield,
  LockKeyhole,
  KeyRound,
  Smartphone,
} from "lucide-react";

import SettingsSectionHeader from "../../components/clientSettings/Notification";
import NotificationPreferenceRow from "../../components/clientSettings/NotificationsCard";
import SecurityActionCard from "../../components/clientSettings/Security";
import ProfilePhotoEditor from "../../components/clientSettings/ProfilePhoto";

import qaiserAvatar from "../../assets/avatar/qaiser.png";

const DEFAULT_USER = {
  fullName: "Qaiser",
  emailAddress: "qaiser@voltcharge.com",
};

const INITIAL_NOTIFICATION_PREFERENCES = {
  chargingStartEnd: true,
  paymentInvoices: true,
  nearbyStationAlerts: false,
};

export default function Settings() {
  const profileImageInputRef = useRef(null);
  const temporaryImageUrlRef = useRef(null);

  const [profileImageUrl, setProfileImageUrl] = useState(qaiserAvatar);
  const [notificationPreferences, setNotificationPreferences] = useState(
    INITIAL_NOTIFICATION_PREFERENCES
  );

  const openProfileImagePicker = () => {
    profileImageInputRef.current?.click();
  };

  const handleProfilePhotoChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    if (temporaryImageUrlRef.current) {
      URL.revokeObjectURL(temporaryImageUrlRef.current);
    }

    const nextImageUrl = URL.createObjectURL(selectedFile);
    temporaryImageUrlRef.current = nextImageUrl;

    setProfileImageUrl(nextImageUrl);
  };

  const removeProfilePhoto = () => {
    if (temporaryImageUrlRef.current) {
      URL.revokeObjectURL(temporaryImageUrlRef.current);
      temporaryImageUrlRef.current = null;
    }

    setProfileImageUrl(qaiserAvatar);
  };

  const handleProfileFieldSelect = (fieldLabel) => {};

  const toggleNotificationPreference = (key, label) => {
    setNotificationPreferences((currentPreferences) => {
      const isCurrentlyEnabled = currentPreferences[key];
      const updatedPreferences = {
        ...currentPreferences,
        [key]: !isCurrentlyEnabled,
      };

      return updatedPreferences;
    });
  };

  const handleChangePassword = () => {};

  const handleTwoFactorSetup = () => {};

  const handleManageDevices = () => {};

  useEffect(() => {
    return () => {
      if (temporaryImageUrlRef.current) {
        URL.revokeObjectURL(temporaryImageUrlRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full max-w-full overflow-x-hidden text-white">
      <div className="mx-auto w-full max-w-[1280px] pb-10">
        <header>
          <h1 className="text-[42px] font-semibold leading-none tracking-[-0.05em] text-white sm:text-[50px]">
            Account Settings
          </h1>
          <p className="mt-4 text-[18px] text-white/56">
            Manage your profile information, preferences, and security settings.
          </p>
        </header>

        <section className="mt-12">
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
                  type="button"
                  onClick={() => handleProfileFieldSelect("Full Name")}
                  className="flex h-[54px] w-full items-center rounded-[18px] border border-white/6 bg-[linear-gradient(180deg,rgba(16,42,56,0.96),rgba(12,34,46,0.98))] px-5 text-left text-[16px] text-white/95"
                >
                  {DEFAULT_USER.fullName}
                </button>
              </div>

              <div>
                <label className="mb-3 block text-[16px] text-white/76">
                  Email Address
                </label>
                <button
                  type="button"
                  onClick={() => handleProfileFieldSelect("Email Address")}
                  className="flex h-[54px] w-full items-center rounded-[18px] border border-white/6 bg-[linear-gradient(180deg,rgba(16,42,56,0.96),rgba(12,34,46,0.98))] px-5 text-left text-[16px] text-white/95"
                >
                  {DEFAULT_USER.emailAddress}
                </button>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/6 bg-[linear-gradient(180deg,rgba(16,42,56,0.96),rgba(12,34,46,0.98))] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.16)]">
              <ProfilePhotoEditor
                profileImageUrl={profileImageUrl}
                profileImageInputRef={profileImageInputRef}
                handleProfilePhotoChangeClick={openProfileImagePicker}
                handleProfilePhotoFileChange={handleProfilePhotoChange}
                handleProfilePhotoDeleteClick={removeProfilePhoto}
              />
            </div>
          </div>
        </section>

        <section className="mt-12">
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
                toggleNotificationPreference(
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
                toggleNotificationPreference(
                  "paymentInvoices",
                  "Payment Invoices"
                )
              }
            />

            <NotificationPreferenceRow
              title="Nearby Station Alerts"
              description="Alerts for available chargers when battery level is low."
              enabled={notificationPreferences.nearbyStationAlerts}
              onToggle={() =>
                toggleNotificationPreference(
                  "nearbyStationAlerts",
                  "Nearby Station Alerts"
                )
              }
            />
          </div>
        </section>

        <section className="mt-12">
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
              onClick={handleChangePassword}
            />

            <SecurityActionCard
              icon={<KeyRound className="h-5 w-5 text-[#19d6ff]" />}
              title="Two-Factor Authentication"
              description="Add an extra layer of protection with verification codes."
              buttonLabel="Enable 2FA"
              onClick={handleTwoFactorSetup}
            />

            <SecurityActionCard
              icon={<Smartphone className="h-5 w-5 text-[#19d6ff]" />}
              title="Trusted Devices"
              description="Review and manage devices currently signed in to your account."
              buttonLabel="Manage Devices"
              onClick={handleManageDevices}
            />
          </div>
        </section>
      </div>
    </div>
  );
}