import React, { Component } from 'react';


export class ShortLinkGenerator extends Component {

    constructor(props) {
        super(props);
        this.state = { LongLink: "", ShortLink: "", Tag: "", Discount: "" };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeLL = this.onChangeLL.bind(this);
        this.onChangeT = this.onChangeT.bind(this);
        this.onChangeD = this.onChangeD.bind(this);
    }

    onChangeLL(e) {
        this.setState({ LongLink: e.target.value });
    }
    onChangeT(e) {
        this.setState({ Tag: e.target.value });
    }
    onChangeD(e) {
        this.setState({ Discount: e.target.value });
    }

    onSubmit = async e => {
        e.preventDefault();
        var longLink = this.state.LongLink;
        var tag = this.state.Tag;
        var discount = this.state.Discount;
        if (!longLink) {
            return;
        }
        console.log(longLink, tag, discount);
        const result = await fetch('/api/sampledata', {
            method: 'POST', body: JSON.stringify({
                LongLink: this.state.LongLink,
                Tag: this.state.Tag,
                Discount: this.state.Discount
            }), headers: { 'content-type': 'application/json' }
        });
        const data = await result.json();
        this.setState({ LongLink: data.longLink, ShortLink: data.shortLink });
    }

    render() {
        const { LongLink, ShortLink, Tag, Discount } = this.state;
        return(
            <div className="formLink">
                <b>Добавление партнера</b>
                <form  onSubmit={this.onSubmit}>
                    <input id="LongLink" type="url" name="LongLink" placeholder="Введите URL-адрес сайта-партнера" value={LongLink} onChange={this.onChangeLL} required /><br/>
                    <input id="Tag" type="text" name="Tag" placeholder="Добавьте теги" value={Tag} onChange={this.onChangeT} required /><br/>
                    <input id="Discount" type="text" placeholder="Укажите размер скидки в %" name="Discount" value={Discount} onChange={this.onChangeD} required /><br/>
                    <button type="submit">Добавить ссылку</button>
                </form>
                {ShortLink ? <b>Ваша короткая ссылка <a href={LongLink}>{ShortLink}</a></b> : null}
            </div>
        );
    }
};