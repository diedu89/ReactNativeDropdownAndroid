
var React = require('react-native');
var {
  PickerIOS,
} = React;

var PickerItemIOS = PickerIOS.Item;

var Dropdown = React.createClass({
	render: function(){
		return (
			<PickerIOS
				{...this.props} 
        selectedValue={this.props.selected}
        onValueChange={(selected) => this.props.onChange({selected:selected, value: this.props.value[selected]})}>
        {this.props.values.map((text, index) => (
          <PickerItemIOS
            value={index}
            label={text}
          />
        ))}
    );
	}
});

Dropdown.propTypes = {
  ...View.propTypes,
  values: PropTypes.array.isRequired,
  selected: PropTypes.number,
  onChange: PropTypes.func
};

Dropdown.defaultProps = {
  values: [ '' ],
  selected: 0
}


module.exports = Dropdown;