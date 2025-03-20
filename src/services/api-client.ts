import axios from "axios";

export default axios.create({
    baseURL:'https://api.rawg.io/api',
    params:{
        key: '2fdbc4b0ec0b4e7795180e7df1dc6c81'
    }
})

