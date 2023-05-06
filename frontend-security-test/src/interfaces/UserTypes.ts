export interface IUser{
    username?:string,
    password?:string,
    email?:string, 
    jwtToken?:string
}

export interface IAuthState{
    user:IUser | null,
    refreshTokenTimeout: NodeJS.Timeout | undefined
}