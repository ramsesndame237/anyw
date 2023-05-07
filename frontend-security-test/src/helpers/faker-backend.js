export { fakeBackend };

// array  of users
const usersKey = 'anywr-jwt-refresh-token-users';
const users = JSON.parse(localStorage.getItem(usersKey)) || [];


// add test user and save if users array is empty
if (!users.length) {
    users.push({ id: 1, firstName: 'Test', lastName: 'User', username: 'test', password: 'test',email:'test@gmail.com', refreshTokens: [] });
    localStorage.setItem(usersKey, JSON.stringify(users));
}


function fakeBackend() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        console.log({ url })
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(handleRoute, 500);

            function handleRoute() {
                const { method } = opts;
                switch (true) {
                    case url.endsWith('/users/authenticate') && method === 'POST':
                        return authenticate();
                    case url.endsWith('/users/register') && method === 'POST':
                        return register();
                    case url.endsWith('/users/refresh-token') && method === 'POST':
                        return refreshToken();
                    case url.endsWith('/users/revoke-token') && method === 'POST':
                        return revokeToken();
                    case url.endsWith('/users') && method === 'GET':
                        return getUsers();
                    default:
                        // pass through any requests not handled above
                        return realFetch(url, opts)
                            .then(response => resolve(response))
                            .catch(error => reject(error));
                }
            }

            // route functions

            function register() {
                const { username, password, firstName, lastName, email } = body();
                const user = users.find(x => (x.username === username || x.email == email));
                console.log(user)
                if (user) {
                    return error('Un utilisateur existe déjà avec ses informations')
                }

                else {
                    console.log({ users })

                    users.push({ id: users.length + 1, firstName: firstName, lastName: lastName, email: email, password: password, username: username, refreshTokens: [] })
                    localStorage.setItem(usersKey, JSON.stringify(users));

                    return ok({
                        message: 'votre compte à été créer avec succès'
                    })

                }

            }

            function authenticate() {
                const { username, password } = body();
                console.log({ username })
                const user = users.find(x => x.username === username && x.password === password);
                console.log({ user })
            
                if (!user) return error('nom utilisateur ou mot de passe incorrect');

                // add refresh token to user
                user.refreshTokens.push(generateRefreshToken());
                localStorage.setItem(usersKey, JSON.stringify(users));

                return ok({
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email:user.email,
                    jwtToken: generateJwtToken()
                })
            }

            function refreshToken() {
                const refreshToken = getRefreshToken();

                if (!refreshToken) return unauthorized();

                const user = users.find(x => x.refreshTokens.includes(refreshToken));

                if (!user) return unauthorized();

                // replace old refresh token with a new one and save
                user.refreshTokens = user.refreshTokens.filter(x => x !== refreshToken);
                user.refreshTokens.push(generateRefreshToken());
                localStorage.setItem(usersKey, JSON.stringify(users));

                return ok({
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    jwtToken: generateJwtToken()
                })
            }

            function revokeToken() {
                if (!isLoggedIn()) return unauthorized();

                const refreshToken = getRefreshToken();
                const user = users.find(x => x.refreshTokens.includes(refreshToken));

                // revoke token and save
                user.refreshTokens = user.refreshTokens.filter(x => x !== refreshToken);
                localStorage.setItem(usersKey, JSON.stringify(users));

                return ok();
            }

            function getUsers() {
                if (!isLoggedIn()) return unauthorized();
                return ok(users);
            }

            // helper functions

            function ok(body) {
                resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) })
            }

            function unauthorized() {
                resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorized' })) })
            }

            function error(message) {
                resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) })
                return {statut: 400, error:Promise.resolve(JSON.stringify(message))}
            }

            function isLoggedIn() {
                // check if jwt token is in auth header
                const authHeader = opts.headers['Authorization'] || '';
                if (!authHeader.startsWith('Bearer fake-jwt-token'))
                    return false;

                // check if token is expired
                try {
                    const jwtToken = JSON.parse(atob(authHeader.split('.')[1]));
                    const tokenExpired = Date.now() > (jwtToken.exp * 1000);
                    if (tokenExpired)
                        return false;
                } catch {
                    return false;
                }

                return true;
            }

            function body() {
                return opts.body && JSON.parse(opts.body);
            }

            function generateJwtToken() {
                // create token that expires in 15 minutes
                const tokenPayload = { exp: Math.round(new Date(Date.now() + 15 * 60 * 1000).getTime() / 1000) }
                return `fake-jwt-token.${btoa(JSON.stringify(tokenPayload))}`;
            }

            function generateRefreshToken() {
                const token = new Date().getTime().toString();

                // add token cookie that expires in 7 days
                const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
                document.cookie = `fakeRefreshToken=${token}; expires=${expires}; path=/`;

                return token;
            }

            function getRefreshToken() {
                // get refresh token from cookie
                return (document.cookie.split(';').find(x => x.includes('fakeRefreshToken')) || '=').split('=')[1];
            }
        });
    }
}