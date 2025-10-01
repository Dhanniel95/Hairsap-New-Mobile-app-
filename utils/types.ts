interface UserDetailsType {
	name: string;
	userId: string | number;
	faceIdPhotoUrl: string;
	email: string;
	phone: string;
	discountCode: string;
	role: string;
	changePassword: boolean;
}

const userDetailsType: UserDetailsType | Record<string, never> = {};

export { userDetailsType };
