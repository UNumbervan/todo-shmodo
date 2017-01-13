import {browserHistory} from 'react-router';
import queryString from 'query-string';


export function redirectToPath(path) {
    const {search} = window.location;
    changeUrl(path, search);
};

export function setQueryParams(params) {
    const {pathname} = window.location;
    const search = queryString.stringify(params);
    changeUrl(pathname, (search ? `?${search}` : ''));
}

function changeUrl(path, search) {
    browserHistory.push(path + search);
}