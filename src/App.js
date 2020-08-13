import React, { useState, useEffect, Component  } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

// import config from '../config.json';

import Home from './panels/Home';
import GiveAkk from './panels/GiveAkk';

let groups;
let groups_for_add;
let groups_for_notify;


const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [config, setConfig] = useState({	"groups": [],
	"url_image": "https://sun9-37.userapi.com/zEhU86uI-MRBXA-eqbbGQE-NBLm6gUT8zgbQmg/_Vc2PFuMnbc.jpg",
	"url_final":  "https://sun9-37.userapi.com/zEhU86uI-MRBXA-eqbbGQE-NBLm6gUT8zgbQmg/_Vc2PFuMnbc.jpg"});
	// const [fetchedUser, setUser] = useState(null);
	// const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	useEffect(() => {
		// fetch('../config.json')
		// .then((response)=>response.json())
        // .then((responseJson)=>{console.log(responseJson)});
		// .then(response => {
		// 	show(response.json().body);
		//   }).then(res => {
		// 	// Work with JSON data here
		// 	console.log(res);

		// 	if(res){
		function getData(){
			return fetch('../config.json')
				.then((response)=>response.json())
				.then((data) => {
					setConfig(data);
					});
		}
		getData();
			// console.log(config);
		// 	}

		//   }).catch(err => {
		// 	// Do something for an error here
		// 	console.log("Error Reading data " + err);
		//   });
		// joinGroup(195018161);
		// allowMess(195018161);
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		// async function fetchData() {
		// 	const user = await bridge.send('VKWebAppGetUserInfo');
		// 	setUser(user);
		// 	setPopout(null);
		// }
		// fetchData();
	}, []);
	

	function joinGroups() {
		bridge.send("VKWebAppJoinGroup", {"group_id": groups_for_add[0]})
		.then(res => {
			if(res.result){
				groups_for_add.shift();
				console.log(groups_for_add);
				console.log([groups_for_add.length]);
				if(groups_for_add.length + groups_for_notify.length === 0){
					setActivePanel('give');
				}
				else if(groups_for_add.length > 0){
					joinGroups();
				}
			}
		})
		.catch(() => {
			if(groups_for_add.length > 0){
				joinGroups();
			}	
		})
	}

	function allowMess() {
		bridge.send("VKWebAppAllowMessagesFromGroup", {"group_id": groups_for_notify[0]})
		.then(res => {
			if(res.result){
				groups_for_notify.shift();
				console.log(groups_for_notify);
				console.log([groups_for_notify.length]);
				if(groups_for_add.length + groups_for_notify.length === 0){
					setActivePanel('give');
				}
				else if(groups_for_notify.length > 0){
					allowMess();
				}	
				else if(groups_for_notify.length === 0){
					joinGroups();
				}
			}
		})
		.catch(() => {if(groups_for_notify.length > 0){
			allowMess();
		}})
	}

	async function doTerms() {
		console.log(config);
		groups = config.groups;
		groups_for_add = Array.from(groups);
		groups_for_notify = Array.from(groups);
		allowMess()
	}

	return (
		<View activePanel={activePanel}>
			<Home id='home' doTerms={doTerms} config={config}/>
			<GiveAkk id='give' setActivePanel={setActivePanel} config={config}/>
		</View>
	);
}

export default App;

