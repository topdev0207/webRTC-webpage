import React from 'react';
import NavigatorBar from './NavigatorBar';

class App extends React.Component {
	render(){
	return (
		<div className="container">
			<NavigatorBar />
			{this.props.children}
		</div>
		);
	}
}

export default App;