import React, { useContext, useState } from 'react';
import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitButton } from './common';
import { Marginer } from '../marginer';
import { AccountContext } from './index';
import { BsFillForwardFill } from 'react-icons/bs';

import axios from 'axios';
import { AuthContext } from '../../App';
const qs = require('querystring');
const api = 'http://localhost:3001';

export function LoginForm(props) {
	const { switchToSignup } = useContext(AccountContext);
	const { dispatch } = useContext(AuthContext);

	const initialState = {
		nohp: '',
		password: '',
		isSubmitting: false,
		errorMessage: null,
	};

	const [data, setData] = useState(initialState);

	const handleInputChange = (event) => {
		setData({
			...data,
			[event.target.name]: event.target.value,
      
		});
    
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setData({
			...data,
			isSubmitting: true,
			errorMessage: null,
		});
		console.log(data);
		const requestBody = {
			nohp: data.nohp,
			password: data.password,
		};

		const config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		};

		axios.post(api + '/auth/api/v1/login', qs.stringify(requestBody), config).then((res) => {
			if (res.data.success === true) {
				dispatch({
					type: 'LOGIN',
					payload: res.data,
				});
			} else {
				setData({
					...data,
					isSubmitting: false,
					errorMessage: res.data.message,
				});
			}
			setData({
				...data,
				isSubmitting: false,
				errorMessage: res.data.message,
			});
			throw res;
		});
	};

	return (
		<BoxContainer>
			<FormContainer onSubmit={handleSubmit}>
				<Input
          type="number"
          id="hohp"
					onChange={handleInputChange}
					value={data.nohp}
					name="nohp"
					required
					autoFocus
					placeholder="Nomor Hp"
				/>

				<Input
					type="password"
					onChange={handleInputChange}
					value={data.password}
					name="password"
					required
					placeholder="Password"
				/>
				<Marginer direction="vertical" margin={10} />
				<Marginer direction="vertical" margin="1.6em" />
				<SubmitButton disabled={data.isSubmitting} type="submit">
					{data.isSubmitting ? '...Loading' : 'Lanjutkan'}
				</SubmitButton>
				{data.errorMessage ? <div>{data.errorMessage}</div> : null}
			</FormContainer>

			<Marginer direction="vertical" margin="1em" />
			<MutedLink>
				Klik tanda panah untuk mengganti password!{' '}
				<BoldLink onClick={switchToSignup}>
					<BsFillForwardFill />
				</BoldLink>
			</MutedLink>
		</BoxContainer>
	);
}
