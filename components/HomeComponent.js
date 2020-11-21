import React, { Component } from 'react';
import { Text, ViewAnimated, Easing, View } from 'react-native';
import {Card} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import {connect } from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

function RenderItem(props) {
    const item = props.item;

    if(props.isLoading) {
        return(
            <Loading />
        );
    }
    else if(props.errMess) {
        return(
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    }

    else {
        if(item!= null) {
            return(
                <Card 
                   featuredTitle ={item.name}
                   featuredSubtitle={item.designation}
                   image={{uri: baseUrl+item.image}}
                >
                    <Text style={{margin: 10}}>{item.description}</Text>
                </Card>
            );
        }
        else {
            return(<View></View>);
        }
    }
    
}

class Home extends Component {

    static navigationOptions = {
        title: 'Home'
    };
    render() {

        return(
            <ScrollView>
                <Animatable.View animation="zoomInDown" duration={5000} delay={0}>
               <RenderItem item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]} isLoading={this.props.dishes.isLoading} errMess={this.props.dishes.errMess}/>
               </Animatable.View>
              
               <Animatable.View animation="zoomInDown" duration={5000} delay={0}>
              <RenderItem item={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}isLoading={this.props.promotions.isLoading} errMess={this.props.promotions.errMess}/>
              </Animatable.View>

              <Animatable.View animation="zoomInDown" duration={5000} delay={0}>
              <RenderItem item={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}isLoading={this.props.leaders.isLoading} errMess={this.props.leaders.errMess}/>
              </Animatable.View>
           
            </ScrollView>              
        );
    }
}

export default connect(mapStateToProps)(Home);