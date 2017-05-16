/**
 * Created by donghyunkim on 2017. 5. 15..
 */



import utility from '../utility/utility';




export default {
    //삭제버튼 클릭 handler
    deletePlayListBtnClickHandler(){
        let { deleteVideoCheckList,currentAlbum } = this.state;
        let { _id } = currentAlbum;
        let deleteData = {
            albumId : _id,
            deleteList: deleteVideoCheckList
        };
        let jsonData = JSON.stringify(deleteData);
        utility.runAjaxData(this._deletePlayListReqListener.bind(null,_id),"POST","/playList/deletePlayList", jsonData, "application/json");
    },
    //check click handler
    checkClickHandler(videoId, checkIdx, isChecked, event) {
        let {deleteVideoCheckList,checkIdxList,currentAlbum}  = this.state;
        //let items = videoData.items;
        let currentSelectAllIsChecked = false;

        let newDeleteVideoCheckList = [...deleteVideoCheckList];
        let newCheckIdxList = [...checkIdxList];
        //check 되어있지 않으면
        if(!isChecked){
            newDeleteVideoCheckList.push(videoId);
            newCheckIdxList.push(checkIdx);
        }else{
            let idx =  checkIdxList.indexOf(checkIdx);
            newCheckIdxList.splice(idx,1);
            newDeleteVideoCheckList.splice(idx,1);
        }


        let playList = null;
        if(currentAlbum){
            playList = currentAlbum.playList;
            if(newCheckIdxList.length === playList.length){
                currentSelectAllIsChecked = true;
            }
        }

        this.setState({deleteVideoCheckList: newDeleteVideoCheckList,checkIdxList:  newCheckIdxList, selectAllIsChecked: currentSelectAllIsChecked});
        event.stopPropagation();
    },


    //전체선택 버튼 클릭 handler
    selectAllBtnClickHandler(){
        let { currentAlbum } = this.state;
        let playList = null;

        if(currentAlbum) {
            playList = currentAlbum.playList;
        }
        let {selectAllIsChecked} = this.state;
        let currentSelectAllIsChecked = false;
        let newDeleteVideoCheckList = [];
        let newCheckIdxList = [];


        if(!selectAllIsChecked){
            playList.forEach((val,idx)=>{
                let {videoId} = val;
                newDeleteVideoCheckList.push(videoId);
                newCheckIdxList.push(idx);
            });
            currentSelectAllIsChecked = true;
        }
        this.setState({deleteVideoCheckList: newDeleteVideoCheckList,checkIdxList:  newCheckIdxList, selectAllIsChecked : currentSelectAllIsChecked});

    },

    playListClickHandler(playList,key){

        let {eventMap} = this.state;

        this.setState((state) => {
            let {currentAlbum, playingState} = state;
            let newEventMap = null;
            if(playingState) {
                let {playingKey} = playingState;
                if (key !== playingKey) {
                    newEventMap = {
                        playing: false,
                        curTime: '00:00', // 현재 재생 시간
                        totalTime: '00:00', // 전체 비디오 재생 시간
                        curProgressBar: 0,
                        maxProgressBar: 0,
                    };
                }
            }

            return {
                playingState: Object.assign({}, playingState, {
                    playingAlbum: currentAlbum,
                    playingData: playList[key],
                    playingKey: key,
                }),
                selectedData: playList[key],
                selectedKey: key,
                eventMap: Object.assign({}, eventMap, newEventMap),

            };
        }, ()=>{
            let {player} = this.state;
            if(player) {
                this._setDuration(player);
            }
        });
    },

    onReady(event) {
        //console.log(`재생 될 비디오 아이디 : "${this.state.videoId}"`);
        // console.log(event);
        this.setState((state)=>{
            return { player: event.target }
        });
        // this.state.player ? this._setDuration() : null;
        //this.state.player ? this.getDuration() : null
        //console.log("재생 될 비디오 아이디", this.state.event_map.totalTime);
    },







}
