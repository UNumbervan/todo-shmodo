import handleTransitions from 'redux-history-transitions';
import {redirectToPath} from './../redirect';
import {browserHistory} from 'react-router';

export function directoryDeletionRedirect() {
    let currentCategory;

    browserHistory.listen((location) => {
        const match = location.pathname.match(/category\/(\w+)/);
        currentCategory = match && match[1];
    });

    return handleTransitions(browserHistory, (prevState, nextState, {type}) => {
        if (type === 'CATEGORY_DELETE' && currentCategory) {
            const category = nextState.categories.present.find(cat => {
                return cat.id === currentCategory;
            });

            if (!category) {
                redirectToPath('/');
            }
        }
    });
}



