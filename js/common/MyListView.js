import React, { Component } from 'react';
import {
  ListView,
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
  RefreshControl,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated
} from 'react-native'

import _ from 'lodash';
import ListItem from './ListItem';

import Tool from '../util/Tool';

const {width, height} = Dimensions.get('window');
const ITEMHEIGHT = 110;
export default class MyListView extends React.Component {

  constructor(props, context) {
    super(props, context);
    this._data = [];
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.page=1;

    this.state = {
     
      dataSource: this.ds.cloneWithRows(this._data),
      isShowLoadIcon: true,
      footerText:"正在加载...",
      httpError:false,
      isRefreshing:false,
      showTop:false,
      retunrTopPosition:-35,
      isFirst:true,
      noDate:false
    };
    this._renderFooter = this._renderFooter.bind(this);
  }
  componentDidMount(){
    
     this.getData();
      
  }

componentWillReceiveProps(nextProps){

 if(this.props.url!=nextProps.url){
    //this.getData();
  this._data = [];
  this.setState ({
      dataSource:this.ds.cloneWithRows(this._data),
   
      footerText:"正在加载...",
   
      isRefreshing:false,
      isFirst:true,
      noDate:false,
      httpError:false
    });
    this.page=1;
     
 }
  
}
componentDidUpdate(prevProps, prevState){
  
      if(prevProps.url!=this.props.url){
      //  alert(this.props.url);
      
        this.getData();
       
      }
}

componentWillUnmount(){
 
    this.cancelable.cancel();
}
  _onScroll(event){
  let scrollView = event.nativeEvent;
  let y = scrollView.contentOffset.y;

     this.setState({
       retunrTopPosition:y>height?25:-35
     }) 
   

  }

  /*returnTop(){
   return(<TouchableOpacity
          onPress={() => {
            //this._flatList.scrollToEnd();
           this.listView.scrollTo({y:0,animated:true})
          }}

          style={{ position: 'absolute', right: 10, bottom: this.state.retunrTopPosition, zIndex: 9999 }}
        >
          <Image style={{ tintColor: '#bbb', height: 32, width: 42 }} source={require('../images/toTop.png')} />
        </TouchableOpacity>)
  }*/
  render() {
 
    return (
     <View style={{flex:1}}>
     
     {/*//  {this.returnTop()} */}
        <ListView
          ref={(listView)=>this.listView=listView}
          initialListSize={8}
        
          onScroll={ _.debounce(this._onScroll.bind(this),500,{
        'leading': true,
        'trailing': false
         })}
          dataSource={this.state.dataSource}
          {...this.props}
          renderRow={this._renderRow.bind(this)}
          onEndReachedThreshold={ITEMHEIGHT * 2}
          onEndReached={this._onEndReached.bind(this)}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
              tintColor="#ff0000"
              title="Loading..."
              titleColor="#00ff00"
              colors={['#e64275']}
              progressBackgroundColor="#fff"
            />}
          style={styles.container}
          pageSize={3}
          enableEmptySections={true}
          renderFooter={() =>this._renderFooter()}
          renderSeparator={(sectionID, rowID, adjacentRowHighlighted) =>this._renderSeparator()}
        />
    </View> 
    );
  }
  getData() {
  
    if(!this.state.noDate){
        
       this.cancelable=Tool.makeCancelable(fetch(this.props.url+'&pageno='+this.page++));
     
 
       this.cancelable.promise.then((response) => response.json())
      .then((responseJson) => {
     
        //responseJson.maxpage
         if(responseJson.result=="fail"){
           return  this.setState({
              dataSource: this.ds.cloneWithRows(this._data),
              
              isFirst: false,
           
              noDate:true,
              footerText:"没有更多数据",
            });
           
         }
            
               
          this._data = this._data.concat(responseJson.data);
          this.setState({
              dataSource: this.ds.cloneWithRows(this._data),
              
              isFirst: false,
           
              noDate:responseJson.maxpage<this.page?true:false,
              footerText: responseJson.maxpage<this.page?"没有更多数据":"正在加载...",
            });
   
         
        


      })
      .catch((error) => {
      console.log(error);
        // reject(error)
         this._data = [];
          this.setState({
              dataSource: this.ds.cloneWithRows(this._data),
              isFirst: false,
              noDate:true,
              footerText:"网络加载失败，请稍后重试...",
              httpError:true
            });
      });
   }
  }
  
  _renderSeparator (sectionID, rowID, adjacentRowHighlighted){
     return <View style={{ height: 1, backgroundColor: '#eeeeee' }} key={new Date()} />;
  }
  _renderFooter() {
    return <View style={{ paddingVertical: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
        <Text style={{fontSize:15}}>{this.state.footerText}</Text>
      </View>;

  }
  _onEndReached() {
   
 

    if (!this.state.noDate&&!this.state.isFirst) {
      console.log("到底执行" + this.page);
      this.getData();
     
    }
 }
 _onRefresh() {
    this.setState({isRefreshing: true});
    setTimeout(() => {
      // prepend 10 items
     this.setState({
      
        isRefreshing: false,
      
      });
    }, 500);
  }
  _renderRow(item) {
 //  alert(JSON.stringify(item));
     // return (<Text>{item.infoTitle}</Text>)

     return <ListItem itemHeight={ITEMHEIGHT}    navigation={this.props.navigation} item={item} />
  }
  // _renderRow_2(item){
  //   return(
  //     <ListItemShop itemHeight={ITEMHEIGHT} item={item} />
  //   )
  // }

}

let styles = StyleSheet.create({
  container: {
    flex: 1,

  
  
    flexDirection: 'column',
    backgroundColor: "#eeeeee",


  },
  button: {
    padding: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
  },
  row: {
    padding: 4,
  },
});