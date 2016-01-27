'use strict';

var React = require('react-native');

var {
  PickerIOS,
  PropTypes,
  View,
  TouchableOpacity,
  Text,
  Modal,
  StyleSheet,
} = React;

var PickerItemIOS = PickerIOS.Item;

var Dropdown = React.createClass({
  getInitialState: function(){
    return {
      selected: this.props.selected ||  0,
      modalVisible: false,
      label: this.props.values[this.props.selected || 0],
    }
  },

  render: function(){
    var _this = this;
    return (
      <View style={{paddingTop: 20}}>
        <TouchableOpacity onPress={this.onPress}>
          <Text style={{height: 40}}>{this.state.label}</Text>
        </TouchableOpacity>
        <Modal
          animated={false}
          transparent={true}
          visible={this.state.modalVisible}>
          <View style={styles.container}>
            <View style={styles.innerContainer}>          
              <PickerIOS
                style={[this.props.style]} 
                selectedValue={this.state.selected}
                onValueChange={this.onChange}>
                {this.props.values.map(function(text, index){
                    return (
                        <PickerItemIOS
                          key={index}
                          value={index}
                          label={text}/>                  
                      );
                    }
                  )
                }
              </PickerIOS>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={this.onOk} style={{flex:1, padding: 10}}>
                  <Text style={{height: 40}} style={{textAlign:'center'}}>Ok</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onCancel} style={{flex:1, padding: 10}}>
                  <Text style={{height: 40}} style={{textAlign:'center'}}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  },

  onChange: function(selected){
    this.setState({selected: selected});
  },

  onPress: function(){
    this.setState({modalVisible: true});
  },

  onOk: function(){
    if(this.props.onChange)
      this.props.onChange({selected:this.state.selected, value: this.props.values[this.state.selected]});

    this.setState({modalVisible: false, label: this.props.values[this.state.selected]});  
  },

  onCancel: function(){
    this.setState({modalVisible: false});  
  }
})

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  innerContainer: {
    borderRadius: 10,
    backgroundColor: '#fff', 
    padding: 20,
    paddingTop: 5,
  },
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
  },
  rowTitle: {
    flex: 1,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 5,
    flex: 1,
    height: 44,
    alignSelf: 'stretch',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 18,
    margin: 5,
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 10,
  },
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