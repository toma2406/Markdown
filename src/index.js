import React from 'react';
import {render} from 'react-dom';
import "./style/css/bootstrap.min.css";
import "./index.css";
import {sampleText} from "./sampleText";
import marked from 'marked';

class App extends React.Component{

state ={
  text : sampleText
};

componentWillMount(){
  const localStorageText = localStorage.getItem('text');
  if (localStorageText) {
    this.setState({text: localStorageText});
  }
}

componentWillUpdate( nextProps, nextState ){
  localStorage.setItem('text',nextState.text);
}

editText=(event) => {
  const text= event.target.value;
  this.setState({ text });
}

rendertext =(text)=>{
  const rendertext = marked(text,{sanitize :true});
  return{__html : rendertext};
};
  render() {
    return(
      <div className="container">
        <div className="row">
          <div className="col-sm-12" id="title">
            <h3>Editeur de text en Mardown</h3>
          </div>
          <div className="col-sm-6">
            <textarea value={this.state.text}
              rows="35"
              className="form-control"
              onChange={(e) => this.editText(e)}
              >
            </textarea>
          </div>
          <div className="col-sm-6">
            <div dangerouslySetInnerHTML={this.rendertext(this.state.text)}/>

          </div>
        </div>

      </div>
    )

  }
}

render(
  <App />,
  document.getElementById('root')
);
