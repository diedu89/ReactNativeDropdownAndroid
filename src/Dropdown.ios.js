
var React = require('react-native');
var {
  PickerIOS,
} = React;

var PickerItemIOS = PickerIOS.Item;

var dropdown = React.createClass({
	render: function(){
		return (
			<PickerIOS
				{...this.props} 
        selectedValue={this.props.selected}
        onValueChange={(selected) => this.props.onChange({i:selected})}>
        {this.props.values.map((text, index) => (
          <PickerItemIOS
            value={index}
            label={text}
          />
        ))}
    );
	}
});

module.exports = dropdown;