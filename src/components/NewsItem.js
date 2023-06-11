import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, url, author, date, source } =
      this.props;
    return (
      <div className="my-3">
        <div className="card">
          <div style={{display:'flex', justifyContent:'flex-end', position:'absolute', right: '0px' }}>
          <span className="badge rounded-pill bg-danger" style={{left: "85%", zIndex:1}}>
            {source}
          </span>
          </div>
          <img
            src={
              imageUrl
                ? imageUrl
                : "https://www.deccanherald.com/sites/dh/files/articleimages/2023/05/20/modi-pti-1220184-1684528272.jpg"
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {author ? author : "Unknown"} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={url}
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
