import axios from 'axios';
import { apiUrl } from '@/apiConfig';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = apiUrl

export default axios;
