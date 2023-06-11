import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country : "in",
    pageSize : 6
  }

  static propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
  }

  capitalizeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props){
    super(props);
    console.log("Constructor from news");
    this.state = {
      articles : [],
      loading : false,
      page:1,
      totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsFair`
  }

  async componentDidMount(){
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5e5bf7439e3747bbaf851cfa846f9311&page=1&pageSize=${this.props.pageSize}`;
    // let data = await fetch(url);
    // this.setState({loading:true});
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   articles:parsedData.articles, 
    //   totalResults:parsedData.totalResults,
    //   loading:false
    // })
    this.updateNews();
  }

  async updateNews(){
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(30);
    this.setState({loading:true});
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles:parsedData.articles, 
      totalResults:parsedData.totalResults,
      loading:false
    });
    this.props.setProgress(100);
  }

  handlePrevClick = async()=>{
    console.log("Previous click");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5e5bf7439e3747bbaf851cfa846f9311&page=${this.state.page - 1}&pageSize=${this.props.pageSize}}`;
    // let data = await fetch(url);
    // this.setState({loading:true});
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   loading:false,
    //   articles:parsedData.articles,
    //   page: this.state.page - 1
    // })
    this.setState({page: this.state.page - 1})
    this.updateNews();
  }

  handleNextClick = async()=>{
    // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
      console.log("Next Click");
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5e5bf7439e3747bbaf851cfa846f9311&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //   let data = await fetch(url);
    //   this.setState({loading:true});
    //   let parsedData = await data.json();
    //   console.log(parsedData);
    //   this.setState({
    //     loading:false,
    //     articles:parsedData.articles,
    //     page: this.state.page + 1
    //   })
    // }
    this.setState({page: this.state.page + 1})
    this.updateNews();
  }

  fetchMoreData = async() => {
    this.setState({page: this.state.page + 1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles:this.state.articles.concat(parsedData.articles), 
      totalResults:parsedData.totalResults
    })
  }

  render() {
    return (
      // <div className='container my-3'>
      <>
        <h1 className="text-center" style={{margin: '35px 0px', marginTop: '90px'}} >NewsFair - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row">
            {/* {!this.state.loading && this.state.articles.map((element)=>{ */}
            {this.state.articles.map((element)=>{
              return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title ? element.title.slice(0,40) : ""} description ={element.description ? element.description.slice(0,88) : ""} imageUrl={element.urlToImage} url={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
            </div>
            })}
          </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Prev</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
    )
  }
}
