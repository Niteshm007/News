import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFL = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
      hasMore:true
    };
    document.title = `${this.capitalizeFL(this.props.category)} - NewsMonkey`;
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=111768e1e8e24b58812f504155b17c8d&page=${this.state.page}1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedata = await data.json();
    console.log(parsedata);
    this.setState({
      articles: parsedata.articles,
      totalResults: parsedata.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=111768e1e8e24b58812f504155b17c8d&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedata = await data.json();
    console.log(parsedata);
    this.setState({
      articles: parsedata.articles,
      totalResults: parsedata.totalResults,
      loading: false,
    });
  }

  
  fetchMoreData = async () => {
    const nextPage = this.state.page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=111768e1e8e24b58812f504155b17c8d&page=${nextPage}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedata = await data.json();

    this.setState((prevState) => ({
      articles: prevState.articles.concat(parsedata.articles),
      page: nextPage,
      hasMore: nextPage <= Math.ceil(parsedata.totalResults / this.props.pageSize),
    }));
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: "35px 0px" }}>
          NewsMonkey - Top {this.capitalizeFL(this.props.category)} Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll style={{overflow:'hidden'}}
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row">
            {this.state.articles?.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                      ? element.description.slice(0, 75)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;

{/* <div className="container d-flex justify-content-between">
  <button
  disabled={this.state.page <= 1}
    type="button"
    className="btn btn-dark"
    onClick={this.handlePrevClick}
    >
    &larr; Previous
    </button>
    <button
    disabled={
      this.state.page + 1 >
      Math.ceil(this.state.totalResults / this.props.pageSize)
    }
    type="button"
    className="btn btn-dark"
    onClick={this.handleNextClick}
  >
  Next &rarr;
  </button>
</div> */}
    // handlePrevClick = async () => {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${
    //     this.props.country
    //   }&category=${
    //     this.props.category
    //   }&apiKey=111768e1e8e24b58812f504155b17c8d&page=${
    //     this.state.page - 1
    //   }&pageSize=${this.props.pageSize}`;
    //   this.setState({ loading: true });
    //   let data = await fetch(url);
    //   let parsedata = await data.json();
    //   console.log(parsedata);
    //   this.setState({
    //     page: this.state.page - 1,
    //     articles: parsedata.articles,
    //     loading: false,
    //   });
    // };
  
    // handleNextClick = async () => {
    //   if (
    //     !(
    //       this.state.page + 1 >
    //       Math.ceil(this.state.totalResults / this.props.pageSize)
    //     )
    //   ) {
    //     let url = `https://newsapi.org/v2/top-headlines?country=${
    //       this.props.country
    //     }&category=${
    //       this.props.category
    //     }&apiKey=111768e1e8e24b58812f504155b17c8d&page=${
    //       this.state.page + 1
    //     }&pageSize=${this.props.pageSize}`;
    //     this.setState({ loading: true });
    //     let data = await fetch(url);
    //     let parsedata = await data.json();
    //     this.setState({
    //       page: this.state.page + 1,
    //       articles: parsedata.articles,
    //       loading: false,
    //     });
    //   }
    // };