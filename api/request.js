import axios from 'axios'

export function getWeather(address){
    return axios.get('https://qqlykm.cn/api/api/tq.php?city=' + address)
}