import React from "react";
import { Camera } from "lucide-react";

export default function ProfilePhotoEditor({
  profileImageUrl,
  profileImageInputRef,
  handleProfilePhotoChangeClick,
  handleProfilePhotoFileChange,
  handleProfilePhotoDeleteClick
}) {
  return (
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
  );
}
