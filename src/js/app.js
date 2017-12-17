"use strict";

import React, {Component} from 'react';
import {render} from 'react-dom';
import { setTimeout } from 'timers';

function getData({area, search, next}) {
    return fetch(`/api?area=${area}&search=${search}&next=${next}`).then(res => res.json());
}


class Navibar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    < a className="navbar-brand" href="https://duunitori.fi" target="_blank">Duunitori</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#" >Home <span className="sr-only">(Current)</span></a>
                            </li>
                            <li className="nav-tiem">
                                <a className="nav-link">Mission</a>
                            </li>
                            <li className="nav-tiem">
                                <a className="nav-link">Value</a>
                            </li>
                            <li className="nav-tiem">
                                <a className="nav-link">Reference</a>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>

                </nav>
            </div>
        )
    }
}
class App extends Component {
    constructor() {
        super();
        this.state = {
            rows: [],
            next: 1,
            isLoading: false
        };
        this.searchHandler = this.search.bind(this);
        this.loadMoreHandler = this.loadMore.bind(this);
    }
    loading() {
        this.setState({ isLoading: true });
    }

    search() {
        const area = this.areaInput.value;
        const search = this.searchInput.value;
        getData({ area, search, next: 1 }).then(data => this.setState({ rows: data.jobs, next: 1, isLoading: false }));
        this.loading();
    }
    loadMore() {
        const area = this.areaInput.value;
        const search = this.searchInput.value;
        getData({ area, search, next: this.state.next }).then(data => this.setState({
            rows: this.state.rows.concat(data.jobs),
            next: data.next,
            isLoading: false
        }))
        this.loading();
    }
    render() {
        //console.log(this.state.rows);
        return (
            <div className="text-center">
                <Navibar />
                <div className="form-container">
                    <div className="form-inline">
                        <input className="form-control key"
                            ref={(el) => this.searchInput = el}
                            type="text"
                            size="40"
                            placeholder="Search for..." />
                        <input className="form-control where"
                            ref={(el) => this.areaInput = el}
                            type="text"
                            size="40"
                            placeholder="Where..." />
                        <button
                            disabled=""
                            className="btn btn-success btn-go"
                            onClick={this.searchHandler}>Go!
                    </button>
                    </div>
                </div>

                <div className={this.state.isLoading ? 'loading fa fa-spinner fa-spin' : ''}></div>

                <div className="col-xs-12 col-lg-12">
                    <button
                        disabled=""
                        type="button"
                        className="btn btn-success btn-next"
                        onClick={this.loadMoreHandler}>More
                    </button>
                </div>
                <div className="col-xs-12 col-lg-12 table-responsive results">
                    <table className="table-striped table-result">
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
    <App />, document.getElementById('app'));