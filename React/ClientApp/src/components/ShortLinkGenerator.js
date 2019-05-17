import React, { Component } from 'react';


export class ShortLinkGenerator extends Component {

    constructor(props) {
        super(props);
        this.state = { LongLink: "", ShortLink: "" };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({ LongLink: e.target.value });
    }

    onSubmit = async e => {
        e.preventDefault();
        var longLink = this.state.LongLink;
        if (!longLink) {
            return;
        }
        console.log(longLink);
        const result = await fetch('/api/sampledata', {
            method: 'POST', body: JSON.stringify({
                LongLink: this.state.LongLink
            }), headers: { 'content-type': 'application/json' }
        });
        const data = await result.json();
        this.setState({ LongLink: data.longLink, ShortLink: data.shortLink });
    }

    render() {
        const { LongLink, ShortLink } = this.state;
        return(
            <div className="formLink">
                <b>Добавление новой ссылки</b>
                <form onSubmit={this.onSubmit}>
                    <input id="LongLink" type="url" name="LongLink" value={LongLink} onChange={this.onChange} required />
                    <button type="submit">Добавить ссылку</button>
                </form>
                {ShortLink ? <b>Новая ссылка <a href={LongLink}>{ShortLink}</a></b> : null}
            </div>
        );
    }
};