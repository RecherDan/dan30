import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';

import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';
import firebase from 'firebase';

export const MyContext = React.createContext({
  loggedIn: false,
  name: null,
  user: null,
  new_user: true,
  waiting_for_new_user: true
});
export function findArrayElementByTitle(array, title) {
  return array.find((element) => {
    return element.id === title;
  })
}
var firebaseConfig = {
  apiKey: 'AIzaSyB4w5QiTG-nuarV0argJqAEPn-6Gw4Mv2Q',
  authDomain: 'dan30-91978.firebaseapp.com',
  databaseURL: 'https://dan30-91978.firebaseio.com',
  projectId: 'dan30-91978',
  storageBucket: 'dan30-91978.appspot.com',
  messagingSenderId: '1052521960698',
  appId: '1:1052521960698:web:c63f4af56e073501'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var provider = new firebase.auth.FacebookAuthProvider();
provider.setCustomParameters({
  'display': 'popup'
});
var database = firebase.database();
const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};

/*class MyProvider extends Component {

  render() {
    return (
      <MyContext.Provider value={{
        //state: this.state,
        setLoggedIn: () => this.setState({
          loggedIn: true
        }),
        setLoggedOut: () => this.setState({
          loggedIn: false
        }),
        setName: (name) => this.setState({
          name: name
        }),
        setNewUser: () => this.setState({
          new_user: true
        }),
        setOldUser: () => this.setState({
          new_user: false
        })
      }}>
        {this.props.children}
      </MyContext.Provider>
    )
  }
}*/

