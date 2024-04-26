import axios from "axios";

class WinnerService{
    constructor(){
        this.http = axios.create({
            baseURL: import.meta.env.URL,
            headers: {
                accept: "application/json",
            },
        });

        this.token = null;
    }

    async getToken() {
        try {
            console.log(import.meta.env.URL)
            const response = await this.http.post("/your_token_endpoint", {
                grant_type: "compensacionesprimax",
                username: "compensacionesprimax",
                scope: "your_scope",
                client_id: "your_client_id",
                client_secret: "your_client_secret"
            }, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });
            this.token = response.data.access_token;
            console.log('token', response)
            this.token = response.data.token;
        } catch (e) {
            console.error(e);
        }
    }

    async insertWinner(dni) {
        try {
            if(!this.token){
                await this.getToken();
            }

            const response = this.http.post(`/new_winners?dni=${dni}`, null, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            });

            console.log('response', response);
        } catch(e) {
            console.error(e)
        }

    }
}

export default WinnerService