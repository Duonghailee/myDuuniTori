"use strict";

import React, {Component} from 'react';
import {render} from 'react-dom';
import { setTimeout } from 'timers';

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
        this.searchHandler = this
            .search
            .bind(this);
        this.loadMoreHandler = this
            .loadMore
            .bind(this);
    }
    loading() {
        setTimeout(() => {
            $('.fa').removeClass('fa-spinner');
        },1000);
    }

    search() {
        $('.fa').addClass('fa-spinner');
        const area = this.areaInput.value;
        const search = this.searchInput.value;
        getData({area, search, next: 1}).then(data => this.setState({rows: data.jobs, next: 1}));
        this.loading();
        

    }
    loadMore() {
        $('.fa').addClass('fa-spinner');
        const area = this.areaInput.value;
        const search = this.searchInput.value;
        getData({area, search, next: this.state.next}).then(data => this.setState({
            rows: this
                .state
                .rows
                .concat(data.jobs),
            next: data.next
        }))
        this.loading();
    }
    render() {
        //console.log(this.state.rows);
        return (
            <div>
                <div className="search-form">
                    <div className="key ">
                        <input
                            ref={(el) => this.searchInput = el}
                            type="text"
                            className="form-control"
                            size="40"
                            placeholder="Search for..."/>
                    </div>

                    <div className="where">
                        <input
                            ref={(el) => this.areaInput = el}
                            type="text"
                            className="form-control"
                            size="40"
                            placeholder="Where..."/>
                    </div>

                    <button
                        disabled=""
                        type="button"
                        className="btn btn-success btn-go"
                        onClick={this.searchHandler}>Go!
                    </button>
                    
                </div>

                <i className="fa fa-pulse fa-3x fa-fw"></i>
                    <span className="sr-only">Loading...</span>

                <div className="col-xs-12 col-lg-12">
                    <button
                        disabled=""
                        type="button"
                        className="btn btn-success btn-next"
                        onClick={this.loadMoreHandler}>More
                    </button>
                </div>

                <div id="loading"></div>∫

                <div className="col-xs-12 col-lg-12 table-responsive results">
                    <table className="table-striped">
                        <thead>
                            <tr>
                                <th>Job Title</th>
                                <th>Company</th>
                                <th>Date posted</th>
                            </tr>
                        </thead>
                        <tbody>
                           
                            {this
                                .state.rows.map((row, index) => (
                                    <tr key={row.jobTitle + index}>
                                        <td className="job-title">
                                            <a href={"https://duunitori.fi/tyopaikat/tyo/" + row.jobLink} target="_blank">{row.jobTitle}</a>
                                        </td>
                                        <td>{row.company}</td>
                                        <td>{row.datePosted}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>

        );
    }
}

render(
    <App/>, document.getElementById('app'));