import React, { Component } from 'react';
import { Sidebar, Menu, Divider, Button } from 'semantic-ui-react';

class ColorPanel extends Component {
    render() {
        return (
            <Sidebar as={Menu} visible inverted vertical icon="labeled" width="very thin">
                <Divider />
                <Button icon="add" color="blue" size="small" />

            </Sidebar>
        )
    }
}

export default ColorPanel;