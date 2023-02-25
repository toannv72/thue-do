import * as httpRequest from '~/utils/httpRequest';

export const search = async (q, type = 'less') => {
    try { 
        const res = await httpRequest.get('products/', {
            params: {
                q,
                type,
            },
        });

        return res.data;
    } catch (error) {
        console.log(error);
    }
};
