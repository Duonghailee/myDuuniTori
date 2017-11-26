"use strict";

import React, {Component} from 'react';
import {render} from 'react-dom';

function getData({area, search, next}) {
    return fetch(`/api?area=${area}&search=${search}&next=${next}`).then(res => res.json());

}



class App extends Component {
    constructor() {
        super();
        this.state = {
            rows: [],
            next: 1
        };
        this.searchHandler = this.search.bind(this);
        this.loadMoreHandler = this.loadMore.bind(this);
    }

   

    search() {
        const area = this.areaInput.value;
        const search = this.searchInput.value;
        getData({area, search, next:1}).then(data => this.setState({rows: data.jobs, next: 1}))
    }
    loadMore() {
        const area = this.areaInput.value;
        const search = this.searchInput.value;
        getData({area, search, next: this.state.next}).then(data => this.setState({
            rows: this.state.rows.concat(data.jobs), 
            next: data.next
        }))
    }
    render() {
        //console.log(this.state.rows);
        return (
            <div id="search-form">
                <label>Enter entry you want to search for
                </label>
                <div className="row">
                    <div className="col-xs-12 col-lg-6">
                        <input
                            ref={(el) => this.searchInput = el}
                            type="text"
                            className="form-control key"
                            size="40"
                            placeholder="Search for..."/>
                    </div>

                    <div className="col-xs-12 col-lg-4">
                        <input
                            ref={(el) => this.areaInput = el}
                            type="text"
                            className="form-control where"
                            size="40"
                            placeholder="Where..."/>
                    </div>
                    <div className="col-xs-12 col-lg-2">
                        <div className="col-xs-12 col-lg-8">
                            <button type="button" className="btn btn-default btn-go" onClick={this.searchHandler}>Go!</button>
                        </div>
                    </div>
                    <button type="button" className="btn btn-success btn-next" onClick={this.loadMoreHandler}>More</button>
                    <div className="results">
                        <table>
                            <tbody>
                                {this
                                    .state
                                    .rows
                                    .map((row, index) => (
                                        <tr key={row.jobTitle + index}>
                                            <td>{row.jobTitle}</td>
                                            <td>{row.company}</td>
                                            <td>{row.datePosted}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}


render(
    <App/>, document.getElementById('app'));