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
                <div className="list">
                    <b>Список наших партнеров:</b>
                    <ul>
                        {links.map(link =>
                            <li key={link.id}>
                                <a href={link.longLink + "?discount=" + link.discount + "%"}>{link.shortLink}</a> <br /> <b>Ключевые фразы: {link.tag}</b> <br /> <b>Скидка: {link.discount} %</b>
                            </li>
                        )}
                    </ul>
                </div>
            )
        )
    }
}