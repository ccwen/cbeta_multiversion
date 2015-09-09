var React=require("react");
var KsanaLayerReact=require("ksana-layer-react");
var FlattenView=KsanaLayerReact.FlattenView;
var SelectableView=KsanaLayerReact.SelectableView;
var InterlineView=KsanaLayerReact.InterlineView;
var cbetadata=require("./cbetadata");
var Version_selector=require("./version_selector");

var tagStyles={ 
  test2:{backgroundColor:"yellow"}
  //,test:{color:"blue"}  can overwrite setting in css
}

var maincomponent = React.createClass({
  action:function(act,p1) {
    if (act==="setselectable") {
      this.setState({selectable:p1});
    }
  }
  ,getInitialState:function() {
    return {selectable:"no",editing:null,selections:{},version:"大正"};
  }
  ,onSelectText:function(start,len,t) {
    this.start=start;
    this.seltext=t;
  }
  ,newMarkup:function() {
    var mid='m'+Math.random().toString().substr(3,6);
    markups[mid]= {s:this.start,l:this.seltext.length,type:"rev",t:"",author:"y1"};
    this.setState({editing:mid});
  }
  ,onClickTag:function(mid) {
    console.log("click",mid);
  }
  ,onDoneEdit:function(mid) {
    console.log("doneedit",mid);
    var m=markups[mid];
    if (m.t==="" && m.l===0) {
      delete markups[mid];
    }
    this.setState({editing:null});
  }
  ,onKeyPress:function(e) {
    if (e.key==" ") {
      if (!this.start) return;
      this.newMarkup();
    }
    e.preventDefault();
  }
  ,onHover:function(mid,previous) {
    console.log(mid,previous);
  }
  ,onSelectText:function(start,len,text,opts,selections) {
    this.setState({selections:selections});
  }
  ,setversion:function(v) {
    this.setState({version:v});
  }
  ,render: function() {
    var ranges={};
    ranges["uid"]=this.state.selections;  
    
    return <div style={{fontSize:"100%"}}><pre style={{fontSize:"150%"}}>
      <Version_selector onVersion={this.setversion}/>
      <InterlineView user={this.state.version} onSelectText={this.onSelectText} selectable="single"
        onDoneEdit={this.onDoneEdit}
        allowKeys={[" "]} onKeyPress={this.onKeyPress} editing={this.state.editing}
        text={cbetadata.text} markups={cbetadata.notes} styles={tagStyles} />
      </pre>
     </div>;
  }
});
module.exports=maincomponent;
