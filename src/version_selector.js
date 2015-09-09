var React=require("react");
var E=React.createElement;
var cbetaversions=require("./cbetadata").versions;
var versions=Object.keys(cbetaversions);
versions.unshift("大正");

var Version_selector=React.createClass({
	getInitialState:function() {
		return {versions:versions,selected:0};
	}
	,onChange:function(e) {
		var version=parseInt(e.target.dataset.idx);
		this.setState({selected:version});
		this.props.onVersion(versions[version]);
	}
	,renderItem:function(item,idx) {
		var checked=this.state.selected==idx;
		return E("label",null,E("input",{onChange:this.onChange,checked:checked,
			"data-idx":idx,type:"radio",name:"version"},item));
	}
	,render:function(){
		return E("div",{}, this.state.versions.map(this.renderItem));
	}
});
module.exports=Version_selector;