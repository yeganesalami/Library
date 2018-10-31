import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'

class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Library</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-item nav-link active" href="#">Books <span class="sr-only">(current)</span></a>
                        <a className="nav-item nav-link" href="#">Authors</a>
                        <a className="nav-item nav-link disabled" href="#">Search</a>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;