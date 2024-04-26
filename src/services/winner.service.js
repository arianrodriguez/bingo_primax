import axios from "axios";


class WinnerService{
    constructor(url, username, password, grant_type, client_id, client_secret){
        // clean: client_id
        // :
        // "string\"" -> string

        this.data = {
            grant_type: grant_type.replace(/\"/g, ''),
            username: username.replace(/\"/g, ''),
            password: password.replace(/\"/g, ''),
            client_id: client_id.replace(/\"/g, ''),
            client_secret: client_secret.replace(/\"/g, '')
        };
        this.token = null;
    }

    async getToken() {
        this.token = await axios.post('https://automatizacionesprimaxrrhhod.azurewebsites.net/app_bingo_od/token', new URLSearchParams(this.data), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(response => {
            return response.data.access_token;
        })
        .catch(error => {
            console.log(error);
            return null
        });
    }

    async insertWinner(dni) {
        await this.getToken();

        if(!this.token) {
            console.log('Error to obtain token')
            return null
        }

        return await axios.post(`https://automatizacionesprimaxrrhhod.azurewebsites.net/app_bingo_od/new_winners?dni=${dni}`, null, {
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${this.token}`,
            }
        })
            .then(response => {
                return response.data
            })
            .catch(error => {
                console.log(error);
                return null
            });
    }
}

export default WinnerService