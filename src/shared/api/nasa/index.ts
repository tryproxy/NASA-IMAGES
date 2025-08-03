import { CONFIG } from '../../model/config';
import { Http } from '../http';
import NasaClient from './client';
import { nasaStatusCodeHandlers } from './errors';

const api = new Http(CONFIG.API_BASE_URL, nasaStatusCodeHandlers);

export const nasaClient = new NasaClient(api);
