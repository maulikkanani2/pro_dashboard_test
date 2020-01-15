import React from 'react';

import { uploadTypes } from '../../utils/import'


export default class ImportTypeChoose extends React.Component{

    selectType = (type) => {
        return (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.props.changeType(type);
        };
    }


    renderType = (type, i) => {
        return (
            <span className="menu__item" key={i}>
                <a href="" onClick={ this.selectType(type) } className={this.props.selected === type.key? "selected" : null} key={ type.id }>
                    <span className="image" key={ type.id }>
                        { type.icon() }
                    </span>
                    <span className="menu__name">{ type.name }</span>
                </a>
            </span>
        );
    }

    render(){
        return (
            <div className="import-menu">
                <nav className="menu">
                    { uploadTypes.map(this.renderType) }
                </nav>
            </div>
        );
    }
}
