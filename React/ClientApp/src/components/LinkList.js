import React, { Component } from 'react';

export class LinkList extends Component {
    constructor(props) {
        super(props);
        this.state = { links: [], loading: true };

        fetch('api/SampleData')
            .then(response => response.json())
            .then(data => {
                this.setState({ links: data, loading: false });
                console.log(data);
            });
        
    }
    render() {
        const { links, loading } = this.state;
        return (
            loading ? "loading..." : (
                <div>
                    <b>Список коротких ссылок</b>
                    <ul>
                        { links.map(link=> <li key={link.id}><a href={link.longLink}>{link.shortLink}</a></li> )}
                    </ul>
                </div>
            )
        )
    }
}