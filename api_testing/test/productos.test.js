const axios = require('axios');
const assert = require('assert');

const login = async() => {
    try {
        const headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json" 
        }
           
        const bodyContent = JSON.stringify({
            "email": "williamcruzacero@hotmail.com",
            "password": "1234"
        });
        
        const reqOptions = {
            url: "http://localhost:8080/sesion",
            method: "POST",
            headers: headersList,
            data: bodyContent,
        }
        
        const response = await axios.request(reqOptions);
        const {token} = response.data
        return token

    } catch (error) {
        throw error;
    }
}

const produtos = async (token) => {
    
    const axiosIntance = axios.create({
        baseURL: 'http://localhost:8080',
        timeout: 5000,
        headers: {
           'Content-type': 'application/json', 
        }
    })

    axiosIntance.interceptors.request.use(
        config => {
            config.headers.Authorization = token
            return config;
        },
        error => {
            console.log(error);
            return Promise.reject(error);
    });

    const {data} = await axiosIntance.get('/api/productos')
    return data.productos
}

let token = '';
let listaProductos = [];
let [producto] = listaProductos;

    
describe('Test de integración productos', () => {
    
    it ( 'Login', async () => {
        token = await login();
        assert.strictEqual(token.length > 0, true)
    } )
    
    it ( 'Crear producto', async () => {
        const {nombre, precio, imagen, cantidad} = [producto];
        assert.strictEqual( nombre != '', true)
        assert.strictEqual( precio <= 0, false )
        assert.strictEqual( imagen != Number, true )
        assert.strictEqual( cantidad != 0, true ) 
    })

    it ( 'Obtener lista de productos', async () => {
        try {
            listaProductos = await produtos(token)
            assert.strictEqual(listaProductos.length > 0, true)   
            assert.strictEqual(listaProductos instanceof Array, true)
            assert.strictEqual(listaProductos.length > 0, true)
        } catch (error) {
            assert.strictEqual( error, undefined) 

        }
    })

    it ( 'Actulizar producto', async () => {
        
    })
    
    it ( 'Borrar producto', async () => {

    })
})