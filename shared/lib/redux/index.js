
import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import ThemesData from 'components/data/themes-list-fetcher';
import themesReducer from 'lib/themes/reducers';

const createStoreWithMiddleware = applyMiddleware(
	thunk
)( createStore );

export function renderWithRedux() {
	const reducer = combineReducers( {
		themes: themesReducer,
	} );
	const store = createStoreWithMiddleware( reducer );

	window.reduxStore = store;
	console.log( store.getState() );

	return React.render(
		<Provider store={ store }>
			{ () =>
				<ThemesData>
					<Foo />
				</ThemesData>
			}
		</Provider>,
		document.getElementById( 'wpcom' )
	);
}

class Foo extends React.Component {
	render() {
		console.log( 'foo', this.props );
		return (
			<div>
				<button className="button" onClick={ this.props.fetchNextPage }>
					Fetch!
				</button>

				<p>{ /*JSON.stringify( this.props )*/ }</p>
			</div>
		);
	}
}
