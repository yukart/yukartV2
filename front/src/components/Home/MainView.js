import React from 'react';
import { connect } from 'react-redux';


const MainView = props => {
  return (
    <div></div>
  );
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  onTabClick: () => dispatch("test")
});
	
export default connect(mapStateToProps, mapDispatchToProps)(MainView);
