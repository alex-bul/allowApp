import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Caption from '@vkontakte/vkui/dist/components/Typography/Caption/Caption';

import './Home.css';

const Home = ({ id, doTerms, config }) => (
	<Panel id={id}>
		<PanelHeader>Выдача</PanelHeader>


		<Group title="Navigation Example">
			<Div>
			<Caption className='caption'>Нажми на кнопку и далее нажми «Разрешить» на всех карточках!</Caption>

				<Button size="xl" level="2" onClick={doTerms} mode='commerce'>
					Получить аккаунт
				</Button>
				<p style={{textAlign: 'center'}}><img style={{width: 300, height: 300}} src={config.url_image}/>
					</p>
			</Div>
		</Group>
	</Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	doTerms: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;
