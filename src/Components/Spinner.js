import React, { Component } from 'react'

export default class Spinner extends Component {
  render() {
    return (
      <div>
         <div className='spin'><i className="fa fa-refresh Loader" aria-hidden="true"></i></div>
      </div>
    )
  }
}
