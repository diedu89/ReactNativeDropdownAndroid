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
  TouchableWithoutFeedback,
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

  componentWillReceiveProps: function(props){
    this.setState({label: props.values[props.selected || 0]});
  },

  render: function(){
    var _this = this;
    return (
      <View style={{}}>
        <TouchableOpacity onPress={this.onPress}>
          <Text style={[this.props.style]}>{this.state.label}</Text>
        </TouchableOpacity>
        <Modal
          animated={true}
          transparent={true}
          visible={this.state.modalVisible}>
          <View style={styles.container}>
            <TouchableWithoutFeedback onPress={this.onCancel}>
              <View style={{flex:1}}></View>
            </TouchableWithoutFeedback>
            <View style={{justifyContent: 'flex-end', flexDirection: 'row', backgroundColor: '#F0F1F2'}}>
              <TouchableOpacity 
                  style={{padding: 13}}
                  onPress={this.onOk}>
                  <Text style={{color: '#0075FC',fontWeight:'bold'}}>Ok</Text>
                </TouchableOpacity>
            </View>    
            <View style={styles.innerContainer}>   
              <PickerIOS
                style={{}} 
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
    backgroundColor: 'transparent',
  },
  innerContainer: {
    backgroundColor: '#D1D5DA',
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