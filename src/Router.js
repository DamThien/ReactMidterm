import Admin from './Components/Admin'
import List from './component/List';
import React from 'react';
const routes = [{
    path: '/',
    exact: true,
    main: () => <List />
},
{
    path: 'add',
    exact: true,
    main: ({ history }) => <Admin history={history} />
},
{

    path: '/products/:id/edit',
    exact: true,
    main: ({ history, match }) => <Admin match={match} history={history} />
}
];
export default routes;