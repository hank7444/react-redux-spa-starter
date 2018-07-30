import waterfall from 'promise-waterfall';

import ApiClient from './ApiClient';

export default function PromiseObject(action) {
    const { promises, promiseType, success = ()=>{}, fail = ()=>{} } = action;
    const apiClient = new ApiClient(promiseType == "waterfall");
    let finalPromise = null;
    switch (promiseType) {
        case 'all':
            finalPromise = Promise.all(promises.map((promiseObj) => {
                return promiseObj(apiClient);
            }));
            break;

        case 'race':
            finalPromise = Promise.race(promises.map((promiseObj) => {
                return promiseObj(apiClient);
            }));
            break;

        case 'waterfall':
            finalPromise = waterfall(promises.map((promiseObj) => {
                return (res = null) => {
                    return promiseObj(apiClient, res);
                };
            }));
            break;

        default:
            finalPromise = promises(apiClient);
            break;
    }

    return finalPromise.then(
        (result) => {
            //[json,json,json]
            success(result);
        },
        (error) => {
            //error.status = 401
            fail(error);
        }
    ).catch((error) => {
        console.error('[XXX] PromiseObject error has occurred!', error);
    });
}
