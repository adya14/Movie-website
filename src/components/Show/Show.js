import React, { Component } from 'react';
import './Show.css';

class Show extends Component {
  state = {
    show: null,
    title: '',
    loading: true,
    description: '',
    image: null,
    genres: null,
    rating: '',
  };

  componentDidMount() {
    const { showId } = this.props.match.params;
    let showEndpoint = `https://api.tvmaze.com/shows/${showId}`;
    this.fetchItems(showEndpoint);
  }

  fetchItems = async (showEndpoint) => {
    try {
      const result = await (await fetch(showEndpoint)).json();
      const cleanText = result.summary.replace(/<\/?[^>]+(>|$)/g, '');

      this.setState({
        loading: false,
        show: result,
        description: cleanText,
        image: result.image,
        title: result.name,
        genres: result.genres,
        rating: result.rating.average,
      });
    } catch (error) {
      console.log('Shows API error: ', error);
    }
  };

  render() {
    const { show, description, image, title, genres, rating } = this.state;

    return (
      <div>
        {show ? (
          <div>
            <div
              className="showInfo"
              style={{
                background: image
                  ? `linear-gradient(to bottom, rgba(0,0,0,0)
                39%,rgba(0,0,0,0)
                41%,rgba(0,0,0,0.65)
                100%),
                url('${image.original}'), #1c1c1c`
                  : '#000',
              }}
            >
              <div className="showInfo-content">
                <div className="showInfo-image">
                  <img src={image ? image.medium : './images/no_image.jpg'} alt="ShowThumb" />
                </div>

                <div className="showInfo-text">
                  <div className="show-rating">
                    <h1>{title}</h1>
                    <h1>{rating}</h1>
                  </div>

                  <p className="show-genres">{genres[0]} {genres[1]} {genres[2]}</p>
                  <p>{description}</p>
                  <a href="https://forms.gle/iXzZFDgVm1KApxJ68" target="_blank" rel="noopener noreferrer">
                    <div className="show-watch-btn">Book Movie Ticket</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    );
  }
}

export default Show;
