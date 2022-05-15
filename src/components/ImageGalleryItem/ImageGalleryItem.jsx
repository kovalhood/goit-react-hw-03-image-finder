import React, {Component} from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component{
    render() {
        const { data, openModal } = this.props;

        return data.map(({ id, webformatURL, largeImageURL,  tags }) => (
            <li className={s.item} key={id} onClick={()=>openModal(({ largeImageURL, tags }))}>
                <img src={webformatURL} className={s.image} alt={tags} loading="lazy"/>
            </li> 
        ))
    }
}

ImageGalleryItem.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};