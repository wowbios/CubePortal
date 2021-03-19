import React, {Component} from 'react';
import CubeForm from "./CubeForm";

export class Home extends Component {
    static displayName = Home.name;
        
    render() {
        return (
            <div>
                <CubeForm/>
            </div>
        );
    }
}
