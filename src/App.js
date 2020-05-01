import React, { Fragment } from "react";
import { MDBBtn } from "mdbreact";
import { MDBDataTable } from 'mdbreact';

import GlobalData from './utils/GlobalData'
import StuffIoweRetriever from './API/StuffIoweRetriever'

//import "./styles.css";
//import { Column, Row } from 'simple-flexbox'; //https://dev.to/llorentegerman/simple-layouts-with-flexbox-in-react-55kf

//react-flexview https://blog.buildo.io/flexview-the-easiest-way-to-use-flex-with-react-c698db55926a

// !! https://mdbootstrap.com/docs/react/tables/editable/

export default class App extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            data: []
        }
    
        GlobalData.setState({
            userKey: 263,
            userSecret: "c8cd5a9a0fb9c89049b96413cdcb26b6b6df1bc59b03c2509ce9fa4a66444ee8",
            dictionaryLocale: 'en-GB',
            app: this,
            reqID: 0,
        })
    }

    componentDidMount() {
        
    }

    showMessage(message) {

    }

    render() {
        return (
    
            <Fragment>
            
                <MDBBtn onClick={()=>{
                    new StuffIoweRetriever().fetch().then(r => {
            
                        //this.setState({data: items}) //r.answerBody.iouGroups[0].ious
                        this.setState({data: r.answerBody}) //
            
            
                    })
                }}>Load IOUs I owe</MDBBtn>

               
            
                {this.state.data.iouGroups&&this.state.data.iouGroups.map((group, i)=>{
                    return (
                        <div>    
                            <h2>{group.title}</h2>
                            <MDBDataTable
                                striped
                                bordered
                                hover
                                data={{columns: columns, rows: group.ious}}
                            />
                        </div>
                    )
                })}
                

            </Fragment>
        );
    }
}
/*
              <div className="App">
                  <h1>Hello CodeSandbox</h1>
                  <TestComponent text="Start editing to see some magic happen!" />

                  <div class="container">
                  {arr.map((item, i)=>{
                      return (
                        <div class="row" key={"row_"+i}>
                            <div class="col">{i+1}</div>
                            <div class="col">{item}</div>
                            <div class="w-200"></div>
                        </div>
                      )
                  })}
                  </div>
              </div>
*/




const  columns = [
{
    label: 'iouKey',
    field: 'iouKey',
    sort: 'asc',
    width: 150
},
{
    label: 'itemType',
    field: 'itemType',
    sort: 'asc',
    width: 270
},
{
    label: 'quantity',
    field: 'quantity',
    sort: 'asc',
    width: 200
},
{
    label: 'customItem',
    field: 'customItem',
    sort: 'asc',
    width: 100
},
{
    label: 'customItemDetails',
    field: 'customItemDetails',
    sort: 'asc',
    width: 150
},
{
    label: 'description',
    field: 'description',
    sort: 'asc',
    width: 100
},
{
    label: 'status',
    field: 'status',
    sort: 'asc',
    width: 25
}]