/**
 * Created by donghyunkim on 2017. 5. 2..
 */


import React, {Component} from 'react';
import SearchInputBox from "./SearchInputSection";
import AlbumList from "./AlbumList";
import "./mainList.css";
import utility from '../../../utility/utility';




class MainList extends Component {

    constructor(props){
        super(props);
        // this.requestListener = this.requestListener.bind(this)
    }
    

    render(){
        let { albumList } = this.props;
        return(
            <div className="rightArea">
                <SearchInputBox
                    searchVideo = {this.searchVideo}
                />
                <AlbumList items={albumList} />
            </div>
        )
    }

}


export default MainList;