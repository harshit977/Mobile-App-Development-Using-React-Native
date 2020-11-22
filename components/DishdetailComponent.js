import React, {Component} from 'react';
import { Text, View,ScrollView,FlatList,Modal,StyleSheet ,TextInput,TouchableOpacity,Alert,PanResponder} from 'react-native';
import { Card, Icon ,Rating,AirbnbRating} from 'react-native-elements';
import {connect } from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';
import {postComment} from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments:state.comments,
        favorites:state.favorites
    }
}
const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})

function RenderDish(props) {

    const dish = props.dish;

    const recogniseDragLeft = ({moveX,moveY,dx,dy}) => {
        if(dx < -200)   //right to left direction(distance travelled)
             return true;
        else
             return false;
    };
    const recogniseDragRight = ({moveX,moveY,dx,dy}) => {
        if(dx > 200)    //left to right direction(distance travelled)
           return true;
        else
           return false;
    };

    const panResponder=PanResponder.create({
         onStartShouldSetPanResponder: (e,gestureState) => {
             return true;
         },
         onPanResponderEnd: (e,gestureState) => {
             if (recogniseDragLeft(gestureState))
              {
                  Alert.alert(
                      'Add to favorites?',
                      'Are you sure you wish to add '+dish.name+' to your favorites?',
                      [
                         {
                              text: 'Cancel',
                              onPress: ()=> console.log('Cancel is pressed'),
                              style: 'cancel'
                         },
                         {
                              text: 'Ok',
                              onPress: () => {props.favorite ? console.log('Already Favorite'): props.onPress()}
                         }
                      ],
                      {cancelable: false}
                      )
              }
              else if (recogniseDragRight(gestureState))
              {
                   props.onClick();
              }
              return true;
         }
         
    });
    
        if (dish != null) {
            return(
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
                 {...panResponder.panHandlers}>
                <Card
                featuredTitle={dish.name}
                image={{uri: baseUrl+ dish.image}}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <View style={{flexDirection:'row',alignSelf:'center'}}>
                    <Icon 
                    raised
                    reverse
                    name={props.favorite ? 'heart' : 'heart-o'} 
                    type='font-awesome' 
                    color='#f50' 
                    onPress={() => props.favorite ? console.log('Already Favorite'): props.onPress()} />
                     <Icon
                     raised
                     reverse
                     name='pencil'
                     type='font-awesome'
                     color='#512DA8'
                     onPress={()=>props.onClick()}
                     />
                     </View>
                </Card>
                </Animatable.View>
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComments(props) {
    const comments=props.comments;

    const RenderCommentItem = ({item,index}) => {
         return(
             <View key={index} style={{margin: 10}}>
                 <Text style={{fontSize: 14}}>{item.comment}</Text>
                 <Text style={{fontSize:12}}><Rating startingValue={item.rating} readonly imageSize={11}/></Text>
                 <Text style={{fontSize: 12}}>{'--'+item.author+','+item.date}</Text>
             </View>
         );
    }

    return (
        <Animatable.View animation="fadeInUp" duration={4000} delay={1000}>   
        <Card title="Comments">
            <FlatList data={comments} renderItem={RenderCommentItem} keyExtractor={item => item.id.toString()} />
        </Card>
        </Animatable.View>
    );
}

class Dishdetail extends Component {

    constructor(props){
        super(props);
        this.state={
          author:'',
          rating:'1',
          comment:'',
          showModal:false
        };
    }
    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    toggleModal(){
        this.setState({showModal:!this.state.show})
      }
      
    resetForm() {
        this.setState({
            showModal:false,
            author:'',
            comment:'',
            rating:'1',
        });
      }

    handleComment(dishId) {
        this.toggleModal();
        this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment);
    }

    render() {
        const dishId = this.props.navigation.getParam('dishId','');

        return(
            <ScrollView>
               <RenderDish dish={this.props.dishes.dishes[+dishId]} 
               favorite={this.props.favorites.some(el => el === dishId)}
               onPress={ () => this.markFavorite(dishId)}
               onClick={()=>this.toggleModal()}
               />
               <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId===dishId)} />

               <Modal
                animationType={'slide'}
                transparent={false}
                visible={this.state.showModal}
                onDismiss={()=>{this.toggleModal();}}
                onRequestClose={()=>{this.toggleModal();}}>

                 <View style={styles.modal}>
                 <AirbnbRating
                   count={5}
                   reviews={["Bad","OK", "Good","Very Good","Amazing"]}
                   defaultRating={2}
                   size={20}
                />
                    <Rating
                    onFinishRating={(value)=>this.setState({rating: value})}
                       startingValue={1}
                        showRating
                        style={{ paddingVertical: 10 }} />

                     <View style={styles.inputContainer}>
                     <Icon
                         style={styles.icon}
                         name='user'
                         type='font-awesome'
                         color='#787878'
                     />
                       <TextInput
                            onChangeText={(value)=>this.setState({author:value})}
                            style={{height: 50,flex:1,left: 10}}
                            placeholder="Author"
                         />
                     </View>

                     <View style={styles.inputContainer}>
                         <Icon
                         style={styles.icon}
                          name='comment'
                          type='font-awesome'
                          color='#787878'
                     />
                       <TextInput
                            onChangeText={(value)=>this.setState({comment:value})}
                            style={{height: 50,flex:1,left: 5}}
                            placeholder="Comment"
                        />
                     </View>

                    <TouchableOpacity
                                 style={styles.SubmitButton}
                                 onPress={()=> {this.handleComment(dishId);this.resetForm()}}
                                 underlayColor='#fff'>
                                 <Text style={styles.ButtonText}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                                 style={styles.CancelButton}
                                 onPress={()=> {this.resetForm()}}
                                 underlayColor='#fff'>
                                 <Text style={styles.ButtonText}>Cancel</Text>
                    </TouchableOpacity>
                 </View>
              </Modal>

            </ScrollView>
       
        );
    }
    
}

const styles = StyleSheet.create({
    modal: {
        justifyContent:'center',
        margin:20
    },
    SubmitButton:{
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#512DA8',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        width:300,
        height:40,
        alignSelf:'center',
        shadowColor:'black',
      shadowOpacity: 0.4,
      },
      CancelButton:{
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#787878',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        width:300,
        height:40,
        alignSelf:'center',
        shadowColor: 'black',
      shadowOpacity: 0.4,
      },
      ButtonText:{
        color:'#fff',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderBottomWidth: 0.5,
      borderBottomColor:'#A8A8A8',
      height: 40,
      margin: 5,
    },
    icon: {
      paddingRight: 30,
      height: 55,
      width: 55,
      paddingTop:17
    }
  })

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);