interface UserDetailsType {
	name: string;
	userId: string | number;
}

const userDetailsType: UserDetailsType | Record<string, never> = {};

export { userDetailsType };
