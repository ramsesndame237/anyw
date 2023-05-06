import { defineStore } from 'pinia';

//@ts-ignore
import { fetchWrapper} from '../helpers/fetchWrapper.js';
import router from '@/router'
import { IAuthState } from '@/interfaces/UserTypes';
import { Buffer } from 'buffer';

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () : IAuthState => ({
        user: null,
        refreshTokenTimeout: undefined
    }),
    actions: {
        async login(username:string, password:string) {
            
            this.user = await fetchWrapper.post(`${baseUrl}/authenticate`, { username, password }, { credentials: 'include' });
            if((this.user as string) == 'nom utilisateur ou mot de passe incorrect'){
                return {status:400, error:'nom utilisateur ou mot de passe incorrect'}
            }else{
                this.startRefreshTokenTimer();
            }
        },
        logout() {
            fetchWrapper.post(`${baseUrl}/revoke-token`, {}, { credentials: 'include' });
            this.stopRefreshTokenTimer();
            this.user = null;
            router.push('/login');
        },
        async refreshToken() {
            this.user = await fetchWrapper.post(`${baseUrl}/refresh-token`, {}, { credentials: 'include' });
            this.startRefreshTokenTimer();
        },
        startRefreshTokenTimer() {
            // parse json object from base64 encoded jwt token
            const jwtBase64 = this.user?.jwtToken?.split('.')[1];
            console.log(jwtBase64  ?? '')
            const dataJWt = jwtBase64  ?? ""
            if(dataJWt != ''){
                const jwtToken = JSON.parse(atob(dataJWt));
                
                // set a timeout to refresh the token a minute before it expires
                const expires = new Date(jwtToken.exp * 1000);
                const timeout = expires.getTime() - Date.now() - (60 * 1000);
                this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
            }
           
    
        },    
        stopRefreshTokenTimer() {
            clearTimeout(this.refreshTokenTimeout);
        }
    }
});