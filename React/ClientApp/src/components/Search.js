import React, { Component } from 'react';

export class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { tags: [], loading: true };

        fetch('api/search')
            .then(response => response.json())
            .then(data => {
                this.setState({ tags: data, loading: false });
            });
        
    }

    onSubmit = async e => {
        e.preventDefault();
        
        var tag = this.state.Tag;
       
        const result = await fetch('/api/search', {
            method: 'POST', body: JSON.stringify({
                Tag: this.state.Tag,
            }), headers: { 'content-type': 'application/json' }
        });
        const data = await result.json();
        this.setState({ Tag: data.tag });
    }


    render() {
        const { tags, loading } = this.state;

        return (

            loading ? "loading..." : (
                <div className="list">
                    <b>Ищите партнеров по тегам:</b>
                    <ul>
                        {tags.map(tag =>
                            <li key={tag}>
                                <b>{tag}</b>  
                            </li>
                        )}
                    </ul>
                </div>
                
            )
        )
    }
}