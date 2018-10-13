import * as React from 'react'

export class Footer extends React.Component {

    render() {
		const footerStyles = {
			position: 'fixed' as 'fixed',
			left: 0,
			bottom: 0,
			width: '100%',
			height: '5%',
			backgroundColor: 'rgb(103, 133, 193)',
			color: 'white'
		}

        return (
            <div style={footerStyles}>
				<div style={{ verticalAlign: 'middle', paddingTop: '10px', paddingLeft: '10px' }}>
					<small>&copy; 2017 - NTT DATA, Inc. All rights reserved.</small>
				</div>
			</div>
        )
    }
}