import React from 'react';
import { TextInput } from 'react-native';
import { theme } from '../../../../theme/mendes-light';
import { TextInputMask } from 'react-native-masked-text';

export class InputText extends React.PureComponent {
	render() {
		if (!this.props.mask) {
			return (
				<TextInput
					{...this.props}
					placeholderTextColor={theme.inputPlaceholder.color}
					style={[
						theme.input,
						{
							textAlign: !!this.props.align
								? this.props.align
								: 'left',
							height: !!this.props.autoGrow
								? theme.minHeight
								: 'auto',
							minHeight: !!this.props.minHeight ? this.props.minHeight : 'auto'
						}
					]}
				/>
			);
		} else if (!!this.props.mask) {
			if (this.props.mask === 'currency') {
				return (
					<TextInputMask
						type={'money'}
						options={{
							precision: 2,
							separator: ',',
							delimiter: '.',
							unit: '',
							suffixUnit: ''
						}}
						{...this.props}
						placeholderTextColor={theme.inputPlaceholder.color}
						style={[
							theme.input,
							{
								textAlign: !!this.props.align
									? this.props.align
									: 'left',
								height: !!this.props.autoGrow
									? theme.minHeight
									: 'auto'
							}
						]}
					/>
				);
			} else if (this.props.mask === 'metric') {
				return (
					<TextInputMask
						type={'money'}
						options={{
							precision: 2,
							separator: ',',
							delimiter: '.',
							unit: '',
							suffixUnit: ''
						}}
						{...this.props}
						placeholderTextColor={theme.inputPlaceholder.color}
						style={[
							theme.input,
							{
								textAlign: !!this.props.align
									? this.props.align
									: 'left',
								height: !!this.props.autoGrow
									? theme.minHeight
									: 'auto'
							}
						]}
					/>
				);
			} else if (this.props.mask === 'numeric') {
				return (
					<TextInputMask
						type={'only-numbers'}
						{...this.props}
						placeholderTextColor={theme.inputPlaceholder.color}
						style={[
							theme.input,
							{
								textAlign: !!this.props.align
									? this.props.align
									: 'left',
								height: !!this.props.autoGrow
									? theme.minHeight
									: 'auto'
							}
						]}
					/>
				);
			}
		}
	}
}
