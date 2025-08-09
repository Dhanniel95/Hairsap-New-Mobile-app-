interface UserDetailsType {
	name: string;
	userId: string | number;
	faceIdPhotoUrl: string;
	email: string;
	phone: string;
}

const userDetailsType: UserDetailsType | Record<string, never> = {};

export { userDetailsType };
