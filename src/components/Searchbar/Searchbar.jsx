import React, {Component} from 'react';
import s from './Searchbar.module.css';
import { toast } from 'react-toastify';

export default class Searchbar extends Component{
    state = {
        searchQuery: '',
    }

    handleSearchQueryChange = event => {
        this.setState({
            searchQuery: event.currentTarget.value.toLowerCase()
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        if (this.state.searchQuery.trim() === '') {
            //Setting searchQuery state '' in case query got spaces
            this.setState({
                searchQuery: ''
            })

            return toast.info("Input your search query");
        }

        this.props.onSubmit(this.state.searchQuery);
        
        this.setState({
            searchQuery: ''
        })
    }

    render() {
        const { searchQuery } = this.state;
        const { handleSubmit, handleSearchQueryChange } = this;

        return <header className={s.searchbar}>
            <form className={s.form} onSubmit={handleSubmit}>
                <input
                    className={s.input}
                    type="text"
                    autoComplete="off"
                    name="searchQuery"
                    placeholder="Search images and photos"
                    value={searchQuery}
                    onChange={handleSearchQueryChange}
                />
                
                <button type="submit" className={s.button}>
                    <i className="fa fa-search"></i>
                </button>
            </form>
        </header>
    }
}