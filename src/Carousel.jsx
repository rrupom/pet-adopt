import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleIndexClick = (e) => {
    console.log(e.target.dataset);
    this.setState({
      active: +e.target.dataset.index,
    });
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;

    return (
      <div className="carousel">
        <img src={images[active]} alt="animal hero" />
        <div className="carousel-smaller">
          {images.map((photo, index) => {
            return (
              <img
                src={photo}
                alt="animal thumbnail"
                data-index={index}
                key={photo}
                className={index === active ? "active" : ""}
                onClick={(e) => this.handleIndexClick(e)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Carousel;
