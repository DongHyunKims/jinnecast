/**
 * Created by @sujinleeme on 2017. 4
 */



import React from 'react';

import ReactPlayer from 'react-player'
import { findDOMNode } from 'react-dom'


class PlayController extends React.Component {


    state = {
        url: null,
        playing: true,
        volume: 0.8,
        played: 0,
        loaded: 0,
        duration: 0,
        playbackRate: 1.0
    };


    load = url => {
        this.setState({
            url,
            played: 0,
            loaded: 0
        })
    };

    playPause = () => {
        this.setState({ playing: !this.state.playing })
    };
    stop = () => {
        this.setState({ url: null, playing: false })
    };
    setVolume = e => {
        this.setState({ volume: parseFloat(e.target.value) })
    };
    setPlaybackRate = e => {
        console.log(parseFloat(e.target.value))
        this.setState({ playbackRate: parseFloat(e.target.value) })
    };
    onSeekMouseDown = e => {
        this.setState({ seeking: true })
    };
    onSeekChange = e => {
        this.setState({ played: parseFloat(e.target.value) })
    };
    onSeekMouseUp = e => {
        this.setState({ seeking: false })
        this.player.seekTo(parseFloat(e.target.value))
    };
    onProgress = state => {
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
            this.setState(state)
        }
    };

    onConfigSubmit = () => {
        let config
        try {
            config = JSON.parse(this.configInput.value)
        } catch (error) {
            config = {}
            console.error('Error setting config:', error)
        }
        this.setState(config)
    };
    renderLoadButton = (url, label) => {
        return (
            <button onClick={() => this.load(url)}>
                {label}
            </button>
        )
    };

  render(){


      const {
          url, playing, volume,
          played, loaded, duration,
          playbackRate,
          soundcloudConfig,
          vimeoConfig,
          youtubeConfig,
          fileConfig
      } = this.state;


    return(
        <div>
          <ReactPlayer
              ref={player => { this.player = player }}
              className='react-player'
              width='100%'
              height='100%'
              url={url}
              playing={playing}
              playbackRate={playbackRate}
              volume={volume}
              soundcloudConfig={soundcloudConfig}
              vimeoConfig={vimeoConfig}
              youtubeConfig={youtubeConfig}
              fileConfig={fileConfig}
              onReady={() => console.log('onReady')}
              onStart={() => console.log('onStart')}
              onPlay={() => this.setState({ playing: true })}
              onPause={() => this.setState({ playing: false })}
              onBuffer={() => console.log('onBuffer')}
              onEnded={() => this.setState({ playing: false })}
              onError={e => console.log('onError', e)}
              onProgress={this.onProgress}
          />


          <button onClick={this.stop}>Stop</button>
          <button onClick={this.playPause}>{playing ? 'Pause' : 'Play'}</button>
          <button onClick={this.setPlaybackRate} value={1}>1</button>
          <button onClick={this.setPlaybackRate} value={1.5}>1.5</button>
          <button onClick={this.setPlaybackRate} value={2}>2</button>
          <p>Seek</p>


          <input
              type='range' min={0} max={1} step='any'
              value={played}
              onMouseDown={this.onSeekMouseDown}
              onChange={this.onSeekChange}
              onMouseUp={this.onSeekMouseUp}
          />

          <p>Volume</p>

          <input type='range' min={0} max={1} step='any' value={volume} onChange={this.setVolume} />

          <p>Played</p>
          <progress max={1} value={played} />

          <p>Loaded</p>
          <progress max={1} value={loaded} />


         <p>YouTube</p>
            {this.renderLoadButton('https://www.youtube.com/watch?v=oUFJJNQGwhk', 'Test A')}
            {this.renderLoadButton('https://www.youtube.com/watch?v=jNgP6d9HraI', 'Test B')}
        </div>
    )
  }

}

export default PlayController


// import React from 'react';
//
// import ReactPlayer from 'react-player'
// import YouTube from "./YouTube";
// import { findDOMNode } from 'react-dom'
//
//
// class PlayController extends React.Component {
//
//
//
//
//     render(){
//
//
//         return(
//             <div>
//                 {/*<YouTube />*/}
//             </div>
//         )
//     }
//
// }
//
// export default PlayController
