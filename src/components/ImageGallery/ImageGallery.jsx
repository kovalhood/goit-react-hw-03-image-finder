import React, { Component } from 'react';
import Container from 'components/Container';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Loader from 'components/Loader';
import Button from 'components/Button';
import { fetchImages } from 'services/images-api';
import s from './ImageGallery.module.css';
import { toast } from 'react-toastify';

export default class ImageGallery extends Component{
    state = {
        images: [],
        page: 1,
        totalHits: 1,
        imagesPerPage: 12,
        status: 'idle'
    }

    handleLoadMore = () => {
        this.setState(prevState => ({
            page: prevState.page + 1
        }));
    }

    componentDidUpdate(prevProps, prevState) {
        const { searchQuery } = this.props;
        const { page, imagesPerPage, totalHits  } = this.state;

        if (prevProps.searchQuery !== this.props.searchQuery) {
            this.setState({
                totalHits: 1,
                page: 1,
                images: [],
                status: 'pending'
            })
            
            fetchImages(searchQuery, page === 1)
            .then(images => {
                if (images.totalHits > 0) {
                    toast.success(`Hooray! We found ${images.totalHits} images of ${searchQuery}.`);

                    this.setState(({
                        totalHits: images.totalHits,
                        images: images.hits,
                        status: 'resolved'
                    }));
                }
                
                else {
                    this.setState({
                        status: 'rejected'
                    })
                    return toast.error("Sorry, there are no images matching your search query. Please try again.");
                }
            })
    
            return;
        }

        else if (prevState.page < page) {
            this.setState({
                status: 'pending'
            })
            
            fetchImages(searchQuery, page)
            .then(images => {
                if (images.totalHits > 0) {
                    this.setState(prevState => ({
                        images: [...prevState.images, ...images.hits],
                        status: 'resolved'
                    }));

                    if (totalHits - this.state.images.length < imagesPerPage || this.state.images.length > totalHits) {
                        return toast.info("We're sorry, but you've reached the end of search results.");
                    }
                }
                
                else {
                    this.setState({
                        status: 'rejected'
                    })
                    return toast.error("Sorry, there are no images matching your search query. Please try again.");
                }
            })
        }
    }

    render() {
        const { images, status, totalHits } = this.state;
        const { handleLoadMore } = this;
        const { onModalOpen } = this.props;
        
        if (status === 'pending') {
            return <Container>
                <ul className={s.gallery}>
                    <ImageGalleryItem data={images} openModal={onModalOpen} />
                </ul>
                <Loader/>
            </Container>
        }

        if (images.length === totalHits || images.length > totalHits) {
            return <Container>
                <ul className={s.gallery}>
                    <ImageGalleryItem data={images} openModal={onModalOpen} />
                </ul>
            </Container>
        }

        if (status === 'resolved') {
            return <Container>
                <ul className={s.gallery}>
                    <ImageGalleryItem data={images} openModal={onModalOpen} />
                </ul>
                <Button text={'Load more'} buttonClick={handleLoadMore}/>
            </Container>
        }
    }
}