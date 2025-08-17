import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../slices/store";
import type { UserProfile } from "../types/userProfileTypes/UserProfile";

export const selectUserDto = createSelector(
    (state: RootState) => state.user,
    (user: UserProfile) => ({
        id: user.id,
        fullName: user.fullName,
        userSlug: user.userSlug,
        profileImageUrl: user.userInfo?.profilePictureUrl
    })
)