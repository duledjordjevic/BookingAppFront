export interface User{
    id?: number;
    email?: string,
    password?: string,
    userType?: string,
    isReported?: boolean;
    status?: string;
}

export interface Guest{
    id?: number;
    isReported?: boolean;
    status?: string;
    name?: string;
    lastName?: string;
    numberOfCancellation?: number;
}

export interface Host{
	id?: number;
	isReported?: boolean;
	status?: string;
	name?: string;
	lastName?: string;
}
