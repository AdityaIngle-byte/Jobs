import axios from 'axios';
import { uatDomain } from './networkConstants';

const AxiosBase = axios.create({
    baseURL: uatDomain
})

export default AxiosBase;



