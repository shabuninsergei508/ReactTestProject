import React, { Component } from 'react';

class ResultItem extends React.Component {
    render() {
       
        return <li>
            <a href={this.props.longLink + "?discount=" + this.props.discount + "%"}>{this.props.shortLink}</a>
        </li>;
    }
}

class ResultItemsList extends React.Component {
    render() {

        if (this.props.data.length == 0) {
            return (<div></div>);
        }

        return (
            false && this.props.data.length == 0
                ? "loading..."
                : (
                    <div>
                        <h2>Результат</h2>
                        <ul>
                            {
                                this.props.data.map(function (item) {
                                    return <ResultItem key={item.id} shortLink={item.shortLink} longLink={item.longLink} discount={item.discount} />
                                })
                            }
                        </ul>
                    </div>
                )
        );
    }
}

export class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = { SearchTag:"", LinksList:[] };

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onChange(e) {
        var val = e.target.value;
        this.setState({ SearchTag: val });
    }

    handleSubmit =  e => {
        e.preventDefault();
        var searchTag = this.state.SearchTag;
        
        fetch('/api/search', {
            method: 'POST', body: JSON.stringify({

                SearchTag: this.state.SearchTag,

            }), headers: { 'content-type': 'application/json' }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ LinksList: data });
            });
    }

    render() {
        return (
            <div className="formLink">
                <form onSubmit={this.handleSubmit}>
                    <p>
                        <label>Введите тег для поиска:</label><br />
                        <input type="text" value={this.state.SearchTag} onChange={this.onChange} />
                    </p>
                    <input type="submit" value="Отправить" />
                </form>

                

                <ResultItemsList data={this.state.LinksList.map(function (v, i, a) { return v })} />

            </div>
        );
    }
}