export default class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.logIn = this.logIn.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isGoingFunction = this.isGoingFunction.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.takeItem = this.takeItem.bind(this);
    this.handleChangeTake = this.handleChangeTake.bind(this);
    this.takecar = this.takecar.bind(this);
    this.joincar = this.joincar.bind(this);
    this.changeAdminMode = this.changeAdminMode.bind(this);
    this.setlastpage = this.setlastpage.bind(this);
    this.state = {
      currentItem: '',
      username: '',
      amountOfItem: '',
      currentlylogginin: 'false',
      lastpage: 'login',
      loggedIn: false,
      logoutFunction: this.logOut,
      loginFunction: this.logIn,
      handleChangeFunction: this.handleChange,
      handleSubmitFunction: this.handleSubmit,
      removeItemFunction: this.removeItem,
      takeItemFunction: this.takeItem,
      handleChangeTakeFunction: this.handleChangeTake,
      takecarFunction: this.takecar,
      joincarFunction: this.joincar,
      setlastpageFunction: this.setlastpage,
      changeAdminModeFunction: this.changeAdminMode,
      isgoingselect: 20,
      name: null,
      user: null,
      new_user: true,
      waiting_for_new_user: true,
      isAdmin: false,
      AdminMode: false,
      comes: [],
      isGoing: false,
      isGoingFunction: this.isGoingFunction,
      TotalRegistered: 0,
      TotalGoing: 0,
      TotalNotGoing: 0,
      GoingToTotal: 0,
      NotGoingToTotal: 0,
      items: [],
      cats: [],
      cars: [],
      incar: 'no',
      isdriver: false,
      incarid: '',
      logginfailed: false,
      waitingfornewuser: false,
      driverid: ''
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  handleSubmit(itemname, amount, cat) {
    const itemsRef = firebase.database().ref('items/' + cat);
    const item = {
      title: itemname,
      user: this.state.user.displayName || this.state.user.email,
      amount: amount,
      cat: cat,
      exists: '0'
    }
    itemsRef.push(item);
    this.setState({
      currentItem: '',
      username: ''
    });
  }
  handleChange(e) {
    if ( e.target.name ) {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
    else {
      this.setState({
        [e.target.id]: e.target.value
      });
    }

  }
  changeAdminMode() {
    if ( this.state.isAdmin ) {
      this.setState({AdminMode: !this.state.AdminMode});
    }

  }
  setlastpage(page) {
    this.setState({lastpage: page});
  }
  removeItem(itemId, cat) {

    const itemRef = firebase.database().ref(`/items/${cat}/${itemId}`);
    itemRef.remove();
  }
  handleChangeTake(e)  {

    const itemRef = firebase.database().ref(`/items/${e.target.value}/${e.target.name}/users/${this.state.user.uid}/`);
    if ( e.target.checked ) {
      itemRef.set(true);
    }
    else {
      itemRef.set(false);
    }
  }
  takeItem(cat, itemId, take) {
    const itemRef = firebase.database().ref(`/items/${cat}/${itemId}/users/${this.state.user.uid}/`);
    if ( take === 'yes') {
      itemRef.set(false);
    }
    else {
      itemRef.set(true);
    }
  }
  joincar(carId, take) {
    const CarRef = firebase.database().ref(`/cars/${carId}/users/${this.state.user.uid}/`);

    if ( take && !this.state.isdriver) {
      CarRef.set(true);
    }
    else {
      CarRef.set(false);
    }
    this.setState({
      incar: (take || this.state.isdriver)
    });
  }
  takecar(e) {
    let mode = e.target.value;
    if ( mode === 1 ) {
      if ( this.state.incar ) {
        firebase.database().ref('/cars/' + this.state.incarid + '/users/' + this.state.user.uid).remove();
      }
      const carRef = firebase.database().ref('cars/');
      const item = {
        Driver: this.state.user.displayName || this.state.user.email,
        amount: '4',
        exists: '0',
        driverid: this.state.user.uid


      }
      carRef.push(item);


    }
    if ( mode ===2 ) {
      const carRef = firebase.database().ref('/cars/' + this.state.driverid);
      carRef.remove();
    }
    this.setState({
      isdriver: (mode ==1 ) ? true : false
      //incar: (mode ==1 ) ? true : false
    });
  }
  componentDidMount() {
    //when you hit reload, this will check if you already logged in
    //and will set the user variable accordingly.

    //set loading to true when fetching data for authentication
    this.setState({ loading: true });
    let new_user = true;
    firebase.auth().onAuthStateChanged((user) => {
      let self = this;
      if (user) {
        //this.setState({ user });

        let userId = user.uid;
        console.log(user);
        if ( !this.state.waitingfornewuser ) {
          self.setState({waitingfornewuser: true});
          firebase.database().ref('/comes/' + userId + '/new_user').once('value').then(function(snapshot) {
            new_user = (snapshot.exists() && (snapshot.val() === false) ? false : true);
            self.setState({ new_user: new_user });
            console.log('new user: ' + new_user);
            if (new_user) {
              this.handle_register();
            }
            // ...
          });
        }
        firebase.database().ref('/comes/' + userId + '/admin').once('value').then(function(snapshot) {
          let admin = (snapshot.exists() && (snapshot.val() === true) ? true : false) ;
          self.setState({ isAdmin: admin });
          self.setState({ AdminMode: admin });
          // ...
        });

        this.setState({ user: user, loggedIn: true });

      }
      else if ( this.state.loggedIn ) {
        this.setState({logginfailed: true});
      }
      //when data is loaded, set loading to false
      this.setState({currentlylogginin: false});
      this.setState({ loading: false });

    });

    firebase.auth().getRedirectResult().then( (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      //const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      let self = this;
      if ( user ) {

        let new_user;
        let userId = user.uid;
        if ( !this.state.waitingfornewuser ) {
          self.setState({waitingfornewuser: true});
          firebase.database().ref('/comes/' + userId + '/new_user').once('value').then( (snapshot) => {

            new_user = (snapshot.exists() &&  (snapshot.val() === false) ? false : true) ;
            self.setState({ new_user: new_user });
            console.log('new user: ' + new_user);
            if ( new_user ) {
              this.handle_register();
            }
          // ...
          });
        }
        firebase.database().ref('/comes/' + userId + '/admin').once('value').then(function(snapshot) {
          let admin = (snapshot.exists() && (snapshot.val() === true) ? true : false) ;
          self.setState({ isAdmin: admin });
          self.setState({ AdminMode: admin });
          // ...
        });
        this.setState({ user: user, loggedIn: true });
      }
      else if ( this.state.loggedIn ) {
        this.setState({logginfailed: true});
      }
      //Set the state user variable
      this.setState({ user });
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      console.log(error);
      // ...

    });

    const comeRef = firebase.database().ref('comes');
    comeRef.on('value', (snapshot) => {
      let comesval = snapshot.val();
      let iscoming = 'Not Going';
      let isgoing = false;
      let newState = [];
      let newState2 = [];
      let comeid = '';
      this.state.TotalGoing = 0;
      this.state.TotalNotGoing = 0;
      this.state.TotalRegistered = 0;
      let comes = Object.assign({}, this.state.comes);
      for (let come in comesval) {

        this.state.TotalRegistered++;
        newState[come] = ({
          name: comesval[come].name,
          img: comesval[come].img,
          id: come,
          going: (comesval[come].going ? true : false)
        });
        comes[come] = {
          name: comesval[come].name,
          img: comesval[come].img,
          id: come,
          going: (comesval[come].going ? true : false)
        };
        newState2.push({
          name: comesval[come].name,
          img: comesval[come].img,
          id: come,
          going: (comesval[come].going ? true : false)
        });
        if ( comesval[come].going ) {
          this.state.TotalGoing++;
        } else {
          this.state.TotalNotGoing++;
        }
        if ( this.state.user != null && come === this.state.user.uid && comesval[come].going) {
          comeid = come;
          iscoming = 'Going';
          isgoing = true;
        }
      }

      this.state.GoingToTotal = (100* (this.state.TotalGoing /  this.state.TotalRegistered)).toFixed(0);
      this.state.NotGoingToTotal = 100 - this.state.GoingToTotal;
      this.setState({
        comeid: comeid,
        iscoming: iscoming,
        isGoing: isgoing,
        isgoingselect: isgoing? '10' : '20',
        comes: newState2,
        test: newState2
      });
    });
    const itemsRef = firebase.database().ref('items');
    itemsRef.on('value', (snapshot) => {
      let cats = snapshot.val();
      let newState = []
      let itemsItakeIn ='';
      let usertakingfirst = 0;
      for (let cat in cats) {
        let items = cats[cat];
        for (let item in items) {
          let users = '';
          let taking = 'no';
          let exists = 0;
          let first = 0;
          let usrslist = [];
          for ( let usr in items[item].users) {
            if ( items[item].users[usr] === true  ) {
              usrslist.push(usr);
              if ( first === 0 ) {
                users = usr;
              }
              else {
                users = users + ', ' + usr;
              }
              if ( this.state.user != null && this.state.user.uid === usr ) {
                taking ='yes';
                if ( usertakingfirst === 0 ) {
                  itemsItakeIn = items[item].title;
                  usertakingfirst++;
                }
                else {
                  itemsItakeIn = itemsItakeIn + ', ' +  items[item].title;
                }

              }
              first =1;
              exists++;
            }
          }
          newState.push({
            id: item,
            title: items[item].title,
            user: items[item].user,
            amount: items[item].amount,
            cat: items[item].cat,
            usrslist: usrslist,
            exists: exists,
            users: users,
            taking: taking
          });
        }
      }
      this.setState({
        items: newState,
        itemsItake: itemsItakeIn
      });
    });
    const catsRef = firebase.database().ref('item-cat');
    catsRef.on('value', (snapshot) => {
      let cats = snapshot.val();
      let newState = [];
      for (let cat in cats) {
        newState.push({
          id: cat,
          name: cats[cat]
        });
      }
      this.setState({
        cats: newState,
        cat: newState[0].name
      });
    });
    const carsRef = firebase.database().ref('cars');
    carsRef.on('value', (snapshot) => {
      let cars = snapshot.val();
      let taking = false;
      let newState = [];
      let incar = false;
      let incarid = '';
      let sisdriver = this.state.isdriver;
      let driverid = this.state.driverid;
      let userslist = [];
      for (let car in cars) {
        let users = '';
        let exists = 0;
        let inthiscar = false;
        userslist = [];
        for ( let usr in cars[car].users) {
          if ( cars[car].users[usr] ) {
            userslist.push(usr);
            users = users + ' ' + usr;
            if ( this.state.user != null && this.state.user.uid === usr ) {
              incar = true;
              incarid = car;
              inthiscar = true;
              taking = true;
            }
            exists++;
          }
        }
        if ( this.state.user != null && cars[car].driverid === this.state.user.uid) {
          incar = true;
          sisdriver = true;
          driverid = car;
        }
        newState.push({
          id: car,
          driver: cars[car].Driver,
          driverid: cars[car].driverid,
          amount: cars[car].amount,
          inthiscar: inthiscar,
          incar: incar,
          incarid: incarid,
          exists: exists,
          users: users,
          userslist: userslist,
          taking: taking
        });

      }
      this.setState({
        driverid: driverid,
        isdriver: sisdriver,
        incar: incar,
        incarid: incarid,
        cars: newState
      });
    });
  }
  isGoingFunction(e) {
    let value = e.target.value;
    let going = (value == '10') ? true : false;
    firebase.database().ref('comes/' + this.state.user.uid + '/going/').set(going);
    this.setState({
      isGoing: going,
      isgoingselect: (going) ? '10' : '20'
    });
  }
  handle_register = () => {
    console.log('not loggedin:' + !this.state.loggedIn + ' no user: ' + !this.state.user + ' no uid: ' + (this.state.user ? !this.state.user.uid : false));
    if ( !this.state.loggedIn || !this.state.user || !this.state.user.uid ) return;
    console.log('register is on!');
    const uid = this.state.user.uid;
    //const comes = firebase.database().ref(`/comes/`);
    const item = {
      name: this.state.user.displayName || this.state.user.email,
      img: this.state.user.photoURL,
      admin: false,
      going: true,
      new_user: false
    }
    firebase.database().ref('comes/' + uid).set(item);
    this.setState({new_user: false});
    console.log('new user!');

  };

  logIn = () => {
    console.log('loggin in, please wait');
    this.setState({currentlylogginin: true});
    firebase.auth().signInWithRedirect(provider);
  }
  logOut = () => firebase.auth().signOut()
    .then(() => {
      this.setState({
        user: null,
        loggedIn: false,
        new_user: true
      });
    });
  Userpicture(props) {
    if (this.state.loggedIn) {
      return <img
        height="50"
        src={this.state.user.photoURL}
        width="50"
      />
    }
    else {
      return ''
    }
  }
  render() {
    return (
      <MyContext.Provider value={this.state}>
        {this.props.children}
        <ThemeProvider theme={theme}>
          <Router history={browserHistory} >
            <Routes {...this.state}/>
          </Router>
        </ThemeProvider>
      </MyContext.Provider>
    );
  }
}
