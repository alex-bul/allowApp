import React from 'react';
import PropTypes from 'prop-types';
import { platform, IOS, Button, Div } from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import Caption from '@vkontakte/vkui/dist/components/Typography/Caption/Caption';

const osName = platform();

const Persik = props => (
	<Panel id={props.id}>
		<PanelHeader
			left={<PanelHeaderButton onClick={() => props.setActivePanel('home')}>
				{osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
			</PanelHeaderButton>}
		>
			Получение
		</PanelHeader>
		<Div>
			<Caption className='caption'>Поздравляю! Ты выполнил все условия. Нажми на кнопку ниже и получи аккаунт!</Caption>
			<Button size="xl" level="2" href={props.config.url_final} target='_blank'>Нажми и получи аккаунт</Button>
		</Div>
	</Panel>
);

export default Persik;
