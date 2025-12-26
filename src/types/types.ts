export type TUser = {
    accessToken: string;
    refreshToken: string;
    fullName: string;
    userId: string;
    profileId: string;
    phone: string;
    roles: string[];
}

export type TClient = {
    id: string;
    fullName: string;
    email: string | null;
    phoneNumber: string;
    isActive: boolean;
    userType: number;
    barNumber: string | null;
    specialization: string | null;
    experinceNumber: string | null;
    lawFirmName: string | null;
    birthDate: string | null;
    lawyerId: string;
    lawyerCreatedAt: string;
};

export type TLoading = 'idle' | 'pending' | 'succeeded' | 'failed';