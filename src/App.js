import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import ReactGA from "react-ga4";
// import GA4React, { useGA4React } from "ga-4-react";

const list_page = [
	{
		title: 'Labcase',
		path: '/',
	},{
		title: 'GIỚI THIỆU - Labcase',
		path: '/project-details/',
	},{
		title: 'Tin Tức - Labcase',
		path: '/tin-tuc/',
	},{
		title: 'Tinder: Swipe Night - Labcase',
		path: '/2021/10/24/tinder-swipe-night/',
	},{
		title: 'Bia Việt: “Tết Việt như ý – Vạn lời chúc như ý” - Labcase',
		path: '/2021/10/24/bia-viet-tet-viet-nhu-y-van-loi-chuc-nhu-y/',
	},{
		title: 'Heineken – Shutter Ads: Đóng cửa cuốn, mở cơ hội - Labcase',
		path: '/2021/10/23/heineken-shutter-ads-dong-cua-cuon-mo-co-hoi/',
	},{
		title: 'KOVA: Ngày con cài hoa trên ngực áo - Labcase',
		path: '/2021/10/23/kova-ngay-con-cai-hoa-tren-nguc-ao/',
	},{
		title: 'Acecook happiness – 25 năm từ khẩu vị đến trái tim - Labcase',
		path: '/2021/09/30/acecook-happiness-25-nam-tu-khau-vi-den-trai-tim/',
	},{
		title: 'NIKE: YOU CAN’T STOP US - Labcase',
		path: '/2021/09/28/nike-you-cant-stop-us/',
	},{
		title: 'DOVE: COURAGE IS BEAUTIFUL - Labcase',
		path: '/2021/09/28/dove-courage-is-beautiful/',
	},
]

var intervalId;
function App() {

	const [countRequest, setCountRequest] = useState(0)
	const [userId, setUserId] = useState(0);
	const refs = useRef();

	useEffect(() => {
		if(refs && refs.current){
			refs.current.scrollTop = 300;
			setInterval(() => {
				refs.current.scrollTop = refs.current.scrollTop + 20;
			}, 1000)
		}
	}, [refs])

	useEffect(() => {
		let count = 0
		clearInterval(intervalId)

		// fake id người dùng
		let id = "35009a79-1a05-49d7-b876-2b884d0f82" + (new Date()).getTime() % 10; // 10 là số người dùng mong muốn
		setUserId(id)

		let page = list_page[(new Date()).getTime() % 10]
		document.title = page.title
		ReactGA.initialize("G-GWNG4MPVTJ", {
			gaOptions: {
				userId: id
			}
		});

		// vòng lặp
		intervalId = setInterval(() => {
			count++;
			setCountRequest(count)
			ReactGA.send({ hitType: "pageview", page: page.path });
			// sau 3 lần xem load lại trang - có thể tăng tùy ý
			if(count === 3){
				window.location.reload();
				count = 0
			}
		}, 5000) // sau 15s gửi 1 lượt xem

	}, []);

	return (
		<div className="App" ref={refs}>
			<img src={logo} className="App-logo" alt="logo" /><br/>
			<span style={{marginTop: 10}}>Tổng số lượt truy cập trang này: {countRequest}</span>
			<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: '200vh', paddingTop: 50}}>
				{[1,2,3,4,5,6,7,8,9,10].map((item, index) => (
					<div key={index}>
						<img src={logo} alt="logo" /><br/>
						<div className="_item_meo_meo" >Meo Meo {index}</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
