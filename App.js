
import React from 'react';
import { StyleSheet, Dimensions, View, AsyncStorage } from 'react-native';
import TakePageNumber from './components/takePageNumber';
import Pdf from 'react-native-pdf';

export default class App extends React.Component {
    state = {
        totalNumberOfPages:'_',
        showPdf:false,
        initialPage:"",
        firstTime:true
    }
    constructor(props){
        super(props);
        this._retrieveData();
    }
    goToPageNumber=(pageNumber)=>{
        this.pdf.setPage(pageNumber);
        // console.log("hello")
    }
    _storeData = async (page) => {
        console.log(page);
        try {
          AsyncStorage.setItem('lastTimeOnPage', String(page));
        //   this.setState({ currentPage: page });
        } catch (error) {
          // Error saving data
        }
      };
      _retrieveData = async () => {
        try {
          let value = await AsyncStorage.getItem('lastTimeOnPage');
          if (value !== null) {
            // console.log("cunning");
            // We have data!!
            // console.log(value);
           if(this.state.initialPage == ""){
               this.state.initialPage = Number(value);
            //    console.log("intial Page" + this.state.initialPage);
           }
        //    console.log("initialPAge")
        //    console.log(this.state.initialPage);
            this.setState({
                currentPage:Number(value),
                showPdf:true
            });
          }
          else{
            this.setState({
                currentPage:1,
                showPdf:true,
                initialPage:1
            })
          }
        } catch (error) {
            this.setState({
                currentPage:1,
                showPdf:true,
                initialPage:1
            })
          // Error retrieving data
        }
      };
      
      
    render() {
        const source = { uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true };
        //const source = require('./test.pdf');  // ios only
        //const source = {uri:'bundle-assets://test.pdf'};

        //const source = {uri:'file:///sdcard/test.pdf'};
        //const source = {uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."};
        if(!this.state.showPdf){
            return(
                <View style={{flex:1}}></View>
            ) 
        }
        else{
            return (

            
                <View style={{ flex: 1 }}>
    
    
                    <TakePageNumber key={this.state.currentPage} goToPageNumber={this.goToPageNumber} currentPage={this.state.currentPage} totalNumberOfPages={this.state.totalNumberOfPages} />
                    <View style={styles.container}>
    
                        <Pdf
                        // page={this.state.currentPage}
                       ref={(pdf) => { this.pdf = pdf; }}
                            source={source}
                            onLoadComplete={(numberOfPages, filePath) => {
                                //  console.log(`number of pages: ${numberOfPages}`);
                                // console.log("load complete")
                                this.setState({ totalNumberOfPages: numberOfPages });
                                if(this.state.firstTime){
                                    // console.log("hello" + this.state.initialPage)
                                    this.goToPageNumber(this.state.initialPage);
                                    this.state.firstTime = false
                                }
                            
                            }}
                            onPageChanged={(page, numberOfPages) => {
                                // console.log(`current page: ${page}`);
                                this.setState({currentPage:page})
                                this._storeData(page);
                            }}
                            onError={(error) => {
                                // console.log(error);
                            }}
                            onPressLink={(uri) => {
                                // console.log(`Link presse: ${uri}`)
                            }}
                            style={styles.pdf} />
                    </View>
                </View>
    
            )
        }
        
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});