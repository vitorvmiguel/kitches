import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findDOMNode } from 'react-dom';
import { postDish, deleteDish, getDishes } from '../actions/dishesActions'

class DishForm extends Component {
  constructor(props) {
     super(props);
     this.handleSubmit = this.handleSubmit.bind(this);
     this.handleDelete = this.handleDelete.bind(this);
     this.props.getDishes();
  } 

  static contextTypes = {
    router: PropTypes.object
  };

  handleSubmit(e) {
    e.preventDefault();
    const dish = {
      dishName: findDOMNode(this.refs.name).value,
      imageUrl: findDOMNode(this.refs.image).value,
      availablePortions: findDOMNode(this.refs.portions).value,
      price: findDOMNode(this.refs.price).value,
      description: findDOMNode(this.refs.description).value,
      chefId: "1"
    }
    this.props.postDish(dish);

    this.handleRedirect();
  }
  handleDelete(e) {
    e.preventDefault();
    let id = findDOMNode(this.refs.delete).value;
    this.props.deleteDish(id);

    this.handleRedirect();
  }
  handleRedirect() {
    this.context.router.push('/');
  }
  render() {
    const dishList = this.props.dishes.map(function(dish){
      return (<option key={dish.id}>{dish.id}</option>)
    })

    let portions = [];
    for (var i = 1; i < 51; i++){
      portions.push(<option key={i}>{i}</option>);
    }
    return(
      <div className="row">
        <div className="col-sm-6">
          <div className="well">
            <h4>Add a New Dish</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input required className="form-control" id="name" ref="name" placeholder="Dish Name"/>
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <div className="input-group">
                  <div className="input-group-addon">€</div>
                  <input required className="form-control" id="price" ref="price" placeholder="Dish Price"/>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="portions">Portions</label>
                <select required className="form-control" id="portions" ref="portions">
                  {portions}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea required className="form-control" rows="3" id="description" ref="description" placeholder="Dish Description"></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="image">Picture Url</label>
                <input required className="form-control" id="image" ref="image" placeholder="Dish Image Url"/>
              </div>
              <button 
                type="submit" 
                className="btn btn-warning"
                onClick={this.handleSubmit}>Submit</button>
            </form>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="well">
            <h4>Delete a Dish</h4>
            <form>
              <div className="form-group">
                <label htmlFor="delete">Select a Dish</label>
                <select required className="form-control" id="delete" ref="delete">
                  {dishList}
                </select>
              </div>
              <button 
                type="submit" 
                className="btn btn-warning"
                onClick={this.handleDelete}>Delete</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    dishes: state.dishes.dishes
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(
    {
      postDish: postDish,
      deleteDish: deleteDish,
      getDishes: getDishes
    },dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DishForm);