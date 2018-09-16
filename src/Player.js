import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ActivityIndicator, Dimensions, Animated} from 'react-native';
import Video from 'react-native-video';
import { Header, Icon } from 'react-native-elements';

type Props = {};
export default class Player extends Component<Props> {

  handleError = (meta) => {
    const { error: { code }} = meta;
    let error = 'Ocorreu um erro ao exibir esse video.';

    switch(code){
       case -11800:
        error = 'Não foi possivel carregar esse video pela URL';
        break;
    }

    this.setState({
      error
    })
  }

  handleLoadStart = () => {
    this.triggerBufferAnimation();
  }
  triggerBufferAnimation = () => {
    this.loopingAnimation = Animate.loop(
      Animated.timing(this.state.animated, {
        toValue: 1,
        duration: 350,
      })
    ).start();
  }

  constructor(props) {
    super(props);
    this.state = {isPlayingVideo: false, isFullscreen: false};
  }

  state = {
    error: false,
    buffering: true,
    animated: new Animated.Value(0),
  };

  render() {
    const { width } = Dimensions.get("window");
    const height = width * 0.5625;
    const { buffering, error } = this.state;

    const interpolatedAnimation = this.state.animated.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    const rotateStyle = {
      transform: [
        { rotate: interpolatedAnimation}
      ]
    }

    const onPressPlay = () => {
      this.setState(previousState => {
        return { isPlayingVideo: !previousState.isPlayingVideo };
      });
    };
  
    const onPressFullscreen = () => {
      this.setState(previousState => {
        return { isFullscreen: !previousState.isFullscreen };
      });
    };
  
    const onVideoLoading = () => {
        return(
          <View style={{flex: 1, padding: 20}}>
            <ActivityIndicator/>
          </View>
        )
    };

    return (
      <View style={styles.container}>
        <View style={error ? styles.error : undefined}>
          <Video
            ref={(ref) => {
              this.player = ref
            }}   
            source={{uri: 'https://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_10mb.mp4'}} 
            style={{ width: "100%", height}}
            paused={this.state.isPlayingVideo}
            fullscreen={this.state.isFullscreen}
            resizeMode="contain"
            onError={this.handleError}
            onLoadStart={this.handleLoadStart}
            onBuffer={this.handleBuffer}/>
            <View style={styles.videoCover}>
            {error && <Icon name='exclamation-triangle' size={30} color='red' />}
            {error && <Text>{error}</Text>}
            {buffering && <Animated.View style={rotateStyle}> <Icon name='circle-o-notch' size={30} color='#fff'/></Animated.View>}
            </View>

          <Icon
            name='play'
            type='font-awesome'
            color='#7b7b7b'
            onPress={onPressPlay} />
          <Icon
            name='arrows-alt'
            type='font-awesome'
            color='#7b7b7b'
            onPress={onPressFullscreen} />
          </View>
        <Text style={StyleSheet.videoTitle}>Coelho Gordo</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    top: 20,
  },
  video: {
    width: 400, 
    height: 300,
    top: 0,
  },
  videoCover: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255, .9)',
  },
  videoButton: {
    backgroundColor: '#1b1b1b',
    height: 50,
    width: 50,
  },
  navigationBar:{
    backgroundColor: '#ff0000',
  },
  error: {
    backgroundColor: '#000'
  }
});
