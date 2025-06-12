import { Router } from 'express';

import test from './test.api';

const appV1Apis = Router();

appV1Apis.use('/test', test);

export default appV1Apis;
